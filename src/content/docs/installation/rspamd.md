---
title: "Rspamd adapter"
description: "MIME processing scope and deployment boundaries."
---

The Rspamd Lua adapter calls the versioned OpenSigWeave engine endpoint and updates supported `text/html` and `text/plain` MIME alternatives. The shared engine handles policies and rendering; Rspamd handles mail-event and MIME concerns.

## Safety expectations

- Preserve attachments, unrelated headers and multipart structure.
- Do not inject twice or rewrite signed/encrypted messages.
- Validate sender authorization in the sending mail system.
- Integrate before final DKIM signing and perform live delivery acceptance.

Nested MIME, Unicode, long headers, inline images and content-transfer encodings have automated fixture coverage, but selected isolated Mailcow/SOGo integration tests have now passed; broader production interaction and other mail clients still need dedicated verification. Read [Mailcow staging instructions](/reference/mailcow-rspamd-integration/) for the exact Lua paths, configuration block and acceptance matrix.
