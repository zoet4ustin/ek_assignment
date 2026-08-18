import { useApp } from '../AppContext'
import { Ico } from '../icons'
import { Drawer } from './Overlays'

export default function Header() {
  const { theme, toggleTheme, toast, openDrawer } = useApp()
  return (
    <div className="hdr">
      <div className="hdr-top">
        <div className="iconbtn" onClick={() => openDrawer(<Drawer />)} aria-label="Menu"><Ico name="menu" /></div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div className="iconbtn" onClick={() => toast('Search deals')} aria-label="Search"><Ico name="search" /></div>
          <div className="iconbtn" onClick={toggleTheme} aria-label="Toggle theme"><Ico name={theme === 'dark' ? 'sun' : 'moon'} /></div>
        </div>
      </div>
      <div className="greetrow">
        <div className="who">
          <div className="avatar">A</div>
          <div><div className="g">Welcome back</div><div className="n">Hi Aanya</div></div>
        </div>
        <div className="earn"><div className="k">This month</div><div className="v">₹1,240</div></div>
      </div>
    </div>
  )
}
