# Requirements Status — Xperience Hotels

This document maps the **client's original brief** to what is **delivered today** versus what is **still in the pipeline**. It is the single source of truth for scope tracking.

**Status legend:** ✅ Done · 🟡 Partial · 🔴 Not started · ⚪ Out-of-code (hosting/process/contract)

> _Snapshot as of the current `main` branch. The site is a Nuxt 4 SSR front-end with a hardcoded, CMS-ready data layer. There is no backend, admin panel, database, or third-party integration wired yet — several conversion features are polished UI prototypes (see "Prototypes" notes)._

---

## 1. Foundation & design

| # | Requirement | Status | Notes |
|---|-------------|:------:|-------|
| 1.1 | Multi-property site for up to 6 hotels | ✅ | All 6 resorts modelled and routed (`/resorts/:slug`). |
| 1.2 | Responsive, mobile-first | ✅ | Mobile-first layout, nav sheet, responsive grids. |
| 1.3 | Modern hospitality design | ✅ | Token-driven "luxury minimalist" design system (champagne gold + neutrals), Playfair/Plus Jakarta type, tasteful scroll-reveal motion. |
| 1.4 | Fast loading | ✅ | SSR + lazy-loaded routes + lightweight motion, **plus** image optimization via `@nuxt/image`: all photography served resized + WebP (resort-card image 229 KB JPEG → 44 KB WebP = −81%; full-screen hero 268 KB → 122 KB = −54%; mega-thumb 229 KB → 4 KB), the LCP hero preloaded at `fetchpriority=high`, and the 5 offscreen hero-carousel slides deferred off the critical path. Measured (mobile · Slow 4G · 4× CPU): home LCP **1421 ms → ~1.1 s (−22%)**, CLS **0.00**, total home image payload **~1.49 MB → 1.14 MB**. See 7.5 / 7.6. |
| 1.5 | Direct-booking focused | ✅ | Persistent booking bar, "Book Direct" CTAs everywhere, book-direct benefits, booking modal flow. (Flow is a UI prototype — see 4.1.) |

---

## 2. CMS / Admin panel

| # | Requirement | Status | Notes |
|---|-------------|:------:|-------|
| 2.1 | CMS/admin to manage hotels, rooms, offers, images, blogs, landing pages, multilingual content | 🔴 | **Not built.** All content is hardcoded in the typed data layer (`app/data/*.ts`). |
| 2.2 | CMS-ready architecture | ✅ | Content access funnels through `useResortContent()` (one fetcher) and `runtimeConfig.storyblokToken` is plumbed. Storyblok (or similar) can slot in by swapping the fetcher — no component changes. |

**Pipeline:** choose/provision the headless CMS (Storyblok planned), model the content types, migrate the data layer, build editor workflows, add blog & landing-page content types.

---

## 3. Hotel page sections

Each resort page is generated from one shared template (`ResortDetail.vue`).

| # | Section | Status | Notes |
|---|---------|:------:|-------|
| 3.1 | Overview | ✅ | Hero + intro + quick facts. |
| 3.2 | Rooms | ✅ | Superior / Deluxe Sea View / Family Suite, per resort. |
| 3.3 | Dining | ✅ | 3 venues per resort. |
| 3.4 | Facilities | ✅ | Full facilities grid. |
| 3.5 | Spa | ✅ | Dedicated per-hotel **Spa** section on the resort page (`#spa`) — signature treatments + hammam, all 5 languages, book-direct spa discount tie-in. |
| 3.6 | Meetings / Events | ✅ | Per-hotel **Meetings** teaser section (`#meetings`, ballroom photo + headline specs) that links to the full site-level `/meetings-events` page (single source of truth). |
| 3.7 | Weddings | ✅ | Dedicated per-hotel **Weddings** section (`#weddings`) with highlights, linking to `/meetings-events#weddings`. |
| 3.8 | Offers | ✅ | Per-hotel **Offers** teaser section (`#offers`, book-direct benefits) linking to the site-level `/offers` page. |
| 3.9 | Gallery | ✅ | Carousel gallery (`@blossom-carousel/vue`). |
| 3.10 | Reviews | 🟡 | **Per-hotel** static review cards + rating bars + verified-stay count (distinct mock data per resort in `REVIEWS_BY_SLUG`, also feeding JSON-LD `aggregateRating`). UI + data shape are integration-ready — only the live **TripAdvisor/review feed** is pending (see 6.9). |
| 3.11 | Location | ✅ | Per-hotel **interactive Leaflet map** (real coordinates, custom gold marker, CARTO tiles) + direction cards wiring coordinate-based Google Maps directions; address & phone. Geo coords also feed JSON-LD `geo`/`hasMap`. |
| 3.12 | Booking widget | 🟡 | Booking modal present on the page; it's a **UI prototype** (no real engine — see 4.1). |

