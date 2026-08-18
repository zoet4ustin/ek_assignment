import { useApp } from '../AppContext'
import { Ico } from '../icons'
import { MakeLink } from './Overlays'

export default function BottomNav() {
  const { tab, setTab, openSheet } = useApp()
  const tabs: [string, string, string][] = [
    ['home', 'Home', 'home'], ['browse', 'Browse', 'grid'], ['link', '', 'link'],
    ['earnings', 'Earnings', 'chart'], ['profile', 'Profile', 'user'],
  ]
  return (
    <div className="nav">
      {tabs.map(([k, l, ic]) => k === 'link'
        ? <div key="link" className="fab" onClick={() => openSheet(<MakeLink />)} aria-label="Make link"><Ico name={ic} /></div>
        : <button key={k} className={tab === k ? 'active' : ''} onClick={() => setTab(k)}><Ico name={ic} /><span>{l}</span></button>
      )}
    </div>
  )
}
