<script setup lang="ts">
// Compact SVG country flags for the language switcher. SVG (not emoji)
// because regional-indicator emoji flags don't render on Windows/Chrome.
// Each flag fills a fixed rounded box via preserveAspectRatio slice.
defineProps<{ code: string }>()
</script>

<template>
  <span class="lang-flag" aria-hidden="true">
    <!-- United Kingdom (English) -->
    <svg v-if="code === 'en'" viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0 60 30M60 0 0 30" stroke="#fff" stroke-width="6" />
      <path d="M0 0 60 30M60 0 0 30" stroke="#C8102E" stroke-width="2.5" />
      <path d="M30 0V30M0 15H60" stroke="#fff" stroke-width="10" />
      <path d="M30 0V30M0 15H60" stroke="#C8102E" stroke-width="6" />
    </svg>
    <!-- Egypt (Arabic) -->
    <svg v-else-if="code === 'ar'" viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice">
      <rect width="60" height="40" fill="#fff" />
      <rect width="60" height="13.34" fill="#CE1126" />
      <rect width="60" height="13.34" y="26.66" fill="#000" />
      <circle cx="30" cy="20" r="4.2" fill="#C09300" />
    </svg>
    <!-- Germany -->
    <svg v-else-if="code === 'de'" viewBox="0 0 5 3" preserveAspectRatio="xMidYMid slice">
      <rect width="5" height="3" />
      <rect width="5" height="1" y="1" fill="#DD0000" />
      <rect width="5" height="1" y="2" fill="#FFCE00" />
    </svg>
    <!-- Italy -->
    <svg v-else-if="code === 'it'" viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice">
      <rect width="1" height="2" fill="#009246" />
      <rect width="1" height="2" x="1" fill="#fff" />
      <rect width="1" height="2" x="2" fill="#CE2B37" />
    </svg>
    <!-- Russia -->
    <svg v-else-if="code === 'ru'" viewBox="0 0 9 6" preserveAspectRatio="xMidYMid slice">
      <rect width="9" height="6" fill="#fff" />
      <rect width="9" height="2" y="2" fill="#0039A6" />
      <rect width="9" height="2" y="4" fill="#D52B1E" />
    </svg>
  </span>
</template>

<style scoped>
.lang-flag {
  display: inline-block;
  width: 22px;
  height: 16px;
  border-radius: 3px;
  overflow: hidden;
  flex: none;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
}
.lang-flag svg {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
