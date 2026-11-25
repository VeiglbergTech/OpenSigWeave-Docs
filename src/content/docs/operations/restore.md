---
title: "Restoring OpenSigWeave"
description: "Recover into a clean environment without assuming database downgrades."
---

## Recovery requirements

A safe disaster recovery needs a verified encrypted archive, the corresponding private age recovery identity, a copy of the protected host `.env`, appropriate source/Compose version and an isolated destination with new Docker volumes. These recovery resources must be available **independently of the failed host**.

1. Stop application-side write activity or disconnect the affected mail-server adapter.
2. Record the current Git revision, deployed image, database state and redacted errors.
3. Verify that the recovery identity can decrypt the selected archive. Check manifest, PostgreSQL backup and stored signature assets.
4. Restore into a **separate fresh target** using the documented backup recovery tooling and compatible application/schema version.
5. Verify administrator login, identity-provider configuration, signature files, versions, rules, rotation and scheduled selections.
6. Test outgoing mail only in staging; switch DNS/proxy/mail routing after explicit acceptance.

**Do not** overwrite working production volumes, delete database volumes to clear an error, or assume reverting the Git commit reverses an Alembic migration. The updater does not perform an automatic database rollback.

The earlier host-side `backup_cli.py` design describes an older full-backup path. For the published alpha use current [Backup Rules](/reference/backup-rule-management/) and [cross-host drill](/reference/cross-host-restore-drill/), and validate the restore commands against the actual archive format.
