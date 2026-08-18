import { useState, useEffect } from 'react'
import { AppProvider } from './AppContext'
import AppShell from './components/AppShell'
import { allImageUrls } from './data'
import Landing from './components/Landing'
import Approach from './components/Approach'
import Calculator from './components/Calculator'
import Q2Flow from './components/Q2Flow'
import Journey from './components/Journey'

export type View = 'home' | 'approach' | 'q1' | 'q2' | 'calc' | 'journey'
export type Theme = 'light' | 'dark' | 'system'

function resolve(t: Theme): 'light' | 'dark' {
  if (t === 'system') return (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'
  return t
}

export function Site() {
  const [view, setViewRaw] = useState<View>('home')
  const [theme, setThemeS] = useState<Theme>(() => (typeof localStorage !== 'undefined' && (localStorage.getItem('ek_site_theme') as Theme)) || 'light')
  const setTheme = (t: Theme) => { setThemeS(t); try { localStorage.setItem('ek_site_theme', t) } catch { /* ignore */ } }
  const setView = (v: View) => { setViewRaw(v); try { window.history.pushState({ view: v }, '') } catch { /* ignore */ } }
  const resolved = resolve(theme)

  useEffect(() => { allImageUrls().forEach(url => { const im = new Image(); im.src = url }) }, [])
  useEffect(() => {
    try { window.history.replaceState({ view: 'home' }, '') } catch { /* ignore */ }
    const onPop = (e: PopStateEvent) => setViewRaw((e.state && (e.state as { view?: View }).view) || 'home')
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  useEffect(() => { try { window.scrollTo(0, 0) } catch { /* ignore */ } }, [view])

  const bar = (
    <div className="site-theme" role="group" aria-label="Theme">
      {(['light', 'dark', 'system'] as Theme[]).map(t => (
        <button key={t} className={theme === t ? 'on' : ''} onClick={() => setTheme(t)} aria-label={t}>
          {t === 'light' ? '☀' : t === 'dark' ? '🌙' : '⛶'}<span>{t === 'system' ? 'Auto' : t[0].toUpperCase() + t.slice(1)}</span>
        </button>
      ))}
    </div>
  )
  const back = <button className="site-back" onClick={() => window.history.back()}>← Back</button>

  const chrome = view === 'home' || view === 'approach'
  let body
  if (view === 'home') body = <Landing go={setView} theme={theme} setTheme={setTheme} />
  else if (view === 'approach') body = <Approach go={setView} theme={theme} setTheme={setTheme} />
  else if (view === 'q1') body = <>{back}<AppProvider initial={resolved}><AppShell /></AppProvider></>
  else if (view === 'calc') body = <>{back}<Calculator /></>
  else if (view === 'q2') body = <>{back}<Q2Flow /></>
  else body = <>{back}<Journey go={setView} /></>

  return (
    <div className="site" data-th={resolved}>
      {view !== 'q1' && !chrome && bar}
      {body}
    </div>
  )
}
