<script setup lang="ts">
// =====================================================================
// ResortDetail — the dynamic resort detail page.
// One template rendered from a Resort record (src/data/resorts.ts), so
// every property shares the design while differing in imagery, copy,
// rooms and pricing. UI strings come from vue-i18n (t); per-resort
// content from the data record (tBi). Behaviour (reveal, counters,
// booking bar + modal, gallery lightbox, anchor scrollspy) is wired by
// setupResortPage after mount.
// =====================================================================
import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { setupResortPage, type ResortPageHandle } from '@/composables/useResortPage'
import SiteNavbar from '@/components/shared/SiteNavbar.vue'
import SiteFooter from '@/components/shared/SiteFooter.vue'
import type { Resort } from '@/data/resorts'

const props = defineProps<{ resort: Resort }>()

const { locale, t, tBi } = useLocale()
const bg = (url: string) => `background-image:url('${url}')`

let page: ResortPageHandle | null = null

onMounted(async () => {
  page = await setupResortPage()
})

// After the locale flips, let Vue patch the DOM first, then re-render the
// imperatively-managed booking bar so its values match the new language.
watch(locale, () => nextTick(() => page?.refresh()))

onBeforeUnmount(() => {
  page?.destroy()
  page = null
})

const onBook = () => page?.open(props.resort.fullName)
</script>

