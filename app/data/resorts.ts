// =====================================================================
// XPERIENCE HOTELS — resort content (bilingual EN/AR)
// One record per Red Sea resort. The resort detail page (ResortDetail.vue)
// is a single dynamic template rendered from these records; the section
// blocks that don't differ per property (rooms layout, dining, facilities,
// activities, reviews) are shared templates parameterised by each resort's
// imagery, name and base price.
// =====================================================================

export interface Bilingual {
  en: string
  ar: string
  // Optional wider-locale translations. When absent, tBi() falls back to
  // `en` — so en/ar-only records keep their existing behaviour while data
  // that needs all five locales (e.g. the offers packages) can supply them.
  de?: string
  it?: string
  ru?: string
}

export interface QuickFact {
  icon: string
  text: Bilingual
}
export interface RoomType {
  name: Bilingual
  size: string
  guests: number
  badge?: Bilingual
  feats: Bilingual[]
  price: number
  img: string
}
export interface DiningVenue {
  tag: Bilingual
  name: Bilingual
  hours: Bilingual
  img: string
}
export interface Activity {
  icon: string
  title: Bilingual
  sub: Bilingual
}
export interface Facility {
  icon: string
  label: Bilingual
}
export interface Review {
  text: Bilingual
  initial: string
  name: string
  who: Bilingual
}
export interface RatingBar {
  label: Bilingual
  pct: number
}
// --- partial hotel-page sections (Spa / Meetings / Weddings / Offers) ---
// Each is a discrete typed field on `Resort` so a future headless-CMS story
// maps to it field-for-field (the CMS seam stays in useResortContent.ts).
export interface SpaTreatment {
  icon: string
  name: Bilingual
  desc: Bilingual
  duration: Bilingual
}
export interface SpaSection {
  img: string
  treatments: SpaTreatment[]
}
export interface MeetingSpec {
  icon: string
  value: Bilingual
  label: Bilingual
}
/** Per-hotel teaser that links out to the site-level /meetings-events page. */
export interface MeetingsTeaser {
  img: string
  specs: MeetingSpec[]
}
export interface WeddingHighlight {
  icon: string
  title: Bilingual
  sub: Bilingual
}
export interface WeddingsSection {
  img: string
  highlights: WeddingHighlight[]
}
export interface OfferBenefit {
  icon: string
  label: Bilingual
}
/** Per-hotel teaser that links out to the site-level /offers page. */
export interface OffersTeaser {
  img: string
  benefits: OfferBenefit[]
}

export interface Resort {
  slug: string
  /** Display name shown after the "Xperience" wordmark. */
  name: Bilingual
  /** Full property name used as the booking identifier. */
  fullName: string
  area: Bilingual
  heroLines: [string, string]
  blurb: Bilingual
  hero: string
  gallery: string[]
  intro: Bilingual
  introExtra: Bilingual
  priceFrom: number
  quick: QuickFact[]
  rooms: RoomType[]
  dining: DiningVenue[]
  activities: Activity[]
  facilities: Facility[]
  spa: SpaSection
  meetings: MeetingsTeaser
  weddings: WeddingsSection
  offer: OffersTeaser
  ratingScore: string
  ratingCount: Bilingual
  /** Numeric verified-stay count — feeds the JSON-LD aggregateRating. */
  reviewCount: number
  ratingBars: RatingBar[]
  reviews: Review[]
  address: string
  phone: string
  mapPinLabel: string
  /** Geo coordinates for the Leaflet map, Google Maps directions & JSON-LD geo. */
  coords: GeoCoords
}

/** Latitude / longitude of the property (WGS-84). */
export interface GeoCoords {
  lat: number
  lng: number
}

const BANNER = 'https://xperience-hotels.com/wp-content/uploads/slider/cache/'
const IMG = {
  seaBreeze: BANNER + 'ced3cd2f6471216ad8e91298c69ba96a/banner-Xperience-Sea-Breeze-Resort-main.jpg',
  parkland: BANNER + 'b5ded7d6fdb6862b173a92ee1744b647/banner-Xperience-Kiroseiz-Parkland-new.jpg',
  premier: BANNER + 'f0c339cc26dd975c1327cd453bb7941b/banner-Xperience-Kiroseiz-Premier-new-3.jpg',
  george: BANNER + '427b2bd57ef465f1c14fc296d8dcdfe8/banner-Xperience-St.-George-Homestay-new-2.jpg',
  hilltop: BANNER + '29d4f385b4ee9c95d1a605e28e385298/banner-Xperience-hill-top-new.jpg',
  sandy: BANNER + '8e0bd9dcb7902f2265ad2804b336e9e8/banner-Xperience-Sandy-Beach-Resor-newt.jpg',
}

