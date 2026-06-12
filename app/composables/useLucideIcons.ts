// =====================================================================
// Lucide icons — shared loader/renderer.
// The design renders icons from `<i data-lucide="…">` placeholders via the
// Lucide UMD build (pinned: `latest` dropped some brand glyphs). This util
// lazy-loads the script once and (re)draws icons on demand, so any
// component can call ensureIcons() in onMounted.
// =====================================================================

// IconNode is Lucide's data shape: an array of [tag, attrs] child elements.
type IconNode = [tag: string, attrs: Record<string, string | number>][]
interface Lucide {
  createIcons: () => void
  createElement: (iconNode: IconNode) => SVGElement
  icons: Record<string, IconNode>
}
declare global {
  interface Window {
    lucide?: Lucide
  }
}

// kebab-case data-lucide name → PascalCase key in `lucide.icons`
// (e.g. "chevron-down" → "ChevronDown", "building-2" → "Building2").
function toPascal(name: string): string {
  return name.replace(/(^|-)([a-z0-9])/g, (_m, _sep, ch: string) => ch.toUpperCase())
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

// Render the SVG *inside* each `<i data-lucide>` placeholder instead of
// letting lucide.createIcons() REPLACE the placeholder with an <svg>.
// Replacing the element rips a node Vue still tracks out of the DOM, so the
// next reactive patch (e.g. a language switch re-rendering the page) hits a
// detached node and throws "Cannot read properties of null (insertBefore)",
// aborting the patch and leaving the page half-translated. Keeping the host
// element (made `display:contents` in CSS so it adds no box) means Vue's vnode
// → DOM reference stays valid through every re-render and unmount. The host
// has no template children, so Vue never touches the injected <svg>.
export function drawIcons(): void {
  const lucide = window.lucide
  if (!lucide?.icons) return
  document.querySelectorAll<HTMLElement>('i[data-lucide]').forEach((host) => {
    const name = host.getAttribute('data-lucide')
    if (!name) return
    if (host.dataset.lucideDrawn === name) return // already rendered this icon
    const iconNode = lucide.icons[toPascal(name)]
    if (!iconNode) return
    const svg = lucide.createElement(iconNode)
    // Mirror createIcons()'s output: lucide classes + the host's own classes,
    // so existing icon CSS (which targeted the generated <svg>) still applies.
    svg.classList.add('lucide', `lucide-${name}`)
    host.classList.forEach((c) => svg.classList.add(c))
    host.replaceChildren(svg)
    host.dataset.lucideDrawn = name
  })
}

/** Load the library if needed, then draw icons. */
export async function ensureIcons(): Promise<void> {
  await loadLucide()
  drawIcons()
}
