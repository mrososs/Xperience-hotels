<script setup lang="ts">
import { Minus, Plus } from '@lucide/vue'

const props = defineProps<{ label: string; min?: number }>()

// True two-way contract — the parent owns the count, this controls it.
const count = defineModel<number>({ required: true })

function decrement() {
  count.value = Math.max(props.min ?? 0, count.value - 1)
}
function increment() {
  count.value += 1
}
</script>

<template>
  <div class="xpk-step">
    <span class="xpk-step__label">{{ label }}</span>
    <div class="xpk-step__ctrl">
      <button type="button" :aria-label="`Fewer ${label.toLowerCase()}`" @click="decrement">
        <Minus />
      </button>
      <span class="xpk-step__val">{{ count }}</span>
      <button type="button" :aria-label="`More ${label.toLowerCase()}`" @click="increment">
        <Plus />
      </button>
    </div>
  </div>
</template>
