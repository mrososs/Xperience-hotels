# Xperience Hotels — Frontend Pricing & Backend Scope

A per-requirement price breakdown for the **frontend** of the Xperience Hotels website, mapped to the client brief. For every requirement it lists the **fixed frontend price (EGP)** and **what the backend / third parties must deliver** for that requirement to go live.

It follows the same requirement structure as [REQUIREMENTS-STATUS.md](./REQUIREMENTS-STATUS.md) (the delivered-vs-pipeline tracker).

---

## How to read this

- **Prices are fixed, in Egyptian Pounds (EGP), and cover frontend engineering only.**
- **Status:**
  - ✅ **Delivered** — already built and in the current codebase. The price shown is the value of work delivered, not a new charge.
  - 🟡 **Partial** — UI built; price shown completes the remaining frontend (usually a backend/3rd-party hook-up).
  - 🔴 **To build** — not started; price is the quote to build the frontend.
- **"Backend / 3rd-party needed"** is **scope only — not priced here.** It is what a backend developer, the client, or a third-party service must provide for the requirement to function. Those parties price their own work.
- Prices **exclude** third-party license/subscription fees (CMS, booking engine, payment gateway, analytics, AI/chat, translation services, hosting/CDN) and content production (copywriting, photography, translation).
- Figures assume the **current codebase as the starting point** (Nuxt 4 SSR, design system, 6 resort pages, 5-locale routing, etc. already in place) and are **estimates to be confirmed/adjusted** before contracting.

---

## Summary

| Bucket | Amount (EGP) |
|---|---:|
| ✅ **Delivered** (frontend already built) | **260,500** |
| 🟡🔴 **Remaining** (frontend to build) | **256,500** |
| **Grand total (full frontend scope)** | **517,000** |

### Subtotal by requirement area

| # | Requirement area | Subtotal (EGP) |
|---|---|---:|
| 1 | Foundation & design | 86,000 |
| 2 | CMS / Admin (frontend integration) | 38,000 |
| 3 | Hotel page sections | 40,000 |
| 4 | Main website sections | 125,000 |
| 5 | Multilingual | 34,000 |
| 6 | Integrations | 92,000 |
| 7 | SEO | 41,000 |
| 8 | Optional smart features | 45,000 |
| 9 | Infrastructure & operations (frontend portion) | 16,000 |
| | **Total** | **517,000** |

> A typical **Phase 2 engagement** = the **Remaining (256,500 EGP)** scope. The booking engine + payment + CMS items are the high-value core (see priorities at the end).

---

## 1. Foundation & design — *86,000 EGP (all delivered)*

| # | Requirement | Status | Frontend (EGP) | Backend / 3rd-party needed |
|---|---|:--:|---:|---|
| 1.1 | Multi-property site for up to 6 hotels (routing, data layer, derived nav/footer/sitemap) | ✅ | 20,000 | — |
| 1.2 | Responsive, mobile-first across the site | ✅ | 14,000 | — |
| 1.3 | Modern hospitality design system (tokens, components, motion, RTL) | ✅ | 30,000 | — |
| 1.4 | Fast loading / image optimization (`@nuxt/image`, WebP, LCP preload, lazy) | ✅ | 10,000 | — |
| 1.5 | Direct-booking-focused UI (booking bar, guest stepper, CTAs, modal UI) | ✅ | 12,000 | Real booking flow → see **6.1** |

---

## 2. CMS / Admin panel — *38,000 EGP*

| # | Requirement | Status | Frontend (EGP) | Backend / 3rd-party needed |
|---|---|:--:|---:|---|
| 2.1 | Wire the site to a headless CMS (connect the content seam to Storyblok, editable bindings for all content, live preview, fallbacks) | 🔴 | 32,000 | **Provision & build the CMS:** choose/license headless CMS (Storyblok planned), model content types (hotels, rooms, dining, offers, blog, landing pages, media, multilingual fields), configure the editor + roles/permissions, migrate the current hardcoded data, define content workflow. |
| 2.2 | CMS-ready architecture (single fetcher seam, runtime token plumbed) | ✅ | 6,000 | — |

---

## 3. Hotel page sections — *40,000 EGP (delivered)*

One shared resort template renders all sections per property.

| # | Requirement | Status | Frontend (EGP) | Backend / 3rd-party needed |
|---|---|:--:|---:|---|
| 3.1–3.11 | Resort detail template + sections: overview, rooms, dining, facilities, **spa**, **meetings teaser**, **weddings**, **offers teaser**, gallery, location, per-hotel **reviews UI** | ✅ | 40,000 | Content via CMS (2.1) when CMS lands |
| 3.10 | Live review feed into the reviews UI | 🟡 | *see 6.9* | TripAdvisor/review API → **6.9** |
| 3.12 | Booking widget on resort page (real availability/rates) | 🟡 | *see 6.1* | Booking engine → **6.1** |

