import { createContext, useContext, useState, useRef, useCallback, useMemo, ReactNode } from 'react'
import { ProfileKey, SegScore, inferSegment } from './data'

type Theme = 'light' | 'dark'
type Overlay = { type: 'drawer' | 'sheet'; node: ReactNode } | null
export interface EventRec { id: number; name: string; props: Record<string, string | number>; t: number }

interface Ctx {
  theme: Theme; setTheme: (t: Theme) => void; toggleTheme: () => void
  profile: ProfileKey | null; setProfile: (p: ProfileKey) => void
  tab: string; setTab: (t: string) => void
  cat: string; setCat: (c: string) => void
  selected: number[]; toggleSel: (i: number) => void; clearSel: () => void
  channel: string | null; setChannel: (c: string) => void
  reach: string | null; setReach: (r: string) => void
  follows: string[]; toggleFollow: (c: string) => void
  segScores: SegScore[]
  overridden: boolean; setOverridden: (b: boolean) => void
  overlay: Overlay; openSheet: (node: ReactNode) => void; openDrawer: (node: ReactNode) => void; closeOverlay: () => void
  toastMsg: string; toast: (m: string) => void
  showNotes: boolean; toggleNotes: () => void
  showEvents: boolean; toggleEvents: () => void
  events: EventRec[]; track: (name: string, props?: Record<string, string | number>) => void
  guideOpen: boolean; setGuideOpen: (b: boolean) => void
}

const C = createContext<Ctx>(null as unknown as Ctx)
export const useApp = () => useContext(C)

export function AppProvider({ children, initial }: { children: ReactNode; initial?: Theme }) {
  const [theme, setThemeS] = useState<Theme>(initial || 'dark')
  const [profile, setProfileS] = useState<ProfileKey | null>(null)
  const [tab, setTabS] = useState('home')
  const [cat, setCatS] = useState('All')
  const [selected, setSelected] = useState<number[]>([])
  const [channel, setChannelS] = useState<string | null>(null)
  const [reach, setReachS] = useState<string | null>(null)
  const [follows, setFollows] = useState<string[]>([])
  const [overridden, setOverridden] = useState(false)
  const [overlay, setOverlay] = useState<Overlay>(null)
  const [toastMsg, setToastMsg] = useState('')
  const [showNotes, setShowNotes] = useState(false)
  const [showEvents, setShowEvents] = useState(false)
  const [events, setEvents] = useState<EventRec[]>([])
  const [guideOpen, setGuideOpen] = useState(true)
  const tref = useRef<ReturnType<typeof setTimeout>>()
  const idRef = useRef(0)

  const track = useCallback((name: string, props: Record<string, string | number> = {}) => {
    const ev: EventRec = { id: ++idRef.current, name, props, t: Date.now() }
    setEvents(es => [ev, ...es].slice(0, 16))
    try { console.log('[track]', name, props) } catch { /* ignore */ }
  }, [])

  const setTheme = useCallback((t: Theme) => {
    setThemeS(t)
    try { localStorage.setItem('ek_theme', t) } catch { /* ignore */ }
    track('theme_changed', { theme: t })
  }, [track])
  const toggleTheme = useCallback(() => setTheme(theme === 'dark' ? 'light' : 'dark'), [theme, setTheme])

  const setProfile = useCallback((p: ProfileKey) => { setProfileS(p); track('segment_switched', { to: p }) }, [track])
  const setTab = useCallback((t: string) => { setTabS(t); track('screen_viewed', { screen: t }) }, [track])
  const setCat = useCallback((c: string) => { setCatS(c); track('category_selected', { category: c }) }, [track])

  const toggleSel = useCallback((i: number) => setSelected(s => {
    const next = s.includes(i) ? s.filter(x => x !== i) : [...s, i]
    track('deal_selected', { selected: next.length })
    return next
  }), [track])
  const clearSel = useCallback(() => setSelected([]), [])

  const setChannel = useCallback((c: string) => {
    setChannelS(c); track('audience_channel_set', { channel: c })
  }, [track])
  const setReach = useCallback((r: string) => {
    setReachS(r); track('audience_reach_set', { reach: r })
  }, [track])
  const toggleFollow = useCallback((c: string) => setFollows(s => {
    const next = s.includes(c) ? s.filter(x => x !== c) : [...s, c]
    track(s.includes(c) ? 'category_unfollowed' : 'category_followed', { category: c, following: next.length })
    return next
  }), [track])

  // Recomputed on every pick, so the reveal screen and the reviewer panel
  // are always reading the same numbers the ranking uses.
  const segScores = useMemo(
    () => inferSegment(channel, reach, follows), [channel, reach, follows])

  const openSheet = useCallback((node: ReactNode) => setOverlay({ type: 'sheet', node }), [])
  const openDrawer = useCallback((node: ReactNode) => setOverlay({ type: 'drawer', node }), [])
  const closeOverlay = useCallback(() => setOverlay(null), [])
  const toggleNotes = useCallback(() => setShowNotes(v => !v), [])
  const toggleEvents = useCallback(() => setShowEvents(v => !v), [])

  const toast = useCallback((m: string) => {
    setToastMsg(m)
    if (tref.current) clearTimeout(tref.current)
    tref.current = setTimeout(() => setToastMsg(''), 1900)
  }, [])

  const value: Ctx = {
    theme, setTheme, toggleTheme,
    profile, setProfile,
    tab, setTab, cat, setCat,
    selected, toggleSel, clearSel,
    channel, setChannel, reach, setReach,
    follows, toggleFollow,
    segScores, overridden, setOverridden,
    overlay, openSheet, openDrawer, closeOverlay,
    toastMsg, toast,
    showNotes, toggleNotes,
    showEvents, toggleEvents,
    events, track,
    guideOpen, setGuideOpen,
  }
  return <C.Provider value={value}>{children}</C.Provider>
}
