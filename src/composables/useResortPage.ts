// =====================================================================
// XPERIENCE — Sea Breeze resort page behaviour
// Vue port of the design bundle's site.js + booking.js + hotel.js.
// Operates directly on the rendered DOM (the template keeps the exact
// x-*/h-* class names + data-attributes the originals query for), and
// returns a teardown that removes the window/document-level listeners
// so nothing leaks when the SPA navigates away.
// =====================================================================

import { i18n } from '@/i18n'
import { loadLucide, drawIcons } from '@/composables/useLucideIcons'

type Cleanup = () => void
type Lang = 'en' | 'ar'

// Locale + UI translations are owned by vue-i18n (see useLocale); the nav
// dock, mega menu, mobile sheet and language switch live in SiteNavbar.
// This module wires the resort-page-specific behaviour only: scroll reveal,
// counters, the booking bar + modal, the gallery lightbox and the sticky
// anchor scrollspy. It reads the active locale for booking strings.

// ---------------------------------------------------------------------
// SCROLL REVEAL + COUNTERS (IntersectionObserver)
// ---------------------------------------------------------------------
function initReveal(cleanups: Cleanup[]): void {
  const els = document.querySelectorAll('.x-reveal')
  if (!('IntersectionObserver' in window)) {
    els.forEach((e) => e.classList.add('is-in'))
    return
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('is-in')
          io.unobserve(en.target)
        }
      })
    },
    { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
  )
  els.forEach((e) => io.observe(e))
  cleanups.push(() => io.disconnect())
}

function initCounters(cleanups: Cleanup[]): void {
  const els = document.querySelectorAll<HTMLElement>('[data-count]')
  if (!els.length) return
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return
        const el = en.target as HTMLElement
        const target = parseFloat(el.dataset.count || '0')
        const dur = 1400
        const suffix = el.dataset.suffix || ''
        let t0: number | null = null
        const step = (ts: number) => {
          if (!t0) t0 = ts
          const p = Math.min((ts - t0) / dur, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          el.textContent = Math.round(eased * target) + suffix
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
        io.unobserve(el)
      })
    },
    { threshold: 0.5 },
  )
  els.forEach((e) => io.observe(e))
  cleanups.push(() => io.disconnect())
}

// ---------------------------------------------------------------------
// BOOKING flow — bar popovers + summary modal (bilingual-aware)
// ---------------------------------------------------------------------
function curLang(): Lang {
  return (i18n.global.locale.value as Lang) || 'en'
}
function tr(k: 'selectHotel' | 'addDates' | 'rooms' | 'guests' | 'nights'): string {
  return i18n.global.t('booking.' + k)
}
function fmtDate(d: string): string {
  if (!d) return ''
  const dt = new Date(d + 'T00:00')
  return dt.toLocaleDateString(curLang() === 'ar' ? 'ar-EG' : 'en-GB', {
    day: 'numeric',
    month: 'short',
  })
}

type OpenModal = (presetHotel?: string | null) => void