// ---------------------------------------------------------------------
// SHARED SECTION TEMPLATES (parameterised per resort)
// ---------------------------------------------------------------------
function rooms(g: string[], base: number): RoomType[] {
  const first = g[0] ?? ''
  return [
    {
      name: { en: 'Superior Room', ar: 'غرفة سوبيريور' },
      size: '28 m²',
      guests: 2,
      badge: { en: 'Popular', ar: 'الأكثر طلبًا' },
      price: base,
      img: first,
      feats: [
        { en: 'Garden or pool view', ar: 'إطلالة حديقة أو مسبح' },
        { en: 'Private balcony', ar: 'شرفة خاصة' },
        { en: 'Free Wi-Fi & A/C', ar: 'واي فاي وتكييف مجاني' },
      ],
    },
    {
      name: { en: 'Deluxe Sea View', ar: 'ديلوكس بإطلالة بحرية' },
      size: '34 m²',
      guests: 3,
      price: base + 35,
      img: g[1] ?? first,
      feats: [
        { en: 'Direct Red Sea view', ar: 'إطلالة مباشرة على البحر' },
        { en: 'Balcony & lounge chair', ar: 'شرفة وكرسي استرخاء' },
        { en: 'Premium bedding', ar: 'مفروشات فاخرة' },
      ],
    },
    {
      name: { en: 'Family Suite', ar: 'جناح عائلي' },
      size: '52 m²',
      guests: 4,
      badge: { en: 'Family', ar: 'عائلية' },
      price: base + 90,
      img: g[2] ?? first,
      feats: [
        { en: 'Two connected rooms', ar: 'غرفتان متصلتان' },
        { en: 'Separate living area', ar: 'منطقة معيشة منفصلة' },
        { en: 'Kids amenities', ar: 'مستلزمات للأطفال' },
      ],
    },
  ]
}

function dining(g: string[]): DiningVenue[] {
  const first = g[0] ?? ''
  return [
    {
      tag: { en: 'Buffet · International', ar: 'بوفيه · عالمي' },
      name: { en: 'The Main Restaurant', ar: 'المطعم الرئيسي' },
      hours: { en: 'Breakfast · Lunch · Dinner', ar: 'إفطار · غداء · عشاء' },
      img: g[3] ?? first,
    },
    {
      tag: { en: 'À la carte · Grill', ar: 'أطباق · مشويات' },
      name: { en: 'Beach Bar & Grill', ar: 'بار ومشاوي الشاطئ' },
      hours: { en: '10:00 — 18:00', ar: '10:00 — 18:00' },
      img: g[4] ?? first,
    },
    {
      tag: { en: 'Café · Lounge', ar: 'كافيه · صالة' },
      name: { en: 'Lobby Lounge & Café', ar: 'صالة وكافيه اللوبي' },
      hours: { en: 'Open 24 hours', ar: 'مفتوح 24 ساعة' },
      img: g[1] ?? first,
    },
  ]
}

const ACTIVITIES: Activity[] = [
  {
    icon: 'music',
    title: { en: 'Live entertainment', ar: 'عروض حية' },
    sub: { en: 'Nightly shows & animation', ar: 'عروض وأنيميشن كل ليلة' },
  },
  {
    icon: 'anchor',
    title: { en: 'Dive & snorkel', ar: 'غوص وسنوركل' },
    sub: { en: 'On-site dive center', ar: 'مركز غوص بالموقع' },
  },
  {
    icon: 'droplets',
    title: { en: 'Pools & terraces', ar: 'مسابح وتراسات' },
    sub: { en: 'Outdoor pools & sun decks', ar: 'مسابح خارجية وأسطح شمسية' },
  },
  {
    icon: 'volleyball',
    title: { en: 'Beach & sports', ar: 'شاطئ ورياضة' },
    sub: { en: 'Water sports & beach games', ar: 'رياضات مائية وألعاب شاطئية' },
  },
]

const FACILITIES: Facility[] = [
  { icon: 'waves', label: { en: 'Private beach', ar: 'شاطئ خاص' } },
  { icon: 'droplets', label: { en: 'Outdoor pools', ar: 'مسابح خارجية' } },
  { icon: 'flower-2', label: { en: 'Spa & wellness', ar: 'سبا وعافية' } },
  { icon: 'anchor', label: { en: 'Dive center', ar: 'مركز غوص' } },
  { icon: 'baby', label: { en: 'Kids club', ar: 'نادي الأطفال' } },
  { icon: 'dumbbell', label: { en: 'Fitness center', ar: 'صالة رياضية' } },
  { icon: 'wifi', label: { en: 'Free Wi-Fi', ar: 'واي فاي مجاني' } },
  { icon: 'utensils', label: { en: 'Restaurants & bars', ar: 'مطاعم وبارات' } },
  { icon: 'car', label: { en: 'Free parking', ar: 'موقف مجاني' } },
  { icon: 'plane', label: { en: 'Airport transfer', ar: 'نقل من المطار' } },
  { icon: 'music', label: { en: 'Animation team', ar: 'فريق أنيميشن' } },
  { icon: 'concierge-bell', label: { en: '24h reception', ar: 'استقبال 24 ساعة' } },
]

