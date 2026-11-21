---
title: "Encrypted full backup"
description: "Protect database, assets, identity settings and images"
---

The application's backup tooling can build a full disaster-recovery archive including the database, signature history, immutable image assets, provider configuration and the image state needed for a new deployment.

Full backups are operator-controlled and **age-encrypted** using an independent encryption identity. Keep the age private key **off the application host** and perform verification before considering a backup usable. A UI ZIP export is **not** a complete backup.

## Suggested operational procedure

1. Verify \`docker compose ps\` and available storage.
2. Follow the backup CLI help for the installed application commit and use a separately mounted backup destination.
3. Verify the archive and retain multiple tested restore points.
4. Perform a cross-host restore drill in disposable infrastructure.

See the [backup technical reference](/reference/backup-restore-design/) and [cross-host drill](/reference/cross-host-restore-drill/) for command-level procedures and remaining verification limits.
