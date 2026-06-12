// =====================================================================
// useExitIntent — detects when a visitor is about to leave the page and
// fires a one-shot callback (used to surface the book-direct offer modal).
// Pure client behaviour: listeners are attached in onMounted via
// useEventListener (auto-cleaned on unmount), so it is SSR-safe.
//
// Desktop: the cursor leaving the viewport through the top edge (toward the
//   tab strip / close button) is the classic exit signal.
// Touch:   there is no cursor, so we approximate intent with a decisive
//   upward swipe after the visitor has scrolled some way down the page
//   (a common "I'm heading back / leaving" gesture).
//
// Guards keep it unobtrusive: it arms only after a short delay (so an early
// accidental mouse-out doesn't fire it), runs at most once per page load,
// and respects a localStorage cooldown so a returning visitor isn't nagged.
// =====================================================================

import { onMounted } from 'vue'
import { useEventListener } from '@/composables/useEventListener'

interface ExitIntentOptions {
  /** localStorage key holding the last-shown timestamp. */
  storageKey?: string
  /** Don't fire again within this many days of the last show. */
  cooldownDays?: number
  /** Wait this long after mount before the detector goes live (ms). */
  armDelayMs?: number
}

const DAY_MS = 24 * 60 * 60 * 1000

export function useExitIntent(onTrigger: () => void, opts: ExitIntentOptions = {}): void {
  const { storageKey = 'xp-exit-intent', cooldownDays = 7, armDelayMs = 4000 } = opts

  let armed = false
  let fired = false

  function withinCooldown(): boolean {
    try {
      const last = window.localStorage.getItem(storageKey)
      if (!last) return false
      return Date.now() - Number(last) < cooldownDays * DAY_MS
    } catch {
      // localStorage blocked (private mode / disabled) — treat as no cooldown.
      return false
    }
  }

  function markShown(): void {
    try {
      window.localStorage.setItem(storageKey, String(Date.now()))
    } catch {
      /* ignore — non-persisted is fine, the per-load guard still holds */
    }
  }

  function trigger(): void {
    if (!armed || fired) return
    fired = true
    markShown()
    onTrigger()
  }

  // --- Desktop: cursor exits through the top of the viewport ---
  function onMouseOut(e: MouseEvent): void {
    // relatedTarget is null when the pointer left the document entirely;
    // clientY <= 0 means it went out the top (toward tabs / close).
    if (e.clientY <= 0 && !e.relatedTarget) trigger()
  }

  // --- Touch: a decisive upward swipe after scrolling down the page ---
  let lastY = 0
  let lastT = 0
  function onTouchMove(e: TouchEvent): void {
    const touch = e.touches[0]
    if (!touch) return
    const now = Date.now()
    const dy = touch.clientY - lastY // positive = finger moving down = page scrolling up
    const dt = now - lastT
    // Fast downward finger drag (page heading back to top) once the visitor
    // has actually scrolled into the page — a "leaving" gesture.
    if (window.scrollY > 600 && dy > 90 && dt < 250) trigger()
    lastY = touch.clientY
    lastT = now
  }

  useEventListener(() => document, 'mouseout', onMouseOut as EventListener)
  useEventListener(() => document, 'touchmove', onTouchMove as EventListener, { passive: true })

  onMounted(() => {
    if (withinCooldown()) {
      fired = true // skip entirely this load
      return
    }
    window.setTimeout(() => {
      armed = true
    }, armDelayMs)
  })
}
