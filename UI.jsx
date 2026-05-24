import { useState, useEffect, useRef } from 'react'

// ── PARTICLES CANVAS ──────────────────────────────────────────
export function Particles() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight
    const COLS = ['#f59e0b','#fbbf24','#3b82f6','#93c5fd','#fcd34d']
    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-.5)*.3, vy: (Math.random()-.5)*.3,
      r: Math.random()*1.4+.4,
      c: COLS[Math.floor(Math.random()*COLS.length)],
      a: Math.random()*.45+.12,
    }))
    let raf
    const draw = () => {
      ctx.clearRect(0,0,W,H)
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy
        if(p.x<0)p.x=W; if(p.x>W)p.x=0
        if(p.y<0)p.y=H; if(p.y>H)p.y=0
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle=p.c; ctx.globalAlpha=p.a; ctx.fill()
      })
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++) {
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y
        const d=Math.sqrt(dx*dx+dy*dy)
        if(d<100) {
          ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y)
          ctx.strokeStyle='#f59e0b'; ctx.globalAlpha=(1-d/100)*.06
          ctx.lineWidth=.5; ctx.stroke()
        }
      }
      ctx.globalAlpha=1; raf=requestAnimationFrame(draw)
    }
    draw()
    const onR = () => { W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight }
    window.addEventListener('resize', onR)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onR) }
  }, [])
  return <canvas ref={ref} style={{ position:'fixed',top:0,left:0,zIndex:0,pointerEvents:'none',opacity:.6 }}/>
}

// ── LOGO COMPONENT (uses actual logo.png) ─────────────────────
export function Logo({ size = 44, showText = true }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12, userSelect:'none', cursor:'pointer' }}>
      <img
        src="/logo.png"
        alt="Rackyweb Global Media"
        style={{
          width: size, height: size,
          objectFit: 'contain',
          borderRadius: '50%',
          filter: 'drop-shadow(0 0 12px rgba(245,158,11,0.5))',
        }}
      />
      {showText && (
        <div>
          <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:16, letterSpacing:.5, lineHeight:1 }}>
            <span style={{ background:'linear-gradient(135deg,#fbbf24,#f59e0b)', WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              RACKYWEB
            </span>
          </div>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:'#3b82f6', letterSpacing:3, marginTop:2 }}>
            PROMOTE
          </div>
        </div>
      )}
    </div>
  )
}

// ── ANIMATED COUNTER ──────────────────────────────────────────
export function Counter({ end, suffix = '' }) {
  const [v, setV] = useState(0)
  const ref = useRef(null)
  const done = useRef(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || done.current) return
      done.current = true
      let cur = 0; const step = end / 110
      const tick = () => { cur = Math.min(cur+step, end); setV(Math.floor(cur)); if(cur<end) requestAnimationFrame(tick) }
      requestAnimationFrame(tick)
    }, { threshold:.3 })
    obs.observe(el); return () => obs.disconnect()
  }, [end])
  return <span ref={ref}>{v.toLocaleString()}{suffix}</span>
}

// ── TYPEWRITER ────────────────────────────────────────────────
export function Typewriter({ texts, speed = 75 }) {
  const [idx, setIdx] = useState(0)
  const [shown, setShown] = useState('')
  const [del, setDel] = useState(false)
  useEffect(() => {
    const cur = texts[idx]
    if (!del && shown === cur) { const t = setTimeout(() => setDel(true), 2400); return () => clearTimeout(t) }
    if (del && shown === '') { setDel(false); setIdx((idx+1) % texts.length); return }
    const t = setTimeout(() => setShown(del ? shown.slice(0,-1) : cur.slice(0,shown.length+1)), del ? 32 : speed)
    return () => clearTimeout(t)
  }, [shown, del, idx, texts, speed])
  return (
    <span style={{ color:'#fbbf24' }}>
      {shown}<span style={{ animation:'blink 1s infinite', color:'#3b82f6' }}>|</span>
    </span>
  )
}

// ── SECTION LABEL ─────────────────────────────────────────────
export function SLabel({ children }) {
  return (
    <div className="s-label">
      <span className="dot" />
      {children}
    </div>
  )
}

// ── DIVIDER ───────────────────────────────────────────────────
export function Divider() {
  return <div className="divider" />
}

// ── PROGRESS BAR ──────────────────────────────────────────────
export function ProgressBar({ value, max, color = '#f59e0b', label }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div>
      {label && (
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6, fontSize:12, color:'var(--text-2)' }}>
          <span>{label}</span>
          <span style={{ color }}>{Math.round(pct)}%</span>
        </div>
      )}
      <div className="prog-track">
        <div className="prog-fill" style={{ width:`${pct}%`, background:`linear-gradient(90deg,${color},${color}bb)`, boxShadow:`0 0 8px ${color}60` }}/>
      </div>
    </div>
  )
}

// ── TOAST ─────────────────────────────────────────────────────
export function Toast({ msg, type = 'success', onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3800); return () => clearTimeout(t) }, [onClose])
  const col = type === 'success' ? '#f59e0b' : type === 'error' ? '#ef4444' : '#3b82f6'
  return (
    <div className="toast" style={{ border:`1px solid ${col}30`, boxShadow:`0 8px 40px rgba(0,0,0,.5),0 0 20px ${col}15` }}>
      <div style={{ width:8, height:8, borderRadius:'50%', background:col, boxShadow:`0 0 8px ${col}`, flexShrink:0 }}/>
      <span style={{ fontSize:13, color:'var(--text)', flex:1 }}>{msg}</span>
      <button onClick={onClose} style={{ background:'none', border:'none', color:'var(--muted)', fontSize:18, cursor:'pointer', lineHeight:1 }}>×</button>
    </div>
  )
}

// ── MINI BAR CHART ────────────────────────────────────────────
export function MiniBars({ data, color }) {
  const max = Math.max(...data)
  const days = ['M','T','W','T','F','S','S']
  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap:8, height:80 }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:5 }}>
          <div style={{ flex:1, width:'100%', display:'flex', alignItems:'flex-end' }}>
            <div style={{ width:'100%', height:`${(v/max)*100}%`, minHeight:4, background:`linear-gradient(180deg,${color},${color}55)`, borderRadius:'3px 3px 0 0', boxShadow:`0 0 8px ${color}50` }}/>
          </div>
          <span style={{ fontSize:9, color:'var(--muted)', fontFamily:'var(--font-m)' }}>{days[i]}</span>
        </div>
      ))}
    </div>
  )
}
