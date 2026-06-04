<script setup lang="ts">
// =====================================================================
// AboutView — the /about page (About Us).
// Reuses the shared SiteNavbar + SiteFooter and the resort-page design
// system (x-*/h-hero classes) plus the page-specific ab-* styles
// (src/styles/resort/about.css). Behaviour (scroll reveal, counters,
// the reservation modal, lucide icons) is wired by setupResortPage
// after mount — the same composable the resort/awards pages use.
// The policy accordion is Vue-managed state (a port of the design
// bundle's about.js): open panels get their measured scrollHeight as
// max-height so the CSS transition animates, re-synced on resize and
// locale changes. UI strings come from vue-i18n (t); entity content
// (pillars, results, policies, reports) from data (tBi).
// =====================================================================
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { useEventListener } from '@/composables/useEventListener'
import { setupResortPage, type ResortPageHandle } from '@/composables/useResortPage'
import SiteNavbar from '@/components/shared/SiteNavbar.vue'
import SiteFooter from '@/components/shared/SiteFooter.vue'
import {
  ABOUT_HERO_IMG,
  ABOUT_WHO_IMG,
  ABOUT_PILLARS,
  ABOUT_POLICIES,
  ABOUT_REPORTS,
  ABOUT_RESULTS,
  ABOUT_STATS,
  KIROSEIZ_COMPANIES,
} from '@/data/content'

const { locale, t, tBi } = useLocale()
const bg = (url: string) => `background-image:url('${url}')`

let page: ResortPageHandle | null = null

// ---- policy accordion (first item open, others collapsed) ----
const policyOpen = ref<boolean[]>(ABOUT_POLICIES.map((_, i) => i === 0))
const panelEls: (HTMLElement | null)[] = []
const setPanelEl = (el: Element | ComponentPublicInstance | null, i: number) => {
  panelEls[i] = (el as HTMLElement | null) ?? null
}

// Open panels animate via max-height, so it must match the rendered
// content — measure scrollHeight whenever content or viewport changes.
const syncPanels = () => {
  panelEls.forEach((panel, i) => {
    if (panel) panel.style.maxHeight = policyOpen.value[i] ? `${panel.scrollHeight}px` : ''
  })
}

const togglePolicy = (i: number) => {
  policyOpen.value[i] = !policyOpen.value[i]
  nextTick(syncPanels)
}

useEventListener(window, 'resize', syncPanels)

onMounted(async () => {
  page = await setupResortPage()
  // icons are swapped in by now, so measured heights are final
  syncPanels()
})

