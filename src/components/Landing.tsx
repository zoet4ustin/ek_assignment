import { View, Theme } from '../Site'
import { Nav, Footer } from './SiteChrome'
import { tileSrc } from '../data'

const JOURNEY = [
  {
    n: '01', t: 'Land on the collage',
    d: 'No account wall, no permission prompt, no three-slide value pitch. The first screen is the product showing what it has.',
    tiles: ['fashion', 'beauty', 'grocery'],
  },
  {
    n: '02', t: 'Who is on the other end?',
    d: 'Channel and reach, two taps. Audience rather than personal taste, because a homemaker sharing into a family group is not shopping for herself.',
    tiles: ['mobiles', 'travel', 'fitness'],
  },
  {
    n: '03', t: 'Follow what they buy',
    d: 'Twelve category tiles, bundled with the app so the grid paints on the first frame. Follow three and the feed is set.',
    tiles: ['home', 'kitchen', 'baby'],
  },
  {
    n: '04', t: 'A feed built to match',
    d: 'The segment is inferred from a transparent additive model, shown with the scores behind it and an override. Then the journey runs as before.',
    tiles: ['electronics', 'accessories', 'footwear'],
  },
]

const SEGMENTS = [
  { img: 's1.png', n: 'The Broadcaster', d: '30–100 deals a day to a channel', g: 'linear-gradient(160deg,#0f766e,#0b3a36)' },
  { img: 's2.png', n: 'The Influencer', d: 'curated niche · high trust per post', g: 'linear-gradient(160deg,#a05e8c,#48243f)' },
  { img: 's3.png', n: 'The Casual Sharer', d: 'a few deals to friends', g: 'linear-gradient(160deg,#2f6fb0,#1e3553)' },
  { img: 's4.png', n: 'The Power Affiliate', d: 'runs EarnKaro like a business', g: 'linear-gradient(160deg,#b07a12,#5c3f0a)' },
  { img: 's5.png', n: 'The Home Earner', d: 'trusted groups · vernacular-first', g: 'linear-gradient(160deg,#0e7490,#0c3d52)' },
]

const PROTOS: { v: View; n: string; t: string; tag: string; d: string; a: string }[] = [
  { v: 'q1', n: '01', t: 'Segmentation & Personalization', tag: 'Answers Q1', d: 'Cold-start onboarding infers your segment from audience and followed categories, then one adaptive app serves five creator types — no labels.', a: '#0FB5A6' },
  { v: 'q2', n: '02', t: 'The Instagram Creator Suite', tag: 'Answers Q2', d: 'From a deal to a posted Reel with the funnel armed — Reel Maker, Auto DM, Storefront.', a: '#C2456A' },
  { v: 'calc', n: '03', t: 'Pricing & Unit Economics', tag: 'Q2 · financial model', d: 'Two sliders reprice Creator Pro live against the ₹7,850 do-it-yourself stack.', a: '#B07A12' },
  { v: 'journey', n: '04', t: 'The Combined Journey', tag: 'Q1 + Q2', d: 'Discovered, personalized and monetized across the whole experience — one story.', a: '#2F6FB0' },
]

export default function Landing({ go, theme, setTheme }: { go: (v: View) => void; theme: Theme; setTheme: (t: Theme) => void }) {
  const hide = (e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.display = 'none' }
  return (
    <div className="land">
      <Nav go={go} active="home" theme={theme} setTheme={setTheme} />

      <section className="lhero3">
        <span className="lhero3-badge">● EarnKaro · Senior PM Assignment</span>
        <h1 className="lhero3-h">Built for every kind of <span className="accent">creator</span>.</h1>
        <p className="lhero3-p">Two interactive parts — segmentation &amp; personalization, and an Instagram creator suite. Pick a way in below; the written answers are in the footer.</p>
        <a className="lbtn p" href="#proto">Explore the prototypes ↓</a>
      </section>

      <section className="lsegrow-wrap">
        <div className="lsec-kick" style={{ textAlign: 'center', marginBottom: 14 }}>● Who EarnKaro is built for</div>
        <div className="lseg-row2">
          {SEGMENTS.map(s => (
            <div key={s.img} className="lseg3" style={{ background: s.g }} onClick={() => go('approach')}>
              <img src={`/segments/${s.img}`} alt={s.n} onError={hide} />
              <span className="lseg3-chip">● {s.n}</span>
              <div className="lseg3-cap">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="ljour-wrap">
        <div className="lproto-head">
          <div className="lsec-kick">● The creator journey</div>
          <div className="lproto-title">Cold start, in four screens</div>
          <p className="lproto-sub">
            Personalization has to start before there is any behaviour to personalize on. This is how the
            first ninety seconds work, and why each question is the one being asked.
          </p>
        </div>
        <div className="ljour-grid">
          {JOURNEY.map(j => (
            <div className="ljour" key={j.n}>
              <div className="ljour-tiles">
                {j.tiles.map((t, i) => (
                  <img key={t} src={tileSrc(t)} alt="" width={64} height={64} style={{ zIndex: 3 - i }} />
                ))}
              </div>
              <div className="ljour-n">{j.n}</div>
              <div className="ljour-t">{j.t}</div>
              <div className="ljour-d">{j.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="lprotos" id="proto">
        <div className="lproto-head">
          <div className="lsec-kick">● Explore — my answers to the assignment</div>
          <div className="lproto-title">Four ways in</div>
          <p className="lproto-sub">Each card is an <b>interactive answer</b> to the questions shared. Click to explore the working prototype; the full <b>written answers (Q1 &amp; Q2)</b> are attached to the email and linked in the footer.</p>
        </div>
        <div className="lproto-grid">
          {PROTOS.map(c => (
            <button key={c.v} className="lproto" style={{ ['--a' as string]: c.a }} onClick={() => go(c.v)}>
              <div className="lc-top"><span className="lc-n">{c.n}</span><span className="lc-tag">{c.tag}</span></div>
              <div className="lc-t">{c.t}</div>
              <div className="lc-d">{c.d}</div>
              <div className="lc-go">Open →</div>
            </button>
          ))}
        </div>
      </section>

      <div className="lcredit">Built on the live EarnKaro app · React + TypeScript · real Instagram API research · DPDP-aware · instrumented</div>

      <Footer />
    </div>
  )
}
