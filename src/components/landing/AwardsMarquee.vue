<script setup lang="ts">
import { type Component } from 'vue'
import { RouterLink } from 'vue-router'
import { Leaf, Award, Star, Utensils, ShieldCheck, Building2, ArrowRight } from '@lucide/vue'
import { useLocale } from '@/composables/useLocale'
import { AWARD_MARQUEE, AWARDS_URL } from '@/data/content'

const { t, tBi } = useLocale()

const ICONS: Record<string, Component> = {
  leaf: Leaf,
  award: Award,
  star: Star,
  utensils: Utensils,
  'shield-check': ShieldCheck,
  'building-2': Building2,
}

// Duplicate the run so the -50% scroll loops seamlessly.
const track = [...AWARD_MARQUEE, ...AWARD_MARQUEE]
</script>

<template>
  <section class="xpk-awards" id="awards">
    <div class="xpk-awards__head">
      <div class="xp-eyebrow">{{ t('awardsMarquee.eyebrow') }}</div>
      <h2 class="xpk-awards__title">{{ t('awardsMarquee.title') }}</h2>
      <RouterLink class="xpk-awards__link" :to="AWARDS_URL">
        {{ t('awardsMarquee.seeAll') }} <ArrowRight />
      </RouterLink>
    </div>
  </section>

  <RouterLink class="xpk-marquee" :to="AWARDS_URL" aria-label="Awards">
    <div class="xpk-marquee__track">
      <span v-for="(item, i) in track" :key="i" class="xpk-marquee__item">
        <component :is="ICONS[item.icon]" /> {{ tBi(item) }}
      </span>
    </div>
  </RouterLink>
</template>
