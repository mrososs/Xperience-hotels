<script setup lang="ts">
import { type Component } from 'vue'
import { Crown, Shirt, Flower2, Anchor, Utensils, Clock } from '@lucide/vue'
import { useLocale } from '@/composables/useLocale'
import { BENEFITS } from '@/data/content'

const { locale, t } = useLocale()
const labelOf = (b: (typeof BENEFITS)[number]) =>
  locale.value === 'ar' && b.labelAr ? b.labelAr : b.label

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
  <section class="xpk-benefits">
    <div class="xpk-benefits__inner">
      <div class="xpk-benefits__head" v-reveal>
        <div class="xp-eyebrow">{{ t('benefits.eyebrow') }}</div>
        <h2 class="xpk-benefits__title">{{ t('benefits.title') }}</h2>
      </div>
      <ul class="xpk-benefits__strip" v-reveal="1">
        <li v-for="b in BENEFITS" :key="b.label" class="xpk-benefit">
          <component :is="ICONS[b.icon]" /> <span>{{ labelOf(b) }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
