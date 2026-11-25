#!/usr/bin/env python3
"""Generate complete static German language counterparts for every English page.

The unprefixed English Markdown/MDX files are maintained sources. Generated /de
Markdown is not checked into Git; translated pages are built by Astro and
deployed as plain static HTML. Legal texts and complex MDX are human-translated.
This script never calls a remote translator: Argos runs offline after setup.
"""
import hashlib
import json
import re
from pathlib import Path
from concurrent.futures import ProcessPoolExecutor, as_completed

import argostranslate.translate

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "src" / "content" / "docs"
CACHE = ROOT / ".astro" / "localization-cache.json"
MANUAL = {
    "impressum.md", "datenschutz.md", "markenhinweise.md",
    "developers/content-authoring.mdx",
}
VERSION = "2"
routes = set()
for src in DOCS.rglob("*"):
    if not src.is_file() or src.suffix not in (".md", ".mdx") or "de" == src.relative_to(DOCS).parts[0]:
        continue
    rel = src.relative_to(DOCS)
    routes.add("/" + rel.with_suffix("").as_posix().replace("index", "").rstrip("/") + "/")
routes.add("/")

def de_path(path: str) -> str:
    if path in routes:
        return "/de" + path
    return path

link_re = re.compile(r"(!?)\[([^\]\n]+)\]\(([^)]+)\)")
fragment_re = re.compile(r"(`[^`\n]+`|\*\*[^*\n]+\*\*|(?<!\*)\*[^*\n]+\*(?!\*)|<[^>]+>)")
_translation = None

def translated(text: str) -> str:
    if not text.strip() or not re.search(r"[A-Za-z]", text):
        return text
    # Resolve once per worker and reuse across all text fragments. The
    # convenience function can incur expensive lookup/model setup per call.
    global _translation
    if _translation is None:
        languages = argostranslate.translate.get_installed_languages()
        en = next((lang for lang in languages if lang.code == "en"), None)
        de = next((lang for lang in languages if lang.code == "de"), None)
        if en is None or de is None:
            raise RuntimeError("Argos English/German model is not installed")
        _translation = en.get_translation(de)
        if _translation is None:
            raise RuntimeError("Argos English-to-German translation pair is missing")
    return _translation.translate(text)

def inline(text: str) -> str:
    # Keep code, HTML/MDX syntax and link targets byte-for-byte.
    parts = []
    cursor = 0
    for m in fragment_re.finditer(text):
        parts.append(linked(text[cursor:m.start()]))
        token = m.group()
        if token.startswith("`") or token.startswith("<"):
            parts.append(token)
        elif token.startswith("**"):
            parts.append("**" + linked(token[2:-2]) + "**")
        else:
            parts.append("*" + linked(token[1:-1]) + "*")
        cursor = m.end()
    parts.append(linked(text[cursor:]))
    return "".join(parts)

def linked(text: str) -> str:
    out, cursor = [], 0
    for m in link_re.finditer(text):
        out.append(translated(text[cursor:m.start()]))
        bang, label, target = m.groups()
        # Preserve external URLs, images, API paths, anchors and static assets.
        if not bang and target.startswith("/"):
            match = re.match(r"([^?#]*)(.*)", target)
            target = de_path(match.group(1)) + match.group(2)
        out.append(bang + "[" + translated(label) + "](" + target + ")")
        cursor = m.end()
    out.append(translated(text[cursor:]))
    return "".join(out)

def line_translate(line: str) -> str:
    if not line.strip() or line.startswith("    ") or line.startswith("\\t"):
        return line
    if line.lstrip().startswith(("<!--", "-->", "import ", "export ", "<Card", "</Card", "<CardGrid", "</CardGrid")):
        return line
    # Leave HTML image tags and path-only content intact.
    if line.lstrip().startswith(("http://", "https://", "curl ", "$ ", "#!/")):
        return line
    if re.match(r"^\s*\|", line):
        return "|".join(inline(cell) for cell in line.split("|"))
    prefix = re.match(r"^(\s*(?:(?:#{1,6}|>|[-+*]|\d+[.)])\s+)+)(.*)$", line)
    if prefix:
        return prefix.group(1) + inline(prefix.group(2))
    return inline(line)

