# OpenSigWeave documentation

Astro + Starlight static documentation source for the OpenSigWeave project.

**Status:** Under development on \`dev\`. No public Pages deployment has been approved. \`main\` must not be updated before manual approval and actual beta testing.

- Source application: [VeiglbergTech/OpenSigWeave](https://github.com/VeiglbergTech/OpenSigWeave)
- Future documentation URL: https://docs.veiglbergtech.com
- Deployment: GitHub Actions → GitHub Pages, only on \`main\`
- Documentation source: \`src/content/docs/\`
- Project migration evidence: \`MIGRATION_MANIFEST.md\`

## Development

Node.js 22.12 or later. Run \`npm install\`, \`npm run dev\`, \`npm run build\`, \`npm run test:docs\`, \`npm run test:links\` and \`npm run test:security\`.

Dependencies are pinned by the committed npm lockfile, with immutable pinned GitHub Actions and a high-severity vulnerability audit. Build output is intentionally not committed.

## Publication gate

Never deploy from \`dev\` or \`beta\`. \`main\` deployment is prepared but gated by the GitHub Pages environment and manual release approval. Required GitHub repository settings and DNS are documented in \`MAINTAINERS.md\`.

Documentation is distributed under [GPL-3.0](LICENSE), consistent with the application repository.
