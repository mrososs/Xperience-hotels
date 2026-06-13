<script setup lang="ts">
import { computed } from 'vue'
import { Heart } from '@lucide/vue'
import { useLocale } from '@/composables/useLocale'
import { useBgImage } from '@/composables/useBgImage'
import { HONEYMOON, HONEYMOON_IMG } from '@/data/content'
import type { HomeBlok } from '@/composables/useHomeContent'

// Optional Storyblok `honeymoon_section` blok; falls back to app/data + i18n.
const props = defineProps<{ blok?: HomeBlok }>()
defineEmits<{ book: [] }>()

const { t, tBi } = useLocale()
const { bg } = useBgImage()

const eyebrow = computed(() => (props.blok?.eyebrow as string) || t('honeymoon.eyebrow'))
const title = computed(() => (props.blok?.title as string) || t('honeymoon.title'))
const cta = computed(() => (props.blok?.cta_label as string) || t('honeymoon.cta'))
const note = computed(() => (props.blok?.note as string) || t('honeymoon.note'))
const image = computed(() => {
  // `image` is a Storyblok asset object ({ filename }); tolerate a string.
  const raw = props.blok?.image as { filename?: string } | string | undefined
  const url = typeof raw === 'string' ? raw : raw?.filename
  return url || HONEYMOON_IMG
})
const perks = computed(() => {
  const raw = props.blok?.perks as string | undefined
  if (raw) return raw.split('\n').filter(Boolean)
  return HONEYMOON.map((p) => tBi(p))
})
</script>

<template>
  <section v-editable="blok" class="xpk-honey">
    <div class="xpk-honey__media" v-reveal :style="bg(image, { width: 1100 })" />
    <div class="xpk-honey__panel">
      <div class="xp-eyebrow" v-reveal>{{ eyebrow }}</div>
      <h2 class="xpk-honey__title" v-reveal="1">{{ title }}</h2>
      <ul class="xpk-honey__list" v-reveal="2">
        <li v-for="(perk, i) in perks" :key="i"><Heart /> {{ perk }}</li>
      </ul>
      <button class="xp-btn xp-btn--primary" v-reveal="3" @click="$emit('book')">{{ cta }}</button>
      <p class="xpk-honey__note" v-reveal="3">{{ note }}</p>
    </div>
  </section>
</template>
