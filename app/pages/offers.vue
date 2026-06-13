<script setup lang="ts">
// =====================================================================
// OffersView — the /offers page (honeymooner packages + book-direct
// benefits). Port of the design bundle's "Offers.html": reuses the
// shared SiteNavbar + SiteFooter and the resort-page design system
// (x-*/h-hero classes, all global) plus the page-specific of-* styles
// (assets/styles/resort/offers.css). Behaviour (scroll reveal, the
// reservation modal, lucide icons) is wired by setupResortPage after
// mount — the same composable the awards/resort pages use. UI strings
// come from vue-i18n (t); package perks & benefit labels from data
// (tBi).
// =====================================================================
import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { useBgImage, HERO_BG } from '@/composables/useBgImage'
import { setupResortPage, type ResortPageHandle } from '@/composables/useResortPage'
import SiteNavbar from '@/components/shared/SiteNavbar.vue'
import SiteFooter from '@/components/shared/SiteFooter.vue'
import {
  BOOK_DIRECT_BENEFITS,
  HONEYMOON_PACKAGES,
  OFFERS_HERO_IMG,
} from '@/data/offers'

const { locale, t, tBi } = useLocale()
const localePath = useLocalePath()
const { bg, src } = useBgImage()

useSeoMeta({
  title: () => t('seo.offers.title'),
  description: () => t('seo.offers.description'),
  ogTitle: () => t('seo.offers.title'),
  ogDescription: () => t('seo.offers.description'),
  ogType: 'website',
  ogImage: OFFERS_HERO_IMG,
  twitterCard: 'summary_large_image',
})

// Preload the page hero (LCP) — same optimized URL the .h-hero__media uses.
useHead({
  link: [{ rel: 'preload', as: 'image', href: src(OFFERS_HERO_IMG, HERO_BG), fetchpriority: 'high' }],
})

let page: ResortPageHandle | null = null

onMounted(async () => {
  page = await setupResortPage({ t, locale })
})

watch(locale, () => nextTick(() => page?.refresh()))

onBeforeUnmount(() => {
  page?.destroy()
  page = null
})

// Card "Book Now" presets the modal to that resort; the nav/CTA buttons
// open it unset.
const onBook = (hotel?: string) => page?.open(hotel)
</script>

