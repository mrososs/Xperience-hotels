<script setup lang="ts">
import SiteNavbar from '@/components/shared/SiteNavbar.vue'
import HeroSection from '@/components/landing/HeroSection.vue'
import BookingBar from '@/components/landing/BookingBar.vue'
import AwardsMarquee from '@/components/landing/AwardsMarquee.vue'
import ResortsSection from '@/components/landing/ResortsSection.vue'
import BenefitsSection from '@/components/landing/BenefitsSection.vue'
import DiscoverSection from '@/components/landing/DiscoverSection.vue'
import AboutSection from '@/components/landing/AboutSection.vue'
import HoneymoonSection from '@/components/landing/HoneymoonSection.vue'
import SiteFooter from '@/components/shared/SiteFooter.vue'
import BookModal from '@/components/landing/BookModal.vue'
import { useBookingFlow } from '@/composables/useBookingFlow'

const { selection, openBook, openWithParty, close } = useBookingFlow()
</script>

<template>
  <SiteNavbar @book="openBook()" />
  <main>
    <HeroSection @book="openBook" />
    <BookingBar @search="openWithParty" />
    <AwardsMarquee />
    <ResortsSection @book="openBook" />
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