// ---------------------------------------------------------------------
// REVIEWS — per-hotel MOCK data (placeholder until the TripAdvisor / live
// review feed is integrated — see REQUIREMENTS-STATUS 3.10 / 6.9). Each
// resort carries its own rating breakdown, review count and guest quotes
// so the cards feel real per property. When the live feed lands, only
// REVIEWS_BY_SLUG (and the numeric counts) get replaced — the resort page
// already renders straight from resort.reviews / ratingBars / ratingCount.
// ---------------------------------------------------------------------
interface ResortReviews {
  /** Total verified-stay count (feeds the label + JSON-LD reviewCount). */
  count: number
  bars: RatingBar[]
  reviews: Review[]
}

/** The four rating sliders — same labels everywhere, percentages per hotel. */
function bars(location: number, service: number, cleanliness: number, value: number): RatingBar[] {
  return [
    { label: { en: 'Location', ar: 'الموقع' }, pct: location },
    { label: { en: 'Service', ar: 'الخدمة' }, pct: service },
    { label: { en: 'Cleanliness', ar: 'النظافة' }, pct: cleanliness },
    { label: { en: 'Value', ar: 'القيمة' }, pct: value },
  ]
}

/** Bilingual "Based on N verified stays" label (Western digits in both). */
function stays(n: number): Bilingual {
  const s = n.toLocaleString('en-US')
  return { en: `Based on ${s} verified stays`, ar: `بناءً على ${s} إقامة موثّقة` }
}

