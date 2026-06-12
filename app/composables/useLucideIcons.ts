// =====================================================================
// Lucide icons — shared loader/renderer.
// The design renders icons from `<i data-lucide="…">` placeholders via the
// Lucide UMD build (pinned: `latest` dropped some brand glyphs). This util
// lazy-loads the script once and (re)draws icons on demand, so any
// component can call ensureIcons() in onMounted.
// =====================================================================

interface Lucide {
  createIcons: () => void
}
declare global {
  interface Window {
    lucide?: Lucide
  }
}

const LUCIDE_SRC = 'https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js'

let loadPromise: Promise<void> | null = null

export function loadLucide(): Promise<void> {
  if (window.lucide) return Promise.resolve()
  if (loadPromise) return loadPromise
  loadPromise = new Promise((resolve) => {
    const s = document.createElement('script')
    s.src = LUCIDE_SRC
    s.async = true
    s.dataset.lucideCdn = 'true'
    s.addEventListener('load', () => resolve(), { once: true })
    s.addEventListener('error', () => resolve(), { once: true })
    document.head.appendChild(s)
  })
  return loadPromise
}

/** Replace any `[data-lucide]` placeholders currently in the DOM. */
export function drawIcons(): void {
  window.lucide?.createIcons()
}

/** Load the library if needed, then draw icons. */
export async function ensureIcons(): Promise<void> {
  await loadLucide()
  drawIcons()
}
