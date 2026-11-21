---
title: "Mail transport adapters"
description: "Rspamd, experimental Postfix and Stalwart integration"
---

## Current adapter matrix

| Adapter | Status |
| --- | --- |
| Rspamd (Mailcow path) | Implemented with MIME/contract tests; **live SMTP/DKIM acceptance pending** |
| Postfix Milter | Experimental implementation with protocol and disposable-Postfix tests; live deployment acceptance pending |
| Stalwart MTA-hook | Experimental implementation with MIME safety tests; live delivery acceptance pending |
| Exim, Haraka, OpenSMTPD, Exchange, native Mailcow integration | Proposed possibilities, **not implemented production adapters** |

Every adapter must authenticate transport-side sender identity, preserve non-target MIME entities, avoid duplicate signatures and apply mutations before DKIM signing. All share engine API policy and rendering instead of duplicating them.

See [adapter architecture](/reference/adapters/), [Postfix design](/reference/postfix-milter-design/) and [Mailcow/Rspamd](/reference/mailcow-rspamd-integration/).
