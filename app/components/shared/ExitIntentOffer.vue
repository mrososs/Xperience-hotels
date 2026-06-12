<script setup lang="ts">
// =====================================================================
// ExitIntentOffer — last-chance book-direct offer shown when the visitor
// looks like they're about to leave. Detection lives in useExitIntent;
// this component owns only the modal UI + open/close + a11y.
// Mounted once in app.vue, it Teleports to <body> so it overlays every
// route (and every locale) without per-page wiring. Strings come from
// vue-i18n (t); the layout inherits dir from <html> for RTL (ar).
// =====================================================================
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { X, Sparkles, ArrowRight } from '@lucide/vue'
import { useLocalePath, useRoute } from '#imports'
import { useExitIntent } from '@/composables/useExitIntent'
import { useLocale } from '@/composables/useLocale'
import { useEventListener } from '@/composables/useEventListener'

const { t, isRtl } = useLocale()
const localePath = useLocalePath()

// i18n route names carry a ___<locale> suffix (offers___en / offers___ar);
// strip it so the offers page is detectable in any locale.
const route = useRoute()
const onOffersPage = computed(() => String(route.name ?? '').split('___')[0] === 'offers')

const open = ref(false)
const closeRef = ref<HTMLButtonElement | null>(null)
let lastFocused: HTMLElement | null = null

useExitIntent(() => {
  // The whole prompt drives visitors to the offers page — there's nothing
  // to upsell to when they're already on it, so skip the self-referential modal.
  if (onOffersPage.value) return
  open.value = true
})

function close(): void {
  open.value = false
}

// Open/close side effects: lock body scroll, move focus into the dialog,
// and restore focus to wherever it was when we close.
watch(open, (isOpen) => {
  if (isOpen) {
    lastFocused = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    nextTick(() => closeRef.value?.focus())
  } else {
    document.body.style.overflow = ''
    lastFocused?.focus?.()
    lastFocused = null
  }
})

useEventListener(() => document, 'keydown', ((e: KeyboardEvent) => {
  if (open.value && e.key === 'Escape') close()
}) as EventListener)

// Safety net: never leave the page scroll locked if we unmount while open.
onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="xp-exit" @click="close">
      <div
        class="xp-exit__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="xp-exit-title"
        @click.stop
      >
        <button ref="closeRef" class="xp-exit__close" :aria-label="t('exitIntent.close')" @click="close">
          <X />
        </button>

        <div class="xp-exit__eyebrow">{{ t('exitIntent.eyebrow') }}</div>
        <h2 id="xp-exit-title" class="xp-exit__title">{{ t('exitIntent.title') }}</h2>
        <p class="xp-exit__body">{{ t('exitIntent.body') }}</p>

        <p class="xp-exit__offer">
          <Sparkles /> {{ t('exitIntent.offer') }}
        </p>

        <NuxtLink
          class="x-btn x-btn--gold xp-exit__cta"
          :to="localePath('/offers')"
          @click="close"
        >
          {{ t('exitIntent.cta') }}
          <ArrowRight :class="{ 'xp-exit__arr--rtl': isRtl }" />
        </NuxtLink>

        <button class="xp-exit__dismiss" type="button" @click="close">
          {{ t('exitIntent.dismiss') }}
        </button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.xp-exit {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(12, 30, 34, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  animation: xp-exit-fade 0.25s var(--xp-ease, ease);
}

.xp-exit__card {
  position: relative;
  width: min(440px, 100%);
  padding: 40px 40px 30px;
  background: #fff;
  border-radius: var(--xp-r-xl, 22px);
  box-shadow: var(--xp-shadow-lg, 0 30px 80px rgba(0, 0, 0, 0.25));
  text-align: center;
  animation: xp-exit-rise 0.35s var(--xp-ease, ease);
}

.xp-exit__close {
  position: absolute;
  top: 16px;
  inset-inline-end: 16px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid var(--xp-line, #e6e6e6);
  background: #fff;
  color: var(--xp-slate, #4a5b5e);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: border-color var(--xp-dur-fast, 0.15s);
}
.xp-exit__close:hover { border-color: var(--xp-gold, #c9a24b); }
.xp-exit__close :deep(svg) { width: 18px; height: 18px; }

.xp-exit__eyebrow {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--xp-gold-deep, #9c7a2e);
}

.xp-exit__title {
  font-family: var(--xp-serif, "Playfair Display", serif);
  font-size: 30px;
  font-weight: 600;
  line-height: 1.15;
  margin: 10px 0 12px;
  color: var(--xp-ink, #0c1e22);
}

.xp-exit__body {
  font-size: 15px;
  line-height: 1.6;
  color: var(--xp-slate, #4a5b5e);
  margin: 0 auto 18px;
  max-width: 330px;
}

.xp-exit__offer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--xp-gold-deep, #9c7a2e);
  background: var(--xp-gold-tint, #f6efdd);
  border-radius: var(--xp-r-sm, 12px);
  padding: 12px 16px;
  margin: 0 0 24px;
  line-height: 1.4;
}
.xp-exit__offer :deep(svg) { width: 17px; height: 17px; flex: none; }

.xp-exit__cta {
  width: 100%;
  justify-content: center;
  gap: 8px;
}
.xp-exit__cta :deep(svg) { width: 18px; height: 18px; }
.xp-exit__arr--rtl { transform: scaleX(-1); }

.xp-exit__dismiss {
  display: block;
  margin: 14px auto 0;
  padding: 4px;
  background: none;
  border: 0;
  font-size: 13px;
  color: var(--xp-muted, #8a9a9c);
  text-decoration: underline;
  cursor: pointer;
}
.xp-exit__dismiss:hover { color: var(--xp-slate, #4a5b5e); }

@keyframes xp-exit-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes xp-exit-rise {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .xp-exit, .xp-exit__card { animation: none; }
}
</style>
