---
title: "Encrypted backups and rules"
description: "Optional Local/SMB backup rules, recovery key handling and backup contents."
---

OpenSigWeave supports encrypted backup rules and history with configurable **Local and SMB destinations**. Backups are optional. A regular backup rule is **not** a prerequisite for installing or updating; configured pre-update backups will be attempted.

## What a managed backup contains

The application-level archive protects the PostgreSQL database, signature assets and configured identity-provider data needed by the application. It does **not** include the host's protected `.env`, the Git checkout, published Docker images, host firewall, reverse proxy, external mail server or its configuration. Per-sender mail statistics are not promised as part of a minimum backup.

## Recovery identity

When a real backup first requires age encryption and no existing identity is configured, the application can generate an age recovery identity inside its persistent protected backup volume. **Export the identity to protected storage outside the host**, and store a usable encrypted archive, source/version information and the original `.env` separately:

```bash
mkdir -m 700 -p /media/offline/opensigweave-recovery
./export_backup_key.sh /media/offline/opensigweave-recovery/age-identity.txt
```

Use a fresh destination path. Losing the only private recovery identity can make the encrypted archives irrecoverable.

## Operational expectations

- A scheduled backup and a verified pre-update backup are distinct use cases. Review Backup History for actual results.
- Readback/decryption, manifest verification and `pg_restore --list` validate archive structure, **not** a full disaster recovery.
- Test a separate-host restore with realistic volume and network failures.
- A browser ZIP export is not a full disaster-recovery backup.

See [Backup Rules](/reference/backup-rule-management/), [backup architecture](/reference/backup-restore-design/) and [restore guidance](/operations/restore/).
