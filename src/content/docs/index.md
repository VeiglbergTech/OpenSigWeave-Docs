---
title: "OpenSigWeave documentation"
description: "Official OpenSigWeave installation, administration, operations and developer documentation."
---

# OpenSigWeave documentation

**Self-hosted, open-source server-side email signature management**, with an administration portal, sender/domain rules, signature groups, scheduled campaigns, directory attributes and a mail-adapter interface.

> **Published release — 25 November 2026:** [2026.11-alpha](https://github.com/VeiglbergTech/OpenSigWeave/releases/tag/2026.11-alpha), an **early-access pre-release**, with the container image `ghcr.io/veiglbergtech/opensigweave:2026.11-alpha`. This is **not** a stable or production-certified release.

## Start here

- [Installation overview](/getting-started/quickstart/) — the first published image and source revision check.
- [System requirements](/getting-started/requirements/) — Linux, Docker, Compose, reverse proxy and firewall.
- [Interactive installation](/installation/docker-compose/) — install the approved image without building it locally.
- [Initial configuration](/installation/first-configuration/) — administrator credentials, host allowlist, proxies and bind address.
- [Create a signature](/getting-started/first-signature/) — first domain, template and rule.
- [Mailcow and Rspamd](/installation/mailcow/) — controlled integration and required tests.
- [Backups and updates](/operations/backup/) — optional backup rules and recovery.
- [Release notes](/releases/release-notes/) — verified scope and known limitations.

## Maturity and limits

The Mailcow/Rspamd and SOGo path passed selected isolated live tests including MIME/CID, replies, rules and scheduling. Authentik was observed working. **LDAP/Active Directory live acceptance, Outlook, Thunderbird, external DKIM and fully independent missing-injector enforcement remain unverified.** The Postfix Milter and Stalwart hook are experimental.

Mailcow, Postfix or another email system still manages authenticated senders, mail transport and DKIM. OpenSigWeave does **not** authorize a sender or replace SMTP/IMAP. See the [mail acceptance matrix](/reference/mail-usage-acceptance-matrix/) before enabling real mail processing.

## Documentation status

This documentation is reviewed against [application main commit `33dc846915ad`](https://github.com/VeiglbergTech/OpenSigWeave/commit/33dc846915adb7d27e7993e162612590c35b962f). The published image was built from the earlier release commit [`29f43e9c5df7`](https://github.com/VeiglbergTech/OpenSigWeave/commit/29f43e9c5df70fa09576422b86f55c2e4d5c9e3c). Later documentation-only commits on `main` do not automatically produce a matching image. Consult the [source/image parity warning](/installation/docker-compose/) before deployment.

The documentation website is being prepared on its separate `dev` branch; appearance here does not mean GitHub Pages has been published.
