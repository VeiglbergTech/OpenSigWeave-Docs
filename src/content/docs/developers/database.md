---
title: "Database and migrations"
description: "SQL metadata, Alembic and persistent state"
---

OpenSigWeave uses PostgreSQL in its standalone Compose deployment. Schema evolution runs through Alembic migrations in `migrations/versions/`. The schema records domains, signatures, immutable history, groups, rotation state, rules, schedules, provider metadata and other operational state.

The signature storage volume is not interchangeable with the SQL database: both must be included in a consistent full backup. Do not make unreviewed direct SQL changes to bypass the application's validation.

The [architecture reference](/reference/architecture/) and [backup design](/reference/backup-restore-design/) describe the persistence boundaries.
