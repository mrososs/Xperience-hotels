// =====================================================================
// XPERIENCE HOTELS — Nuxt 4 (SSR)
// Full server-side rendering for SEO: every route (EN + /ar prefixed AR)
// ships complete HTML with per-page meta. Content is hardcoded in
// app/data today; runtimeConfig carries the future Storyblok token so
// the CMS can slot in without config churn.
// =====================================================================
export default defineNuxtConfig({
  compatibilityDate: '2026-06-12',
  devtools: { enabled: true },

  // Targeted SEO modules (sitemap + robots). Canonical URLs and hreflang
  // alternates come from @nuxtjs/i18n's useLocaleHead (wired in app.vue);
  // JSON-LD is hand-rolled in the resort page — no extra modules needed.
  // @nuxt/image optimizes the (remote, brand-CDN) photography — resized +
  // AVIF/WebP — used through useBgImage() for the CSS background pattern.
  modules: ['@nuxtjs/i18n', '@nuxtjs/sitemap', '@nuxtjs/robots', '@nuxt/image'],

  // Same order main.ts imported them: tokens/base first, page CSS after.
  css: [
    '~/assets/styles/main.scss',
    '~/assets/styles/resort/site.css',
    '~/assets/styles/resort/hotel.css',
    '~/assets/styles/resort/about.css',
    '~/assets/styles/resort/meetings.css',
    '~/assets/styles/resort/contact.css',
    '~/assets/styles/resort/offers.css',
  ],

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap',
        },
      ],
      script: [
        // Mark JS as available so the reveal directive's hidden start state
        // only applies when we can animate it back in (no-JS shows everything).
        { innerHTML: "document.documentElement.classList.add('js')", tagPriority: 'critical' },
      ],
    },
  },

  // Canonical URLs, og:url, sitemap and robots all derive from this.
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://xperience-hotels.com',
    name: 'Xperience Hotels',
  },

  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_except_default', // /  (en)  and  /ar/...
    locales: [
      { code: 'en', language: 'en', dir: 'ltr', name: 'English', file: 'en.json' },
      { code: 'ar', language: 'ar', dir: 'rtl', name: 'العربية', file: 'ar.json' },
      { code: 'de', language: 'de', dir: 'ltr', name: 'Deutsch', file: 'de.json' },
      { code: 'it', language: 'it', dir: 'ltr', name: 'Italiano', file: 'it.json' },
      { code: 'ru', language: 'ru', dir: 'ltr', name: 'Русский', file: 'ru.json' },
    ],
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://xperience-hotels.com',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'xp-lang',
      redirectOn: 'root', // keep deep links crawlable — only redirect on /
      alwaysRedirect: false,
      fallbackLocale: 'en',
    },
  },

  sitemap: {
    // The dynamic /resorts/:slug pages can't be crawled from the filesystem;
    // feed them explicitly. _i18nTransform expands each into en + ar entries
    // with hreflang alternates.
    urls: () =>
      import('./app/data/resorts').then((m) =>
        m.RESORTS.map((r) => ({ loc: `/resorts/${r.slug}`, _i18nTransform: true })),
      ),
  },

  // Image optimization. Photography is hotlinked from the brand WordPress
  // CDN (and YouTube thumbs from i.ytimg.com), so both origins are
  // whitelisted before the optimizer will touch them. Locally the default
  // IPX provider resizes/transcodes; on Vercel the platform image optimizer
  // is auto-selected. Backgrounds go through useBgImage()/$img (see that
  // composable); the few real <img>/<NuxtImg> tags use the same pipeline.
  image: {
    domains: ['xperience-hotels.com', 'i.ytimg.com'],
    quality: 70,
    format: ['avif', 'webp'],
  },

  runtimeConfig: {
    storyblokToken: '', // NUXT_STORYBLOK_TOKEN — server-side, future CMS
    public: {
      siteUrl: '', // NUXT_PUBLIC_SITE_URL
    },
  },
})
