<script setup lang="ts">
// =====================================================================
// OffersSection — landing-page preview of the honeymooner packages that
// live in full on the /offers page. Built in the landing design system
// (xpk-*/xp-* primitives + v-reveal + @lucide/vue components) so it sits
// natively among the other landing sections, unlike the /offers page
// which uses the resort design system. Shows each package with a short
// (4-perk) teaser; the section- and card-level links drive to /offers
// for the complete list. Carries id="offers" so it is the landing's
// offers anchor. Content: package data from @/data/offers (tBi), UI
// strings from the shared offers.* i18n keys.
// =====================================================================
import { ArrowRight, Check, Heart, MapPin } from '@lucide/vue'
import { useLocalePath } from '#imports'
import { useLocale } from '@/composables/useLocale'
import { useBgImage } from '@/composables/useBgImage'
import { HONEYMOON_PACKAGES } from '@/data/offers'

defineEmits<{ book: [] }>()

const { t, tBi } = useLocale()
const { bg } = useBgImage()
const localePath = useLocalePath()
</script>

<template>
  <section class="xpk-section xpk-offers" id="offers">
    <div class="xpk-section__head xpk-section__head--row" v-reveal>
      <div>
        <div class="xp-eyebrow">{{ t('offers.eyebrow') }}</div>
        <h2 class="xpk-section__title">{{ t('offers.honeymoonTitle') }}</h2>
        <p class="xpk-section__lead">{{ t('offers.honeymoonLead') }}</p>
      </div>
      <NuxtLink class="xpk-offers__all" :to="localePath('/offers')">
        {{ t('offers.viewAll') }} <ArrowRight />
      </NuxtLink>
    </div>

    <div class="xpk-offers__grid">
      <article
        v-for="(pkg, i) in HONEYMOON_PACKAGES"
        :key="pkg.slug"
        class="xpk-offer"
        v-reveal="i % 2"
      >
        <div class="xpk-offer__media" :style="bg(pkg.img, { width: 760 })">
          <span class="xpk-offer__tag"><Heart /> {{ t('offers.cardTag') }}</span>
        </div>
        <div class="xpk-offer__body">
          <h3 class="xpk-offer__name">{{ pkg.fullName }}</h3>
          <span class="xpk-offer__loc"><MapPin /> {{ tBi(pkg.loc) }}</span>
          <ul class="xpk-offer__list">
            <li v-for="(perk, p) in pkg.perks.slice(0, 4)" :key="p"><Check /> {{ tBi(perk) }}</li>
          </ul>
          <div class="xpk-offer__foot">
            <button class="xp-btn xp-btn--primary" @click="$emit('book')">{{ t('common.bookNow') }}</button>
            <NuxtLink class="xpk-offer__link" :to="localePath('/offers')">
              {{ t('offers.viewAll') }} <ArrowRight />
            </NuxtLink>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.xpk-offers__all {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  flex: none;
  padding-bottom: 6px;
  font-size: 14px;
  font-weight: 600;
  color: var(--xp-gold-deep);
  text-decoration: none;
  transition: color var(--xp-dur-fast) var(--xp-ease);
}
.xpk-offers__all:hover { color: var(--xp-ink); }
.xpk-offers__all :deep(svg) { width: 16px; height: 16px; }

.xpk-offers__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(20px, 2.2vw, 30px);
}

.xpk-offer {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid var(--xp-line);
  border-radius: var(--xp-r-lg);
  overflow: hidden;
  box-shadow: var(--xp-shadow-sm);
  transition: transform var(--xp-dur) var(--xp-ease), box-shadow var(--xp-dur) var(--xp-ease);
}
.xpk-offer:hover { transform: translateY(-5px); box-shadow: var(--xp-shadow-md); }
.xpk-offer:hover .xpk-offer__media { transform: scale(1.045); }

.xpk-offer__media {
  position: relative;
  height: 210px;
  background: #9db9bd center / cover no-repeat;
  transition: transform 0.7s var(--xp-ease);
}
.xpk-offer__media::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(8, 24, 28, 0.28) 0%, transparent 45%, rgba(8, 24, 28, 0.32) 100%);
}
.xpk-offer__tag {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #2a2310;
  background: var(--xp-gold);
  padding: 7px 13px;
  border-radius: 999px;
  box-shadow: var(--xp-shadow-gold);
}
html[dir='rtl'] .xpk-offer__tag { left: auto; right: 14px; }
.xpk-offer__tag :deep(svg) { width: 13px; height: 13px; }

.xpk-offer__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 24px 26px;
}
.xpk-offer__name {
  font-family: var(--xp-serif);
  font-weight: 600;
  font-size: clamp(20px, 2vw, 25px);
  line-height: 1.18;
  color: var(--xp-ink);
  margin: 0 0 6px;
}
.xpk-offer__loc {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--xp-muted);
  margin-bottom: 18px;
}
.xpk-offer__loc :deep(svg) { width: 14px; height: 14px; color: var(--xp-sea); }

.xpk-offer__list {
  list-style: none;
  padding: 0;
  margin: 0 0 22px;
  display: grid;
  gap: 10px;
}
.xpk-offer__list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--xp-slate);
}
.xpk-offer__list :deep(svg) {
  width: 16px;
  height: 16px;
  color: var(--xp-gold-deep);
  margin-top: 2px;
  flex: none;
}

.xpk-offer__foot {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid var(--xp-line-soft, var(--xp-line));
  flex-wrap: wrap;
}
.xpk-offer__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
  font-size: 14px;
  font-weight: 600;
  color: var(--xp-gold-deep);
  text-decoration: none;
  transition: color var(--xp-dur-fast) var(--xp-ease);
}
html[dir='rtl'] .xpk-offer__link { margin-left: 0; margin-right: auto; }
.xpk-offer__link:hover { color: var(--xp-ink); }
.xpk-offer__link :deep(svg) { width: 15px; height: 15px; }

html[dir='rtl'] .xpk-offers__all :deep(svg),
html[dir='rtl'] .xpk-offer__link :deep(svg) { transform: scaleX(-1); }

@media (max-width: 860px) {
  .xpk-offers__grid { grid-template-columns: 1fr; }
}
</style>
