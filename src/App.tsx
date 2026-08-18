import { useEffect } from 'react'
import { AppProvider } from './AppContext'
import AppShell from './components/AppShell'
import { allImageUrls } from './data'

export default function App() {
  // Pre-warm AI images on first paint so they generate during onboarding,
  // and are cached by the time the reviewer reaches the feed.
  useEffect(() => {
    allImageUrls().forEach(url => { const im = new Image(); im.src = url })
  }, [])

  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
