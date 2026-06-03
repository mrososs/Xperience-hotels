// Real Xperience Hotels brand content (static data).
// Types live in ./types. Photography is hotlinked from the brand CDN
// (per the design-system note); for production, localise into src/assets/.

import type { Benefit, FooterColumn, Resort, Social } from './types'

export const NAV = ['Home', 'Our Resorts', 'Meetings & Events', 'About Us', 'Contact Us']

const BANNER = 'https://xperience-hotels.com/wp-content/uploads/slider/cache/'

export const HERO_IMG =
  BANNER + 'ced3cd2f6471216ad8e91298c69ba96a/banner-Xperience-Sea-Breeze-Resort-main.jpg'

export const HOTELS: string[] = [
  'Xperience Sea Breeze Resort',
  'Xperience Kiroseiz Parkland',
  'Xperience Kiroseiz Premier',
  'Xperience St. George Homestay',
  'Xperience Hill Top Beach',
  'Xperience Golden Sandy Beach',
]

export const RESORTS: Resort[] = [
  {
    name: 'Xperience Sea Breeze Resort',
    area: 'Naama Bay',
    areaAr: 'خليج نعمة',
    slug: 'sea-breeze',
    img: BANNER + 'ced3cd2f6471216ad8e91298c69ba96a/banner-Xperience-Sea-Breeze-Resort-main.jpg',
    desc: 'Luxury and comfort in specially designed spaces that combine the charm of the Red Sea with the appeal of contemporary design.',
    descAr: 'فخامة وراحة في مساحات مصممة بعناية تجمع بين سحر البحر الأحمر وجاذبية التصميم المعاصر.',
  },
  {
    name: 'Xperience Kiroseiz Parkland',
    area: 'Naama Bay',
    areaAr: 'خليج نعمة',
    slug: 'kiroseiz-parkland',
    img: BANNER + 'b5ded7d6fdb6862b173a92ee1744b647/banner-Xperience-Kiroseiz-Parkland-new.jpg',
    desc: 'The ultimate hospitality experience for you and your family, with exceptional luxury services and facilities for adults and kids.',
    descAr: 'تجربة الضيافة المثالية لك ولعائلتك، مع خدمات ومرافق فاخرة استثنائية للكبار والأطفال.',
  },
  {
    name: 'Xperience Kiroseiz Premier',
    area: 'Naama Bay · Aqua Park',
    areaAr: 'خليج نعمة · أكوا بارك',
    slug: 'kiroseiz-premier',
    img: BANNER + 'f0c339cc26dd975c1327cd453bb7941b/banner-Xperience-Kiroseiz-Premier-new-3.jpg',
    desc: 'A family-friendly resort with a 21-slide Premiere Aqua Park, a wide range of accommodation, and a relaxed atmosphere.',
    descAr: 'منتجع مناسب للعائلات مع أكوا بارك يضم 21 منزلقًا مائيًا، ومجموعة واسعة من خيارات الإقامة وأجواء مريحة.',
  },
  {
    name: 'Xperience St. George Homestay',
    area: "Sharm's Hill",
    areaAr: 'تلة شرم',
    slug: 'st-george-homestay',
    img: BANNER + '427b2bd57ef465f1c14fc296d8dcdfe8/banner-Xperience-St.-George-Homestay-new-2.jpg',
    desc: "Set on Sharm El Sheikh's tranquil hill, combining a spectacular cozy atmosphere with an exclusive experience.",
    descAr: 'يقع على تلة شرم الشيخ الهادئة، ويجمع بين أجواء دافئة آسرة وتجربة حصرية.',
  },
  {
    name: 'Xperience Hill Top Beach',
    area: 'Hill-Top Reef',
    areaAr: 'شعاب هيل توب',
    slug: 'hill-top-beach',
    img: BANNER + '29d4f385b4ee9c95d1a605e28e385298/banner-Xperience-hill-top-new.jpg',
    desc: 'An ideal mix of value, comfort and convenience — accommodation with a restaurant and free private parking.',
    descAr: 'مزيج مثالي من القيمة والراحة والملاءمة — إقامة مع مطعم وموقف خاص مجاني.',
  },
  {
    name: 'Xperience Golden Sandy Beach',
    area: 'Sharm El-Maia',
    areaAr: 'شرم المايا',
    slug: 'golden-sandy-beach',
    img: BANNER + '8e0bd9dcb7902f2265ad2804b336e9e8/banner-Xperience-Sandy-Beach-Resor-newt.jpg',
    desc: 'A private beach area and garden in Sharm El-Maia, on Dusti Road, Ras Umm Sid — relaxed days by the Red Sea.',
    descAr: 'منطقة شاطئ خاص وحديقة في شرم المايا، على طريق دوستي، رأس أم السيد — أيام مريحة على البحر الأحمر.',
  },
]

