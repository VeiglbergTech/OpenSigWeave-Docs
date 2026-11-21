---
title: "Reverse proxy and HTTPS"
description: "Safe HTTPS exposure and asset delivery."
---

Place a supported reverse proxy in front of the application on port \`8085\`. Keep the default loopback bind when the proxy is on the same Linux host; for a separate proxy, bind only to a private interface and firewall the service to the proxy's private address.

## Important routes

- Administration, login and management APIs must remain protected by their normal application authorization.
- \`GET /signature-assets/<hash>.<extension>\` must be publicly reachable without an administrator session if remote signature images should display in recipients' mail clients.
- The \`POST /api/admin/signature-assets\` route remains administrator-only, session/CSRF protected.

Configure \`APP_ALLOWED_HOSTS\` to the intended externally visible hostname. Restrict \`TRUSTED_PROXY_CIDRS\` to the real trusted proxy network if forwarded source addresses are used. Never disable TLS verification for OIDC, LDAP or engine HTTPS.
