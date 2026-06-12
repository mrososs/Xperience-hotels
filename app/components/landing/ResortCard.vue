<script setup lang="ts">
import { computed } from 'vue'
import { useLocalePath } from '#imports'
import { MapPin, ArrowRight } from '@lucide/vue'
import { useLocale } from '@/composables/useLocale'
import type { Resort } from '@/data/types'

const props = defineProps<{ resort: Resort; index?: number }>()
defineEmits<{ book: [resort: Resort] }>()

const { locale, t } = useLocale()
const localePath = useLocalePath()
const area = computed(() => (locale.value === 'ar' && props.resort.areaAr ? props.resort.areaAr : props.resort.area))
const desc = computed(() => (locale.value === 'ar' && props.resort.descAr ? props.resort.descAr : props.resort.desc))
const num = computed(() => String((props.index ?? 0) + 1).padStart(2, '0'))
</script>

<template>
  <article class="xpk-resort">
    <div class="xpk-resort__media" :style="{ backgroundImage: `url(${resort.img})` }">
      <span class="xpk-resort__area"><MapPin /> {{ area }}</span>
      <span class="xpk-resort__num" aria-hidden="true">{{ num }}</span>
    </div>
    <div class="xpk-resort__body">
      <h3 class="xpk-resort__name">{{ resort.name }}</h3>
      <p class="xpk-resort__desc">{{ desc }}</p>
      <div class="xpk-resort__foot">
        <NuxtLink v-if="resort.slug" class="xpk-resort__explore" :to="localePath(`/resorts/${resort.slug}`)">
          {{ t('common.explore') }} <ArrowRight />
        </NuxtLink>
        <button class="xp-btn xp-btn--primary xpk-resort__cta" @click="$emit('book', resort)">
          {{ t('common.book') }}
        </button>
      </div>
    </div>
  </article>
</template>
