<script setup lang="ts">
// =====================================================================
// /resorts/:slug — dynamic resort detail page.
// Resolves the slug to its dedicated per-resort component (each of which
// feeds the shared ResortDetail template). The :key forces a clean
// remount when navigating between resorts so the page-level behaviour
// re-initialises for the new property.
//
// SEO: validate() 404s unknown slugs (a real 404, not a soft redirect);
// title/description/OG come from the resort record in the active locale;
// JSON-LD Hotel schema is emitted for rich results.
// =====================================================================
import { computed, defineAsyncComponent, type Component } from 'vue'
import { RESORT_SLUGS } from '@/data/resorts'
import { useResortContent } from '@/composables/useResortContent'
import { useBgImage, HERO_BG } from '@/composables/useBgImage'

definePageMeta({
  validate: (route) => RESORT_SLUGS.has(String(route.params.slug ?? '')),
})

const route = useRoute()
const { locale } = useI18n()

const registry: Record<string, Component> = {
  'sea-breeze': defineAsyncComponent(() => import('@/components/resorts/SeaBreezeResort.vue')),
  'kiroseiz-parkland': defineAsyncComponent(() => import('@/components/resorts/KiroseizParkland.vue')),
  'kiroseiz-premier': defineAsyncComponent(() => import('@/components/resorts/KiroseizPremier.vue')),
  'st-george-homestay': defineAsyncComponent(() => import('@/components/resorts/StGeorgeHomestay.vue')),
  'hill-top-beach': defineAsyncComponent(() => import('@/components/resorts/HillTopBeach.vue')),
  'golden-sandy-beach': defineAsyncComponent(() => import('@/components/resorts/GoldenSandyBeach.vue')),
}

const slug = computed(() => String(route.params.slug ?? ''))
const resortComponent = computed<Component | null>(() => registry[slug.value] ?? null)

const { data: resort } = await useResortContent(slug)

const title = computed(() =>
  locale.value === 'ar'
    ? `${resort.value?.name.ar ?? ''} — فنادق إكسبيريانس`
    : `${resort.value?.fullName ?? ''} — Xperience Hotels`,
)
const description = computed(() =>
  locale.value === 'ar' ? (resort.value?.blurb.ar ?? '') : (resort.value?.blurb.en ?? ''),
)

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: () => resort.value?.hero,
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

// Preload the resort hero (the LCP element) at high priority — the same
// optimized URL ResortDetail's .h-hero__media background requests.
const { src } = useBgImage()

// JSON-LD Hotel schema for rich results — hand-rolled (no schema-org
// module) so it stays dependency-free and fully under our control.
useHead(() => ({
  link: resort.value
    ? [{ rel: 'preload', as: 'image', href: src(resort.value.hero, HERO_BG), fetchpriority: 'high' }]
    : [],
  script: resort.value
    ? [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Hotel',
            name: resort.value.fullName,
            description: resort.value.blurb.en,
            image: resort.value.hero,
            address: {
              '@type': 'PostalAddress',
              streetAddress: resort.value.address,
              addressLocality: 'Sharm El Sheikh',
              addressCountry: 'EG',
            },
            telephone: resort.value.phone,
            priceRange: `$${resort.value.priceFrom}+`,
            starRating: { '@type': 'Rating', ratingValue: '5' },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: resort.value.ratingScore,
              bestRating: '10',
              reviewCount: 1240,
            },
          }),
        },
      ]
    : [],
}))
</script>

<template>
  <component :is="resortComponent" v-if="resortComponent" :key="slug" />
</template>
