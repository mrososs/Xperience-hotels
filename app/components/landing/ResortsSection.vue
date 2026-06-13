<script setup lang="ts">
import { computed } from 'vue'
import ResortCard from './ResortCard.vue'
import { useLocale } from '@/composables/useLocale'
import { RESORTS } from '@/data/content'
import type { Resort } from '@/data/types'
import type { HomeBlok } from '@/composables/useHomeContent'

// Optional Storyblok `resorts_section` blok; falls back to app/data + i18n.
const props = defineProps<{ blok?: HomeBlok }>()
defineEmits<{ book: [resort: Resort] }>()

const { t } = useLocale()

const eyebrow = computed(() => (props.blok?.eyebrow as string) || t('resortsSection.eyebrow'))
const title = computed(() => (props.blok?.title as string) || t('resortsSection.title'))
const lead = computed(() => (props.blok?.lead as string) || t('resortsSection.lead'))
const meta = computed(() => (props.blok?.meta as string) || t('nav.sixResorts'))

const resorts = computed<Resort[]>(() => {
  const cards = props.blok?.resorts as
    | { name: string; area: string; slug: string; image: { filename?: string } | string; description: string }[]
    | undefined
  if (cards?.length) {
    return cards.map((c) => ({
      name: c.name,
      area: c.area,
      slug: c.slug,
      // `image` is a Storyblok asset object ({ filename }); tolerate a string.
      img: typeof c.image === 'string' ? c.image : (c.image?.filename ?? ''),
      desc: c.description,
    }))
  }
  return RESORTS
})
</script>

<template>
  <section v-editable="blok" class="xpk-section" id="resorts">
    <div class="xpk-section__head xpk-section__head--row">
      <div v-reveal>
        <div class="xp-eyebrow">{{ eyebrow }}</div>
        <h2 class="xpk-section__title">{{ title }}</h2>
        <p class="xpk-section__lead">{{ lead }}</p>
      </div>
      <span class="xpk-section__meta" v-reveal="1">{{ meta }}</span>
    </div>

    <div class="xpk-resort__grid">
      <ResortCard
        v-for="(resort, i) in resorts"
        :key="resort.slug || resort.name"
        v-reveal="i % 3"
        :resort="resort"
        :index="i"
        @book="$emit('book', $event)"
      />
    </div>
  </section>
</template>
