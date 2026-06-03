// =====================================================================
// useLocale — thin wrapper over vue-i18n that keeps the persisted
// preference and the <html lang/dir> attributes in sync with the active
// locale, plus a tBi() helper for selecting bilingual *data* (entity
// content kept in the data layer rather than the JSON catalogs).
// =====================================================================

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { type Locale } from '@/i18n'

interface Bi {
  en: string
  ar: string
}

export function useLocale() {
  const { locale, t } = useI18n()

  // Setting the locale is enough — the global watcher in main.ts persists
  // it to localStorage and syncs <html lang/dir>.
  function setLocale(next: Locale): void {
    locale.value = next
  }

  const isRtl = computed(() => locale.value === 'ar')

  /** Pick the right language from a bilingual data object. */
  function tBi(value: Bi): string {
    return locale.value === 'ar' ? value.ar : value.en
  }

  return { locale, setLocale, t, tBi, isRtl }
}
