---
title: "Configuration generator"
description: "Create and safely review the local .env file."
---

Run `./generate_config.sh` before a first installation, or let `./install.sh` run the same interactive generator. Administrator passwords are read without echo, confirmed and stored exclusively as scrypt hashes. PostgreSQL, session and engine credentials are generated independently.

```bash
./generate_config.sh             # create .env only if absent
./generate_config.sh --check     # validate existing .env without changes
./generate_config.sh --preview   # list proposed safe optional additions only
./generate_config.sh --migrate   # confirm and append missing safe defaults
./generate_config.sh --migrate --yes  # controlled automation of optional additions
```

The generator refuses to replace or regenerate an existing file and refuses symlinks or duplicate settings. Migration does not rotate existing credentials and writes changes atomically with mode 0600. Missing required secret, FQDN or administrator credentials are not guessed; add them manually under administrator control before retrying. Review any new configuration keys and firewall/proxy changes separately.

The application supports local authentication and administrator-configured identity providers; the installer does not modify their database records or persistent credential volume. Never put age private keys, live `.env` or identity-provider tokens into Git.

For continuous operation follow [Safe updates](/installation/updates/) and [Backup](/operations/backup/).
