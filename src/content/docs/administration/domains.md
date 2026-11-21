---
title: "Domains"
description: "Domain scope and authentication/provider mapping"
---

Register the sender's domain in **Domains** before depending on domain-scoped signatures. Each domain can have a login identity provider, an optional profile-attribute provider, eligible signature assignment and defaults.

Domain-level configuration and sender-specific rules determine which templates are considered for selection. A configured domain does not prove that a user is allowed to send from that address: the email platform must authorize the sender before invoking an adapter.

Test a new domain with a staging account and inspect which rule wins. See [Rules and priorities](/administration/rules/) and [identity providers](/administration/oidc/).
