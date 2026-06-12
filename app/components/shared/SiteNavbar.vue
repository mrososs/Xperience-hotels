<script setup lang="ts">
// =====================================================================
// SiteNavbar — shared, app-wide top navigation.
// Floating glass pill that docks to a solid bar on scroll, with a resort
// mega menu, a mobile sheet and the EN/AR language switch. Fully
// self-contained; emits `book` so the host page decides what Book Now does.
// Strings come from vue-i18n (t); resort names/areas from data (tBi).
// All internal links go through localePath() so they stay inside the
// active locale prefix (/ vs /ar).
// =====================================================================
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute, useLocalePath } from '#imports'
import { useLocale } from '@/composables/useLocale'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { useScrollState } from '@/composables/useScrollState'
import { useEventListener } from '@/composables/useEventListener'
import { ensureIcons, drawIcons } from '@/composables/useLucideIcons'
import { RESORT_LINKS } from '@/data/resorts'
import { type Locale } from '@/composables/useLocale'
import LangFlag from '@/components/ui/LangFlag.vue'
import logoWhite from '@/assets/logo-xperience-white.png'
import logoCharcoal from '@/assets/logo-xperience-charcoal.png'

const emit = defineEmits<{ book: [] }>()

const { locale, setLocale, t, tBi, locales } = useLocale()
const { scrolled } = useScrollState(40)
const localePath = useLocalePath()

// Language switcher (flag dropdown). Native names come from the i18n
// config; the trigger shows the active flag + uppercase code.
const langOpen = ref(false)
const langRef = ref<HTMLElement | null>(null)
const localeOptions = computed(() =>
  (locales.value as Array<{ code: string; name?: string }>).map((l) => ({
    code: l.code,
    name: l.name ?? l.code.toUpperCase(),
  })),
)
const currentCode = computed(() => locale.value.toUpperCase())
const chooseLocale = (code: string) => {
  langOpen.value = false
  sheetOpen.value = false
  setLocale(code as Locale)
}

// Active nav state. Hash anchors share the "/" route (the router ignores the
// hash when matching), so we resolve active links explicitly rather than via
// the auto router-link-active class — otherwise Home, Offers and About would
// all light up together on the landing page.
// i18n route names carry a ___<locale> suffix (index___en / index___ar), so
// matching happens on the base name, which is locale-independent.
// On the landing page a scrollspy drives the section links, so they follow
// the actual scroll position instead of the route hash (which goes stale as
// soon as the user scrolls away from an anchor jump).
const route = useRoute()
const baseRoute = computed(() => String(route.name ?? '').split('___')[0])
const { current: spySection } = useScrollSpy(
  ['resorts', 'offers'],
  () => baseRoute.value === 'index',
)
const homeActive = computed(() => baseRoute.value === 'index' && !spySection.value)
const resortsActive = computed(() => baseRoute.value === 'resorts-slug' || spySection.value === 'resorts')
const offersActive = computed(() => spySection.value === 'offers')
const contactActive = computed(() => baseRoute.value === 'contact')
const awardsActive = computed(() => baseRoute.value === 'awards')
const meetingsActive = computed(() => baseRoute.value === 'meetings-events')
const aboutActive = computed(() => baseRoute.value === 'about')

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
useEventListener(() => document, 'click', ((e: MouseEvent) => {
  if (!megaOpen.value) return
  const target = e.target as Node
  if (!triggerRef.value?.contains(target) && !megaRef.value?.contains(target)) megaOpen.value = false
}) as EventListener)

