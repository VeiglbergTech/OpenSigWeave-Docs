# OpenSigWeave documentation migration manifest

**Reviewed:** 25 November 2026 · **Source:** [`VeiglbergTech/OpenSigWeave`](https://github.com/VeiglbergTech/OpenSigWeave) at [`33dc846915adb7d27e7993e162612590c35b962f`](https://github.com/VeiglbergTech/OpenSigWeave/commit/33dc846915adb7d27e7993e162612590c35b962f).

**Published application release:** [`2026.11-alpha`](https://github.com/VeiglbergTech/OpenSigWeave/releases/tag/2026.11-alpha), image source commit `29f43e9c5df70fa09576422b86f55c2e4d5c9e3c`. The subsequent `main` README-only commit has a different SHA; the installer verifies exact image/source parity.

## Scope and status

- Astro/Starlight source is on documentation branch `dev`; GitHub Pages publication is **not** approved.
- Public installation, administration, operations, developer and release pages have been updated for the first alpha.
- The **27** mapped technical documents below are copied from the application repository's reviewed `main` snapshot with clear source/historical-reference banners and appropriate hyperlinks.
- Older technical references can describe historical constraints. Current install/update/release pages take precedence for public user guidance.
- Original app repository documentation **must not be deleted** until the website is tested, the cutover is approved, and links are redirected.
- `source-manifest.json` records per-file blob SHAs so CI can detect source drift. Review changes before updating the snapshot.

## Source-to-website mapping

- `docs/ADAPTERS.md` → `src/content/docs/reference/adapters.md`
- `docs/API.md` → `src/content/docs/reference/api.md`
- `docs/ARCHITECTURE.md` → `src/content/docs/reference/architecture.md`
- `docs/BACKUP_RESTORE_DESIGN.md` → `src/content/docs/reference/backup-restore-design.md`
- `docs/BACKUP_RULE_MANAGEMENT.md` → `src/content/docs/reference/backup-rule-management.md`
- `docs/BACKUP_UI.md` → `src/content/docs/reference/backup-ui.md`
- `docs/BRANCH_STRATEGY.md` → `src/content/docs/reference/branch-strategy.md`
- `docs/CI_ARCHITECTURE.md` → `src/content/docs/reference/ci-architecture.md`
- `docs/CLIENT_COMPATIBILITY.md` → `src/content/docs/reference/client-compatibility.md`
- `docs/CLI_API_V1.md` → `src/content/docs/reference/cli-api-v1.md`
- `docs/CROSS_HOST_RESTORE_DRILL.md` → `src/content/docs/reference/cross-host-restore-drill.md`
- `docs/DIALOG_SYSTEM.md` → `src/content/docs/reference/dialog-system.md`
- `docs/DOMAIN_FALLBACKS.md` → `src/content/docs/reference/domain-fallbacks.md`
- `docs/EDITOR_DECISION.md` → `src/content/docs/reference/editor-decision.md`
- `docs/ENGINE_SERVICE.md` → `src/content/docs/reference/engine-service.md`
- `docs/HTML_SOURCE_PRESERVATION_ADR.md` → `src/content/docs/reference/html-source-preservation-adr.md`
- `docs/IMPORT_EXPORT_UI.md` → `src/content/docs/reference/import-export-ui.md`
- `docs/INSTALL_UPDATE.md` → `src/content/docs/reference/install-update.md`
- `docs/MAILCOW_RSPAMD_INTEGRATION.md` → `src/content/docs/reference/mailcow-rspamd-integration.md`
- `docs/MAIL_USAGE_ACCEPTANCE_MATRIX.md` → `src/content/docs/reference/mail-usage-acceptance-matrix.md`
- `docs/PERFORMANCE_BENCHMARK.md` → `src/content/docs/reference/performance-benchmark.md`
- `docs/POSTFIX_MILTER_DESIGN.md` → `src/content/docs/reference/postfix-milter-design.md`
- `docs/RELEASE_ACCEPTANCE_v2026.11.md` → `src/content/docs/reference/release-acceptance-v2026.11.md`
- `docs/RELEASE_NOTES_v2026.11.md` → `src/content/docs/reference/release-notes-v2026.11.md`
- `docs/RELEASE_PROCESS.md` → `src/content/docs/reference/release-process.md`
- `docs/SIGNATURE_GROUPS_DESIGN.md` → `src/content/docs/reference/signature-groups-design.md`
- `docs/UPGRADE.md` → `src/content/docs/reference/upgrade.md`

## Deliberate exclusions

Internal audit findings, security triage, private planning/progress notes, unreconciled design records and internal GitHub governance artifacts were not published as end-user pages merely because they exist in the source tree. Public CI/branch overview and available acceptance evidence are provided separately.

## Publication gate

Complete documentation CI, source parity, navigation/link checks, security scanning, real browser review and an explicit maintainer approval before updating documentation `main` or enabling GitHub Pages deployment at `docs.veiglbergtech.com`.
