<script setup lang="ts">
import { shallowRef, useTemplateRef } from 'vue'
import { Building2, Calendar, Users, Search, ChevronDown } from '@lucide/vue'
import GuestStepper from './GuestStepper.vue'
import { useClickOutside } from '@/composables/useClickOutside'
import { useLocale } from '@/composables/useLocale'
import { HOTELS } from '@/data/content'
import type { BookingParty } from '@/data/types'

const emit = defineEmits<{ search: [party: BookingParty] }>()

const { t } = useLocale()

// Source state — primitives use shallowRef.
const hotel = shallowRef<string>(HOTELS[0] ?? '')
const openHotel = shallowRef(false)
const openGuests = shallowRef(false)
const rooms = shallowRef(1)
const adults = shallowRef(2)
const children = shallowRef(0)

const root = useTemplateRef<HTMLElement>('root')

function toggleHotel() {
  openHotel.value = !openHotel.value
  openGuests.value = false
}
function toggleGuests() {
  openGuests.value = !openGuests.value
  openHotel.value = false
}
function pickHotel(name: string) {
  hotel.value = name
  openHotel.value = false
}
function closePopovers() {
  openHotel.value = false
  openGuests.value = false
}

useClickOutside(root, closePopovers)

function search() {
  emit('search', {
    hotel: hotel.value,
    rooms: rooms.value,
    adults: adults.value,
    children: children.value,
  })
}
</script>

<template>
  <div ref="root" class="xpk-bookbar">
    <!-- Hotel -->
    <div class="xpk-bookbar__field">
      <label>{{ t('bookingBar.selectYourHotel') }}</label>
      <div class="xpk-bookbar__val" style="cursor: pointer" @click="toggleHotel">
        <Building2 />
        <span class="xpk-bookbar__hotel">{{ hotel.replace('Xperience ', '') }}</span>
        <ChevronDown class="xpk-bookbar__caret" />
      </div>
      <div v-if="openHotel" class="xpk-pop xpk-pop--hotels" @click.stop>
        <button
          v-for="h in HOTELS"
          :key="h"
          class="xpk-pop__opt"
          :class="{ 'is-sel': h === hotel }"
          @click="pickHotel(h)"
        >
          {{ h }}
        </button>
      </div>
    </div>

    <!-- Check-in -->
    <div class="xpk-bookbar__field">
      <label>{{ t('bookingBar.checkin') }}</label>
      <div class="xpk-bookbar__val"><Calendar /> {{ t('bookingBar.checkinDate') }}</div>
    </div>

    <!-- Check-out -->
    <div class="xpk-bookbar__field">
      <label>{{ t('bookingBar.checkout') }}</label>
      <div class="xpk-bookbar__val"><Calendar /> {{ t('bookingBar.checkoutDate') }}</div>
    </div>

    <!-- Rooms & guests -->
    <div class="xpk-bookbar__field">
      <label>{{ t('bookingBar.roomsGuests') }}</label>
      <div class="xpk-bookbar__val" style="cursor: pointer" @click="toggleGuests">
        <Users />
        {{ t('bookingBar.roomCount', { rooms, guests: adults + children }) }}
        <ChevronDown class="xpk-bookbar__caret" />
      </div>
      <div v-if="openGuests" class="xpk-pop" @click.stop>
        <GuestStepper v-model="rooms" :label="t('bookingBar.roomsLabel')" :min="1" />
        <GuestStepper v-model="adults" :label="t('bookingBar.adultsLabel')" :min="1" />
        <GuestStepper v-model="children" :label="t('bookingBar.childrenLabel')" :min="0" />
        <button class="xp-btn xp-btn--ghost xpk-pop__done" @click="openGuests = false">{{ t('common.done') }}</button>
      </div>
    </div>

    <button class="xp-btn xp-btn--primary xpk-bookbar__go" @click="search">
      <Search /> {{ t('common.bookNow') }}
    </button>
  </div>
</template>
