<script setup lang="ts">
import ResortCard from './ResortCard.vue'
import { useLocale } from '@/composables/useLocale'
import { RESORTS } from '@/data/content'
import type { Resort } from '@/data/types'

defineEmits<{ book: [resort: Resort] }>()

const { t } = useLocale()
</script>

<template>
  <section class="xpk-section" id="resorts">
    <div class="xpk-section__head">
      <div class="xp-eyebrow">{{ t('resortsSection.eyebrow') }}</div>
      <h2 class="xpk-section__title">{{ t('resortsSection.title') }}</h2>
      <p class="xpk-section__lead">{{ t('resortsSection.lead') }}</p>
    </div>

    <div class="xpk-resort__grid">
      <ResortCard
        v-for="resort in RESORTS"
        :key="resort.name"
        :resort="resort"
        @book="$emit('book', $event)"
      />
    </div>
  </section>
</template>
