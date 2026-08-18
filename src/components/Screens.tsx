import { useApp } from '../AppContext'
import { CATEGORY_ICON } from '../data'
import { Ico } from '../icons'

export function Browse() {
  const { setTab, setCat } = useApp()
  const cats = Object.keys(CATEGORY_ICON).filter(c => c !== 'Trending')
  return (
    <div className="screen">
      <div className="h2" style={{ marginTop: 4 }}>Browse categories</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {cats.map(c => (
          <div key={c} className="card" style={{ textAlign: 'center', margin: 0, cursor: 'pointer' }} onClick={() => { setTab('home'); setCat(c) }}>
            <div style={{ color: 'var(--brand)', display: 'flex', justifyContent: 'center' }}><Ico name={CATEGORY_ICON[c]} /></div>
            <div style={{ marginTop: 8, fontWeight: 600, fontSize: 14 }}>{c}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Earnings() {
  const { toast, track } = useApp()
  const tiles: [string, string][] = [['Confirmed', '₹980'], ['Pending', '₹260'], ['Clicks', '1,284'], ['Conv.', '3.1%']]
  return (
    <div className="screen">
      <div className="h2" style={{ marginTop: 4 }}>Earnings</div>
      <div className="glass">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="sub">This month</span><span style={{ fontSize: 24, fontWeight: 800 }}>₹1,240</span></div>
        <div className="progress"><i style={{ width: '62%' }} /></div>
        <div className="pmeta" style={{ marginTop: 7 }}>Goal ₹2,000 · paid out on the 7th</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11 }}>
        {tiles.map(([k, v]) => <div key={k} className="metric"><div className="k">{k}</div><div className="v">{v}</div></div>)}
      </div>
      <button className="btn" style={{ marginTop: 6 }} onClick={() => { track('payout_requested'); toast('Payment requested ✓') }}>Request payout</button>
    </div>
  )
}

export function Profile() {
  const { theme, setTheme, toast } = useApp()
  return (
    <div className="screen">
      <div className="h2" style={{ marginTop: 4 }}>Profile</div>
      <div className="glass" style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <div className="avatar" style={{ width: 52, height: 52, fontSize: 20 }}>A</div>
        <div><div style={{ fontWeight: 800, fontSize: 16 }}>Aanya Sharma</div><div className="pmeta">User ID 5369078</div></div>
      </div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px 0' }}>
          <span>Theme</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <button className={'chip' + (theme === 'light' ? ' on' : '')} onClick={() => setTheme('light')}>Light</button>
            <button className={'chip' + (theme === 'dark' ? ' on' : '')} onClick={() => setTheme('dark')}>Dark</button>
          </div>
        </div>
      </div>
      <div className="card" style={{ cursor: 'pointer' }} onClick={() => toast('Refer & earn 10%')}>Refer &amp; earn</div>
      <div className="card" style={{ cursor: 'pointer' }} onClick={() => toast('Payment history')}>Payment history</div>
    </div>
  )
}
