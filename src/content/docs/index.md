---
title: "OpenSigWeave documentation"
description: "Install, configure, operate and extend OpenSigWeave."
---

# OpenSigWeave Documentation

OpenSigWeave is a self-hosted, mail-server-independent email signature manager with a browser administration portal, PostgreSQL configuration storage, versioned templates, selection rules and adapter-based delivery.

> **Release status:** The November 2026 v2026.11 / v1.0 candidate has **not** been released or certified for production. These pages document the currently implemented development candidate. Live Mailcow/DKIM, identity-provider and real-mail-client acceptance remain necessary.

## Start here

- [Quick start](/getting-started/quickstart/) — run the standalone application.
- [First signature](/getting-started/first-signature/) — create a template, assign it to a domain and check rules.
- [Mailcow integration](/installation/mailcow/) — staging-only Rspamd integration.
- [Backups and restore](/operations/backup/) — encrypted full-backup workflow.
- [API reference](/developers/rest-api/) — administrator and mail-adapter boundaries.
- [Adapter support](/developers/adapters/) — implemented versus experimental.

## Design boundaries

The application runs independently of Mailcow. Mail clients such as SOGo, Outlook and Thunderbird are **not** mail transport adapters. Rspamd is the integration path covered by automated MIME testing; Postfix Milter and Stalwart hooks remain experimental. See [transport compatibility](/reference/client-compatibility/) and [adapter architecture](/reference/adapters/).

## Documentation status

All published content must match an approved application commit. The [candidate release notes](/releases/release-notes/) explain open acceptance work; this preview must not be mistaken for a release.
