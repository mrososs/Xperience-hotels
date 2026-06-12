// =====================================================================
// useLocale — thin wrapper over @nuxtjs/i18n plus a tBi() helper for
// selecting bilingual *data* (entity content kept in the data layer
// rather than the JSON catalogs). With locale-prefixed URLs, switching
// language is a navigation (/about ↔ /ar/about); the module persists
// the choice to the xp-lang cookie and app.vue reflects it onto
// <html lang/dir>.
// =====================================================================

import { computed } from 'vue'
import { useI18n } from '#imports'

export type Locale = 'en' | 'ar' | 'de' | 'it' | 'ru'

interface Bi {
  en: string
  ar: string
  de?: string
  it?: string
  ru?: string
}

export function useLocale() {
  const { locale, t, locales, setLocale: setI18nLocale } = useI18n()

  // Switch language through the i18n module's own setLocale. It loads the
  // target catalog, flips the locale *in step with* the Suspense page
  // transition, persists the xp-lang cookie and navigates to the matching
  // locale-prefixed route — all in one coordinated pass. The previous
  // switchLocalePath() + navigateTo() approach only changed the route: the
  // locale flip never synced with the page transition, so the body stayed
  // half-rendered in the old language and the bare navigateTo promise
  // rejected unhandled.
  function setLocale(next: Locale): void {
    if (next === locale.value) return
    void setI18nLocale(next)
  }

  const isRtl = computed(() => locale.value === 'ar')

  /** Pick the current language from a localized data object (falls back to en). */
  function tBi(value: Bi): string {
    return (value as Record<string, string | undefined>)[locale.value] ?? value.en
  }

  return { locale, locales, setLocale, t, tBi, isRtl }
}
