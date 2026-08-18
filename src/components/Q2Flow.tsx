import { useState, useEffect } from 'react'

type Deal = 'beauty' | 'dress'
type Path = 'without' | 'with'
type Step = 'home' | 'suite' | 'identity' | 'path' | 'paywall' | 'payment' | 'gen' | 'preview' | 'posted' | 'insta' | 'dm' | 'store'

const DEALS: Record<Deal, any> = {
  beauty: {
    brand: 'Nykaa', name: 'Lip + skincare combo', price: '699', mrp: '1,199', pr: 18, emoji: '💄',
    without: '/video/beauty_without.mp4', with: '/video/beauty_with.mp4',
    cap: "My everyday lip + skincare combo is 18% off 💄 — soft, long-lasting, perfect for festive looks. Comment LINK for the deal. #ad",
  },
  dress: {
    brand: 'Myntra', name: 'Floral summer dress', price: '4,999', mrp: '8,999', pr: 8, emoji: '👗',
    without: '/video/dress_without.mp4', with: '/video/dress_with.mp4',
    cap: "Found THE summer dress 🌸 under ₹5,000, down from ₹8,999. Comment LINK and I'll DM you the deal. #ad",
  },
}
const ORDER: Deal[] = ['beauty', 'dress']

function classify(text: string): { intent: string; reply: string } | null {
  const t = text.toLowerCase()
  if (/\b(link|buy|deal|code|shop|order)\b|🔗/.test(t)) return { intent: 'wants the link', reply: "Here's the deal 👇" }
  if (/\b(price|cost|how much|rate|kitna)\b|💰/.test(t)) return { intent: 'price query', reply: "It's ₹{price} (was ₹{mrp}) 👇" }
  if (/\b(size|sizes|small|medium|large|fit|shade)\b/.test(t)) return { intent: 'variant query', reply: 'Comes in S/M/L — grab it here 👇' }
  if (/😍|🥰|❤️|🔥|love|need|want|gorgeous|obsessed/.test(t)) return { intent: 'high intent (sentiment)', reply: 'You need this 😍 here you go 👇' }
  return null
}

function Flow({ title, nodes }: { title: string; nodes: { t: string; sub?: string; hl?: boolean; warn?: boolean }[] }) {
  return (
    <div className="q2f-flow">
      <div className="q2f-flowt">{title}</div>
      {nodes.map((n, i) => (
        <div key={i}><div className={'q2f-node' + (n.hl ? ' hl' : '') + (n.warn ? ' warn' : '')}><div className="q2f-nt">{n.t}</div>{n.sub && <div className="q2f-ns">{n.sub}</div>}</div>{i < nodes.length - 1 && <div className="q2f-arr">↓</div>}</div>
      ))}
    </div>
  )
}

const STEP_C: Record<string, [string, string]> = {
  teal: ['#16433d', '#2DD4BF'], amber: ['#46380f', '#F2C14E'], purple: ['#2c2f55', '#9db4ff'], gray: ['#1a201f', '#5b6b69'],
}
function Edge({ d, label, lx, ly }: { d: string; label?: string; lx?: number; ly?: number }) {
  return (<>
    <path className="q2edge" d={d} fill="none" stroke="rgba(157,176,173,.7)" strokeWidth="1.8" markerEnd="url(#ah)" />
    {label && <text className="q2lbl" x={lx} y={ly} fontSize="11" fontWeight="700" textAnchor="middle">{label}</text>}
  </>)
}
function Pill({ cx, cy, w, label }: { cx: number; cy: number; w: number; label: string }) {
  return (<g><rect x={cx - w / 2} y={cy - 19} width={w} height="38" rx="19" fill="#2DD4BF" /><text x={cx} y={cy + 4} fontSize="12.5" fontWeight="700" fill="#04201e" textAnchor="middle">{label}</text></g>)
}
function Dmd({ cx, cy, lines }: { cx: number; cy: number; lines: string[] }) {
  const hw = 68, hh = 42
  return (<g>
    <polygon points={`${cx},${cy - hh} ${cx + hw},${cy} ${cx},${cy + hh} ${cx - hw},${cy}`} fill="#0f5a52" stroke="#2DD4BF" strokeWidth="1.6" />
    {lines.map((l, i) => <text key={i} x={cx} y={cy - (lines.length - 1) * 7 + i * 14 + 4} fontSize="11" fontWeight="600" fill="#EAF2F1" textAnchor="middle">{l}</text>)}
  </g>)
}
function Box({ cx, cy, lines, kind = 'teal', w = 118 }: { cx: number; cy: number; lines: string[]; kind?: string; w?: number }) {
  const c = STEP_C[kind]; const h = 46
  return (<g>
    <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx="9" fill={c[0]} stroke={c[1]} strokeWidth="1.4" />
    {lines.map((l, i) => <text key={i} x={cx} y={cy - (lines.length - 1) * 7 + i * 14 + 4} fontSize="10.5" fontWeight="600" fill="#EAF2F1" textAnchor="middle">{l}</text>)}
  </g>)
}

