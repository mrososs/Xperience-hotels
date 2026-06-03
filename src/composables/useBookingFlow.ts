import { computed, shallowRef, type ComputedRef } from 'vue'
import type { BookingParty, BookingSelection, Resort } from '@/data/types'

/**
 * Orchestrates the booking modal: what is currently being booked, and how
 * the flow is opened/closed. State is exposed read-only (a computed getter)
 * so consumers can only change it through the explicit actions.
 */
export function useBookingFlow(): {
  selection: ComputedRef<BookingSelection | null>
  openBook: (resort?: Resort | null) => void
  openWithParty: (party: BookingParty) => void
  close: () => void
} {
  const current = shallowRef<BookingSelection | null>(null)

  function openBook(resort: Resort | null = null) {
    current.value = { resort, party: null }
  }

  function openWithParty(party: BookingParty) {
    current.value = { resort: null, party }
  }

  function close() {
    current.value = null
  }

  return {
    selection: computed(() => current.value),
    openBook,
    openWithParty,
    close,
  }
}
