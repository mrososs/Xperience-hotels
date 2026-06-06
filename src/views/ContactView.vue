<script setup lang="ts">
// =====================================================================
// ContactView — the /contact page (Contact Us). Port of the design
// bundle's "Contact Us.html": reuses the shared SiteNavbar + SiteFooter,
// the resort-page design system (x-*/h-* classes) plus the page-specific
// c-* styles (src/styles/resort/contact.css). Behaviour (scroll reveal,
// the reservation modal, lucide icons) is wired by setupResortPage after
// mount — the same composable the resort/about/meetings pages use. The
// contact form and the interactive map directory are their own stateful
// components; UI strings come from vue-i18n (t), entity content (quick
// actions, HQ details, locations) from data (tBi).
// =====================================================================
import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { setupResortPage, type ResortPageHandle } from '@/composables/useResortPage'
import SiteNavbar from '@/components/shared/SiteNavbar.vue'
import SiteFooter from '@/components/shared/SiteFooter.vue'
import ContactForm from '@/components/contact/ContactForm.vue'
import ContactLocations from '@/components/contact/ContactLocations.vue'
import { SOCIAL } from '@/data/content'
import {
  CONTACT_EMAIL,
  CONTACT_FACTS,
  CONTACT_HERO_IMG,
  CONTACT_PHONE,
  CONTACT_WHATSAPP,
  HQ_FAX,
  HQ_PHONES,
} from '@/data/contact'

const { locale, t, tBi } = useLocale()
const bg = (url: string) => `background-image:url('${url}')`

let page: ResortPageHandle | null = null

