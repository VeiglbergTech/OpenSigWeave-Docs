---
title: "Development and tests"
description: "Validation workflow for code and documentation"
---

## Application

Source changes go to \`dev\`. Run ordinary tests, security checks, migrations, browser tests and adapter MIME fixtures before even considering promotion to \`beta\`. Never automatically change \`main\` or publish a release.

## Documentation

The documentation repository is also developed on \`dev\`. Run \`npm run build\`, \`npm run test:docs\`, \`npm run test:links\` and \`npm run test:security\`. GitHub Actions are configured to perform equivalent checks without pushing generated content.

A green docs build does not prove mail transport correctness. See [main repository test workflows](https://github.com/VeiglbergTech/OpenSigWeave/tree/dev/.github/workflows).
