---
title: "First configuration"
description: "Initial identity, domain and security setup."
---

## Required settings

Set at least \`POSTGRES_PASSWORD\`, \`SECRET_KEY\`, \`ENGINE_API_KEY\`, \`APP_ALLOWED_HOSTS\`, \`LOCAL_ADMIN_EMAIL\` and \`LOCAL_ADMIN_PASSWORD_HASH\`. Generate random values separately for each application secret and keep the \`.env\` file mode \`0600\`.

\`MANAGEMENT_API_KEY\` is optional and enables full administrator API automation. Leave it unset unless there is a specific trusted consumer.

## First administrator session

1. Sign in as the locally configured emergency administrator.
2. Add managed OIDC and/or LDAP providers only if needed.
3. Under **Domains**, associate each domain with login/profile providers as appropriate.
4. Configure user group membership, then test a nonadministrator login.
5. Add signatures and rules, then test using a staging mailserver.

OIDC redirect paths follow \`https://<portal-host>/auth/<provider-id>\`. All identity-provider connections must validate certificates. Details: [identity and API reference](/reference/api/).