const REVIEWS_BY_SLUG: Record<string, ResortReviews> = {
  'sea-breeze': {
    count: 1240,
    bars: bars(96, 92, 90, 88),
    reviews: [
      {
        initial: 'M',
        name: 'Mariam H.',
        who: { en: 'Family stay · Cairo', ar: 'إقامة عائلية · القاهرة' },
        text: {
          en: '"The beach was steps from our room and the staff treated our kids like royalty. The evening shows were a highlight every night."',
          ar: '«الشاطئ على بُعد خطوات من غرفتنا، والموظفون عاملوا أطفالنا كالملوك. كانت العروض المسائية متعة كل ليلة.»',
        },
      },
      {
        initial: 'A',
        name: 'Andreas K.',
        who: { en: 'Couple · Germany', ar: 'زوجان · ألمانيا' },
        text: {
          en: '"Booked direct and the VIP perks were real — spa discount and a late checkout made our stay. The Naama Bay sea-view room is worth every euro."',
          ar: '«حجزنا مباشرة وكانت مزايا VIP حقيقية — خصم السبا والمغادرة المتأخرة أكملا إقامتنا. غرفة الإطلالة على خليج نعمة تستحق كل يورو.»',
        },
      },
      {
        initial: 'S',
        name: 'Sara L.',
        who: { en: 'Diver · UK', ar: 'غوّاصة · بريطانيا' },
        text: {
          en: '"The on-site dive centre made every morning easy — two dives before a buffet lunch. Spotless rooms and the friendliest team on the Red Sea."',
          ar: '«مركز الغوص بالموقع جعل كل صباح سهلاً — غطستان قبل غداء البوفيه. غرف نظيفة وألطف فريق على البحر الأحمر.»',
        },
      },
    ],
  },
  'kiroseiz-parkland': {
    count: 1080,
    bars: bars(94, 90, 89, 90),
    reviews: [
      {
        initial: 'N',
        name: 'Nour A.',
        who: { en: 'Family stay · Cairo', ar: 'إقامة عائلية · القاهرة' },
        text: {
          en: '"The gardens are huge and green — our kids lived at the pool while we relaxed in the shade. A proper family resort."',
          ar: '«الحدائق واسعة وخضراء — قضى أطفالنا يومهم في المسبح بينما استرخينا في الظل. منتجع عائلي بحق.»',
        },
      },
      {
        initial: 'T',
        name: 'Thomas B.',
        who: { en: 'Family · Germany', ar: 'عائلة · ألمانيا' },
        text: {
          en: '"The animation team kept the little ones busy from morning to night. Generous buffet and a calm, leafy setting right in Naama Bay."',
          ar: '«أبقى فريق الأنيميشن الصغار مشغولين من الصباح للمساء. بوفيه سخي وأجواء هادئة خضراء في قلب خليج نعمة.»',
        },
      },
      {
        initial: 'H',
        name: 'Heba M.',
        who: { en: 'Couple · KSA', ar: 'زوجان · السعودية' },
        text: {
          en: '"Great value and a warm welcome. The grounds are beautiful and everything is a short stroll from the beach."',
          ar: '«قيمة رائعة وترحيب دافئ. الأرجاء جميلة وكل شيء على بُعد خطوات من الشاطئ.»',
        },
      },
    ],
  },
  'kiroseiz-premier': {
    count: 1510,
    bars: bars(92, 93, 92, 95),
    reviews: [
      {
        initial: 'O',
        name: 'Omar T.',
        who: { en: 'Family stay · KSA', ar: 'إقامة عائلية · السعودية' },
        text: {
          en: '"Twenty-one slides — our kids never wanted to leave the aqua park. The best family week we\'ve had on the Red Sea."',
          ar: '«واحد وعشرون منزلقًا — لم يرغب أطفالنا في مغادرة الأكوا بارك أبدًا. أفضل أسبوع عائلي قضيناه على البحر الأحمر.»',
        },
      },
      {
        initial: 'K',
        name: 'Katarína P.',
        who: { en: 'Family · Slovakia', ar: 'عائلة · سلوفاكيا' },
        text: {
          en: '"The water park alone is worth the trip. Clean, well-run, and the staff genuinely care. We\'ll be back next summer."',
          ar: '«الحديقة المائية وحدها تستحق الرحلة. نظيفة ومُدارة جيدًا وطاقم يهتم بصدق. سنعود الصيف القادم.»',
        },
      },
      {
        initial: 'R',
        name: 'Rana S.',
        who: { en: 'Couple · Egypt', ar: 'زوجان · مصر' },
        text: {
          en: '"Even without kids we loved it — the pools and beach are excellent and book-direct perks gave us a free upgrade."',
          ar: '«حتى بدون أطفال أحببناه — المسابح والشاطئ ممتازة، ومزايا الحجز المباشر منحتنا ترقية مجانية.»',
        },
      },
    ],
  },
  'st-george-homestay': {
    count: 640,
    bars: bars(90, 92, 90, 86),
    reviews: [
      {
        initial: 'L',
        name: 'Laura V.',
        who: { en: 'Couple · Italy', ar: 'زوجان · إيطاليا' },
        text: {
          en: '"Quiet, homely and away from the crowds — the hilltop views at sunset are unforgettable. Exactly the calm we wanted."',
          ar: '«هادئ وأليف وبعيد عن الزحام — إطلالات التلة عند الغروب لا تُنسى. تمامًا السكينة التي أردناها.»',
        },
      },
      {
        initial: 'Y',
        name: 'Youssef K.',
        who: { en: 'Solo traveller · Egypt', ar: 'مسافر منفرد · مصر' },
        text: {
          en: '"Felt more like a warm guesthouse than a big hotel. Friendly hosts, a panoramic terrace, and a peaceful night\'s sleep."',
          ar: '«أشبه ببيت ضيافة دافئ منه بفندق كبير. مضيفون ودودون وتراس بانورامي ونوم هادئ.»',
        },
      },
      {
        initial: 'C',
        name: 'Claudia R.',
        who: { en: 'Couple · Germany', ar: 'زوجان · ألمانيا' },
        text: {
          en: '"Cosy rooms and a real personal touch. If you want serenity over nightlife, this is the spot in Sharm."',
          ar: '«غرف دافئة ولمسة شخصية حقيقية. إن كنت تبحث عن الهدوء بدل الحياة الليلية، فهذا مكانك في شرم.»',
        },
      },
    ],
  },
  'hill-top-beach': {
    count: 520,
    bars: bars(95, 86, 85, 93),
    reviews: [
      {
        initial: 'P',
        name: 'Pavel D.',
        who: { en: 'Diver · Czechia', ar: 'غوّاص · التشيك' },
        text: {
          en: '"The house reef is steps away and stunning — snorkelled every day. Simple, comfortable and superb value."',
          ar: '«الشعاب المرجانية على بُعد خطوات وخلابة — مارست السنوركل كل يوم. بسيط ومريح وقيمة ممتازة.»',
        },
      },
      {
        initial: 'F',
        name: 'Fatma E.',
        who: { en: 'Family · Egypt', ar: 'عائلة · مصر' },
        text: {
          en: '"A great little base by the reef with free parking. The restaurant was tasty and the pools kept the kids happy."',
          ar: '«قاعدة رائعة بجوار الشعاب مع موقف مجاني. المطعم لذيذ والمسابح أسعدت الأطفال.»',
        },
      },
      {
        initial: 'J',
        name: 'James W.',
        who: { en: 'Couple · UK', ar: 'زوجان · بريطانيا' },
        text: {
          en: '"You come for the reef and the price — both deliver. Friendly staff and an easy, relaxed feel."',
          ar: '«تأتي من أجل الشعاب والسعر — وكلاهما يفي بالوعد. طاقم ودود وأجواء مريحة وسهلة.»',
        },
      },
    ],
  },
  'golden-sandy-beach': {
    count: 760,
    bars: bars(93, 89, 90, 91),
    reviews: [
      {
        initial: 'D',
        name: 'Dina H.',
        who: { en: 'Family stay · KSA', ar: 'إقامة عائلية · السعودية' },
        text: {
          en: '"A gorgeous private stretch of sand and a green garden to relax in. Slow, sunny days exactly as promised."',
          ar: '«شريط رملي خاص رائع وحديقة خضراء للاسترخاء. أيام هادئة مشمسة تمامًا كما وُعدنا.»',
        },
      },
      {
        initial: 'M',
        name: 'Marco T.',
        who: { en: 'Couple · Italy', ar: 'زوجان · إيطاليا' },
        text: {
          en: '"A quiet beach at Ras Umm Sid, easy water access and beautiful sunsets. Wonderfully unhurried."',
          ar: '«شاطئ هادئ في رأس أم السيد، وصول سهل للماء وغروب جميل. هدوء رائع دون عجلة.»',
        },
      },
      {
        initial: 'A',
        name: 'Amira S.',
        who: { en: 'Family · Egypt', ar: 'عائلة · مصر' },
        text: {
          en: '"Loved the garden and the calm beach. Clean rooms, kind staff and great value for Sharm El-Maia."',
          ar: '«أحببنا الحديقة والشاطئ الهادئ. غرف نظيفة وطاقم لطيف وقيمة رائعة في شرم المايا.»',
        },
      },
    ],
  },
}

