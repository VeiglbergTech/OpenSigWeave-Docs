---
title: "Safe restore"
description: "Restore an age-verified backup into a fresh Docker Compose target."
---

A failed database migration is **not** a reason to downgrade the app's source and restart it against a new schema. Use a verified archive and restore into a **fresh** target instead of overwriting existing production volumes.

```bash
python3 backup_cli.py verify /path/to/backup.age \
  --identity /media/offline/opensigweave-age-identity.txt
python3 backup_cli.py restore /path/to/backup.age \
  --identity /media/offline/opensigweave-age-identity.txt \
  --target-dir /srv/opensigweave-recovered \
  --project-name opensigweave-recovered
```

Keep routing/DNS pointed at the original service until you have checked the restored application's health, administrator login, signature files and history, identity-provider settings, rules, rotation, schedules and adapter contract in an isolated environment. The full restore is a deliberate separate operation; `update.sh` never invokes it automatically.

Read [Recovery reference](/reference/upgrade/) and [Restore drill](/reference/cross-host-restore-drill/).
