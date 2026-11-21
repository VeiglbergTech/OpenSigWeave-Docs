---
title: "What is OpenSigWeave?"
description: "Product scope, responsibilities and maturity."
---

OpenSigWeave centrally manages reusable email signatures. Administrators configure domains, templates, identity sources, matching rules and time windows; a mail-server adapter requests the applicable rendered signature for outgoing messages.

## How it works

1. The sending mail system identifies and authorizes the envelope sender.
2. Its adapter passes an authenticated request to the OpenSigWeave engine.
3. The engine resolves sender/domain, rules, schedules and eligible signature or group.
4. The adapter inserts the selected result before supported quoted reply history and before DKIM signing.

## What it does not replace

OpenSigWeave is **not** an SMTP server, a mailbox service or a mail-client plugin. It does not authorize sending identities for the mail platform. Supported adapters must preserve MIME safety, attachments and message signatures. Read the [architecture](/developers/architecture/) and [mail transport integration](/installation/rspamd/).
