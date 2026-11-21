---
title: "OIDC and SSO"
description: "Authentik and generic OpenID Connect"
---

Create a managed OIDC provider in the Identity Providers UI. Configure the issuer/discovery HTTPS URL, client ID, client secret and exact callback URL \`https://<portal-host>/auth/<provider-id>\` in both systems.

The verified user identity must include a stable subject, valid email, a true boolean \`email_verified\` claim and group membership in \`signature-users\` or \`signature-admins\` as appropriate.

Do not expose client secrets in public configuration or browser code. A managed provider can be enabled or disabled without removing the local emergency administrator. Read [first configuration](/installation/first-configuration/) and [API security](/reference/api/).