watch(locale, () =>
  nextTick(() => {
    page?.refresh()
    syncPanels()
  }),
)

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
    <div class="h-hero__media" :style="bg(ABOUT_HERO_IMG)"></div>
    <div class="h-hero__scrim"></div>
    <div class="h-hero__inner x-wrap">
      <div class="ab-crumb x-reveal">
        <RouterLink to="/">{{ t('nav.home') }}</RouterLink>
        <i data-lucide="chevron-right"></i>
        <span>{{ t('aboutPage.breadcrumb') }}</span>
      </div>
      <h1 class="h-hero__name x-reveal" data-delay="1" style="font-size:clamp(40px,5.4vw,76px)">
        {{ t('aboutPage.heroTitle') }}
      </h1>
      <p class="h-hero__sub x-reveal" data-delay="2">{{ t('aboutPage.heroSub') }}</p>
    </div>
  </section>

  <!-- ===================== WHO WE ARE ===================== -->
  <section class="x-section x-wrap" id="who">
    <div class="ab-who">
      <div>
        <div class="x-eyebrow x-reveal">{{ t('aboutPage.whoEyebrow') }}</div>
        <h2 class="x-h2 x-reveal" data-delay="1" style="margin:16px 0 0">{{ t('aboutPage.whoTitle') }}</h2>
        <p class="x-lead x-reveal" data-delay="2" style="margin:22px 0 0">{{ t('aboutPage.whoLead') }}</p>
        <p class="x-body x-reveal" data-delay="3" style="margin:16px 0 0;color:var(--xp-slate);line-height:1.7">
          {{ t('aboutPage.whoBody') }}
        </p>
        <div class="ab-group x-reveal" data-delay="4">
          <span v-for="c in KIROSEIZ_COMPANIES" :key="c.label"><i :data-lucide="c.icon"></i> {{ c.label }}</span>
        </div>
      </div>
      <div class="ab-who__media x-reveal" data-delay="1" :style="bg(ABOUT_WHO_IMG)">
        <div class="ab-who__tag">
          <b>2011</b>
          <span>{{ t('aboutPage.tagFounded') }}<br />{{ t('aboutPage.tagMember') }}</span>
        </div>
      </div>
    </div>
    <div
      class="x-stats"
      style="margin-top:clamp(40px,5vw,64px);justify-content:space-between;border-top:1px solid var(--xp-line);padding-top:40px"
    >
      <div
        v-for="(stat, i) in ABOUT_STATS"
        :key="stat.label.en"
        class="x-stat x-reveal"
        :data-delay="i || undefined"
      >
        <b :data-count="stat.count" :data-suffix="stat.suffix">{{ stat.count }}{{ stat.suffix }}</b>
        <span style="color:var(--xp-muted)">{{ tBi(stat.label) }}</span>
      </div>
    </div>
  </section>

  <!-- ===================== SUSTAINABILITY ===================== -->
  <section class="x-band" id="sustainability">
    <div class="x-section x-wrap">
      <div class="x-section__head x-reveal">
        <div class="x-eyebrow">{{ t('aboutPage.susEyebrow') }}</div>
        <h2 class="x-section__title x-h2">{{ t('aboutPage.susTitle') }}</h2>
        <p class="x-section__lead x-lead">{{ t('aboutPage.susLead') }}</p>
      </div>
      <div class="ab-pillars">
        <div
          v-for="(pillar, i) in ABOUT_PILLARS"
          :key="pillar.title.en"
          class="ab-pillar x-reveal"
          :data-delay="i || undefined"
        >
          <span class="ab-pillar__ic"><i :data-lucide="pillar.icon"></i></span>
          <b>{{ tBi(pillar.title) }}</b>
          <p>{{ tBi(pillar.desc) }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================== ACHIEVEMENTS (dark) ===================== -->
  <section class="x-band--sea" id="achievements">
    <div class="x-section x-wrap">
      <div class="x-section__head x-reveal">
        <div class="x-eyebrow" style="color:var(--xp-gold-soft)">{{ t('aboutPage.resultsEyebrow') }}</div>
        <h2 class="x-section__title x-h2" style="color:#fff">{{ t('aboutPage.resultsTitle') }}</h2>
        <p class="x-section__lead x-lead" style="color:var(--xp-on-dark-mut)">{{ t('aboutPage.resultsLead') }}</p>
      </div>
      <div class="ab-results">
        <div
          v-for="(result, i) in ABOUT_RESULTS"
          :key="result.label.en"
          class="ab-result x-reveal"
          :data-delay="i || undefined"
        >
          <div class="ab-result__n">
            <span :data-count="result.count">{{ result.count }}</span>
            <em v-if="result.unit">{{ result.unit }}</em>
          </div>
          <div class="ab-result__lbl">{{ tBi(result.label) }}</div>
          <div class="ab-result__sub">{{ tBi(result.sub) }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================== POLICIES (accordion) ===================== -->
  <section class="x-section x-wrap" id="policies">
    <div class="x-section__head x-reveal">
      <div class="x-eyebrow">{{ t('aboutPage.policiesEyebrow') }}</div>
      <h2 class="x-section__title x-h2">{{ t('aboutPage.policiesTitle') }}</h2>
      <p class="x-section__lead x-lead">{{ t('aboutPage.policiesLead') }}</p>
    </div>
    <div class="ab-acc">
      <!-- The reveal observer adds `is-in` imperatively; it must live on a
           wrapper Vue never re-patches, or toggling the reactive `is-open`
           class below would wipe it and hide the card again. -->
      <div
        v-for="(policy, i) in ABOUT_POLICIES"
        :key="policy.title.en"
        class="x-reveal"
        :data-delay="(i % 2) || undefined"
      >
        <div class="ab-item" :class="{ 'is-open': policyOpen[i] }">
          <button class="ab-item__btn" :aria-expanded="policyOpen[i]" @click="togglePolicy(i)">
            <span class="ab-item__ic"><i :data-lucide="policy.icon"></i></span>
            <span class="ab-item__t">{{ tBi(policy.title) }}</span>
            <i class="ab-item__chev" data-lucide="chevron-down"></i>
          </button>
          <div class="ab-item__panel" :ref="(el) => setPanelEl(el, i)">
            <div class="ab-item__inner">
              <p>{{ tBi(policy.intro) }}</p>
              <ul>
                <li v-for="point in policy.points" :key="point.en">
                  <i data-lucide="check"></i> {{ tBi(point) }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================== REPORTS ===================== -->
  <section class="x-band" id="reports">
    <div class="x-section x-wrap">
      <div class="x-section__head x-reveal">
        <div class="x-eyebrow">{{ t('aboutPage.reportsEyebrow') }}</div>
        <h2 class="x-section__title x-h2">{{ t('aboutPage.reportsTitle') }}</h2>
      </div>
      <div class="ab-reports">
        <article
          v-for="(report, i) in ABOUT_REPORTS"
          :key="report.href"
          class="ab-report x-reveal"
          :data-delay="i || undefined"
        >
          <span class="ab-report__ic"><i data-lucide="file-text"></i></span>
          <b>{{ tBi(report.title) }}</b>
          <a class="x-link" :href="report.href" target="_blank" rel="noopener">
            {{ t('aboutPage.downloadPdf') }} <i data-lucide="download"></i>
          </a>
        </article>
      </div>
    </div>
  </section>

  <!-- ===================== CTA BAND ===================== -->
  <section class="x-band--sea">
    <div class="x-section x-wrap" style="text-align:center">
      <div class="x-eyebrow is-center x-reveal" style="color:var(--xp-gold-soft)">{{ t('aboutPage.ctaEyebrow') }}</div>
      <h2 class="x-h2 x-reveal" data-delay="1" style="color:#fff;margin:16px auto 0;max-width:18ch">
        {{ t('aboutPage.ctaTitle') }}
      </h2>
      <div
        class="x-reveal"
        data-delay="2"
        style="margin-top:28px;display:flex;gap:14px;justify-content:center;flex-wrap:wrap"
      >
        <RouterLink class="x-btn x-btn--gold x-btn--lg" :to="{ path: '/', hash: '#resorts' }">
          {{ t('aboutPage.ctaExplore') }} <i data-lucide="arrow-right"></i>
        </RouterLink>
        <button class="x-btn x-btn--glass x-btn--lg" @click="onBook">{{ t('aboutPage.ctaCheck') }}</button>
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