export const BENEFITS: Benefit[] = [
  { icon: 'crown', label: 'VIP Treatment', labelAr: 'معاملة VIP' },
  { icon: 'shirt', label: '10% off laundry', labelAr: 'خصم 10% على المغسلة' },
  { icon: 'flower-2', label: '10% off Spa', labelAr: 'خصم 10% على السبا' },
  { icon: 'anchor', label: '10% off diving center', labelAr: 'خصم 10% على مركز الغوص' },
  { icon: 'utensils', label: '10% off à la carte', labelAr: 'خصم 10% على المطاعم' },
  { icon: 'clock', label: 'Early check-in · late check-out', labelAr: 'وصول مبكر · مغادرة متأخرة' },
]

export const HONEYMOON_IMG =
  'https://xperience-hotels.com/wp-content/uploads/2023/06/Honeymooner-Packages-Xperience-hotels-egypt-new-1.jpg'

export const HONEYMOON: { en: string; ar: string }[] = [
  { en: 'Fruit basket upon arrival', ar: 'سلة فواكه عند الوصول' },
  { en: 'Daily minibar refill with local beverages', ar: 'تعبئة يومية للميني بار بالمشروبات المحلية' },
  { en: 'Complimentary wedding cake', ar: 'كعكة زفاف مجانية' },
  { en: 'Free upgrade to the next room category*', ar: 'ترقية مجانية لفئة الغرفة التالية*' },
  { en: 'VIP treatment with VIP amenities', ar: 'معاملة VIP مع مستلزمات VIP' },
  { en: 'Candle-lit romantic dinner once per stay*', ar: 'عشاء رومانسي على ضوء الشموع مرة واحدة لكل إقامة*' },
  { en: 'Personalized check-in & check-out*', ar: 'تسجيل وصول ومغادرة مخصص*' },
  { en: 'In-room breakfast on request · 10 pieces of free laundry', ar: 'إفطار بالغرفة عند الطلب · 10 قطع غسيل مجانية' },
]

export const AWARDS = [
  'https://xperience-hotels.com/wp-content/uploads/2022/12/footer-awards-hotels-w.png',
  'https://xperience-hotels.com/wp-content/uploads/2022/12/footer-awards-tripadvisor-w.png',
  'https://xperience-hotels.com/wp-content/uploads/2022/12/footer-awards-food-w.png',
  'https://xperience-hotels.com/wp-content/uploads/2022/12/footer-awards-travelife-w.png',
]

// Scrolling marquee of awards & certifications shown on the landing page.
// `icon` is a lucide key resolved in AwardsMarquee.vue; text is bilingual.
export const AWARD_MARQUEE: { icon: string; en: string; ar: string }[] = [
  { icon: 'leaf', en: 'Travelife Gold — Sustainability', ar: 'ترافيلايف جولد — الاستدامة' },
  {
    icon: 'award',
    en: 'Hotels.com — Guests Rated “Very Good”',
    ar: 'هوتيلز.كوم — تقييم النزلاء «جيد جدًا»',
  },
  { icon: 'star', en: "Tripadvisor Travellers' Choice 2022", ar: 'اختيار المسافرين من تريب أدفايزر 2022' },
  { icon: 'utensils', en: 'Preverisk — Food Safety Certified', ar: 'بريفيريسك — معتمد لسلامة الغذاء' },
  { icon: 'shield-check', en: 'Preverisk — Health & Hygiene', ar: 'بريفيريسك — الصحة والنظافة' },
  { icon: 'building-2', en: 'Member of Kiroseiz Group', ar: 'عضو في مجموعة كيروسيز' },
]

// ---------------------------------------------------------------------
// AWARDS PAGE (/awards) — certification bodies + awards grouped by resort.
// Logos are hotlinked from the brand CDN (per the design-system note).
// ---------------------------------------------------------------------
const AW_IMG = {
  travelife: 'https://xperience-hotels.com/wp-content/uploads/2022/12/awards-travellife.jpg',
  hotels: 'https://xperience-hotels.com/wp-content/uploads/2022/12/awards-hotels.com_.jpg',
  tripadvisor: 'https://xperience-hotels.com/wp-content/uploads/2022/12/awards-tripadvisor.jpg',
  foodSafety: 'https://xperience-hotels.com/wp-content/uploads/2022/12/awards-food-safety.jpg',
}

