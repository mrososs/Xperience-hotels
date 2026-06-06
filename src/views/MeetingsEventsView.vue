<script setup lang="ts">
// =====================================================================
// MeetingsEventsView — the /meetings-events page (Kiroseiz Parkland
// meetings, banquets & weddings). Port of the design bundle's
// "Meetings & Events.html": reuses the shared SiteNavbar + SiteFooter,
// the resort-page design system (x-*/h-* classes) plus the page-specific
// m-* styles (src/styles/resort/meetings.css). Behaviour (scroll reveal,
// sticky-anchor scrollspy, the reservation modal, lucide icons) is wired
// by setupResortPage after mount — the same composable the resort/about/
// awards pages use. The enquiry form is its own component
// (MeetingsEnquiry); UI strings come from vue-i18n (t), entity content
// (facts, specs, setups, services) from data (tBi).
// =====================================================================
import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { setupResortPage, type ResortPageHandle } from '@/composables/useResortPage'
import SiteNavbar from '@/components/shared/SiteNavbar.vue'
import SiteFooter from '@/components/shared/SiteFooter.vue'
import MeetingsEnquiry from '@/components/meetings/MeetingsEnquiry.vue'
import { RESORTS } from '@/data/resorts'
import {
  BALLROOM_IMG,
  BALLROOM_SETUPS,
  BALLROOM_SPECS,
  EVENT_TYPES,
  MEETINGS_FACTS,
  MEETINGS_HERO_IMG,
  MEETINGS_QUICK,
  MEETINGS_SERVICES,
  WEDDING_HIGHLIGHTS,
  WEDDINGS_IMG,
} from '@/data/meetings'

const { locale, t, tBi } = useLocale()
const bg = (url: string) => `background-image:url('${url}')`

// The page belongs to Kiroseiz Parkland — breadcrumb + booking preset.
const parkland = RESORTS.find((r) => r.slug === 'kiroseiz-parkland')
const hotelName = parkland?.fullName ?? 'Xperience Kiroseiz Parkland'

let page: ResortPageHandle | null = null

onMounted(async () => {
  page = await setupResortPage()
})

watch(locale, () => nextTick(() => page?.refresh()))

onBeforeUnmount(() => {
  page?.destroy()
  page = null
})

const onBook = () => page?.open(hotelName)

// "Enquire" / "Request a proposal" jump buttons — smooth scroll to the
// enquiry band (scroll-margin-top keeps it clear of the sticky chrome).
const goEnquire = () => document.getElementById('enquire')?.scrollIntoView({ behavior: 'smooth' })
</script>

