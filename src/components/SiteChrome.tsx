import { View, Theme } from '../Site'

export function Nav({ go, active, theme, setTheme }: { go: (v: View) => void; active: View; theme: Theme; setTheme: (t: Theme) => void }) {
  return (
    <nav className="lnav">
      <span className="lnav-logo" onClick={() => go('home')}>EARN<b>KARO</b><sup>®</sup></span>
      <span className="lnav-links">
        <a className={active === 'home' ? 'on' : ''} onClick={() => go('home')}>Prototypes</a>
        <a className={active === 'approach' ? 'on' : ''} onClick={() => go('approach')}>Approach</a>
      </span>
      <span className="lnav-r">
        <span className="lnav-theme" role="group" aria-label="Theme">
          {(['light', 'dark', 'system'] as Theme[]).map(t => (
            <button key={t} className={theme === t ? 'on' : ''} onClick={() => setTheme(t)} aria-label={t}>{t === 'light' ? '☀' : t === 'dark' ? '🌙' : '⛶'}</button>
          ))}
        </span>
      </span>
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="lfoot">
      <div className="lfoot-l">
        <span className="lnav-logo">EARN<b>KARO</b></span>
        <div className="lfoot-sub">Product assignment · June 2026 · prepared by Agniv</div>
        <a className="lfoot-gh" href="https://github.com/zoet4ustin/ek_assignment" target="_blank" rel="noopener noreferrer">↗ github.com/zoet4ustin/ek_assignment</a>
      </div>
      <div className="lfoot-links">
        <div className="lfoot-ct">The written answers (PDF)</div>
        <a href="/answers/Q1.pdf" download="Q1_EarnKaro.pdf">Q1 — Segmentation &amp; Personalization</a>
        <a href="/answers/Q2.pdf" download="Q2_EarnKaro.pdf">Q2 — Instagram Creator Suite</a>
        <a href="/answers/Combined.pdf" download="EarnKaro_PM_Assignment.pdf">Combined (Q1 + Q2)</a>
      </div>
      <div className="lfoot-r">
        <div className="lfoot-note"><b>Independent candidate assignment.</b> Not affiliated with or endorsed by EarnKaro; brands, logos and screenshots are illustrative and Instagram is simulated.</div>
      </div>
    </footer>
  )
}
