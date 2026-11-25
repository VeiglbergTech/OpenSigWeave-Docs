---
title: "CLI"
description: "Appropriate uses for operator commands"
---

The product intentionally does **not** duplicate every web CRUD action in a separate CLI. Routine administration is performed through the portal or supported REST endpoints; internal engine processing is not a CLI user feature.

The host-side deployment tools provide interactive installation, configuration validation, safe update checks and source/image verification. Backup Rules and Backup History are also available through the portal. Protected recovery identity export is handled by `export_backup_key.sh`. These operations are distinct from management-key HTTP calls.

See [CLI/API feature decisions](/reference/cli-api-v1/), [installation/update reference](/reference/install-update/) and [backup rules](/reference/backup-rule-management/). Always check the help output of the checked-out application version before scripting.
