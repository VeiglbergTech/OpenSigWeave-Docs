---
title: "PostgreSQL"
description: "Database configuration and persistence."
---

The Compose project includes a PostgreSQL 17 service. Its storage is persisted in the `opensigweave-postgres-data` volume and is not published as a host port.

The Compose file derives the application `DATABASE_URL` from `POSTGRES_USER`, `POSTGRES_PASSWORD` and `POSTGRES_DB`; keep these values consistent when changing credentials.

Database schema migrations are managed by **Alembic**. Do not manually edit application tables to change templates, rules or providers; use the web interface or supported API. Check migration errors in `docker compose logs opensigweave` before declaring an upgrade complete.

See [database architecture](/developers/database/) and [backup/restore](/operations/restore/).
