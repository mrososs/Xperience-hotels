<script setup lang="ts">
import { MapPin, Building2, ChevronDown } from '@lucide/vue'
import { useLocale } from '@/composables/useLocale'
import { HERO_IMG } from '@/data/content'

const { t } = useLocale()

function scrollDown() {
  const bar = document.querySelector('.xpk-bookbar')
  if (bar) bar.scrollIntoView({ behavior: 'smooth', block: 'center' })
  else window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
}
</script>

<template>
  <section class="xpk-hero">
    <div class="xpk-hero__media" :style="{ backgroundImage: `url(${HERO_IMG})` }" />
    <div class="xpk-hero__scrim" />
    <div class="xpk-hero__content">
      <div class="xp-eyebrow xpk-hero__eyebrow">{{ t('hero.eyebrow') }}</div>
      <h1 class="xpk-hero__title">{{ t('hero.title1') }}<br />{{ t('hero.title2') }}</h1>
      <p class="xpk-hero__sub">{{ t('hero.sub') }}</p>
      <div class="xpk-hero__cues">
        <span><MapPin /> {{ t('hero.cueLocation') }}</span>
        <span class="xpk-dot">·</span>
        <span><Building2 /> {{ t('hero.cueGroup') }}</span>
      </div>
    </div>
    <button class="xpk-hero__scroll" type="button" aria-label="Scroll to booking" @click="scrollDown"><ChevronDown /></button>
  </section>
</template>
