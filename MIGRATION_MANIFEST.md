# OpenSigWeave documentation migration manifest

Source: `VeiglbergTech/OpenSigWeave`, `dev` commit `1722583c75733ccab177316958e30726a1149a37` (21 November 2026).

The source documentation remains in the application repository until route and link parity has been verified. This file records migration evidence, not production approval.

## Imported technical references

- `docs/ADAPTERS.md` → `src/content/docs/reference/adapters.md`
- `docs/API.md` → `src/content/docs/reference/api.md`
- `docs/ARCHITECTURE.md` → `src/content/docs/reference/architecture.md`
- `docs/BACKUP_RESTORE_DESIGN.md` → `src/content/docs/reference/backup-restore-design.md`
- `docs/CLIENT_COMPATIBILITY.md` → `src/content/docs/reference/client-compatibility.md`
- `docs/CLI_API_V1.md` → `src/content/docs/reference/cli-api-v1.md`
- `docs/ENGINE_SERVICE.md` → `src/content/docs/reference/engine-service.md`
- `docs/MAILCOW_RSPAMD_INTEGRATION.md` → `src/content/docs/reference/mailcow-rspamd-integration.md`
- `docs/RELEASE_NOTES_v2026.11.md` → `src/content/docs/reference/release-notes-v2026.11.md`
- `docs/UPGRADE.md` → `src/content/docs/reference/upgrade.md`
- `docs/POSTFIX_MILTER_DESIGN.md` → `src/content/docs/reference/postfix-milter-design.md`
- `docs/CROSS_HOST_RESTORE_DRILL.md` → `src/content/docs/reference/cross-host-restore-drill.md`

## Deliberately not imported as public reference

- Internal audits, security reviews, implementation progress notes and GitHub policy documents are not copied without a separate review.
- GitHub repository-specific guidance and workflow documentation remain in the application repository.
- Unpublished release acceptance checklist is retained in the application repository.

## Status

Documentation CI, security CI and source-code route parity must pass before documentation is considered transferable. Do not delete the originals yet. Do not publish or promote this branch without the final migration gate.