onMounted(async () => {
  page = await setupResortPage()
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

  <!-- ===================== HERO ===================== -->
  <section class="h-hero h-hero--page">
    <div class="h-hero__media" :style="bg(CONTACT_HERO_IMG)"></div>
    <div class="h-hero__scrim"></div>
    <div class="h-hero__inner x-wrap">
      <div class="c-crumb x-reveal">
        <RouterLink to="/">{{ t('nav.home') }}</RouterLink>
        <i data-lucide="chevron-right"></i>
        <b>{{ t('contactPage.breadcrumb') }}</b>
      </div>
      <h1 class="h-hero__name x-reveal" data-delay="1">{{ t('contactPage.heroTitle') }}</h1>
      <p class="h-hero__sub x-reveal" data-delay="2">{{ t('contactPage.heroSub') }}</p>
      <div class="h-hero__facts x-reveal" data-delay="3">
        <span v-for="f in CONTACT_FACTS" :key="f.icon" class="h-fact"><i :data-lucide="f.icon"></i> {{ tBi(f.text) }}</span>
      </div>
    </div>
  </section>

  <!-- ===================== QUICK CONTACT STRIP ===================== -->
  <div class="x-wrap">
    <div class="c-quick">
      <a class="c-qcard x-reveal" :href="CONTACT_PHONE.href">
        <span class="c-qcard__ic"><i data-lucide="phone"></i></span>
        <span><small>{{ t('contactPage.quickCall') }}</small><b dir="ltr">{{ CONTACT_PHONE.label }}</b></span>
      </a>
      <a class="c-qcard x-reveal" data-delay="1" :href="`mailto:${CONTACT_EMAIL}`">
        <span class="c-qcard__ic"><i data-lucide="mail"></i></span>
        <span><small>{{ t('contactPage.quickEmail') }}</small><b>{{ CONTACT_EMAIL }}</b></span>
      </a>
      <a class="c-qcard x-reveal" data-delay="2" :href="CONTACT_WHATSAPP" target="_blank" rel="noopener">
        <span class="c-qcard__ic"><i data-lucide="message-circle"></i></span>
        <span><small>{{ t('contactPage.quickWhatsapp') }}</small><b>{{ t('contactPage.quickChat') }}</b></span>
      </a>
      <a class="c-qcard x-reveal" data-delay="3" href="#locations">
        <span class="c-qcard__ic"><i data-lucide="map-pin"></i></span>
        <span><small>{{ t('contactPage.quickVisit') }}</small><b>{{ t('contactPage.quickFind') }}</b></span>
      </a>
    </div>
  </div>

  <!-- ===================== FORM + ASIDE ===================== -->
  <section class="x-section x-wrap" id="form">
    <div class="x-section__head x-reveal" style="margin-bottom:40px">
      <div class="x-eyebrow">{{ t('contactPage.headEyebrow') }}</div>
      <h2 class="x-section__title x-h2">{{ t('contactPage.headTitle') }}</h2>
      <p class="x-section__lead x-lead">{{ t('contactPage.headLead') }}</p>
    </div>

    <div class="c-main">
      <ContactForm />

      <!-- ASIDE: HEAD OFFICE -->
      <aside class="c-aside x-reveal" data-delay="1">
        <div class="x-eyebrow c-aside__eyebrow">{{ t('contactPage.asideEyebrow') }}</div>
        <h3>{{ t('contactPage.asideTitle') }}</h3>
        <div class="c-rows">
          <div class="c-row">
            <span class="c-row__ic"><i data-lucide="map-pin"></i></span>
            <span><small>{{ t('contactPage.address') }}</small><span>{{ t('contactPage.addressVal') }}</span></span>
          </div>
          <div class="c-row">
            <span class="c-row__ic"><i data-lucide="phone"></i></span>
            <span>
              <small>{{ t('contactPage.telephone') }}</small>
              <a v-for="p in HQ_PHONES" :key="p.href" :href="p.href" dir="ltr">{{ p.label }}</a>
            </span>
          </div>
          <div class="c-row">
            <span class="c-row__ic"><i data-lucide="printer"></i></span>
            <span><small>{{ t('contactPage.fax') }}</small><span dir="ltr">{{ HQ_FAX }}</span></span>
          </div>
          <div class="c-row">
            <span class="c-row__ic"><i data-lucide="mail"></i></span>
            <span><small>{{ t('contactPage.email') }}</small><a :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a></span>
          </div>
          <div class="c-row">
            <span class="c-row__ic"><i data-lucide="clock"></i></span>
            <span><small>{{ t('contactPage.hours') }}</small><span>{{ t('contactPage.hoursVal') }}</span></span>
          </div>
        </div>
        <div class="c-aside__social">
          <a v-for="s in SOCIAL.slice(0, 4)" :key="s.name" :href="s.href" :aria-label="s.name" target="_blank" rel="noopener"><i :data-lucide="s.name"></i></a>
        </div>
      </aside>
    </div>
  </section>

  <!-- ===================== LOCATIONS / MAP ===================== -->
  <section class="x-band" id="locations">
    <div class="x-section x-wrap">
      <div class="x-section__head x-reveal">
        <div class="x-eyebrow">{{ t('contactPage.locEyebrow') }}</div>
        <h2 class="x-section__title x-h2">{{ t('contactPage.locTitle') }}</h2>
        <p class="x-section__lead x-lead">{{ t('contactPage.locLead') }}</p>
      </div>

      <ContactLocations />
    </div>
  </section>

  <!-- ===================== GET SOCIAL (dark) ===================== -->
  <section class="x-band--sea">
    <div class="x-section x-wrap" style="text-align:center">
      <div class="x-eyebrow is-center x-reveal" style="color:var(--xp-gold-soft)">{{ t('contactPage.socialEyebrow') }}</div>
      <h2 class="x-h2 x-reveal" data-delay="1" style="color:#fff;margin:16px 0 0">{{ t('contactPage.socialTitle') }}</h2>
      <p class="x-lead x-reveal" data-delay="2" style="color:var(--xp-on-dark-mut);margin:16px auto 32px;max-width:520px">
        {{ t('contactPage.socialLead') }}
      </p>
      <div class="c-aside__social x-reveal" data-delay="2" style="justify-content:center;border:none;padding:0">
        <a v-for="s in SOCIAL" :key="s.name" :href="s.href" :aria-label="s.name" target="_blank" rel="noopener"><i :data-lucide="s.name"></i></a>
      </div>
    </div>
  </section>

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