function ArchOverlay({ close }: { close: () => void }) {
  return (
    <div className="q2arch-wrap" onClick={close}>
      <div className="q2arch wide" onClick={e => e.stopPropagation()}>
        <div className="q2arch-hd"><div><div className="q2f-kick">Under the hood</div><div className="q2arch-t">How the Creator Suite decides</div></div><button onClick={close}>✕</button></div>
        <div className="q2arch-legend"><span><i className="dia" />decision</span><span><i style={{ background: '#16433d', border: '1px solid #2DD4BF' }} />step</span><span><i style={{ background: '#46380f', border: '1px solid #F2C14E' }} />cost / Pro</span><span><i style={{ background: '#2c2f55', border: '1px solid #9db4ff' }} />conversion</span></div>
        <svg viewBox="0 0 1040 520" className="q2arch-svg">
          <defs><marker id="ah" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9DB0AD" /></marker></defs>

          {/* LEFT TREE — creating the reel */}
          <text x="115" y="10" fontSize="11" fontWeight="800" fill="#2DD4BF" letterSpacing="0.5">CREATE THE REEL</text>
          <Pill cx={230} cy={32} w={124} label="Open a deal" />
          <Edge d="M230 51 V70" />
          <Dmd cx={230} cy={110} lines={['Make a Reel?']} />
          <Edge d="M298 110 H332" label="NO" lx={315} ly={103} />
          <Box cx={394} cy={110} lines={['Copy &', 'share link']} />
          <Edge d="M230 152 V174 H170 V194" label="YES" lx={198} ly={168} />
          <Dmd cx={170} cy={234} lines={['Put yourself', 'in it?']} />
          <Edge d="M238 234 H302" label="NO" lx={270} ly={227} />
          <Box cx={364} cy={234} lines={['Product-only', 'reel (free)']} />
          <Edge d="M170 276 V300 H120 V320" label="YES" lx={148} ly={294} />
          <Dmd cx={120} cy={360} lines={['Pro + look', 'ready?']} />
          <Edge d="M52 360 H34 V438" label="NO" lx={43} ly={402} />
          <Box cx={70} cy={462} lines={['Set up look', '+ go Pro']} kind="amber" />
          <Edge d="M120 402 V420 H210 V438" label="YES" lx={170} ly={414} />
          <Box cx={210} cy={462} lines={['With-you', 'reel ✨']} />

          {/* RIGHT TREE — converting the audience */}
          <text x="690" y="10" fontSize="11" fontWeight="800" fill="#9db4ff" letterSpacing="0.5">CONVERT THE AUDIENCE</text>
          <Pill cx={770} cy={32} w={124} label="Reel is live" />
          <Edge d="M770 51 V70" />
          <Dmd cx={770} cy={110} lines={['Comment', 'received?']} />
          <Edge d="M770 152 V174 H690 V194" label="YES" lx={718} ly={168} />
          <Edge d="M838 110 H910 V194" label="NO" lx={866} ly={103} />
          <Dmd cx={690} cy={234} lines={['Buying', 'intent?']} />
          <Dmd cx={910} cy={234} lines={['Opens bio', 'link?']} />
          <Edge d="M690 276 V300 H610 V320" label="YES" lx={638} ly={294} />
          <Box cx={610} cy={343} lines={['Auto-DM', 'the link']} kind="purple" w={112} />
          <Edge d="M690 276 V300 H745 V320" label="NO" lx={722} ly={294} />
          <Box cx={745} cy={343} lines={['No DM', '(no spam)']} kind="gray" w={112} />
          <Edge d="M910 276 V300 H875 V320" label="YES" lx={892} ly={294} />
          <Box cx={875} cy={343} lines={['Storefront', '→ sale']} kind="purple" w={112} />
          <Edge d="M910 276 V300 H985 V320" label="NO" lx={952} ly={294} />
          <Box cx={985} cy={343} lines={['Retarget', 'later']} kind="gray" w={104} />
        </svg>
        <div className="q2arch-note">Two decision trees — creating the reel (left) and converting the audience (right). Diamonds are decisions; the dashes flow along the path the data takes. Instagram is simulated in the demo; the logic above is what production runs.</div>
      </div>
    </div>
  )
}

