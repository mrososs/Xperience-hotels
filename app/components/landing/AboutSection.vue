<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
import type { HomeBlok } from '@/composables/useHomeContent'

// Optional Storyblok `about_section` blok. When absent, falls back to the
// i18n catalog + the hardcoded stats (the pre-CMS behaviour).
const props = defineProps<{ blok?: HomeBlok }>()
const { t } = useLocale()

const eyebrow = computed(() => (props.blok?.eyebrow as string) || t('about.eyebrow'))
const title = computed(() => (props.blok?.title as string) || t('about.title'))
const text = computed(() => (props.blok?.text as string) || t('about.text'))
const stats = computed(() => {
  const fromBlok = props.blok?.stats as { value: string; label: string }[] | undefined
  if (fromBlok?.length) return fromBlok.map((s) => ({ value: s.value, label: s.label }))
  return [
    { value: '6', label: t('about.statResorts') },
    { value: '2011', label: t('about.statFounded') },
    { value: '30+', label: t('about.statYears') },
  ]
})
</script>

<template>
  <section v-editable="blok" class="xpk-about" id="about">
    <div class="xpk-about__inner">
      <div class="xp-eyebrow xpk-about__eyebrow" v-reveal>{{ eyebrow }}</div>
      <h2 class="xpk-about__title" v-reveal="1">{{ title }}</h2>
      <p class="xpk-about__text" v-reveal="2">{{ text }}</p>
      <div class="xpk-about__stats" v-reveal="3">
        <div v-for="(s, i) in stats" :key="i" class="xpk-about__stat">
          <b>{{ s.value }}</b><span>{{ s.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
