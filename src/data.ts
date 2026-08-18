export type ProfileKey = 'homemaker' | 'influencer' | 'broadcaster' | 'casual' | 'power'
export type ToolKind = 'goal' | 'story' | 'bulk' | 'refer' | 'dash'

export interface Deal {
  b: string; n: string; p: string; m: string; pr: number; c: string; img: string; seed: number; exp?: string
}
export interface ProfileDef {
  label: string; cats: string[]; pri: string[]; tool: ToolKind; def: string; blurb: string
}

// AI image via Pollinations (text-to-image over a URL, no API key). model=turbo is fastest.
export function aiImg(prompt: string, seed: number, w = 480, h = 320): string {
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${w}&height=${h}&seed=${seed}&nologo=true&model=turbo`
}

// Fixed render sizes so the on-mount preloader hits the exact same cache keys as the UI.
export const IMG = { deal: [480, 320], hero: [560, 300], flash: [260, 190], story: [480, 620] }

export interface NoteDef { title: string; logic: string; segments: string[] }

/* ------------------------------------------------------------------ *
 * Categories — the picker collage.
 * Tiles are bundled WebP under /tiles, drawn offline. Nothing here
 * touches the network, so the grid paints on first frame with no
 * lazy loading and no layout shift.
 * ------------------------------------------------------------------ */

export interface CatDef { key: string; label: string; tile: string; icon: string }

export const CATEGORIES: CatDef[] = [
  { key: 'Fashion',     label: 'Fashion',     tile: 'fashion',     icon: 'shirt' },
  { key: 'Beauty',      label: 'Beauty',      tile: 'beauty',      icon: 'sparkle' },
  { key: 'Grocery',     label: 'Grocery',     tile: 'grocery',     icon: 'cart' },
  { key: 'Electronics', label: 'Electronics', tile: 'electronics', icon: 'tv' },
  { key: 'Home',        label: 'Home',        tile: 'home',        icon: 'home' },
  { key: 'Kitchen',     label: 'Kitchen',     tile: 'kitchen',     icon: 'cart' },
  { key: 'Accessories', label: 'Accessories', tile: 'accessories', icon: 'gift' },
  { key: 'Footwear',    label: 'Footwear',    tile: 'footwear',    icon: 'shirt' },
  { key: 'Baby',        label: 'Baby & kids', tile: 'baby',        icon: 'gift' },
  { key: 'Travel',      label: 'Travel',      tile: 'travel',      icon: 'plane' },
  { key: 'Fitness',     label: 'Fitness',     tile: 'fitness',     icon: 'dumbbell' },
  { key: 'Mobiles',     label: 'Mobiles',     tile: 'mobiles',     icon: 'phone' },
]

export const tileSrc = (t: string) => `/tiles/${t}.webp`
export const CAT_BY_KEY: Record<string, CatDef> =
  Object.fromEntries(CATEGORIES.map(c => [c.key, c]))

/* ------------------------------------------------------------------ *
 * Step 1 of onboarding — audience, not taste.
 * EarnKaro creators do not share what they personally love, they share
 * what the people on the other end of the link actually buy. Asking
 * where they share and how far it reaches is the stronger cold-start
 * signal, and it is the axis the five segments genuinely differ on.
 * ------------------------------------------------------------------ */

export interface ChannelDef { key: string; label: string; sub: string; icon: string }

export const SHARE_CHANNELS: ChannelDef[] = [
  { key: 'family',    label: 'Family & friends',  sub: 'WhatsApp groups, close circle',  icon: 'wa' },
  { key: 'instagram', label: 'Instagram',         sub: 'Stories, reels, link in bio',    icon: 'ig' },
  { key: 'channel',   label: 'A deals channel',   sub: 'Telegram or WhatsApp broadcast', icon: 'tg' },
  { key: 'multi',     label: 'Everywhere I can',  sub: 'Several platforms at once',      icon: 'net' },
]

export interface ReachDef { key: string; label: string; sub: string }

export const REACH: ReachDef[] = [
  { key: 'tiny',  label: 'Under 50',    sub: 'A close circle' },
  { key: 'small', label: '50 – 500',    sub: 'A few groups' },
  { key: 'mid',   label: '500 – 5,000', sub: 'A real audience' },
  { key: 'large', label: '5,000+',      sub: 'At scale' },
]

/* ------------------------------------------------------------------ *
 * Deals — every category in the collage is backed by real inventory,
 * so following a tile visibly changes the feed instead of returning
 * an empty state.
 * ------------------------------------------------------------------ */

export const DEALS: Deal[] = [
  { b: 'Myntra', n: 'Oversized cotton shirt', p: '899', m: '1,999', pr: 12, c: 'Fashion', seed: 11, img: 'folded oversized cotton shirt, fashion product photo, neutral background, e-commerce' },
  { b: 'Ajio', n: "Levi's slim jeans", p: '1,299', m: '2,999', pr: 12, c: 'Fashion', seed: 15, img: 'folded blue denim slim jeans, fashion product photo, neutral background' },
  { b: 'Nykaa', n: 'Maybelline lip kit', p: '699', m: '1,199', pr: 18, c: 'Beauty', seed: 12, img: 'pink lipstick and lip makeup kit flat lay, beauty product photography, soft pink background' },
  { b: 'Nykaa', n: 'Skincare combo', p: '1,099', m: '1,799', pr: 15, c: 'Beauty', seed: 16, img: 'premium skincare product bottles set, clean beige background, soft beauty photography' },
  { b: 'BigBasket', n: 'Monthly grocery pack', p: '1,450', m: '1,900', pr: 5, c: 'Grocery', seed: 13, exp: 'today', img: 'neatly arranged indian grocery essentials rice dal vegetables in a basket, bright clean product photo' },
  { b: 'BigBasket', n: 'Fresh fruits box', p: '499', m: '650', pr: 6, c: 'Grocery', seed: 20, img: 'fresh fruit box with apples bananas oranges, vibrant grocery product photo' },
  { b: 'Flipkart', n: '43" 4K Smart TV', p: '24,999', m: '39,999', pr: 6, c: 'Electronics', seed: 14, exp: 'flash', img: 'modern 43 inch 4k smart television on a living room console, product photo, minimal' },
  { b: 'Croma', n: 'HP 15 laptop', p: '42,990', m: '52,000', pr: 3, c: 'Electronics', seed: 19, exp: 'new', img: 'modern silver laptop open on a desk, product photo, minimal clean background' },
  { b: 'Amazon', n: 'Cotton bedsheet set', p: '1,199', m: '2,499', pr: 11, c: 'Home', seed: 21, img: 'folded cotton bedsheet set with pillow covers, home textile product photo, soft neutral background' },
  { b: 'Flipkart', n: 'Room air purifier', p: '8,499', m: '13,999', pr: 7, c: 'Home', seed: 22, img: 'modern white room air purifier appliance in a bright living room, product photo, minimal' },
  { b: 'Amazon', n: 'Prestige mixer grinder', p: '2,799', m: '4,500', pr: 7, c: 'Kitchen', seed: 17, img: 'stainless steel kitchen mixer grinder appliance on white background, product photo' },
  { b: 'Amazon', n: 'Nonstick cookware set', p: '2,199', m: '3,800', pr: 9, c: 'Kitchen', seed: 23, exp: 'today', img: 'black nonstick cookware pots and pans set arranged, kitchen product photography, clean background' },
  { b: 'Myntra', n: 'Leather handbag', p: '1,899', m: '3,499', pr: 14, c: 'Accessories', seed: 18, img: 'elegant tan brown leather handbag, fashion product photography, soft studio light' },
  { b: 'Titan', n: 'Analog wrist watch', p: '3,495', m: '5,995', pr: 13, c: 'Accessories', seed: 24, img: 'elegant analog wrist watch with leather strap, product photography, soft studio light' },
  { b: 'Myntra', n: 'Nike Air sneakers', p: '4,999', m: '8,999', pr: 8, c: 'Footwear', seed: 25, exp: '2h', img: 'white and red nike air sneakers, studio product photo, soft shadow, clean light background, e-commerce' },
  { b: 'Ajio', n: 'Puma running shoes', p: '2,299', m: '4,499', pr: 10, c: 'Footwear', seed: 26, img: 'blue running shoes pair, sports footwear product photo, clean white background' },
  { b: 'FirstCry', n: 'Diaper mega pack', p: '1,349', m: '1,899', pr: 9, c: 'Baby', seed: 27, exp: 'today', img: 'baby diaper pack box, clean pastel product photo, bright background' },
  { b: 'FirstCry', n: 'Wooden blocks set', p: '799', m: '1,499', pr: 14, c: 'Baby', seed: 28, img: 'colorful wooden building blocks toy set for kids, bright cheerful product photo' },
  { b: 'MakeMyTrip', n: 'Goa 3N hotel deal', p: '7,999', m: '12,500', pr: 4, c: 'Travel', seed: 29, exp: 'flash', img: 'bright beach resort hotel pool in goa india, travel photography, sunny' },
  { b: 'Amazon', n: 'Cabin trolley bag', p: '2,499', m: '4,999', pr: 12, c: 'Travel', seed: 30, img: 'hard shell cabin trolley suitcase, travel luggage product photo, clean background' },
  { b: 'Decathlon', n: 'Adjustable dumbbells', p: '2,899', m: '4,200', pr: 10, c: 'Fitness', seed: 34, img: 'adjustable dumbbell set on gym floor, fitness equipment product photo, clean' },
  { b: 'Amazon', n: 'Smart fitness band', p: '1,799', m: '3,499', pr: 12, c: 'Fitness', seed: 35, exp: 'new', img: 'black smart fitness tracker band, wearable product photo, clean background' },
  { b: 'Flipkart', n: 'Redmi Note 5G', p: '15,999', m: '19,999', pr: 4, c: 'Mobiles', seed: 36, exp: 'flash', img: 'modern android smartphone front and back, product photo, minimal clean background' },
  { b: 'Croma', n: 'boAt wireless earbuds', p: '1,499', m: '3,990', pr: 16, c: 'Mobiles', seed: 37, img: 'wireless earbuds with charging case, audio product photo, clean white background' },
]

export const PROFILES: Record<ProfileKey, ProfileDef> = {
  homemaker: {
    label: 'Homemaker', tool: 'goal', def: 'Family group',
    cats: ['All', 'Grocery', 'Kitchen', 'Home', 'Baby', 'Beauty', 'Fashion'],
    pri: ['Grocery', 'Kitchen', 'Home', 'Baby'],
    blurb: 'Shares into family and neighbourhood groups. Buys the same things she recommends, so trust is the asset and a monthly earnings goal is the motivator.',
  },
  influencer: {
    label: 'Influencer', tool: 'story', def: 'Instagram',
    cats: ['All', 'Fashion', 'Beauty', 'Accessories', 'Footwear'],
    pri: ['Fashion', 'Beauty', 'Accessories', 'Footwear'],
    blurb: 'Publishes to followers who came for taste. Needs the link to look like content, not like an ad, so story-ready creative is the unlock.',
  },
  broadcaster: {
    label: 'Broadcaster', tool: 'bulk', def: 'Telegram',
    cats: ['Trending', 'All', 'Electronics', 'Mobiles', 'Fashion', 'Travel'],
    pri: ['Electronics', 'Mobiles', 'Fashion'],
    blurb: 'Runs a deals channel on volume. Cares about speed and coverage, so bulk selection and one-tap broadcast beat any single-deal polish.',
  },
  casual: {
    label: 'Casual sharer', tool: 'refer', def: 'WhatsApp',
    cats: ['All', 'Fashion', 'Electronics', 'Beauty', 'Travel'],
    pri: ['Fashion', 'Electronics', 'Travel'],
    blurb: 'Shares occasionally, to a handful of people. Will not learn a workflow, so referral mechanics carry more weight than earnings tooling.',
  },
  power: {
    label: 'Power affiliate', tool: 'dash', def: 'Telegram',
    cats: ['Trending', 'All', 'Electronics', 'Mobiles', 'Travel', 'Fitness'],
    pri: ['Electronics', 'Mobiles', 'Travel'],
    blurb: 'Treats this as a business across several channels. Optimises on data, so the dashboard and payout reliability are the product.',
  },
}

export const CATEGORY_ICON: Record<string, string> = {
  All: 'grid', Trending: 'bolt',
  ...Object.fromEntries(CATEGORIES.map(c => [c.key, c.icon])),
}

/* ------------------------------------------------------------------ *
 * Segment inference.
 * A transparent additive model, deliberately not a black box: each
 * segment scores the channel, the reach band and the overlap between
 * followed categories and that segment's priority set. The winning
 * segment is shown to the user with its reasons and an escape hatch,
 * because a cold-start guess that cannot be corrected is worse than
 * no guess at all.
 * ------------------------------------------------------------------ */

interface Weights { channel: Record<string, number>; reach: Record<string, number> }

const W: Record<ProfileKey, Weights> = {
  homemaker:   { channel: { family: 3.4, instagram: 0.2, channel: 0.3, multi: 1.0 }, reach: { tiny: 1.8, small: 2.2, mid: 0.6, large: 0.1 } },
  influencer:  { channel: { family: 0.4, instagram: 3.6, channel: 0.6, multi: 1.6 }, reach: { tiny: 0.4, small: 1.2, mid: 2.4, large: 1.8 } },
  broadcaster: { channel: { family: 0.5, instagram: 0.6, channel: 3.4, multi: 2.0 }, reach: { tiny: 0.2, small: 0.9, mid: 2.0, large: 2.6 } },
  casual:      { channel: { family: 2.4, instagram: 0.8, channel: 0.4, multi: 0.5 }, reach: { tiny: 3.0, small: 1.2, mid: 0.2, large: 0.1 } },
  power:       { channel: { family: 0.3, instagram: 1.0, channel: 2.6, multi: 3.2 }, reach: { tiny: 0.1, small: 0.5, mid: 1.4, large: 3.2 } },
}

const CAT_WEIGHT = 1.15

export interface SegScore {
  key: ProfileKey
  label: string
  score: number
  share: number          // 0..1, normalised across segments, for the bars
  reasons: string[]
}

export function inferSegment(channel: string | null, reach: string | null, follows: string[]): SegScore[] {
  const raw = (Object.keys(W) as ProfileKey[]).map(key => {
    const w = W[key]
    const p = PROFILES[key]
    const reasons: string[] = []

    let score = 0.35                                   // flat prior, keeps bars from ever hitting zero
    if (channel && w.channel[channel]) {
      score += w.channel[channel]
      if (w.channel[channel] >= 2) reasons.push(SHARE_CHANNELS.find(c => c.key === channel)?.label || '')
    }
    if (reach && w.reach[reach]) {
      score += w.reach[reach]
      if (w.reach[reach] >= 1.8) reasons.push(REACH.find(r => r.key === reach)?.label + ' reach')
    }
    const hits = follows.filter(f => p.pri.includes(f))
    score += hits.length * CAT_WEIGHT
    if (hits.length) reasons.push(hits.slice(0, 3).join(', '))

    return { key, label: p.label, score, share: 0, reasons: reasons.filter(Boolean) }
  })

  const total = raw.reduce((s, r) => s + r.score, 0) || 1
  return raw
    .map(r => ({ ...r, share: r.score / total }))
    .sort((a, b) => b.score - a.score)
}

/* ------------------------------------------------------------------ *
 * Feed ranking. Followed categories are an explicit, user-stated
 * signal so they outrank the inferred segment's affinity, which is
 * only a guess. Expiring deals get a small nudge on top.
 * ------------------------------------------------------------------ */

export function scoreDeal(d: Deal, p: ProfileDef, follows: string[] = []): number {
  let s = 0
  if (follows.includes(d.c)) s += 4 - Math.min(follows.indexOf(d.c), 3) * 0.25
  if (p.pri.includes(d.c)) s += 3 - p.pri.indexOf(d.c) * 0.5
  if (d.exp) s += 0.5
  return s
}

export const TOP = [
  { title: 'Beauty Bonanza', sub: 'Up to 60% off · 18% profit', seed: 51, cat: 'Beauty', img: 'beauty cosmetics sale banner, lipstick and skincare, soft pink studio, premium' },
  { title: 'Grocery Stock-up', sub: 'Daily essentials · 5% profit', seed: 52, cat: 'Grocery', img: 'indian grocery essentials arranged, bright clean banner, vegetables and staples' },
  { title: 'Fashion Week drops', sub: 'New arrivals · 12% profit', seed: 53, cat: 'Fashion', img: 'fashion clothing flat lay banner, trendy outfits, editorial pastel' },
]

export const FLASH = [
  { b: 'Flipkart', n: '4K Smart TV', pr: 6, seed: 14, mins: 47, img: 'modern 4k smart television product photo, minimal' },
  { b: 'Myntra', n: 'Nike sneakers', pr: 8, seed: 25, mins: 124, img: 'white nike sneakers product photo studio' },
  { b: 'Nykaa', n: 'Lip kit', pr: 18, seed: 12, mins: 18, img: 'pink lipstick makeup kit product photo' },
]

export const CHANNELS = ['WhatsApp', 'Telegram', 'Instagram', 'Friends & family']

export function allImageUrls(): string[] {
  return [
    ...DEALS.map(d => aiImg(d.img, d.seed, IMG.deal[0], IMG.deal[1])),
    ...TOP.map(t => aiImg(t.img, t.seed, IMG.hero[0], IMG.hero[1])),
    ...FLASH.map(f => aiImg(f.img, f.seed, IMG.flash[0], IMG.flash[1])),
  ]
}
