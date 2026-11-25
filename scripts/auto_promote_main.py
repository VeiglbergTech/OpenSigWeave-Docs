#!/usr/bin/env python3
"""Safely fast-forward docs main to the exact dev commit after both push CIs.

The GitHub App token is not available in the gate phase. No merge, force push,
branch rewrite, PR event, or unverified source revision is allowed.
"""
from __future__ import annotations

import json
import os
import re
import subprocess
import sys
import time
from typing import Any

REPO = "VeiglbergTech/OpenSigWeave-Docs"
CI = ".github/workflows/docs-ci.yml"
SECURITY = ".github/workflows/docs-security.yml"
SHA_RE = re.compile(r"[0-9a-f]{40}\Z")


def api(endpoint: str, method: str = "GET", fields: dict[str, str | bool] | None = None) -> Any:
    cmd = ["gh", "api", "--method", method, endpoint]
    for key, value in (fields or {}).items():
        cmd.extend(["-F" if isinstance(value, bool) else "-f", f"{key}={str(value).lower() if isinstance(value, bool) else value}"])
    result = subprocess.run(cmd, capture_output=True, text=True, check=False, timeout=40)
    if result.returncode:
        raise RuntimeError(
            f"GitHub API {method} {endpoint} failed: "
            f"{result.stderr.strip() or result.stdout.strip()}"
        )
    return json.loads(result.stdout) if result.stdout.strip() else {}


def branch_sha(branch: str) -> str:
    return str(api(f"repos/{REPO}/branches/{branch}")["commit"]["sha"])


def workflow_state(runs: list[dict[str, Any]], path: str) -> str:
    matching = [
        run for run in runs
        if run.get("path") == path
        and run.get("event") == "push"
        and run.get("head_branch") == "dev"
        and run.get("head_repository", {}).get("full_name") == REPO
    ]
    if not matching:
        return "pending"
    if any(run.get("status") == "completed" and run.get("conclusion") != "success" for run in matching):
        return "failed"
    if all(run.get("status") == "completed" and run.get("conclusion") == "success" for run in matching):
        return "success"
    return "pending"


def ci_states(sha: str) -> dict[str, str]:
    runs = api(
        f"repos/{REPO}/actions/runs?branch=dev&head_sha={sha}&event=push&per_page=100"
    )["workflow_runs"]
    return {"documentation": workflow_state(runs, CI), "security": workflow_state(runs, SECURITY)}


def verified(sha: str, wait: bool) -> bool:
    attempts = 120 if wait else 1
    for attempt in range(attempts):
        if branch_sha("dev") != sha:
            print("dev advanced; skipping stale promotion.")
            return False
        states = ci_states(sha)
        if "failed" in states.values():
            raise RuntimeError(f"Required source CI did not pass: {states}")
        if all(s == "success" for s in states.values()):
            print(f"Both exact-SHA dev push workflows passed: {states}")
            return True
        if not wait or attempt + 1 == attempts:
            raise RuntimeError(f"Required exact-SHA dev checks missing or pending: {states}")
        if attempt % 3 == 0:
            print(f"Waiting for exact-SHA dev CI: {states}", flush=True)
        time.sleep(10)
    return False


def write_output(key: str, value: str) -> None:
    with open(os.environ["GITHUB_OUTPUT"], "a", encoding="utf-8") as file:
        file.write(f"{key}={value}\n")


def promote(sha: str) -> None:
    if not verified(sha, wait=False):
        return
    old = branch_sha("main")
    if old == sha:
        print("main already matches the verified dev SHA.")
        return
    diff = api(f"repos/{REPO}/compare/{old}...{sha}")
    if diff.get("behind_by") != 0 or diff.get("ahead_by", 0) <= 0:
        raise RuntimeError("main has diverged or is not an ancestor of dev; refusing promotion.")
    if branch_sha("dev") != sha or branch_sha("main") != old:
        print("One of the branches moved; skipping stale promotion.")
        return
    result = api(
        f"repos/{REPO}/git/refs/heads/main",
        method="PATCH",
        fields={"sha": sha, "force": False},
    )
    if result.get("object", {}).get("sha") != sha:
        raise RuntimeError("GitHub did not confirm main was fast-forwarded to the verified SHA.")
    for index in range(8):
        current = branch_sha("main")
        if current == sha:
            print(f"Successfully fast-forwarded main to verified dev {sha}; GitHub Pages push trigger may run.")
            return
        if current != old:
            raise RuntimeError("main moved to an unexpected SHA after promotion.")
        if index < 7:
            time.sleep(2)
    raise RuntimeError("main did not confirm the fast-forward; inspect the branch.")


def main() -> None:
    mode = sys.argv[1] if len(sys.argv) == 2 else ""
    if mode not in {"gate", "promote"}:
        raise ValueError("Specify gate or promote")
    if os.environ.get("GH_REPO") != REPO:
        raise ValueError("Unexpected repository")
    sha = os.environ.get("SOURCE_SHA", "")
    if not SHA_RE.fullmatch(sha):
        raise ValueError("Invalid source commit SHA")
    if mode == "gate":
        write_output("ready", "true" if verified(sha, wait=True) else "false")
    else:
        promote(sha)


if __name__ == "__main__":
    try:
        main()
    except (KeyError, ValueError, RuntimeError, TimeoutError, subprocess.SubprocessError) as exc:
        print(f"::error::Documentation promotion blocked: {exc}", file=sys.stderr)
        sys.exit(1)