function quick(area: Bilingual): QuickFact[] {
  return [
    { icon: 'clock', text: { en: 'Check-in 14:00 · Check-out 12:00', ar: 'الوصول 14:00 · المغادرة 12:00' } },
    { icon: 'map-pin', text: { en: area.en + ', Sharm El Sheikh', ar: area.ar + '، شرم الشيخ' } },
    { icon: 'waves', text: { en: 'Private beach on the Red Sea', ar: 'شاطئ خاص على البحر الأحمر' } },
    { icon: 'wifi', text: { en: 'Free Wi-Fi throughout', ar: 'واي فاي مجاني في كل مكان' } },
    { icon: 'plane', text: { en: 'Minutes from SSH Airport', ar: 'دقائق من مطار شرم الشيخ' } },
  ]
}

// ---------------------------------------------------------------------
// PARTIAL SECTIONS — Spa, Meetings (teaser), Weddings, Offers (teaser).
// Content is uniform across resorts today (like ACTIVITIES/FACILITIES) and
// authored in all five locales so DE/IT/RU guests read it in their own
// language; per-resort imagery comes from the seed gallery. Meetings &
// Weddings reuse the real brand event photography (same URLs the
// /meetings-events page uses); the teasers link out to that page and /offers
// so there's a single source of truth for the full content.
// ---------------------------------------------------------------------
const EVENT_IMG = {
  ballroom: 'https://xperience-hotels.com/wp-content/uploads/2023/04/conference-facilities1.jpg',
  weddings: BANNER + 'b5ded7d6fdb6862b173a92ee1744b647/banner-Xperience-Kiroseiz-Parkland-new.jpg',
}

const SPA_TREATMENTS: SpaTreatment[] = [
  {
    icon: 'flower-2',
    name: { en: 'Signature Massage', ar: 'مساج مميز', de: 'Signature-Massage', it: 'Massaggio Signature', ru: 'Фирменный массаж' },
    desc: {
      en: 'Aromatherapy & deep-tissue, by the sea',
      ar: 'علاج عطري وأنسجة عميقة على البحر',
      de: 'Aromatherapie & Tiefengewebe am Meer',
      it: 'Aromaterapia e tessuti profondi, in riva al mare',
      ru: 'Ароматерапия и глубокий массаж у моря',
    },
    duration: { en: '60 / 90 min', ar: '60 / 90 دقيقة', de: '60 / 90 Min.', it: '60 / 90 min', ru: '60 / 90 мин' },
  },
  {
    icon: 'droplets',
    name: { en: 'Hammam Ritual', ar: 'طقوس الحمّام', de: 'Hammam-Ritual', it: 'Rituale Hammam', ru: 'Ритуал хаммам' },
    desc: {
      en: 'Traditional steam, scrub & cleanse',
      ar: 'بخار تقليدي وتقشير وتنظيف',
      de: 'Traditioneller Dampf, Peeling & Reinigung',
      it: 'Vapore tradizionale, scrub e pulizia',
      ru: 'Традиционный пар, скраб и очищение',
    },
    duration: { en: '45 min', ar: '45 دقيقة', de: '45 Min.', it: '45 min', ru: '45 мин' },
  },
  {
    icon: 'sparkles',
    name: { en: 'Radiance Facial', ar: 'فيشل مُشرق', de: 'Radiance-Gesichtsbehandlung', it: 'Trattamento Viso Radiance', ru: 'Сияющий уход за лицом' },
    desc: {
      en: 'Hydrating care for sun-kissed skin',
      ar: 'ترطيب للبشرة بعد الشمس',
      de: 'Feuchtigkeitspflege für sonnenverwöhnte Haut',
      it: 'Cura idratante per pelle baciata dal sole',
      ru: 'Увлажняющий уход за кожей после солнца',
    },
    duration: { en: '50 min', ar: '50 دقيقة', de: '50 Min.', it: '50 min', ru: '50 мин' },
  },
]

const MEETING_SPECS: MeetingSpec[] = [
  {
    icon: 'users',
    value: { en: '270', ar: '270', de: '270', it: '270', ru: '270' },
    label: { en: 'Max capacity', ar: 'السعة القصوى', de: 'Max. Kapazität', it: 'Capienza max', ru: 'Макс. вместимость' },
  },
  {
    icon: 'layout-grid',
    value: { en: '4', ar: '4', de: '4', it: '4', ru: '4' },
    label: { en: 'Seating layouts', ar: 'ترتيبات الجلوس', de: 'Sitzanordnungen', it: 'Disposizioni posti', ru: 'Схемы рассадки' },
  },
  {
    icon: 'utensils',
    value: { en: '100%', ar: '100%', de: '100%', it: '100%', ru: '100%' },
    label: { en: 'In-house catering', ar: 'تموين داخلي', de: 'Eigenes Catering', it: 'Catering interno', ru: 'Собственный кейтеринг' },
  },
]

