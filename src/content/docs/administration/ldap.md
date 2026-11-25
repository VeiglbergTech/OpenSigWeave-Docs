---
title: "LDAP / Active Directory"
description: "Directory connection, attributes and TLS"
---

Configure an LDAP provider through **Identity Providers** and assign it within the relevant **Domain** settings. Live LDAP/Active Directory acceptance has not yet been completed for the 2026.11-alpha release. Use a dedicated **read-only** directory service account, a reliable Base DN, a restricted search scope and LDAPS with validated certificates.

Provider credentials are kept in the application's dedicated persistent `opensigweave-idp-data` volume. Configure domain-level login and profile providers separately if needed. Map directory users into the supported application groups.

Always use a trustable CA chain; do not disable LDAP TLS validation to make a misconfigured directory work. See [identity reference](/reference/api/) and [first configuration](/installation/first-configuration/).
