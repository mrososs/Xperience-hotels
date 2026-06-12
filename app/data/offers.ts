// Offers page content — honeymooner packages + book-direct benefits.
// Ported from the design bundle's "Offers.html". Entity content stays
// localized in the data layer (selected via tBi); the page chrome
// (hero, section heads, CTA, fine print) lives in the i18n catalogs
// (offers.*). Unlike most data records (en/ar only), the packages carry
// all five site locales — perks/locations/benefits are translated so
// DE/IT/RU guests read them in their own language. Photography is
// hotlinked from the brand CDN per the design-system note; for
// production, localise into app/assets/.

import type { Bilingual as Bi } from './resorts'

const BANNER = 'https://xperience-hotels.com/wp-content/uploads/slider/cache/'

export const OFFERS_HERO_IMG =
  'https://xperience-hotels.com/wp-content/uploads/2022/10/banner-Xperience-St.-George-Homestay-Leisure.jpg'

/** One honeymooner package card. */
export interface HoneymoonPackage {
  /** Resort detail-page slug (links the "View resort" CTA). */
  slug: string
  /** Full property name — also the booking identifier passed to the modal. */
  fullName: string
  loc: Bi
  img: string
  /** Localized perks list rendered as the of-list. */
  perks: Bi[]
}

const STANDARD_PERKS: Bi[] = [
  {
    en: 'Fruit basket upon arrival',
    ar: 'سلة فواكه عند الوصول',
    de: 'Obstkorb bei der Ankunft',
    it: "Cesto di frutta all'arrivo",
    ru: 'Корзина фруктов по прибытии',
  },
  {
    en: 'Free minibar refill with local beverages, once per day',
    ar: 'إعادة تعبئة الميني بار بالمشروبات المحلية مجانًا، مرة يوميًا',
    de: 'Kostenlose Minibar-Auffüllung mit lokalen Getränken, einmal täglich',
    it: 'Rifornimento gratuito del minibar con bevande locali, una volta al giorno',
    ru: 'Бесплатное пополнение мини-бара местными напитками, один раз в день',
  },
  {
    en: 'Complimentary wedding cake',
    ar: 'كعكة زفاف مجانية',
    de: 'Kostenlose Hochzeitstorte',
    it: 'Torta nuziale omaggio',
    ru: 'Свадебный торт в подарок',
  },
  {
    en: 'Free upgrade to next room category — subject to availability',
    ar: 'ترقية مجانية لفئة الغرفة الأعلى — حسب التوفر',
    de: 'Kostenloses Upgrade in die nächste Zimmerkategorie — je nach Verfügbarkeit',
    it: 'Upgrade gratuito alla categoria di camera superiore — soggetto a disponibilità',
    ru: 'Бесплатное повышение категории номера — при наличии мест',
  },
  {
    en: 'VIP treatment with VIP amenities',
    ar: 'معاملة VIP مع مستلزمات VIP',
    de: 'VIP-Behandlung mit VIP-Annehmlichkeiten',
    it: 'Trattamento VIP con servizi VIP',
    ru: 'VIP-обслуживание с VIP-удобствами',
  },
  {
    en: 'Free candle-lit romantic dinner, once per stay (min. 3 nights)',
    ar: 'عشاء رومانسي على ضوء الشموع مجانًا، مرة خلال الإقامة (٣ ليالٍ كحد أدنى)',
    de: 'Kostenloses romantisches Dinner bei Kerzenschein, einmal pro Aufenthalt (mind. 3 Nächte)',
    it: 'Cena romantica gratuita a lume di candela, una volta per soggiorno (min. 3 notti)',
    ru: 'Бесплатный романтический ужин при свечах, один раз за время проживания (мин. 3 ночи)',
  },
  {
    en: 'Personalised check-in / check-out — subject to availability',
    ar: 'تسجيل وصول ومغادرة شخصي — حسب التوفر',
    de: 'Personalisierter Check-in / Check-out — je nach Verfügbarkeit',
    it: 'Check-in / check-out personalizzato — soggetto a disponibilità',
    ru: 'Индивидуальные заезд и выезд — при наличии мест',
  },
  {
    en: 'Free breakfast service in the room, upon request',
    ar: 'خدمة إفطار مجانية في الغرفة، عند الطلب',
    de: 'Kostenloser Frühstücksservice im Zimmer, auf Anfrage',
    it: 'Servizio colazione in camera gratuito, su richiesta',
    ru: 'Бесплатная подача завтрака в номер, по запросу',
  },
  {
    en: 'Free laundry for 10 pieces during your stay',
    ar: 'غسيل ١٠ قطع مجانًا خلال الإقامة',
    de: 'Kostenlose Wäsche für 10 Teile während Ihres Aufenthalts',
    it: 'Lavanderia gratuita per 10 capi durante il soggiorno',
    ru: 'Бесплатная стирка 10 вещей за время проживания',
  },
]

