---
title: "REST API"
description: "Authentication, catalog and adapter endpoints"
---

The browser administrator API uses a signed session plus \`X-CSRF-Token\` on state-changing calls. Optional machine administrator access uses a distinct \`MANAGEMENT_API_KEY\` passed as \`X-Management-Key\` to administrator routes. This is a **full administrator credential**.

The adapter-neutral engine uses an independent \`ENGINE_API_KEY\` in \`X-Engine-Key\` and must not receive browser admin permissions. The public immutable image endpoint is intentionally GET-only and unauthenticated.

The API covers domains, signatures/versions, groups, rules, schedules, branding, provider management, selected import/export and diagnostics. Match exact routes, request/response fields and limitations to the code-backed [complete API reference](/reference/api/). **Do not** treat proposed routes as stable.
