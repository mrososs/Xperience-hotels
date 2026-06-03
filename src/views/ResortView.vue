<script setup lang="ts">
// =====================================================================
// ResortView — dynamic route target for /resorts/:slug.
// Resolves the slug to its dedicated per-resort component (each of which
// feeds the shared ResortDetail template). The :key forces a clean
// remount when navigating between resorts so the page-level behaviour
// re-initialises for the new property.
// =====================================================================
import { computed, defineAsyncComponent, type Component } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

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
</script>

<template>
  <component :is="resortComponent" v-if="resortComponent" :key="slug" />
</template>
