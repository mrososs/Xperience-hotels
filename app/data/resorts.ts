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
  ratingScore: string
  ratingCount: Bilingual
  ratingBars: RatingBar[]
  reviews: Review[]
  address: string
  phone: string
  mapPinLabel: string
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

const RATING_BARS: RatingBar[] = [
  { label: { en: 'Location', ar: 'الموقع' }, pct: 96 },
  { label: { en: 'Service', ar: 'الخدمة' }, pct: 92 },
  { label: { en: 'Cleanliness', ar: 'النظافة' }, pct: 90 },
  { label: { en: 'Value', ar: 'القيمة' }, pct: 88 },
]

const REVIEWS: Review[] = [
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
      en: '"Booked direct and the VIP perks were real — spa discount and a late checkout made our honeymoon. The sea view room is worth it."',
      ar: '«حجزنا مباشرة وكانت مزايا VIP حقيقية — خصم السبا والمغادرة المتأخرة أكملا شهر العسل. غرفة الإطلالة البحرية تستحق.»',
    },
  },
  {
    initial: 'S',
    name: 'Sara L.',
    who: { en: 'Solo traveller · UK', ar: 'مسافرة منفردة · بريطانيا' },
    text: {
      en: '"Diving straight from the resort\'s center was incredible. Clean rooms, generous buffet, and the friendliest team on the Red Sea."',
      ar: '«الغوص مباشرة من مركز المنتجع كان رائعًا. غرف نظيفة وبوفيه سخي وألطف فريق على البحر الأحمر.»',
    },
  },
  {
    initial: 'O',
    name: 'Omar T.',
    who: { en: 'Family stay · KSA', ar: 'إقامة عائلية · السعودية' },
    text: {
      en: '"Great value for a 5-star on the Red Sea. Pools were spotless, the animation team kept everyone smiling. We\'ll be back."',
      ar: '«قيمة رائعة لفندق 5 نجوم على البحر الأحمر. المسابح نظيفة وفريق الأنيميشن أبقى الجميع مبتسمين. سنعود بالتأكيد.»',
    },
  },
]

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
  ratingScore: s.ratingScore,
  ratingCount: { en: 'Based on 1,240 verified stays', ar: 'بناءً على 1,240 إقامة موثّقة' },
  ratingBars: RATING_BARS,
  reviews: REVIEWS,
  address: s.area.en + ', Sharm El Sheikh, South Sinai, Egypt',
  phone: '+20 69 360 0000',
  mapPinLabel: s.name.en,
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
