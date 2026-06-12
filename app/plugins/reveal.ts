// Registers the v-reveal scroll-reveal directive app-wide (was main.ts).
// Universal (not .client) so the server-side template compiler can resolve
// the directive; getSSRProps keeps SSR output untouched, which means the
// crawler-visible HTML ships without the hidden start state — the reveal
// animation simply begins at hydration.
import { vReveal } from '@/composables/reveal'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    ...vReveal,
    getSSRProps: () => ({}),
  })
})
