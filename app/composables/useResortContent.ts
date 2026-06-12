// =====================================================================
// useResortContent — the single indirection between pages and resort
// content. Today it resolves from the hardcoded app/data records; when
// the Storyblok CMS lands, only the fetcher body changes (swap getResort
// for a Storyblok client call using useRuntimeConfig().storyblokToken).
// =====================================================================

import { toValue, type MaybeRefOrGetter } from 'vue'
import { getResort, type Resort } from '@/data/resorts'

export function useResortContent(slug: MaybeRefOrGetter<string>) {
  return useAsyncData<Resort>(
    () => `resort-${toValue(slug)}`,
    async () => getResort(toValue(slug))!,
    { watch: [() => toValue(slug)] },
  )
}
