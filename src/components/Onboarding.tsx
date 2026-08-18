import { useState } from 'react'
import { useApp } from '../AppContext'
import { Ico } from '../icons'
import { SLIDES, INTERESTS, CHANNELS, aiImg } from '../data'
import { Noted } from './Noted'

const WHY = {
  title: 'Why we ask this',
  logic: 'A soft, skippable cold-start signal. It bootstraps personalization on day one — before any behaviour data exists — so the very first session already feels relevant. It is a preference, not an identity label, and real behaviour refines it over time.',
  segments: ['Cold start · all segments'],
}

function ChannelChip({ label }: { label: string }) {
  const [on, setOn] = useState(false)
  return <div className={'chip' + (on ? ' on' : '')} onClick={() => setOn(!on)}>{label}</div>
}

export default function Onboarding() {
  const { setProfile, setTab, interests, toggleInterest } = useApp()
  const [step, setStep] = useState(0)
  const finish = () => { setProfile('homemaker'); setTab('home') }

  if (step < 3) {
    const s = SLIDES[step]
    return (
      <>
        <button className="skip" onClick={finish}>Skip</button>
        <div className="ob">
          <div className="hero">
            <Ico name="bolt" />
            <img className="heroimg" src={aiImg(s.img, s.seed, 680, 560)} onError={e => ((e.currentTarget as HTMLImageElement).style.display = 'none')} />
          </div>
          <div className="dots">{[0, 1, 2].map(i => <i key={i} className={i === step ? 'on' : ''} />)}</div>
          <div className="obh">{s.h}</div>
          <div className="sub" style={{ textAlign: 'center', marginTop: 10 }}>EarnKaro turns the products you love into profit links you can share anywhere.</div>
          <div style={{ flex: 1 }} />
          <button className="btn" onClick={() => setStep(step + 1)}>{step < 2 ? 'Continue' : 'Next'}</button>
        </div>
      </>
    )
  }

  return (
    <>
      <button className="skip" onClick={finish}>Skip</button>
      <div className="ob">
        <div style={{ marginTop: 46 }}>
        <Noted note={WHY}>
          <div className="obh" style={{ textAlign: 'left' }}>What do you love sharing?</div>
          <div className="sub" style={{ margin: '6px 0 2px' }}>Optional — helps us show better deals from day one.</div>
          <div className="chips">{INTERESTS.map(c => <div key={c} className={'chip' + (interests.includes(c) ? ' on' : '')} onClick={() => toggleInterest(c)}>{c}</div>)}</div>
          <div className="h2">Where do you usually share?</div>
          <div className="chips">{CHANNELS.map(c => <ChannelChip key={c} label={c} />)}</div>
        </Noted>
        </div>
        <div style={{ flex: 1 }} />
        <button className="btn" onClick={finish}>Start earning</button>
      </div>
    </>
  )
}
