import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://docs.opensigweave.de',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'OpenSigWeave',
      description: 'Official documentation for OpenSigWeave, the self-hosted email-signature management service.',
      // Original project logo, hosted in its GitHub source repository. Copy to a local
      // static asset before release once binary-asset transfer is available.
      logo: { src: './src/assets/opensigweave.png', alt: 'OpenSigWeave', replacesTitle: false },
      favicon: '/favicon.svg',
      customCss: ['./src/styles/theme.css'],
      editLink: { baseUrl: 'https://github.com/VeiglbergTech/OpenSigWeave-Docs/edit/dev/' },
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/VeiglbergTech/OpenSigWeave' }],
      pagefind: true,
      sidebar: [
        { label: 'Overview', items: [{ slug: 'index' }] },
        { label: 'Getting Started', items: [{ autogenerate: { directory: 'getting-started' } }] },
        { label: 'Installation', items: [{ autogenerate: { directory: 'installation' } }] },
        { label: 'Administration', items: [{ autogenerate: { directory: 'administration' } }] },
        { label: 'Operations', items: [{ autogenerate: { directory: 'operations' } }] },
        { label: 'Developers', items: [{ autogenerate: { directory: 'developers' } }] },
        { label: 'Releases', items: [{ autogenerate: { directory: 'releases' } }] },
        { label: 'Technical references', collapsed: true, items: [{ autogenerate: { directory: 'reference' } }] },
      ],
      head: [
        // Only set an initial preference, preserving the visitor's explicit choice.
        { tag: 'script', content: "try { if (!localStorage.getItem('starlight-theme')) localStorage.setItem('starlight-theme', 'dark'); } catch {}" },
        { tag: 'meta', attrs: { property: 'og:site_name', content: 'OpenSigWeave Docs' } },
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://docs.opensigweave.de/og.svg' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
      ],
    }),
    mdx(),
  ],
});
