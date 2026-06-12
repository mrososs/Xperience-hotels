<script setup lang="ts">
// Reflect the active locale onto <html lang/dir> and emit hreflang
// alternates + og:locale on every page. Replaces the old main.ts watcher
// and applyHtmlLang() — the server now renders <html lang="ar" dir="rtl">
// for /ar pages, which the SPA could never do.
import ExitIntentOffer from '@/components/shared/ExitIntentOffer.vue'

const head = useLocaleHead({ seo: true })
useHead(() => ({
  htmlAttrs: head.value.htmlAttrs,
  link: head.value.link,
  meta: head.value.meta,
}))
</script>

<template>
  <NuxtPage />
  <!-- Site-wide last-chance offer; self-arms and Teleports to <body>. -->
  <ExitIntentOffer />
</template>
