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
import { useHomeContent } from '@/composables/useHomeContent'
import { RESORTS } from '@/data/resorts'

const { selection, openBook, openWithParty, close } = useBookingFlow()

// CMS seam: section content comes from the Storyblok "home" story when
// present, else each section falls back to app/data. `bloks[name]` is the
// blok for that section type (or undefined → fallback).
const { bloks } = useHomeContent()

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
    <HeroSection :blok="bloks.hero" @book="openBook" />
    <BookingBar @search="openWithParty" />
    <AwardsMarquee :blok="bloks.awards_marquee" />
    <ResortsSection :blok="bloks.resorts_section" @book="openBook" />
    <OffersSection :blok="bloks.offers_section" @book="openBook()" />
    <BenefitsSection :blok="bloks.benefits_section" />
    <DiscoverSection :blok="bloks.discover_section" />
    <AboutSection :blok="bloks.about_section" />
    <HoneymoonSection :blok="bloks.honeymoon_section" @book="openBook()" />
  </main>
  <SiteFooter />

  <BookModal
    v-if="selection"
    :resort="selection.resort"
    :party="selection.party"
    @close="close"
  />
</template>
