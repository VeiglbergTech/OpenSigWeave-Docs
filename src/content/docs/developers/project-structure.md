---
title: "Repository structure"
description: "Locate implementation and test packages"
---

The application repository contains:

- \`main.py\` — FastAPI routes and portal integration.
- \`core/\` — engine service, selection, rules, schedules and rendering boundaries.
- \`identity/\` — LDAP, OIDC and provider abstraction.
- \`models.py\`, \`database.py\`, \`migrations/\` — SQLAlchemy models and Alembic.
- \`adapters/\` and \`rspamd/\` — transport-specific integrations.
- \`templates/\`, \`static/\` — portal UI and CKEditor integration.
- \`backup_*.py\`, \`admin_import.py\`, \`admin_export.py\` — operator and import/export tools.
- \`tests/\` — regression and browser checks.
- \`compose.yaml\`, \`Dockerfile\` — deployment.

Browse the [development tree](https://github.com/VeiglbergTech/OpenSigWeave/tree/dev) and [engine reference](/reference/engine-service/). This docs repository contains only statically generated documentation.
