import './styles/main.scss'
import './styles/resort/site.css'
import './styles/resort/hotel.css'
import './styles/resort/about.css'
import './styles/resort/meetings.css'
import './styles/resort/contact.css'

import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { vReveal } from './composables/reveal'
import { i18n, persistLocale, applyHtmlLang, type Locale } from './i18n'

// Mark JS as available so the reveal directive's hidden start state only
// applies when we can actually animate it back in (no-JS shows everything).
document.documentElement.classList.add('js')

// Single source of truth for locale side-effects: whatever changes the
// active locale (the switcher, a future deep link, etc.), persist it and
// reflect it onto <html lang/dir>. `immediate` also covers the first paint.
watch(
  i18n.global.locale,
  (next) => {
    persistLocale(next as Locale)
    applyHtmlLang(next as Locale)
  },
  { immediate: true },
)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.directive('reveal', vReveal)

app.mount('#app')
