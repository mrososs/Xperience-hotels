<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { X, MapPin, Calendar, Users, Crown, Check } from '@lucide/vue'
import { useEventListener } from '@/composables/useEventListener'
import { useLocale } from '@/composables/useLocale'
import type { Resort, BookingParty } from '@/data/types'

const props = defineProps<{ resort: Resort | null; party: BookingParty | null }>()
const emit = defineEmits<{ close: [] }>()

const { t } = useLocale()
const step = shallowRef(1)

const hotel = computed(
  () => props.resort?.name || props.party?.hotel || 'Xperience Sea Breeze Resort',
)
const partyText = computed(() => {
  const p = props.party
  return t('landingModal.partyVal', {
    rooms: p?.rooms || 1,
    guests: (p?.adults ?? 2) + (p?.children ?? 0),
  })
})

useEventListener(() => document, 'keydown', ((e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
}) as EventListener)
</script>

<template>
  <div class="xpk-modal" @click="$emit('close')">
    <div class="xpk-modal__card" role="dialog" aria-modal="true" @click.stop>
      <button class="xpk-modal__close" aria-label="Close" @click="$emit('close')"><X /></button>

      <template v-if="step === 1">
        <div class="xp-eyebrow">{{ t('landingModal.bookDirect') }}</div>
        <h3 class="xpk-modal__title">{{ hotel }}</h3>
        <div class="xpk-modal__rows">
          <div class="xpk-modal__row">
            <span><MapPin /> {{ t('landingModal.destination') }}</span><b>{{ t('landingModal.destinationVal') }}</b>
          </div>
          <div class="xpk-modal__row">
            <span><Calendar /> {{ t('landingModal.dates') }}</span><b>{{ t('landingModal.datesVal') }}</b>
          </div>
          <div class="xpk-modal__row"><span><Users /> {{ t('landingModal.party') }}</span><b>{{ partyText }}</b></div>
        </div>
        <p class="xpk-modal__note">
          <Crown /> {{ t('landingModal.note') }}
        </p>
        <button class="xp-btn xp-btn--primary xpk-modal__cta" @click="step = 2">
          {{ t('landingModal.confirmBooking') }}
        </button>
      </template>

      <div v-else class="xpk-modal__done">
        <span class="xpk-modal__check"><Check /></span>
        <h3 class="xpk-modal__title">{{ t('landingModal.reserved') }}</h3>
        <p class="xpk-modal__sub">{{ t('landingModal.reservedSub') }}</p>
        <button class="xp-btn xp-btn--dark xpk-modal__cta" @click="$emit('close')">{{ t('landingModal.done') }}</button>
      </div>
    </div>
  </div>
</template>
