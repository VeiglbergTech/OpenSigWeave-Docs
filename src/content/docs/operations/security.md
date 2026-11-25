---
title: "Security hardening"
description: "Secrets, permissions, TLS and safe deployment"
---

- Keep `.env`, the age private key and identity provider secrets out of Git, public docs and logs.
- Use distinct random session, engine and optional management keys; `MANAGEMENT_API_KEY` gives **full administrator rights**.
- Keep HTTPS certificate validation on for provider and mail adapter connections.
- Restrict application network exposure; never publish PostgreSQL.
- Protect administrator APIs and image-upload routes; only validated immutable image **GET** requests may be unauthenticated.
- Use a dedicated directory read-only account and map normal/admin group membership explicitly.
- Run the provided security CI and verify real mail DKIM and sender authorization before production deployment.

The browser Content Security Policy remains report-only in this alpha, and passing CI does not guarantee the absence of unfixed image vulnerabilities. The application binds to `0.0.0.0` by default on **new installations**; restrict the host firewall or choose a private bind IP.

Security disclosure and maintainer policy are maintained in the [main GitHub repository](https://github.com/VeiglbergTech/OpenSigWeave), not duplicated into public deployment instructions.
