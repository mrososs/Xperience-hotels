<script setup lang="ts">
// =====================================================================
// DiscoverSection — "Discover the Xperience": a dark band with a
// draggable Shorts-style rail of real videos from the brand's YouTube
// channel, plus a click-to-play portrait lightbox. The rail is a
// Blossom Carousel (drag + snap); the arrows drive its exposed
// prev()/next(). Lightbox state lives in useVideoLightbox; the cards
// and the player are presentational children.
// =====================================================================
import { useTemplateRef } from 'vue'
import { BlossomCarousel } from '@blossom-carousel/vue'
import '@blossom-carousel/core/style.css'
import { ArrowLeft, ArrowRight } from '@lucide/vue'
import { useLocale } from '@/composables/useLocale'
import { useVideoLightbox } from '@/composables/useVideoLightbox'
import { DISCOVER_VIDEOS } from '@/data/content'
import VideoCard from './VideoCard.vue'
import VideoLightbox from './VideoLightbox.vue'

const { t, isRtl } = useLocale()

const carousel = useTemplateRef<InstanceType<typeof BlossomCarousel>>('carousel')

const { isOpen, embedUrl, open, close, next, prev } = useVideoLightbox(DISCOVER_VIDEOS)
</script>

<template>
  <section
    class="xpk-discover"
    id="discover"
    :aria-label="t('discover.regionLabel')"
    aria-roledescription="carousel"
  >
    <div class="xpk-discover__inner">
      <div class="xpk-discover__head">
        <div v-reveal>
          <div class="xp-eyebrow">{{ t('discover.eyebrow') }}</div>
          <h2 class="xpk-discover__title">{{ t('discover.title') }}</h2>
          <p class="xpk-discover__lead">{{ t('discover.lead') }}</p>
        </div>
        <div class="xpk-discover__nav" v-reveal="1">
          <button type="button" :aria-label="t('discover.prev')" @click="carousel?.prev()">
            <ArrowRight v-if="isRtl" />
            <ArrowLeft v-else />
          </button>
          <button type="button" :aria-label="t('discover.next')" @click="carousel?.next()">
            <ArrowLeft v-if="isRtl" />
            <ArrowRight v-else />
          </button>
        </div>
      </div>

      <BlossomCarousel ref="carousel" class="xpk-discover__rail" v-reveal="2">
        <VideoCard
          v-for="(video, i) in DISCOVER_VIDEOS"
          :key="video.youtubeId"
          :video="video"
          @play="open(i)"
        />
      </BlossomCarousel>
    </div>

    <VideoLightbox v-if="isOpen" :embed-url="embedUrl" @close="close" @prev="prev" @next="next" />
  </section>
</template>
