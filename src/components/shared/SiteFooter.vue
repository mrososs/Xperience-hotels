<script setup lang="ts">
// =====================================================================
// SiteFooter — shared, app-wide footer. Strings via vue-i18n (t);
// resort names from data (tBi).
// =====================================================================
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useLocale } from '@/composables/useLocale'
import { ensureIcons } from '@/composables/useLucideIcons'
import { RESORT_LINKS } from '@/data/resorts'
import { SOCIAL } from '@/data/content'
import logoWhite from '@/assets/logo-xperience-white.png'

const { t, tBi } = useLocale()

onMounted(ensureIcons)
</script>

<template>
  <footer class="x-footer" id="footer">
    <div class="x-wrap">
      <div class="x-footer__top">
        <div class="x-footer__brand">
          <img :src="logoWhite" alt="Xperience Hospitality Management" />
          <p class="x-footer__promise">{{ t('footer.promise') }}</p>
          <div class="x-social">
            <a v-for="s in SOCIAL" :key="s.name" :href="s.href" :aria-label="s.name" target="_blank" rel="noopener"><i :data-lucide="s.name"></i></a>
          </div>
        </div>
        <div class="x-fcols">
          <div class="x-fcol">
            <h4>{{ t('footer.resorts') }}</h4>
            <RouterLink v-for="r in RESORT_LINKS" :key="r.slug" :to="`/resorts/${r.slug}`">{{ tBi(r.name) }}</RouterLink>
          </div>
          <div class="x-fcol">
            <h4>{{ t('footer.company') }}</h4>
            <RouterLink to="/about">{{ t('footer.aboutUs') }}</RouterLink>
            <RouterLink to="/awards">{{ t('nav.awards') }}</RouterLink>
            <RouterLink to="/meetings-events">{{ t('footer.meetingsEvents') }}</RouterLink>
            <RouterLink :to="{ path: '/', hash: '#offers' }">{{ t('footer.offers') }}</RouterLink>
            <a href="#">{{ t('footer.careers') }}</a>
            <RouterLink to="/contact">{{ t('footer.contactUs') }}</RouterLink>
          </div>
          <div class="x-fcol x-fnews">
            <h4>{{ t('footer.stayInTouch') }}</h4>
            <p>{{ t('footer.newsletter') }}</p>
            <div class="x-fsignup">
              <input type="email" name="email" :aria-label="t('footer.emailPlaceholder')" :placeholder="t('footer.emailPlaceholder')" />
              <button class="x-btn x-btn--gold">{{ t('footer.join') }}</button>
            </div>
          </div>
        </div>
      </div>
      <div class="x-footer__bar">
        <span>{{ t('footer.copyright') }}</span>
        <span class="x-footer__legal">
          <a href="#">{{ t('footer.privacy') }}</a>
          <a href="#">{{ t('footer.terms') }}</a>
        </span>
      </div>
    </div>
  </footer>
</template>
