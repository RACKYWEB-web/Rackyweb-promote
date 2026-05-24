import { useState, useMemo } from 'react'
import { SLabel, Divider } from '../components/UI.jsx'
import AdCard from '../components/AdCard.jsx'
import { ADS, CATEGORIES } from '../data/data.js'

export default function MarketplacePage({ go }) {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')
  const [sort, setSort] = useState('Popular')
  const [grid, setGrid] = useState(true)
  const [sel, setSel] = useState(null)

  const filtered = useMemo(() => {
    let arr = [...ADS]
    if (cat !== 'All') arr = arr.filter(a => a.cat === cat)
    if (search) arr = arr.filter(a =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.desc.toLowerCase().includes(search.toLowerCase()) ||
      a.cat.toLowerCase().includes(search.toLowerCase())
    )
    if (sort === 'Popular') arr.sort((a, b) => b.views - a.views)
    if (sort === 'Trending') arr.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0))
    if (sort === 'Featured') arr.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    return arr
  }, [search, cat, sort])

  if (sel) return <AdDetail ad={sel} onBack={() => setSel(null)} go={go} />

  return (
    <main style={{ paddingTop: 80 }}>
      <div className="container section">

        {/* Header */}
        <SLabel>GLOBAL MARKETPLACE</SLabel>
        <h1 className="s-title">Discover World-Class <span className="gt">Businesses</span></h1>
        <p className="s-sub" style={{ marginBottom: 40 }}>
          Browsing {filtered.length} active listings across {CATEGORIES.length - 1} categories worldwide.
        </p>

        {/* Search */}
        <div style={{ position:'relative', marginBottom:28 }}>
          <input
            className="inp"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="🔍   Search businesses, products, services, categories…"
            style={{ borderRadius:999, padding:'16px 52px 16px 24px', fontSize:15, border:'1px solid rgba(245,158,11,0.25)', background:'rgba(255,255,255,0.05)' }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ position:'absolute', right:18, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'var(--muted)', fontSize:20, cursor:'pointer' }}>×</button>
          )}
        </div>

        {/* Filters */}
        <div style={{ display:'flex', gap:12, flexWrap:'wrap', alignItems:'center', marginBottom:32 }}>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap', flex:1 }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{
                background: cat === c ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${cat === c ? 'rgba(245,158,11,0.4)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 999, padding:'5px 16px',
                color: cat === c ? '#fbbf24' : 'var(--muted)',
                fontSize:13, cursor:'pointer', transition:'all .2s', fontFamily:"'Plus Jakarta Sans',sans-serif",
              }}>{c}</button>
            ))}
          </div>
          <div style={{ display:'flex', gap:8, flexShrink:0 }}>
            {['Popular','Trending','Featured'].map(s => (
              <button key={s} onClick={() => setSort(s)} style={{
                background: sort === s ? 'rgba(59,130,246,0.12)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${sort === s ? 'rgba(59,130,246,0.35)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 8, padding:'7px 16px',
                color: sort === s ? '#93c5fd' : 'var(--muted)',
                fontSize:12, cursor:'pointer', fontFamily:"'JetBrains Mono',monospace",
              }}>{s}</button>
            ))}
            <div style={{ display:'flex', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, overflow:'hidden' }}>
              {['⊞','☰'].map((ic, i) => (
                <button key={i} onClick={() => setGrid(i === 0)} style={{
                  padding:'7px 14px', background: grid === (i === 0) ? 'rgba(245,158,11,0.12)' : 'none',
                  border:'none', color: grid === (i === 0) ? '#fbbf24' : 'var(--muted)', cursor:'pointer', fontSize:16,
                }}>{ic}</button>
              ))}
            </div>
          </div>
        </div>

        <Divider />
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', margin:'20px 0' }}>
          <span style={{ fontSize:12, color:'var(--muted)', fontFamily:"'JetBrains Mono',monospace" }}>
            {filtered.length} RESULTS FOUND
          </span>
          <button className="btn-gold" style={{ fontSize:13, padding:'10px 24px' }} onClick={() => go('dashboard')}>
            + Post Your Ad
          </button>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:'80px 0' }}>
            <div style={{ fontSize:56, marginBottom:16 }}>🔍</div>
            <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:22, color:'#fff', marginBottom:8 }}>No results found</h3>
            <p style={{ color:'var(--text-2)' }}>Try adjusting your search or category filter.</p>
          </div>
        ) : grid ? (
          <div className="grid-3">
            {filtered.map(ad => <AdCard key={ad.id} ad={ad} onClick={() => setSel(ad)} />)}
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {filtered.map(ad => <AdListRow key={ad.id} ad={ad} onClick={() => setSel(ad)} />)}
          </div>
        )}
      </div>
    </main>
  )
}

