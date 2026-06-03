<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { MapPin, ArrowRight } from '@lucide/vue'
import { useLocale } from '@/composables/useLocale'
import type { Resort } from '@/data/types'

const props = defineProps<{ resort: Resort }>()
defineEmits<{ book: [resort: Resort] }>()

const { locale, t } = useLocale()
const area = computed(() => (locale.value === 'ar' && props.resort.areaAr ? props.resort.areaAr : props.resort.area))
const desc = computed(() => (locale.value === 'ar' && props.resort.descAr ? props.resort.descAr : props.resort.desc))
</script>

<template>
  <article class="xpk-resort">
    <div class="xpk-resort__media" :style="{ backgroundImage: `url(${resort.img})` }">
      <span class="xpk-resort__area"><MapPin /> {{ area }}</span>
    </div>
    <div class="xpk-resort__body">
      <h3 class="xpk-resort__name">{{ resort.name }}</h3>
      <p class="xpk-resort__desc">{{ desc }}</p>
      <div class="xpk-resort__foot">
        <RouterLink v-if="resort.slug" class="xpk-resort__explore" :to="`/resorts/${resort.slug}`">
          {{ t('common.explore') }} <ArrowRight />
        </RouterLink>
        <button class="xp-btn xp-btn--primary xpk-resort__cta" @click="$emit('book', resort)">
          {{ t('common.book') }}
        </button>
      </div>
    </div>
  </article>
</template>