const WEDDING_HIGHLIGHTS: WeddingHighlight[] = [
  {
    icon: 'heart',
    title: { en: 'Weddings', ar: 'حفلات الزفاف', de: 'Hochzeiten', it: 'Matrimoni', ru: 'Свадьбы' },
    sub: { en: 'Tailored to your day', ar: 'مُفصّلة ليومك', de: 'Auf Ihren Tag zugeschnitten', it: 'Su misura per il vostro giorno', ru: 'С учётом вашего дня' },
  },
  {
    icon: 'cake',
    title: { en: 'Anniversaries', ar: 'الذكرى السنوية', de: 'Jubiläen', it: 'Anniversari', ru: 'Годовщины' },
    sub: { en: 'Intimate celebrations', ar: 'احتفالات حميمة', de: 'Intime Feiern', it: 'Celebrazioni intime', ru: 'Камерные торжества' },
  },
  {
    icon: 'clipboard-list',
    title: { en: 'Full planning', ar: 'تخطيط متكامل', de: 'Komplette Planung', it: 'Pianificazione completa', ru: 'Полное планирование' },
    sub: { en: 'Start to finish', ar: 'من البداية للنهاية', de: 'Von Anfang bis Ende', it: "Dall'inizio alla fine", ru: 'От начала до конца' },
  },
  {
    icon: 'utensils',
    title: { en: 'Bespoke catering', ar: 'تموين مخصّص', de: 'Maßgeschneidertes Catering', it: 'Catering su misura', ru: 'Кейтеринг на заказ' },
    sub: { en: 'Menus your way', ar: 'قوائم على ذوقك', de: 'Menüs nach Ihren Wünschen', it: 'Menu come li volete', ru: 'Меню на ваш вкус' },
  },
]

