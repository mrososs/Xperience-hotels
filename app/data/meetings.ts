// Meetings & Events page content (Xperience Kiroseiz Parkland).
// Ported from the design bundle's "Meetings & Events.html" — entity
// content stays bilingual in the data layer (selected via tBi); UI
// strings live in the i18n catalogs (meetingsPage.*).
// Photography is hotlinked from the brand CDN (per the design-system
// note); for production, localise into src/assets/.

import type { Bilingual as Bi } from './resorts'

export const MEETINGS_HERO_IMG =
  'https://xperience-hotels.com/wp-content/uploads/2022/10/banner-Xperience-Kiroseiz-Premier-events.jpg'

export const BALLROOM_IMG =
  'https://xperience-hotels.com/wp-content/uploads/2023/04/conference-facilities1.jpg'

const BANNER = 'https://xperience-hotels.com/wp-content/uploads/slider/cache/'

export const WEDDINGS_IMG =
  BANNER + 'b5ded7d6fdb6862b173a92ee1744b647/banner-Xperience-Kiroseiz-Parkland-new.jpg'

/** Hero fact chips. */
export interface MeetingsFact {
  icon: string
  text: Bi
}

export const MEETINGS_FACTS: MeetingsFact[] = [
  { icon: 'users', text: { en: 'Up to 270 guests', ar: 'حتى 270 ضيفًا' } },
  { icon: 'presentation', text: { en: 'Grand ballroom', ar: 'قاعة كبرى' } },
  { icon: 'utensils', text: { en: 'Full catering', ar: 'تموين كامل' } },
  { icon: 'sparkles', text: { en: 'Event planning', ar: 'تنظيم الفعاليات' } },
]

/** "At a glance" aside list. */
export const MEETINGS_QUICK: MeetingsFact[] = [
  { icon: 'users', text: { en: 'Ballroom up to 270 guests', ar: 'قاعة حتى 270 ضيفًا' } },
  { icon: 'presentation', text: { en: 'Theatre · U-shape · classroom · gala', ar: 'مسرح · حرف U · صفّي · غالا' } },
  { icon: 'utensils', text: { en: 'Full in-house catering', ar: 'تموين داخلي كامل' } },
  { icon: 'projector', text: { en: 'AV, staging & lighting', ar: 'صوتيات ومرئيات وإضاءة' } },
  { icon: 'sparkles', text: { en: 'Dedicated event planners', ar: 'منظّمو فعاليات متخصصون' } },
]

/** Ballroom spec tiles (value is bilingual: "Full" / "كامل"). */
export interface BallroomSpec {
  icon: string
  value: Bi
  label: Bi
}

export const BALLROOM_SPECS: BallroomSpec[] = [
  { icon: 'users', value: { en: '270', ar: '270' }, label: { en: 'Max capacity', ar: 'السعة القصوى' } },
  { icon: 'layout-grid', value: { en: '4', ar: '4' }, label: { en: 'Seating layouts', ar: 'ترتيبات الجلوس' } },
  { icon: 'utensils', value: { en: '100%', ar: '100%' }, label: { en: 'In-house catering', ar: 'تموين داخلي' } },
  { icon: 'projector', value: { en: 'Full', ar: 'كامل' }, label: { en: 'AV & staging', ar: 'صوتيات ومنصّات' } },
]

/** "What we host" cards (h-dine layout). */
export interface EventType {
  img: string
  tag: Bi
  name: Bi
  icon: string
  meta: Bi
}

export const EVENT_TYPES: EventType[] = [
  {
    img: BALLROOM_IMG,
    tag: { en: 'Business', ar: 'أعمال' },
    name: { en: 'Meetings & Conferences', ar: 'الاجتماعات والمؤتمرات' },
    icon: 'presentation',
    meta: { en: 'Theatre · classroom · U-shape', ar: 'مسرح · صفّي · حرف U' },
  },
  {
    img: WEDDINGS_IMG,
    tag: { en: 'Celebrations', ar: 'احتفالات' },
    name: { en: 'Weddings & Occasions', ar: 'الأفراح والمناسبات' },
    icon: 'heart',
    meta: { en: 'Weddings · anniversaries', ar: 'أفراح · ذكرى سنوية' },
  },
  {
    img: BANNER + 'ced3cd2f6471216ad8e91298c69ba96a/banner-Xperience-Sea-Breeze-Resort-main.jpg',
    tag: { en: 'Dining', ar: 'مآدب' },
    name: { en: 'Banquets & Gala', ar: 'المآدب والغالا' },
    icon: 'utensils',
    meta: { en: 'Gala dinners · receptions', ar: 'عشاء غالا · حفلات استقبال' },
  },
]

