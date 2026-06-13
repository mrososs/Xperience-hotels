<script setup lang="ts">
// =====================================================================
// VideoCard — one portrait (9:16, Shorts-style) video card in the
// Discover rail. Purely presentational: video in, `play` out. The
// thumbnail derives from the YouTube id, so the data layer stays free
// of CDN URLs.
// =====================================================================
import { computed } from 'vue'
import { MapPin, Play } from '@lucide/vue'
import { useLocale } from '@/composables/useLocale'
import { useBgImage } from '@/composables/useBgImage'
import type { DiscoverVideo } from '@/data/types'

const props = defineProps<{ video: DiscoverVideo }>()
const emit = defineEmits<{ play: [] }>()

const { locale, t } = useLocale()
const { bg } = useBgImage()

const title = computed(() =>
  locale.value === 'ar' && props.video.titleAr ? props.video.titleAr : props.video.title,
)

const thumbUrl = computed(() => `https://i.ytimg.com/vi/${props.video.youtubeId}/hqdefault.jpg`)
</script>

<template>
  <article class="xpk-vcard">
    <button
      class="xpk-vcard__hit"
      type="button"
      :aria-label="t('discover.playVideo', { title })"
      @click="emit('play')"
    >
      <span class="xpk-vcard__media" :style="bg(thumbUrl, { width: 480 })" />
      <span class="xpk-vcard__scrim" />
      <span class="xpk-vcard__tag"><MapPin /> {{ video.tag }}</span>
      <span class="xpk-vcard__play"><Play /></span>
      <span class="xpk-vcard__body">
        <span class="xpk-vcard__title">{{ title }}</span>
      </span>
    </button>
  </article>
</template>
