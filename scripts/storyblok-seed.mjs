// =====================================================================
// Storyblok seed — Home page
// Creates the block schemas (components) that mirror the landing-page
// sections, then writes the existing "Home" story's content from the
// hardcoded app/data values. Idempotent: components are upserted by name
// and the Home story is matched by slug, so it's safe to re-run.
//
// Uses the MANAGEMENT API with the Personal Access Token — tooling only,
// never the running app. Run with the env file so the secrets load:
//
//   node --env-file=.env scripts/storyblok-seed.mjs
//   (or: npm run seed:storyblok)
//
// Content is seeded in English. The space has no extra languages
// configured yet; once AR/DE/IT/RU are enabled in Space Settings and the
// relevant fields are flagged translatable, this script can be extended
// to push the bilingual values that already live in app/data.
// =====================================================================

const PAT = process.env.STORYBLOK_PERSONAL_ACCESS_TOKEN
const SPACE_ID = process.env.STORYBLOK_SPACE_ID
const REGION = (process.env.STORYBLOK_REGION || 'eu').toLowerCase()

if (!PAT || !SPACE_ID) {
  console.error('Missing STORYBLOK_PERSONAL_ACCESS_TOKEN or STORYBLOK_SPACE_ID.')
  console.error('Run with:  node --env-file=.env scripts/storyblok-seed.mjs')
  process.exit(1)
}

// Region → Management API host.
const MAPI = {
  eu: 'https://mapi.storyblok.com/v1',
  us: 'https://api-us.storyblok.com/v1',
  ca: 'https://api-ca.storyblok.com/v1',
  ap: 'https://api-ap.storyblok.com/v1',
  cn: 'https://app.storyblokchina.cn/v1',
}[REGION]

