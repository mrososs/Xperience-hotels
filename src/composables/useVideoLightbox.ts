// =====================================================================
// useVideoLightbox — state + side effects for a click-to-play YouTube
// lightbox over a list of videos. Owns the active index, wrap-around
// navigation, the derived autoplay embed URL, Escape/arrow keyboard
// handling and the body scroll lock, so section components stay
// presentational. State is exposed readonly; updates flow through the
// returned actions.
// =====================================================================

import { computed, readonly, shallowRef, watch, onUnmounted } from 'vue'
import { useEventListener } from './useEventListener'
import type { DiscoverVideo } from '@/data/types'

export function useVideoLightbox(videos: readonly DiscoverVideo[]) {
  // null = closed. A single source of truth; everything else derives.
  const activeIndex = shallowRef<number | null>(null)

  const isOpen = computed(() => activeIndex.value !== null)

  const activeVideo = computed<DiscoverVideo | null>(() =>
    activeIndex.value === null ? null : (videos[activeIndex.value] ?? null),
  )

  const embedUrl = computed(() =>
    activeVideo.value === null
      ? ''
      : `https://www.youtube.com/embed/${activeVideo.value.youtubeId}?autoplay=1&rel=0&playsinline=1`,
  )

  function open(index: number): void {
    if (index >= 0 && index < videos.length) activeIndex.value = index
  }

  function close(): void {
    activeIndex.value = null
  }

  /** Step with wrap-around; no-op while closed. */
  function step(dir: 1 | -1): void {
    if (activeIndex.value === null) return
    activeIndex.value = (activeIndex.value + dir + videos.length) % videos.length
  }

  const next = (): void => step(1)
  const prev = (): void => step(-1)

  // Side effects live here, not in components: lock page scroll while
  // the lightbox is open, and restore it on close/unmount.
  watch(isOpen, (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
  })
  onUnmounted(() => {
    if (isOpen.value) document.body.style.overflow = ''
  })

  useEventListener(window, 'keydown', (e: Event) => {
    if (!isOpen.value) return
    const key = (e as KeyboardEvent).key
    if (key === 'Escape') close()
    else if (key === 'ArrowRight') next()
    else if (key === 'ArrowLeft') prev()
  })

  return {
    activeIndex: readonly(activeIndex),
    isOpen,
    activeVideo,
    embedUrl,
    open,
    close,
    next,
    prev,
  }
}
