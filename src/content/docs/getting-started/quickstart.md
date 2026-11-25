---
title: "Quick start with the published alpha"
description: "Install OpenSigWeave from the approved GHCR image and initialize it interactively."
---

## Published alpha

The first publicly published [OpenSigWeave release](https://github.com/VeiglbergTech/OpenSigWeave/releases/tag/2026.11-alpha) is `2026.11-alpha`. It is **early access** and must be validated in an isolated environment before production mail-flow changes.

The normal release procedure is:

```bash
git clone --branch main https://github.com/VeiglbergTech/OpenSigWeave.git
cd OpenSigWeave
./install.sh
./generate_config.sh --check
docker compose ps
```

**Release-commit warning (25 November 2026):** the published image is labelled with source SHA `29f43e9c5df70fa09576422b86f55c2e4d5c9e3c`, whereas `main` has advanced to `33dc846915adb7d27e7993e162612590c35b962f` for a later README change. The installer intentionally rejects mismatched source and image SHAs. For a **brand-new, otherwise untouched clone only**, you can position the local `main` branch at the published release commit before running the installer:

```bash
git clone --branch main https://github.com/VeiglbergTech/OpenSigWeave.git
cd OpenSigWeave
git reset --hard 29f43e9c5df70fa09576422b86f55c2e4d5c9e3c
./install.sh
```

**Never run the reset command in an existing installation:** it discards local tracked changes, and the updater still requires a source-matched future image. This is a temporary release snapshot procedure, not an instruction to bypass the installer's SHA verification.

The wizard creates a protected `.env`, generates independent secrets and starts PostgreSQL and the prebuilt application. You do **not** need to create keys, calculate a password hash or build the application image yourself.

Before enabling sending, configure an HTTPS reverse proxy, restrict the application port using a firewall, create a domain and signature, and perform an isolated Mailcow/Rspamd test. See [installation details](/installation/docker-compose/) and [first configuration](/installation/first-configuration/).