---

## 4. Main website sections

| # | Section | Status | Notes |
|---|---------|:------:|-------|
| 4.1 | Home page | ✅ | Full landing page (hero, booking bar, awards marquee, resorts, offers, benefits, discover videos, about, honeymoon). |
| 4.2 | Hotels / Resorts | ✅ | 6 resort pages + nav mega-menu. |
| 4.3 | Offers | ✅ | `/offers` page (honeymoon packages + book-direct benefits). |
| 4.4 | Experiences | 🟡 | A "Discover the Xperience" video section exists on the home page; **no standalone Experiences page.** |
| 4.5 | Blog / Travel guides | 🔴 | **Not built** (depends on CMS). |
| 4.6 | About us | ✅ | `/about` — brand story, sustainability, policies, stats, reports. |
| 4.7 | Careers | 🔴 | Footer link is a `#` placeholder; **no careers page.** |
| 4.8 | News / Events | 🟡 | `/meetings-events` exists; **no news page.** Footer "News" link not wired. |
| 4.9 | Contact forms | 🟡 | `/contact` with a validated form + WhatsApp/phone/email cards. **Form is a prototype — does not submit anywhere.** |
| 4.10 | Newsletter subscription | 🟡 | Footer signup is **markup only** — no submit handler / no provider (Mailchimp etc.). |

---

## 5. Multilingual support

Requested: **English, Arabic, German, Italian, Russian.**

| # | Item | Status | Notes |
|---|------|:------:|-------|
| 5.1 | All 5 locales configured + URL-prefixed routing | ✅ | `prefix_except_default`; EN at `/`, others at `/de`, `/ar`, etc.; `xp-lang` cookie persistence. |
| 5.2 | UI strings translated in all 5 languages | ✅ | All five catalogs (`i18n/locales/*.json`) fully populated. |
| 5.3 | Arabic RTL | ✅ | Server-rendered `dir="rtl"`, logical CSS, mirrored directional icons. |
| 5.4 | **Entity content** (resort/about copy) in DE/IT/RU | 🔴 | Data layer is mostly **EN/AR only** — DE/IT/RU fall back to English for resort/about content. **Exception:** `/offers` packages are translated in all 5. |

**Pipeline:** translate the `app/data/*.ts` entity content into DE/IT/RU (or move it into the CMS where translations are managed).

---

## 6. Integrations

| # | Integration | Status | Notes |
|---|-------------|:------:|-------|
| 6.1 | Booking engine | 🔴 | `BookModal` is a 2-step confirmation **mock**. No real engine/availability/rates. |
| 6.2 | Payment gateway | 🔴 | Not started (depends on 6.1). |
| 6.3 | WhatsApp | 🟡 | Static `wa.me` deep link only (`CONTACT_WHATSAPP`). No Business API / assistant. |
| 6.4 | Google Analytics 4 | 🔴 | Not wired. |
| 6.5 | Google Tag Manager | 🔴 | Not wired. |
| 6.6 | Meta Pixel | 🔴 | Not wired. |
| 6.7 | Google Search Console | ⚪ | Site is SEO-ready (sitemap/robots/canonical); verification + submission is a launch task. |
| 6.8 | Google Hotel Ads | 🔴 | Not started ("if applicable" — depends on booking engine + rate feed). |
| 6.9 | TripAdvisor / reviews widget | 🔴 | Reviews & award badges are static data/images; no live widget. |
| 6.10 | Social media links | ✅ | Facebook, Instagram, YouTube, LinkedIn, Twitter in footer (`SOCIAL`). |

---

## 7. SEO