const JUMP: { s: Step; l: string }[] = [
  { s: 'home', l: 'Q1 home' }, { s: 'suite', l: 'Creator Studio' }, { s: 'identity', l: 'Identity' },
  { s: 'path', l: 'Path' }, { s: 'paywall', l: 'Paywall' }, { s: 'gen', l: 'AI pipeline' },
  { s: 'preview', l: 'Reel preview' }, { s: 'insta', l: 'IG profile' }, { s: 'dm', l: 'Comment → DM' },
  { s: 'store', l: 'Storefront' },
]

const PNS: { icon: string; title: string; body: string; tag: string }[] = [
  { icon: '✨', title: 'Make your first Reel', body: "You're set up — turn today's top deal into a Reel in 30 seconds →", tag: 'Activation' },
  { icon: '🔥', title: 'Your saree Reel is flying', body: '1,840 clicks already. Make another from a trending deal?', tag: 'Repeat use' },
  { icon: '💬', title: '23 people want the link', body: 'Comments are piling up on your Reel — turn on Auto DM and never miss one.', tag: 'Auto DM' },
  { icon: '🛍', title: 'Your bio link is empty', body: 'Add your 5 best deals — it stays live and never goes dead.', tag: 'Storefront' },
  { icon: '⏳', title: 'Selling out tonight', body: 'The dress you posted sells out tonight — one tap to re-share before it\'s gone.', tag: 'Velocity' },
]

const EDGES: { c: string; h: string; p: string }[] = [
  { c: 'Creator account, not Business', h: "Can't auto-publish", p: 'Meta only allows auto-publish for Business accounts. We export the finished Reel straight to the IG composer instead — one tap to post.' },
  { c: 'Deal expires mid-flow', h: 'No dead links', p: 'The storefront auto-prunes it and the Reel Maker blocks starting on a dead deal, suggesting a live one in the same category.' },
  { c: 'Low-intent comment ("nice!")', h: 'No DM', p: 'The intent classifier fires only on buying signals. Chatter gets nothing — we never spam, which keeps us inside Meta\'s rules.' },
  { c: 'Comment storm (>200/hr)', h: 'Rate limit', p: 'Meta caps automated DMs at ~200/hr. We queue and throttle, sending highest-intent comments first so the best leads never wait.' },
  { c: 'Cloning consent revoked', h: 'Clone deleted', p: 'The stored voice/face is erased (DPDP right to erasure); "with you" gracefully falls back to a freshly recorded hook.' },
  { c: 'Meta app-review still pending', h: 'Ship a smaller MVP', p: 'A keyword-only Auto DM (lighter permissions) launches first; the AI intent layer switches on once messaging permissions clear review.' },
  { c: 'Payment fails / cancels', h: 'No dead end', p: 'She stays on the free tier — a product-only reel and basic Auto DM still work, so she never hits a wall.' },
]

function InfoOverlay({ title, kicker, close, children }: { title: string; kicker: string; close: () => void; children: any }) {
  return (
    <div className="q2arch-wrap" onClick={close}>
      <div className="q2arch" onClick={e => e.stopPropagation()}>
        <div className="q2arch-hd"><div><div className="q2f-kick">{kicker}</div><div className="q2arch-t">{title}</div></div><button onClick={close}>✕</button></div>
        {children}
      </div>
    </div>
  )
}

