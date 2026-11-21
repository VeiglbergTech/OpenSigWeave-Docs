---
title: "Create your first signature"
description: "Basic template, domain assignment and a safe first test."
---

1. Log in with the local emergency administrator.
2. Under **Domains**, add the sender's verified mail domain.
3. Under **Signatures**, create a signature, choose the appropriate domain scope and edit the HTML in CKEditor.
4. Save, reopen and inspect the preview. Creating a signature records its initial version; later edits record new versions.
5. Configure a **Rule** or domain default that can select the signature.
6. Send a **staging** email through the configured adapter and check both HTML and plain-text alternatives before using the configuration with live recipients.

Image uploads should be reachable by recipients over HTTPS using the public \`/signature-assets/\` route. Uploads require an administrator session; image retrieval does not.

See [signatures](/administration/signatures/), [rules](/administration/rules/) and [Rspamd integration](/installation/rspamd/).