const OFFER_BENEFITS: OfferBenefit[] = [
  {
    icon: 'crown',
    label: { en: 'VIP treatment', ar: 'معاملة VIP', de: 'VIP-Behandlung', it: 'Trattamento VIP', ru: 'VIP-обслуживание' },
  },
  {
    icon: 'flower-2',
    label: { en: '10% off spa', ar: 'خصم 10% على السبا', de: '10% Rabatt auf Spa', it: '10% di sconto sulla spa', ru: 'Скидка 10% на спа' },
  },
  {
    icon: 'anchor',
    label: { en: '10% off diving', ar: 'خصم 10% على الغوص', de: '10% Rabatt auf Tauchen', it: '10% di sconto sulle immersioni', ru: 'Скидка 10% на дайвинг' },
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

/** Spa section — shared treatments + a resort image from the gallery. */
function spa(g: string[]): SpaSection {
  return { img: g[2] ?? g[0] ?? '', treatments: SPA_TREATMENTS }
}
/** Meetings teaser — real ballroom photo + headline specs (links to /meetings-events). */
function meetings(): MeetingsTeaser {
  return { img: EVENT_IMG.ballroom, specs: MEETING_SPECS }
}
/** Weddings section — real event photo + highlights (links to /meetings-events#weddings). */
function weddings(): WeddingsSection {
  return { img: EVENT_IMG.weddings, highlights: WEDDING_HIGHLIGHTS }
}
/** Offers teaser — book-direct benefits + a resort image (links to /offers). */
function offer(g: string[]): OffersTeaser {
  return { img: g[1] ?? g[0] ?? '', benefits: OFFER_BENEFITS }
}

// ---------------------------------------------------------------------
// PER-RESORT RECORDS
// ---------------------------------------------------------------------
interface ResortSeed {
  slug: string
  name: Bilingual
  area: Bilingual
  heroLines: [string, string]
  blurb: Bilingual
  intro: Bilingual
  hero: string
  gallery: string[]
  priceFrom: number
  ratingScore: string
  coords: GeoCoords
}

const SEEDS: ResortSeed[] = [
  {
    slug: 'sea-breeze',
    name: { en: 'Sea Breeze Resort', ar: 'سي بريز ريزورت' },
    area: { en: 'Naama Bay', ar: 'خليج نعمة' },
    heroLines: ['Xperience', 'Sea Breeze Resort'],
    blurb: {
      en: 'Luxury and comfort in specially designed spaces that blend the charm of the Red Sea with contemporary design — on the shores of Naama Bay.',
      ar: 'فخامة وراحة في مساحات مصممة بعناية تمزج سحر البحر الأحمر بالتصميم المعاصر — على شاطئ خليج نعمة.',
    },
    intro: {
      en: 'Set steps from the turquoise water of Naama Bay, Xperience Sea Breeze Resort pairs warm Egyptian hospitality with contemporary design. Spend your days between the private beach, the outdoor pools and the dive center — and your evenings with live entertainment under the stars.',
      ar: 'على بُعد خطوات من مياه خليج نعمة الفيروزية، يجمع منتجع إكسبيريانس سي بريز بين الضيافة المصرية الدافئة والتصميم المعاصر. اقضِ أيامك بين الشاطئ الخاص والمسابح الخارجية ومركز الغوص — وأمسياتك مع العروض الحية تحت النجوم.',
    },
    hero: IMG.seaBreeze,
    gallery: [IMG.seaBreeze, IMG.premier, IMG.parkland, IMG.george, IMG.hilltop],
    priceFrom: 75,
    ratingScore: '8.9',
    coords: { lat: 27.9176, lng: 34.3306 },
  },
  {
    slug: 'kiroseiz-parkland',
    name: { en: 'Kiroseiz Parkland', ar: 'كيروسيز باركلاند' },
    area: { en: 'Naama Bay', ar: 'خليج نعمة' },
    heroLines: ['Xperience', 'Kiroseiz Parkland'],
    blurb: {
      en: 'The ultimate hospitality experience for you and your family, with exceptional luxury services and facilities for adults and kids alike.',
      ar: 'تجربة الضيافة المثالية لك ولعائلتك، مع خدمات ومرافق فاخرة استثنائية للكبار والأطفال على حد سواء.',
    },
    intro: {
      en: 'In the heart of Naama Bay, Xperience Kiroseiz Parkland is a lively, family-first resort with generous gardens, sun-filled pools and a busy animation programme — the ultimate hospitality experience for you and your family.',
      ar: 'في قلب خليج نعمة، يُعد منتجع إكسبيريانس كيروسيز باركلاند وجهة نابضة بالحياة مناسبة للعائلات بحدائق واسعة ومسابح مشمسة وبرنامج أنيميشن حافل — تجربة الضيافة المثالية لك ولعائلتك.',
    },
    hero: IMG.parkland,
    gallery: [IMG.parkland, IMG.premier, IMG.seaBreeze, IMG.sandy, IMG.george],
    priceFrom: 70,
    ratingScore: '8.7',
    coords: { lat: 27.9148, lng: 34.3268 },
  },
  {
    slug: 'kiroseiz-premier',
    name: { en: 'Kiroseiz Premier', ar: 'كيروسيز بريمير' },
    area: { en: 'Naama Bay · Aqua Park', ar: 'خليج نعمة · أكوا بارك' },
    heroLines: ['Xperience', 'Kiroseiz Premier'],
    blurb: {
      en: 'A family-friendly resort with a 21-slide Premiere Aqua Park, a wide range of accommodation, and a relaxed Red Sea atmosphere.',
      ar: 'منتجع مناسب للعائلات مع أكوا بارك يضم 21 منزلقًا مائيًا، ومجموعة واسعة من خيارات الإقامة، وأجواء مريحة على البحر الأحمر.',
    },
    intro: {
      en: 'Home to a 21-slide Premiere Aqua Park, Xperience Kiroseiz Premier is built for splashing, sliding and sun. Between the water park, the pools and the beach, there is something for every age — all day, every day.',
      ar: 'يضم منتجع إكسبيريانس كيروسيز بريمير أكوا بارك بـ 21 منزلقًا مائيًا، وقد صُمم للمرح واللعب تحت الشمس. بين الحديقة المائية والمسابح والشاطئ، هناك ما يناسب كل الأعمار — طوال اليوم وكل يوم.',
    },
    hero: IMG.premier,
    gallery: [IMG.premier, IMG.parkland, IMG.seaBreeze, IMG.hilltop, IMG.sandy],
    priceFrom: 85,
    ratingScore: '9.0',
    coords: { lat: 27.9121, lng: 34.3241 },
  },
  {
    slug: 'st-george-homestay',
    name: { en: 'St. George Homestay', ar: 'سانت جورج هومستاي' },
    area: { en: "Sharm's Hill", ar: 'تلة شرم' },
    heroLines: ['Xperience', 'St. George Homestay'],
    blurb: {
      en: "Set on Sharm El Sheikh's tranquil hill, combining a spectacularly cosy atmosphere with an exclusive, homely experience.",
      ar: 'يقع على تلة شرم الشيخ الهادئة، ويجمع بين أجواء دافئة آسرة وتجربة حصرية تشبه أجواء المنزل.',
    },
    intro: {
      en: 'Perched on Sharm El Sheikh\'s quiet hill, Xperience St. George Homestay trades crowds for calm. Expect a cosy, homely atmosphere, panoramic views and the same warm Xperience hospitality.',
      ar: 'يطل منتجع إكسبيريانس سانت جورج هومستاي من تلة شرم الشيخ الهادئة، مستبدلًا الزحام بالسكينة. توقّع أجواءً دافئة تشبه المنزل وإطلالات بانورامية ونفس ضيافة إكسبيريانس الدافئة.',
    },
    hero: IMG.george,
    gallery: [IMG.george, IMG.hilltop, IMG.seaBreeze, IMG.parkland, IMG.premier],
    priceFrom: 65,
    ratingScore: '8.6',
    coords: { lat: 27.8662, lng: 34.3034 },
  },
  {
    slug: 'hill-top-beach',
    name: { en: 'Hill Top Beach', ar: 'هيل توب بيتش' },
    area: { en: 'Hill-Top Reef', ar: 'شعاب هيل توب' },
    heroLines: ['Xperience', 'Hill Top Beach'],
    blurb: {
      en: 'An ideal mix of value, comfort and convenience — accommodation with a restaurant and free private parking by the reef.',
      ar: 'مزيج مثالي من القيمة والراحة والملاءمة — إقامة مع مطعم وموقف خاص مجاني بجوار الشعاب المرجانية.',
    },
    intro: {
      en: 'Overlooking one of Sharm\'s finest reefs, Xperience Hill Top Beach is an easy, great-value base for snorkellers and sun-seekers, with a restaurant, pools and free private parking.',
      ar: 'يطل منتجع إكسبيريانس هيل توب بيتش على واحدة من أجمل الشعاب في شرم، وهو قاعدة مريحة بقيمة رائعة لمحبي السنوركل والشمس، مع مطعم ومسابح وموقف خاص مجاني.',
    },
    hero: IMG.hilltop,
    gallery: [IMG.hilltop, IMG.george, IMG.sandy, IMG.seaBreeze, IMG.parkland],
    priceFrom: 60,
    ratingScore: '8.5',
    coords: { lat: 27.8706, lng: 34.3119 },
  },
  {
    slug: 'golden-sandy-beach',
    name: { en: 'Golden Sandy Beach', ar: 'جولدن ساندي بيتش' },
    area: { en: 'Sharm El-Maia', ar: 'شرم المايا' },
    heroLines: ['Xperience', 'Golden Sandy Beach'],
    blurb: {
      en: 'A private beach area and garden in Sharm El-Maia, on Dusti Road, Ras Umm Sid — relaxed days by the Red Sea.',
      ar: 'منطقة شاطئ خاص وحديقة في شرم المايا، على طريق دوستي، رأس أم السيد — أيام مريحة على البحر الأحمر.',
    },
    intro: {
      en: 'On a private stretch of sand at Sharm El-Maia, Xperience Golden Sandy Beach is all about slow, sun-warmed days by the Red Sea, with a garden, pools and easy beach access.',
      ar: 'على شريط رملي خاص في شرم المايا، يدور منتجع إكسبيريانس جولدن ساندي بيتش حول أيام هادئة دافئة بالشمس على البحر الأحمر، مع حديقة ومسابح ووصول سهل إلى الشاطئ.',
    },
    hero: IMG.sandy,
    gallery: [IMG.sandy, IMG.hilltop, IMG.george, IMG.seaBreeze, IMG.premier],
    priceFrom: 68,
    ratingScore: '8.8',
    coords: { lat: 27.8499, lng: 34.2936 },
  },
]

export const RESORTS: Resort[] = SEEDS.map((s) => ({
  slug: s.slug,
  name: s.name,
  fullName: 'Xperience ' + s.name.en,
  area: s.area,
  heroLines: s.heroLines,
  blurb: s.blurb,
  hero: s.hero,
  gallery: s.gallery,
  intro: s.intro,
  introExtra: {
    en: "Every room is a calm, light-filled retreat — and with our book-direct benefits you'll enjoy VIP treatment plus 10% off spa, diving and à la carte dining throughout your stay.",
    ar: 'كل غرفة ملاذ هادئ مفعم بالضوء — ومع مزايا الحجز المباشر ستستمتع بمعاملة VIP وخصم 10% على السبا والغوص والمطاعم طوال إقامتك.',
  },
  priceFrom: s.priceFrom,
  quick: quick(s.area),
  rooms: rooms(s.gallery, s.priceFrom),
  dining: dining(s.gallery),
  activities: ACTIVITIES,
  facilities: FACILITIES,
  spa: spa(s.gallery),
  meetings: meetings(),
  weddings: weddings(),
  offer: offer(s.gallery),
  ratingScore: s.ratingScore,
  ratingCount: stays(REVIEWS_BY_SLUG[s.slug]!.count),
  reviewCount: REVIEWS_BY_SLUG[s.slug]!.count,
  ratingBars: REVIEWS_BY_SLUG[s.slug]!.bars,
  reviews: REVIEWS_BY_SLUG[s.slug]!.reviews,
  address: s.area.en + ', Sharm El Sheikh, South Sinai, Egypt',
  phone: '+20 69 360 0000',
  mapPinLabel: s.name.en,
  coords: s.coords,
}))

const BY_SLUG: Record<string, Resort> = Object.fromEntries(RESORTS.map((r) => [r.slug, r]))

/** Valid slugs for the /resorts/:slug route (page-level validate guard). */
export const RESORT_SLUGS = new Set(RESORTS.map((r) => r.slug))

export function getResort(slug: string | undefined): Resort | undefined {
  return slug ? BY_SLUG[slug] : undefined
}

/** Lightweight list for nav/footer/mega menus. */
export const RESORT_LINKS = RESORTS.map((r) => ({
  slug: r.slug,
  name: r.name,
  area: r.area,
  img: r.hero,
}))
