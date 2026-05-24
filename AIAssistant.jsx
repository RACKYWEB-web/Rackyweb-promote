import { useState, useRef, useEffect } from 'react'

const REPLIES = [
  "Great question! For maximum visibility I'd recommend our Pro Plan — it includes homepage placement, AI insights, and priority ranking. Want me to walk you through it?",
  "Tell me your business name and niche and I'll craft a compelling ad description that converts visitors into customers!",
  "Businesses with direct WhatsApp integration see 3x more leads on average. I can help you optimize your listing right now.",
  "The winning ad formula is: Strong Hook + Clear Benefit + Urgency + Easy Contact. Want me to write a custom script for your business?",
  "Based on top-performing campaigns, adding a special offer or limited-time deal to your listing can boost clicks by up to 60%!",
  "Our global reach spans 60+ countries. If you're looking to scale internationally, the Enterprise plan gives you dedicated support and global placement.",
]
const CHIPS = ['Help me create an ad', 'Which plan is best?', 'How to boost visibility?', 'Write my ad description', 'Marketing strategy tips']

export default function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState([{ role:'bot', text:"👋 Hello! I'm RackyAI, your personal advertising assistant. I can help you create compelling ads, choose the right plan, and grow your business. What can I help you with today?" }])
  const [inp, setInp] = useState('')
  const [typing, setTyping] = useState(false)
  const btm = useRef(null)

  useEffect(() => {
    if (open && btm.current) btm.current.scrollIntoView({ behavior:'smooth' })
  }, [msgs, open])

  const send = async (text) => {
    const t = text || inp.trim()
    if (!t) return
    setInp('')
    setMsgs(m => [...m, { role:'user', text: t }])
    setTyping(true)
    await new Promise(r => setTimeout(r, 700 + Math.random() * 800))
    setTyping(false)
    setMsgs(m => [...m, { role:'bot', text: REPLIES[Math.floor(Math.random() * REPLIES.length)] }])
  }

  return (
    <>
      {/* Chat Window */}
      <div style={{
        position:'fixed', bottom:90, right:20, zIndex:990,
        width:'min(360px,calc(100vw - 40px))',
        maxHeight: open ? 500 : 0,
        overflow:'hidden',
        background:'linear-gradient(160deg,#06122a,#0a1c3e)',
        backdropFilter:'blur(24px)',
        border:'1px solid rgba(245,158,11,0.25)',
        borderRadius:20,
        boxShadow:'0 0 60px rgba(245,158,11,0.1),0 20px 60px rgba(0,0,0,0.7)',
        transition:'max-height .4s cubic-bezier(.4,0,.2,1)',
        display:'flex', flexDirection:'column',
      }}>
        {/* Header */}
        <div style={{ padding:'14px 18px', borderBottom:'1px solid rgba(245,158,11,0.12)', display:'flex', alignItems:'center', gap:12, flexShrink:0 }}>
          <div style={{
            width:40, height:40, borderRadius:'50%',
            background:'linear-gradient(135deg,#f59e0b,#b45309)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:18, boxShadow:'0 0 16px rgba(245,158,11,0.5)',
            animation:'glow 3s ease-in-out infinite',
          }}>🤖</div>
          <div>
            <div style={{ fontFamily:"'Sora',sans-serif", fontSize:13, fontWeight:700, color:'#fff' }}>RackyAI Assistant</div>
            <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:2 }}>
              <div style={{ width:5, height:5, borderRadius:'50%', background:'#10b981', animation:'pulse 2s infinite' }}/>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:'#10b981', letterSpacing:1 }}>ONLINE · POWERED BY AI</span>
            </div>
          </div>
          <button onClick={() => setOpen(false)} style={{ marginLeft:'auto', background:'none', border:'none', color:'var(--muted)', fontSize:20, cursor:'pointer', lineHeight:1 }}>×</button>
        </div>

        {/* Messages */}
        <div style={{ flex:1, overflowY:'auto', padding:'14px 14px 8px' }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display:'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', marginBottom:12 }}>
              <div style={{
                maxWidth:'84%',
                background: m.role === 'user' ? 'linear-gradient(135deg,rgba(245,158,11,0.2),rgba(245,158,11,0.1))' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${m.role === 'user' ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                padding:'10px 14px', fontSize:13, lineHeight:1.65, color:'#dde6f5',
              }}>
                {m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div style={{ display:'flex', gap:5, padding:'8px 14px' }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width:7, height:7, borderRadius:'50%', background:'#f59e0b', animation:`pulse 1.2s ${i*.2}s infinite` }}/>
              ))}
            </div>
          )}
          <div ref={btm}/>
        </div>

        {/* Quick chips */}
        <div style={{ padding:'6px 10px', display:'flex', gap:6, overflowX:'auto', flexShrink:0 }}>
          {CHIPS.map(s => (
            <button key={s} onClick={() => send(s)} style={{
              background:'rgba(245,158,11,0.08)', border:'1px solid rgba(245,158,11,0.2)',
              borderRadius:999, padding:'5px 12px', color:'#fbbf24',
              fontSize:10, fontFamily:"'JetBrains Mono',monospace", cursor:'pointer', whiteSpace:'nowrap',
              transition:'all .2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(245,158,11,0.15)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(245,158,11,0.08)'}
            >{s}</button>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding:'10px 14px', borderTop:'1px solid rgba(255,255,255,0.05)', display:'flex', gap:8, flexShrink:0 }}>
          <input
            className="inp"
            placeholder="Ask me anything about advertising…"
            value={inp}
            onChange={e => setInp(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            style={{ borderRadius:10, fontSize:13, padding:'10px 14px', background:'rgba(255,255,255,0.05)' }}
          />
          <button onClick={() => send()} style={{
            width:42, height:42, background:'linear-gradient(135deg,#f59e0b,#b45309)',
            border:'none', borderRadius:10, cursor:'pointer', fontSize:16,
            display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
            boxShadow:'0 0 14px rgba(245,158,11,0.4)', transition:'transform .2s',
          }}
            onMouseEnter={e => e.currentTarget.style.transform='scale(1.08)'}
            onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
          >➤</button>
        </div>
      </div>

      {/* FAB Button */}
      <button onClick={() => setOpen(!open)} style={{
        position:'fixed', bottom:22, right:20, zIndex:991,
        width:58, height:58, borderRadius:'50%',
        background: open ? 'linear-gradient(135deg,#ef4444,#b91c1c)' : 'linear-gradient(135deg,#f59e0b,#b45309)',
        border:'none', cursor:'pointer', fontSize:24,
        display:'flex', alignItems:'center', justifyContent:'center',
        boxShadow: open ? '0 0 28px rgba(239,68,68,0.5)' : '0 0 28px rgba(245,158,11,0.55)',
        transition:'all .3s',
        animation: !open ? 'glow 3s ease-in-out infinite' : 'none',
      }}>
        {open ? '✕' : '🤖'}
      </button>

      {/* Pulse ring */}
      {!open && (
        <div style={{
          position:'fixed', bottom:22, right:20, zIndex:990,
          width:58, height:58, borderRadius:'50%',
          border:'2px solid rgba(245,158,11,0.5)',
          animation:'ringOut 2s ease-out infinite',
          pointerEvents:'none',
        }}/>
      )}
    </>
  )
}
