<script setup lang="ts">
import { computed, type Component } from 'vue'
import { Crown, Shirt, Flower2, Anchor, Utensils, Clock } from '@lucide/vue'
import { useLocale } from '@/composables/useLocale'
import { BENEFITS } from '@/data/content'
import type { HomeBlok } from '@/composables/useHomeContent'

// Optional Storyblok `benefits_section` blok; falls back to app/data.
const props = defineProps<{ blok?: HomeBlok }>()
const { locale, t } = useLocale()

const eyebrow = computed(() => (props.blok?.eyebrow as string) || t('benefits.eyebrow'))
const title = computed(() => (props.blok?.title as string) || t('benefits.title'))

const items = computed(() => {
  const fromBlok = props.blok?.items as { icon: string; label: string }[] | undefined
  if (fromBlok?.length) return fromBlok.map((i) => ({ icon: i.icon, label: i.label }))
  return BENEFITS.map((b) => ({
    icon: b.icon,
    label: locale.value === 'ar' && b.labelAr ? b.labelAr : b.label,
  }))
})

const ICONS: Record<string, Component> = {
  crown: Crown,
  shirt: Shirt,
  'flower-2': Flower2,
  anchor: Anchor,
  utensils: Utensils,
  clock: Clock,
}
</script>

<template>
  <section v-editable="blok" class="xpk-benefits">
    <div class="xpk-benefits__inner">
      <div class="xpk-benefits__head" v-reveal>
        <div class="xp-eyebrow">{{ eyebrow }}</div>
        <h2 class="xpk-benefits__title">{{ title }}</h2>
      </div>
      <ul class="xpk-benefits__strip" v-reveal="1">
        <li v-for="(b, i) in items" :key="i" class="xpk-benefit">
          <component :is="ICONS[b.icon]" /> <span>{{ b.label }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
