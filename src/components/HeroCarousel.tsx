import { useState, useEffect } from 'react'
import { TOP, aiImg, IMG } from '../data'

export default function HeroCarousel() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % TOP.length), 3500)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="hero-c">
      <div className="hero-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
        {TOP.map((t, i) => (
          <div className="hero-slide" key={i}>
            <img src={aiImg(t.img, t.seed, IMG.hero[0], IMG.hero[1])} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" style={{ opacity: 0, transition: 'opacity .45s ease' }} onLoad={e => ((e.currentTarget as HTMLImageElement).style.opacity = '1')} onError={e => ((e.currentTarget as HTMLImageElement).style.display = 'none')} />
            <div className="hero-ov">
              <div className="hero-t">{t.title}</div>
              <div className="hero-s">{t.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="hero-dots">{TOP.map((_, i) => <i key={i} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)} />)}</div>
    </div>
  )
}
