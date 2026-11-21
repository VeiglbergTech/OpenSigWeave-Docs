---
title: "CLI"
description: "Appropriate uses for operator commands"
---

The product intentionally does **not** duplicate every web CRUD action in a separate CLI. Routine administration is performed through the portal or supported REST endpoints; internal engine processing is not a CLI user feature.

Privileged CLI procedures cover full encrypted backup, archive verification, restore, retention and off-host backup scheduling. These need local Docker/filesystem access and are not equivalent to management-key HTTP operations.

See [CLI/API feature decisions](/reference/cli-api-v1/) and [backup CLI procedures](/reference/backup-restore-design/). Always check the help output of the checked-out application version before scripting.