---

## 4. Main website sections — *125,000 EGP*

| # | Requirement | Status | Frontend (EGP) | Backend / 3rd-party needed |
|---|---|:--:|---:|---|
| 4.1 | Home / landing page | ✅ | 24,000 | — |
| 4.2 | Hotels / resorts pages + mega-menu | ✅ | *incl. in 1.1 / 3* | — |
| 4.3 | Offers page | ✅ | 8,000 | — |
| 4.6 | About us page | ✅ | 10,000 | — |
| — | Awards page (delivered, beyond brief) | ✅ | 7,000 | — |
| — | Meetings & Events page (delivered, beyond brief) | ✅ | 9,000 | — |
| 4.4 | Experiences page (standalone) | 🔴 | 12,000 | Experiences content (CMS / data) |
| 4.5 | Blog / travel guides (list, article, categories/tags) | 🔴 | 24,000 | Blog CMS + authored content (2.1) |
| 4.7 | Careers (listing + job detail + application form UI) | 🔴 | 14,000 | Jobs data source + application submission/storage + notification email/ATS |
| 4.8 | News / Events page (list + detail) | 🔴 | 10,000 | News CMS + content (2.1) |
| 4.9 | Contact form — real submission | 🟡 | 4,000 | Form endpoint / email service (e.g. transactional email or form service), spam protection |
| 4.10 | Newsletter subscription — real signup | 🟡 | 3,000 | Email service provider (Mailchimp/Brevo/etc.) API + audience/list + double opt-in |

---

## 5. Multilingual (EN / AR / DE / IT / RU) — *34,000 EGP*

| # | Requirement | Status | Frontend (EGP) | Backend / 3rd-party needed |
|---|---|:--:|---:|---|
| 5.1–5.3 | 5 locales + URL routing + cookie + **Arabic RTL** + fully translated UI strings | ✅ | 26,000 | — |
| 5.4 | DE/IT/RU **entity content** (resort/about copy) wired + populated | 🔴 | 8,000 | **Professional translation** of resort/about content (content cost — translator/agency), or managed in the CMS (2.1) |

---

## 6. Integrations — *92,000 EGP*

> Frontend price = building the in-site experience/wiring. The booking engine, payment gateway, analytics accounts, and review/ads feeds are **provided/configured by backend, the client, or third parties.**

| # | Requirement | Status | Frontend (EGP) | Backend / 3rd-party needed |
|---|---|:--:|---:|---|
| 6.1 | **Booking engine** integration (search → availability → results → booking flow, i18n/RTL, incl. resort-page widget 3.12) | 🔴 | 40,000 | Select & contract a booking engine (e.g. SynXis / Cloudbeds / D-EDGE); expose an API or embeddable widget; rates, availability, inventory; reservation creation & management |
| 6.2 | **Payment gateway** (checkout UI, redirect/3-D Secure, success/failure states) | 🔴 | 16,000 | Merchant account (Paymob / Fawry / Stripe); server-side charge, webhooks, refunds; PCI scope handling |
| 6.3 | WhatsApp deep link | ✅ | 1,500 | (Optional Business API/assistant → 8.2) |
| 6.4 | Google Analytics 4 (consent-aware) | 🔴 | 4,000 | GA4 property + consent policy (client/ops) |
| 6.5 | Google Tag Manager + dataLayer events | 🔴 | 5,000 | GTM container + agreed event spec (client/ops) |
| 6.6 | Meta Pixel (consent-aware) | 🔴 | 3,000 | Meta Business account + pixel ID (client) |
| 6.7 | Google Search Console (verify + submit sitemap) | ⚪ | 1,500 | GSC property + DNS/verification access (client/ops) |
| 6.8 | Google Hotel Ads feed | 🔴 | 14,000 | Rates/availability feed + GHA account (depends on 6.1); backend feed generation |
| 6.9 | TripAdvisor / live reviews widget (feeds 3.10) | 🔴 | 6,000 | TripAdvisor Content API / widget keys, or chosen review provider |
| 6.10 | Social media links | ✅ | 1,000 | — |

---

## 7. SEO — *41,000 EGP*

