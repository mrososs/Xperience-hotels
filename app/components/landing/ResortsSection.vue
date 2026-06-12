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
    <div class="xpk-section__head xpk-section__head--row">
      <div v-reveal>
        <div class="xp-eyebrow">{{ t('resortsSection.eyebrow') }}</div>
        <h2 class="xpk-section__title">{{ t('resortsSection.title') }}</h2>
        <p class="xpk-section__lead">{{ t('resortsSection.lead') }}</p>
      </div>
      <span class="xpk-section__meta" v-reveal="1">{{ t('nav.sixResorts') }}</span>
    </div>

    <div class="xpk-resort__grid">
      <ResortCard
        v-for="(resort, i) in RESORTS"
        :key="resort.name"
        v-reveal="i % 3"
        :resort="resort"
        :index="i"
        @book="$emit('book', $event)"
      />
    </div>
  </section>
</template>