function AdListRow({ ad, onClick }) {
  const [h, setH] = useState(false)
  return (
    <div onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display:'flex', gap:18, padding:'20px 24px', background: h ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)', border:`1px solid ${h ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.08)'}`, borderRadius:16, cursor:'pointer', alignItems:'center', transition:'all .25s', transform: h ? 'translateY(-2px)' : 'none' }}>
      <div style={{ width:68, height:68, borderRadius:14, background:`${ad.color}18`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:32, flexShrink:0, border:`1px solid ${ad.color}25` }}>
        {ad.logo}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap', marginBottom:4 }}>
          <span style={{ fontFamily:"'Sora',sans-serif", fontSize:15, fontWeight:700, color:'#fff' }}>{ad.name}</span>
          {ad.verified && <span style={{ fontSize:10, color:'#93c5fd', background:'rgba(59,130,246,0.12)', border:'1px solid rgba(59,130,246,0.3)', borderRadius:999, padding:'2px 8px', fontFamily:"'JetBrains Mono',monospace" }}>✓ VERIFIED</span>}
          {ad.featured && <span style={{ fontSize:10, color:'#fbbf24', background:'rgba(245,158,11,0.12)', border:'1px solid rgba(245,158,11,0.3)', borderRadius:999, padding:'2px 8px', fontFamily:"'JetBrains Mono',monospace" }}>⭐ FEATURED</span>}
        </div>
        <p style={{ fontSize:13, color:'var(--text-2)', marginBottom:8 }}>{ad.desc.slice(0, 120)}…</p>
        <div style={{ display:'flex', gap:12, fontSize:12, color:'var(--muted)', fontFamily:"'JetBrains Mono',monospace" }}>
          <span style={{ background:`${ad.color}18`, border:`1px solid ${ad.color}30`, borderRadius:999, padding:'2px 10px', color:ad.color }}>{ad.cat}</span>
          <span>👁 {ad.views.toLocaleString()}</span>
          <span>🖱 {ad.clicks.toLocaleString()}</span>
          <span>🌍 Global</span>
        </div>
      </div>
      <div style={{ flexShrink:0, textAlign:'right' }}>
        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:13, color:'#fbbf24', fontWeight:700, marginBottom:10 }}>{ad.price}</div>
        <button className="btn-outline" style={{ fontSize:12, padding:'8px 18px' }}>View →</button>
      </div>
    </div>
  )
}

function AdDetail({ ad, onBack, go }) {
  return (
    <main style={{ paddingTop: 100 }}>
      <div className="container" style={{ maxWidth: 960, paddingBottom: 80 }}>
        <button onClick={onBack} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'var(--text-2)', borderRadius:10, padding:'10px 20px', cursor:'pointer', fontSize:14, marginBottom:36, display:'flex', alignItems:'center', gap:8 }}>
          ← Back to Marketplace
        </button>

        <div style={{ background:`linear-gradient(145deg,${ad.color}12,rgba(6,18,42,0.8))`, border:`1px solid ${ad.color}25`, borderRadius:24, overflow:'hidden' }}>
          <div style={{ height:220, display:'flex', alignItems:'center', justifyContent:'center', fontSize:90, background:`linear-gradient(135deg,${ad.color}18,transparent)` }}>
            {ad.logo}
          </div>
          <div style={{ padding:'clamp(24px,4vw,48px)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:16, marginBottom:22 }}>
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:12, flexWrap:'wrap', marginBottom:10 }}>
                  <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(22px,3vw,32px)', fontWeight:900, color:'#fff' }}>{ad.name}</h1>
                  {ad.verified && <span style={{ fontSize:11, color:'#93c5fd', background:'rgba(59,130,246,0.12)', border:'1px solid rgba(59,130,246,0.3)', borderRadius:999, padding:'4px 12px' }}>✓ VERIFIED</span>}
                  {ad.featured && <span style={{ fontSize:11, color:'#fbbf24', background:'rgba(245,158,11,0.12)', border:'1px solid rgba(245,158,11,0.3)', borderRadius:999, padding:'4px 12px' }}>⭐ FEATURED</span>}
                </div>
                <p style={{ fontSize:16, color:ad.color, fontStyle:'italic', marginBottom:12 }}>{ad.tagline}</p>
                <span style={{ background:`${ad.color}18`, border:`1px solid ${ad.color}30`, borderRadius:999, padding:'4px 14px', fontSize:12, color:ad.color, fontFamily:"'JetBrains Mono',monospace" }}>{ad.cat}</span>
              </div>
              <div style={{ fontFamily:"'Sora',sans-serif", fontSize:28, fontWeight:900, color:'#fbbf24' }}>{ad.price}</div>
            </div>
            <p style={{ fontSize:16, color:'var(--text-2)', lineHeight:1.85, marginBottom:36 }}>{ad.desc}</p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))', gap:16, marginBottom:32 }}>
              {[
                { l:'Views',    v:ad.views.toLocaleString(),  i:'👁',  c:'#fbbf24' },
                { l:'Clicks',   v:ad.clicks.toLocaleString(), i:'🖱',  c:'#93c5fd' },
                { l:'Reach',    v:'Global',                   i:'🌍',  c:'#10b981' },
                { l:'Category', v:ad.cat,                     i:'📂',  c:'#8b5cf6' },
              ].map(s => (
                <div key={s.l} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:14, padding:18, textAlign:'center' }}>
                  <div style={{ fontSize:22, marginBottom:8 }}>{s.i}</div>
                  <div style={{ fontFamily:"'Sora',sans-serif", fontSize:15, fontWeight:800, color:s.c }}>{s.v}</div>
                  <div style={{ fontSize:11, color:'var(--muted)', marginTop:4 }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
              <a href={`https://wa.me/${ad.wa}`} target="_blank" rel="noreferrer">
                <button className="btn-gold" style={{ fontSize:14 }}>💬 WhatsApp Contact</button>
              </a>
              <button className="btn-blue" style={{ fontSize:14 }}>🌐 Visit Website</button>
              <button className="btn-ghost" style={{ fontSize:14 }} onClick={() => go('plans')}>⭐ Boost This Ad</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
