import { View } from '../Site'

const STEPS = [
  { q: 'Q1', t: 'Asked about her audience, not her identity', d: 'Two taps — where she shares, and how many people see it. Never “what type of creator are you?”, because nobody knows the answer on day one.' },
  { q: 'Q1', t: 'She follows what they buy', d: 'A grid of twelve category tiles; she picks four. An explicit, revocable signal that exists before any behaviour does.' },
  { q: 'Q1', t: 'The app names its guess — and lets her correct it', d: 'Influencer, with the runner-up scores shown and one tap to override. Her home rebuilds around the tiles she followed. Rohit the broadcaster answers differently and gets a different app — same front door.' },
  { q: 'Q2', t: 'The nudge is earned', d: 'She said Instagram in step one, so Creator Studio surfaces on her home. The same tiles sit inside the Studio, editable, seeding which deals it leads with.' },
  { q: 'Q2', t: 'One-tap content', d: 'Opens a ₹4,999 dress → Make a Reel. Script, voice and a 9:16 cut from real product images in ~40s.' },
  { q: 'Q2', t: 'The funnel arms itself', d: 'She posts. The caption says “comment LINK” and the Auto DM is already armed to that deal — zero setup.' },
  { q: 'Q2', t: 'Comments become clicks', d: 'A “size M?” comment → a private-reply DM with the tracked link, the right size, and two related deals.' },
  { q: 'Q2', t: 'A shop that never dies', d: 'Her bio link opens a live storefront — collections, reels, today’s deals — auto-pruned of anything expired.' },
  { q: 'Q1', t: 'Paid, and smarter next time', d: 'Every click is tracked. Earnings show in plain language — and “what converted” sharpens her next reel.' },
]

export default function Journey({ go }: { go: (v: View) => void }) {
  return (
    <div className="sec">
      <div className="jrny-banner">
        <div className="sec-kick" style={{ color: '#bff3ec' }}>Q1 + Q2 · end to end</div>
        <h1 className="jrny-h">Aisha's journey, stitched together</h1>
        <p className="jrny-sub">Q1 makes the app know who she is; Q2 gives her the tools to act on it. One creator, discovery to paid.</p>
        <div className="jrny-legend"><span className="jlg q1">● Q1 · personalization</span><span className="jlg q2">● Q2 · creator suite</span></div>
      </div>

      <div className="jrny2">
        {STEPS.map((s, i) => (
          <div className="jstep2" key={i} style={{ ['--ja' as string]: s.q === 'Q1' ? '#0FB5A6' : '#2F6FB0' }}>
            <div className="jrail2"><div className="jnum">{i + 1}</div>{i < STEPS.length - 1 && <div className="jline2" />}</div>
            <div className="jcard">
              <span className={'jq2 ' + (s.q === 'Q1' ? 'q1' : 'q2')}>{s.q}</span>
              <div className="jt2">{s.t}</div>
              <div className="jd2">{s.d}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="sec-links">
        <button className="sec-btn" onClick={() => go('q1')}>Open the Q1 app →</button>
        <button className="sec-btn gh" onClick={() => go('q2')}>Open the Q2 suite →</button>
      </div>
    </div>
  )
}
