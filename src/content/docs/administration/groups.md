---
title: "Signature groups"
description: "Reusable sets of weighted signatures"
---

A **signature group** selects among eligible signatures and can be used as a rule or scheduling target. Group membership has weights; the engine applies weighted selection with no immediate repeat where the eligible set permits it.

Do not assume that random rotation guarantees equal distribution for small samples. Validate group member status and domain scope before enabling a rule.

The rule target may be a group, and previews must not advance the live rotation history. Internal group tags and compatibility syntax are not a required manual editing step. Read the [engine details](/reference/engine-service/) and [rule behavior](/administration/rules/).
