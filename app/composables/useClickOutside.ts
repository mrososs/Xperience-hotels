import { toValue, type MaybeRefOrGetter } from 'vue'
import { useEventListener } from './useEventListener'

/**
 * Invokes `handler` when a click lands outside `target`.
 * Built on useEventListener, so the document listener is cleaned up
 * automatically when the component unmounts.
 */
export function useClickOutside(
  target: MaybeRefOrGetter<HTMLElement | null>,
  handler: (event: MouseEvent) => void,
): void {
  useEventListener(() => document, 'click', ((event: MouseEvent) => {
    const el = toValue(target)
    if (el && !el.contains(event.target as Node)) handler(event)
  }) as EventListener)
}