const KIROSEIZ_PERKS: Bi[] = [
  {
    en: 'Personalised check-in / check-out — subject to availability',
    ar: 'تسجيل وصول ومغادرة شخصي — حسب التوفر',
    de: 'Personalisierter Check-in / Check-out — je nach Verfügbarkeit',
    it: 'Check-in / check-out personalizzato — soggetto a disponibilità',
    ru: 'Индивидуальные заезд и выезд — при наличии мест',
  },
  {
    en: 'Upgrade to the next room type',
    ar: 'ترقية لفئة الغرفة الأعلى',
    de: 'Upgrade in die nächste Zimmerkategorie',
    it: 'Upgrade alla categoria di camera superiore',
    ru: 'Повышение до номера следующей категории',
  },
  {
    en: 'Complimentary wedding cake',
    ar: 'كعكة زفاف مجانية',
    de: 'Kostenlose Hochzeitstorte',
    it: 'Torta nuziale omaggio',
    ru: 'Свадебный торт в подарок',
  },
  {
    en: 'Free minibar refill with local beverages, once per day',
    ar: 'إعادة تعبئة الميني بار بالمشروبات المحلية مجانًا، مرة يوميًا',
    de: 'Kostenlose Minibar-Auffüllung mit lokalen Getränken, einmal täglich',
    it: 'Rifornimento gratuito del minibar con bevande locali, una volta al giorno',
    ru: 'Бесплатное пополнение мини-бара местными напитками, один раз в день',
  },
  {
    en: 'A selection fruit basket, once per stay',
    ar: 'سلة فواكه مختارة، مرة خلال الإقامة',
    de: 'Ein ausgewählter Obstkorb, einmal pro Aufenthalt',
    it: 'Un cesto di frutta selezionata, una volta per soggiorno',
    ru: 'Корзина отборных фруктов, один раз за время проживания',
  },
  {
    en: 'A full laundry bag, once per stay',
    ar: 'حقيبة غسيل كاملة، مرة خلال الإقامة',
    de: 'Eine volle Wäschetasche, einmal pro Aufenthalt',
    it: 'Un sacco di biancheria completo, una volta per soggiorno',
    ru: 'Полный мешок белья для стирки, один раз за время проживания',
  },
]

const LOC_NAAMA: Bi = {
  en: 'Naama Bay · Sharm El Sheikh',
  ar: 'خليج نعمة · شرم الشيخ',
  de: 'Naama Bay · Sharm El Sheikh',
  it: 'Naama Bay · Sharm El Sheikh',
  ru: 'Наама-Бей · Шарм-эль-Шейх',
}

export const HONEYMOON_PACKAGES: HoneymoonPackage[] = [
  {
    slug: 'sea-breeze',
    fullName: 'Xperience Sea Breeze Resort',
    loc: LOC_NAAMA,
    img: BANNER + 'ced3cd2f6471216ad8e91298c69ba96a/banner-Xperience-Sea-Breeze-Resort-main.jpg',
    perks: STANDARD_PERKS,
  },
  {
    slug: 'st-george-homestay',
    fullName: 'Xperience St. George Homestay',
    loc: {
      en: "Sharm's Hill · Sharm El Sheikh",
      ar: 'تل شرم · شرم الشيخ',
      de: "Sharm's Hill · Sharm El Sheikh",
      it: "Sharm's Hill · Sharm El Sheikh",
      ru: 'Шармс-Хилл · Шарм-эль-Шейх',
    },
    img: BANNER + '427b2bd57ef465f1c14fc296d8dcdfe8/banner-Xperience-St.-George-Homestay-new-2.jpg',
    perks: STANDARD_PERKS,
  },
  {
    slug: 'kiroseiz-premier',
    fullName: 'Xperience Kiroseiz Premier',
    loc: {
      en: 'Aqua Park · Sharm El Sheikh',
      ar: 'أكوا بارك · شرم الشيخ',
      de: 'Aqua Park · Sharm El Sheikh',
      it: 'Aqua Park · Sharm El Sheikh',
      ru: 'Аква Парк · Шарм-эль-Шейх',
    },
    img: BANNER + 'f0c339cc26dd975c1327cd453bb7941b/banner-Xperience-Kiroseiz-Premier-new-3.jpg',
    perks: KIROSEIZ_PERKS,
  },
  {
    slug: 'kiroseiz-parkland',
    fullName: 'Xperience Kiroseiz Parkland',
    loc: LOC_NAAMA,
    img: BANNER + 'b5ded7d6fdb6862b173a92ee1744b647/banner-Xperience-Kiroseiz-Parkland-new.jpg',
    perks: KIROSEIZ_PERKS,
  },
]

/** "Book direct" benefit tiles (x-benefit layout). */
export interface BookDirectBenefit {
  icon: string
  label: Bi
}

export const BOOK_DIRECT_BENEFITS: BookDirectBenefit[] = [
  {
    icon: 'crown',
    label: {
      en: 'VIP treatment',
      ar: 'معاملة VIP',
      de: 'VIP-Behandlung',
      it: 'Trattamento VIP',
      ru: 'VIP-обслуживание',
    },
  },
  {
    icon: 'shirt',
    label: {
      en: '10% off laundry',
      ar: 'خصم 10% على الغسيل',
      de: '10% Rabatt auf Wäsche',
      it: '10% di sconto sulla lavanderia',
      ru: 'Скидка 10% на стирку',
    },
  },
  {
    icon: 'flower-2',
    label: {
      en: '10% off spa',
      ar: 'خصم 10% على السبا',
      de: '10% Rabatt auf Spa',
      it: '10% di sconto sulla spa',
      ru: 'Скидка 10% на спа',
    },
  },
  {
    icon: 'anchor',
    label: {
      en: '10% off diving',
      ar: 'خصم 10% على الغوص',
      de: '10% Rabatt auf Tauchen',
      it: '10% di sconto sulle immersioni',
      ru: 'Скидка 10% на дайвинг',
    },
  },
  {
    icon: 'utensils',
    label: {
      en: '10% off à la carte',
      ar: 'خصم 10% على المطاعم',
      de: '10% Rabatt auf à la carte',
      it: '10% di sconto à la carte',
      ru: 'Скидка 10% на меню à la carte',
    },
  },
  {
    icon: 'clock',
    label: {
      en: 'Early in · Late out',
      ar: 'وصول مبكر · مغادرة متأخرة',
      de: 'Früher Check-in · Später Check-out',
      it: 'Check-in anticipato · Check-out posticipato',
      ru: 'Ранний заезд · Поздний выезд',
    },
  },
]
