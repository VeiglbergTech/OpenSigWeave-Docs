# OpenSigWeave Docs — documentation website

Official source for the static **OpenSigWeave email-signature manager documentation**, built using **Astro + Starlight** and hosted exclusively on **GitHub Pages**.

**Prepared release baseline:** [OpenSigWeave 2026.11-alpha](https://github.com/VeiglbergTech/OpenSigWeave/releases/tag/2026.11-alpha), published 25 November 2026. This is an **early-access pre-release**, not a stable or production-certified version.

- [Application repository](https://github.com/VeiglbergTech/OpenSigWeave)
- [Published source tag](https://github.com/VeiglbergTech/OpenSigWeave/releases/tag/2026.11-alpha)
- [Documentation source](src/content/docs/)
- [Source migration mapping](MIGRATION_MANIFEST.md)
- [Source review and integrity manifest](source-manifest.json)
- **Documentation domain:** https://docs.opensigweave.de (live on GitHub Pages)

## Deutsch und Englisch — vollständig statisch

Die Website verwendet die eingebaute Sprachauswahl von Starlight: **Englisch** unter `/` und **Deutsch** unter `/de/`, mit identischen Seitenpfaden und eigener Suchindizierung je Sprache. Jede englische Seite muss im statischen Build einen deutschen Gegenpart haben. Die CI prüft die Vollständigkeit sowie die internen Links und lokalisierten Rechtshinweise.

Englische Inhalte unter `src/content/docs/` sind die editierbaren Quellen. Der kostenlose quelloffene Offline-Übersetzer **Argos Translate** erzeugt die deutschen Markdown-Dateien während des Builds; auf der veröffentlichten Website läuft kein Übersetzungsdienst und es werden keine Dokumentationsinhalte beim Seitenaufruf an Drittanbieter übertragen. Technische Befehle und Codeblöcke bleiben unverändert. Automatische Übersetzungen können sprachlich oder fachlich ungenau sein: Sicherheitskritische Schritte anhand des englischen Originals prüfen. Die deutschen Rechtstexte sowie die komplexe MDX-Beispielseite sind separat redaktionell gepflegt.

Für lokale Builds die Übersetzungsumgebung vorbereiten:

```bash
python3 -m venv .translate-env
.translate-env/bin/python -m pip install argostranslate==1.11.0
.translate-env/bin/python scripts/setup_translation.py
```

Anschließend werden bei `npm run build`, `npm run check`, `npm run test:docs` und `npm run dev` fehlende oder veränderte deutsche Seiten automatisch erzeugt. Die generierten `de/`-Dateien sind keine zusätzlichen Git-Quellen. Versionierte manuelle Übersetzungen bleiben unberührt.

## Develop and test locally

Requires Node.js 22.12 or newer, Python 3 and the free Argos model prepared above.

```bash
npm ci --no-fund --no-audit
npm run test:docs
npm run check
npm run build
npm run test:links
npm run test:security
npm run test:workflows
npm run dev
```

The build bundles the pinned original OpenSigWeave logo as the website header image and its matching browser favicon (`/favicon.png`) after checking the exact Git blob hash. The website is fully static; there is no separate application server, database, CMS or external application backend. GitHub Pages still processes technical access data (see privacy notice).

## Legal notices and third-party names

The public website links [Impressum](https://docs.opensigweave.de/impressum/), [Datenschutz](https://docs.opensigweave.de/datenschutz/) and [Markenhinweise](https://docs.opensigweave.de/markenhinweise/) from every page footer. The original owner-approved private-person provider information is public. Product names, including CodeTwo, are used only as factual third-party references; do not imply affiliation, approval, compatibility or superiority without evidence. Before adding analytics, external embeds, fonts or nonessential storage, reassess privacy and ePrivacy requirements.

## Branch and release safety

All edits are made on **`dev`**. After **both Documentation CI and Documentation Security CI** pass for the exact current `dev` commit, a scoped GitHub App token automatically fast-forwards **`main`** to the same SHA. Every App-authored `main` push triggers GitHub Pages deployment when Pages and DNS are configured. No `beta` stage is used. Until the existing GitHub App is installed here and its secrets are available, promotion safely skips. Setup: [MAINTAINERS.md](MAINTAINERS.md).

Documentation covers actual `2026.11-alpha` behavior, including the temporary source/GHCR revision mismatch caused by a later README-only `main` commit. Changes to the application need a new source review before docs are promoted.

Copyright and license: [GPL-3.0](LICENSE). Credits: [TylerHats' original OpenSigWeave](https://github.com/TylerHats/OpenSigWeave) and the [mailcow project](https://github.com/mailcow/mailcow-dockerized), whose `MOO_FOOTER` MIME approach informed the original Rspamd work. These acknowledgments do not imply endorsement.
