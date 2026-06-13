# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

**Xperience Hotels** — a server-rendered marketing + direct-booking website for a luxury Red Sea hotel group (6 resorts in Sharm El Sheikh). Nuxt 4 (Vue 3 `<script setup>`, TypeScript), full SSR via Nitro, multilingual (EN default + AR/DE/IT/RU as URL-prefixed locales). The `package.json` name is `xperience-hotels`.

There is no backend, database, or CMS yet — all content is hardcoded in a typed data layer (`app/data/`). The architecture is deliberately shaped so a headless CMS (Storyblok is planned) can replace that layer without touching components. See [memory/nuxt-migration-decisions.md](~/.claude/projects/D--ittechpro/memory/nuxt-migration-decisions.md) for the SSR/SEO module decisions.

## Commands

```sh
npm run dev          # dev server (HMR)
npm run build        # production SSR build → .output/
node .output/server/index.mjs   # run the built SSR server
npm run preview      # preview the production build
npm run typecheck    # vue-tsc — THIS is the gate (see below)
```

**There is no test runner and no linter configured.** CI (`.github/workflows/ci.yml`, runs on push to `main`/`development` and all PRs) gates only on `npm run typecheck` + `npm run build`. Treat a clean typecheck + build as the definition of "it passes". When you finish a change, run both before claiming done.

Deployment is SSR-only (no longer static/Pages-compatible). `vercel.json` pins the Nuxt framework preset; Vercel/Netlify auto-detect Nitro. Set `NUXT_PUBLIC_SITE_URL` (canonical/sitemap/OG base) and later `NUXT_STORYBLOK_TOKEN` in the host environment.

## The content model is two-tier — internalize this first

Localized strings live in **two separate places** with **two separate accessors**. Mixing them up is the most common mistake.

1. **UI chrome strings** → `i18n/locales/{en,ar,de,it,ru}.json`, accessed with **`t('key.path')`** from `useLocale()` / vue-i18n. All five catalogs are fully translated (~381 keys each). Per-page SEO copy lives under the `seo.*` keys here.
2. **Entity/business content** (resort descriptions, rooms, dining, offers, awards, about copy) → typed objects in `app/data/*.ts` shaped `{ en, ar, de?, it?, ru? }` (the `Bilingual` interface in `app/data/resorts.ts`), selected at render time with **`tBi(obj)`** from `useLocale()`.

`tBi()` falls back to `en` when a locale key is absent. **Consequence:** most data-layer content is EN/AR only, so DE/IT/RU visitors see English resort/about content today. Only `app/data/offers.ts` carries all five languages. When asked to "add German content," check which tier the string is in.

`useLocale()` (`app/composables/useLocale.ts`) is the single wrapper exposing `t`, `tBi`, `locale`, `isRtl`, `setLocale`, `locales`.

### Switching locale — use `setLocale`, never `navigateTo`/`switchLocalePath`

Language switching MUST go through the i18n module's own `setLocale` (wrapped in `useLocale().setLocale`). An earlier `switchLocalePath() + navigateTo()` approach left the page "frozen half-translated" because the locale flip didn't sync with the Suspense page transition (see commit `ace0da8` and the comment block in `useLocale.ts`). Don't reintroduce that pattern.

## Routing & i18n mechanics

- Strategy is `prefix_except_default`: EN at `/about`, others at `/de/about`, `/ar/about`, etc. Locale persists to the `xp-lang` cookie; browser-language redirect only fires on `/` (deep links stay crawlable).
- **i18n suffixes route names** with `___<locale>` (e.g. `index___en`, `offers___ar`). When matching the current route by name, strip the suffix: `String(route.name).split('___')[0]`. This is done throughout `SiteNavbar.vue` and `ExitIntentOffer.vue` — follow that pattern.
- All internal links go through `localePath('/path')` so they stay inside the active locale prefix.
- `app/app.vue` is tiny by design: it renders `<NuxtPage>` + the global `ExitIntentOffer`, and wires `useLocaleHead({ seo: true })` to emit `<html lang/dir>`, `hreflang` alternates, and `og:locale` on every route server-side. `dir="rtl"` for Arabic is server-rendered.

## Resort pages — the central abstraction

Resort detail pages are generated, not hand-written per property:

- `app/data/resorts.ts` defines a `SEEDS` array (slug, name, area, hero/gallery imagery, base price, rating). `RESORTS` is **derived** from seeds by attaching shared, parameterized section templates — `rooms()`, `dining()`, `quick()`, and the shared `ACTIVITIES`/`FACILITIES`/`REVIEWS`/`RATING_BARS` constants. So rooms/dining/reviews are intentionally uniform across resorts, varying only by imagery, name, and price.
- `/resorts/:slug` (`app/pages/resorts/[slug].vue`) `validate()`s the slug against `RESORT_SLUGS` (returns a real 404, not a soft redirect), sets per-resort SEO meta, emits hand-rolled JSON-LD `Hotel` schema, and resolves the slug through a **registry** to a per-resort wrapper component in `app/components/resorts/`. Those wrappers all feed the single shared `app/components/resort/ResortDetail.vue` template.

**To add a resort you must touch three places:** (1) append a `ResortSeed` to `SEEDS` in `app/data/resorts.ts`; (2) create a wrapper in `app/components/resorts/`; (3) register `slug → component` in the `registry` map in `[slug].vue`. Routing, nav mega-menu, footer links, and the sitemap then derive automatically.

### Gotcha: there are TWO `RESORTS` exports