const BASE = `${MAPI}/spaces/${SPACE_ID}`
const uid = () => crypto.randomUUID()
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// The Management API caps at 6 req/s; stay well under and back off on 429.
async function api(method, path, body, attempt = 0) {
  await sleep(250)
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { Authorization: PAT, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  if (res.status === 429 && attempt < 5) {
    await sleep(1000 * (attempt + 1))
    return api(method, path, body, attempt + 1)
  }
  const json = text ? JSON.parse(text) : {}
  if (!res.ok) {
    throw new Error(`${method} ${path} → ${res.status}\n${text}`)
  }
  return json
}

// ---------------------------------------------------------------------
// 1. Component (block) schemas — mirror the landing-page sections.
//    Images are stored as plain-text CDN URLs (the site hotlinks the
//    brand WordPress CDN through useBgImage(), so no asset upload).
// ---------------------------------------------------------------------
const t = (pos) => ({ type: 'text', pos })
const ta = (pos) => ({ type: 'textarea', pos })
const num = (pos) => ({ type: 'number', pos })
// Asset (single image) field — editors upload/pick from the asset manager.
const asset = (pos) => ({ type: 'asset', filetypes: ['images'], pos })
// Seed value for an asset field: defaults to an existing CDN URL. Editors
// can replace it with a Storyblok-hosted asset (filename → a.storyblok.com).
const assetVal = (url) => ({
  fieldtype: 'asset',
  id: null,
  filename: url,
  name: '',
  title: '',
  alt: '',
  focus: '',
  copyright: '',
  meta_data: {},
})
// Single-option dropdown with self-defined values.
const opt = (pos, options, default_value) => ({
  type: 'option',
  pos,
  use_uuid: false,
  options,
  default_value,
})

// Lucide icon keys the icon_item block may use — the UNION of the keys
// AwardsMarquee.vue (leaf/award/star/utensils/shield-check/building-2) and
// BenefitsSection.vue (crown/shirt/flower-2/anchor/utensils/clock) resolve.
// `value` must match the lucide key in those components' ICONS map.
const ICON_OPTIONS = [
  { name: 'Star', value: 'star' },
  { name: 'Award', value: 'award' },
  { name: 'Leaf', value: 'leaf' },
  { name: 'Shield Check', value: 'shield-check' },
  { name: 'Utensils', value: 'utensils' },
  { name: 'Building', value: 'building-2' },
  { name: 'Crown', value: 'crown' },
  { name: 'Shirt', value: 'shirt' },
  { name: 'Flower', value: 'flower-2' },
  { name: 'Anchor', value: 'anchor' },
  { name: 'Clock', value: 'clock' },
]
const bloks = (pos, whitelist) => ({
  type: 'bloks',
  restrict_components: true,
  component_whitelist: whitelist,
  pos,
})

const COMPONENTS = [
  // --- leaf / item blocks ---
  {
    name: 'hero_slide',
    display_name: 'Hero Slide',
    is_nestable: true,
    schema: { name: t(0), area: t(1), blurb: ta(2), image: asset(3), rating_score: t(4), price_from: num(5), slug: t(6) },
  },
  {
    name: 'resort_card',
    display_name: 'Resort Card',
    is_nestable: true,
    schema: { name: t(0), area: t(1), slug: t(2), image: asset(3), description: ta(4) },
  },
  {
    name: 'icon_item',
    display_name: 'Icon Item',
    is_nestable: true,
    schema: { icon: opt(0, ICON_OPTIONS, 'star'), label: t(1) },
  },
  {
    name: 'offer_package',
    display_name: 'Offer Package',
    is_nestable: true,
    schema: { full_name: t(0), slug: t(1), location: t(2), image: asset(3), perks: ta(4) },
  },
  {
    name: 'discover_video',
    display_name: 'Discover Video',
    is_nestable: true,
    schema: { youtube_id: t(0), tag: t(1), title: t(2) },
  },
  {
    name: 'stat',
    display_name: 'Stat',
    is_nestable: true,
    schema: { value: t(0), label: t(1) },
  },
  // --- section blocks ---
  {
    name: 'hero',
    display_name: 'Hero Carousel',
    is_nestable: true,
    schema: { slides: bloks(0, ['hero_slide']) },
  },
  {
    name: 'awards_marquee',
    display_name: 'Awards Marquee',
    is_nestable: true,
    schema: { eyebrow: t(0), title: t(1), see_all_label: t(2), items: bloks(3, ['icon_item']) },
  },
  {
    name: 'resorts_section',
    display_name: 'Resorts Section',
    is_nestable: true,
    schema: { eyebrow: t(0), title: t(1), lead: ta(2), meta: t(3), resorts: bloks(4, ['resort_card']) },
  },
  {
    name: 'offers_section',
    display_name: 'Offers Section',
    is_nestable: true,
    schema: { eyebrow: t(0), title: t(1), lead: ta(2), card_tag: t(3), view_all_label: t(4), packages: bloks(5, ['offer_package']) },
  },
  {
    name: 'benefits_section',
    display_name: 'Benefits Section',
    is_nestable: true,
    schema: { eyebrow: t(0), title: t(1), items: bloks(2, ['icon_item']) },
  },
  {
    name: 'discover_section',
    display_name: 'Discover Section',
    is_nestable: true,
    schema: { eyebrow: t(0), title: t(1), lead: ta(2), videos: bloks(3, ['discover_video']) },
  },
  {
    name: 'about_section',
    display_name: 'About Section',
    is_nestable: true,
    schema: { eyebrow: t(0), title: t(1), text: ta(2), stats: bloks(3, ['stat']) },
  },
  {
    name: 'honeymoon_section',
    display_name: 'Honeymoon Section',
    is_nestable: true,
    schema: { eyebrow: t(0), title: t(1), perks: ta(2), cta_label: t(3), note: ta(4), image: asset(5) },
  },
  // --- root content type for the page ---
  {
    name: 'page',
    display_name: 'Page',
    is_root: true,
    is_nestable: false,
    schema: {
      body: bloks(0, [
        'hero', 'awards_marquee', 'resorts_section', 'offers_section',
        'benefits_section', 'discover_section', 'about_section', 'honeymoon_section',
      ]),
    },
  },
]

// ---------------------------------------------------------------------
// 2. Home page content (English) — copied from app/data.
// ---------------------------------------------------------------------
const CDN = 'https://xperience-hotels.com/wp-content/uploads/slider/cache/'
const HONEYMOON_IMG = 'https://xperience-hotels.com/wp-content/uploads/2023/06/Honeymooner-Packages-Xperience-hotels-egypt-new-1.jpg'

const RESORTS = [
  { slug: 'sea-breeze', name: 'Sea Breeze Resort', area: 'Naama Bay', score: '8.9', price: 75, img: CDN + 'ced3cd2f6471216ad8e91298c69ba96a/banner-Xperience-Sea-Breeze-Resort-main.jpg', blurb: 'Luxury and comfort in specially designed spaces that blend the charm of the Red Sea with contemporary design — on the shores of Naama Bay.', desc: 'Luxury and comfort in specially designed spaces that combine the charm of the Red Sea with the appeal of contemporary design.' },
  { slug: 'kiroseiz-parkland', name: 'Kiroseiz Parkland', area: 'Naama Bay', score: '8.7', price: 70, img: CDN + 'b5ded7d6fdb6862b173a92ee1744b647/banner-Xperience-Kiroseiz-Parkland-new.jpg', blurb: 'The ultimate hospitality experience for you and your family, with exceptional luxury services and facilities for adults and kids alike.', desc: 'The ultimate hospitality experience for you and your family, with exceptional luxury services and facilities for adults and kids.' },
  { slug: 'kiroseiz-premier', name: 'Kiroseiz Premier', area: 'Naama Bay · Aqua Park', score: '9.0', price: 85, img: CDN + 'f0c339cc26dd975c1327cd453bb7941b/banner-Xperience-Kiroseiz-Premier-new-3.jpg', blurb: 'A family-friendly resort with a 21-slide Premiere Aqua Park, a wide range of accommodation, and a relaxed Red Sea atmosphere.', desc: 'A family-friendly resort with a 21-slide Premiere Aqua Park, a wide range of accommodation, and a relaxed atmosphere.' },
  { slug: 'st-george-homestay', name: 'St. George Homestay', area: "Sharm's Hill", score: '8.6', price: 65, img: CDN + '427b2bd57ef465f1c14fc296d8dcdfe8/banner-Xperience-St.-George-Homestay-new-2.jpg', blurb: "Set on Sharm El Sheikh's tranquil hill, combining a spectacularly cosy atmosphere with an exclusive, homely experience.", desc: "Set on Sharm El Sheikh's tranquil hill, combining a spectacular cozy atmosphere with an exclusive experience." },
  { slug: 'hill-top-beach', name: 'Hill Top Beach', area: 'Hill-Top Reef', score: '8.5', price: 60, img: CDN + '29d4f385b4ee9c95d1a605e28e385298/banner-Xperience-hill-top-new.jpg', blurb: 'An ideal mix of value, comfort and convenience — accommodation with a restaurant and free private parking by the reef.', desc: 'An ideal mix of value, comfort and convenience — accommodation with a restaurant and free private parking.' },
  { slug: 'golden-sandy-beach', name: 'Golden Sandy Beach', area: 'Sharm El-Maia', score: '8.8', price: 68, img: CDN + '8e0bd9dcb7902f2265ad2804b336e9e8/banner-Xperience-Sandy-Beach-Resor-newt.jpg', blurb: 'A private beach area and garden in Sharm El-Maia, on Dusti Road, Ras Umm Sid — relaxed days by the Red Sea.', desc: 'A private beach area and garden in Sharm El-Maia, on Dusti Road, Ras Umm Sid — relaxed days by the Red Sea.' },
]

const AWARD_MARQUEE = [
  { icon: 'leaf', label: 'Travelife Gold — Sustainability' },
  { icon: 'award', label: 'Hotels.com — Guests Rated “Very Good”' },
  { icon: 'star', label: "Tripadvisor Travellers' Choice 2022" },
  { icon: 'utensils', label: 'Preverisk — Food Safety Certified' },
  { icon: 'shield-check', label: 'Preverisk — Health & Hygiene' },
  { icon: 'building-2', label: 'Member of Kiroseiz Group' },
]

const BENEFITS = [
  { icon: 'crown', label: 'VIP Treatment' },
  { icon: 'shirt', label: '10% off laundry' },
  { icon: 'flower-2', label: '10% off Spa' },
  { icon: 'anchor', label: '10% off diving center' },
  { icon: 'utensils', label: '10% off à la carte' },
  { icon: 'clock', label: 'Early check-in · late check-out' },
]

const DISCOVER_VIDEOS = [
  { youtubeId: '_CyrhR3n3B8', tag: 'St. George', title: 'Party Nights, Summer Lights at Xperience St. George' },
  { youtubeId: 'S-oUoUGvATM', tag: 'Kiroseiz', title: 'Step into your summer mood — 21 water slides at Kiroseiz Aqua Park' },
  { youtubeId: 'SO6MJ1ZAtkg', tag: 'Sea Breeze', title: 'Feel the Energy of Summer at Xperience Sea Breeze Resort' },
  { youtubeId: 'w3B-6iIiQK0', tag: 'Sandy Beach', title: 'Summer Is Calling — Xperience Golden Sandy Beach' },
  { youtubeId: 'WQDReDRf6mY', tag: 'Sea Breeze', title: 'Squid Game challenge at Xperience Sea Breeze' },
  { youtubeId: '3mDGLn19ubU', tag: 'Kiroseiz', title: 'Show time & incredible hotel entertainment at Kiroseiz' },
  { youtubeId: 'h57blkUm-WI', tag: 'St. George', title: 'A vibrant preview of our animation activities' },
  { youtubeId: 'iKi9oilAq-E', tag: 'Kiroseiz', title: 'Easter Celebration — an unforgettable family holiday' },
  { youtubeId: 'c3cFSu9hGCo', tag: 'Kiroseiz', title: 'Kids Show Time — fun for the whole family' },
]

const HONEYMOON_PERKS = [
  'Fruit basket upon arrival',
  'Daily minibar refill with local beverages',
  'Complimentary wedding cake',
  'Free upgrade to the next room category*',
  'VIP treatment with VIP amenities',
  'Candle-lit romantic dinner once per stay*',
  'Personalized check-in & check-out*',
  'In-room breakfast on request · 10 pieces of free laundry',
]

const STANDARD_PERKS = [
  'Fruit basket upon arrival',
  'Free minibar refill with local beverages, once per day',
  'Complimentary wedding cake',
  'Free upgrade to next room category — subject to availability',
  'VIP treatment with VIP amenities',
  'Free candle-lit romantic dinner, once per stay (min. 3 nights)',
  'Personalised check-in / check-out — subject to availability',
  'Free breakfast service in the room, upon request',
  'Free laundry for 10 pieces during your stay',
]
const KIROSEIZ_PERKS = [
  'Personalised check-in / check-out — subject to availability',
  'Upgrade to the next room type',
  'Complimentary wedding cake',
  'Free minibar refill with local beverages, once per day',
  'A selection fruit basket, once per stay',
  'A full laundry bag, once per stay',
]

const HONEYMOON_PACKAGES = [
  { slug: 'sea-breeze', fullName: 'Xperience Sea Breeze Resort', loc: 'Naama Bay · Sharm El Sheikh', img: CDN + 'ced3cd2f6471216ad8e91298c69ba96a/banner-Xperience-Sea-Breeze-Resort-main.jpg', perks: STANDARD_PERKS },
  { slug: 'st-george-homestay', fullName: 'Xperience St. George Homestay', loc: "Sharm's Hill · Sharm El Sheikh", img: CDN + '427b2bd57ef465f1c14fc296d8dcdfe8/banner-Xperience-St.-George-Homestay-new-2.jpg', perks: STANDARD_PERKS },
  { slug: 'kiroseiz-premier', fullName: 'Xperience Kiroseiz Premier', loc: 'Aqua Park · Sharm El Sheikh', img: CDN + 'f0c339cc26dd975c1327cd453bb7941b/banner-Xperience-Kiroseiz-Premier-new-3.jpg', perks: KIROSEIZ_PERKS },
  { slug: 'kiroseiz-parkland', fullName: 'Xperience Kiroseiz Parkland', loc: 'Naama Bay · Sharm El Sheikh', img: CDN + 'b5ded7d6fdb6862b173a92ee1744b647/banner-Xperience-Kiroseiz-Parkland-new.jpg', perks: KIROSEIZ_PERKS },
]

// --- build the page body (a list of section bloks) ---
function buildBody() {
  return [
    {
      _uid: uid(), component: 'hero',
      slides: RESORTS.map((r) => ({
        _uid: uid(), component: 'hero_slide',
        name: r.name, area: r.area, blurb: r.blurb, image: assetVal(r.img),
        rating_score: r.score, price_from: String(r.price), slug: r.slug,
      })),
    },
    {
      _uid: uid(), component: 'awards_marquee',
      eyebrow: 'Awarded & Certified', title: 'Recognised across the Red Sea', see_all_label: 'See all awards',
      items: AWARD_MARQUEE.map((a) => ({ _uid: uid(), component: 'icon_item', icon: a.icon, label: a.label })),
    },
    {
      _uid: uid(), component: 'resorts_section',
      eyebrow: 'Our Resorts', title: 'Six ways to meet the Red Sea',
      lead: 'From a 21-slide aqua park to a hilltop hideaway, every Xperience resort sits minutes from the water in Sharm El Sheikh.',
      meta: 'Six Red Sea resorts · Sharm El Sheikh, Egypt',
      resorts: RESORTS.map((r) => ({
        _uid: uid(), component: 'resort_card',
        name: 'Xperience ' + r.name, area: r.area, slug: r.slug, image: assetVal(r.img), description: r.desc,
      })),
    },
    {
      _uid: uid(), component: 'offers_section',
      eyebrow: 'Special Offers', title: 'Honeymooner Packages',
      lead: 'Begin your life together by the Red Sea. Each resort welcomes honeymooners with its own set of thoughtful touches — from wedding cake to candle-lit dinners.',
      card_tag: 'Honeymoon Package', view_all_label: 'View all offers',
      packages: HONEYMOON_PACKAGES.map((p) => ({
        _uid: uid(), component: 'offer_package',
        full_name: p.fullName, slug: p.slug, location: p.loc, image: assetVal(p.img), perks: p.perks.join('\n'),
      })),
    },
    {
      _uid: uid(), component: 'benefits_section',
      eyebrow: 'Book Direct', title: 'Book with benefits',
      items: BENEFITS.map((b) => ({ _uid: uid(), component: 'icon_item', icon: b.icon, label: b.label })),
    },
    {
      _uid: uid(), component: 'discover_section',
      eyebrow: 'Discover the Xperience', title: 'Life at the resorts, in motion',
      lead: 'Sun-soaked days, live shows, aqua-park thrills and unforgettable nights — straight from our resorts in Sharm El Sheikh.',
      videos: DISCOVER_VIDEOS.map((v) => ({ _uid: uid(), component: 'discover_video', youtube_id: v.youtubeId, tag: v.tag, title: v.title })),
    },
    {
      _uid: uid(), component: 'about_section',
      eyebrow: 'Xperience Hospitality Management',
      title: 'A dynamic Egyptian hospitality brand, founded in 2011.',
      text: "Xperience offers international standards with regional expertise. Through a wide range of tailor-made services and diverse modern facilities, we raise the hospitality benchmark to meet every international traveller's needs — a proud member of Kiroseiz Group, with more than 30 years of development across the Red Sea.",
      stats: [
        { _uid: uid(), component: 'stat', value: '6', label: 'Red Sea resorts' },
        { _uid: uid(), component: 'stat', value: '2011', label: 'Founded' },
        { _uid: uid(), component: 'stat', value: '30+', label: 'Years, Kiroseiz Group' },
      ],
    },
    {
      _uid: uid(), component: 'honeymoon_section',
      eyebrow: 'For Two', title: 'Xperience Honeymoon Packages',
      perks: HONEYMOON_PERKS.join('\n'),
      cta_label: 'Book your honeymoon →',
      note: '*Subject to availability. Romantic dinner for stays of 3 nights or more.',
      image: assetVal(HONEYMOON_IMG),
    },
  ]
}

// ---------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------
async function upsertComponents() {
  const { components: existing } = await api('GET', '/components')
  const byName = new Map(existing.map((c) => [c.name, c]))
  for (const comp of COMPONENTS) {
    const found = byName.get(comp.name)
    if (found) {
      await api('PUT', `/components/${found.id}`, { component: { ...comp, id: found.id } })
      console.log(`  ~ updated component  ${comp.name}`)
    } else {
      await api('POST', '/components', { component: comp })
      console.log(`  + created component  ${comp.name}`)
    }
  }
}

async function seedHome() {
  const body = buildBody()
  const { stories } = await api('GET', '/stories?with_slug=home')
  const content = { component: 'page', body }
  // Real path '/' so the Visual Editor previews the app's landing route
  // (the app serves the home page at /, not /home).
  if (stories && stories.length) {
    const id = stories[0].id
    await api('PUT', `/stories/${id}`, {
      story: { name: 'Home', slug: 'home', path: '/', content },
      publish: 1,
    })
    console.log(`  ~ updated + published story  Home (id ${id})`)
  } else {
    const { story } = await api('POST', '/stories', {
      story: { name: 'Home', slug: 'home', is_startpage: true, path: '/', content },
      publish: 1,
    })
    console.log(`  + created + published story  Home (id ${story.id})`)
  }
}

console.log(`Seeding Storyblok space ${SPACE_ID} (${REGION})…`)
console.log('Components:')
await upsertComponents()
console.log('Home story:')
await seedHome()
console.log('Done.')
