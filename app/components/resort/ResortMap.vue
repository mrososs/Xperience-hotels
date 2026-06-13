<script setup lang="ts">
// =====================================================================
// ResortMap — a real, interactive Leaflet map for the resort LOCATION
// section. Browser-only (Leaflet touches window/document), so it is
// mounted exclusively on the client (parent wraps it in <ClientOnly>)
// and Leaflet itself is dynamically imported in onMounted — it never
// ships in the SSR bundle and never runs on the server.
//
// Design choices for UX on a long marketing page:
//  • scroll-wheel zoom is OFF until the user clicks the map, so the page
//    keeps scrolling past it (no scroll-hijack); +/- buttons & pinch work.
//  • a custom gold "pin" marker (divIcon, pure CSS/SVG) matches the brand
//    palette and avoids Leaflet's bundler-broken default marker images.
//  • CARTO Voyager tiles — light, refined cartography that suits the
//    luxury-minimalist look better than raw OSM.
// =====================================================================
import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import 'leaflet/dist/leaflet.css'
import type { Map as LeafletMap } from 'leaflet'

const props = withDefaults(
  defineProps<{
    lat: number
    lng: number
    /** Marker title + popup heading (resort name). */
    label: string
    /** Optional sub-line in the popup (e.g. the area). */
    area?: string
    zoom?: number
  }>(),
  { zoom: 14 },
)

const host = ref<HTMLElement | null>(null)
const map = shallowRef<LeafletMap | null>(null)
const ready = ref(false)
const locked = ref(true)

onMounted(async () => {
  const L = await import('leaflet')
  if (!host.value) return

  const m = L.map(host.value, {
    center: [props.lat, props.lng],
    zoom: props.zoom,
    scrollWheelZoom: false,
    zoomControl: true,
    attributionControl: true,
  })

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 19,
  }).addTo(m)

  const icon = L.divIcon({
    className: 'xp-pin',
    html:
      '<span class="xp-pin__pulse"></span>' +
      '<svg class="xp-pin__svg" viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M12 22s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12z"/>' +
      '<circle cx="12" cy="10" r="2.7"/></svg>',
    iconSize: [42, 48],
    iconAnchor: [21, 46],
    popupAnchor: [0, -42],
  })

  const popup =
    `<b class="xp-pop__name">${props.label}</b>` +
    (props.area ? `<span class="xp-pop__area">${props.area}</span>` : '')

  L.marker([props.lat, props.lng], { icon, title: props.label, keyboard: false })
    .addTo(m)
    .bindPopup(popup, { closeButton: false, offset: [0, 4] })
    .openPopup()

  // Enable scroll-zoom only after an explicit click — keeps the page
  // scrollable when the cursor passes over the map.
  m.on('click', () => {
    m.scrollWheelZoom.enable()
    locked.value = false
  })

  map.value = m
  ready.value = true
})

onBeforeUnmount(() => {
  map.value?.remove()
  map.value = null
})
</script>

<template>
  <div class="h-leaflet">
    <div ref="host" class="h-leaflet__canvas" role="application" :aria-label="label"></div>
    <Transition name="h-leaflet-fade">
      <span v-if="ready && locked" class="h-leaflet__hint">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>
        {{ $t('resort.mapHint') }}
      </span>
    </Transition>
  </div>
</template>
