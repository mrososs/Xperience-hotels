// Real Xperience Hotels brand content (static data).
// Types live in ./types. Photography is hotlinked from the brand CDN
// (per the design-system note); for production, localise into src/assets/.

import type { Benefit, DiscoverVideo, FooterColumn, Resort, Social } from './types'

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

// "Discover the Xperience" — real videos from the brand's YouTube channel
// (the same set the live site showcases). Thumbnails come from i.ytimg.com,
// derived from the id in the component.
export const DISCOVER_VIDEOS: DiscoverVideo[] = [
  {
    youtubeId: '_CyrhR3n3B8',
    tag: 'St. George',
    title: 'Party Nights, Summer Lights at Xperience St. George',
    titleAr: 'ليالي السهر وأضواء الصيف في إكسبيريانس سانت جورج',
  },
  {
    youtubeId: 'S-oUoUGvATM',
    tag: 'Kiroseiz',
    title: 'Step into your summer mood — 21 water slides at Kiroseiz Aqua Park',
    titleAr: 'ادخل أجواء صيفك — 21 زحليقة في أكوا بارك كيروسيز',
  },
  {
    youtubeId: 'SO6MJ1ZAtkg',
    tag: 'Sea Breeze',
    title: 'Feel the Energy of Summer at Xperience Sea Breeze Resort',
    titleAr: 'اشعر بطاقة الصيف في منتجع إكسبيريانس سي بريز',
  },
  {
    youtubeId: 'w3B-6iIiQK0',
    tag: 'Sandy Beach',
    title: 'Summer Is Calling — Xperience Golden Sandy Beach',
    titleAr: 'الصيف ينادي — إكسبيريانس جولدن ساندي بيتش',
  },
  {
    youtubeId: 'WQDReDRf6mY',
    tag: 'Sea Breeze',
    title: 'Squid Game challenge at Xperience Sea Breeze',
    titleAr: 'تحدي لعبة الحبار في إكسبيريانس سي بريز',
  },
  {
    youtubeId: '3mDGLn19ubU',
    tag: 'Kiroseiz',
    title: 'Show time & incredible hotel entertainment at Kiroseiz',
    titleAr: 'وقت العرض والترفيه المذهل في كيروسيز',
  },
  {
    youtubeId: 'h57blkUm-WI',
    tag: 'St. George',
    title: 'A vibrant preview of our animation activities',
    titleAr: 'لمحة نابضة من أنشطة الأنيميشن لدينا',
  },
  {
    youtubeId: 'iKi9oilAq-E',
    tag: 'Kiroseiz',
    title: 'Easter Celebration — an unforgettable family holiday',
    titleAr: 'احتفال عيد الفصح — عطلة عائلية لا تُنسى',
  },
  {
    youtubeId: 'c3cFSu9hGCo',
    tag: 'Kiroseiz',
    title: 'Kids Show Time — fun for the whole family',
    titleAr: 'وقت عرض الأطفال — متعة للعائلة كلها',
  },
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

// ---------------------------------------------------------------------
// ABOUT PAGE (/about) — who we are, sustainability, achievements,
// policies and reports. Copy mirrors the design bundle's About page;
// UI strings live in the i18n catalogs (aboutPage.*), entity content here.
// ---------------------------------------------------------------------
export const ABOUT_HERO_IMG =
  'https://xperience-hotels.com/wp-content/uploads/2022/10/banner-Xperience-Sea-Breeze-Resort-1.jpg'

export const ABOUT_WHO_IMG = HERO_IMG

// Kiroseiz Group companies (chips). Brand names — not translated.
export const KIROSEIZ_COMPANIES: { icon: string; label: string }[] = [
  { icon: 'building-2', label: 'Kiroseiz Contracting & Development' },
  { icon: 'building-2', label: 'Kiroseiz Trading & Contracting' },
  { icon: 'hotel', label: 'Kiroseiz Hotels Establishment' },
  { icon: 'compass', label: 'Kiroseiz Tours' },
  { icon: 'waves', label: 'Kiroseiz Red Sea' },
  { icon: 'hammer', label: 'Kiroseiz Touristic Construction' },
]

export interface AboutStat {
  count: number
  suffix?: string
  label: { en: string; ar: string }
}

export const ABOUT_STATS: AboutStat[] = [
  { count: 2011, label: { en: 'Founded', ar: 'سنة التأسيس' } },
  { count: 6, label: { en: 'Red Sea resorts', ar: 'منتجعات' } },
  { count: 30, suffix: '+', label: { en: 'Years of expertise', ar: 'عامًا من الخبرة' } },
  { count: 6, label: { en: 'Group companies', ar: 'شركات بالمجموعة' } },
]

export interface AboutPillar {
  icon: string
  title: { en: string; ar: string }
  desc: { en: string; ar: string }
}

export const ABOUT_PILLARS: AboutPillar[] = [
  {
    icon: 'clipboard-check',
    title: { en: 'Waste Audits', ar: 'تدقيق النفايات' },
    desc: {
      en: 'Conducted 4 times a year over 5-day periods, with results shared across departments.',
      ar: 'يُجرى 4 مرات سنويًا على مدى 5 أيام، وتُشارك النتائج بين الأقسام.',
    },
  },
  {
    icon: 'recycle',
    title: { en: 'Recycling', ar: 'إعادة التدوير' },
    desc: {
      en: 'Paper, plastic, glass, cans, cardboard and food composting via the Sharm El Sheikh program.',
      ar: 'ورق وبلاستيك وزجاج وعلب وكرتون وتسميد الطعام عبر برنامج شرم الشيخ.',
    },
  },
  {
    icon: 'droplets',
    title: { en: 'In Guest Room', ar: 'داخل الغرف' },
    desc: {
      en: 'Low-flow taps, a linen & towel reuse program and energy-efficient lighting.',
      ar: 'صنابير موفّرة للمياه وبرنامج لإعادة استخدام المناشف وإضاءة موفّرة للطاقة.',
    },
  },
  {
    icon: 'leaf',
    title: { en: 'Eco Purchasing', ar: 'شراء مستدام' },
    desc: {
      en: 'Recycled-content supplies and LED lighting throughout every property.',
      ar: 'مستلزمات بمحتوى معاد تدويره وإضاءة LED في كل المنشآت.',
    },
  },
  {
    icon: 'mail',
    title: { en: 'Inter-Office', ar: 'المكاتب الداخلية' },
    desc: {
      en: 'Digital-first communication and double-sided or reused paper when printing is needed.',
      ar: 'تواصل رقمي أولًا وطباعة على الوجهين أو ورق معاد استخدامه عند الحاجة.',
    },
  },
]

export interface AboutResult {
  count: number
  unit?: string
  label: { en: string; ar: string }
  sub: { en: string; ar: string }
}

export const ABOUT_RESULTS: AboutResult[] = [
  {
    count: 7,
    unit: '%',
    label: { en: 'Less electricity used', ar: 'انخفاض استهلاك الكهرباء' },
    sub: { en: 'Energy-efficient bulbs & dimmers', ar: 'لمبات موفّرة ومنظّمات إضاءة' },
  },
  {
    count: 22,
    unit: '%',
    label: { en: 'Less gas consumed', ar: 'انخفاض استهلاك الغاز' },
    sub: { en: 'Optimised operations', ar: 'تشغيل محسّن' },
  },
  {
    count: 5,
    unit: '%',
    label: { en: 'Less steam used', ar: 'انخفاض استهلاك البخار' },
    sub: { en: 'Preventive maintenance', ar: 'صيانة وقائية' },
  },
  {
    count: 2016,
    label: { en: 'Composting started', ar: 'بدء التسميد' },
    sub: { en: 'Toward a near-zero-waste property', ar: 'نحو منشأة شبه خالية من النفايات' },
  },
]

export interface AboutPolicy {
  icon: string
  title: { en: string; ar: string }
  intro: { en: string; ar: string }
  points: { en: string; ar: string }[]
}

export const ABOUT_POLICIES: AboutPolicy[] = [
  {
    icon: 'globe',
    title: { en: 'Environmental Policy', ar: 'السياسة البيئية' },
    intro: {
      en: "We're committed to reducing our operational impact to protect the environment for future generations.",
      ar: 'نلتزم بتقليل أثر عملياتنا لحماية البيئة للأجيال القادمة.',
    },
    points: [
      {
        en: 'Reduce electricity, gas and water use per guest, per night.',
        ar: 'تقليل استهلاك الكهرباء والغاز والمياه لكل ضيف في الليلة.',
      },
      {
        en: 'Reduce the amount of waste produced and comply with all environmental laws.',
        ar: 'تقليل النفايات والالتزام بكل القوانين البيئية.',
      },
      {
        en: 'Monitor and report performance, and involve staff and guests in our goals.',
        ar: 'متابعة الأداء والإبلاغ عنه وإشراك الموظفين والنزلاء في أهدافنا.',
      },
    ],
  },
  {
    icon: 'badge-check',
    title: { en: 'Quality Assurance', ar: 'ضمان الجودة' },
    intro: {
      en: 'Quality matters because we value our guests. We aim to meet and exceed expectations through continuous improvement.',
      ar: 'الجودة تهمّنا لأننا نقدّر نزلاءنا. نسعى لتلبية التوقعات وتجاوزها عبر التحسين المستمر.',
    },
    points: [
      {
        en: 'Regular gathering and monitoring of guest feedback.',
        ar: 'جمع ومتابعة آراء النزلاء بانتظام.',
      },
      {
        en: 'Clear complaints procedures and measurable quality objectives.',
        ar: 'إجراءات واضحة للشكاوى وأهداف جودة قابلة للقياس.',
      },
      {
        en: 'Ongoing training and development for all employees.',
        ar: 'تدريب وتطوير مستمر لكل الموظفين.',
      },
    ],
  },
  {
    icon: 'shield',
    title: { en: 'Children Protection', ar: 'حماية الأطفال' },
    intro: {
      en: 'Xperience Hotels are committed to protecting children — their welfare is never at risk.',
      ar: 'تلتزم فنادق إكسبيريانس بحماية الأطفال — سلامتهم لا تتعرض للخطر أبدًا.',
    },
    points: [
      {
        en: 'Value, respect and listen to children.',
        ar: 'تقدير الأطفال واحترامهم والإنصات إليهم.',
      },
      {
        en: 'Maintain strong protection systems and staff training.',
        ar: 'أنظمة حماية قوية وتدريب للموظفين.',
      },
      {
        en: 'Never hire staff under 18, and protect children from all forms of harm.',
        ar: 'عدم تعيين من هم دون 18 عامًا وحماية الأطفال من كل أشكال الأذى.',
      },
    ],
  },
  {
    icon: 'users',
    title: { en: 'Local Community', ar: 'المجتمع المحلي' },
    intro: {
      en: 'We integrate our hotels and staff into the local community and seek to be an active member.',
      ar: 'ندمج فنادقنا وموظفينا في المجتمع المحلي ونسعى لأن نكون عضوًا فاعلًا.',
    },
    points: [
      {
        en: 'Respect and promote local culture, religion and traditions.',
        ar: 'احترام وتعزيز الثقافة والدين والتقاليد المحلية.',
      },
      {
        en: 'Buy from local suppliers and promote local crafts.',
        ar: 'الشراء من المورّدين المحليين وترويج الحرف المحلية.',
      },
      {
        en: 'Support schools and hospitals through donations.',
        ar: 'دعم المدارس والمستشفيات عبر التبرعات.',
      },
    ],
  },
  {
    icon: 'handshake',
    title: { en: 'Labor Policy', ar: 'سياسة العمل' },
    intro: {
      en: "We're committed to treating our employees fairly and lawfully.",
      ar: 'نلتزم بمعاملة موظفينا بعدل ووفقًا للقانون.',
    },
    points: [
      {
        en: 'Written contracts and a fair living wage for all employees.',
        ar: 'عقود مكتوبة وأجر عادل لكل الموظفين.',
      },
      {
        en: 'Working hours that comply with national and international law.',
        ar: 'ساعات عمل تتوافق مع القانون المحلي والدولي.',
      },
      {
        en: 'No discrimination of any kind; freedom to join a trade union.',
        ar: 'لا تمييز من أي نوع، وحرية الانضمام للنقابات.',
      },
    ],
  },
  {
    icon: 'heart-pulse',
    title: { en: 'Health & Safety', ar: 'الصحة والسلامة' },
    intro: {
      en: "We're committed to the health and safety of our guests and staff alike.",
      ar: 'نلتزم بصحة وسلامة نزلائنا وموظفينا على حدٍّ سواء.',
    },
    points: [
      {
        en: 'Comply with all health & safety legislation and standards.',
        ar: 'الالتزام بكل تشريعات ومعايير الصحة والسلامة.',
      },
      {
        en: 'Training in firefighting, evacuation, first aid and hazard spotting.',
        ar: 'تدريب على الإطفاء والإخلاء والإسعافات الأولية ورصد المخاطر.',
      },
      {
        en: 'A resident doctor on-site and medical care for all employees.',
        ar: 'طبيب مقيم بالموقع ورعاية طبية لكل الموظفين.',
      },
    ],
  },
]

export interface AboutReport {
  title: { en: string; ar: string }
  href: string
}

export const ABOUT_REPORTS: AboutReport[] = [
  {
    title: {
      en: 'Sustainable Development Report 2024–2025',
      ar: 'تقرير التنمية المستدامة 2024–2025',
    },
    href: 'https://xperience-hotels.com/wp-content/uploads/2025/08/sustainability-development-report-2024-2025.pdf',
  },
  {
    title: {
      en: 'Sustainability — Xperience St. George',
      ar: 'الاستدامة — إكسبيريانس سانت جورج',
    },
    href: 'https://xperience-hotels.com/wp-content/uploads/2026/04/Sustainability-Xperience-St.-George.pdf',
  },
  {
    title: {
      en: 'Xperience Resorts Sustainability Policies',
      ar: 'سياسات الاستدامة لمنتجعات إكسبيريانس',
    },
    href: 'https://xperience-hotels.com/wp-content/uploads/2025/08/xperience-resorts-sustainability-policies.pdf',
  },
]

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