function initBooking(cleanups: Cleanup[], refreshers: Cleanup[]): OpenModal {
  const state = { hotel: null as string | null, ci: '', co: '', rooms: 1, guests: 2 }

  const nightsBetween = () => {
    if (!state.ci || !state.co) return 0
    const a = new Date(state.ci)
    const b = new Date(state.co)
    return Math.max(0, Math.round((b.getTime() - a.getTime()) / 86400000))
  }

  const render = () => {
    const hv = document.querySelector<HTMLElement>('[data-book-val="hotel"]')
    if (hv) {
      if (state.hotel) {
        hv.textContent = state.hotel
        hv.classList.remove('is-empty')
      } else {
        hv.innerHTML = '<i data-lucide="building-2"></i><span>' + tr('selectHotel') + '</span>'
      }
    }
    const dv = document.querySelector<HTMLElement>('[data-book-val="dates"]')
    if (dv) {
      dv.innerHTML =
        state.ci && state.co
          ? '<i data-lucide="calendar"></i><span>' + fmtDate(state.ci) + ' — ' + fmtDate(state.co) + '</span>'
          : '<i data-lucide="calendar"></i><span>' + tr('addDates') + '</span>'
    }
    const gv = document.querySelector<HTMLElement>('[data-book-val="guests"]')
    if (gv) {
      gv.innerHTML =
        '<i data-lucide="users"></i><span>' +
        state.rooms +
        ' ' +
        tr('rooms') +
        ' · ' +
        state.guests +
        ' ' +
        tr('guests') +
        '</span>'
    }
    const rs = document.querySelector('[data-step="rooms"] .x-step__v')
    if (rs) rs.textContent = String(state.rooms)
    const gs = document.querySelector('[data-step="guests"] .x-step__v')
    if (gs) gs.textContent = String(state.guests)
    drawIcons()
  }

  const closeAllPops = (except?: Element) => {
    document.querySelectorAll('.x-pop').forEach((p) => {
      if (p !== except) p.classList.remove('is-open')
    })
  }

  // ---- MODAL ----
  const openModal = (presetHotel?: string | null) => {
    const m = document.getElementById('bookModal')
    if (!m) return
    if (presetHotel) state.hotel = presetHotel
    const n = nightsBetween()
    const set = (sel: string, val: string) => {
      const e = m.querySelector(sel)
      if (e) e.textContent = val
    }
    set('[data-sum="hotel"]', state.hotel || tr('selectHotel'))
    set(
      '[data-sum="dates"]',
      state.ci && state.co
        ? fmtDate(state.ci) + ' — ' + fmtDate(state.co) + (n ? ' · ' + n + ' ' + tr('nights') : '')
        : tr('addDates'),
    )
    set('[data-sum="guests"]', state.rooms + ' ' + tr('rooms') + ' · ' + state.guests + ' ' + tr('guests'))
    ;(m.querySelector('.x-modal__form') as HTMLElement).style.display = ''
    ;(m.querySelector('.x-modal__done') as HTMLElement).style.display = 'none'
    m.classList.add('is-open')
    document.body.style.overflow = 'hidden'
    drawIcons()
  }
  const closeModal = () => {
    const m = document.getElementById('bookModal')
    if (!m) return
    m.classList.remove('is-open')
    document.body.style.overflow = ''
  }
  const confirmModal = () => {
    const m = document.getElementById('bookModal')
    if (!m) return
    ;(m.querySelector('.x-modal__form') as HTMLElement).style.display = 'none'
    ;(m.querySelector('.x-modal__done') as HTMLElement).style.display = 'block'
    drawIcons()
  }

  // ---- BAR ----
  const bar = document.querySelector<HTMLElement>('.x-book')
  if (bar) {
    if (bar.dataset.hotel) state.hotel = bar.dataset.hotel

    bar.querySelectorAll<HTMLElement>('.x-pop--hotels .x-pop__opt').forEach((opt) => {
      const h = () => {
        state.hotel = opt.dataset.name || null
        bar.querySelectorAll('.x-pop--hotels .x-pop__opt').forEach((o) => o.classList.remove('is-sel'))
        opt.classList.add('is-sel')
        render()
        closeAllPops()
      }
      opt.addEventListener('click', h)
      cleanups.push(() => opt.removeEventListener('click', h))
    })

    const ci = bar.querySelector<HTMLInputElement>('input[data-date="ci"]')
    const co = bar.querySelector<HTMLInputElement>('input[data-date="co"]')
    const today = new Date().toISOString().slice(0, 10)
    if (ci) {
      ci.min = today
      const h = () => {
        state.ci = ci.value
        if (co) co.min = ci.value
        render()
      }
      ci.addEventListener('change', h)
      cleanups.push(() => ci.removeEventListener('change', h))
    }
    if (co) {
      const h = () => {
        state.co = co.value
        render()
      }
      co.addEventListener('change', h)
      cleanups.push(() => co.removeEventListener('change', h))
    }

    bar.querySelectorAll<HTMLElement>('[data-step]').forEach((step) => {
      const key = step.dataset.step as 'rooms' | 'guests'
      step.querySelectorAll<HTMLButtonElement>('button').forEach((b) => {
        const h = () => {
          const dir = b.dataset.dir === 'up' ? 1 : -1
          state[key] = Math.max(1, Math.min(20, state[key] + dir))
          render()
        }
        b.addEventListener('click', h)
        cleanups.push(() => b.removeEventListener('click', h))
      })
    })

    bar.querySelectorAll<HTMLElement>('.x-book__field').forEach((field) => {
      const pop = field.querySelector('.x-pop')
      const h = (e: Event) => {
        if (pop && pop.contains(e.target as Node)) return
        if (!pop) return
        const willOpen = !pop.classList.contains('is-open')
        closeAllPops()
        pop.classList.toggle('is-open', willOpen)
      }
      field.addEventListener('click', h)
      cleanups.push(() => field.removeEventListener('click', h))
    })

    const barDocClick = (e: MouseEvent) => {
      if (!bar.contains(e.target as Node)) closeAllPops()
    }
    document.addEventListener('click', barDocClick)
    cleanups.push(() => document.removeEventListener('click', barDocClick))

    bar.querySelectorAll<HTMLElement>('[data-book-go]').forEach((btn) => {
      const h = () => openModal()
      btn.addEventListener('click', h)
      cleanups.push(() => btn.removeEventListener('click', h))
    })

    render()
  }

  // ---- MODAL wiring ----
  const m = document.getElementById('bookModal')
  if (m) {
    m.querySelectorAll<HTMLElement>('[data-modal-close]').forEach((b) => {
      b.addEventListener('click', closeModal)
      cleanups.push(() => b.removeEventListener('click', closeModal))
    })
    const modalBgClick = (e: MouseEvent) => {
      if (e.target === m) closeModal()
    }
    m.addEventListener('click', modalBgClick)
    cleanups.push(() => m.removeEventListener('click', modalBgClick))

    m.querySelectorAll<HTMLElement>('[data-modal-confirm]').forEach((b) => {
      b.addEventListener('click', confirmModal)
      cleanups.push(() => b.removeEventListener('click', confirmModal))
    })

    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', esc)
    cleanups.push(() => document.removeEventListener('keydown', esc))
  }

  // any element with data-book-open opens the modal (nav CTA, room cards…)
  document.querySelectorAll<HTMLElement>('[data-book-open]').forEach((el) => {
    const h = (e: Event) => {
      e.preventDefault()
      openModal(el.dataset.bookOpen || null)
    }
    el.addEventListener('click', h)
    cleanups.push(() => el.removeEventListener('click', h))
  })

  // re-render the always-visible booking bar when the locale changes
  refreshers.push(render)

  return openModal
}

