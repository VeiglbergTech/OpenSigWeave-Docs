---
title: "2026.11-alpha release notes"
description: "First published OpenSigWeave early-access release and its known limits."
---

# OpenSigWeave 2026.11-alpha

**Published:** 25 November 2026 · **Channel:** Alpha pre-release · **Status:** Not production-certified.

[Official GitHub Release](https://github.com/VeiglbergTech/OpenSigWeave/releases/tag/2026.11-alpha) · [Application source](https://github.com/VeiglbergTech/OpenSigWeave) · [Detailed release notes](/reference/release-notes-v202611/)

## Release artifacts

- Git tag: `2026.11-alpha`
- Container image: `ghcr.io/veiglbergtech/opensigweave:2026.11-alpha`
- Moving alias: `ghcr.io/veiglbergtech/opensigweave:alpha`
- Image source revision: `29f43e9c5df70fa09576422b86f55c2e4d5c9e3c`
- `beta` and `latest` aliases are **not** set by an alpha release.

## Included functionality

Standalone FastAPI/PostgreSQL deployment, CKEditor-based signatures and version history, rules and groups, weighted rotation, scheduling, local administrator authentication, configured LDAP and OIDC identity sources, domain fallback attributes, branded interface, import/export and encrypted backup rules. The architecture separates signature rendering from the mail-server adapters.

## Verified and outstanding

Selected isolated Mailcow/SOGo flows passed with CID images, nested replies, DKIM validation, rules, rotation, scheduling and Authentik. Outlook/Thunderbird, external DKIM, LDAP live acceptance, independent missing-injector enforcement, cross-host restore and full security/production hardening are still incomplete. Postfix Milter and Stalwart hooks are experimental.

**Image parity caution:** After the release commit, `main` received a README-only commit. The application installer requires an exact SHA match with the image, so a fresh latest-`main` checkout may be rejected. See [installation](/installation/docker-compose/).

This release does **not** claim feature parity with commercial mail signature platforms, production readiness or universal HTML mail-client compatibility. Consult the [acceptance matrix](/reference/mail-usage-acceptance-matrix/).
