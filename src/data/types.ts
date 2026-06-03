// Domain contracts for the landing feature.
// Kept separate from content.ts so components import types without
// pulling in data (and vice-versa).

export interface Resort {
  name: string
  area: string
  img: string
  desc: string
  /** Detail-page slug (links the card to /resorts/:slug). */
  slug?: string
  /** Arabic translations (rendered when the locale is `ar`). */
  areaAr?: string
  descAr?: string
}

export interface Benefit {
  icon: string
  label: string
  labelAr?: string
}

export interface Social {
  name: 'facebook' | 'instagram' | 'youtube' | 'linkedin' | 'twitter'
  href: string
}

export interface FooterColumn {
  h: string
  items: string[]
}

export interface BookingParty {
  hotel: string
  rooms: number
  adults: number
  children: number
}

export interface BookingSelection {
  resort: Resort | null
  party: BookingParty | null
}
