---
title: "Mailcow integration"
description: "Staging-only Mailcow integration with the Rspamd adapter."
---

> **Not production-certified.** The integration has automated MIME rewrite tests; live Mailcow SMTP, filtering order and DKIM-chain acceptance are still mandatory.

OpenSigWeave runs in its **own** Compose deployment. Only the Rspamd adapter files are installed into Mailcow's supported local configuration directories. Do not replace Mailcow's shipped \`rspamd.local.lua\`.

From a disposable Mailcow checkout, use matching application files:

\`\`\`bash
install -d -m 0755 data/conf/rspamd/plugins.d data/conf/rspamd/lua
install -m 0644 /path/to/OpenSigWeave/rspamd/opensigweave.lua data/conf/rspamd/plugins.d/opensigweave.lua
install -m 0644 /path/to/OpenSigWeave/rspamd/opensigweave_mime.lua data/conf/rspamd/lua/opensigweave_mime.lua
\`\`\`

The Rspamd settings require the HTTPS engine endpoint and a matching independent engine key. Follow the **complete** [staging configuration and acceptance procedure](/reference/mailcow-rspamd-integration/) rather than deploying only these commands.
