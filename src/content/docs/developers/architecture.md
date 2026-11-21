---
title: "Architecture"
description: "Standalone core and adapter-neutral engine boundary"
---

The FastAPI application provides identity, a management portal, rules, signature catalog and an authenticated engine API. PostgreSQL stores catalog metadata and selection state; the filesystem volume holds HTML signature versions and immutable public assets.

The core resolves and renders signatures, while transport adapters own mail-system-specific authentication, MIME rewriting, error policies and DKIM order. Mailcow is one possible integration, not a runtime dependency of the core.

The [full architecture reference](/reference/architecture/) documents component boundaries and security assumptions. Read [adapter design](/reference/adapters/) before building a new mail server integration.
