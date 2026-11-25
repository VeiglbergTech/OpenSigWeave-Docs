# Maintainers: two-branch documentation deployment

## Branch model: dev → CI → main → GitHub Pages

The **only active documentation branches are `dev` and `main`**. The application repository has its own independent release/branch rules.

- All documentation edits are committed to `dev`.
- On every `dev` push, **Documentation CI** builds Starlight and checks Markdown, links, browser rendering, workflow policy and the exact reviewed application source baseline; **Documentation Security CI** audits dependencies, scanned content and history.
- The `auto-promote-main.yml` GitHub Actions workflow receives a completed successful Documentation CI `push` event (or an explicit maintainer retry). It separately verifies that **both** source push CI runs completed successfully for the **exact same current `dev` SHA**. Failed, cancelled, missing or pending checks never count as passing.
- Using the repository-scoped GitHub App installation token, it fast-forwards `main` to that exact SHA. There is no merge/rebase/squash commit and no force push. If `main` has diverged, the workflow fails closed; resolve the divergence explicitly.
- A GitHub App-authored `main` push triggers `pages.yml` and deploys to GitHub Pages **only if Pages has been configured**.
- When App credentials are absent, the promotion workflow records a notice and safely skips promotion. It can be retried with **Actions → Auto-promote verified documentation dev to main → Run workflow (dev)** after setup. The existing, retired `beta` ref is not used by any automation.

## Reuse the existing OpenSigWeave GitHub App

**No new App, App ID or private key is necessary.** Reuse the existing GitHub App already used for application CI promotion.

1. Go to GitHub **Settings → Applications → Installed GitHub Apps** (or the organization's GitHub App installations). In the existing App installation, select **OpenSigWeave-Docs** as an authorized repository if its access is limited to selected repositories. Keep **Contents: Read and write** and **Actions: Read**.
2. In **VeiglbergTech/OpenSigWeave-Docs → Settings → Secrets and variables → Actions**, configure the *existing* values as repository secrets **`CI_PROMOTION_APP_ID`** and **`CI_PROMOTION_APP_PRIVATE_KEY`**. If these names already exist as permitted organization secrets exposed to this repository, do not duplicate them. Do not paste or commit private keys to the repository.
3. Verify the App has permission to update `main`. If GitHub branch protections or rulesets require bypass, explicitly allow **only this installed GitHub App**, not all actors. Protection settings cannot be enforced just by committing workflow files.
4. Trigger the promotion workflow on `dev` once to promote the last already-verified commit if no new push occurs; thereafter it runs automatically. The workflow uses public-repository standard GitHub-hosted runners; it does not require paid runners or other infrastructure.

GitHub's default `GITHUB_TOKEN` is intentionally read-only in the promotion workflow. A push performed with that token would not trigger the downstream Pages push workflow. The GitHub App token ensures the approved `main` push triggers normal CI and Pages.

## GitHub Pages: docs.opensigweave.de

1. Configure **Settings → Pages → Build and deployment → Source: GitHub Actions** in the documentation repository.
2. If using a `github-pages` environment branch policy, allow deployments only from **`main`**. Do not require manual approvals if automatic deployment is desired.
3. In the `opensigweave.de` DNS zone, add **CNAME `docs` → `veiglbergtech.github.io`**. Remove any conflicting A/AAAA/CNAME entries at the same name. DNS setup is separate from this repository.
4. Configure the GitHub Pages custom domain as **`docs.opensigweave.de`**, matching `public/CNAME`, Astro `site`, and `robots.txt`.
5. Enable **Enforce HTTPS** after GitHub verifies the domain and issues a certificate. Configure domain verification TXT records only when prompted with an actual GitHub verification value.

The site is static (Astro/Starlight), with no paid hosting, runtime server, database or external CMS. Pages is published only from `main`, never directly from `dev`.

## Content and release integrity

The site describes the currently reviewed OpenSigWeave release and its limits. Keep the application source manifest aligned with a reviewed application `main` snapshot; do not silently publish untested application behavior. Historical reference notes remain identified as such. Original application docs must not be removed until external links and redirects have been reviewed.

The first alpha's source/image SHA mismatch is documented and must not be hidden. Documentation tests cannot replace actual mail-client, DKIM, live identity or injection acceptance tests in the application.
