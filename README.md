# OpenSigWeave Docs — documentation website

Official source for the static **OpenSigWeave email-signature manager documentation**, built using **Astro + Starlight** and hosted exclusively on **GitHub Pages** after its repository Pages settings and custom domain are enabled.

**Prepared release baseline:** [OpenSigWeave 2026.11-alpha](https://github.com/VeiglbergTech/OpenSigWeave/releases/tag/2026.11-alpha), published 25 November 2026. This is an **early-access pre-release**, not a stable or production-certified version.

- [Application repository](https://github.com/VeiglbergTech/OpenSigWeave)
- [Published source tag](https://github.com/VeiglbergTech/OpenSigWeave/releases/tag/2026.11-alpha)
- [Documentation source](src/content/docs/)
- [Source migration mapping](MIGRATION_MANIFEST.md)
- [Source review and integrity manifest](source-manifest.json)
- **Documentation domain:** https://docs.opensigweave.de (GitHub Pages setup required)

## Develop and test locally

Requires Node.js 22.12 or newer.

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

The build bundles the pinned OpenSigWeave logo after checking its exact Git blob hash. The website is fully static; there is no server, database, CMS or external application backend.

## Branch and release safety

All edits are made on **`dev`**. After **both Documentation CI and Documentation Security CI** pass for the exact current `dev` commit, a scoped GitHub App token automatically fast-forwards **`main`** to the same SHA. Every App-authored `main` push triggers GitHub Pages deployment when Pages and DNS are configured. No `beta` stage is used. Until the existing GitHub App is installed here and its secrets are available, promotion safely skips. Setup: [MAINTAINERS.md](MAINTAINERS.md).

Documentation covers actual `2026.11-alpha` behavior, including the temporary source/GHCR revision mismatch caused by a later README-only `main` commit. Changes to the application need a new source review before docs are promoted.

Copyright and license: [GPL-3.0](LICENSE). Credits: [TylerHats' original OpenSigWeave](https://github.com/TylerHats/OpenSigWeave) and the [mailcow project](https://github.com/mailcow/mailcow-dockerized), whose `MOO_FOOTER` MIME approach informed the original Rspamd work. These acknowledgments do not imply endorsement.
