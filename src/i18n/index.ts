// =====================================================================
// XPERIENCE HOTELS — i18n (vue-i18n v11, Composition API)
// English (LTR) + Arabic (RTL). UI strings live in ./locales/*.json and
// are accessed with t(); per-entity content (resorts, benefits, etc.)
// stays in the data layer as bilingual objects, selected via useLocale's
// tBi() helper. The active locale is the single source of truth and is
// reflected onto <html lang/dir> (see applyHtmlLang / useLocale).
// =====================================================================

import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ar from './locales/ar.json'

export const SUPPORTED_LOCALES = ['en', 'ar'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

const STORAGE_KEY = 'xp-lang'

export function getSavedLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'ar') return saved
  } catch {
    /* localStorage unavailable */
  }
  return 'en'
}

export function persistLocale(locale: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    /* ignore */
  }
}

/** Reflect the active locale onto <html> so CSS direction (dir) and lang
 *  respond to it. */
export function applyHtmlLang(locale: Locale): void {
  const html = document.documentElement
  html.setAttribute('lang', locale)
  html.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr')
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getSavedLocale(),
  fallbackLocale: 'en',
  messages: { en, ar },
})
