# Storyblok block components

`@storyblok/nuxt` auto-registers every `.vue` file in this directory as a
component, matched **by filename to the Storyblok block's technical name**.
When you render a story with `<StoryblokComponent :blok="blok" />`, the module
resolves `blok.component` (e.g. `hero`, `resort`, `room`) to `Hero.vue`,
`Resort.vue`, `Room.vue` here.

Each component receives a `blok` prop and should mark editable regions:

```vue
<script setup lang="ts">
defineProps<{ blok: any }>()
</script>

<template>
  <section v-editable="blok">{{ blok.title }}</section>
</template>
```

Fetch content in a page/composable with `useAsyncStoryblok('slug', { version })`
or `useStoryblokApi()`. The space ("xperience-hotels", EU region) is currently
empty — define blocks in Storyblok, model the resort content there, then add a
matching `.vue` file here and point `useResortContent` at Storyblok.
