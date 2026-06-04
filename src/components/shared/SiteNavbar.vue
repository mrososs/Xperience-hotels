<script setup lang="ts">
// =====================================================================
// SiteNavbar — shared, app-wide top navigation.
// Floating glass pill that docks to a solid bar on scroll, with a resort
// mega menu, a mobile sheet and the EN/AR language switch. Fully
// self-contained; emits `book` so the host page decides what Book Now does.
// Strings come from vue-i18n (t); resort names/areas from data (tBi).
// =====================================================================
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useLocale } from '@/composables/useLocale'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { useScrollState } from '@/composables/useScrollState'
import { useEventListener } from '@/composables/useEventListener'
import { ensureIcons, drawIcons } from '@/composables/useLucideIcons'
import { RESORT_LINKS } from '@/data/resorts'
import logoWhite from '@/assets/logo-xperience-white.png'
import logoCharcoal from '@/assets/logo-xperience-charcoal.png'

const emit = defineEmits<{ book: [] }>()

const { locale, setLocale, t, tBi } = useLocale()
const { scrolled } = useScrollState(40)

// Active nav state. Hash anchors share the "/" route (Vue Router ignores the
// hash when matching), so we resolve active links explicitly rather than via
// the auto router-link-active class — otherwise Home, Offers and About would
// all light up together on the landing page.
// On the landing page a scrollspy drives the section links, so they follow
// the actual scroll position instead of the route hash (which goes stale as
// soon as the user scrolls away from an anchor jump).
const route = useRoute()
const { current: spySection } = useScrollSpy(
  ['resorts', 'offers', 'footer'],
  () => route.path === '/',
)
const homeActive = computed(() => route.path === '/' && !spySection.value)
const resortsActive = computed(() => route.path.startsWith('/resorts') || spySection.value === 'resorts')
const offersActive = computed(() => spySection.value === 'offers')
const contactActive = computed(() => spySection.value === 'footer')
const awardsActive = computed(() => route.path === '/awards')
const aboutActive = computed(() => route.path === '/about')

const megaOpen = ref(false)
const sheetOpen = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const megaRef = ref<HTMLElement | null>(null)

let megaTimer: ReturnType<typeof setTimeout> | undefined
const megaEnter = () => {
  clearTimeout(megaTimer)
  megaOpen.value = true
}
const megaLeave = () => {
  clearTimeout(megaTimer)
  megaTimer = setTimeout(() => (megaOpen.value = false), 180)
}
const megaToggle = () => (megaOpen.value = !megaOpen.value)

// close the mega menu on an outside click
useEventListener(document, 'click', ((e: MouseEvent) => {
  if (!megaOpen.value) return
  const target = e.target as Node
  if (!triggerRef.value?.contains(target) && !megaRef.value?.contains(target)) megaOpen.value = false
}) as EventListener)

const onBook = () => {
  sheetOpen.value = false
  emit('book')
}
const closeSheet = () => (sheetOpen.value = false)

const bg = (url: string) => `background-image:url('${url}')`

onMounted(ensureIcons)
// Lucide swaps `<i data-lucide>` for <svg>; a locale re-render can restore
// the placeholder, so redraw after the DOM settles.
watch(locale, () => nextTick(drawIcons))
</script>

<template>
  <header class="x-nav" :class="{ 'is-stuck': scrolled }">
    <div class="x-nav__bar">
      <RouterLink class="x-nav__brand" to="/">
        <img class="x-logo-w" :src="logoWhite" alt="Xperience Hospitality Management" />
        <img class="x-logo-d" :src="logoCharcoal" alt="Xperience Hospitality Management" />
      </RouterLink>
      <nav class="x-nav__links">
        <RouterLink class="x-navlink" :class="{ 'is-active': homeActive }" to="/">{{ t('nav.home') }}</RouterLink>
        <button
          ref="triggerRef"
          class="x-navlink has-mega"
          :class="{ 'is-active': resortsActive }"
          :aria-expanded="megaOpen"
          @click="megaToggle"
          @mouseenter="megaEnter"
          @mouseleave="megaLeave"
        >
          {{ t('nav.resorts') }}
          <i data-lucide="chevron-down"></i>
        </button>
        <RouterLink class="x-navlink" :class="{ 'is-active': offersActive }" :to="{ path: '/', hash: '#offers' }">{{ t('nav.offers') }}</RouterLink>
        <RouterLink class="x-navlink" :class="{ 'is-active': awardsActive }" to="/awards">{{ t('nav.awards') }}</RouterLink>
        <RouterLink class="x-navlink" :class="{ 'is-active': aboutActive }" to="/about">{{ t('nav.about') }}</RouterLink>
        <a class="x-navlink" :class="{ 'is-active': contactActive }" href="#footer">{{ t('nav.contact') }}</a>
      </nav>
      <div class="x-nav__right">
        <div class="x-lang">
          <button :class="{ 'is-on': locale === 'en' }" @click="setLocale('en')">EN</button>
          <button :class="{ 'is-on': locale === 'ar' }" @click="setLocale('ar')">ع</button>
        </div>
        <button class="x-btn x-btn--gold x-btn--sm" @click="onBook">{{ t('common.bookNow') }}</button>
        <button class="x-burger" aria-label="Menu" @click="sheetOpen = !sheetOpen"><i data-lucide="menu"></i></button>
      </div>
    </div>
  </header>

  <!-- mega menu -->
  <div ref="megaRef" class="x-mega" :class="{ 'is-open': megaOpen }" @mouseenter="megaEnter" @mouseleave="megaLeave">
    <div class="x-mega__grid">
      <RouterLink
        v-for="r in RESORT_LINKS"
        :key="r.slug"
        class="x-mega__card"
        :to="`/resorts/${r.slug}`"
        @click="megaOpen = false"
      >
        <span class="x-mega__thumb" :style="bg(r.img)"></span>
        <span class="x-mega__meta">
          <b>{{ tBi(r.name) }}</b>
          <span><i data-lucide="map-pin"></i> {{ tBi(r.area) }}</span>
        </span>
      </RouterLink>
    </div>
    <div class="x-mega__foot">
      <span>{{ t('nav.sixResorts') }}</span>
      <RouterLink class="x-link" :to="{ path: '/', hash: '#resorts' }" @click="megaOpen = false">{{ t('common.viewAll') }} <i data-lucide="arrow-right"></i></RouterLink>
    </div>
  </div>

  <!-- mobile sheet -->
  <nav class="x-sheet" :class="{ 'is-open': sheetOpen }">
    <button class="x-sheet__close" aria-label="Close menu" @click="closeSheet"><i data-lucide="x"></i></button>
    <RouterLink to="/" @click="closeSheet">{{ t('nav.home') }}</RouterLink>
    <RouterLink :to="{ path: '/', hash: '#resorts' }" @click="closeSheet">{{ t('nav.resorts') }}</RouterLink>
    <RouterLink :to="{ path: '/', hash: '#offers' }" @click="closeSheet">{{ t('nav.offers') }}</RouterLink>
    <RouterLink to="/awards" @click="closeSheet">{{ t('nav.awards') }}</RouterLink>
    <RouterLink to="/about" @click="closeSheet">{{ t('nav.about') }}</RouterLink>
    <a href="#footer" @click="closeSheet">{{ t('nav.contact') }}</a>
    <button class="x-btn x-btn--gold x-sheet__cta" @click="onBook">{{ t('common.bookNow') }}</button>
  </nav>
</template>
