---
title: "Administration portal"
description: "Administrator workflows and permissions"
---

The administration portal provides routine controls for **Domains**, **Signatures**, **Signature Groups**, **Rules** (including time-dependent rules), **Branding** and **Identity Providers**, plus a limited read-only **System** status view.

An administrator must have the `signature-admins` identity group or use the separate local emergency administrator. Browser changes require the session CSRF token; the UI supplies it automatically.

Use the editor and preview before making a signature eligible for a mail flow. Browser functionality is not a substitute for an adapter acceptance test. For administrative automation, read the [REST API documentation](/developers/rest-api/).
