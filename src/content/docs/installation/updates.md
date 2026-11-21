---
title: "Updates and migrations"
description: "Version-aware upgrade precautions."
---

Always identify your exact Git commit and backup state before updating a running instance. The current release-candidate deployment source is \`beta\` and is not a production acceptance certificate.

\`\`\`bash
cd /opt/opensigweave
git rev-parse HEAD
docker compose ps
docker compose logs --tail=100 opensigweave
\`\`\`

Take and verify an encrypted full backup, review migration and release notes, change to the intended approved commit, rebuild the service and verify startup, login, signature rendering and adapter behavior. Do not delete the database or signature volumes to "fix" migrations.

The complete procedure and rollback limitations are in [Upgrade and recovery](/reference/upgrade/).