export default function Q2Flow() {
  const [step, setStep] = useState<Step>('home')
  const [deal, setDeal] = useState<Deal>('beauty')
  const [path, setPath] = useState<Path>('with')
  const [idSet, setIdSet] = useState(false)
  const [comment, setComment] = useState('')
  const [dm, setDm] = useState<{ intent: string; reply: string } | null>(null)
  const [miss, setMiss] = useState(false)
  const [arch, setArch] = useState(false)
  const [info, setInfo] = useState<null | 'pn' | 'edge'>(null)
  const go = (s: Step) => { setStep(s); setDm(null); setMiss(false) }

  const d = DEALS[deal]
  const vid = path === 'without' ? d.without : d.with

  useEffect(() => { if (step === 'gen') { const t = setTimeout(() => setStep('preview'), 2800); return () => clearTimeout(t) } }, [step])

  const send = (text: string) => {
    setComment('')
    const r = classify(text)
    if (r) { setMiss(false); setDm({ intent: r.intent, reply: r.reply.replace('{price}', d.price).replace('{mrp}', d.mrp) }) }
    else { setDm(null); setMiss(true) }
  }
  const choosePath = (p: Path) => {
    setPath(p)
    if (p === 'without') setStep('gen')
    else setStep(idSet ? 'paywall' : 'identity')
  }

  const guide: Record<Step, { h: string; p: string; flow: any }> = {
    home: { h: '1 · Discovery — where it begins', p: "This is Aisha's normal EarnKaro home (Q1). The question Q2 must answer is: how does she even find the creator tools? Answer — we nudge. The personalization engine knows she posts to Instagram, so it surfaces a Creator Studio banner here (and in her menu, and after she shares). Tap the glowing banner.", flow: <Flow title="How we nudge (entry points)" nodes={[{ t: 'Home banner — personalized', hl: true }, { t: 'Hamburger menu entry' }, { t: 'Nudge after she shares a deal' }, { t: 'First-week tip + email' }]} /> },
    suite: { h: '2 · Creator Studio', p: 'A clear explainer, not a blank screen. The “above-and-beyond” bit sits up top: because she connected Instagram, the suite leads with deals matched to her niche — read from her own posts & hashtags via the Graph API, then ranked by what converts. It collapses “discovery” for the Influencer — the on-brand deals come to her.', flow: <Flow title="IG-matched recommendations" nodes={[{ t: 'Her own posts + hashtags', sub: 'Graph API · consented' }, { t: 'Classify niche → match catalog', hl: true }, { t: 'Rank by what converts' }, { t: 'Set up look · then Reel' }]} /> },
    identity: { h: '3 · Set up your look (once)', p: 'This is where Aisha uploads her photo and records her voice — done once, reused on every "with you" reel. Decoupled from creation so making a reel is never slowed down. Consent is explicit (DPDP).', flow: <Flow title="Identity" nodes={[{ t: 'Upload photo' }, { t: 'Record 30s voice' }, { t: 'Consent + stored securely', hl: true }, { t: 'Reused on every reel' }]} /> },
    path: { h: '4 · With you, or product-only', p: 'Product-only is free. "With you" uses your saved look + voice — that\'s the Pro feature, because cloning is what costs us. The Nykaa + with-you reel is the showcase.', flow: <Flow title="Gating" nodes={[{ t: 'Without you — free' }, { t: 'With you — Pro', hl: true }]} /> },
    paywall: { h: '5 · Freemium → Pro', p: 'Free maximises GMV (commission pays for it); Pro covers the heavy compute. Cloned look, unlimited reels, intent Auto DM, premium storefront.', flow: <Flow title="Why a paywall here" nodes={[{ t: 'Templated reel ≈ ₹7' }, { t: 'Clone/generative ≫', warn: true }, { t: 'Pro ₹599 / credits', hl: true }]} /> },
    payment: { h: '6 · Checkout (demo)', p: 'A mock checkout — no real payment. UPI-first for India, cards as fallback.', flow: <Flow title="Billing" nodes={[{ t: 'UPI / cards' }, { t: 'Subscription ₹599/mo', hl: true }, { t: 'Cancel anytime' }]} /> },
    gen: { h: '7 · What EarnKaro does', p: 'The AI pipeline, grounded in the real deal so it never invents the product. Tap "See the architecture" for the full picture.', flow: <Flow title="Reel Maker pipeline" nodes={[{ t: 'Real PDP images + deal data', sub: 'never hallucinated' }, { t: 'LLM writes the script' }, { t: 'ElevenLabs voiceover' }, { t: 'Assemble 9:16 + captions', hl: true }]} /> },
    preview: { h: '8 · The finished Reel', p: 'Your generated video — tap the speaker for the voiceover. Caption is pre-written with the keyword. Post auto-publishes (Business) or exports (Creator).', flow: <Flow title="On post" nodes={[{ t: 'Bind tracked profit link' }, { t: 'Arm Auto DM on this post', hl: true }, { t: 'Publish / export' }]} /> },
    posted: { h: '9 · The native loop', p: 'Making the Reel set up the whole funnel — no second tool. The Auto DM is live and bound to this exact deal.', flow: <Flow title="Wired together" nodes={[{ t: 'Reel posted' }, { t: 'Auto DM armed', hl: true }, { t: 'Storefront updated' }]} /> },
    insta: { h: '10 · On Instagram (simulated)', p: 'A faithful mock — production uses the Graph + Content Publishing APIs. Tap the new reel to see the comment→DM loop.', flow: <Flow title="Real backend" nodes={[{ t: 'Content Publishing API' }, { t: 'Comment webhooks' }, { t: 'Messaging API', hl: true }]} /> },
    dm: { h: '11 · Comment → DM', p: 'Type any comment or tap a chip. We read intent — not just the keyword — and only DM on real buying intent. "nice!" gets nothing: we don\'t spam.', flow: <Flow title="Auto DM" nodes={[{ t: 'Comment' }, { t: 'LLM intent classify', hl: true }, { t: 'Buying intent → DM' }, { t: 'No intent → nothing', warn: true }]} /> },
    store: { h: '12 · Link-in-bio Storefront', p: 'One link in her bio. EarnKaro auto-prunes expired deals and refreshes price/stock — a bio link that never goes dead.', flow: <Flow title="Live sync" nodes={[{ t: 'Curation + catalog' }, { t: 'Prune expired · refresh price', hl: true }, { t: 'Hosted page → tracked links' }]} /> },
  }
  const g = guide[step]

  const TopBar = ({ t, back }: { t: string; back?: () => void }) => (
    <div className="q2p-hd"><span>{back ? <span onClick={back} style={{ cursor: 'pointer' }}>‹ </span> : null}EARN<b>KARO</b></span><span style={{ fontSize: 10, color: '#9DB0AD' }}>{t}</span></div>
  )

  function screen() {
    if (step === 'home') return (
      <>
        <div className="q2p-hd"><span style={{ fontSize: 15 }}>☰</span><span style={{ fontWeight: 800 }}>EARN<b>KARO</b></span><span style={{ fontSize: 13, color: '#9DB0AD' }}>⌕</span></div>
        <div className="q2p-bd">
          <div className="q2p-greet"><img src="/avatar/profile.png" className="q2p-av" /><div style={{ flex: 1 }}><div style={{ fontSize: 10, color: '#9DB0AD' }}>Welcome back</div><div style={{ fontWeight: 800 }}>Hi Aisha</div></div><div className="q2p-month"><div style={{ fontSize: 9, color: '#9DB0AD' }}>This month</div><b>₹12,400</b></div></div>
          <div className="q2p-hero">Fashion Week drops · 12% profit</div>
          <div className="q2p-cats"><span className="on">All</span><span>Fashion</span><span>Beauty</span><span>Home</span></div>
          <div className="q2p-coach">
            <div className="q2p-nudge ring" onClick={() => setStep('suite')}>
              <div style={{ fontSize: 22 }}>✨</div>
              <div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 13 }}>New · Creator Studio</div><div className="q2p-od">Turn these deals into Instagram Reels — made for you.</div></div>
              <div className="q2p-make">Open →</div>
            </div>
            <div className="q2p-coachlbl">↑ tap to open · we surfaced this because you post to Instagram</div>
          </div>
          <div className="q2p-h" style={{ fontSize: 14 }}>For you</div>
          {ORDER.map(k => (
            <div key={k} className="q2p-deal" onClick={() => setStep('suite')}>
              <div className="q2p-dthumb">{DEALS[k].emoji}</div>
              <div style={{ flex: 1 }}><div className="q2p-dn">{DEALS[k].brand} · {DEALS[k].name}</div><div className="q2p-dmeta">₹{DEALS[k].price} <s>₹{DEALS[k].mrp}</s> · {DEALS[k].pr}%</div></div>
            </div>
          ))}
        </div>
      </>
    )
    if (step === 'suite') return (
      <><TopBar t="Creator Studio" back={() => setStep('home')} />
        <div className="q2p-bd">
          <div className="q2p-h">Creator Studio ✨</div>
          <div className="q2p-recobanner">
            <div className="q2p-recohd"><span>● Matched to your Instagram</span><span className="q2p-recotag">fashion &amp; beauty</span></div>
            <div className="q2p-recowhy2">Picks from <b>your</b> posts &amp; hashtags — tap one to make a Reel.</div>
          </div>
          {ORDER.map((k, i) => (
            <div key={k} className={'q2p-deal' + (i === 0 ? ' feat' : '')} onClick={() => { setDeal(k); setStep('path') }}>
              <div className="q2p-dthumb">{DEALS[k].emoji}</div>
              <div style={{ flex: 1 }}><div className="q2p-dn">{DEALS[k].brand} · {DEALS[k].name}{i === 0 && <span className="q2p-freeb">TOP MATCH</span>}</div><div className="q2p-dmeta">₹{DEALS[k].price} <s>₹{DEALS[k].mrp}</s> · {DEALS[k].pr}%</div></div>
              <div className="q2p-make">Make a Reel →</div>
            </div>
          ))}
          <div className="q2p-sech">In the suite</div>
          <div className="q2p-toolg">
            <div className="q2p-toolc t1"><span>🎬</span><b>Reel Maker</b><i>deal → Reel</i></div>
            <div className="q2p-toolc t2"><span>💬</span><b>Auto DM</b><i>comments → link</i></div>
            <div className="q2p-toolc t3"><span>🛍</span><b>Storefront</b><i>one bio link</i></div>
          </div>
          <div className={'q2p-idcard' + (idSet ? ' done' : '')} onClick={() => setStep('identity')}>
            <img src="/avatar/profile.png" className="q2p-av" />
            <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 12.5 }}>{idSet ? 'Your look is set up ✓' : 'Set up your look & voice'}</div><div className="q2p-od">{idSet ? 'used on every "with you" reel' : 'once · for "with you" reels'}</div></div>
            <div className="q2p-make">{idSet ? 'Edit' : 'Set up →'}</div>
          </div>
          <div className="q2p-free">Free plan · <b>2 reels left</b> <span className="q2p-up" onClick={() => setStep('paywall')}>Go Pro</span></div>
        </div>
      </>
    )
    if (step === 'identity') return (
      <><TopBar t="Your look & voice" back={() => setStep('suite')} />
        <div className="q2p-bd">
          <div className="q2p-h">Set up your look &amp; voice</div>
          <div className="q2p-od" style={{ marginTop: -4 }}>Done once — reused on every "with you" Reel. Your creation flow never waits on this.</div>
          <div className="q2p-upload"><img src="/avatar/aisha.png" /><div className="q2p-uplbl">✓ Photos uploaded (5)</div></div>
          <div className="q2p-voice"><span className="q2p-d">✓</span><div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 12.5 }}>Voice recorded · 0:32</div><div className="q2p-od">cloned via ElevenLabs</div></div><div className="q2p-wave">▮▮▮▯▮▮▯▮▮▮▯▮</div></div>
          <div className="q2p-consent">☑ I consent to EarnKaro using my likeness &amp; voice for my own content. Revocable anytime. (DPDP)</div>
          <div className="q2p-btn" onClick={() => { setIdSet(true); setStep('path') }}>Save &amp; continue</div>
        </div>
      </>
    )
    if (step === 'path') return (
      <><TopBar t="Create your Reel" back={() => setStep('suite')} />
        <div className="q2p-bd">
          <div className="q2p-h">{d.brand} · {d.name}</div>
          <div className="q2p-opt rec" onClick={() => choosePath('with')}><div className="q2p-ot">With you <span className="q2p-pro">PRO</span><span className="q2p-rec">recommended</span></div><div className="q2p-od">your face + voice in the Reel · highest engagement</div></div>
          <div className="q2p-opt" onClick={() => choosePath('without')}><div className="q2p-ot">Product only <span className="q2p-freeb">FREE</span></div><div className="q2p-od">clean product b-roll + AI voiceover</div></div>
        </div>
      </>
    )
    if (step === 'paywall') return (
      <><TopBar t="Creator Pro" back={() => setStep('path')} />
        <div className="q2p-bd">
          <div className="q2p-h" style={{ textAlign: 'center' }}>Go Creator Pro</div>
          <div className="q2p-savebanner">Save ~92% vs Creatify + ManyChat + Linktree</div>
          <div className="q2p-plans">
            <div className="q2p-plan"><div className="q2p-pn">Free</div><div className="q2p-pp">₹0</div><ul><li>Storefront</li><li>Basic Auto DM</li><li>~5 product reels/mo</li></ul></div>
            <div className="q2p-plan on"><span className="q2p-popular">POPULAR</span><div className="q2p-pn">Pro</div><div className="q2p-pp">₹599<span>/mo</span></div><ul><li>Unlimited reels</li><li>You in the reel (clone)</li><li>Intent Auto DM</li><li>Premium storefront</li></ul></div>
          </div>
          <div className="q2p-btn" onClick={() => setStep('payment')}>Continue to checkout</div>
          <div className="q2p-od" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => { setPath('without'); setStep('gen') }}>Make a free product-only reel instead</div>
        </div>
      </>
    )
    if (step === 'payment') return (
      <><TopBar t="Checkout" back={() => setStep('paywall')} />
        <div className="q2p-bd">
          <div className="q2p-h">Creator Pro</div>
          <div className="q2p-payrow"><span>Creator Pro · monthly</span><b>₹599</b></div>
          <div className="q2p-payrow sub"><span>GST (18%)</span><span>₹108</span></div>
          <div className="q2p-payrow tot"><span>Total today</span><b>₹707</b></div>
          <div className="q2p-od" style={{ marginTop: 4 }}>Pay with</div>
          <div className="q2p-pay"><span className="on">UPI</span><span>Card</span><span>Netbanking</span></div>
          <div className="q2p-payfield">you@upi</div>
          <div className="q2p-btn" onClick={() => setStep('gen')}>Pay ₹707 (demo)</div>
          <div className="q2p-od" style={{ textAlign: 'center' }}>🔒 Demo only — no real payment is taken.</div>
        </div>
      </>
    )
    if (step === 'gen') return (
      <><TopBar t="Generating…" />
        <div className="q2p-bd" style={{ justifyContent: 'center', gap: 12 }}>
          <div className="q2p-ck"><span className="q2p-d">✓</span>Script written from the deal</div>
          <div className="q2p-ck"><span className="q2p-d">✓</span>Voiceover (ElevenLabs)</div>
          <div className="q2p-ck"><span className="q2p-d sp">⟳</span>Assembling your 9:16 Reel</div>
          <div className="q2p-prog"><i /></div>
          <div className="q2p-od" style={{ textAlign: 'center' }}>Using real product images — never invented.</div>
        </div>
      </>
    )
    if (step === 'preview') return (
      <><TopBar t="Preview" />
        <div className="q2p-bd">
          <video className="q2p-vid" src={vid} autoPlay muted loop playsInline controls />
          <div className="q2p-od" style={{ textAlign: 'center', color: '#5EEAD4' }}>🔊 tap the speaker for the AI voiceover</div>
          <div className="q2p-cap">{d.cap}</div>
          <div className="q2p-btn" onClick={() => setStep('posted')}>Post to Instagram</div>
        </div>
      </>
    )
    if (step === 'posted') return (
      <><TopBar t="Posted" />
        <div className="q2p-bd" style={{ justifyContent: 'center', textAlign: 'center', gap: 10 }}>
          <div className="q2p-tick">✓</div>
          <div className="q2p-h" style={{ textAlign: 'center' }}>Posted to Instagram</div>
          <div className="q2p-od">Auto-DM is armed — comments with intent get your link automatically.</div>
          <span className="q2p-pill">🔗 bound to {d.name}</span>
          <div className="q2p-btn" onClick={() => setStep('insta')}>View on Instagram →</div>
        </div>
      </>
    )
    if (step === 'insta') return (
      <><div className="q2p-hd ig"><span style={{ fontWeight: 800 }}>aisha.styles</span><span>···</span></div>
        <div className="q2p-bd">
          <div className="q2p-igtop"><img src="/avatar/profile.png" className="q2p-av lg" /><div className="q2p-igstats"><div><b>128</b><span>posts</span></div><div><b>41k</b><span>followers</span></div><div><b>312</b><span>following</span></div></div></div>
          <div style={{ fontWeight: 700, fontSize: 12 }}>Aisha · fashion &amp; beauty</div>
          <div className="q2p-biolink" onClick={() => setStep('store')}>🔗 earnkaro.shop/aisha</div>
          <div className="q2p-iggrid">
            <div className="q2p-igtile main" onClick={() => setStep('dm')}><video src={vid} muted playsInline preload="metadata" /><span className="q2p-reelbadge">▶ new</span></div>
            <div className="q2p-igtile"><video src={DEALS[deal === 'dress' ? 'beauty' : 'dress'].with} muted playsInline preload="metadata" /></div>
            <div className="q2p-igtile"><img src="/avatar/aisha.png" style={{ objectPosition: 'left' }} /></div>
            <div className="q2p-igtile"><img src="/avatar/aisha.png" style={{ objectPosition: 'center' }} /></div>
            <div className="q2p-igtile"><img src="/avatar/aisha.png" style={{ objectPosition: 'right' }} /></div>
            <div className="q2p-igtile dim">+ more</div>
          </div>
          <div className="q2p-od" style={{ textAlign: 'center' }}>Tap the new reel ▶</div>
        </div>
      </>
    )
    if (step === 'dm') return (
      <><div className="q2p-hd ig"><span onClick={() => setStep('insta')} style={{ cursor: 'pointer' }}>‹ aisha.styles</span><span>♡</span></div>
        <div className="q2p-bd" style={{ gap: 8 }}>
          <video className="q2p-vid sm" src={vid} autoPlay muted loop playsInline controls />
          <div className="q2p-cmt"><b>aisha.styles</b> {d.cap}</div>
          {dm && <div className="q2p-reply">aisha.styles replied: Sent — check your DMs ✓</div>}
          {miss && <div className="q2p-od" style={{ color: '#F2C14E' }}>No buying intent → no DM (we don't spam).</div>}
          <div className="q2p-try">{['LINK', 'price?', 'size M?', '😍 need this', 'nice!'].map(c => <span key={c} onClick={() => send(c)}>{c}</span>)}</div>
          <div className="q2p-cbar"><input value={comment} placeholder="Add a comment…" onChange={e => setComment(e.target.value)} onKeyDown={e => e.key === 'Enter' && comment && send(comment)} /><button onClick={() => comment && send(comment)}>Post</button></div>
          {dm && <div className="q2p-dm"><div className="q2p-dmhd">Direct message · from @aisha.styles</div><div className="q2p-dmbubble"><b>{d.brand} {d.name}</b><br />{dm.reply}<br /><span className="q2p-dmlink">earnkaro.link/aisha-{deal}</span><div className="q2p-dmsub">+ 2 related deals · view storefront</div></div><div className="q2p-dmtag">intent: {dm.intent} · tracked profit link</div></div>}
        </div>
      </>
    )
    return (
      <><div className="q2p-hd ig"><span style={{ fontWeight: 800 }}>earnkaro.shop/aisha</span><span onClick={() => setStep('insta')} style={{ cursor: 'pointer' }}>✕</span></div>
        <div className="q2p-bd" style={{ gap: 9 }}>
          <div className="q2p-storehero"><img src="/avatar/profile.png" className="q2p-av" /><div><div style={{ fontWeight: 800 }}>Aisha's edit</div><div className="q2p-od">fashion &amp; beauty picks</div></div></div>
          <div className="q2p-chips2"><span className="on">Festive</span><span>Beauty</span><span>Dresses</span></div>
          <div className="q2p-sgrid">
            <div className="q2p-scard"><div className="q2p-spi">💄</div><div className="q2p-sin">Lip combo<br /><b>₹699</b> <span className="q2p-sp">18%</span></div></div>
            <div className="q2p-scard"><div className="q2p-spi">👗</div><div className="q2p-sin">Floral dress<br /><b>₹4,999</b> <span className="q2p-sp">8%</span></div></div>
          </div>
          <div className="q2p-od" style={{ textAlign: 'center', color: '#5EEAD4' }}>● live · expired deals auto-removed</div>
        </div>
      </>
    )
  }

  const order: Step[] = ['home', 'suite', 'identity', 'path', 'paywall', 'payment', 'gen', 'preview', 'posted', 'insta', 'dm', 'store']
  const idx = Math.max(0, order.indexOf(step))

  return (
    <div className="q2f">
      {arch && <ArchOverlay close={() => setArch(false)} />}
      {info === 'pn' && (
        <InfoOverlay kicker="Lifecycle · push + in-app" title="The nudges we'd send" close={() => setInfo(null)}>
          <p className="q2f-p" style={{ marginBottom: 12 }}>How a creator is pulled from “shared one deal” into the suite. Each is triggered by real behaviour and frequency-capped — the Q1 personalization engine decides who's worth nudging, so we don't spam the base.</p>
          {PNS.map((n, i) => (
            <div key={i} className="pn-card">
              <div className="pn-ic">{n.icon}</div>
              <div style={{ flex: 1 }}>
                <div className="pn-top"><b>EarnKaro</b><span>{n.tag} · now</span></div>
                <div className="pn-ti">{n.title}</div>
                <div className="pn-bd">{n.body}</div>
              </div>
            </div>
          ))}
        </InfoOverlay>
      )}
      {info === 'edge' && (
        <InfoOverlay kicker="Robustness" title="Edge cases the journey handles" close={() => setInfo(null)}>
          <p className="q2f-p" style={{ marginBottom: 12 }}>The happy path is easy; these are the cases that decide whether it survives contact with real Instagram, real creators, and real policy.</p>
          {EDGES.map((e, i) => (
            <div key={i} className="edge-row">
              <div className="edge-h"><span className="edge-c">{e.c}</span><span className="edge-tag">{e.h}</span></div>
              <div className="edge-p">{e.p}</div>
            </div>
          ))}
        </InfoOverlay>
      )}
      <aside className="q2f-aside">
        <div className="q2f-kick">Q2 · Creator Suite · guided demo</div>
        <div className="q2f-step">Step {idx + 1} / {order.length}</div>
        <h2 className="q2f-h">{g.h}</h2>
        <p className="q2f-p">{g.p}</p>
        {g.flow}
        <div className="q2f-jump">
          <div className="q2f-jumpt">Jump to any screen — for the panel</div>
          <div className="q2f-jumpchips">
            {JUMP.map(j => <span key={j.s} className={step === j.s ? 'on' : ''} onClick={() => go(j.s)}>{j.l}</span>)}
          </div>
        </div>
        <button className="q2f-arch" onClick={() => setArch(true)}>⚙ See the AI + API architecture</button>
        <div className="q2f-inforow">
          <button onClick={() => setInfo('pn')}>📲 Nudges we'd send</button>
          <button onClick={() => setInfo('edge')}>⚠ Edge cases</button>
        </div>
        <button className="q2f-restart" onClick={() => { setStep('home'); setDm(null); setMiss(false); setIdSet(false); setDeal('beauty'); setPath('with') }}>↺ Restart the flow</button>
        <div className="q2f-note">Instagram is simulated for the demo; the flowcharts show the real backend (Graph API, Messaging API, Content Publishing API).</div>
      </aside>
      <div className="q2f-stage"><div className="q2f-phone"><div className="q2f-notch" /><div className="q2screen" key={step}>{screen()}</div></div></div>
    </div>
  )
}
