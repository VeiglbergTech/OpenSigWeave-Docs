---
title: "System requirements"
description: "Runtime and infrastructure prerequisites."
---

## Application runtime

- Linux host with Docker Engine and Docker Compose plugin v2.
- Git to check out the tested application branch.
- PostgreSQL 17 is included in the existing Compose stack; do not publish the database port.
- A DNS hostname and HTTPS reverse proxy for administrator access and public signature assets.
- An independent random PostgreSQL password, session secret and engine API key.
- For full encrypted disaster recovery, the \`age\` tool plus a securely stored offline private identity.

OpenSigWeave's Compose service listens on internal port **8085** and binds by default to **127.0.0.1** on the host.

## Optional services

OIDC and LDAP are optional. A local emergency administrator remains necessary. Use a staging mailserver and valid DNS/TLS to validate a chosen adapter.

See the [Compose file](https://github.com/VeiglbergTech/OpenSigWeave/blob/dev/compose.yaml) and [example configuration](https://github.com/VeiglbergTech/OpenSigWeave/blob/dev/.env.example).
