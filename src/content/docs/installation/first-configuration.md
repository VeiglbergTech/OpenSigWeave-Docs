---
title: "Initial configuration"
description: "Use the configuration wizard instead of manually generating secrets."
---

## Interactive setup

Run `./install.sh` to configure and start the stack, or `./generate_config.sh` to prepare `.env` without starting the service. Existing configuration is preserved; the generator does not silently rotate credentials.

```bash
./generate_config.sh
./generate_config.sh --check
./generate_config.sh --preview
./generate_config.sh --migrate
```

The initial wizard requests:

- **Hostname / allowed hosts:** `APP_ALLOWED_HOSTS` is a comma-separated list of hostnames; no URL schemes, wildcard or ports.
- **Bind address:** `APP_BIND_ADDRESS` defaults to `0.0.0.0`, all IPv4 host interfaces, for a new installation.
- **Trusted proxies:** `TRUSTED_PROXY_CIDRS` should contain only actual immediately connected reverse proxy IPs/narrow CIDRs; never `0.0.0.0/0` or `::/0`.
- **Administrator account:** initial local email, hidden password and confirmation.
- **Port:** automatic selection from 8085 through 8105 where available.

The scripts automatically create `POSTGRES_PASSWORD`, `SECRET_KEY`, `ENGINE_API_KEY` and backup-location encryption material. There is **no** `--bind-address` parameter; select the address at the wizard prompt. To change an existing bind address, edit the protected `.env` deliberately and recreate the affected container.

Never commit `.env`, access keys, passwords or recovery identities. `APP_ALLOWED_HOSTS` and trusted proxy settings do not replace network firewall controls. Read [configuration and installer reference](/reference/install-update/).
