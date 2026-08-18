export type ProfileKey = 'homemaker' | 'influencer' | 'broadcaster' | 'casual' | 'power'
export type ToolKind = 'goal' | 'story' | 'bulk' | 'refer' | 'dash'

export interface Deal {
  b: string; n: string; p: string; m: string; pr: number; c: string; img: string; seed: number; exp?: string
}
export interface ProfileDef {
  label: string; cats: string[]; pri: string[]; tool: ToolKind; def: string
}

// AI image via Pollinations (text-to-image over a URL, no API key). model=turbo is fastest.
export function aiImg(prompt: string, seed: number, w = 480, h = 320): string {
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${w}&height=${h}&seed=${seed}&nologo=true&model=turbo`
}

// Fixed render sizes so the on-mount preloader hits the exact same cache keys as the UI.
export const IMG = { deal: [480, 320], hero: [560, 300], flash: [260, 190], story: [480, 620] }

export interface NoteDef { title: string; logic: string; segments: string[] }

export const TOP = [
  { title: 'Beauty Bonanza', sub: 'Up to 60% off · 18% profit', seed: 51, img: 'beauty cosmetics sale banner, lipstick and skincare, soft pink studio, premium' },
  { title: 'Grocery Stock-up', sub: 'Daily essentials · 5% profit', seed: 52, img: 'indian grocery essentials arranged, bright clean banner, vegetables and staples' },
  { title: 'Fashion Week drops', sub: 'New arrivals · 12% profit', seed: 53, img: 'fashion clothing flat lay banner, trendy outfits, editorial pastel' },
]

export const FLASH = [
  { b: 'Flipkart', n: '4K Smart TV', pr: 6, seed: 14, mins: 47, img: 'modern 4k smart television product photo, minimal' },
  { b: 'Myntra', n: 'Nike sneakers', pr: 8, seed: 11, mins: 124, img: 'white nike sneakers product photo studio' },
  { b: 'Nykaa', n: 'Lip kit', pr: 18, seed: 12, mins: 18, img: 'pink lipstick makeup kit product photo' },
]

export const DEALS: Deal[] = [
  { b: 'Myntra', n: 'Nike Air sneakers', p: '4,999', m: '8,999', pr: 8, c: 'Fashion', seed: 11, exp: '2h', img: 'white and red nike air sneakers, studio product photo, soft shadow, clean light background, e-commerce' },
  { b: 'Nykaa', n: 'Maybelline lip kit', p: '699', m: '1,199', pr: 18, c: 'Beauty', seed: 12, img: 'pink lipstick and lip makeup kit flat lay, beauty product photography, soft pink background' },
  { b: 'BigBasket', n: 'Monthly grocery pack', p: '1,450', m: '1,900', pr: 5, c: 'Grocery', seed: 13, exp: 'today', img: 'neatly arranged indian grocery essentials rice dal vegetables in a basket, bright clean product photo' },
  { b: 'Flipkart', n: '43" 4K Smart TV', p: '24,999', m: '39,999', pr: 6, c: 'Electronics', seed: 14, exp: 'flash', img: 'modern 43 inch 4k smart television on a living room console, product photo, minimal' },
  { b: 'Ajio', n: "Levi's slim jeans", p: '1,299', m: '2,999', pr: 12, c: 'Fashion', seed: 15, img: 'folded blue denim slim jeans, fashion product photo, neutral background' },
  { b: 'Nykaa', n: 'Skincare combo', p: '1,099', m: '1,799', pr: 15, c: 'Beauty', seed: 16, img: 'premium skincare product bottles set, clean beige background, soft beauty photography' },
  { b: 'Amazon', n: 'Prestige mixer grinder', p: '2,799', m: '4,500', pr: 7, c: 'Kitchen', seed: 17, img: 'stainless steel kitchen mixer grinder appliance on white background, product photo' },
  { b: 'Myntra', n: 'Leather handbag', p: '1,899', m: '3,499', pr: 14, c: 'Accessories', seed: 18, img: 'elegant tan brown leather handbag, fashion product photography, soft studio light' },
  { b: 'Croma', n: 'HP 15 laptop', p: '42,990', m: '52,000', pr: 3, c: 'Electronics', seed: 19, exp: 'new', img: 'modern silver laptop open on a desk, product photo, minimal clean background' },
  { b: 'BigBasket', n: 'Fresh fruits box', p: '499', m: '650', pr: 6, c: 'Grocery', seed: 20, img: 'fresh fruit box with apples bananas oranges, vibrant grocery product photo' },
]

export const PROFILES: Record<ProfileKey, ProfileDef> = {
  homemaker:   { label: 'Homemaker',        cats: ['All', 'Grocery', 'Beauty', 'Kitchen', 'Home', 'Fashion'], pri: ['Grocery', 'Kitchen', 'Beauty'], tool: 'goal',  def: 'Family group' },
  influencer:  { label: 'Influencer',       cats: ['All', 'Fashion', 'Beauty', 'Accessories', 'Footwear'],    pri: ['Fashion', 'Accessories', 'Beauty'], tool: 'story', def: 'Instagram' },
  broadcaster: { label: 'Broadcaster',      cats: ['Trending', 'All', 'Electronics', 'Fashion'],              pri: ['Electronics', 'Fashion'], tool: 'bulk',  def: 'Telegram' },
  casual:      { label: 'Casual sharer',    cats: ['All', 'Fashion', 'Electronics', 'Beauty'],                pri: ['Fashion', 'Electronics'], tool: 'refer', def: 'WhatsApp' },
  power:       { label: 'Power affiliate',  cats: ['Trending', 'All', 'Electronics'],                         pri: ['Electronics'], tool: 'dash',  def: 'Telegram' },
}

export const CATEGORY_ICON: Record<string, string> = {
  All: 'grid', Fashion: 'shirt', Beauty: 'sparkle', Grocery: 'cart', Electronics: 'tv',
  Home: 'home', Accessories: 'gift', Kitchen: 'cart', Footwear: 'shirt', Trending: 'bolt',
}

export const SLIDES = [
  { h: 'Turn deals into income', seed: 31, img: '3D isometric illustration of online shopping bags and coins, pastel gradient background, soft clay render, app onboarding art' },
  { h: 'Share in seconds', seed: 32, img: '3D isometric illustration of a smartphone sharing links to chat bubbles, pastel gradient, soft clay render, app onboarding art' },
  { h: 'Get paid, reliably', seed: 33, img: '3D isometric illustration of a wallet with rupee coins and a growth chart, pastel gradient, soft clay render, app onboarding art' },
]

export const INTERESTS = ['Fashion', 'Beauty', 'Grocery', 'Electronics', 'Home', 'Kitchen', 'Accessories', 'Footwear']
export const CHANNELS = ['WhatsApp', 'Telegram', 'Instagram', 'Friends & family']

export function scoreDeal(d: Deal, p: ProfileDef): number {
  let s = p.pri.includes(d.c) ? 3 - p.pri.indexOf(d.c) : 0
  if (d.exp) s += 0.5
  return s
}

export function allImageUrls(): string[] {
  return [
    ...DEALS.map(d => aiImg(d.img, d.seed, IMG.deal[0], IMG.deal[1])),
    ...TOP.map(t => aiImg(t.img, t.seed, IMG.hero[0], IMG.hero[1])),
    ...FLASH.map(f => aiImg(f.img, f.seed, IMG.flash[0], IMG.flash[1])),
  ]
}
