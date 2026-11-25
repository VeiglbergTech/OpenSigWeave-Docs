---
title: "Upgrade notes for alpha installations"
description: "Source-verified image updates and migration safeguards."
---

The first published release is `2026.11-alpha`. For any next alpha version, record your current Git SHA and image, review the changelog and test on an isolated installation. On `main`, the update tool will not accept a Docker image whose embedded source revision differs from the intended Git commit.

Use `./update.sh --prefetch` and `./update.sh --dry-run` before changing your deployment. Pre-update backups are optional when no enabled Backup Rule exists, but a failed configured backup requires explicit administrator approval to proceed without a recovery point.

A database migration cannot be safely undone just by using an older Git checkout. Maintain the original encrypted archives and age identity if you expect reliable recovery. Review [operational upgrades](/operations/upgrades/).
