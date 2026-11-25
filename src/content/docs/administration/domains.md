---
title: "Domains and identity fallbacks"
description: "Configure sender domains, identity providers, fallback values and rule scope."
---

Under **Domains**, configure each managed sender domain and its signature eligibility. Use the domain-management dialog for identity and authentication settings instead of attempting to change provider assignments directly from a table.

A domain can have **Identity Provider** settings for profile attributes and separate **Authentication / SSO Provider** settings for portal sign-in. Local administrator access remains distinct.

### Fallback attributes

Domain-specific fallback values can provide missing names, job title, company and contact details when a known or unknown sender has no corresponding profile value. Available LDAP/OIDC attributes have priority. A missing fallback leaves a field empty. **The real sender address is never replaced by a fallback value.** Distinguish an unknown user from a technical identity-provider outage.

Configured domains do not imply send-as authorization. The outgoing mail server must enforce sender and alias permissions before adapter processing.

See [fallback design and mappings](/reference/domain-fallbacks/), [identity providers](/administration/oidc/) and [rules](/administration/rules/).
