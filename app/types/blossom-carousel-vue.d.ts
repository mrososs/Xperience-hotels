// Type shim for @blossom-carousel/vue.
//
// The published package (v1.1.1) sets its `types` field to ./dist/index.d.ts,
// but the declarations actually ship under ./dist/src/. TypeScript therefore
// can't resolve the import and falls back to implicit `any` (TS7016). This
// restores the component's public contract: the `as` / `repeat` / `load`
// props and the exposed `{ el, prev, next }` instance API.
declare module '@blossom-carousel/vue' {
  import type { DefineComponent, ShallowRef } from 'vue'

  export const BlossomCarousel: DefineComponent<
    {
      as?: string
      repeat?: boolean
      load?: 'conditional' | 'always'
    },
    {
      el: ShallowRef<HTMLElement | null>
      prev: () => void
      next: () => void
    }
  >
}
