---
title: "Logging"
description: "Application, Compose and adapter diagnostics"
---

Inspect container startup and processing logs with:

```bash
docker compose ps
docker compose logs --tail=100 opensigweave
docker compose logs --tail=100 postgres
```

Never log raw management keys, identity-provider tokens, directory passwords or personal signature content unnecessarily. Apply sensible rotation and access restrictions at the host.

Inspect Mailcow/Rspamd logs separately when an adapter is enabled; a passing OpenSigWeave health check does not demonstrate successful email submission.
