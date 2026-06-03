// =====================================================================
// v-reveal — a restraint-first scroll/load reveal directive.
// Elements fade + rise once as they enter the viewport, staggered by an
// optional index (v-reveal="2"). One shared IntersectionObserver drives
// every element; each is unobserved after it reveals.
//
// Progressive enhancement: the hidden start state is gated behind
// `html.js` (set in main.ts), so without JavaScript everything renders
// visible. prefers-reduced-motion reveals immediately, no transition.
// =====================================================================
import type { ObjectDirective } from 'vue'

const STAGGER_MS = 80

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let observer: IntersectionObserver | null = null

function getObserver(): IntersectionObserver {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-revealed')
        observer?.unobserve(entry.target)
      }
    },
    // Trigger a touch before fully in view so the motion reads as the
    // content "arriving", not popping in late.
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  )
  return observer
}

export const vReveal: ObjectDirective<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    el.classList.add('xpk-reveal')

    const stagger = Number(binding.value) || 0
    if (stagger > 0) el.style.transitionDelay = `${stagger * STAGGER_MS}ms`

    // Reveal straight away when motion is unwelcome or IO is unavailable.
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      el.classList.add('is-revealed')
      return
    }
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
