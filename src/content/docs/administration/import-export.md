---
title: "Import and export"
description: "Selective nonsecret configuration transfer"
---

The administrator UI and REST endpoints support selected ZIP-based exports and validated imports for portable configuration. Use this to move appropriate records between installations, not as a complete disaster-recovery solution.

Exports intentionally exclude sensitive provider secrets and do not replace a full encrypted backup. Check schema compatibility, choose appropriate categories, review the optional pre-import backup, and preview the import effects on a staging instance.

For complete restoration, including database, historical assets, identity configuration and saved images, use the [encrypted backup workflow](/operations/backup/).
