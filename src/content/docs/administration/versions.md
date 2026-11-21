---
title: "Signature versions"
description: "Immutable history and safe previews"
---

Creation records version 1. Editing a template creates a new immutable version rather than replacing older source. The active version is separate from historical previews.

You can reopen and inspect an earlier version from the UI without activating it. Immutable image asset names keep referenced files stable across versions.

To roll back content, use [restore-as-new-version](/administration/version-restore/); never manually edit version rows in PostgreSQL.
