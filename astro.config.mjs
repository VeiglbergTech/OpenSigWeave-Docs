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
      description: 'Official English and German documentation for the self-hosted OpenSigWeave email-signature manager.',
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        de: { label: 'Deutsch', lang: 'de' },
      },
      logo: { src: './src/assets/opensigweave.png', alt: 'OpenSigWeave', replacesTitle: false },
      favicon: '/favicon.png',
      customCss: ['./src/styles/theme.css'],
      components: { Footer: './src/components/LegalFooter.astro' },
      editLink: { baseUrl: 'https://github.com/VeiglbergTech/OpenSigWeave-Docs/edit/dev/' },
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/VeiglbergTech/OpenSigWeave' }],
      pagefind: true,
      sidebar: [
        { label: 'Overview', translations: { de: 'Übersicht' }, items: [{ slug: 'index' }] },
        { label: 'Getting Started', translations: { de: 'Erste Schritte' }, items: [{ autogenerate: { directory: 'getting-started' } }] },
        { label: 'Installation', translations: { de: 'Installation' }, items: [{ autogenerate: { directory: 'installation' } }] },
        { label: 'Administration', translations: { de: 'Administration' }, items: [{ autogenerate: { directory: 'administration' } }] },
        { label: 'Operations', translations: { de: 'Betrieb' }, items: [{ autogenerate: { directory: 'operations' } }] },
        { label: 'Developers', translations: { de: 'Entwicklung' }, items: [{ autogenerate: { directory: 'developers' } }] },
        { label: 'Releases', translations: { de: 'Versionen' }, items: [{ autogenerate: { directory: 'releases' } }] },
        { label: 'Technical references', translations: { de: 'Technische Referenzen' }, collapsed: true, items: [{ autogenerate: { directory: 'reference' } }] },
      ],
      head: [
        { tag: 'meta', attrs: { property: 'og:site_name', content: 'OpenSigWeave Docs' } },
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://docs.opensigweave.de/og.svg' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
      ],
    }),
    mdx(),
  ],
});
