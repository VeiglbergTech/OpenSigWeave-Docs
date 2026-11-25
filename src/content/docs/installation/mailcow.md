---
title: "Mailcow and Rspamd integration"
description: "Selected live Mailcow/SOGo integration is tested, but production acceptance is outstanding."
---

> **Early access:** selected live Mailcow/SOGo tests passed, including DKIM checks, CID images, nested replies, rules, scheduling and Authentik. This does **not** certify other clients, all SMTP paths or production transport.

OpenSigWeave runs as an **independent Docker Compose stack**. Its Rspamd Lua adapter is installed into the mail server's approved local configuration path. Do not replace Mailcow's shipped scripts or assume the adapter authorizes sender identities.

Before installing or enabling an adapter:

1. Test against a **disposable Mailcow environment**; take separate mail-server configuration backups.
2. Keep the engine API key separate from administrator credentials and configure its reachable HTTPS URL.
3. Verify authenticated send-as authorization, sender aliases and the location of the injection hook relative to DKIM signing.
4. Exercise both HTML/plain-text bodies, MIME/multipart/CID assets, attachments, replies, forwards, failure policy and duplicate processing.
5. Verify the final **delivered** message's DKIM result. Local test signing alone is insufficient.
6. Confirm the opted-in guard and failure policy, understanding that independent missing-injector enforcement remains unverified.

Read the [complete Mailcow/Rspamd integration instructions](/reference/mailcow-rspamd-integration/) and [acceptance matrix](/reference/mail-usage-acceptance-matrix/) before modifying mail processing. The Postfix Milter and Stalwart adapters remain experimental.
