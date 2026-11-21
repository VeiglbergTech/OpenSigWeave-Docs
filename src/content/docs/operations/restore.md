---
title: "Disaster recovery restore"
description: "Restore a tested archive to a fresh system"
---

A **full restore** differs from restoring a signature version or importing a selective configuration ZIP. It must bring back the database, assets, versions and identity provider state together.

Use the restore CLI only in the documented isolated/fresh-deployment scenario. Keep the encrypted archive and age private identity separate, inspect the expected restore target and avoid overwriting healthy running volumes by accident.

After restoring, confirm database migrations, portal login, required provider connections, asset URLs, historical signature previews and staging mail transport.

**Verification status:** automated encrypted backup and fresh restore tests exist; real cross-host, destructive and mounted NFS/SMB restore drills remain outstanding. Consult the [restore drill](/reference/cross-host-restore-drill/).
