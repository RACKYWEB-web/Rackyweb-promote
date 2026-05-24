import { useState } from 'react'
import { Logo, Divider } from './UI.jsx'

export default function Footer({ go }) {
  const [email, setEmail] = useState('')
  const [subbed, setSubbed] = useState(false)

  const cols = [
    ['Platform', ['Home','Marketplace','Plans','Dashboard','Blog','About']],
    ['Company',  ['About Us','Careers','Press Kit','Partners','Contact']],
    ['Resources',['Help Center','API Docs','Status','Changelog']],
    ['Legal',    ['Privacy Policy','Terms of Service','Cookie Policy','Ad Policy']],
  ]

  return (
    <footer style={{ background:'#020915', borderTop:'1px solid rgba(245,158,11,0.08)', position:'relative', overflow:'hidden' }}>
      {/* Top glow line */}
      <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:700, height:1, background:'linear-gradient(90deg,transparent,rgba(245,158,11,0.4),rgba(59,130,246,0.3),transparent)' }}/>

      <div className="container">
        {/* Newsletter strip */}
        <div style={{
          padding:'60px 0 48px',
          display:'flex', flexWrap:'wrap', gap:32, alignItems:'center', justifyContent:'space-between',
          borderBottom:'1px solid rgba(255,255,255,0.06)',
        }}>
          <div>
            <div style={{ fontFamily:"'Sora',sans-serif", fontSize:22, fontWeight:800, color:'#fff', marginBottom:8 }}>
              Join <span className="gt">75,000+</span> Business Leaders
            </div>
            <p style={{ color:'var(--text-2)', fontSize:14 }}>Weekly growth insights, platform updates, and exclusive offers.</p>
          </div>
          {subbed ? (
            <div style={{ color:'#fbbf24', fontFamily:"'JetBrains Mono',monospace", fontSize:13 }}>
              ✓ Subscribed! Welcome to the community 🚀
            </div>
          ) : (
            <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              <input
                className="inp"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ minWidth:240, borderRadius:999, padding:'12px 22px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(245,158,11,0.2)' }}
              />
              <button className="btn-gold" onClick={() => email && setSubbed(true)} style={{ borderRadius:999 }}>
                Subscribe →
              </button>
            </div>
          )}
        </div>

        {/* Main footer grid */}
        <div style={{ padding:'52px 0', display:'grid', gridTemplateColumns:'1.8fr repeat(4,1fr)', gap:32, flexWrap:'wrap' }}>
          {/* Brand column */}
          <div>
            <div onClick={() => go('home')} style={{ cursor:'pointer', marginBottom:18 }}>
              <Logo size={52} showText={true} />
            </div>
            <p style={{ fontSize:13, color:'var(--text-2)', lineHeight:1.75, marginBottom:22, maxWidth:240 }}>
              The world's most powerful digital advertising and business promotion ecosystem. Where Business Meets Innovation.
            </p>
            {/* Social Icons */}
            <div style={{ display:'flex', gap:8 }}>
              {[['𝕏','#1DA1F2'],['f','#1877F2'],['in','#0A66C2'],['▶','#FF0000'],['📷','#E1306C']].map(([s, col]) => (
                <a key={s} href="#" style={{
                  width:34, height:34, borderRadius:8,
                  background:'rgba(255,255,255,0.05)',
                  border:'1px solid rgba(255,255,255,0.08)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:13, color:'var(--text-2)', transition:'all .2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${col}40`; e.currentTarget.style.color = col; e.currentTarget.style.background = `${col}15` }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--text-2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                >{s}</a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map(([heading, items]) => (
            <div key={heading}>
              <div style={{ fontFamily:"'Sora',sans-serif", fontSize:11, fontWeight:700, color:'#fbbf24', letterSpacing:2, marginBottom:20 }}>
                {heading.toUpperCase()}
              </div>
              {items.map(item => (
                <a key={item} href="#"
                  style={{ display:'block', fontSize:13, color:'var(--muted)', marginBottom:12, transition:'color .2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fbbf24'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                >{item}</a>
              ))}
            </div>
          ))}
        </div>

        <Divider />

        {/* Bottom bar */}
        <div style={{ padding:'24px 0', display:'flex', flexWrap:'wrap', gap:16, alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ fontSize:12, color:'var(--muted)' }}>
            © 2025 <span style={{ color:'#fbbf24' }}>Rackyweb Global Media</span>. All rights reserved. Powered by Edward Prince.
          </div>
          <div style={{ display:'flex', gap:20, flexWrap:'wrap' }}>
            {[
              ['💬 WhatsApp', 'https://wa.me/2347087806251'],
              ['✉️ Email', 'mailto:edwardzethan792@gmail.com'],
              ['🌐 Portfolio', 'https://rackyweb-web.github.io/RACKYWEB-About-me/'],
            ].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                style={{ fontSize:12, color:'var(--muted)', transition:'color .2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fbbf24'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
              >{label}</a>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:7 }}>
            <div style={{ width:7, height:7, borderRadius:'50%', background:'#10b981', animation:'pulse 2s infinite' }}/>
            <span style={{ fontSize:11, color:'var(--muted)', fontFamily:"'JetBrains Mono',monospace" }}>ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
