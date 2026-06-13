<script setup lang="ts">
import { Heart } from '@lucide/vue'
import { useLocale } from '@/composables/useLocale'
import { useBgImage } from '@/composables/useBgImage'
import { HONEYMOON, HONEYMOON_IMG } from '@/data/content'

defineEmits<{ book: [] }>()

const { t, tBi } = useLocale()
const { bg } = useBgImage()
</script>

<template>
  <section class="xpk-honey">
    <div class="xpk-honey__media" v-reveal :style="bg(HONEYMOON_IMG, { width: 1100 })" />
    <div class="xpk-honey__panel">
      <div class="xp-eyebrow" v-reveal>{{ t('honeymoon.eyebrow') }}</div>
      <h2 class="xpk-honey__title" v-reveal="1">{{ t('honeymoon.title') }}</h2>
      <ul class="xpk-honey__list" v-reveal="2">
        <li v-for="(perk, i) in HONEYMOON" :key="i"><Heart /> {{ tBi(perk) }}</li>
      </ul>
      <button class="xp-btn xp-btn--primary" v-reveal="3" @click="$emit('book')">{{ t('honeymoon.cta') }}</button>
      <p class="xpk-honey__note" v-reveal="3">{{ t('honeymoon.note') }}</p>
    </div>
  </section>
</template>
