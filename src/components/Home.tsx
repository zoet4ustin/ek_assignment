import { useApp } from '../AppContext'
import { DEALS, PROFILES, CATEGORY_ICON, scoreDeal, aiImg, IMG, Deal, ProfileKey } from '../data'
import { Ico } from '../icons'
import { ShareSheet, StoryCard, Broadcast } from './Overlays'
import HeroCarousel from './HeroCarousel'
import FlashStrip from './FlashStrip'
import { Noted } from './Noted'

const NOTES = {
  top: { title: 'Top deals carousel', logic: 'Rotating hero promos surface the biggest live campaigns. Which promo leads is personalized by affinity — a homemaker sees beauty/grocery first, an influencer sees fashion.', segments: ['All segments'] },
  flash: { title: 'Flash deals + live countdown', logic: 'Time-boxed deals with a ticking timer create urgency and lift conversion. Most valuable to high-volume sharers, but shown to everyone.', segments: ['Broadcaster', 'Casual', 'All'] },
  tool: { title: 'Contextual tool (adapts)', logic: 'This block changes with inferred behaviour: a goal tracker for home earners, a story-card maker for influencers, a clicks dashboard for broadcasters, a referral card for casual sharers.', segments: ['Adapts per cohort'] },
  feed: { title: 'Personalized “For you” feed', logic: 'Deals are ranked by your category affinity, learned from behaviour. Switch cohorts on the panel to watch the order change.', segments: ['All segments'] },
}

function ContextualTool() {
  const { profile, openSheet, toast, track } = useApp()
  const tool = PROFILES[profile as ProfileKey].tool
  if (tool === 'goal') return (
    <div className="glass">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 9, alignItems: 'center' }}><Ico name="target" /><span style={{ fontWeight: 700 }}>Monthly goal</span></div>
        <span style={{ fontWeight: 800 }}>₹1,240 / ₹2,000</span>
      </div>
      <div className="progress"><i style={{ width: '62%' }} /></div>
      <div className="pmeta" style={{ marginTop: 7 }}>₹760 to go · 3 quick deals could get you there</div>
    </div>
  )
  if (tool === 'story') return (
    <div className="glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div><div style={{ fontWeight: 700 }}>Make it story-ready</div><div className="pmeta">One-tap branded card for Instagram</div></div>
      <button className="sbtn" style={{ flex: '0 0 auto', padding: '10px 14px' }} onClick={() => openSheet(<StoryCard name="your pick" />)}><Ico name="sparkle" />Story</button>
    </div>
  )
  if (tool === 'bulk') return (
    <div className="glass">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 9 }}>
        <div className="metric"><div className="k">Clicks today</div><div className="v">1,284</div></div>
        <div className="metric"><div className="k">Conv.</div><div className="v">3.1%</div></div>
        <div className="metric"><div className="k">Earned</div><div className="v">₹640</div></div>
      </div>
      <div className="pmeta" style={{ marginTop: 9 }}>Tip: select deals below to broadcast in one go →</div>
    </div>
  )
  if (tool === 'refer') return (
    <div className="glass" style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--brand)' }}><Ico name="gift" /></div>
      <div style={{ fontWeight: 800, margin: '6px 0 2px' }}>Invite friends, earn 10% for life</div>
      <button className="btn" style={{ marginTop: 10 }} onClick={() => { track('referral_sent'); toast('Invite link copied ✓') }}>Share my invite link</button>
    </div>
  )
  if (tool === 'dash') return (
    <div className="glass">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span style={{ fontWeight: 700 }}>Earnings · 6 wk</span><span className="badge b-suc">↑12%</span></div>
      <div className="bars">
        {[42, 58, 50, 74, 86, 100].map((h, i) => <span key={i} style={{ height: h + '%' }} />)}
      </div>
    </div>
  )
  return null
}

function DealCard({ d, i }: { d: Deal; i: number }) {
  const { profile, selected, toggleSel, openSheet, toast, track } = useApp()
  const tool = PROFILES[profile as ProfileKey].tool
  const sel = selected.includes(i)
  return (
    <div className="dcard">
      <div className="thumb">
        <span className="thumb-ic"><Ico name={CATEGORY_ICON[d.c] || 'cart'} /></span>
        <img src={aiImg(d.img, d.seed, IMG.deal[0], IMG.deal[1])} loading="lazy" decoding="async" style={{ opacity: 0, transition: 'opacity .45s ease' }} onLoad={e => ((e.currentTarget as HTMLImageElement).style.opacity = '1')} onError={e => ((e.currentTarget as HTMLImageElement).style.display = 'none')} />
        {d.exp && <span className={'tag badge ' + ((d.exp === 'flash' || d.exp === '2h') ? 'b-warn' : 'b-suc')}>{d.exp === 'new' ? 'new' : d.exp}</span>}
        <span className="prof">{d.pr}% profit</span>
        {tool === 'bulk' && <div className={'chk' + (sel ? ' on' : '')} onClick={() => toggleSel(i)}><Ico name="check" /></div>}
      </div>
      <div className="dbody">
        <div className="pname">{d.b} · {d.n}</div>
        <div className="pmeta">₹{d.p} <span className="strike">₹{d.m}</span></div>
        <div className="dactions">
          <button className="sbtn" onClick={() => { track('share_opened', { deal: `${d.b} ${d.n}` }); openSheet(<ShareSheet name={`${d.b} ${d.n}`} />) }}><Ico name="share" />Share &amp; earn</button>
          <div className="obtn" onClick={() => { track('link_copied', { deal: `${d.b} ${d.n}` }); toast('Link copied ✓') }} aria-label="Copy link"><Ico name="copy" /></div>
        </div>
      </div>
    </div>
  )
}

export function BulkBar() {
  const { selected, openSheet } = useApp()
  return (
    <div className={'bulkbar' + (selected.length ? ' show' : '')}>
      <span><b>{selected.length}</b> selected</span>
      <button className="go" onClick={() => openSheet(<Broadcast />)}>Broadcast →</button>
    </div>
  )
}

export default function Home() {
  const { profile, cat, setCat } = useApp()
  const p = PROFILES[profile as ProfileKey]
  const list = DEALS.map((d, i) => ({ d, i }))
    .filter(o => (cat === 'All' || cat === 'Trending') ? true : o.d.c === cat)
    .sort((a, b) => scoreDeal(b.d, p) - scoreDeal(a.d, p))
  return (
    <div className="screen">
      <Noted note={NOTES.top} event="promo_impression"><HeroCarousel /></Noted>
      <div className="catrail">
        {p.cats.map(c => (
          <div key={c} className={'cat' + (cat === c ? ' on' : '')} onClick={() => setCat(c)}>
            <div className="cic"><Ico name={CATEGORY_ICON[c] || 'grid'} /></div>
            <div className="cl">{c}</div>
          </div>
        ))}
      </div>
      <Noted note={NOTES.flash} event="flash_viewed">
        <div className="h2" style={{ marginBottom: 9 }}>⚡ Flash deals</div>
        <FlashStrip />
      </Noted>
      <Noted note={NOTES.tool} event="tool_engaged"><ContextualTool /></Noted>
      <Noted note={NOTES.feed} event="deal_shared">
        <div className="h2">For you</div>
        <div className="feed">{list.map(o => <DealCard key={o.i} d={o.d} i={o.i} />)}</div>
      </Noted>
    </div>
  )
}
