---
title: "Troubleshooting"
description: "First checks for startup, authentication and missing signatures"
---

## Application does not start

Run \`docker compose config --quiet\`, inspect \`.env\` variables, \`docker compose ps\` and the application/PostgreSQL logs. Check migrations and persistent volume permissions.

## Cannot log in

Verify \`APP_ALLOWED_HOSTS\`, HTTPS proxy headers, secure cookies and local emergency administrator credentials. For OIDC verify exact callback and verified email; for LDAP check LDAPS trust, Base DN and group mapping.

## No signature in outgoing mail

Verify domain scope, enabled signature/group, rule priorities, schedule interval, sender authorization, adapter engine credentials and MIME handling. Use a staging message with known content.

## Images are missing

Check that external recipients can fetch \`GET /signature-assets/<hash>.<extension>\` without SSO and that the HTTPS certificate is trusted. Remote image blocking in a recipient's client is outside the application's control.

Read the [Rspamd integration guide](/reference/mailcow-rspamd-integration/) before touching a live Mailcow deployment.
