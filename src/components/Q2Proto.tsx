import { View } from '../Site'

const FEATURES = [
  {
    tag: 'fixes CREATE', t: 'AI Reel Maker',
    flow: 'Deal → Make a Reel → choose With / Without you → background generation (script · voiceover · 9:16 assembly) → preview → post — with the Auto DM already armed.',
    ai: 'LLM script grounded in the deal · ElevenLabs voice · Kling/Veo for v2 motion · learns which hooks convert.',
  },
  {
    tag: 'owns CONVERT', t: 'Auto DM',
    flow: 'Caption says "comment LINK". A follower comments → intent is read (not just the keyword) → a private-reply DM sends the tracked link, tailored to what they asked.',
    ai: 'Lightweight intent classifier over comment + deal context · catches the ~70% who signal intent without the exact word.',
  },
  {
    tag: 'always-on DISTRIBUTE', t: 'Link-in-Bio Storefront',
    flow: 'Curate collections once → one link in the bio → a live shop that auto-prunes expired deals and refreshes price/stock — a bio link that never goes dead.',
    ai: 'Ranking over the catalog + her curation · surfaces "your best converters" · v2 personalizes to the visitor.',
  },
]

export default function Q2Proto({ go }: { go: (v: View) => void }) {
  return (
    <div className="sec">
      <div className="sec-head">
        <div className="sec-kick">Q2 · Instagram Creator Suite</div>
        <h1>Three features that close the creator funnel</h1>
        <p>Today a creator who could share five deals a week shares one — because <i>discover → create → distribute → convert</i> is spread across four apps. This suite collapses it into one, wired together: making a Reel arms the Auto DM and feeds the Storefront.</p>
      </div>

      <div className="sec-cards">
        {FEATURES.map(f => (
          <div key={f.t} className="sec-card">
            <span className="sec-tag">{f.tag}</span>
            <div className="sec-ct">{f.t}</div>
            <div className="sec-cl"><b>Flow.</b> {f.flow}</div>
            <div className="sec-cl ai"><b>AI.</b> {f.ai}</div>
          </div>
        ))}
      </div>

      <div className="sec-moat">
        <b>Why EarnKaro, not Creatify + ManyChat + Linktree.</b> Those tools exist — but none of them
        know EarnKaro's live deals, commission economics, or <i>what actually converts</i>. That data
        is the moat, and it feeds every feature's AI.
      </div>

      <div className="sec-links">
        <button className="sec-btn" onClick={() => go('calc')}>See the unit economics →</button>
        <button className="sec-btn gh" onClick={() => go('journey')}>The combined journey →</button>
      </div>
    </div>
  )
}
