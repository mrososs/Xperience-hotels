<script setup lang="ts">
// =====================================================================
// VideoLightbox — a teleported, portrait (9:16) YouTube player overlay
// for the Discover rail. Presentational: the embed URL comes in as a
// prop; close / prev / next are emitted up (state lives in
// useVideoLightbox). Keyboard handling and scroll locking also live in
// the composable — this component only renders.
// =====================================================================
import { X, ChevronLeft, ChevronRight } from '@lucide/vue'
import { useLocale } from '@/composables/useLocale'

defineProps<{ embedUrl: string }>()
const emit = defineEmits<{ close: []; prev: []; next: [] }>()

const { t } = useLocale()
</script>

<template>
  <Teleport to="body">
    <div
      class="xpk-vlb"
      role="dialog"
      aria-modal="true"
      :aria-label="t('discover.lightboxLabel')"
      @click.self="emit('close')"
    >
      <button
        class="xpk-vlb__close"
        type="button"
        :aria-label="t('discover.close')"
        @click="emit('close')"
      >
        <X />
      </button>

      <button
        class="xpk-vlb__btn xpk-vlb__btn--prev"
        type="button"
        :aria-label="t('discover.prevVideo')"
        @click="emit('prev')"
      >
        <ChevronLeft />
      </button>

      <div class="xpk-vlb__frame">
        <iframe
          class="xpk-vlb__iframe"
          :src="embedUrl"
          title="Xperience video"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen
        />
      </div>

      <button
        class="xpk-vlb__btn xpk-vlb__btn--next"
        type="button"
        :aria-label="t('discover.nextVideo')"
        @click="emit('next')"
      >
        <ChevronRight />
      </button>
    </div>
  </Teleport>
</template>
