<script setup lang="ts">
import { Heart } from '@lucide/vue'
import { useLocale } from '@/composables/useLocale'
import { HONEYMOON, HONEYMOON_IMG } from '@/data/content'

defineEmits<{ book: [] }>()

const { t, tBi } = useLocale()
</script>

<template>
  <section class="xpk-honey">
    <div class="xpk-honey__media" :style="{ backgroundImage: `url(${HONEYMOON_IMG})` }" />
    <div class="xpk-honey__panel">
      <div class="xp-eyebrow">{{ t('honeymoon.eyebrow') }}</div>
      <h2 class="xpk-honey__title">{{ t('honeymoon.title') }}</h2>
      <ul class="xpk-honey__list">
        <li v-for="(perk, i) in HONEYMOON" :key="i"><Heart /> {{ tBi(perk) }}</li>
      </ul>
      <button class="xp-btn xp-btn--primary" @click="$emit('book')">{{ t('honeymoon.cta') }}</button>
      <p class="xpk-honey__note">{{ t('honeymoon.note') }}</p>
    </div>
  </section>
</template>
