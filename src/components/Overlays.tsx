import { useApp } from '../AppContext'
import { PROFILES, ProfileKey, aiImg } from '../data'
import { Ico } from '../icons'

export function Drawer() {
  const { theme, toggleTheme, toast, closeOverlay, setProfile, setCat, clearSel, profile } = useApp()
  const items: [string, string][] = [
    ['Home', 'home'], ['My links', 'link'], ['Earnings', 'chart'],
    ['Partners', 'grid'], ['Payments', 'wallet'], ['Refer & earn', 'gift'], ['Settings', 'user'],
  ]
  return (
    <div className="drawer">
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 14 }}>
        <div className="avatar">A</div>
        <div><div style={{ fontWeight: 800 }}>Aanya Sharma</div><div className="pmeta">₹1,240 this month</div></div>
      </div>
      {items.map(([l, ic]) => (
        <div key={l} className="menu-i" onClick={() => { closeOverlay(); toast(l) }}><Ico name={ic} />{l}</div>
      ))}
      <div className="menu-i" onClick={toggleTheme}><Ico name={theme === 'dark' ? 'sun' : 'moon'} />Theme: {theme}</div>
      <div className="demo">
        <div className="dl">Demo · simulate profile</div>
        <div className="pmeta" style={{ marginBottom: 8 }}>Not a user feature — preview how the same app personalizes for different behaviour.</div>
        <select value={profile ?? 'homemaker'} onChange={e => {
          const v = e.target.value as ProfileKey
          setProfile(v); setCat(PROFILES[v].cats[0]); clearSel(); closeOverlay()
        }}>
          {(Object.keys(PROFILES) as ProfileKey[]).map(k => <option key={k} value={k}>{PROFILES[k].label}</option>)}
        </select>
      </div>
    </div>
  )
}

export function ShareSheet({ name }: { name: string }) {
  const { profile, closeOverlay, toast, track } = useApp()
  const def = PROFILES[profile ?? 'homemaker'].def
  const ch: [string, string, string][] = [
    ['WhatsApp', 'wa', '#25D366'], ['Telegram', 'tg', '#2AABEE'], ['Instagram', 'ig', '#E1306C'],
    ['X', 'x', '#111'], ['Family group', 'group', '#7C5CFF'], ['Deals channel', 'group', '#0F9D58'], ['Copy link', 'copy', '#555'],
  ]
  return (
    <div className="sheet">
      <div className="handle" />
      <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 3 }}>Share &amp; earn</div>
      <div className="pmeta" style={{ marginBottom: 14 }}>{name} · profit link ready</div>
      <div className="sharegrid">
        {ch.map(([l, ic, bg]) => (
          <div key={l} className={'sh' + (l === def ? ' def' : '')} onClick={() => { track(l === 'Copy link' ? 'link_copied' : 'post_shared', { channel: l }); closeOverlay(); toast(l === 'Copy link' ? 'Link copied ✓' : 'Opening ' + l + '…') }}>
            <div className="b" style={{ background: bg }}><Ico name={ic} /></div>{l}
          </div>
        ))}
      </div>
      <div className="pmeta" style={{ textAlign: 'center', marginTop: 14 }}>Suggested for you: <b style={{ color: 'var(--tx)' }}>{def}</b></div>
    </div>
  )
}

export function StoryCard({ name }: { name: string }) {
  const { closeOverlay, toast, track } = useApp()
  return (
    <div className="sheet">
      <div className="handle" />
      <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 12 }}>Story card</div>
      <div style={{ height: 300, borderRadius: 20, background: 'linear-gradient(150deg,var(--glow1),var(--glow2))', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 18 }}>
        <img src={aiImg('aesthetic instagram fashion outfit editorial flat lay, pastel tones', 41, 480, 620)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .9 }} onError={e => ((e.currentTarget as HTMLImageElement).style.display = 'none')} />
        <div style={{ position: 'relative', color: '#fff', textShadow: '0 1px 6px rgba(0,0,0,.5)' }}>
          <div style={{ fontWeight: 800, fontSize: 19 }}>{name}</div>
          <div style={{ fontSize: 13 }}>earnkaro.link/aanya · link in bio</div>
        </div>
      </div>
      <button className="btn" style={{ marginTop: 14 }} onClick={() => { track('story_card_created'); closeOverlay(); toast('Story card saved ✓') }}>Share to Instagram</button>
    </div>
  )
}

export function Broadcast() {
  const { selected, closeOverlay, clearSel, toast, track } = useApp()
  const n = selected.length
  const opts: [string, string][] = [['Telegram channel', 'tg'], ['WhatsApp broadcast', 'wa']]
  return (
    <div className="sheet">
      <div className="handle" />
      <div style={{ fontWeight: 800, fontSize: 16 }}>Broadcast {selected.length} deals</div>
      <div className="pmeta" style={{ margin: '3px 0 14px' }}>{selected.length} ready posts (image + caption + link). Pick where to blast:</div>
      {opts.map(([l, ic], idx) => (
        <button key={l} className={'btn' + (idx ? ' ghost' : '')} style={{ marginBottom: 10, justifyContent: 'flex-start', gap: 12, paddingLeft: 18 }} onClick={() => { track('broadcast_sent', { count: n, channel: l }); closeOverlay(); clearSel(); toast('Opening ' + l + '…') }}>
          <span style={{ display: 'flex', width: 22 }}><Ico name={ic} /></span>{l}
        </button>
      ))}
      <div className="pmeta" style={{ textAlign: 'center' }}>or <span style={{ color: 'var(--brand)', cursor: 'pointer' }} onClick={() => { track('bulk_copied', { count: n }); closeOverlay(); toast('All copied ✓') }}>copy all {n}</span></div>
    </div>
  )
}

export function MakeLink() {
  const { closeOverlay, toast, track } = useApp()
  return (
    <div className="sheet">
      <div className="handle" />
      <div style={{ fontWeight: 800, fontSize: 16 }}>Make a profit link</div>
      <div className="card" style={{ marginTop: 12 }}>
        <div className="pmeta">Paste or search a product…</div>
        <div style={{ marginTop: 8, fontWeight: 600 }}>flipkart.com/…/nike-airmax</div>
      </div>
      <button className="btn" onClick={() => { track('link_made'); closeOverlay(); toast('Profit link copied ✓') }}><Ico name="link" />Make link</button>
    </div>
  )
}