// ---------------------------------------------------------------------
// GALLERY lightbox
// ---------------------------------------------------------------------
function initLightbox(cleanups: Cleanup[]): void {
  const cells = Array.from(document.querySelectorAll<HTMLElement>('[data-lb]'))
  const lb = document.getElementById('lightbox')
  if (!cells.length || !lb) return
  const imgs = cells.map((c) => c.getAttribute('data-lb') || '')
  const imgEl = lb.querySelector<HTMLImageElement>('.h-lb__img')!
  const countEl = lb.querySelector<HTMLElement>('.h-lb__count')
  let i = 0
  const show = (n: number) => {
    i = (n + imgs.length) % imgs.length
    imgEl.src = imgs[i] ?? ''
    if (countEl) countEl.textContent = i + 1 + ' / ' + imgs.length
  }
  const open = (n: number) => {
    show(n)
    lb.classList.add('is-open')
    document.body.style.overflow = 'hidden'
  }
  const close = () => {
    lb.classList.remove('is-open')
    document.body.style.overflow = ''
  }
  cells.forEach((c, idx) => {
    const h = () => open(idx)
    c.addEventListener('click', h)
    cleanups.push(() => c.removeEventListener('click', h))
  })
  const prevBtn = lb.querySelector('.h-lb__btn--prev')
  const nextBtn = lb.querySelector('.h-lb__btn--next')
  const closeBtn = lb.querySelector('.h-lb__close')
  const prev = (e: Event) => {
    e.stopPropagation()
    show(i - 1)
  }
  const next = (e: Event) => {
    e.stopPropagation()
    show(i + 1)
  }
  prevBtn?.addEventListener('click', prev)
  nextBtn?.addEventListener('click', next)
  closeBtn?.addEventListener('click', close)
  const bgClick = (e: MouseEvent) => {
    if (e.target === lb) close()
  }
  lb.addEventListener('click', bgClick)
  const key = (e: KeyboardEvent) => {
    if (!lb.classList.contains('is-open')) return
    if (e.key === 'Escape') close()
    if (e.key === 'ArrowRight') show(i + 1)
    if (e.key === 'ArrowLeft') show(i - 1)
  }
  document.addEventListener('keydown', key)
  cleanups.push(() => {
    prevBtn?.removeEventListener('click', prev)
    nextBtn?.removeEventListener('click', next)
    closeBtn?.removeEventListener('click', close)
    lb.removeEventListener('click', bgClick)
    document.removeEventListener('keydown', key)
  })
}