<template>
  <SiteNavbar @book="onBook" />

  <!-- ===================== HERO ===================== -->
  <section class="h-hero h-hero--page">
    <div class="h-hero__media" :style="bg(MEETINGS_HERO_IMG)"></div>
    <div class="h-hero__scrim"></div>
    <div class="h-hero__inner x-wrap">
      <div class="m-crumb x-reveal">
        <RouterLink to="/">{{ t('nav.home') }}</RouterLink>
        <i data-lucide="chevron-right"></i>
        <RouterLink :to="`/resorts/${parkland?.slug ?? 'kiroseiz-parkland'}`">{{ hotelName }}</RouterLink>
        <i data-lucide="chevron-right"></i>
        <b>{{ t('meetingsPage.breadcrumb') }}</b>
      </div>
      <h1 class="h-hero__name x-reveal" data-delay="1">{{ t('meetingsPage.heroTitle1') }}<br />{{ t('meetingsPage.heroTitle2') }}</h1>
      <p class="h-hero__sub x-reveal" data-delay="2">{{ t('meetingsPage.heroSub') }}</p>
      <div class="h-hero__facts x-reveal" data-delay="3">
        <span v-for="f in MEETINGS_FACTS" :key="f.icon" class="h-fact"><i :data-lucide="f.icon"></i> {{ tBi(f.text) }}</span>
      </div>
    </div>
  </section>

  <!-- ===================== STICKY ANCHORS ===================== -->
  <div class="h-anchors">
    <div class="x-wrap h-anchors__inner">
      <a href="#overview">{{ t('meetingsPage.anchorOverview') }}</a>
      <a href="#ballroom">{{ t('meetingsPage.anchorBallroom') }}</a>
      <a href="#venues">{{ t('meetingsPage.anchorVenues') }}</a>
      <a href="#capacity">{{ t('meetingsPage.anchorCapacity') }}</a>
      <a href="#weddings">{{ t('meetingsPage.anchorWeddings') }}</a>
      <a href="#services">{{ t('meetingsPage.anchorServices') }}</a>
      <a href="#enquire">{{ t('meetingsPage.anchorEnquire') }}</a>
      <button class="x-btn x-btn--gold x-btn--sm h-anchors__go" @click="goEnquire">{{ t('meetingsPage.enquire') }}</button>
    </div>
  </div>

  <!-- ===================== OVERVIEW ===================== -->
  <section class="x-section x-wrap" id="overview">
    <div class="h-intro">
      <div>
        <div class="x-eyebrow x-reveal">{{ t('meetingsPage.overviewEyebrow') }}</div>
        <h2 class="x-h2 x-reveal" data-delay="1" style="margin:16px 0 0">{{ t('meetingsPage.overviewTitle') }}</h2>
        <p class="x-lead x-reveal" data-delay="2" style="margin:22px 0 0">{{ t('meetingsPage.overviewLead') }}</p>
        <p class="x-body x-reveal" data-delay="3" style="margin:18px 0 0;color:var(--xp-slate);line-height:1.7">
          {{ t('meetingsPage.overviewBody') }}
        </p>
      </div>
      <aside class="h-intro__aside x-reveal" data-delay="1">
        <h4>{{ t('resort.atAGlance') }}</h4>
        <ul class="h-quick">
          <li v-for="q in MEETINGS_QUICK" :key="q.icon"><i :data-lucide="q.icon"></i> {{ tBi(q.text) }}</li>
        </ul>
        <button class="x-btn x-btn--gold" @click="goEnquire">{{ t('meetingsPage.requestProposal') }} <i data-lucide="arrow-right"></i></button>
      </aside>
    </div>
  </section>

  <!-- ===================== BALLROOM ===================== -->
  <section class="x-band" id="ballroom">
    <div class="x-section x-wrap">
      <div class="x-section__head x-reveal">
        <div class="x-eyebrow">{{ t('meetingsPage.ballroomEyebrow') }}</div>
        <h2 class="x-section__title x-h2">{{ t('meetingsPage.ballroomTitle') }}</h2>
      </div>
      <div class="m-ball x-reveal">
        <div class="m-ball__media" :style="bg(BALLROOM_IMG)">
          <span class="m-ball__tag"><i data-lucide="presentation"></i> {{ t('meetingsPage.ballroomTag') }}</span>
        </div>
        <div class="m-ball__panel">
          <div class="x-eyebrow">{{ t('meetingsPage.panelEyebrow') }}</div>
          <h3 class="x-h3" style="margin:12px 0 0">{{ t('meetingsPage.panelTitle') }}</h3>
          <div class="m-specs">
            <div v-for="s in BALLROOM_SPECS" :key="s.icon" class="m-spec">
              <i :data-lucide="s.icon"></i>
              <div>
                <b>{{ tBi(s.value) }}</b>
                <span>{{ tBi(s.label) }}</span>
              </div>
            </div>
          </div>
          <p class="x-body" style="margin:0 0 28px;color:var(--xp-slate);line-height:1.7">{{ t('meetingsPage.panelBody') }}</p>
          <button class="x-btn x-btn--gold" style="align-self:flex-start" @click="goEnquire">
            {{ t('common.checkAvailability') }} <i data-lucide="arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================== VENUES / EVENT TYPES ===================== -->
  <section class="x-section x-wrap" id="venues">
    <div class="x-section__head x-reveal">
      <div class="x-eyebrow">{{ t('meetingsPage.venuesEyebrow') }}</div>
      <h2 class="x-section__title x-h2">{{ t('meetingsPage.venuesTitle') }}</h2>
      <p class="x-section__lead x-lead">{{ t('meetingsPage.venuesLead') }}</p>
    </div>
    <div class="h-dining">
      <article
        v-for="(ev, i) in EVENT_TYPES"
        :key="ev.name.en"
        class="h-dine x-reveal"
        :data-delay="i || undefined"
      >
        <div class="h-dine__media" :style="bg(ev.img)"></div>
        <div class="h-dine__scrim"></div>
        <div class="h-dine__body">
          <span class="h-dine__tag">{{ tBi(ev.tag) }}</span>
          <h3 class="h-dine__name">{{ tBi(ev.name) }}</h3>
          <span class="h-dine__hours"><i :data-lucide="ev.icon"></i> {{ tBi(ev.meta) }}</span>
        </div>
      </article>
    </div>
  </section>

  <!-- ===================== CAPACITY ===================== -->
  <section class="x-band" id="capacity">
    <div class="x-section x-wrap">
      <div class="x-section__head x-reveal">
        <div class="x-eyebrow">{{ t('meetingsPage.capacityEyebrow') }}</div>
        <h2 class="x-section__title x-h2">{{ t('meetingsPage.capacityTitle') }}</h2>
        <p class="x-section__lead x-lead">{{ t('meetingsPage.capacityLead') }}</p>
      </div>
      <div class="m-cap">
        <div class="m-setups x-reveal">
          <div v-for="s in BALLROOM_SETUPS" :key="s.icon" class="m-setup">
            <div class="m-setup__ic"><i :data-lucide="s.icon"></i></div>
            <div class="m-setup__num"><b>{{ s.seats }}</b><em>{{ t('meetingsPage.seats') }}</em></div>
            <div class="m-setup__lbl">{{ tBi(s.label) }}</div>
          </div>
        </div>
        <div class="m-table x-reveal" data-delay="1">
          <div class="m-table__head">
            <h4>{{ t('meetingsPage.tableTitle') }}</h4>
            <span>{{ t('meetingsPage.tableGuests') }}</span>
          </div>
          <div v-for="s in BALLROOM_SETUPS" :key="s.icon" class="m-trow">
            <span class="m-trow__name"><i :data-lucide="s.icon"></i> {{ tBi(s.rowLabel) }}</span>
            <span class="m-trow__cap">{{ s.seats }}</span>
          </div>
          <div class="m-table__foot">{{ t('meetingsPage.tableFoot') }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================== WEDDINGS (dark) ===================== -->
  <section class="x-band--sea" id="weddings">
    <div class="x-section x-wrap">
      <div class="h-acts">
        <div class="h-acts__media x-reveal" :style="bg(WEDDINGS_IMG)">
          <b>{{ t('meetingsPage.weddingsYes') }}</b>
        </div>
        <div>
          <div class="x-eyebrow x-reveal" style="color:var(--xp-gold-soft)">{{ t('meetingsPage.weddingsEyebrow') }}</div>
          <h2 class="x-h2 x-reveal" data-delay="1" style="color:#fff;margin:16px 0 0">{{ t('meetingsPage.weddingsTitle') }}</h2>
          <p class="x-reveal" data-delay="2" style="color:rgba(237,231,220,.82);font-size:18px;line-height:1.65;margin:20px 0 0">
            {{ t('meetingsPage.weddingsLead') }}
          </p>
          <div class="h-actlist">
            <div
              v-for="(w, i) in WEDDING_HIGHLIGHTS"
              :key="w.icon"
              class="h-act x-reveal"
              :data-delay="i + 1"
            >
              <i :data-lucide="w.icon"></i>
              <div>
                <b>{{ tBi(w.title) }}</b>
                <span>{{ tBi(w.sub) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================== SERVICES ===================== -->
  <section class="x-section x-wrap" id="services">
    <div class="x-section__head x-reveal">
      <div class="x-eyebrow">{{ t('meetingsPage.servicesEyebrow') }}</div>
      <h2 class="x-section__title x-h2">{{ t('meetingsPage.servicesTitle') }}</h2>
    </div>
    <div class="h-facils">
      <div
        v-for="(s, i) in MEETINGS_SERVICES"
        :key="s.icon"
        class="h-facil x-reveal"
        :data-delay="(i % 4) || undefined"
      >
        <i :data-lucide="s.icon"></i><span>{{ tBi(s.text) }}</span>
      </div>
    </div>
  </section>

  <!-- ===================== ENQUIRE ===================== -->
  <MeetingsEnquiry />

  <SiteFooter />

  <!-- ===================== BOOK MODAL (nav Book Now) ===================== -->
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
