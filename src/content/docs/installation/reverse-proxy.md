---
title: "Reverse proxy, HTTPS and firewall"
description: "Secure application bind addresses, allowed hosts and trusted proxy configuration."
---

The web portal should be reached through an **HTTPS reverse proxy**. OpenSigWeave itself does not provision TLS or firewall rules. For a reverse proxy on the same Linux machine choose `127.0.0.1` at the new-install bind prompt. For a different machine, choose the application's private IPv4 address and allow only the proxy IP through the firewall.

**New installs default to `APP_BIND_ADDRESS=0.0.0.0`.** This listens on every IPv4 host interface and may be publicly reachable without a suitable firewall.

Configure `APP_ALLOWED_HOSTS` with explicit DNS names, and trust only the immediate reverse proxy in `TRUSTED_PROXY_CIDRS`. Do not trust all networks. The application uses the latter for forwarded-header/client-IP handling, not for access control.

Image assets intended for recipients need public HTTPS access to `GET /signature-assets/...`; uploads and administration remain authenticated. Check that the reverse proxy does not block legitimate asset URLs, expose internal configuration or bypass the application's authentication.

After proxy changes, test portal login, CSRF protection, public asset GET and a staging message's rendered signature. See [installation security details](/reference/install-update/).
