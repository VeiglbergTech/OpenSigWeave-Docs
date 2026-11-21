---
title: "Operational upgrade guide"
description: "Safe upgrade and rollback boundaries"
---

1. Record the current application Git SHA and Compose image IDs.
2. Verify a newly created encrypted full backup and the availability of the offline recovery identity.
3. Read the target release's [breaking changes](/releases/breaking-changes/), Alembic changes and [upgrade details](/reference/upgrade/).
4. Rebuild and start the approved target commit, inspect health and test admin login and signature preview.
5. Test adapter MIME output, sender authorization and DKIM in staging before changing production flow.

A database migration may prevent simply checking out the old Git commit as a rollback. Use the tested full-restore procedure when necessary. Do not remove Docker volumes to work around schema errors.
