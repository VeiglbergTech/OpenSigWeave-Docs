---
title: "Users and permissions"
description: "Administrator and regular-user identity model"
---

OpenSigWeave has a local emergency administrator and managed provider-based user sessions. Normal users need membership in \`signature-users\`; administrators require \`signature-admins\`. These are application group names, not mail-server sender authorization.

Personal override operations are session-authenticated and deliberately not exposed through a general machine administrator key as a substitute for user identity.

Test access using a regular nonadministrator account; do not grant administrator permissions via email aliases or unverified claims. See [OIDC](/administration/oidc/) and [LDAP](/administration/ldap/).
