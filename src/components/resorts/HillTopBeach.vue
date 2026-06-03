<script setup lang="ts">
import ResortDetail from '@/components/resort/ResortDetail.vue'
import { getResort } from '@/data/resorts'

const resort = getResort('hill-top-beach')!
</script>

<template>
  <ResortDetail :resort="resort" />
</template>
