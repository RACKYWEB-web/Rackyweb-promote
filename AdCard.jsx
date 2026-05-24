import { useState } from 'react'

export default function AdCard({ ad, onClick }) {
  const [h, setH] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: h ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${h ? ad.color + '50' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 20,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all .32s cubic-bezier(.4,0,.2,1)',
        transform: h ? 'translateY(-6px)' : 'none',
        boxShadow: h ? `0 24px 60px rgba(0,0,0,0.5),0 0 30px ${ad.color}15` : '0 4px 24px rgba(0,0,0,0.3)',
      }}
    >
      {/* Banner */}
      <div style={{
        height: 110,
        background: `linear-gradient(135deg,${ad.color}20,${ad.color}08)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 46, position: 'relative',
        borderBottom: `1px solid ${ad.color}18`,
      }}>
        {ad.logo}
        {/* Badges */}
        <div style={{ position:'absolute', top:10, right:10, display:'flex', gap:6, flexWrap:'wrap', justifyContent:'flex-end' }}>
          {ad.featured && (
            <span style={{ background:'rgba(245,158,11,0.15)', border:'1px solid rgba(245,158,11,0.35)', borderRadius:999, padding:'3px 10px', fontSize:10, color:'#fbbf24', fontFamily:"'JetBrains Mono',monospace" }}>
              ⭐ FEATURED
            </span>
          )}
          {ad.trending && (
            <span style={{ background:'rgba(239,68,68,0.12)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:999, padding:'3px 10px', fontSize:10, color:'#fca5a5', fontFamily:"'JetBrains Mono',monospace" }}>
              🔥 TRENDING
            </span>
          )}
          {ad.verified && (
            <span style={{ background:'rgba(59,130,246,0.12)', border:'1px solid rgba(59,130,246,0.3)', borderRadius:999, padding:'3px 10px', fontSize:10, color:'#93c5fd', fontFamily:"'JetBrains Mono',monospace" }}>
              ✓ VERIFIED
            </span>
          )}
        </div>
        {/* Category corner */}
        <div style={{ position:'absolute', bottom:10, left:12 }}>
          <span style={{ background:`${ad.color}22`, border:`1px solid ${ad.color}35`, borderRadius:999, padding:'3px 10px', fontSize:10, color:ad.color, fontFamily:"'JetBrains Mono',monospace" }}>
            {ad.cat}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding:'18px 20px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
          <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:15, fontWeight:700, color:'#fff', lineHeight:1.2 }}>{ad.name}</h3>
          <span style={{ fontSize:12, color:'#fbbf24', fontFamily:"'JetBrains Mono',monospace", fontWeight:600, flexShrink:0, marginLeft:8 }}>{ad.price}</span>
        </div>
        <p style={{ fontSize:12, color:'#7a90b0', fontStyle:'italic', marginBottom:10 }}>{ad.tagline}</p>
        <p style={{ fontSize:13, color:'var(--text-2)', lineHeight:1.6, marginBottom:16 }}>{ad.desc.slice(0, 88)}…</p>

        {/* Stats */}
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--muted)', marginBottom:16, fontFamily:"'JetBrains Mono',monospace" }}>
          <span>👁 {ad.views.toLocaleString()} views</span>
          <span>🖱 {ad.clicks.toLocaleString()} clicks</span>
          <span>🌍 Global</span>
        </div>

        {/* Tags */}
        <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:16 }}>
          {ad.tags?.map(t => (
            <span key={t} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:999, padding:'2px 10px', fontSize:11, color:'var(--text-2)' }}>
              #{t}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{ display:'flex', gap:8 }}>
          <a
            href={`https://wa.me/${ad.wa}`} target="_blank" rel="noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              flex:1, padding:'9px 0', textAlign:'center',
              background:'rgba(37,211,102,0.08)', border:'1px solid rgba(37,211,102,0.3)',
              borderRadius:10, color:'#4ade80', fontSize:12,
              fontFamily:"'Sora',sans-serif", fontWeight:700, transition:'all .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(37,211,102,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background='rgba(37,211,102,0.08)'}
          >WhatsApp</a>
          <button
            style={{
              flex:1, padding:'9px 0',
              background:`${ad.color}12`, border:`1px solid ${ad.color}35`,
              borderRadius:10, color:ad.color, fontSize:12,
              fontFamily:"'Sora',sans-serif", fontWeight:700, transition:'all .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background=`${ad.color}22`}
            onMouseLeave={e => e.currentTarget.style.background=`${ad.color}12`}
          >View Details →</button>
        </div>
      </div>
    </div>
  )
}
