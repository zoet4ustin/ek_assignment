import { View, Theme } from '../Site'
import { Nav, Footer } from './SiteChrome'

const SEGMENTS = [
  { n: 'The Broadcaster', d: 'Runs a deal channel — 30–100 posts a day. Wants throughput.', a: '#0FB5A6' },
  { n: 'The Influencer', d: 'Curated niche, high trust per post. Won\'t share an ugly link.', a: '#C2456A' },
  { n: 'The Casual Sharer', d: 'A few deals to friends. Low effort, opportunistic.', a: '#3B82C4' },
  { n: 'The Power Affiliate', d: 'Runs EarnKaro like a business, with a referral downline.', a: '#B07A12' },
  { n: 'The Home Earner', d: 'Trusted groups, vernacular-first. Cautious; needs to trust payouts.', a: '#0E7490' },
]

const STATS = [
  { v: '5', l: 'creator segments', s: 'one app that adapts to each' },
  { v: '3', l: 'Instagram features', s: 'Reel Maker · Auto DM · Storefront' },
  { v: '₹599', l: 'Creator Pro', s: 'priced from real unit costs' },
  { v: '92%', l: 'cheaper', s: 'than the do-it-yourself tool stack' },
]

const GOOD = [
  { t: 'Invisible segmentation', d: 'No user-facing labels — the app infers and adapts. Segments are an internal lens.' },
  { t: 'One moat, everywhere', d: 'Every feature is fed by EarnKaro\'s data on what actually converts — not a bolted-on AI.' },
  { t: 'Honest by design', d: 'Real API limits, DPDP consent, and the tradeoffs are named, not hidden.' },
  { t: 'Built for real', d: 'A working React prototype on the live EarnKaro app, with instrumented events.' },
]

export default function Approach({ go, theme, setTheme }: { go: (v: View) => void; theme: Theme; setTheme: (t: Theme) => void }) {
  return (
    <div className="land">
      <Nav go={go} active="approach" theme={theme} setTheme={setTheme} />

      <section className="lpage-h">
        <div className="lsec-kick">● The approach</div>
        <h1>One app that quietly knows who you are.</h1>
        <p>EarnKaro treats three million creators the same. The fix isn't five apps — it's one app that adapts to each, and an Instagram creator suite that closes the loop from a deal to a sale. Here's the thinking behind the prototypes.</p>
      </section>

      <section className="lthesis">
        <h2>A Broadcaster needs speed. An Influencer needs taste. A Home Earner needs a goal.{' '}
          <span className="mut">Same front door, same payments — but the home, the discovery and the sharing all bend to who you are, learned from behaviour, never asked.</span></h2>
      </section>

      <section className="lsegs">
        <div className="lsegs-h"><div className="lsec-kick">● Who they are</div><div className="lsegs-t">Five behavioural segments</div></div>
        <div className="lseg2-grid">
          {SEGMENTS.map((s, i) => (
            <div key={s.n} className="lseg2" style={{ ['--a' as string]: s.a }}>
              <div className="lseg2-n">0{i + 1}</div>
              <div className="lseg2-t">{s.n}</div>
              <div className="lseg2-d">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="lstats">
        {STATS.map(s => (
          <div key={s.l} className="lstat"><div className="lstat-v">{s.v}</div><div className="lstat-l">{s.l}</div><div className="lstat-s">{s.s}</div></div>
        ))}
      </section>

      <section className="lgood">
        <div className="lsec-kick">● Good to know</div>
        <div className="lgood-grid">
          {GOOD.map(g => (<div key={g.t} className="lgood-i"><b>{g.t}</b><span>{g.d}</span></div>))}
        </div>
      </section>

      <section className="lcta">
        <div className="lcta-t">See it in motion</div>
        <button className="lbtn p" onClick={() => go('home')}>Explore the prototypes →</button>
      </section>

      <Footer />
    </div>
  )
}