| # | Requirement | Status | Frontend (EGP) | Backend / 3rd-party needed |
|---|---|:--:|---:|---|
| 7.1 | SEO-friendly SSR structure | ✅ | 12,000 | — |
| 7.2 | Schema markup (Hotel JSON-LD incl. amenities + book-direct offer) | ✅ | 7,000 | — |
| 7.3 | Landing pages (offers + exit-intent funnel) | ✅ | 5,000 | — |
| 7.7 | sitemap.xml / robots.txt | ✅ | 3,000 | — |
| 7.8 | hreflang / canonical | ✅ | 3,000 | — |
| 7.5 | Image optimization | ✅ | *incl. in 1.4* | — |
| 7.6 | Core Web Vitals tuning (hydration/JS lever) | 🟡 | 6,000 | — |
| 7.4 | Blog SEO scaffolding (article schema, sitemap, OG) | 🔴 | 5,000 | Blog CMS (4.5 / 2.1) |

---

## 8. Optional smart features — *45,000 EGP*

| # | Requirement | Status | Frontend (EGP) | Backend / 3rd-party needed |
|---|---|:--:|---:|---|
| 8.5 | Exit-intent offers | ✅ | 5,000 | — |
| 8.6 | Book-direct benefits | ✅ | 3,000 | — |
| 8.1 | AI chatbot (in-site widget + integration) | 🔴 | 18,000 | AI/chat service + knowledge base (e.g. LLM provider + content), conversation backend |
| 8.2 | WhatsApp assistant | 🔴 | 3,000 | WhatsApp Business API + bot/automation logic (backend/3rd-party) |
| 8.3 | Smart recommendations (UI + slots) | 🔴 | 10,000 | Recommendation engine / data source (backend) |
| 8.4 | Promo code engine (apply-code UI in booking) | 🔴 | 6,000 | Promo validation & rules engine (backend; depends on 6.1) |

---

## 9. Infrastructure & operations — *16,000 EGP (frontend portion)*

> Most of this is DevOps/ops, not frontend. Only the frontend-side portion is priced.

| # | Requirement | Status | Frontend (EGP) | Backend / ops needed |
|---|---|:--:|---:|---|
| 9.1 / 9.2 / 9.5 | Deploy config (Vercel SSR, env, image CDN, SSL) | ✅ | 4,000 | Host account, domain, DNS (client/ops) |
| 9.3 | Security hardening (CSP / security headers on the frontend) | 🔴 | 6,000 | WAF, rate limiting, backups, pen test (ops/backend) |
| 9.6 | CMS team training (session + short guide) | ⚪ | 6,000 | Depends on CMS (2.1) |
| 9.4 | Backup / recovery plan | ⚪ | — | Ops/backend (no frontend work) |
| 9.7 | Post-launch support & maintenance | ⚪ | *retainer (see below)* | SLA terms to agree |

---

## Maintenance retainer (optional, separate from build)

Not part of the fixed build prices above. Suggested monthly retainer for bug fixes, minor content/UI tweaks, dependency/security updates, and uptime checks:

- **Suggested: EGP 5,000 – 8,000 / month** (scope & hours to be agreed).

---

## Backend / third-party dependency checklist

For the **remaining** frontend to go live, these must be provided by backend / the client / third parties (priced separately by those parties):

1. **Headless CMS** provisioned, modelled, migrated, with editor access (unblocks 2.1, 4.4, 4.5, 4.8, 5.4, 7.4).
2. **Booking engine** with API/widget + rates/availability/inventory (unblocks 6.1, 3.12, 6.8, 8.4).
3. **Payment gateway** merchant + server-side payment/webhooks (6.2).
4. **Analytics/marketing accounts**: GA4, GTM container + event spec, Meta Pixel, Search Console access (6.4–6.7).
5. **Review feed**: TripAdvisor Content API / provider keys (6.9 / 3.10).
6. **Email service**: transactional/contact endpoint + newsletter ESP (4.9, 4.10).
7. **Translation** of DE/IT/RU entity content (5.4).
8. **AI/chat & recommendation services** if smart features are chosen (8.1–8.4).
9. **Hosting/ops**: host account, domain/DNS, SSL (automatic on Vercel), WAF/backup/DR (9.x).

---

## Assumptions & exclusions

- Frontend engineering only, in EGP, fixed per requirement; **estimates to confirm before contracting**.
- Excludes all third-party **license/subscription** fees (CMS, booking engine, payment gateway, analytics, AI/chat, review API, ESP, hosting/CDN).
- Excludes **content production**: copywriting, photography, video, and professional translation.
- Excludes backend/server development and DevOps/ops work (scoped above, priced by those teams).
- Delivered (✅) prices represent work already completed in the current codebase.
- Prices assume the existing codebase as the baseline; significant design or scope changes would be re-quoted.

---

*Companion documents: [REQUIREMENTS-STATUS.md](./REQUIREMENTS-STATUS.md) (delivered vs pipeline) · [FEATURES.md](./FEATURES.md) (business overview) · [README.md](./README.md) / [CLAUDE.md](./CLAUDE.md) (technical).*
