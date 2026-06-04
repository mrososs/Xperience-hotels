// =====================================================================
// useScrollSpy — track which page section the viewport is currently in.
// Given section ids (in document order), `current` holds the id whose
// vertical range contains the probe line (scrollY + offset), or null when
// none does / when disabled. Used by SiteNavbar to light up section links
// while the user scrolls the landing page, independent of the route hash
// (which goes stale as soon as the user scrolls away from an anchor).
// =====================================================================

import { ref, toValue, watch, type MaybeRefOrGetter } from 'vue'
import { useEventListener } from './useEventListener'

export function useScrollSpy(
  ids: string[],
  enabled: MaybeRefOrGetter<boolean> = true,
  // Probe just past the navbar + the sections' scroll-margin-top, so the
  // section an anchor jump lands on is the one that lights up.
  offset = 130,
) {
  const current = ref<string | null>(null)

  const measure = () => {
    if (!toValue(enabled)) {
      current.value = null
      return
    }
    // Sections shorter than the viewport at the very bottom (the footer)
    // can sit below the probe's maximum reach — once the page is scrolled
    // out, the last present section wins.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      const last = [...ids].reverse().find((id) => document.getElementById(id))
      current.value = last ?? null
      return
    }
    const pos = window.scrollY + offset
    let cur: string | null = null
    for (const id of ids) {
      const el = document.getElementById(id)
      if (!el) continue
      const top = el.offsetTop
      if (top <= pos && pos < top + el.offsetHeight) {
        cur = id
        break
      }
    }
    current.value = cur
  }

  useEventListener(window, 'scroll', measure, { passive: true })
  useEventListener(window, 'resize', measure)
  // Re-measure when toggled (route changes) — next frame, after the
  // destination page has rendered its sections.
  watch(
    () => toValue(enabled),
    () => requestAnimationFrame(measure),
    { immediate: true },
  )

  return { current, refresh: measure }
}
