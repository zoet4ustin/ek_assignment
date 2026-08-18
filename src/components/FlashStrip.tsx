import { useState, useEffect } from 'react'
import { FLASH, aiImg, IMG } from '../data'
import { Ico } from '../icons'

function fmt(ms: number): string {
  if (ms < 0) ms = 0
  const s = Math.floor(ms / 1000)
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), ss = s % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return (h > 0 ? h + ':' : '') + pad(m) + ':' + pad(ss)
}

export default function FlashStrip() {
  const [ends] = useState(() => FLASH.map(f => Date.now() + f.mins * 60000))
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="flash">
      {FLASH.map((f, i) => (
        <div className="flash-c" key={i}>
          <div className="flash-img">
            <img src={aiImg(f.img, f.seed, IMG.flash[0], IMG.flash[1])} loading="lazy" decoding="async" style={{ opacity: 0, transition: 'opacity .45s ease' }} onLoad={e => ((e.currentTarget as HTMLImageElement).style.opacity = '1')} onError={e => ((e.currentTarget as HTMLImageElement).style.display = 'none')} />
            <span className="flash-timer"><Ico name="clock" />{fmt(ends[i] - now)}</span>
          </div>
          <div className="flash-b">
            <div className="pname" style={{ fontSize: 12.5 }}>{f.b}</div>
            <div className="pmeta">{f.n}</div>
            <span className="badge b-suc" style={{ marginTop: 5, display: 'inline-block' }}>{f.pr}% profit</span>
          </div>
        </div>
      ))}
    </div>
  )
}
