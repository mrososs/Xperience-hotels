// =====================================================================
// useHomeContent — CMS seam for the landing page. Fetches the published
// "home" story from Storyblok and returns its section bloks, keyed by
// component name. Any failure (token missing, story absent, network)
// resolves to an empty map, so the page falls back to the hardcoded
// app/data render and never breaks.
//
// In the Storyblok Visual Editor it also subscribes to the Storyblok
// bridge: as you edit a field, the bridge pushes the updated story into
// the iframe and we re-key the bloks, so edits reflect live (works with
// the public token — the event carries the edited content). Outside the
// editor the bridge is never loaded.
//
// Mirrors useResortContent: pages/components depend on this composable,
// not on the Storyblok client directly, so the seam stays in one place.
// =====================================================================

import { useStoryblokBridge } from '@storyblok/vue'

export interface HomeBlok {
  _uid: string
  component: string
  [key: string]: unknown
}

export function useHomeContent() {
  const { data } = useAsyncData('sb-home-story', async () => {
    try {
      const api = useStoryblokApi()
      const res = await api.get('cdn/stories/home', { version: 'published' })
      return res?.data?.story ?? null
    } catch {
      return null
    }
  })

  // Bridge-updated story (Visual Editor only). When set, it wins over the
  // initially-fetched published story so live edits show immediately.
  // Typed loosely: the bridge hands back Storyblok's ISbStoryData.
  const live = ref<any>(null)

  if (import.meta.client && typeof window !== 'undefined' && window.location.search.includes('_storyblok')) {
    let registered = false
    const register = (id?: number) => {
      if (registered || !id) return
      registered = true
      // Auto-imported from @storyblok/vue; loads the bridge script and
      // fires the callback on every edit (input/change/published).
      useStoryblokBridge(id, (newStory) => {
        live.value = newStory
      })
    }
    register(data.value?.id)
    watch(() => data.value?.id, register)
  }

  // `bloks.value[name]` → that section's blok, or undefined (→ fallback).
  const bloks = computed<Record<string, HomeBlok>>(() => {
    const story = live.value ?? data.value
    const body = (story?.content?.body ?? []) as HomeBlok[]
    return Object.fromEntries(body.map((b) => [b.component, b]))
  })

  return { bloks }
}