export const AWARD_HERO_IMG = 'https://xperience-hotels.com/wp-content/uploads/2022/10/banner-temp-1.jpg'

// The "Certified by" body strip.
export const AWARD_MARKS: { img: string; label: string }[] = [
  { img: AW_IMG.travelife, label: 'Travelife Gold' },
  { img: AW_IMG.hotels, label: 'Hotels.com' },
  { img: AW_IMG.tripadvisor, label: 'Tripadvisor' },
  { img: AW_IMG.foodSafety, label: 'Preverisk Group' },
]

export interface AwardItem {
  img: string
  source: string
  title: string
  desc: { en: string; ar: string }
}
export interface AwardResortGroup {
  name: string
  slug: string
  awards: AwardItem[]
}

const A = {
  travelifeGold: {
    img: AW_IMG.travelife,
    source: 'Travelife',
    title: 'Travelife Gold',
    desc: { en: 'Gold Certified for Accommodation Sustainability.', ar: 'شهادة ذهبية لاستدامة الإقامة.' },
  } as AwardItem,
  hotelsVeryGood: {
    img: AW_IMG.hotels,
    source: 'Hotels.com',
    title: 'Guests Rated “Very Good”',
    desc: {
      en: 'Recognised by our guests for an outstanding stay.',
      ar: 'تقدير من نزلائنا على إقامة متميّزة.',
    },
  } as AwardItem,
  tripadvisorChoice: {
    img: AW_IMG.tripadvisor,
    source: 'Tripadvisor · 2022',
    title: "Travellers' Choice",
    desc: {
      en: 'Among the top-rated stays chosen by travellers.',
      ar: 'ضمن الأعلى تقييمًا باختيار المسافرين.',
    },
  } as AwardItem,
}

export const AWARDS_BY_RESORT: AwardResortGroup[] = [
  {
    name: 'Xperience Sea Breeze Resort',
    slug: 'sea-breeze',
    awards: [
      A.travelifeGold,
      A.hotelsVeryGood,
      A.tripadvisorChoice,
      {
        img: AW_IMG.foodSafety,
        source: 'Preverisk · 2022',
        title: 'Food Safety Certificate',
        desc: {
          en: 'International Advanced System for food safety.',
          ar: 'النظام الدولي المتقدّم لسلامة الغذاء.',
        },
      },
      {
        img: AW_IMG.foodSafety,
        source: 'Preverisk',
        title: 'Health & Hygiene',
        desc: { en: 'Covid-19 Hygiene Response certification.', ar: 'شهادة الاستجابة الصحية لكوفيد-19.' },
      },
      {
        img: AW_IMG.foodSafety,
        source: 'Preverisk',
        title: 'Legionella Prevention',
        desc: {
          en: 'Certified water-safety & Legionella prevention.',
          ar: 'شهادة سلامة المياه والوقاية من الليجيونيلا.',
        },
      },
    ],
  },
  {
    name: 'Xperience Kiroseiz Parkland',
    slug: 'kiroseiz-parkland',
    awards: [A.travelifeGold, A.tripadvisorChoice],
  },
  {
    name: 'Xperience St. George Homestay',
    slug: 'st-george-homestay',
    awards: [A.hotelsVeryGood, A.travelifeGold],
  },
]

// The landing marquee links here; the brand site is the external fallback.
export const AWARDS_URL = '/awards'

export const SOCIAL: Social[] = [
  { name: 'facebook', href: 'https://www.facebook.com/pages/Xperience-Egypt/183528368351249' },
  { name: 'instagram', href: 'https://www.instagram.com/xperienceegypt/' },
  { name: 'youtube', href: 'https://www.youtube.com/channel/UCpdoVN5e1NJqnZ83X4lgeEA' },
  { name: 'linkedin', href: 'http://www.linkedin.com/company/xperience-hospitality-management' },
  { name: 'twitter', href: 'http://twitter.com/Xperience_Egypt' },
]

export const FOOTER_COLS: FooterColumn[] = [
  { h: 'Explore', items: ['Home', 'Our Resorts', 'Offers', 'News', 'Awards'] },
  { h: 'Company', items: ['About Us', 'Meetings & Events', 'Contact Us', 'Travel Agents', 'Careers'] },
]
