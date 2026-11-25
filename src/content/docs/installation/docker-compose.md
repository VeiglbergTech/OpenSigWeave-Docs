---
title: "Install on Linux with Docker Compose"
description: "Interactive installation that pulls a source-verified published GHCR image."
---

## Install the published alpha

The source repository contains `install.sh`, `generate_config.sh` and `update.sh`. The release configuration pulls from **GitHub Container Registry**, not a local Docker build.

```bash
git clone --branch main https://github.com/VeiglbergTech/OpenSigWeave.git
cd OpenSigWeave
./install.sh
./generate_config.sh --check
docker compose ps
```

> **Important snapshot caveat:** The published `2026.11-alpha` image was built from commit `29f43e9c5df70fa09576422b86f55c2e4d5c9e3c`. The `main` branch later advanced to a README-only commit. Because installation checks that the image's `org.opencontainers.image.revision` equals the checkout SHA, the commands above will be refused while those commits differ. For a *fresh clone only*, follow the [release-commit checkout procedure](/getting-started/quickstart/) first. Do not reset an existing running installation.

The wizard prompts for host/FQDN, administrator email and password, application bind address (default `0.0.0.0`), allowed hostname list, trusted proxy addresses/CIDRs and any optional configuration. It generates secure independent secrets, writes a permission-restricted `.env`, provisions PostgreSQL, and starts the containers.

The initial admin password is requested without terminal echo. The installer supports an **explicitly requested** generated-password mode for unattended installation; such a recovery file must be protected and removed after secure import.

## Image tags and channels

| Deployment | Image/source |
| --- | --- |
| Published `2026.11-alpha` | `ghcr.io/veiglbergtech/opensigweave:2026.11-alpha` |
| Moving alpha alias | `ghcr.io/veiglbergtech/opensigweave:alpha` |
| `main` | Prebuilt image only, with **exact source-SHA matching** |
| `dev` and `beta` | Unreleased source; local build overlay |

Set `OSW_IMAGE_TAG=2026.11-alpha` in the protected `.env` if you want an explicit immutable tag. The default is `alpha`. An image tag alone cannot bypass the source-revision check.

## After installation

1. Restrict the application port at the host firewall. A `0.0.0.0` bind is **not** a security control.
2. Terminate HTTPS at your reverse proxy and configure its IP in `TRUSTED_PROXY_CIDRS` only if needed.
3. Open the portal through an allowed hostname and sign in as the initial administrator.
4. Create your domain, signature and rule; validate in staging before enabling the mail adapter.

See the [source installation reference](/reference/install-update/) and [reverse proxy guide](/installation/reverse-proxy/). This Compose stack does not install or alter Mailcow itself.