// close the language dropdown on an outside click / Escape
useEventListener(() => document, 'click', ((e: MouseEvent) => {
  if (langOpen.value && !langRef.value?.contains(e.target as Node)) langOpen.value = false
}) as EventListener)
useEventListener(() => document, 'keydown', ((e: KeyboardEvent) => {
  if (e.key === 'Escape') langOpen.value = false
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
      <NuxtLink class="x-nav__brand" :to="localePath('/')">
        <img class="x-logo-w" :src="logoWhite" alt="Xperience Hospitality Management" />
        <img class="x-logo-d" :src="logoCharcoal" alt="Xperience Hospitality Management" />
      </NuxtLink>
      <nav class="x-nav__links">
        <NuxtLink class="x-navlink" :class="{ 'is-active': homeActive }" :to="localePath('/')">{{ t('nav.home') }}</NuxtLink>
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
        <NuxtLink class="x-navlink" :class="{ 'is-active': offersActive }" :to="localePath({ path: '/', hash: '#offers' })">{{ t('nav.offers') }}</NuxtLink>
        <NuxtLink class="x-navlink" :class="{ 'is-active': awardsActive }" :to="localePath('/awards')">{{ t('nav.awards') }}</NuxtLink>
        <NuxtLink class="x-navlink" :class="{ 'is-active': meetingsActive }" :to="localePath('/meetings-events')">{{ t('nav.meetings') }}</NuxtLink>
        <NuxtLink class="x-navlink" :class="{ 'is-active': aboutActive }" :to="localePath('/about')">{{ t('nav.about') }}</NuxtLink>
        <NuxtLink class="x-navlink" :class="{ 'is-active': contactActive }" :to="localePath('/contact')">{{ t('nav.contact') }}</NuxtLink>
      </nav>
      <div class="x-nav__right">
        <div ref="langRef" class="x-langsel">
          <button
            class="x-langsel__btn"
            type="button"
            :aria-expanded="langOpen"
            aria-haspopup="listbox"
            @click="langOpen = !langOpen"
          >
            <LangFlag :code="locale" />
            <span class="x-langsel__code">{{ currentCode }}</span>
            <i data-lucide="chevron-down" class="x-langsel__chev"></i>
          </button>
          <ul class="x-langsel__menu" :class="{ 'is-open': langOpen }" role="listbox">
            <li v-for="l in localeOptions" :key="l.code">
              <button
                class="x-langsel__opt"
                type="button"
                role="option"
                :aria-selected="l.code === locale"
                :class="{ 'is-on': l.code === locale }"
                @click="chooseLocale(l.code)"
              >
                <LangFlag :code="l.code" />
                <span>{{ l.name }}</span>
                <i v-if="l.code === locale" data-lucide="check" class="x-langsel__tick"></i>
              </button>
            </li>
          </ul>
        </div>
        <button class="x-btn x-btn--gold x-btn--sm" @click="onBook">{{ t('common.bookNow') }}</button>
        <button class="x-burger" aria-label="Menu" @click="sheetOpen = !sheetOpen"><i data-lucide="menu"></i></button>
      </div>
    </div>
  </header>

  <!-- mega menu -->
  <div ref="megaRef" class="x-mega" :class="{ 'is-open': megaOpen }" @mouseenter="megaEnter" @mouseleave="megaLeave">
    <div class="x-mega__grid">
      <NuxtLink
        v-for="r in RESORT_LINKS"
        :key="r.slug"
        class="x-mega__card"
        :to="localePath(`/resorts/${r.slug}`)"
        @click="megaOpen = false"
      >
        <span class="x-mega__thumb" :style="bg(r.img)"></span>
        <span class="x-mega__meta">
          <b>{{ tBi(r.name) }}</b>
          <span><i data-lucide="map-pin"></i> {{ tBi(r.area) }}</span>
        </span>
      </NuxtLink>
    </div>
    <div class="x-mega__foot">
      <span>{{ t('nav.sixResorts') }}</span>
      <NuxtLink class="x-link" :to="localePath({ path: '/', hash: '#resorts' })" @click="megaOpen = false">{{ t('common.viewAll') }} <i data-lucide="arrow-right"></i></NuxtLink>
    </div>
  </div>

  <!-- mobile sheet -->
  <nav class="x-sheet" :class="{ 'is-open': sheetOpen }">
    <button class="x-sheet__close" aria-label="Close menu" @click="closeSheet"><i data-lucide="x"></i></button>
    <NuxtLink :to="localePath('/')" @click="closeSheet">{{ t('nav.home') }}</NuxtLink>
    <NuxtLink :to="localePath({ path: '/', hash: '#resorts' })" @click="closeSheet">{{ t('nav.resorts') }}</NuxtLink>
    <NuxtLink :to="localePath({ path: '/', hash: '#offers' })" @click="closeSheet">{{ t('nav.offers') }}</NuxtLink>
    <NuxtLink :to="localePath('/awards')" @click="closeSheet">{{ t('nav.awards') }}</NuxtLink>
    <NuxtLink :to="localePath('/meetings-events')" @click="closeSheet">{{ t('nav.meetings') }}</NuxtLink>
    <NuxtLink :to="localePath('/about')" @click="closeSheet">{{ t('nav.about') }}</NuxtLink>
    <NuxtLink :to="localePath('/contact')" @click="closeSheet">{{ t('nav.contact') }}</NuxtLink>
    <button class="x-btn x-btn--gold x-sheet__cta" @click="onBook">{{ t('common.bookNow') }}</button>
  </nav>
</template>
