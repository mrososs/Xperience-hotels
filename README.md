# Xperience Hotels

A next-generation, high-converting landing page and resort website for **Xperience Hotels** — a premium hospitality brand offering luxury Red Sea resorts and unforgettable vacation experiences. The goal is an immersive, highly modern, and exclusive experience that drives **direct room bookings**.

Built with **Vue 3 + Vite + TypeScript**, using **Vue Router**, **Pinia**, and **vue-i18n** (English / Arabic, RTL-aware).

> Looking for the business overview? See **[FEATURES.md](./FEATURES.md)** — a client-facing summary of what the theme does and why it converts.

## Tech Stack

- [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- [Vite](https://vite.dev/) — build tool & dev server
- [TypeScript](https://www.typescriptlang.org/) — fully typed data & components
- [Vue Router](https://router.vuejs.org/) — routing with lazy-loaded routes
- [Pinia](https://pinia.vuejs.org/) — state management
- [vue-i18n](https://vue-i18n.intlify.dev/) — bilingual EN/AR with RTL support
- [Sass](https://sass-lang.com/) — token-driven design system
- [@blossom-carousel/vue](https://www.npmjs.com/package/@blossom-carousel/vue) — gallery carousels
- [@lucide/vue](https://lucide.dev/) — icon set

## Key Features

- **Bilingual & RTL-ready** — full English / Arabic support; locale persists to `localStorage` and drives `<html lang/dir>` automatically.
- **Token-driven design system** — colors, spacing, radii, shadows, type, and motion defined once in SCSS maps and emitted as `--xp-*` CSS custom properties (see `src/styles/_tokens.scss`).
- **Direct-booking flow** — booking bar + guest stepper feed a multi-step booking modal (`useBookingFlow`).
- **Dynamic resort pages** — one template (`ResortDetail.vue`) rendered from typed bilingual data in `src/data/resorts.ts`; six resorts, slug-routed at `/resorts/:slug` with guard-validated slugs.
- **Scroll-reveal animations** — restraint-first `v-reveal` directive (one shared `IntersectionObserver`); progressive-enhancement and `prefers-reduced-motion` aware.
- **Performance** — route-level code-splitting, lazy-loaded views, single observer for reveals.

## Project Structure

```
src/
├── assets/            # brand logos
├── components/
│   ├── landing/       # hero, booking bar, resorts, benefits, honeymoon, modal…
│   ├── resort/        # shared ResortDetail template
│   ├── resorts/       # per-resort page wrappers
│   ├── shared/        # navbar, footer
│   └── ui/            # small UI atoms (e.g. SocialIcon)
├── composables/       # booking flow, locale, scroll state, reveal, click-outside…
├── data/              # typed bilingual content (resorts, benefits, awards…)
├── i18n/              # vue-i18n setup + en/ar locale catalogs
├── router/            # routes (home, about, awards, resort detail)
├── styles/            # SCSS design system (tokens, base, typography, primitives, components)
└── views/             # routed pages (Home, About, Awards, Resort)
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

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Preview the Production Build

```sh
npm run preview
```

### Type-Check Only

```sh
npm run type-check
```

## Content & Localization

- **Resort/entity content** lives in the data layer (`src/data/`) as bilingual objects (`{ en, ar }`) and is selected at render time via the `tBi()` helper in `useLocale`.
- **UI strings** live in JSON catalogs (`src/i18n/locales/en.json`, `ar.json`) and are accessed with `t()`.
- Adding a resort: append a seed to `SEEDS` in `src/data/resorts.ts` — routing, nav links, rooms, dining, and the detail page are derived automatically.

> **Note:** Photography is currently hotlinked from the brand CDN per the design-system note. For production, localize images into `src/assets/`.
