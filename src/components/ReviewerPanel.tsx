import { useApp } from '../AppContext'
import { PROFILES, ProfileKey } from '../data'
import { Ico } from '../icons'
import EventInspector from './EventInspector'

function propsLine(p: Record<string, string | number>): string {
  const e = Object.entries(p)
  return e.length ? e.map(([k, v]) => `${k}: ${v}`).join(' · ') : ''
}

export default function ReviewerPanel() {
  const { profile, setProfile, setCat, clearSel, setTab, showNotes, toggleNotes, showEvents, toggleEvents, events, openSheet, setGuideOpen } = useApp()
  return (
    <div className="rpanel">
      <div className="rp-badge"><span className="dot" /> Interactive wireframe</div>
      <div className="rp-title">EarnKaro · personalized redesign</div>
      <div className="rp-sub">A clickable concept, not a production app. See how one app quietly adapts to each creator — no labels, no modes.</div>

      <div className="rp-label">Viewing as · cohort</div>
      <select
        className="rp-select"
        value={profile ?? 'homemaker'}
        onChange={e => { const v = e.target.value as ProfileKey; setProfile(v); setCat(PROFILES[v].cats[0]); clearSel(); setTab('home') }}
      >
        {(Object.keys(PROFILES) as ProfileKey[]).map(k => <option key={k} value={k}>{PROFILES[k].label}</option>)}
      </select>
      <div className="rp-hint">Switch to watch the feed, contextual tools and default share target change.</div>

      <button className={'rp-toggle' + (showNotes ? ' on' : '')} onClick={toggleNotes}><Ico name="info" />{showNotes ? 'Hide' : 'Show'} personalization notes</button>
      <button className={'rp-toggle' + (showEvents ? ' on' : '')} onClick={toggleEvents}><Ico name="chart" />{showEvents ? 'Hide' : 'Show'} event labels</button>

      <div className="rp-label rp-live"><span className="livedot" /> Live event stream
        <button className="rp-max" onClick={() => openSheet(<EventInspector />)} aria-label="Expand event details"><Ico name="expand" />Expand</button>
      </div>
      <div className="evstream">
        {events.length === 0
          ? <div className="ev-empty">Interact with the app — analytics events appear here in real time.</div>
          : events.map(e => (
            <div className="ev" key={e.id}>
              <span className="ev-dot" />
              <div className="ev-main">
                <span className="ev-name">{e.name}</span>
                {propsLine(e.props) && <span className="ev-props">{propsLine(e.props)}</span>}
              </div>
            </div>
          ))}
      </div>

      <button className="rp-guide" onClick={() => setGuideOpen(true)}><Ico name="play" />Replay the guide</button>
      <div className="rp-foot">These events map to the Part-6 tracking plan (identify · group · track). Each one also carries the active cohort, surface and timestamp.</div>
    </div>
  )
}
