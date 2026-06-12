import type { RouterConfig } from '@nuxt/schema'

// i18n route names carry a ___<locale> suffix (about___en / about___ar);
// strip it so "same page, different locale" is detectable.
const baseName = (name: unknown): string => String(name ?? '').split('___')[0] ?? ''

export default <RouterConfig>{
  async scrollBehavior(to, from, savedPosition) {
    if (import.meta.server) return false
    if (savedPosition) return savedPosition

    // A locale switch re-navigates the same page under the other prefix —
    // keep the reader where they are instead of yanking to the top.
    if (
      to.name !== from.name &&
      baseName(to.name) === baseName(from.name) &&
      JSON.stringify(to.params) === JSON.stringify(from.params)
    ) {
      return false
    }

    // honour in-page #anchors, otherwise scroll to top on navigation
    if (to.hash) {
      // Wait a frame so cross-page hash navigation (e.g. /about → /#offers)
      // measures the *rendered* destination — querying synchronously here
      // runs before the new page mounts and the target doesn't exist yet.
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
      // Offset by the target's CSS scroll-margin-top — the router scrolls
      // programmatically, so the margin (used to clear the fixed navbar on
      // the landing and resort pages) is ignored unless passed as `top`.
      const el = document.querySelector<HTMLElement>(to.hash)
      const margin = el ? parseFloat(getComputedStyle(el).scrollMarginTop) || 0 : 0
      return { el: to.hash, top: margin, behavior: 'smooth' }
    }
    return { top: 0 }
  },
}
