---
title: "Random rotation"
description: "Weighted no-repeat signature selection"
---

Rotation occurs within an eligible signature group, not by randomly choosing an arbitrary HTML file. A weighted selector balances member weights while avoiding immediately repeating the previous selection when more than one eligible candidate exists.

Rotation state is persisted and must survive an application restart; concurrency behavior is covered by engine tests. A group with only one eligible signature necessarily repeats that signature.

For deterministic testing, use engine-level tests and staging sends rather than checking a few mailbox samples. See [adapter-neutral engine reference](/reference/engine-service/).
