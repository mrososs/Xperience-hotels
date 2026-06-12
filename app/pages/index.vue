<script setup lang="ts">
import SiteNavbar from '@/components/shared/SiteNavbar.vue'
import HeroSection from '@/components/landing/HeroSection.vue'
import BookingBar from '@/components/landing/BookingBar.vue'
import AwardsMarquee from '@/components/landing/AwardsMarquee.vue'
import ResortsSection from '@/components/landing/ResortsSection.vue'
import OffersSection from '@/components/landing/OffersSection.vue'
import BenefitsSection from '@/components/landing/BenefitsSection.vue'
import DiscoverSection from '@/components/landing/DiscoverSection.vue'
import AboutSection from '@/components/landing/AboutSection.vue'
import HoneymoonSection from '@/components/landing/HoneymoonSection.vue'
import SiteFooter from '@/components/shared/SiteFooter.vue'
import BookModal from '@/components/landing/BookModal.vue'
import { useBookingFlow } from '@/composables/useBookingFlow'
import { useLocale } from '@/composables/useLocale'
import { RESORTS } from '@/data/resorts'

const { selection, openBook, openWithParty, close } = useBookingFlow()

const { t } = useLocale()
useSeoMeta({
  title: () => t('seo.home.title'),
  description: () => t('seo.home.description'),
  ogTitle: () => t('seo.home.title'),
  ogDescription: () => t('seo.home.description'),
  ogType: 'website',
  ogImage: RESORTS[0]?.hero,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <SiteNavbar @book="openBook()" />
  <main>
    <HeroSection @book="openBook" />
    <BookingBar @search="openWithParty" />
    <AwardsMarquee />
    <ResortsSection @book="openBook" />
    <OffersSection @book="openBook()" />
    <BenefitsSection />
    <DiscoverSection />
    <AboutSection />
    <HoneymoonSection @book="openBook()" />
  </main>
  <SiteFooter />

  <BookModal
    v-if="selection"
    :resort="selection.resort"
    :party="selection.party"
    @close="close"
  />
</template>
