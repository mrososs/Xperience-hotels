import { onMounted, onUnmounted, toValue, type MaybeRefOrGetter } from 'vue'

/**
 * Attach an event listener for the lifetime of the calling component.
 * The target may be a plain value, ref, or getter (resolved with toValue),
 * so callers can pass `window`, a template ref, etc. Cleanup is automatic.
 */
export function useEventListener(
  target: MaybeRefOrGetter<EventTarget | null | undefined>,
  event: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
): void {
  onMounted(() => toValue(target)?.addEventListener(event, handler, options))
  onUnmounted(() => toValue(target)?.removeEventListener(event, handler, options))
}
