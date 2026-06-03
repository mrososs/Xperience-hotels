import { readonly, shallowRef, type DeepReadonly, type ShallowRef } from 'vue'
import { useEventListener } from './useEventListener'

/**
 * Tracks whether the window has scrolled past `threshold` pixels.
 * Used to flip the site header from transparent to glass.
 */
export function useScrollState(threshold = 40): {
  scrolled: DeepReadonly<ShallowRef<boolean>>
} {
  const scrolled = shallowRef(false)

  useEventListener(
    window,
    'scroll',
    () => {
      scrolled.value = window.scrollY > threshold
    },
    { passive: true },
  )

  return { scrolled: readonly(scrolled) }
}
