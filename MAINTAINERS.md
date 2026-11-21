# Maintainers: release and Pages configuration

## Branches and controls

All changes are developed on \`dev\`. Promote to \`beta\` only after documentation and security CI pass AND the linked application documentation migration is coherent. Promote \`beta\` to \`main\` only after actual beta review and explicit maintainer approval. Branch protection/rulesets need to be set manually in repository Settings; the presence of this file does not enforce them.

Create rulesets for \`dev\`, \`beta\`, \`main\`: require pull requests and relevant passing checks; prevent deletions and force-push; protect \`main\` against direct pushes; require signed or reviewed changes where appropriate. Do not allow GitHub Actions to promote automatically.

## Pages (do not enable until authorization)

1. Keep Pages disabled until the owner explicitly approves publishing a tested \`main\` commit.
2. In Settings → Pages choose **GitHub Actions** as Build and deployment Source.
3. In Settings → Environments → \`github-pages\`, set **Deployment branches: Selected branches → main**. Add required reviewers if supported by your GitHub plan and require the maintainer's explicit approval.
4. The \`pages.yml\` workflow uses only \`push\` to \`main\` and has an extra \`github.ref == 'refs/heads/main'\` guard. It never runs from \`dev\` or \`beta\`.
5. Verify custom-domain ownership and enable **Enforce HTTPS** once GitHub has issued the certificate.
6. Create a manual DNS CNAME: **Host/Name:** \`docs\`, **Type:** \`CNAME\`, **Target/Value:** \`veiglbergtech.github.io\` (no protocol or path). This is an organizational GitHub Pages project site using a custom subdomain. Do not create conflicting A/AAAA records or another CNAME at \`docs\`.
7. Add the custom domain \`docs.veiglbergtech.com\` in Settings → Pages. Repository \`public/CNAME\` mirrors the value, and \`site\` is configured in Astro. Verify GitHub's DNS checks and certificate issuance before publication.
8. Optionally add GitHub's \`_github-pages-challenge-veiglbergtech.docs\` DNS TXT record **only if GitHub explicitly requests it** for verified ownership; use GitHub's displayed token, not a guessed one.

## Versions

\`src/content/docs/\` describes the current manually released stable version after release. Archive prior releases as static pages under \`src/content/docs/versions/vYYYY.MM/\` only upon approved release changes. The version archived must cite an immutable application commit SHA. Do not generate versioned pages automatically from \`dev\` or \`beta\`.

## Known limitations / migration gate

- App logo is temporarily referenced from GitHub source until the original binary is copied locally.
- Static HTML and link checks must pass before promotion; do not assume they have passed from local source inspection.
- Source documents remain in the app repository until the website is verified and application links are migrated in one coherent tested release.
- GitHub Pages deployment is intentionally disabled on this branch. Real mail-client, DKIM and live identity acceptance belongs to OpenSigWeave, not the docs website.
