<script setup lang="ts">
// =====================================================================
// ContactLocations — the interactive map directory on /contact.
// Vue port of the design bundle's contact.js map switcher: picking a
// location swaps the (lazy) Google Maps embed, the floating name tag
// and the external "Directions" link. Selection state is a single
// index; everything else derives from it.
// =====================================================================
import { computed, shallowRef } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { CONTACT_DEFAULT_LOCATION, CONTACT_LOCATIONS } from '@/data/contact'

const { t, tBi } = useLocale()

const selected = shallowRef(CONTACT_DEFAULT_LOCATION)
const current = computed(() => CONTACT_LOCATIONS[selected.value] ?? CONTACT_LOCATIONS[0]!)
</script>

<template>
  <!-- x-reveal stays on this wrapper: the buttons below carry reactive
       is-active classes Vue re-patches, which would wipe the observer's
       is-in class. -->
  <div class="x-reveal">
    <div class="c-loc">
      <div class="c-loclist">
        <button
          v-for="(loc, i) in CONTACT_LOCATIONS"
          :key="loc.id"
          class="c-locitem"
          :class="{ 'is-active': i === selected }"
          type="button"
          @click="selected = i"
        >
          <span class="c-locitem__pin"><i :data-lucide="loc.icon"></i></span>
          <span>
            <b>{{ tBi(loc.name) }}</b>
            <span class="c-locitem__area"><i data-lucide="map-pin"></i> {{ tBi(loc.area) }}</span>
            <span class="c-locitem__det">{{ loc.email }}</span>
            <span class="c-locitem__tel"><i data-lucide="phone"></i> <span dir="ltr">{{ loc.tel }}</span></span>
          </span>
        </button>
      </div>

      <div class="c-mapwrap">
        <div class="c-maptag"><i data-lucide="map-pin"></i> <span>{{ tBi(current.name) }}</span></div>
        <iframe
          :src="current.map"
          :title="t('contactPage.mapTitle')"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        <a
          class="x-btn x-btn--gold x-btn--sm c-mapwrap__open"
          :href="current.mapUrl"
          target="_blank"
          rel="noopener"
        >
          <i data-lucide="navigation"></i> {{ t('contactPage.directions') }}
        </a>
      </div>
    </div>
  </div>
</template>
