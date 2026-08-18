import { useState } from 'react'
import { useApp } from '../AppContext'
import { Ico } from '../icons'
import {
  CATEGORIES, SHARE_CHANNELS, REACH, PROFILES, ProfileKey,
  tileSrc, SegScore,
} from '../data'
import { Noted } from './Noted'

const MIN_FOLLOWS = 3

const WHY_AUDIENCE = {
  title: 'Audience first, taste second',
  logic: 'Most consumer apps open with "what do you like?" because they are consumption products. EarnKaro is a distribution product: a homemaker sharing into a family group is not shopping for herself. Channel and reach are the two axes the five segments actually separate on, and both are things a new user can answer in one tap without any behaviour history.',
  segments: ['Cold start · all segments'],
}

const WHY_COLLAGE = {
  title: 'Follow, don\'t declare',
  logic: 'A visual grid gets more picks than a chip list because recognition is cheaper than recall, and picking three tiles is framed as following a feed rather than filling a form. Each pick is an explicit, revocable signal, so it is allowed to outrank the inferred segment in ranking until real behaviour accumulates.',
  segments: ['Cold start · all segments'],
}

const WHY_REVEAL = {
  title: 'Show the guess, allow the correction',
  logic: 'The segment is inferred from a transparent additive model, not a black box. Showing the runner-up scores makes the personalization legible instead of spooky, and the override is the important part: a cold-start guess a user cannot correct is worse than no guess, because it silently poisons every downstream rank.',
  segments: ['Adapts per cohort'],
}

/* --------------------------------------------------------------- screen 0 */