- `app/data/resorts.ts` → rich `Resort` records (bilingual objects, rooms/dining/reviews) used by detail pages and the nav mega-menu (`RESORT_LINKS`).
- `app/data/content.ts` → a lighter, mostly-English `Resort` shape (`name: string`, `desc/descAr`) used by landing-page cards and the awards/about/footer content.

They are different types with different fields. Check which file an import resolves to before editing.

## The CMS seam

`app/composables/useResortContent.ts` is the **single indirection** between pages and resort data — it wraps `getResort()` in `useAsyncData`. When Storyblok lands, only that fetcher body changes (swap `getResort` for a Storyblok client call using `useRuntimeConfig().storyblokToken`, already plumbed in `nuxt.config.ts`). Keep new content access flowing through composables like this rather than importing `app/data/*` directly into pages, so the seam stays clean.

## SEO surface (a selling point — keep it intact)

- Per-page meta via `useSeoMeta` in each page's `<script setup>`, localized from the `seo.*` catalog keys.
- `useLocaleHead` in `app.vue` → canonical + hreflang + html lang/dir.
- JSON-LD `Hotel` structured data hand-rolled in `[slug].vue` (no schema-org module, intentionally).
- `@nuxtjs/sitemap` + `@nuxtjs/robots`. Dynamic `/resorts/:slug` routes can't be filesystem-crawled, so `nuxt.config.ts` feeds them explicitly via `sitemap.urls()` with `_i18nTransform: true` to expand each into all locales with hreflang alternates.

## Design system & UI conventions

- SCSS tokens in `app/assets/styles/_tokens.scss` are the single source of truth (SCSS maps → emitted as `--xp-*` CSS custom properties on `:root`). Palette is "luxury minimalist": warm champagne gold + refined neutrals + Red Sea teal. Fonts: Playfair Display (headings) + Plus Jakarta Sans (body), loaded from Google Fonts in `nuxt.config.ts`.
- Global stylesheets are registered (and **ordered**) in `nuxt.config.ts` `css[]` — tokens/base first, then per-page CSS. Component-specific styles otherwise live in scoped `<style>` blocks.
- **Scroll-reveal:** the `v-reveal` directive (registered in `app/plugins/reveal.ts`, logic in `app/composables/reveal.ts`) uses one shared `IntersectionObserver`, respects `prefers-reduced-motion`, and is progressive-enhancement safe. SSR ships content fully visible; the hidden start-state only applies once JS is confirmed (the `document.documentElement.classList.add('js')` critical script in `nuxt.config.ts`). Don't make content depend on the reveal firing.
- **Lucide icons appear two ways:** imported `@lucide/vue` components (e.g. `BookModal.vue`) AND `<i data-lucide="...">` placeholders swapped to SVG by `useLucideIcons` (`ensureIcons`/`drawIcons`). A locale re-render can restore the placeholder, so components using the `data-lucide` form redraw on `nextTick` after a locale change (see `SiteNavbar.vue`).
- RTL is handled with logical CSS properties (`inset-inline-end`, etc.) and the server-rendered `dir`; mirror icons with `scaleX(-1)` only where direction is semantic (see arrow in `ExitIntentOffer.vue`).

## Prototypes vs. real integrations

Several conversion features are **UI prototypes with no backend** — do not assume they persist or send anything:

- `BookModal.vue` (driven by `useBookingFlow`) is a 2-step confirmation mock — **there is no booking engine or payment integration.**
- `ContactForm.vue` validates and shows a success panel but does not submit anywhere.
- The footer newsletter signup is markup only (no submit handler); "Careers", "Privacy", "Terms" footer links are `href="#"` placeholders (no pages exist).
- WhatsApp is a static `wa.me` deep link (`CONTACT_WHATSAPP` in `app/data/contact.ts`) — not an assistant/API.
- No analytics, GTM, Meta Pixel, or live TripAdvisor widget is wired (awards/reviews are static data/images).

See [REQUIREMENTS-STATUS.md](./REQUIREMENTS-STATUS.md) for the full delivered-vs-pipeline map against the client brief.

## Conventions

- Vue 3 Composition API with `<script setup lang="ts">` everywhere; logic factored into `app/composables/` (small, single-purpose: `useEventListener`, `useClickOutside`, `useScrollState`, `useScrollSpy`, `useExitIntent`, etc.). Prefer composing these over re-implementing listeners.
- Imports use the `@/` alias for `app/` (e.g. `@/data/resorts`, `@/components/...`).
- Components are grouped by feature: `landing/`, `resort/` (shared template), `resorts/` (per-property wrappers), `shared/` (navbar/footer/exit-intent), `contact/`, `meetings/`, `ui/` (atoms).
- Photography is **hotlinked from the brand WordPress CDN** (`xperience-hotels.com/wp-content/...`) and optimized by **`@nuxt/image`**. Because the codebase paints most images as CSS `background-image` (not `<img>`), they go through the **`useBgImage()`** composable (`app/composables/useBgImage.ts`), which wraps `$img` to emit resized **WebP** URLs — always pass an explicit `{ width }` per render-context. The shared **`HERO_BG`** preset (1366px, q62) is used by every hero background **and** its `fetchpriority=high` preload, so the two URLs match exactly (a mismatch double-downloads). The hero carousel renders only slide 1's background eagerly and defers the rest to idle. Whitelisted origins (brand CDN + `i.ytimg.com`) live in `nuxt.config.ts` → `image.domains`. Locally IPX bundles `sharp` (win32); on Vercel the platform image CDN is used — so **deploy by building on Vercel**, don't ship the local win32 `.output`.
