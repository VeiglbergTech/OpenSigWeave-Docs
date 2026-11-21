---
title: "Quick start"
description: "Clone beta and start the standalone Compose stack."
---

> **Candidate software:** The documented \`beta\` branch is for testing, not a certified production release. The \`dev\` branch must be built from source; there is no guaranteed prebuilt container image.

## Install

\`\`\`bash
sudo mkdir -p /opt/opensigweave
sudo chown "$USER":"$USER" /opt/opensigweave
git clone --branch beta --single-branch https://github.com/VeiglbergTech/OpenSigWeave.git /opt/opensigweave
cd /opt/opensigweave
cp .env.example .env
chmod 600 .env
python -c "import secrets; print(secrets.token_urlsafe(48))"
python scripts/hash_password.py
\`\`\`

Set unique \`POSTGRES_PASSWORD\`, \`SECRET_KEY\` and \`ENGINE_API_KEY\`, configure \`LOCAL_ADMIN_EMAIL\`, \`LOCAL_ADMIN_PASSWORD_HASH\` and \`APP_ALLOWED_HOSTS\` in \`.env\`. Compose supplies \`DATABASE_URL\` from the PostgreSQL variables; never reuse credentials.

\`\`\`bash
docker compose config --quiet
docker compose up -d --build
docker compose ps
docker compose logs --tail=100 opensigweave
\`\`\`

Put an HTTPS reverse proxy in front of the service. **Do not expose the admin endpoint or the PostgreSQL port directly to the internet.** Then [complete initial configuration](/installation/first-configuration/).

Detailed preflight and upgrade instructions are in [the original upgrade guide](/reference/upgrade/).
