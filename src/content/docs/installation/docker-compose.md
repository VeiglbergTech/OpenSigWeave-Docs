---
title: "Docker Compose installation"
description: "Install or resume the standalone OpenSigWeave stack."
---

## Supported standalone installation

A Linux x86_64/aarch64 host with Docker Engine 24+, Docker Compose v2.20+, Git, Python 3, at least 2 GiB RAM, 6 GiB available disk space, and access to the public repository is required. Keep additional space on a *separate remote filesystem* for encrypted backups. Docker permissions must already be granted to the operator; the installer does not install packages or change your firewall.

```bash
git clone https://github.com/VeiglbergTech/OpenSigWeave.git
cd OpenSigWeave
./install.sh
```

The installer asks the current channel (which must match the existing Git checkout), public FQDN, bind IP, host port, local administrator address and confirmed password. It generates **three independent cryptographic secrets** and hashes the administrator password using the application's existing scrypt algorithm. Credentials are not printed. The `.env` file is created with permissions 0600 and must never be committed.

For a non-default channel, clone that branch explicitly:

```bash
git clone --branch beta https://github.com/VeiglbergTech/OpenSigWeave.git
# or: git clone --branch dev https://github.com/VeiglbergTech/OpenSigWeave.git
```

`dev` and `beta` are not production-approved releases. The installer does not automatically switch branches. After validating Docker Compose, it starts PostgreSQL, builds the application locally and waits for database and app healthchecks, Alembic and basic volume availability. On partial failure, existing configuration and Docker volumes remain; fix the cause and rerun `./install.sh`. An already healthy installation is not overwritten.

A same-host reverse proxy should connect to `127.0.0.1:8085` by default. The public URL must use HTTPS, terminated by that proxy. If the proxy is remote, use the host's **private bind IP** and firewall-allow only the proxy. The container still listens on port 8085; `APP_PORT` changes only the **host** port mapping.

This Compose project is independent of mailcow and does not change any mail server. See [First configuration](/installation/first-configuration/) and [Safe updates](/installation/updates/).
