---
title: "Docker Compose"
description: "Compose topology and container startup."
---

The [tracked Compose stack](https://github.com/VeiglbergTech/OpenSigWeave/blob/dev/compose.yaml) runs \`postgres\` and \`opensigweave\`. The web container is built from the local checkout, not pulled from an automatically published \`dev\` or \`beta\` image.

## Deployment

\`\`\`bash
git clone --branch beta --single-branch https://github.com/VeiglbergTech/OpenSigWeave.git
cd OpenSigWeave
cp .env.example .env
chmod 600 .env
# Configure all required secrets and the local admin password hash.
docker compose config --quiet
docker compose up -d --build
\`\`\`

## Persistent volumes

- \`opensigweave-postgres-data\` — PostgreSQL state.
- \`opensigweave-signatures\` — templates, versions and image assets.
- \`opensigweave-idp-data\` — managed provider settings, including secrets.

**Never** delete these volumes as part of a routine update. The application container uses a read-only root filesystem and drops Linux capabilities. Follow [backup instructions](/operations/backup/) first.
