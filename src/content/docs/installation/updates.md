---
title: "Updates and pre-update backups"
description: "Exact-source GHCR checks and optional backup rules for safe alpha updates."
---

## Check and update your current channel

```bash
./update.sh --version
./update.sh --check
./update.sh --prefetch
./update.sh --dry-run
./update.sh
```

The updater stays on the current branch, requires a clean checkout and fast-forward ancestry, does not delete persistent Docker volumes, and keeps an interruption journal if an update fails. It does not automatically roll back a changed database schema.

**The `main` updater verifies a published GHCR image matching the exact target Git SHA before changing code or database state.** A documentation-only `main` commit without a matching published image is therefore **not deployable through the updater**. On `dev` and `beta`, the local source-build overlay is used instead.

## Backup policy is optional

| Backup Rules state | Update behavior |
| --- | --- |
| No enabled rules | Update proceeds without a backup or warning |
| Enabled usable rule | Creates and verifies an encrypted backup before updating |
| Enabled backup fails | Update stops and asks whether to proceed without a recovery point |
| Unattended failed backup | Aborts unless separately approved with `--yes --continue-without-backup` |

If a configured backup fails, **do not treat that as an absent backup**. The updater records whether the backup was verified, absent or failed and overridden. Existing rules, destinations and retention settings are preserved.

`--prefetch`, `--check` and `--dry-run` do not create backups. Review migrations and critical changes before using `--approve-breaking`. The backup is optional, but operating without a recovery copy increases data-loss risk.

If a failed update leaves `.git/opensigweave-update-state.json`, review its status and the [recovery reference](/reference/upgrade/) before trying again. Do not delete it blindly or restart older code against a migrated database.

See [complete install/update reference](/reference/install-update/), [backup rules](/reference/backup-rule-management/) and [release process](/reference/release-process/).