<template>
  <SiteNavbar @book="onBook()" />

  <!-- ===================== PAGE HERO ===================== -->
  <section class="h-hero h-hero--page">
    <div class="h-hero__media" :style="bg(OFFERS_HERO_IMG, HERO_BG)"></div>
    <div class="h-hero__scrim"></div>
    <div class="h-hero__inner x-wrap">
      <div class="x-eyebrow x-reveal" style="color:var(--xp-gold-soft)">{{ t('offers.eyebrow') }}</div>
      <h1 class="h-hero__name x-reveal" data-delay="1" style="font-size:clamp(40px,5.4vw,76px)">
        {{ t('offers.heroTitle1') }}<br />{{ t('offers.heroTitle2') }}
      </h1>
      <p class="h-hero__sub x-reveal" data-delay="2">{{ t('offers.heroSub') }}</p>
    </div>
  </section>

  <!-- ===================== HONEYMOONER PACKAGES ===================== -->
  <section class="x-section x-wrap">
    <div class="of-group">
      <div class="x-section__head x-reveal">
        <div class="x-eyebrow">{{ t('offers.honeymoonEyebrow') }}</div>
        <h2 class="x-section__title x-h2">{{ t('offers.honeymoonTitle') }}</h2>
        <p class="x-section__lead x-lead">{{ t('offers.honeymoonLead') }}</p>
      </div>

      <div class="of-grid">
        <article
          v-for="(pkg, i) in HONEYMOON_PACKAGES"
          :key="pkg.slug"
          class="of-card x-reveal"
          :data-delay="(i % 2) || undefined"
        >
          <div class="of-card__media">
            <div class="of-card__img" :style="bg(pkg.img, { width: 1000 })"></div>
            <div class="of-card__scrim"></div>
            <span class="of-card__tag"><i data-lucide="heart"></i> {{ t('offers.cardTag') }}</span>
          </div>
          <div class="of-card__body">
            <h3 class="of-card__name">{{ pkg.fullName }}</h3>
            <span class="of-card__loc"><i data-lucide="map-pin"></i> {{ tBi(pkg.loc) }}</span>
            <ul class="of-list">
              <li v-for="(perk, p) in pkg.perks" :key="p"><i data-lucide="check"></i> {{ tBi(perk) }}</li>
            </ul>
            <div class="of-card__foot">
              <button class="x-btn x-btn--gold" @click="onBook(pkg.fullName)">
                {{ t('common.bookNow') }} <i data-lucide="arrow-right"></i>
              </button>
              <NuxtLink class="x-link" :to="localePath(`/resorts/${pkg.slug}`)">
                {{ t('offers.viewResort') }} <i data-lucide="arrow-right"></i>
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>

      <p class="of-fineprint x-reveal"><i data-lucide="info"></i> {{ t('offers.fineprint') }}</p>
    </div>
  </section>

  <!-- ===================== BOOK DIRECT BENEFITS ===================== -->
  <section class="x-band">
    <div class="x-section x-wrap">
      <div class="x-section__head is-center x-reveal">
        <div class="x-eyebrow is-center">{{ t('offers.benefitsEyebrow') }}</div>
        <h2 class="x-section__title x-h2">{{ t('offers.benefitsTitle') }}</h2>
        <p class="x-section__lead x-lead">{{ t('offers.benefitsLead') }}</p>
      </div>
      <div class="x-benefits">
        <div
          v-for="(b, i) in BOOK_DIRECT_BENEFITS"
          :key="b.icon"
          class="x-benefit x-reveal"
          :data-delay="i || undefined"
        >
          <span class="x-benefit__ic"><i :data-lucide="b.icon"></i></span>
          <span class="x-benefit__t">{{ tBi(b.label) }}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================== CTA BAND ===================== -->
  <section class="x-band--sea">
    <div class="x-section x-wrap" style="text-align:center">
      <div class="x-eyebrow is-center x-reveal" style="color:var(--xp-gold-soft)">{{ t('offers.ctaEyebrow') }}</div>
      <h2 class="x-h2 x-reveal" data-delay="1" style="color:#fff;margin:16px auto 0;max-width:20ch">
        {{ t('offers.ctaTitle') }}
      </h2>
      <div
        class="x-reveal"
        data-delay="2"
        style="margin-top:28px;display:flex;gap:14px;justify-content:center;flex-wrap:wrap"
      >
        <button class="x-btn x-btn--gold x-btn--lg" @click="onBook()">
          {{ t('common.checkAvailability') }} <i data-lucide="arrow-right"></i>
        </button>
        <NuxtLink class="x-btn x-btn--glass x-btn--lg" :to="localePath({ path: '/', hash: '#resorts' })">
          {{ t('offers.ctaExplore') }}
        </NuxtLink>
      </div>
    </div>
  </section>

  <SiteFooter />

  <!-- ===================== BOOK MODAL (nav + card Book Now) ===================== -->
  <div class="x-modal" id="bookModal">
    <div class="x-modal__card">
      <button class="x-modal__close" data-modal-close aria-label="Close"><i data-lucide="x"></i></button>
      <div class="x-modal__form">
        <div class="x-eyebrow">{{ t('modal.reservation') }}</div>
        <h3 class="x-h3" style="margin:10px 0 0">{{ t('modal.confirmStay') }}</h3>
        <div class="x-modal__rows">
          <div class="x-modal__row"><span><i data-lucide="building-2"></i> {{ t('modal.hotel') }}</span><b data-sum="hotel">—</b></div>
          <div class="x-modal__row"><span><i data-lucide="calendar"></i> {{ t('modal.dates') }}</span><b data-sum="dates">—</b></div>
          <div class="x-modal__row"><span><i data-lucide="users"></i> {{ t('modal.roomsGuests') }}</span><b data-sum="guests">—</b></div>
        </div>
        <div class="x-modal__note"><i data-lucide="crown"></i> {{ t('modal.note') }}</div>
        <button class="x-btn x-btn--gold" style="width:100%;justify-content:center" data-modal-confirm>{{ t('modal.confirmContinue') }} <i data-lucide="arrow-right"></i></button>
      </div>
      <div class="x-modal__done" style="display:none;text-align:center">
        <div class="x-modal__check"><i data-lucide="check"></i></div>
        <h3 class="x-h3">{{ t('modal.requestReceived') }}</h3>
        <p class="x-lead" style="margin:10px auto 24px;max-width:330px">{{ t('modal.requestReceivedSub') }}</p>
        <button class="x-btn x-btn--ghost" data-modal-close>{{ t('common.done') }}</button>
      </div>
    </div>
  </div>
</template>
