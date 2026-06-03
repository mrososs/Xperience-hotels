<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'

const { t } = useLocale()
</script>

<template>
  <section class="xpk-about" id="about">
    <div class="xpk-about__inner">
      <div class="xp-eyebrow xpk-about__eyebrow" v-reveal>{{ t('about.eyebrow') }}</div>
      <h2 class="xpk-about__title" v-reveal="1">{{ t('about.title') }}</h2>
      <p class="xpk-about__text" v-reveal="2">{{ t('about.text') }}</p>
      <div class="xpk-about__stats" v-reveal="3">
        <div class="xpk-about__stat"><b>6</b><span>{{ t('about.statResorts') }}</span></div>
        <div class="xpk-about__stat"><b>2011</b><span>{{ t('about.statFounded') }}</span></div>
        <div class="xpk-about__stat"><b>30+</b><span>{{ t('about.statYears') }}</span></div>
      </div>
    </div>
  </section>
</template>