function Welcome({ next, skip }: { next: () => void; skip: () => void }) {
  const rowA = CATEGORIES.slice(0, 6)
  const rowB = CATEGORIES.slice(6)
  return (
    <>
      <button className="skip" onClick={skip}>Skip</button>
      <div className="ob ob-welcome">
        <div className="marquee">
          <div className="mq-row">
            <div className="mq-track">
              {[...rowA, ...rowA].map((c, i) => (
                <img key={i} src={tileSrc(c.tile)} alt="" width={78} height={78} />
              ))}
            </div>
          </div>
          <div className="mq-row">
            <div className="mq-track rev">
              {[...rowB, ...rowB].map((c, i) => (
                <img key={i} src={tileSrc(c.tile)} alt="" width={78} height={78} />
              ))}
            </div>
          </div>
          <div className="mq-fade" />
        </div>

        <div className="ob-mark"><Ico name="bolt" /></div>
        <div className="obh">Share what your people already buy</div>
        <div className="sub" style={{ textAlign: 'center', marginTop: 10 }}>
          Two quick questions and your feed is built around your audience, not ours.
        </div>

        <div className="ob-points">
          {[
            ['users', 'Who you share with', 'Channel and reach, two taps'],
            ['grid', 'What they buy', 'Follow the categories that fit'],
            ['sparkles', 'A feed that matches', 'And the reasoning behind it'],
          ].map(([ic, t, d]) => (
            <div className="ob-point" key={t}>
              <span className="ob-point-ic"><Ico name={ic} /></span>
              <span><b>{t}</b><em>{d}</em></span>
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }} />
        <button className="btn" onClick={next}>Get started</button>
        <div className="ob-legal">Takes about 20 seconds · you can change it later</div>
      </div>
    </>
  )
}

/* --------------------------------------------------------------- screen 1 */

function Audience({ next, skip }: { next: () => void; skip: () => void }) {
  const { channel, setChannel, reach, setReach } = useApp()
  const ready = !!channel && !!reach
  return (
    <>
      <button className="skip" onClick={skip}>Skip</button>
      <div className="ob ob-scroll">
        <div className="steps"><i className="on" /><i /><i /></div>
        <Noted note={WHY_AUDIENCE}>
          <div className="obh" style={{ textAlign: 'left' }}>Where do you share?</div>
          <div className="sub" style={{ margin: '6px 0 14px' }}>Pick the one you use most.</div>
          <div className="pickers">
            {SHARE_CHANNELS.map(c => (
              <button
                key={c.key}
                className={'picker' + (channel === c.key ? ' on' : '')}
                onClick={() => setChannel(c.key)}
              >
                <span className="picker-ic"><Ico name={c.icon} /></span>
                <span className="picker-t">
                  <b>{c.label}</b>
                  <em>{c.sub}</em>
                </span>
                <span className="picker-tick"><Ico name="check" /></span>
              </button>
            ))}
          </div>

          <div className="h2" style={{ marginTop: 22 }}>How many people see it?</div>
          <div className="reach">
            {REACH.map(r => (
              <button
                key={r.key}
                className={'reach-c' + (reach === r.key ? ' on' : '')}
                onClick={() => setReach(r.key)}
              >
                <b>{r.label}</b>
                <em>{r.sub}</em>
              </button>
            ))}
          </div>
        </Noted>
        <div style={{ flex: 1, minHeight: 18 }} />
        <button className="btn" disabled={!ready} onClick={next}>
          {ready ? 'Continue' : 'Pick both to continue'}
        </button>
      </div>
    </>
  )
}

/* --------------------------------------------------------------- screen 2 */

function Collage({ next, skip }: { next: () => void; skip: () => void }) {
  const { follows, toggleFollow } = useApp()
  const left = MIN_FOLLOWS - follows.length
  return (
    <>
      <button className="skip" onClick={skip}>Skip</button>
      <div className="ob ob-scroll">
        <div className="steps"><i className="on" /><i className="on" /><i /></div>
        <Noted note={WHY_COLLAGE}>
          <div className="obh" style={{ textAlign: 'left' }}>What do they buy?</div>
          <div className="sub" style={{ margin: '6px 0 14px' }}>
            Follow at least {MIN_FOLLOWS}. These set your feed from the first session.
          </div>
          <div className="collage">
            {CATEGORIES.map(c => {
              const on = follows.includes(c.key)
              return (
                <button
                  key={c.key}
                  className={'tile' + (on ? ' on' : '')}
                  onClick={() => toggleFollow(c.key)}
                  aria-pressed={on}
                >
                  <img src={tileSrc(c.tile)} alt="" width={110} height={110} />
                  <span className="tile-l">{c.label}</span>
                  <span className="tile-tick"><Ico name="check" /></span>
                </button>
              )
            })}
          </div>
        </Noted>
        <div style={{ flex: 1, minHeight: 18 }} />
        <button className="btn" disabled={left > 0} onClick={next}>
          {left > 0 ? `Follow ${left} more` : `Continue with ${follows.length}`}
        </button>
      </div>
    </>
  )
}

/* --------------------------------------------------------------- screen 3 */

function Reveal({ done }: { done: (p: ProfileKey) => void }) {
  const { segScores, overridden, setOverridden } = useApp()
  const [pick, setPick] = useState<ProfileKey>(segScores[0].key)
  const top = segScores.find(s => s.key === pick) as SegScore
  const max = segScores[0].share || 1

  return (
    <div className="ob ob-scroll">
      <div className="steps"><i className="on" /><i className="on" /><i className="on" /></div>
      <Noted note={WHY_REVEAL}>
        <div className="reveal-k">Based on your answers</div>
        <div className="obh" style={{ textAlign: 'left', marginTop: 2 }}>
          You look like a<br />{PROFILES[pick].label}
        </div>
        <div className="sub" style={{ margin: '8px 0 4px' }}>{PROFILES[pick].blurb}</div>

        {!!top.reasons.length && (
          <div className="why-chips">
            {top.reasons.map((r, i) => <span key={i}>{r}</span>)}
          </div>
        )}

        <div className="h2" style={{ marginTop: 20 }}>How it scored</div>
        <div className="segbars">
          {segScores.map(s => (
            <button
              key={s.key}
              className={'segbar' + (s.key === pick ? ' on' : '')}
              onClick={() => { setPick(s.key); if (s.key !== segScores[0].key) setOverridden(true) }}
            >
              <span className="segbar-l">{s.label}</span>
              <span className="segbar-t"><i style={{ width: `${(s.share / max) * 100}%` }} /></span>
              <span className="segbar-v">{Math.round(s.share * 100)}</span>
            </button>
          ))}
        </div>
        <div className="pmeta" style={{ marginTop: 10 }}>
          {overridden
            ? 'Overridden by you. Your pick wins over the model.'
            : 'Not you? Tap any row above to switch.'}
        </div>
      </Noted>
      <div style={{ flex: 1, minHeight: 18 }} />
      <button className="btn" onClick={() => done(pick)}>Open my feed</button>
    </div>
  )
}

/* ------------------------------------------------------------------ shell */

export default function Onboarding() {
  const { setProfile, setTab, track, segScores } = useApp()
  const [step, setStep] = useState(0)

  const finish = (p: ProfileKey) => {
    track('onboarding_completed', { segment: p, step })
    setProfile(p)
    setTab('home')
  }
  const skip = () => finish(segScores[0].key)

  if (step === 0) return <Welcome next={() => setStep(1)} skip={skip} />
  if (step === 1) return <Audience next={() => setStep(2)} skip={skip} />
  if (step === 2) return <Collage next={() => setStep(3)} skip={skip} />
  return <Reveal done={finish} />
}
