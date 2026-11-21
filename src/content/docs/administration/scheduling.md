---
title: "Signature scheduling"
description: "Time windows, target and deterministic priority"
---

Scheduling selects a particular signature or group for a configured time window. Administrators set the start, end, optional domain scope and priority.

## Rules

- The start time must precede the end time.
- Time windows are persisted in UTC; interpret local times carefully when crossing daylight-saving boundaries.
- Before the start and after the end, normal selection applies.
- During an active window, a matching schedule can take precedence.
- Overlapping windows resolve through defined domain scope and priority ordering rather than random choice.

Example: a seasonal signature from December 1 at 00:00 through December 27 at 00:00 in the intended timezone. Verify the actual UTC representation. The [API reference](/reference/api/) describes scheduling endpoints.
