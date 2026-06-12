<script setup lang="ts">
// Reflect the active locale onto <html lang/dir> and emit hreflang
// alternates + og:locale on every page. Replaces the old main.ts watcher
// and applyHtmlLang() — the server now renders <html lang="ar" dir="rtl">
// for /ar pages, which the SPA could never do.
const head = useLocaleHead({ seo: true })
useHead(() => ({
  htmlAttrs: head.value.htmlAttrs,
  link: head.value.link,
  meta: head.value.meta,
}))
</script>

<template>
  <NuxtPage />
</template>
