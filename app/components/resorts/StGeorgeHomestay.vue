<script setup lang="ts">
import ResortDetail from '@/components/resort/ResortDetail.vue'
import { getResort } from '@/data/resorts'

const resort = getResort('st-george-homestay')!
</script>

<template>
  <ResortDetail :resort="resort" />
</template>
