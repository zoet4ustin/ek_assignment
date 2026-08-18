import { useApp } from '../AppContext'
import { USER_CTX, SESSION_ID, SESSION_START, EVENT_DESC, fmtDur, fmtTime } from '../session'

function Row({ k, v }: { k: string; v: string }) {
  return <div className="insp-row"><span className="insp-k">{k}</span><span className="insp-v">{v}</span></div>
}

export default function EventInspector() {
  const { events, profile, closeOverlay } = useApp()
  return (
    <div className="sheet" style={{ maxHeight: '88%' }}>
      <div className="handle" />
      <div style={{ fontWeight: 800, fontSize: 17 }}>Event inspector</div>
      <div className="pmeta" style={{ margin: '2px 0 14px' }}>Everything captured per interaction. Values are mocked for the wireframe.</div>

      <div className="insp-h">User &amp; device properties</div>
      <div className="insp-card">
        <Row k="session_id" v={SESSION_ID} />
        <Row k="session_duration" v={fmtDur(Date.now() - SESSION_START)} />
        <Row k="active_cohort" v={String(profile ?? '—')} />
        {Object.entries(USER_CTX).map(([k, v]) => <Row key={k} k={k} v={String(v)} />)}
      </div>

      <div className="insp-h">Captured events · {events.length}</div>
      {events.length === 0 && <div className="ev-empty">No events yet — interact with the app.</div>}
      {events.map(e => (
        <div className="insp-ev" key={e.id}>
          <div className="insp-evtop"><span className="ev-name">{e.name}</span><span className="insp-time">{fmtTime(e.t)}</span></div>
          <div className="insp-desc">{EVENT_DESC[e.name] || 'Custom event.'}</div>
          <div className="insp-card" style={{ marginTop: 4 }}>
            <Row k="at_session" v={fmtDur(e.t - SESSION_START)} />
            {Object.entries(e.props).map(([k, v]) => <Row key={k} k={k} v={String(v)} />)}
          </div>
        </div>
      ))}

      <button className="btn" style={{ marginTop: 8 }} onClick={closeOverlay}>Close</button>
    </div>
  )
}
