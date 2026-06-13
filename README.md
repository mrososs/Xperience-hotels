# Xperience Hotels

A next-generation, high-converting landing page and resort website for **Xperience Hotels** — a premium hospitality brand offering luxury Red Sea resorts and unforgettable vacation experiences. The goal is an immersive, highly modern, and exclusive experience that drives **direct room bookings**.

Built with **Nuxt 4 + TypeScript** — fully **server-side rendered for SEO**, bilingual **English / Arabic (RTL-aware)** with locale-prefixed URLs (`/about` ↔ `/ar/about`).

> Looking for the business overview? See **[FEATURES.md](./FEATURES.md)** — a client-facing summary of what the theme does and why it converts.

## Tech Stack

- [Nuxt 4](https://nuxt.com/) (Vue 3 Composition API, `<script setup>`, SSR via Nitro)
- [TypeScript](https://www.typescriptlang.org/) — fully typed data & components
- [@nuxtjs/i18n](https://i18n.nuxtjs.org/) — bilingual EN/AR, locale-prefixed routes, RTL support
- [@nuxtjs/sitemap](https://nuxtseo.com/sitemap) + [@nuxtjs/robots](https://nuxtseo.com/robots) — sitemap.xml / robots.txt
- [Sass](https://sass-lang.com/) — token-driven design system
- [@nuxt/image](https://image.nuxt.com/) — image optimization (resize + WebP/AVIF), used via the `useBgImage()` helper for the CSS-background pattern
- [@blossom-carousel/vue](https://www.npmjs.com/package/@blossom-carousel/vue) — gallery carousels
- [@lucide/vue](https://lucide.dev/) — icon set

## SEO

Every route — including the Arabic `/ar/...` twins — is rendered on the server with:

- Per-page `<title>` + meta description via `useSeoMeta` (localized from the i18n catalogs)
- Open Graph + Twitter card tags; per-resort meta derived from the data layer
- Canonical URLs + `hreflang` alternates (from `useLocaleHead` in `app/app.vue`)
- `<html lang dir>` server-rendered (`dir="rtl"` for Arabic)
- JSON-LD `Hotel` structured data on resort pages (`app/pages/resorts/[slug].vue`)
- `/sitemap.xml` (per-locale, all 12×2 URLs) and `/robots.txt`
- Invalid resort slugs return a real **404** (no soft-404 redirects)

## Key Features

- **Bilingual & RTL-ready** — full English / Arabic support; locale lives in the URL (`/ar` prefix), persists to the `xp-lang` cookie and drives `<html lang/dir>` automatically — server-side.
- **Token-driven design system** — colors, spacing, radii, shadows, type, and motion defined once in SCSS maps and emitted as `--xp-*` CSS custom properties (see `app/assets/styles/_tokens.scss`).
- **Direct-booking flow** — booking bar + guest stepper feed a multi-step booking modal (`useBookingFlow`).
- **Dynamic resort pages** — one template (`ResortDetail.vue`) rendered from typed bilingual data in `app/data/resorts.ts`; six resorts, slug-routed at `/resorts/:slug` with `validate`-guarded slugs.
- **CMS-ready** — resort content is fetched through `useResortContent()` (`useAsyncData`), so a headless CMS (e.g. Storyblok) can replace the hardcoded data layer by swapping one fetcher; `runtimeConfig.storyblokToken` is already plumbed.
- **Scroll-reveal animations** — restraint-first `v-reveal` directive (one shared `IntersectionObserver`); progressive-enhancement and `prefers-reduced-motion` aware; SSR ships fully visible content for crawlers.

## Project Structure

```
app/
├── app.vue            # root: <NuxtPage> + html lang/dir + hreflang wiring
├── router.options.ts  # hash-anchor scroll behaviour (SSR-safe)
├── assets/
│   └── styles/        # SCSS design system (tokens, base, typography…) + page CSS
├── components/
│   ├── landing/       # hero, booking bar, resorts, benefits, honeymoon, modal…
│   ├── resort/        # shared ResortDetail template
│   ├── resorts/       # per-resort page wrappers
│   ├── shared/        # navbar, footer
│   └── ui/            # small UI atoms (e.g. SocialIcon)
├── composables/       # booking flow, locale, scroll state, reveal, resort content…
├── data/              # typed bilingual content (resorts, benefits, awards…)
├── pages/             # file-based routes (index, about, awards, resorts/[slug]…)
└── plugins/           # v-reveal directive registration
i18n/
└── locales/           # en.json / ar.json UI string catalogs (incl. seo.* meta)
```

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Build for Production (SSR)

```sh
npm run build
node .output/server/index.mjs   # run the production server
```

### Preview the Production Build

```sh
npm run preview
```

### Type-Check Only

```sh
npm run typecheck
```

## Deployment

The site is **server-rendered** (Nitro) and can no longer be hosted on GitHub Pages:

- **Vercel / Netlify (recommended)** — connect the repo; Nitro is auto-detected, zero config, free SSL and per-PR preview deploys.
- **Any Node host / VPS** — `npm run build`, then run `node .output/server/index.mjs` (PM2/Docker).

Set `NUXT_PUBLIC_SITE_URL` (canonical/sitemap base) — and later `NUXT_STORYBLOK_TOKEN` — in the host's environment. CI (`.github/workflows/ci.yml`) gates PRs with `typecheck + build`.

## Content & Localization

- **Resort/entity content** lives in the data layer (`app/data/`) as bilingual objects (`{ en, ar }`) and is selected at render time via the `tBi()` helper in `useLocale`.
- **UI strings** live in JSON catalogs (`i18n/locales/en.json`, `ar.json`) and are accessed with `t()`; per-page SEO meta lives under the `seo.*` keys.
- Adding a resort: append a seed to `SEEDS` in `app/data/resorts.ts` — routing, nav links, rooms, dining, the detail page and the sitemap are derived automatically.

> **Note:** Photography is hotlinked from the brand CDN and optimized at request time by **`@nuxt/image`** — resized per render-context and served as WebP (AVIF auto-negotiated on Vercel). Background images go through the `useBgImage()` helper (`app/composables/useBgImage.ts`); the brand CDN and `i.ytimg.com` are whitelisted in `nuxt.config.ts` → `image.domains`. The LCP hero is preloaded at `fetchpriority=high` and the offscreen hero-carousel slides are deferred off the critical path.
