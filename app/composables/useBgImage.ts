// =====================================================================
// useBgImage — optimize the project's pervasive CSS background-image
// pattern. The brand photography is hotlinked full-size from the
// WordPress CDN (200–270 KB JPEGs) and painted via `background-image`,
// so <NuxtImg loading="lazy"> can't drop in. Instead we route the source
// URL through @nuxt/image's $img so it's served resized + in a modern
// format (WebP) by the optimizer (IPX locally, Vercel image CDN in prod).
//
//   const { bg } = useBgImage()
//   :style="bg(resort.hero, HERO_BG)"        // hero preset
//   :style="bg(room.img, { width: 760 })"    // card / smaller context
//
// `src()` returns just the optimized URL — used to build the LCP <link
// rel=preload> so the preloaded URL is byte-for-byte the one the hero
// background requests (a mismatch would double-download and waste the
// preload).
// =====================================================================
import { useImage } from '#imports'

export interface BgOptions {
  /** Target render width in CSS px — the optimizer resizes the source to it. */
  width?: number
  /** Optional target height; width alone is usually enough. */
  height?: number
  /** Quality override (defaults to nuxt.config `image.quality`). */
  quality?: number
  /**
   * Output format. A CSS `url()` carries a single format, so we emit WebP
   * (universal support, ~30% smaller than JPEG, and smaller than IPX's AVIF
   * at these sizes). On Vercel the optimizer content-negotiates AVIF/WebP
   * regardless, so this stays optimal there.
   */
  format?: string
}

/**
 * Shared full-bleed-hero preset — width + quality used by BOTH the rendered
 * `.h-hero__media`/carousel background AND its `<link rel=preload>` (they
 * must resolve to the same URL or the preload double-downloads). The hero
 * always sits under a heavy dark scrim, so q62 is imperceptible yet ~half
 * the bytes of the full-size source.
 */
export const HERO_BG: BgOptions = { width: 1366, quality: 62 }

export function useBgImage() {
  const img = useImage()

  /** Optimized URL for a source image (empty string for a missing src). */
  function src(source: string | undefined | null, opts: BgOptions = {}): string {
    if (!source) return ''
    return img(source, {
      width: opts.width,
      height: opts.height,
      quality: opts.quality,
      format: opts.format ?? 'webp',
    })
  }

  /** `background-image:url(...)` style string with an optimized URL. */
  function bg(source: string | undefined | null, opts: BgOptions = {}): string {
    const url = src(source, opts)
    return url ? `background-image:url('${url}')` : ''
  }

  return { bg, src }
}
