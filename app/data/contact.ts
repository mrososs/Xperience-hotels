// Contact Us page content. Ported from the design bundle's
// "Contact Us.html" — entity content stays bilingual in the data layer
// (selected via tBi); UI strings live in the i18n catalogs
// (contactPage.*). All contact details, addresses and map embeds are the
// real ones from xperience-hotels.com/contact-us.

import type { Bilingual as Bi } from './resorts'

export const CONTACT_HERO_IMG =
  'https://xperience-hotels.com/wp-content/uploads/2022/10/banner-Xperience-Kiroseiz-Parkland-overview.jpg'

/** Central reservations line + channels used by the quick-action strip. */
export const CONTACT_PHONE = { label: '+20 69 360 1212', href: 'tel:+20693601212' }
export const CONTACT_EMAIL = 'info@xperience-hotels.com'
export const CONTACT_WHATSAPP = 'https://wa.me/20693601212'

/** Cairo head office (aside card). */
export const HQ_PHONES = [
  { label: '+2 02 267 01558', href: 'tel:+20226701558' },
  { label: '+2 02 267 015 52', href: 'tel:+20226701552' },
]
export const HQ_FAX = '+2 02 267 01554'

/** Hero fact chips. */
export interface ContactFact {
  icon: string
  text: Bi
}

export const CONTACT_FACTS: ContactFact[] = [
  { icon: 'building-2', text: { en: 'Cairo head office', ar: 'المكتب الرئيسي بالقاهرة' } },
  { icon: 'palmtree', text: { en: 'Sharm El Sheikh resorts', ar: 'منتجعات شرم الشيخ' } },
  { icon: 'clock', text: { en: '24h reception', ar: 'استقبال 24 ساعة' } },
]

/** Contact-form subject options. */
export const CONTACT_SUBJECTS: Bi[] = [
  { en: 'General enquiry', ar: 'استفسار عام' },
  { en: 'Reservation', ar: 'حجز' },
  { en: 'Meetings & events', ar: 'اجتماعات وفعاليات' },
  { en: 'Feedback', ar: 'ملاحظات' },
  { en: 'Travel agency / corporate', ar: 'وكالة سفر / شركات' },
  { en: 'Careers', ar: 'الوظائف' },
]

/** "Which resort?" options. */
export const CONTACT_RESORT_OPTIONS: Bi[] = [
  { en: 'Any / not sure', ar: 'أي منتجع / غير متأكد' },
  { en: 'Xperience Sea Breeze Resort', ar: 'إكسبيريانس سي بريز' },
  { en: 'Xperience Kiroseiz Parkland', ar: 'إكسبيريانس كيروسيز باركلاند' },
  { en: 'Xperience Kiroseiz Premier', ar: 'إكسبيريانس كيروسيز بريمير' },
  { en: 'Xperience St. George Homestay', ar: 'إكسبيريانس سانت جورج' },
  { en: 'Xperience Hill Top Beach', ar: 'إكسبيريانس هيل توب' },
  { en: 'Xperience Golden Sandy Beach', ar: 'إكسبيريانس جولدن ساندي' },
]

/** Interactive map directory entries. */
export interface ContactLocation {
  id: string
  icon: string
  name: Bi
  area: Bi
  email: string
  tel: string
  /** Google Maps embed src swapped into the iframe. */
  map: string
  /** External "Directions" link. */
  mapUrl: string
}

export const CONTACT_LOCATIONS: ContactLocation[] = [
  {
    id: 'sea-breeze',
    icon: 'palmtree',
    name: { en: 'Sea Breeze Resort', ar: 'منتجع سي بريز' },
    area: { en: "Shark's Bay, Sharm El Sheikh", ar: 'خليج القرش، شرم الشيخ' },
    email: 'info.seabreeze@xperience-hotels.com',
    tel: '+2 069 360 4700',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3524.5687815531364!2d34.3835166!3d27.945862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145349ce8c97505d%3A0x364d177adb985d72!2sXperience%20Sea%20Breeze%20Resort!5e0!3m2!1sen!2seg!4v1669112840501!5m2!1sen!2seg',
    mapUrl: 'https://maps.app.goo.gl/o9wDHu13GskDSBwT8',
  },
  {
    id: 'kiroseiz-parkland',
    icon: 'palmtree',
    name: { en: 'Kiroseiz Parkland', ar: 'كيروسيز باركلاند' },
    area: { en: 'Naama Bay, Sharm El Sheikh', ar: 'خليج نعمة، شرم الشيخ' },
    email: 'info.kiroseiz@xperience-hotels.com',
    tel: '+20 69 360 1212',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3525.3089358410157!2d34.34012390000001!3d27.923172899999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1453378d65012de9%3A0xe1f5fe8fc879b707!2sXperience%20Kiroseiz%20Parkland!5e0!3m2!1sen!2seg!4v1669112726976!5m2!1sen!2seg',
    mapUrl: 'https://maps.app.goo.gl/TD9hZMWsSbSJ7YKo9',
  },
  {
    id: 'kiroseiz-premier',
    icon: 'palmtree',
    name: { en: 'Kiroseiz Premier', ar: 'كيروسيز بريمير' },
    area: { en: 'Naama Bay, Sharm El Sheikh', ar: 'خليج نعمة، شرم الشيخ' },
    email: 'info.kiroseiz@xperience-hotels.com',
    tel: '+20 69 360 1212',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3525.3089358410157!2d34.34012390000001!3d27.923172899999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1453378d65012de9%3A0xe1f5fe8fc879b707!2sXperience%20Kiroseiz%20Parkland!5e0!3m2!1sen!2seg!4v1669112726976!5m2!1sen!2seg',
    mapUrl: 'https://maps.app.goo.gl/TD9hZMWsSbSJ7YKo9',
  },
  {
    id: 'st-george',
    icon: 'palmtree',
    name: { en: 'St. George Homestay', ar: 'سانت جورج هومستاي' },
    area: { en: 'Um El Sid Hill, Sharm El Sheikh', ar: 'هضبة أم السيد، شرم الشيخ' },
    email: 'info.stgeorge@xperience-hotels.com',
    tel: '+20 69 366 0888',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3526.864679943969!2d34.305999400000005!3d27.875426899999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1453398b74f0902b%3A0x7d23b9f7521e2d6c!2sXperience%20St.George%20Homestay!5e0!3m2!1sen!2seg!4v1669112798648!5m2!1sen!2seg',
    mapUrl: 'https://maps.app.goo.gl/A6FLnUV4vnsy3n5CA',
  },
  {
    id: 'head-office',
    icon: 'building-2',
    name: { en: 'Head Office — Cairo', ar: 'المكتب الرئيسي — القاهرة' },
    area: { en: 'Sheraton, Cairo', ar: 'شيراتون، القاهرة' },
    email: 'info@xperience-hotels.com',
    tel: '+2 02 267 01558',
    map: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13808.196764500888!2d31.375649!3d30.0927775!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145817b4d25cf089%3A0xd6e146740ed17f02!2sXperience%20Hospitality%20Management!5e0!3m2!1sen!2seg!4v1686649644232!5m2!1sen!2seg',
    mapUrl: 'https://www.google.com/maps/search/Xperience+Hospitality+Management+Cairo',
  },
]

/** Index of the location selected on first paint (Kiroseiz Parkland). */
export const CONTACT_DEFAULT_LOCATION = 1
