---
title: "System requirements"
description: "Supported host requirements and optional identity and mail integrations."
---

## Required

- Linux x86_64 or aarch64 with Docker Engine **24+**, Docker Compose **2.20+**, Git, Python 3 and Docker daemon permissions.
- At least **2 GiB RAM** and **6 GiB free disk**; allow extra storage for images, mail logs and any configured backups.
- A working HTTPS reverse proxy and DNS name for browser access and public signature assets, unless testing only on localhost.
- PostgreSQL 17 is provisioned inside the standalone Compose stack. Do not expose PostgreSQL to the public network.
- A firewall policy limiting access to the application's management port.

The interactive installer generates the database, session and engine secrets automatically.

## Binding defaults

A **new** installation proposes `APP_BIND_ADDRESS=0.0.0.0` and chooses an available port beginning at 8085. **0.0.0.0 means all IPv4 interfaces**, not loopback-only. Use `127.0.0.1` if the reverse proxy runs on the same machine, or a specific private address if it runs elsewhere. Either way, block untrusted connections with your firewall.

## Optional

LDAP/LDAPS, Authentik/OIDC, backup rules, Local/SMB backup destinations and mail-server adapters are optional. Only the local administrator is required at initial setup; the installer provisions it interactively. Mailcow/Rspamd must be configured separately.

Read [interactive installation](/installation/docker-compose/) and [network security](/installation/reverse-proxy/).
