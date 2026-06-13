<script setup lang="ts">
import { computed, type Component } from 'vue'
import { useLocalePath } from '#imports'
import { Leaf, Award, Star, Utensils, ShieldCheck, Building2, ArrowRight } from '@lucide/vue'
import { useLocale } from '@/composables/useLocale'
import { AWARD_MARQUEE, AWARDS_URL } from '@/data/content'
import type { HomeBlok } from '@/composables/useHomeContent'

// Optional Storyblok `awards_marquee` blok; falls back to app/data + i18n.
const props = defineProps<{ blok?: HomeBlok }>()
const { t, tBi } = useLocale()
const localePath = useLocalePath()

const eyebrow = computed(() => (props.blok?.eyebrow as string) || t('awardsMarquee.eyebrow'))
const title = computed(() => (props.blok?.title as string) || t('awardsMarquee.title'))
const seeAll = computed(() => (props.blok?.see_all_label as string) || t('awardsMarquee.seeAll'))

const items = computed(() => {
  const fromBlok = props.blok?.items as { icon: string; label: string }[] | undefined
  if (fromBlok?.length) return fromBlok.map((i) => ({ icon: i.icon, text: i.label }))
  return AWARD_MARQUEE.map((a) => ({ icon: a.icon, text: tBi(a) }))
})

const ICONS: Record<string, Component> = {
  leaf: Leaf,
  award: Award,
  star: Star,
  utensils: Utensils,
  'shield-check': ShieldCheck,
  'building-2': Building2,
}

// Duplicate the run so the -50% scroll loops seamlessly.
const track = computed(() => [...items.value, ...items.value])
</script>

<template>
  <section v-editable="blok" class="xpk-awards" id="awards">
    <div class="xpk-awards__head" v-reveal>
      <div class="xp-eyebrow">{{ eyebrow }}</div>
      <h2 class="xpk-awards__title">{{ title }}</h2>
      <NuxtLink class="xpk-awards__link" :to="localePath(AWARDS_URL)">
        {{ seeAll }} <ArrowRight />
      </NuxtLink>
    </div>
  </section>

  <NuxtLink class="xpk-marquee" :to="localePath(AWARDS_URL)" aria-label="Awards" v-reveal="1">
    <div class="xpk-marquee__track">
      <span v-for="(item, i) in track" :key="i" class="xpk-marquee__item">
        <component :is="ICONS[item.icon]" /> {{ item.text }}
      </span>
    </div>
  </NuxtLink>
</template>