<template>
  <SiteNavbar @book="onBook" />

  <!-- ===================== HOTEL HERO ===================== -->
  <section class="h-hero">
    <div class="h-hero__media" :style="bg(resort.hero)"></div>
    <div class="h-hero__scrim"></div>
    <div class="h-hero__inner x-wrap">
      <div class="h-hero__top x-reveal">
        <span class="h-rating">
          <span class="h-rating__stars"><i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i></span>
          {{ t('resort.fiveStar') }}
        </span>
        <span class="x-chip" style="background:rgba(255,255,255,.14)"><i data-lucide="map-pin" style="width:15px;height:15px;color:var(--xp-gold-soft)"></i> {{ tBi(resort.area) }}</span>
      </div>
      <h1 class="h-hero__name x-reveal" data-delay="1">{{ resort.heroLines[0] }}<br />{{ resort.heroLines[1] }}</h1>
      <p class="h-hero__sub x-reveal" data-delay="2">{{ tBi(resort.blurb) }}</p>
      <div class="h-hero__facts x-reveal" data-delay="3">
        <span class="h-fact"><i data-lucide="waves"></i> {{ t('resort.factPrivateBeach') }}</span>
        <span class="h-fact"><i data-lucide="droplets"></i> {{ t('resort.factOutdoorPools') }}</span>
        <span class="h-fact"><i data-lucide="users"></i> {{ t('resort.factFamily') }}</span>
        <span class="h-fact"><i data-lucide="anchor"></i> {{ t('resort.factDiveCenter') }}</span>
      </div>
    </div>
  </section>

  <!-- ===================== STICKY ANCHORS ===================== -->
  <div class="h-anchors">
    <div class="x-wrap h-anchors__inner">
      <a href="#overview">{{ t('resort.anchorOverview') }}</a>
      <a href="#gallery">{{ t('resort.anchorGallery') }}</a>
      <a href="#rooms">{{ t('resort.anchorRooms') }}</a>
      <a href="#dining">{{ t('resort.anchorDining') }}</a>
      <a href="#activities">{{ t('resort.anchorActivities') }}</a>
      <a href="#facilities">{{ t('resort.anchorFacilities') }}</a>
      <a href="#location">{{ t('resort.anchorLocation') }}</a>
      <a href="#reviews">{{ t('resort.anchorReviews') }}</a>
      <button class="x-btn x-btn--gold x-btn--sm h-anchors__go" :data-book-open="resort.fullName">{{ t('common.book') }}</button>
    </div>
  </div>

  <!-- ===================== OVERVIEW ===================== -->
  <section class="x-section x-wrap" id="overview">
    <div class="h-intro">
      <div>
        <div class="x-eyebrow x-reveal">{{ t('resort.welcome') }}</div>
        <h2 class="x-h2 x-reveal" data-delay="1" style="margin:16px 0 0">{{ t('resort.escapeHeading', { area: tBi(resort.area) }) }}</h2>
        <p class="x-lead x-reveal" data-delay="2" style="margin:22px 0 0">{{ tBi(resort.intro) }} {{ t('resort.ultimateExperience') }}</p>
        <p class="x-body x-reveal" data-delay="3" style="margin:18px 0 0;color:var(--xp-slate);line-height:1.7">{{ tBi(resort.introExtra) }}</p>
      </div>
      <aside class="h-intro__aside x-reveal" data-delay="1">
        <h4>{{ t('resort.atAGlance') }}</h4>
        <ul class="h-quick">
          <li v-for="(q, i) in resort.quick" :key="i"><i :data-lucide="q.icon"></i> {{ tBi(q.text) }}</li>
        </ul>
        <div style="display:flex;align-items:baseline;gap:8px;margin-bottom:16px">
          <span class="x-small">{{ t('common.from') }}</span>
          <b class="x-serif" style="font-size:30px;color:var(--xp-ink)">€{{ resort.priceFrom }}</b>
          <span class="x-small">{{ t('common.perNight') }}</span>
        </div>
        <button class="x-btn x-btn--gold" :data-book-open="resort.fullName">{{ t('common.checkAvailability') }} <i data-lucide="arrow-right"></i></button>
      </aside>
    </div>
  </section>

  <!-- ===================== GALLERY ===================== -->
  <section class="x-band" id="gallery">
    <div class="x-section x-wrap">
      <div class="x-section__head x-reveal">
        <div class="x-eyebrow">{{ t('resort.galleryEyebrow') }}</div>
        <h2 class="x-section__title x-h2">{{ t('resort.galleryTitle') }}</h2>
      </div>
      <div class="h-gallery x-reveal">
        <div
          v-for="(img, i) in resort.gallery"
          :key="i"
          class="h-gallery__cell"
          :class="{ 'h-gallery__cell--big': i === 0 }"
          :data-lb="img"
          :style="bg(img)"
        >
          <div v-if="i === resort.gallery.length - 1" class="h-gallery__more"><i data-lucide="images"></i> {{ t('resort.viewAllPhotos') }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================== ROOMS ===================== -->
  <section class="x-section x-wrap" id="rooms">
    <div class="x-section__head x-reveal">
      <div class="x-eyebrow">{{ t('resort.roomsEyebrow') }}</div>
      <h2 class="x-section__title x-h2">{{ t('resort.roomsTitle') }}</h2>
      <p class="x-section__lead x-lead">{{ t('resort.roomsLead') }}</p>
    </div>
    <div class="h-rooms">
      <article v-for="(room, i) in resort.rooms" :key="i" class="h-room x-reveal" :data-delay="i || undefined">
        <div class="h-room__media" :style="bg(room.img)">
          <span v-if="room.badge">{{ tBi(room.badge) }}</span>
        </div>
        <div class="h-room__body">
          <h3 class="h-room__name">{{ tBi(room.name) }}</h3>
          <div class="h-room__meta">
            <span><i data-lucide="maximize"></i> {{ room.size }}</span>
            <span><i data-lucide="users"></i> {{ room.guests }} {{ t('common.guests') }}</span>
          </div>
          <ul class="h-room__feats">
            <li v-for="(f, fi) in room.feats" :key="fi"><i data-lucide="check"></i> {{ tBi(f) }}</li>
          </ul>
          <div class="h-room__foot">
            <span class="h-room__price"><small>{{ t('common.from') }}</small><b>€{{ room.price }}<sub>/{{ t('common.night') }}</sub></b></span>
            <button class="x-btn x-btn--gold x-btn--sm" :data-book-open="resort.fullName">{{ t('common.book') }}</button>
          </div>
        </div>
      </article>
    </div>
  </section>

  <!-- ===================== DINING ===================== -->
  <section class="x-band" id="dining">
    <div class="x-section x-wrap">
      <div class="x-section__head x-reveal">
        <div class="x-eyebrow">{{ t('resort.diningEyebrow') }}</div>
        <h2 class="x-section__title x-h2">{{ t('resort.diningTitle') }}</h2>
        <p class="x-section__lead x-lead">{{ t('resort.diningLead') }}</p>
      </div>
      <div class="h-dining">
        <article v-for="(d, i) in resort.dining" :key="i" class="h-dine x-reveal" :data-delay="i || undefined">
          <div class="h-dine__media" :style="bg(d.img)"></div>
          <div class="h-dine__scrim"></div>
          <div class="h-dine__body">
            <span class="h-dine__tag">{{ tBi(d.tag) }}</span>
            <h3 class="h-dine__name">{{ tBi(d.name) }}</h3>
            <span class="h-dine__hours"><i data-lucide="clock"></i> {{ tBi(d.hours) }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- ===================== ACTIVITIES (dark) ===================== -->
  <section class="x-band--sea" id="activities">
    <div class="x-section x-wrap">
      <div class="h-acts">
        <div class="h-acts__media x-reveal" :style="bg(resort.gallery[1] ?? resort.hero)">
          <b data-count="365">365</b>
        </div>
        <div>
          <div class="x-eyebrow x-reveal" style="color:var(--xp-gold-soft)">{{ t('resort.activitiesEyebrow') }}</div>
          <h2 class="x-h2 x-reveal" data-delay="1" style="color:#fff;margin:16px 0 0">{{ t('resort.activitiesTitle') }}</h2>
          <p class="x-reveal" data-delay="2" style="color:rgba(237,231,220,.82);font-size:18px;line-height:1.65;margin:20px 0 0">{{ t('resort.activitiesLead') }}</p>
          <div class="h-actlist">
            <div v-for="(a, i) in resort.activities" :key="i" class="h-act x-reveal" :data-delay="i + 1">
              <i :data-lucide="a.icon"></i>
              <div>
                <b>{{ tBi(a.title) }}</b>
                <span>{{ tBi(a.sub) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================== FACILITIES ===================== -->
  <section class="x-section x-wrap" id="facilities">
    <div class="x-section__head x-reveal">
      <div class="x-eyebrow">{{ t('resort.facilitiesEyebrow') }}</div>
      <h2 class="x-section__title x-h2">{{ t('resort.facilitiesTitle') }}</h2>
    </div>
    <div class="h-facils">
      <div v-for="(f, i) in resort.facilities" :key="i" class="h-facil x-reveal" :data-delay="(i % 4) || undefined">
        <i :data-lucide="f.icon"></i><span>{{ tBi(f.label) }}</span>
      </div>
    </div>
  </section>

  <!-- ===================== LOCATION ===================== -->
  <section class="x-band" id="location">
    <div class="x-section x-wrap">
      <div class="x-section__head x-reveal">
        <div class="x-eyebrow">{{ t('resort.locationEyebrow') }}</div>
        <h2 class="x-section__title x-h2">{{ t('resort.locationTitle', { area: tBi(resort.area) }) }}</h2>
      </div>
      <div class="h-loc x-reveal">
        <div class="h-map">
          <div class="h-map__grid"></div>
          <div class="h-map__road h-map__r1"></div>
          <div class="h-map__road h-map__r2"></div>
          <div class="h-map__road h-map__r3"></div>
          <div class="h-map__sea"></div>
          <div class="h-map__pin"><i data-lucide="map-pin"></i><b>{{ resort.mapPinLabel }}</b></div>
        </div>
        <div class="h-loc__panel">
          <div class="x-eyebrow">{{ t('resort.findUs') }}</div>
          <h3 class="x-h3" style="margin:10px 0 0">{{ tBi(resort.area) }}</h3>
          <div class="h-locrows">
            <div class="h-locrow"><i data-lucide="map-pin"></i><div><b>{{ t('resort.address') }}</b><span>{{ resort.address }}</span></div></div>
            <div class="h-locrow"><i data-lucide="plane"></i><div><b>{{ t('resort.fromAirport') }}</b><span>{{ t('resort.fromAirportVal') }}</span></div></div>
            <div class="h-locrow"><i data-lucide="phone"></i><div><b>{{ t('resort.reservations') }}</b><span>{{ resort.phone }}</span></div></div>
          </div>
          <a class="x-btn x-btn--ghost" :href="`https://www.google.com/maps/search/${encodeURIComponent(resort.area.en + ' Sharm El Sheikh')}`" target="_blank" rel="noopener"><i data-lucide="navigation"></i> {{ t('common.getDirections') }}</a>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================== REVIEWS ===================== -->
  <section class="x-section x-wrap" id="reviews">
    <div class="x-section__head x-reveal">
      <div class="x-eyebrow">{{ t('resort.reviewsEyebrow') }}</div>
      <h2 class="x-section__title x-h2">{{ t('resort.reviewsTitle') }}</h2>
    </div>
    <div class="h-rev">
      <div class="h-rev__score x-reveal">
        <div class="h-rev__big">{{ resort.ratingScore }}</div>
        <div class="h-rev__stars"><i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i></div>
        <div class="h-rev__count">{{ tBi(resort.ratingCount) }}</div>
        <div class="h-rev__bars">
          <div v-for="(bar, i) in resort.ratingBars" :key="i" class="h-rev__bar"><small>{{ tBi(bar.label) }}</small><span class="h-rev__track"><span class="h-rev__fill" :style="`width:${bar.pct}%`"></span></span></div>
        </div>
      </div>
      <div class="h-rev__list">
        <article v-for="(rev, i) in resort.reviews" :key="i" class="h-revcard x-reveal" :data-delay="i || undefined">
          <div class="h-revcard__stars"><i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i></div>
          <p>{{ tBi(rev.text) }}</p>
          <div class="h-revcard__who"><span class="h-revcard__av">{{ rev.initial }}</span><div><b>{{ rev.name }}</b><span>{{ tBi(rev.who) }}</span></div></div>
        </article>
      </div>
    </div>
  </section>

  <!-- ===================== BOOKING WIDGET BAND ===================== -->
  <section class="h-bookband">
    <div class="x-section x-wrap" style="text-align:center">
      <div class="x-eyebrow is-center x-reveal" style="color:var(--xp-gold-soft)">{{ t('resort.bookbandEyebrow') }}</div>
      <h2 class="x-h2 x-reveal" data-delay="1" style="color:#fff;margin:16px 0 0">{{ t('resort.bookbandTitle') }}</h2>
      <div class="x-book x-reveal" data-delay="2" :data-hotel="resort.fullName" style="text-align:left;max-width:1100px;margin-left:auto;margin-right:auto">
        <div class="x-book__field">
          <label>{{ t('booking.hotel') }}</label>
          <div class="x-book__val" data-book-val="hotel"><i data-lucide="building-2"></i><span>{{ tBi(resort.name) }}</span></div>
        </div>
        <div class="x-book__field">
          <label>{{ t('booking.dates') }}</label>
          <div class="x-book__val" data-book-val="dates"><i data-lucide="calendar"></i><span>{{ t('booking.addDates') }}</span></div>
          <div class="x-pop">
            <div class="x-pop__dates">
              <div><label>{{ t('booking.checkin') }}</label><input type="date" data-date="ci" name="checkin" :aria-label="t('booking.checkin')" /></div>
              <div><label>{{ t('booking.checkout') }}</label><input type="date" data-date="co" name="checkout" :aria-label="t('booking.checkout')" /></div>
            </div>
          </div>
        </div>
        <div class="x-book__field">
          <label>{{ t('booking.roomsGuests') }}</label>
          <div class="x-book__val" data-book-val="guests"><i data-lucide="users"></i><span>1 · 2</span></div>
          <div class="x-pop">
            <div class="x-step" data-step="rooms">
              <span class="x-step__lbl">{{ t('booking.rooms') }}</span>
              <span class="x-step__ctrl"><button data-dir="down"><i data-lucide="minus"></i></button><span class="x-step__v">1</span><button data-dir="up"><i data-lucide="plus"></i></button></span>
            </div>
            <div class="x-step" data-step="guests">
              <span class="x-step__lbl">{{ t('booking.guests') }}</span>
              <span class="x-step__ctrl"><button data-dir="down"><i data-lucide="minus"></i></button><span class="x-step__v">2</span><button data-dir="up"><i data-lucide="plus"></i></button></span>
            </div>
          </div>
        </div>
        <button class="x-btn x-btn--gold x-book__go" data-book-go>
          <i data-lucide="search"></i>{{ t('common.checkAvailability') }}
        </button>
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

  <!-- lightbox -->
  <div class="h-lb" id="lightbox">
    <button class="h-lb__close" aria-label="Close"><i data-lucide="x"></i></button>
    <button class="h-lb__btn h-lb__btn--prev" aria-label="Previous"><i data-lucide="chevron-left"></i></button>
    <img class="h-lb__img" alt="Resort photo" />
    <button class="h-lb__btn h-lb__btn--next" aria-label="Next"><i data-lucide="chevron-right"></i></button>
    <div class="h-lb__count"></div>
  </div>
</template>
