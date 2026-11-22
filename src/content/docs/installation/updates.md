---
title: "Safe updates"
description: "Channel-bound, encrypted-backup-gated OpenSigWeave update workflow."
---

The host-side update tool is available in Git checkouts containing the new installer. It never pushes to GitHub, switches branches, deletes Docker volumes or modifies a mail server.

## Commands

```bash
./update.sh --version
./update.sh --check
./update.sh --dry-run
./update.sh --prefetch
./update.sh
```

| Option | Behaviour |
| --- | --- |
| no option | Preflight, mandatory verified encrypted backup, local fast-forward, build, serialized migration, start and healthchecks |
| `--check` | Read-only compare of the local commit against the remote head of the *same* channel; no fetch or restart |
| `--dry-run` | Read-only health, volume and configuration preflight; preview cached changes and backup prerequisites |
| `--prefetch` | Download Git objects to the remote-tracking ref without modifying the local checkout or containers |
| `--skip-start` | Update source, build and migrate, but leave the application stopped intentionally |
| `--version` | Show local checkout branch and commit |
| `--yes` | Approve the ordinary confirmation (useful in controlled noninteractive workflows) |
| `--approve-breaking` | Separate explicit approval for changes to migration, adapter, Docker/Compose or configuration files |
| `--help` | Full CLI usage |

`--check` cannot inspect the changes in a remote commit that has not been downloaded yet. Run `--prefetch` followed by `--dry-run` to review the fetched diff. The source must be a clean, non-shallow checkout with the authorized upstream; divergence is rejected, never force-reset. No automatically updated server-side branches are involved.

## Branch and image policy

- `dev`: development source, built locally; not a production release.
- `beta`: source promoted only after regular and security CI; built locally. Requires actual deployment testing.
- `main`: manually approved release source. The updater currently builds locally from its checked-out source, and **does not pull arbitrary GHCR tags**. Any future published image must come only from an approved `main` commit.

The tool never switches from `beta` to `main`, nor does it publish images, releases or tags. To change channel, use a separately reviewed checkout and recovery plan; schema downgrades are not offered.

## Mandatory backup setup

The updater requires the existing complete age-encrypted disaster-recovery backup CLI. Create a protected configuration file readable only by the operator:

```bash
mkdir -p ~/.config/opensigweave
chmod 700 ~/.config/opensigweave
umask 077
cat > ~/.config/opensigweave/backup.env <<'EOF'
BACKUP_DIRECTORY=/mnt/opensigweave-backups
AGE_RECIPIENT=age1YOUR_ACTUAL_PUBLIC_RECIPIENT
AGE_IDENTITY=/media/offline/opensigweave-age-identity.txt
EOF
chmod 600 ~/.config/opensigweave/backup.env
export OSW_BACKUP_CONFIG="$HOME/.config/opensigweave/backup.env"
```

The backup destination must be an accessible, writable directory on a mounted NFS/NFS4, SMB/CIFS, SSHFS or rclone filesystem. The `AGE_IDENTITY` private file must exist when the update runs, have mode 0600 and remain **outside the application .env and Git repository**. Keep a second off-host/offline copy. `age`, Docker/Compose, `findmnt`, Git and Python 3 must be available. No installer secretly generates an identity, weakens encryption or substitutes a plaintext backup. The public recipient and identity path are separate values.

Before changing source, the updater uses `backup_cli.py create` (which already encrypts and verifies) and invokes `backup_cli.py verify` again. A failure aborts the update.

## Migration, errors and recovery

The application normally migrates the database on boot. During an orchestrated update, the web service is stopped and exactly one ephemeral application container runs `alembic upgrade head`; the updated web process is started only afterwards. Direct Docker Compose deployments still work with the existing boot migration.

If source download, config validation or build fails before the service is stopped, investigate the checkout and still-running container rather than force-resetting. **If migration or the post-migration healthcheck fails, do not start an older application against the new schema.** Keep the verified archive, diagnose the cause, and restore to a *fresh* target using the existing encrypted backup restore procedure. No automatic destructive recovery occurs. `--skip-start` leaves the service offline until the administrator explicitly completes the rollout.

The new updater does not migrate external mail servers or edit Rspamd, Postfix or Stalwart configuration. Critical adapter changes are flagged for separate compatibility review. Do not send production mail as an update acceptance test.

Read [Backup](/operations/backup/), [Restore](/operations/restore/), [Upgrade reference](/reference/upgrade/), and [Breaking changes](/releases/breaking-changes/).
