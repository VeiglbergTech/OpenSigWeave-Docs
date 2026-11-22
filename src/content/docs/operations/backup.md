---
title: "Encrypted backups"
description: "Disaster recovery with the existing host-side age backup tool."
---

The existing `backup_cli.py create` command takes a consistent complete snapshot: PostgreSQL (including domains, rules, rotation, schedules, versions and branding), the signature volume, the managed identity-provider credential volume, Compose metadata, encrypted application configuration and application/database image metadata. It stops the web application temporarily, encrypts the archive using age, verifies it by decrypting, then restarts the application.

```bash
python3 backup_cli.py create --project-dir "$PWD" \
  --output /mnt/opensigweave-backups/backup-2026-11-22.age \
  --recipient age1YOUR_ACTUAL_PUBLIC_RECIPIENT \
  --identity /media/offline/opensigweave-age-identity.txt
python3 backup_cli.py verify \
  /mnt/opensigweave-backups/backup-2026-11-22.age \
  --identity /media/offline/opensigweave-age-identity.txt
```

The private age identity file must be protected (0600), kept outside `.env` and Git, and recoverable independently of the failed host. The update manager requires [separate backup configuration](/installation/updates/) pointing to remote mounted storage. A web UI export is **not** a replacement for the encrypted full disaster-recovery backup.

Test restoration on a separate host before production release. See [Restore](/operations/restore/) and [Full design](/reference/backup-restore-design/).