def translate_markdown(content: str) -> str:
    if not content.startswith("---\n"):
        raise RuntimeError("English source lacks YAML frontmatter")
    a, fm, body = content.split("---", 2)
    if a != "" or not fm.startswith("\n"):
        raise RuntimeError("Unexpected frontmatter")
    newfm = []
    for ln in fm.strip("\n").splitlines():
        m = re.match(r"^(title|description):\s*(.*)$", ln)
        if m:
            orig = m.group(2).strip().strip('"').strip("'")
            ln = m.group(1) + ": " + json.dumps(translated(orig), ensure_ascii=False)
        newfm.append(ln)
    result = []
    in_fence = False
    for ln in body.lstrip("\n").splitlines(keepends=True):
        raw = ln.rstrip("\r\n")
        if re.match(r"^\s*(?:`{3,}|~{3,})", raw):
            in_fence = not in_fence
            result.append(ln)
        elif in_fence:
            result.append(ln)
        else:
            result.append(line_translate(raw) + ("\n" if ln.endswith("\n") else ""))
    if in_fence:
        raise RuntimeError("Unterminated code block in source")
    warning = "> **Hinweis:** Diese Übersetzung wurde automatisiert erstellt. Für sicherheitskritische Befehle und technische Details gilt die [englische Originalfassung]({url}).\n\n"
    return "---\n" + "\n".join(newfm) + "\n---\n\n" + warning + "".join(result).lstrip("\n")

def generate_one(rel: str, original: str) -> str:
    """Work on one source file in a separate process with its own Argos model."""
    url = "/" + Path(rel).with_suffix("").as_posix().replace("index", "").rstrip("/") + "/"
    result = translate_markdown(original).replace("{url}", url)
    source_edit = "https://github.com/VeiglbergTech/OpenSigWeave-Docs/edit/dev/src/content/docs/" + rel
    result = result.replace("---\n", "---\neditUrl: " + json.dumps(source_edit) + "\n", 1)
    result = result.replace("\n---\n\n> **Hinweis:**", "\n---\n\n<!-- MACHINE-TRANSLATED -->\n\n> **Hinweis:**", 1)
    return result

def main():
    cache = {}
    if CACHE.exists():
        try:
            cache = json.loads(CACHE.read_text(encoding="utf-8"))
        except ValueError:
            pass
    source_files = sorted(src for src in DOCS.rglob("*") if src.is_file() and src.suffix in (".md", ".mdx") and src.relative_to(DOCS).parts[0] != "de")
    tasks = []
    skipped = 0
    for src in source_files:
        rel = src.relative_to(DOCS).as_posix()
        dest = DOCS / "de" / rel
        if rel in MANUAL:
            if not dest.exists():
                raise RuntimeError(f"Missing manually maintained German page: {dest}")
            skipped += 1
            continue
        if src.suffix == ".mdx":
            raise RuntimeError(f"MDX translation needs a reviewed manual counterpart: {rel}")
        original = src.read_text(encoding="utf-8")
        digest = hashlib.sha256((VERSION + original).encode("utf-8")).hexdigest()
        if dest.is_file() and cache.get(rel) == digest:
            skipped += 1
            continue
        if dest.exists() and "<!-- MACHINE-TRANSLATED -->" not in dest.read_text(encoding="utf-8"):
            skipped += 1
            continue
        tasks.append((rel, original, digest))

    # CPU inference is heavy for complete technical references. Work on
    # independent pages concurrently; workers never modify source files.
    if tasks:
        with ProcessPoolExecutor(max_workers=min(4, len(tasks))) as pool:
            futures = {
                pool.submit(generate_one, rel, original): (rel, digest)
                for rel, original, digest in tasks
            }
            for future in as_completed(futures):
                rel, digest = futures[future]
                text = future.result()
                dest = DOCS / "de" / rel
                dest.parent.mkdir(parents=True, exist_ok=True)
                dest.write_text(text, encoding="utf-8")
                cache[rel] = digest

    CACHE.parent.mkdir(parents=True, exist_ok=True)
    CACHE.write_text(json.dumps(cache, indent=2) + "\n", encoding="utf-8")
    missing = [str(src.relative_to(DOCS)) for src in source_files if not (DOCS / "de" / src.relative_to(DOCS)).is_file()]
    if missing:
        raise RuntimeError("Missing German translations: " + ", ".join(missing))
    print(f"German static docs complete: {len(source_files)} pairs ({len(tasks)} created/updated, {skipped} cached/manual).")

if __name__ == "__main__":
    main()
