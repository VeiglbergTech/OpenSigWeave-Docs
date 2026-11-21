---
title: "Rules and priorities"
description: "Domain, sender and attribute matching"
---

Rules match sender/domain, optional group claims or directory attributes and select a signature or group. Administrators assign priority; selection must be deterministic when multiple rules are eligible.

General precedence is explicit per-message selection, active scheduled override, matching rule and configured domain default, as documented for the current engine. Before relying on precedence in mail flow, test the exact configured messages and active schedules.

Use staging messages for different sender aliases and verify that only authorized sender identities can request signatures. See [API resolution precedence](/reference/api/) and [scheduling](/administration/scheduling/).
