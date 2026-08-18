import { useState } from 'react'

const STACK = 7850
const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN')

type S = Record<string, number>
const DEF: S = { fx: 94.6, vid: 0.10, len: 18, tts: 2, llm: 0.5, ren: 4, dmc: 0.02, sf: 10, nrt: 25, ops: 25, margin: 60 }

function Field({ s, set, k, label, unit, step }: { s: S; set: (k: string, v: number) => void; k: string; label: string; unit: string; step: number }) {
  return (
    <div className="cl-row">
      <label>{label} <span className="cl-u">{unit}</span></label>
      <input type="number" value={s[k]} step={step} onChange={e => set(k, parseFloat(e.target.value) || 0)} />
    </div>
  )
}

export default function Calculator() {
  const [s, setS] = useState<S>(DEF)
  const set = (k: string, v: number) => setS(o => ({ ...o, [k]: v }))

  const ndm = Math.round(s.nrt * 32)
  const v1 = s.tts + s.llm + s.ren
  const v2 = v1 + s.vid * s.len * s.fx
  const compute = s.nrt * v1 + ndm * s.dmc + s.sf
  const cost = compute * (1 + s.ops / 100)
  const price = cost / Math.max(0.01, 1 - s.margin / 100)
  const profit = price - cost
  const gprice = v2 / 0.7
  const undercut = Math.round((1 - price / STACK) * 100)

  return (
    <div className="calc">
      <div className="cl-head">
        <div className="cl-kick">EarnKaro · Creator Pro · pricing</div>
        <h1>What should we charge for Creator Pro?</h1>
        <p>The price isn't a guess — it falls out of what a creator costs us to serve. Move the two sliders;
          the price updates live.</p>
      </div>

      <div className="cl-panel">
        <div className="cl-inputs">
          <div className="cl-field">
            <div className="cl-flabel">Reels this creator makes a month</div>
            <div className="cl-fval">{s.nrt}<span> reels</span></div>
            <input type="range" min={1} max={80} value={s.nrt} step={1} onChange={e => set('nrt', parseFloat(e.target.value))} />
            <div className="cl-fhint"><span>1</span><span>{ndm.toLocaleString('en-IN')} comments auto-answered</span><span>80</span></div>
          </div>
          <div className="cl-field">
            <div className="cl-flabel">Profit we keep</div>
            <div className="cl-fval">{Math.round(s.margin)}<span>%</span></div>
            <input type="range" min={0} max={85} value={s.margin} step={1} onChange={e => set('margin', parseFloat(e.target.value))} />
            <div className="cl-fhint"><span>0%</span><span>higher → higher price</span><span>85%</span></div>
          </div>
        </div>

        <div className="cl-out">
          <div className="cl-out-k">Creator Pro price</div>
          <div className="cl-out-big">{inr(price)}<span>/mo</span></div>
          <div className="cl-out-row">
            <div><span>Costs us to serve</span><b>{inr(cost)}</b></div>
            <div><span>We keep</span><b>{inr(profit)}</b></div>
          </div>
          <div className="cl-out-note">{undercut}% cheaper than three separate tools</div>
        </div>
      </div>

      <div className="cl-bench">
        <h2>vs. doing it with separate tools</h2>
        <div className="cl-brow">
          <div className="cl-blab"><span>Creatify + ManyChat + Linktree</span><b>{inr(STACK)} / mo</b></div>
          <div className="cl-btrack"><i className="them" style={{ width: '100%' }} /></div>
        </div>
        <div className="cl-brow">
          <div className="cl-blab"><span>EarnKaro Creator Pro</span><b>{inr(price)} / mo</b></div>
          <div className="cl-btrack"><i className="us" style={{ width: Math.max(3, (price / STACK) * 100) + '%' }} /></div>
        </div>
        <div className="cl-barlab"><b>{undercut}% cheaper</b> — and the only one that knows EarnKaro's deals and what converts.</div>
      </div>

      <div className="cl-sech">The numbers behind the price — every assumption is editable, so the panel can challenge any of them</div>
      <div className="cl-grid">
        <div className="cl-card">
          <h2>What each piece costs us</h2>
          <Field s={s} set={set} k="fx" label="Dollar rate" unit="₹ / USD" step={0.1} />
          <Field s={s} set={set} k="tts" label="AI voiceover (ElevenLabs)" unit="₹ / reel" step={0.5} />
          <Field s={s} set={set} k="llm" label="AI script" unit="₹ / reel" step={0.1} />
          <Field s={s} set={set} k="ren" label="Putting the reel together" unit="₹ / reel" step={0.5} />
          <Field s={s} set={set} k="dmc" label="Reading one comment" unit="₹ / comment" step={0.01} />
          <Field s={s} set={set} k="sf" label="Hosting the storefront" unit="₹ / creator / mo" step={1} />
          <Field s={s} set={set} k="ops" label="Running cost on top" unit="% overhead" step={5} />
          <div className="cl-mini">Each templated reel costs us about <b>{inr(v1)}</b>; a month for this creator works out to <b>{inr(cost)}</b> to serve.</div>
        </div>
        <div className="cl-card">
          <h2>The expensive “cinematic” reel (metered)</h2>
          <Field s={s} set={set} k="vid" label="AI video model (Kling)" unit="$ / sec" step={0.01} />
          <Field s={s} set={set} k="len" label="Cinematic reel length" unit="sec" step={1} />
          <div className="cl-mini">A cinematic (generative) reel costs <b>{inr(v2)}</b> — <b>{Math.round(v2 / v1)}× more</b> than a templated one. That's why it's never free: it's sold as a credit.</div>
          <div className="cl-gen">
            <div><b>Cinematic reel credit</b><div className="cl-bd">priced at ~30% margin over cost</div></div>
            <div style={{ textAlign: 'right' }}><div className="cl-genp">{inr(gprice)}</div><div className="cl-bd">cost {inr(v2)}</div></div>
          </div>
        </div>
      </div>
      <div className="cl-note">Tool costs bill in USD, converted at the dollar rate above. The free tier (storefront + basic Auto DM + ~5 templated reels) is a GMV-acquisition investment recovered through commission, not priced here.</div>
    </div>
  )
}
