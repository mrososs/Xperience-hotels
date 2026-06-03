import './styles/main.scss'
import './styles/resort/site.css'
import './styles/resort/hotel.css'

import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { i18n, persistLocale, applyHtmlLang, type Locale } from './i18n'

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

app.mount('#app')
