---
title: "Breaking changes and migrations"
description: "Compatibility constraints introduced in 2026.11-alpha."
---

The 2026.11-alpha source retires the older fixed signature modes `AUTO`, `INTERNAL` and `PROFESSIONAL`; installations with legacy data should verify migrated groups, domain mappings and rule priorities.

Other migration-sensitive changes include provider-specific OIDC callback routes, independent administrator and engine API keys, HTTPS signature asset access, PostgreSQL schema migrations and the source-SHA verification introduced for published GHCR images.

Prior to upgrading, read [alpha release notes](/releases/release-notes/), [update procedure](/installation/updates/) and [technical migration reference](/reference/upgrade/). Backup Rules are optional, but a configured failed backup requires explicit override.
