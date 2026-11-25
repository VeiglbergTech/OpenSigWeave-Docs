---
title: "Operational upgrade checklist"
description: "Preflight, source/image parity, optional backups and rollback safety."
---

1. Record the current branch/commit, GHCR image tag, `docker compose ps`, schema revision and any external adapter configuration.
2. Run `./update.sh --check`, `--prefetch` and `--dry-run` to review a proposed change before applying it.
3. On `main`, confirm the target Git commit has an approved **matching GHCR image**. A source-only README change must not be treated as an application image release.
4. Review active Backup Rules. With no rules, the update proceeds without a warning; if a configured backup fails, choose deliberately whether to override the default abort.
5. Review schema or adapter changes and use additional approval for breaking changes.
6. Apply `./update.sh`, then check database migrations, both health checks, administrator login, assets, identity resolution and representative staging messages.

A migration or startup failure may leave the protected update journal and require a **fresh-target restore**. Merely checking out an older branch does not reverse PostgreSQL migrations.

See [updates](/installation/updates/), [backup](/operations/backup/) and [release notes](/releases/release-notes/).
