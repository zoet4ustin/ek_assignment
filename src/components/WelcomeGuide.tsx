import { useApp } from '../AppContext'

const STEPS: [string, string][] = [
  ['One app, five creators', 'The same EarnKaro adapts to who you are — no labels, no “modes”. The redesign is invisible personalization.'],
  ['Pick a cohort', 'Use “Viewing as” on the side panel to become a Homemaker, Influencer, Broadcaster, Casual sharer or Power affiliate — and watch the home feed, tools and default share target change.'],
  ['See the logic', 'Turn on “Show personalization notes”, then tap the ⓘ markers to read why each section appears and which segments it serves.'],
  ['Try the flows', 'Tap Share & earn, the + (make link), the flash deals, and the goal / story / dashboard tools. Toggle light & dark too.'],
]

export default function WelcomeGuide() {
  const { guideOpen, setGuideOpen } = useApp()
  if (!guideOpen) return null
  return (
    <div className="welcome">
      <div className="wcard">
        <div className="wbadge"><span className="dot" /> Interactive wireframe</div>
        <div className="wtitle">How to explore this prototype</div>
        {STEPS.map(([t, d], i) => (
          <div className="wstep" key={i}>
            <div className="wnum">{i + 1}</div>
            <div><div className="wst">{t}</div><div className="wsd">{d}</div></div>
          </div>
        ))}
        <button className="btn" onClick={() => setGuideOpen(false)}>Start exploring</button>
      </div>
    </div>
  )
}
