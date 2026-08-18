import { ReactNode } from 'react'
import { useApp } from '../AppContext'
import { Ico } from '../icons'
import { NoteDef } from '../data'

export function NoteSheet({ note }: { note: NoteDef }) {
  const { closeOverlay } = useApp()
  return (
    <div className="sheet">
      <div className="handle" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
        <span className="noteflag static"><Ico name="info" /></span>
        <div style={{ fontWeight: 800, fontSize: 16 }}>{note.title}</div>
      </div>
      <div className="sub" style={{ marginBottom: 14 }}>{note.logic}</div>
      <div className="pmeta" style={{ marginBottom: 6 }}>Most relevant for</div>
      <div className="chips">{note.segments.map(s => <span key={s} className="chip on" style={{ cursor: 'default' }}>{s}</span>)}</div>
      <button className="btn" style={{ marginTop: 16 }} onClick={closeOverlay}>Got it</button>
    </div>
  )
}

export function Noted({ note, event, children }: { note: NoteDef; event?: string; children: ReactNode }) {
  const { showNotes, showEvents, openSheet } = useApp()
  return (
    <div className={'noted' + (showNotes ? ' on' : '') + (showEvents && event ? ' evp' : '')}>
      {showNotes && <button className="noteflag" onClick={() => openSheet(<NoteSheet note={note} />)} aria-label="Why this is here"><Ico name="info" /></button>}
      {showEvents && event && <span className="evlabel">⦿ {event}</span>}
      {children}
    </div>
  )
}
