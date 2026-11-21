---
title: "Features and release status"
description: "Implemented features and explicitly experimental integrations."
---

## Implemented in the release candidate

- Web administration with domains, signatures, immutable version history and restore-as-new-version.
- CKEditor visual and HTML-source editing, persistent upload assets, custom branding.
- Reusable signature groups with weighted no-repeat selection; sender/domain/group and directory-attribute matching.
- Date-and-time scheduling, precedence resolution and per-user overrides.
- Local emergency administrator, managed OIDC and LDAP/Active Directory providers.
- PostgreSQL database, Alembic migrations, diagnostics, encrypted disaster recovery and selective export/import.
- Adapter-neutral engine API and the Rspamd path tested with MIME fixtures.

## Experimental or not certified

**Postfix Milter** and **Stalwart MTA-hook** integrations have automated compatibility/regression coverage but require live SMTP/DKIM acceptance. Native Mailcow integration, and adapters for other mail servers, are not claimed as ready. See [adapter status](/developers/adapters/).

## Acceptance boundary

Passing GitHub Actions is not equivalent to successful operation on a real production mail flow. Consult the [release notes](/releases/release-notes/).
