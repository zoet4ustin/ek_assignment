import { useState, useEffect, useMemo } from 'react'
import { TOP, aiImg, IMG } from '../data'
import { useApp } from '../AppContext'

export default function HeroCarousel() {
  const { follows } = useApp()
  const [idx, setIdx] = useState(0)
  // Whichever promo matches a followed category leads. Same slides for
  // everyone, different order — the cheapest form of personalization
  // and the one that needs no extra inventory.
  const slides = useMemo(
    () => [...TOP].sort((a, b) => Number(follows.includes(b.cat)) - Number(follows.includes(a.cat))),
    [follows])
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 3500)
    return () => clearInterval(t)
  }, [slides.length])
  return (
    <div className="hero-c">
      <div className="hero-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
        {slides.map((t, i) => (
          <div className="hero-slide" key={i}>
            <img src={aiImg(t.img, t.seed, IMG.hero[0], IMG.hero[1])} loading="eager" decoding="async" style={{ opacity: 0, transition: 'opacity .45s ease' }} onLoad={e => ((e.currentTarget as HTMLImageElement).style.opacity = '1')} onError={e => ((e.currentTarget as HTMLImageElement).style.display = 'none')} />
            <div className="hero-ov">
              <div className="hero-t">{t.title}</div>
              <div className="hero-s">{t.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="hero-dots">{slides.map((_, i) => <i key={i} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)} />)}</div>
    </div>
  )
}