| # | Item | Status | Notes |
|---|------|:------:|-------|
| 7.1 | SEO-friendly structure | ✅ | SSR HTML for every route (incl. all locale twins), semantic markup, clean URLs. |
| 7.2 | Schema markup | ✅ | JSON-LD `Hotel` on resort pages, now incl. `amenityFeature` (spa / events / weddings) and a book-direct `makesOffer`. (Could still extend: `Organization`, `BreadcrumbList`.) |
| 7.3 | Landing pages | ✅ | `/offers` landing page; exit-intent funnels to it. |
| 7.4 | Blog strategy | 🔴 | No blog (see 4.5). |
| 7.5 | Image optimization | ✅ | `@nuxt/image` added. The pervasive CSS-`background-image` pattern routes through a `useBgImage()` helper (`$img`) so every image is resized per render-context and served as WebP (AVIF auto-negotiated on Vercel). Remote brand CDN + `i.ytimg.com` whitelisted in `image.domains`; IPX optimizes locally, Vercel's image CDN in production. |
| 7.6 | Core Web Vitals | 🟡 | Now measured in lab and healthy (LCP ~1.1 s, CLS 0.00 on throttled mobile) with image bytes cut (7.5). Lab note: home LCP is **render-delay-bound** (hero-carousel hydration / JS on throttled CPU), so the next lever is JS/hydration cost, not images. Field CWV still pending real-traffic CrUX data post-launch. |
| 7.7 | sitemap.xml / robots.txt | ✅ | `@nuxtjs/sitemap` (per-locale, dynamic resort routes fed explicitly) + `@nuxtjs/robots`. |
| 7.8 | hreflang / canonical | ✅ | Emitted on every route via `useLocaleHead`. |

---

## 8. Optional smart features

| # | Feature | Status | Notes |
|---|---------|:------:|-------|
| 8.1 | AI chatbot | 🔴 | Not started. |
| 8.2 | WhatsApp assistant | 🔴 | Only the static link (6.3); no assistant. |
| 8.3 | Smart recommendations | 🔴 | Not started. |
| 8.4 | Promo code engine | 🔴 | Not started (depends on booking engine). |
| 8.5 | Exit-intent offers | ✅ | `ExitIntentOffer` — site-wide, locale-aware, a11y-complete, funnels to `/offers`. |
| 8.6 | Book-direct benefits | ✅ | Benefits section + per-resort + offers page. |

---

## 9. Infrastructure & operations (out-of-code / to clarify)

| # | Item | Status | Notes |
|---|------|:------:|-------|
| 9.1 | Hosting | ⚪ | SSR-ready; `vercel.json` pins Nuxt preset. Host TBD/to confirm. |
| 9.2 | SSL | ⚪ | Provided automatically by Vercel/Netlify; confirm on chosen host. |
| 9.3 | Security setup | ⚪ | Baseline only. No WAF/headers/rate-limiting configured yet. |
| 9.4 | Backup / recovery plan | 🔴 | Not defined (git is source-of-truth today; matters once a CMS/DB exists). |
| 9.5 | CDN | ⚪ | Edge/CDN provided by Vercel/Netlify; confirm on chosen host. |
| 9.6 | Team training (backend usage) | ⚪ | Pending the CMS (2.1). |
| 9.7 | Post-launch support & maintenance | ⚪ | Contract/SLA terms — to be defined with the client. |

---

## Top pipeline priorities (suggested order)

1. **Booking engine + payment gateway** (6.1, 6.2) — the core conversion goal; unblocks promo codes (8.4) and Google Hotel Ads (6.8).
2. **CMS** (2.1) — unblocks blog (4.5), editable content, managed translations (5.4), and team training (9.6).
3. **Analytics stack** (6.4–6.6) — GA4 + GTM + Meta Pixel; needed to measure everything else.
4. **Wire the existing prototypes to real backends** — contact form (4.9) and newsletter (4.10).
5. **Core Web Vitals — JS/hydration** (7.6) — image optimization (7.5) is ✅ done; the remaining lab lever is trimming hero-carousel hydration cost (render-delay-bound LCP).
6. **DE/IT/RU entity content** (5.4) and remaining pages: Experiences (4.4), Careers (4.7), News (4.8).
7. **Reviews/TripAdvisor widget** (6.9), spa/weddings sections (3.5, 3.7).
