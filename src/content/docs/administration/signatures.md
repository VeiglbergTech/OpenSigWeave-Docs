---
title: "Signatures and images"
description: "Create, edit and preview HTML signatures"
---

The signature catalog has stable records and immutable HTML history. Create a template under **Signatures**, assign allowed domains, edit in CKEditor or source mode, and save to create a version. Older versions can be previewed without changing the active content.

## Images

PNG, JPEG and WebP images can be added through supported editor upload mechanisms; the shared CKEditor toolbar also provides font family, size, bold and italic controls. The server stores immutable image assets, referenced with HTTPS URLs under `/signature-assets/`. The editor rejects oversized and invalid uploads; the default image limit is **6 MiB**, optionally **12 MiB** after enabling large uploads in the application settings.

Recipients must be able to fetch assets anonymously, even if the administration portal sits behind proxy SSO. Never use temporary `blob:` URLs or inline large Base64 images. See [version history](/administration/versions/) and [reverse proxy](/installation/reverse-proxy/).