/** Ballroom seating setups — feeds both the cards and the capacity table. */
export interface BallroomSetup {
  icon: string
  seats: number
  label: Bi
  rowLabel: Bi
}

export const BALLROOM_SETUPS: BallroomSetup[] = [
  {
    icon: 'presentation',
    seats: 242,
    label: { en: 'Theatre', ar: 'مسرح' },
    rowLabel: { en: 'Theatre seats', ar: 'مقاعد المسرح' },
  },
  {
    icon: 'armchair',
    seats: 112,
    label: { en: 'Gala style', ar: 'طراز غالا' },
    rowLabel: { en: 'Gala style', ar: 'طراز غالا' },
  },
  {
    icon: 'square-equal',
    seats: 63,
    label: { en: 'U-shape', ar: 'حرف U' },
    rowLabel: { en: 'U-shape seats', ar: 'مقاعد حرف U' },
  },
  {
    icon: 'graduation-cap',
    seats: 60,
    label: { en: 'Classroom', ar: 'صفّي' },
    rowLabel: { en: 'Classroom seats', ar: 'مقاعد صفّية' },
  },
]

/** Weddings band highlight tiles. */
export interface WeddingHighlight {
  icon: string
  title: Bi
  sub: Bi
}

export const WEDDING_HIGHLIGHTS: WeddingHighlight[] = [
  {
    icon: 'heart',
    title: { en: 'Weddings', ar: 'حفلات الزفاف' },
    sub: { en: 'Tailored to your day', ar: 'مُفصّلة ليومك' },
  },
  {
    icon: 'cake',
    title: { en: 'Anniversaries', ar: 'الذكرى السنوية' },
    sub: { en: 'Intimate celebrations', ar: 'احتفالات حميمة' },
  },
  {
    icon: 'clipboard-list',
    title: { en: 'Full planning', ar: 'تخطيط متكامل' },
    sub: { en: 'Start to finish', ar: 'من البداية للنهاية' },
  },
  {
    icon: 'utensils',
    title: { en: 'Bespoke catering', ar: 'تموين مخصّص' },
    sub: { en: 'Menus your way', ar: 'قوائم على ذوقك' },
  },
]

/** "What's included" service tiles (h-facil layout). */
export const MEETINGS_SERVICES: MeetingsFact[] = [
  { icon: 'presentation', text: { en: 'Grand ballroom', ar: 'قاعة كبرى' } },
  { icon: 'projector', text: { en: 'AV & projection', ar: 'صوتيات وعرض' } },
  { icon: 'mic', text: { en: 'Sound & staging', ar: 'صوت ومنصّات' } },
  { icon: 'utensils', text: { en: 'Catering services', ar: 'خدمات التموين' } },
  { icon: 'clipboard-list', text: { en: 'Event planners', ar: 'منظّمو فعاليات' } },
  { icon: 'layout-grid', text: { en: 'Flexible layouts', ar: 'ترتيبات مرنة' } },
  { icon: 'wifi', text: { en: 'High-speed Wi-Fi', ar: 'واي فاي عالي السرعة' } },
  { icon: 'concierge-bell', text: { en: 'Dedicated host', ar: 'مضيف مخصّص' } },
]

/** Enquiry form options. */
export const ENQUIRY_EVENT_TYPES: Bi[] = [
  { en: 'Conference / meeting', ar: 'مؤتمر / اجتماع' },
  { en: 'Wedding', ar: 'حفل زفاف' },
  { en: 'Gala dinner / banquet', ar: 'عشاء غالا / مأدبة' },
  { en: 'Private celebration', ar: 'احتفال خاص' },
]

export const ENQUIRY_GUEST_RANGES: Bi[] = [
  { en: '1 – 50', ar: '١ – ٥٠' },
  { en: '51 – 120', ar: '٥١ – ١٢٠' },
  { en: '121 – 200', ar: '١٢١ – ٢٠٠' },
  { en: '201 – 270', ar: '٢٠١ – ٢٧٠' },
]
