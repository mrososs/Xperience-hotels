<script setup lang="ts">
// =====================================================================
// AwardsView — the /awards page.
// Reuses the shared SiteNavbar + SiteFooter and the resort-page design
// system (x-*/h-hero/aw-* classes, all global). Behaviour (scroll
// reveal, the reservation modal, lucide icons) is wired by
// setupResortPage after mount — the same composable the resort pages
// use; it no-ops the bits this page doesn't have (booking bar, gallery).
// UI strings come from vue-i18n (t); award copy from data (tBi).
// =====================================================================
import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { useBgImage, HERO_BG } from '@/composables/useBgImage'
import { setupResortPage, type ResortPageHandle } from '@/composables/useResortPage'
import SiteNavbar from '@/components/shared/SiteNavbar.vue'
import SiteFooter from '@/components/shared/SiteFooter.vue'
import { AWARD_HERO_IMG, AWARD_MARKS, AWARDS_BY_RESORT } from '@/data/content'

const { locale, t, tBi } = useLocale()
const localePath = useLocalePath()
const { bg, src } = useBgImage()

useSeoMeta({
  title: () => t('seo.awards.title'),
  description: () => t('seo.awards.description'),
  ogTitle: () => t('seo.awards.title'),
  ogDescription: () => t('seo.awards.description'),
  ogType: 'website',
  ogImage: AWARD_HERO_IMG,
  twitterCard: 'summary_large_image',
})

// Preload the page hero (LCP) — same optimized URL the .h-hero__media uses.
useHead({
  link: [{ rel: 'preload', as: 'image', href: src(AWARD_HERO_IMG, HERO_BG), fetchpriority: 'high' }],
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

const onBook = () => page?.open()
</script>

<template>
  <SiteNavbar @book="onBook" />

  <!-- ===================== PAGE HERO ===================== -->
  <section class="h-hero h-hero--page">
    <div class="h-hero__media" :style="bg(AWARD_HERO_IMG, HERO_BG)"></div>
    <div class="h-hero__scrim"></div>
    <div class="h-hero__inner x-wrap">
      <div class="x-eyebrow x-reveal" style="color:var(--xp-gold-soft)">{{ t('awards.eyebrow') }}</div>
      <h1 class="h-hero__name x-reveal" data-delay="1" style="font-size:clamp(40px,5.4vw,76px)">
        {{ t('awards.heroTitle') }}
      </h1>
      <p class="h-hero__sub x-reveal" data-delay="2">{{ t('awards.heroSub') }}</p>
    </div>
  </section>

  <!-- ===================== AWARD BODIES STRIP ===================== -->
  <section class="x-band">
    <div
      class="x-section x-wrap"
      style="text-align:center;padding-top:clamp(48px,6vw,72px);padding-bottom:clamp(48px,6vw,72px)"
    >
      <div class="x-eyebrow is-center x-reveal">{{ t('awards.certifiedBy') }}</div>
      <div class="aw-marks x-reveal" data-delay="1" style="margin-top:24px">
        <span v-for="mark in AWARD_MARKS" :key="mark.label" class="aw-mark">
          <img :src="src(mark.img, { width: 220 })" :alt="mark.label" loading="lazy" />
          <span>{{ mark.label }}</span>
        </span>
      </div>
    </div>
  </section>

  <!-- ===================== AWARDS BY RESORT ===================== -->
  <section class="x-section x-wrap">
    <div v-for="group in AWARDS_BY_RESORT" :key="group.slug" class="aw-resort">
      <div class="aw-resort__head x-reveal">
        <h3>{{ group.name }}</h3>
        <span class="aw-resort__count">{{ group.awards.length }} {{ t('awards.awardsWord') }}</span>
        <NuxtLink class="x-link aw-resort__link" :to="localePath(`/resorts/${group.slug}`)">
          {{ t('awards.viewResort') }} <i data-lucide="arrow-right"></i>
        </NuxtLink>
      </div>
      <div class="aw-grid">
        <article
          v-for="(award, i) in group.awards"
          :key="`${group.slug}-${i}`"
          class="aw-card x-reveal"
          :data-delay="(i % 3) || undefined"
        >
          <span class="aw-card__badge"><img :src="src(award.img, { width: 220 })" :alt="award.source" loading="lazy" /></span>
          <div class="aw-card__body">
            <span class="aw-card__year">{{ award.source }}</span>
            <b>{{ award.title }}</b>
            <p class="aw-card__title">{{ tBi(award.desc) }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- ===================== CTA BAND ===================== -->
  <section class="x-band--sea">
    <div class="x-section x-wrap" style="text-align:center">
      <div class="x-eyebrow is-center x-reveal" style="color:var(--xp-gold-soft)">{{ t('awards.ctaEyebrow') }}</div>
      <h2 class="x-h2 x-reveal" data-delay="1" style="color:#fff;margin:16px auto 0;max-width:18ch">
        {{ t('awards.ctaTitle') }}
      </h2>
      <div
        class="x-reveal"
        data-delay="2"
        style="margin-top:28px;display:flex;gap:14px;justify-content:center;flex-wrap:wrap"
      >
        <NuxtLink class="x-btn x-btn--gold x-btn--lg" :to="localePath({ path: '/', hash: '#resorts' })">
          {{ t('awards.ctaExplore') }} <i data-lucide="arrow-right"></i>
        </NuxtLink>
        <button class="x-btn x-btn--glass x-btn--lg" @click="onBook">{{ t('awards.ctaCheck') }}</button>
      </div>
    </div>
  </section>

  <SiteFooter />

  <!-- ===================== BOOK MODAL ===================== -->
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
