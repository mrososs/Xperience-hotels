<script setup lang="ts">
// =====================================================================
// HeroSection — a full-bleed, draggable hero carousel built on
// Blossom Carousel. Each slide is one Red Sea resort with its imagery,
// name, blurb, rating and price, plus Explore / Book actions.
//
// The Blossom Vue component (v1.1) exposes { el, prev, next } — there is
// no `children` getter — so we read slides from the exposed root `el`,
// and we drive navigation (arrows, dots, autoplay) through a single
// rect-based `goTo()` that works in both LTR and RTL. Active-slide
// tracking is a scroll/rAF nearest-slide scan, which is robust whether
// or not the drag engine has initialised.
// =====================================================================
import { ref, shallowRef, computed, onMounted, onBeforeUnmount } from 'vue'
import { useLocalePath, useHead } from '#imports'
import { BlossomCarousel } from '@blossom-carousel/vue'
import '@blossom-carousel/core/style.css'
import { MapPin, Star, ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from '@lucide/vue'
import { useLocale } from '@/composables/useLocale'
import { useBgImage, HERO_BG } from '@/composables/useBgImage'
import { RESORTS } from '@/data/resorts'
import { RESORTS as CONTENT_RESORTS } from '@/data/content'
import type { Resort as ContentResort } from '@/data/types'
import type { HomeBlok } from '@/composables/useHomeContent'

// Optional Storyblok `hero` blok (slides). When absent, falls back to the
// rich RESORTS records (the pre-CMS behaviour). Slides are normalised to
// plain strings/numbers so the template is source-agnostic.
const props = defineProps<{ blok?: HomeBlok }>()
const emit = defineEmits<{ book: [resort: ContentResort] }>()
const { t, tBi, isRtl } = useLocale()
const localePath = useLocalePath()
const { bg, src } = useBgImage()

interface HeroSlide {
  name: string
  area: string
  blurb: string
  hero: string
  ratingScore: string | number
  priceFrom: string | number
  slug: string
}

const heroSlides = computed<HeroSlide[]>(() => {
  const fromBlok = props.blok?.slides as
    | { name: string; area: string; blurb: string; image: { filename?: string } | string; rating_score: string; price_from: string; slug: string }[]
    | undefined
  if (fromBlok?.length) {
    return fromBlok.map((s) => ({
      name: s.name,
      area: s.area,
      blurb: s.blurb,
      // `image` is a Storyblok asset object ({ filename }); tolerate a bare
      // string too (legacy/fallback).
      hero: typeof s.image === 'string' ? s.image : (s.image?.filename ?? ''),
      ratingScore: s.rating_score,
      priceFrom: s.price_from,
      slug: s.slug,
    }))
  }
  return RESORTS.map((r) => ({
    name: tBi(r.name),
    area: tBi(r.area),
    blurb: tBi(r.blurb),
    hero: r.hero,
    ratingScore: r.ratingScore,
    priceFrom: r.priceFrom,
    slug: r.slug,
  }))
})

// The first slide's background is the home page's LCP candidate. Preload
// the exact optimized URL the slide renders (same width → no double fetch)
// at high priority so it isn't discovered only after CSS + carousel JS.
const heroLcp = heroSlides.value[0]?.hero
useHead({
  link: heroLcp
    ? [{ rel: 'preload', as: 'image', href: src(heroLcp, HERO_BG), fetchpriority: 'high' }]
    : [],
})

// Bilingual control labels kept local so we don't have to thread extra
// keys through the i18n catalogs just for ARIA strings.
const L = {
  region: { en: 'Featured resorts', ar: 'منتجعات مميزة' },
  prev: { en: 'Previous resort', ar: 'المنتجع السابق' },
  next: { en: 'Next resort', ar: 'المنتجع التالي' },
  pause: { en: 'Pause auto-rotation', ar: 'إيقاف التبديل التلقائي' },
  play: { en: 'Resume auto-rotation', ar: 'استئناف التبديل التلقائي' },
}

const count = heroSlides.value.length
const active = shallowRef(0)
const playing = shallowRef(false)
// Only the first slide's background is on the critical path (it's the LCP +
// the only visible slide). The other five are offscreen in the carousel, so
// we hold their backgrounds until the browser is idle post-hydration —
// trimming ~900 KB off the initial load without blocking first paint.
const slidesReady = shallowRef(false)

const carousel = ref<InstanceType<typeof BlossomCarousel> | null>(null)
let slides: HTMLElement[] = []
let timer: ReturnType<typeof setInterval> | null = null
let rafId = 0
let reduceMotion = false

// The exposed `el` is a ref proxied through the component instance; in
// some Vue versions it surfaces as the raw element, in others as a ref.
function rootEl(): HTMLElement | null {
  const exposed = carousel.value as unknown as { el?: HTMLElement | { value: HTMLElement } } | null
  const el = exposed?.el as HTMLElement | { value: HTMLElement } | undefined
  if (!el) return null
  return 'nodeType' in el ? el : (el.value ?? null)
}

// Scroll the carousel so slide `i` aligns to the start edge. Using a
// rect delta (not scrollIntoView) keeps the page from jumping and works
// the same in RTL, where scroll offsets are mirrored.
function goTo(i: number): void {
  const root = rootEl()
  const slide = slides[i]
  if (!root || !slide) return
  const delta = slide.getBoundingClientRect().left - root.getBoundingClientRect().left
  root.scrollBy({ left: delta, behavior: 'smooth' })
}

function prev(): void {
  goTo((active.value - 1 + count) % count)
}
function next(): void {
  goTo((active.value + 1) % count)
}

// Active slide = the one whose centre sits closest to the carousel's
// centre. Cheap, framework-agnostic, and correct mid-drag.
function syncActive(): void {
  const root = rootEl()
  if (!root || !slides.length) return
  const mid = root.getBoundingClientRect().left + root.clientWidth / 2
  let best = 0
  let bestDist = Infinity
  slides.forEach((s, i) => {
    const r = s.getBoundingClientRect()
    const dist = Math.abs(r.left + r.width / 2 - mid)
    if (dist < bestDist) {
      bestDist = dist
      best = i
    }
  })
  if (best !== active.value) active.value = best
}

function onScroll(): void {
  if (rafId) return
  rafId = requestAnimationFrame(() => {
    rafId = 0
    syncActive()
  })
}

function startAuto(): void {
  if (reduceMotion || timer) return
  playing.value = true
  timer = setInterval(() => goTo((active.value + 1) % count), 6000)
}
function stopAuto(): void {
  if (timer) clearInterval(timer)
  timer = null
  playing.value = false
}
function toggleAuto(): void {
  if (timer) stopAuto()
  else startAuto()
}

function bookResort(slug: string): void {
  const resort = CONTENT_RESORTS.find((r) => r.slug === slug)
  if (resort) emit('book', resort)
}

let root: HTMLElement | null = null

onMounted(() => {
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  root = rootEl()
  if (root) {
    slides = Array.from(root.children) as HTMLElement[]
    root.addEventListener('scroll', onScroll, { passive: true })
  }
  window.addEventListener('resize', syncActive)
  syncActive()
  // Auto-rotate only when motion is welcome; pause whenever the user is
  // hovering/focused inside the hero (wired in the template).
  startAuto()
  // Load the remaining slide backgrounds once idle (well before the 6s
  // auto-rotate or any drag could reveal them).
  const ric = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback
  if (ric) ric(() => (slidesReady.value = true))
  else window.setTimeout(() => (slidesReady.value = true), 200)
})

onBeforeUnmount(() => {
  stopAuto()
  if (rafId) cancelAnimationFrame(rafId)
  root?.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', syncActive)
})
</script>

<template>
  <section
    v-editable="blok"
    class="xpk-herocar"
    :aria-label="tBi(L.region)"
    aria-roledescription="carousel"
    @mouseenter="stopAuto"
    @mouseleave="startAuto"
    @focusin="stopAuto"
  >
    <BlossomCarousel ref="carousel" class="xpk-herocar__track" load="always">
      <article
        v-for="(r, i) in heroSlides"
        :key="r.slug"
        class="xpk-herocar__slide"
        :class="{ 'is-active': active === i }"
        role="group"
        aria-roledescription="slide"
        :aria-label="`${i + 1} / ${count} — ${r.name}`"
      >
        <div
          class="xpk-herocar__media"
          :style="i === 0 || slidesReady ? bg(r.hero, HERO_BG) : undefined"
        />
        <div class="xpk-herocar__scrim" />

        <div class="xpk-herocar__inner">
          <div class="xp-eyebrow xpk-herocar__area"><MapPin /> {{ r.area }}</div>
          <h1 class="xpk-herocar__title">
            <span class="xpk-herocar__brand">Xperience</span>
            {{ r.name }}
          </h1>
          <p class="xpk-herocar__blurb">{{ r.blurb }}</p>

          <div class="xpk-herocar__meta">
            <span class="xpk-herocar__rating"><Star /> {{ r.ratingScore }}</span>
            <span class="xpk-herocar__dotsep" aria-hidden="true">·</span>
            <span class="xpk-herocar__price">
              {{ t('common.from') }} <b>${{ r.priceFrom }}</b> {{ t('common.perNight') }}
            </span>
          </div>

          <div class="xpk-herocar__actions">
            <NuxtLink class="xp-btn xp-btn--primary" :to="localePath(`/resorts/${r.slug}`)">
              {{ t('common.explore') }} <ArrowRight />
            </NuxtLink>
            <button class="xp-btn xpk-herocar__book" type="button" @click="bookResort(r.slug)">
              {{ t('common.book') }}
            </button>
          </div>
        </div>
      </article>
    </BlossomCarousel>

    <!-- Overlay controls: counter + dots on the lead edge, arrows + play
         toggle on the trailing edge. Logical properties flip in RTL. -->
    <div class="xpk-herocar__controls">
      <div class="xpk-herocar__progress">
        <span class="xpk-herocar__count">
          <b>{{ String(active + 1).padStart(2, '0') }}</b> / {{ String(count).padStart(2, '0') }}
        </span>
        <div class="xpk-herocar__dots">
          <button
            v-for="(r, i) in heroSlides"
            :key="r.slug"
            class="xpk-herocar__dot"
            :class="{ 'is-on': active === i }"
            type="button"
            :aria-label="r.name"
            :aria-current="active === i ? 'true' : undefined"
            @click="goTo(i)"
          />
        </div>
      </div>

      <div class="xpk-herocar__arrows">
        <button
          class="xpk-herocar__play"
          type="button"
          :aria-label="playing ? tBi(L.pause) : tBi(L.play)"
          @click="toggleAuto"
        >
          <Pause v-if="playing" />
          <Play v-else />
        </button>
        <button class="xpk-herocar__arrow" type="button" :aria-label="tBi(L.prev)" @click="prev">
          <ChevronRight v-if="isRtl" />
          <ChevronLeft v-else />
        </button>
        <button class="xpk-herocar__arrow" type="button" :aria-label="tBi(L.next)" @click="next">
          <ChevronLeft v-if="isRtl" />
          <ChevronRight v-else />
        </button>
      </div>
    </div>
  </section>
</template>