// ---------------------------------------------------------------------
// STICKY anchor scrollspy
// ---------------------------------------------------------------------
function initSpy(cleanups: Cleanup[]): void {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.h-anchors a[href^="#"]'))
  if (!links.length) return
  const map: Record<string, HTMLAnchorElement> = {}
  links.forEach((l) => {
    const id = (l.getAttribute('href') || '').slice(1)
    if (document.getElementById(id)) map[id] = l
  })
  const ids = Object.keys(map)
  const onScroll = () => {
    // Probe just past the sections' scroll-margin-top (150–176px), so the
    // section an anchor jump lands on is the one that lights up.
    const pos = window.scrollY + 190
    let current = ids[0] ?? ''
    ids.forEach((id) => {
      const sec = document.getElementById(id)
      if (sec && sec.offsetTop <= pos) current = id
    })
    links.forEach((l) => l.classList.remove('is-active'))
    map[current]?.classList.add('is-active')
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  cleanups.push(() => window.removeEventListener('scroll', onScroll))
}

// ---------------------------------------------------------------------
// PUBLIC — boot everything, return a teardown.
// ---------------------------------------------------------------------
export interface ResortPageHandle {
  /** Re-render imperatively-rendered bits (booking bar) + redraw icons.
   *  Call after the locale changes. */
  refresh: () => void
  /** Open the reservation modal (e.g. from the shared navbar's Book Now). */
  open: (presetHotel?: string | null) => void
  /** Remove window/document listeners and observers. */
  destroy: Cleanup
}

export async function setupResortPage(): Promise<ResortPageHandle> {
  const cleanups: Cleanup[] = []
  const refreshers: Cleanup[] = []
  initReveal(cleanups)
  initCounters(cleanups)
  const openModal = initBooking(cleanups, refreshers)
  initLightbox(cleanups)
  initSpy(cleanups)

  await loadLucide()
  drawIcons()

  return {
    refresh: () => {
      refreshers.forEach((fn) => fn())
      drawIcons()
    },
    open: (presetHotel) => openModal(presetHotel),
    destroy: () => {
      cleanups.forEach((fn) => fn())
      // release any scroll lock the modal/lightbox may have set; the locale
      // (and thus <html dir/lang>) stays owned by vue-i18n.
      document.body.style.overflow = ''
    },
  }
}
