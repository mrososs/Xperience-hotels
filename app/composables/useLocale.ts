// =====================================================================
// useLocale — thin wrapper over @nuxtjs/i18n plus a tBi() helper for
// selecting bilingual *data* (entity content kept in the data layer
// rather than the JSON catalogs). With locale-prefixed URLs, switching
// language is a navigation (/about ↔ /ar/about); the module persists
// the choice to the xp-lang cookie and app.vue reflects it onto
// <html lang/dir>.
// =====================================================================

import { computed } from 'vue'
import { useI18n, useSwitchLocalePath, navigateTo } from '#imports'

export type Locale = 'en' | 'ar'

interface Bi {
  en: string
  ar: string
}

export function useLocale() {
  const { locale, t } = useI18n()
  const switchLocalePath = useSwitchLocalePath()

  // Navigate to the same page under the other locale prefix. The i18n
  // module persists the choice (xp-lang cookie) and updates <html lang/dir>.
  function setLocale(next: Locale): void {
    const target = switchLocalePath(next)
    if (target) navigateTo(target)
  }

  const isRtl = computed(() => locale.value === 'ar')

  /** Pick the right language from a bilingual data object. */
  function tBi(value: Bi): string {
    return locale.value === 'ar' ? value.ar : value.en
  }

  return { locale, setLocale, t, tBi, isRtl }
}
