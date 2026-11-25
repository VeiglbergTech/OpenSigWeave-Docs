---
title: "Features and compatibility"
description: "Current 2026.11-alpha functionality and acceptance boundaries."
---

## Available in 2026.11-alpha

- Administration portal with **Domains**, **Signatures**, **Signature Groups** and **Rules**.
- CKEditor editing, HTML source, uploaded signature assets, version history and restore-as-new-version.
- Weighted group selection without immediate repetition where applicable, sender/domain rules, user overrides and scheduled signature campaigns.
- Managed identity providers (LDAP/Active Directory and OIDC/Authentik), domain-specific identity mappings and fallback attributes. Identity-provider availability varies by test path.
- Local administrator, branding, selective import/export and encrypted backup rules.
- An adapter-neutral engine with Mailcow/Rspamd integration, plus **experimental** Postfix Milter and Stalwart hook adapters.

## What has and has not been verified

The isolated Mailcow/SOGo path includes selected live signed-email, CID images, nested reply, rotation, scheduling, Authentik and recovery checks. That is not proof of compatibility with all message types or deployment topologies.

Live LDAP acceptance, Outlook and Thunderbird mail-client testing, external DKIM acceptance, sustained load, cross-host recovery and independent fail-closed behaviour when both Rspamd injector and guard are missing remain outstanding. Content Security Policy is report-only.

The complete [release notes](/releases/release-notes/) and [mail acceptance matrix](/reference/mail-usage-acceptance-matrix/) distinguish implementation, laboratory tests and production certification.
