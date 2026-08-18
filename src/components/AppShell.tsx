import { useApp } from '../AppContext'
import { PROFILES, ProfileKey } from '../data'
import Onboarding from './Onboarding'
import Header from './Header'
import BottomNav from './BottomNav'
import Home, { BulkBar } from './Home'
import { Browse, Earnings, Profile } from './Screens'
import ReviewerPanel from './ReviewerPanel'
import WelcomeGuide from './WelcomeGuide'

export default function AppShell() {
  const { theme, profile, tab, overlay, closeOverlay, toastMsg } = useApp()

  let body
  if (!profile) {
    body = <Onboarding />
  } else {
    const screen = tab === 'browse' ? <Browse />
      : tab === 'earnings' ? <Earnings />
      : tab === 'profile' ? <Profile />
      : <Home />
    const showBulk = PROFILES[profile as ProfileKey].tool === 'bulk' && tab === 'home'
    body = (
      <>
        <Header />
        {screen}
        <BottomNav />
        {showBulk && <BulkBar />}
      </>
    )
  }

  return (
    <div id="stage" data-theme={theme}>
      <ReviewerPanel />
      <div className="phone">
        <div className="notch" />
        <div className="glow" />
        <div className="statusbar"><span>9:41</span><span>5G&nbsp;&nbsp;100%</span></div>
        <div className="app">{body}</div>
        <div className={'toast' + (toastMsg ? ' show' : '')}>{toastMsg}</div>
        {overlay && (
          <div className="ov">
            <div className="scrim" onClick={closeOverlay} />
            {overlay.node}
          </div>
        )}
        <WelcomeGuide />
      </div>
    </div>
  )
}
