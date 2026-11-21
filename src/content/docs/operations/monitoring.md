---
title: "Monitoring and health"
description: "Read-only status and operational signals"
---

The administration interface includes a limited read-only **System** diagnostics tab. The Compose file defines health checks for PostgreSQL readiness and the application TCP listener.

Monitor service restart loops, database and volume health, backup success, TLS expiration and changes to mail adapter error rates. Treat the read-only System view as diagnostic information rather than a full metrics/alerting product.

For mail transport acceptance, record message outcomes and ensure DKIM verification on real submitted messages. There is no claim of an integrated Prometheus exporter in the current release candidate.
