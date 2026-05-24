import { useState } from 'react'
import { SLabel, Divider } from '../components/UI.jsx'
import { POSTS } from '../data/data.js'

const BCATS = ['All','Strategy','AI & Tech','Case Study','Growth','Industry','SEO']

export default function BlogPage() {
  const [cat, setCat] = useState('All')
  const [sel, setSel] = useState(null)
  const filtered = cat === 'All' ? POSTS : POSTS.filter(p => p.cat === cat)

  if (sel) return <ArticleView post={sel} onBack={() => setSel(null)} />

  return (
    <main style={{ paddingTop: 80 }}>
      <div className="container section">
        <SLabel>INSIGHTS & RESOURCES</SLabel>
        <h1 className="s-title">Marketing <span className="gt">Intelligence</span></h1>
        <p className="s-sub" style={{ marginBottom: 40 }}>
          Stay ahead with proven advertising strategies, industry insights, and growth stories from top brands worldwide.
        </p>

        {/* Category Filter */}
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:44 }}>
          {BCATS.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              background: cat === c ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${cat === c ? 'rgba(245,158,11,0.4)' : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 999, padding:'7px 18px',
              color: cat === c ? '#fbbf24' : 'var(--muted)',
              fontSize: 13, cursor:'pointer', transition:'all .2s',
              fontFamily:"'Plus Jakarta Sans',sans-serif",
            }}>{c}</button>
          ))}
        </div>

        {/* Featured Post */}
        {filtered[0] && (
          <div onClick={() => setSel(filtered[0])} style={{
            background: 'linear-gradient(145deg,rgba(245,158,11,0.08),rgba(37,99,235,0.05))',
            border: '1px solid rgba(245,158,11,0.18)',
            borderRadius: 24, padding:'clamp(28px,4vw,52px)',
            cursor:'pointer', marginBottom:44, transition:'all .3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(245,158,11,0.4)'; e.currentTarget.style.transform='translateY(-3px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(245,158,11,0.18)'; e.currentTarget.style.transform='none' }}>
            <div style={{ display:'flex', gap:32, flexWrap:'wrap', alignItems:'center' }}>
              <div style={{ fontSize:72, flexShrink:0 }}>{filtered[0].emoji}</div>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', gap:10, marginBottom:14, flexWrap:'wrap' }}>
                  <span style={{ background:'rgba(245,158,11,0.12)', border:'1px solid rgba(245,158,11,0.3)', borderRadius:999, padding:'4px 14px', fontSize:11, color:'#fbbf24', fontFamily:"'JetBrains Mono',monospace" }}>{filtered[0].cat}</span>
                  <span style={{ background:'rgba(59,130,246,0.1)', border:'1px solid rgba(59,130,246,0.25)', borderRadius:999, padding:'4px 14px', fontSize:11, color:'#93c5fd', fontFamily:"'JetBrains Mono',monospace" }}>FEATURED</span>
                </div>
                <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(18px,3vw,28px)', fontWeight:800, color:'#fff', marginBottom:14, lineHeight:1.25 }}>
                  {filtered[0].title}
                </h2>
                <p style={{ fontSize:15, color:'var(--text-2)', lineHeight:1.75, marginBottom:18, maxWidth:620 }}>
                  {filtered[0].excerpt}
                </p>
                <div style={{ display:'flex', gap:20, fontSize:12, color:'var(--muted)', fontFamily:"'JetBrains Mono',monospace", flexWrap:'wrap' }}>
                  <span>📅 {filtered[0].date}</span>
                  <span>⏱ {filtered[0].rt} read</span>
                  <span>👁 {filtered[0].views.toLocaleString()} views</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Post Grid */}
        <div className="grid-3">
          {filtered.slice(1).map(post => (
            <PostCard key={post.id} post={post} onClick={() => setSel(post)} />
          ))}
        </div>

        {/* Newsletter CTA */}
        <div style={{ marginTop:72, textAlign:'center' }}>
          <div style={{
            display:'inline-block', background:'linear-gradient(145deg,rgba(245,158,11,0.07),rgba(37,99,235,0.05))',
            border:'1px solid rgba(245,158,11,0.2)', borderRadius:24,
            padding:'clamp(36px,5vw,56px) clamp(36px,6vw,80px)',
          }}>
            <div style={{ fontSize:44, marginBottom:16 }}>📩</div>
            <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:24, fontWeight:900, color:'#fff', marginBottom:10 }}>
              Get Weekly <span className="gt">Growth Insights</span>
            </h3>
            <p style={{ fontSize:14, color:'var(--text-2)', marginBottom:28, maxWidth:380 }}>
              Join 75,000+ business leaders getting actionable marketing insights every week.
            </p>
            <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
              <input className="inp" placeholder="your@email.com"
                style={{ maxWidth:260, borderRadius:999, padding:'12px 22px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(245,158,11,0.2)' }}/>
              <button className="btn-gold" style={{ borderRadius:999, fontSize:14 }}>Subscribe Free →</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function PostCard({ post, onClick }) {
  const [h, setH] = useState(false)
  return (
    <div onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        background: h ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${h ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 20, overflow:'hidden', cursor:'pointer',
        transition:'all .3s cubic-bezier(.4,0,.2,1)',
        transform: h ? 'translateY(-6px)' : 'none',
        boxShadow: h ? '0 20px 50px rgba(0,0,0,0.4),0 0 20px rgba(245,158,11,0.06)' : 'none',
      }}>
      <div style={{ height:130, background:'linear-gradient(135deg,rgba(245,158,11,0.08),rgba(37,99,235,0.06))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:56, borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        {post.emoji}
      </div>
      <div style={{ padding:'20px 22px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
          <span style={{ background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.25)', borderRadius:999, padding:'3px 12px', fontSize:11, color:'#fbbf24', fontFamily:"'JetBrains Mono',monospace" }}>{post.cat}</span>
          <span style={{ fontSize:11, color:'var(--muted)', fontFamily:"'JetBrains Mono',monospace" }}>{post.rt} read</span>
        </div>
        <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:15, fontWeight:700, color:'#fff', marginBottom:10, lineHeight:1.4 }}>{post.title}</h3>
        <p style={{ fontSize:13, color:'var(--text-2)', lineHeight:1.65, marginBottom:16 }}>{post.excerpt.slice(0,95)}…</p>
        <Divider />
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:14, fontSize:11, color:'var(--muted)', fontFamily:"'JetBrains Mono',monospace" }}>
          <span>📅 {post.date}</span>
          <span>👁 {post.views.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

function ArticleView({ post, onBack }) {
  const related = POSTS.filter(p => p.id !== post.id).slice(0, 3)
  return (
    <main style={{ paddingTop: 100 }}>
      <div className="container" style={{ maxWidth:820, paddingBottom:80 }}>
        <button onClick={onBack} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'var(--text-2)', borderRadius:10, padding:'10px 20px', cursor:'pointer', fontSize:14, marginBottom:40, display:'flex', alignItems:'center', gap:8 }}>
          ← Back to Blog
        </button>
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <div style={{ fontSize:80, marginBottom:22 }}>{post.emoji}</div>
          <span style={{ background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.25)', borderRadius:999, padding:'5px 16px', fontSize:12, color:'#fbbf24', fontFamily:"'JetBrains Mono',monospace", display:'inline-block', marginBottom:18 }}>{post.cat}</span>
          <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(22px,4vw,38px)', fontWeight:900, color:'#fff', lineHeight:1.2, marginBottom:20 }}>{post.title}</h1>
          <div style={{ display:'flex', gap:24, justifyContent:'center', fontSize:12, color:'var(--muted)', fontFamily:"'JetBrains Mono',monospace", flexWrap:'wrap' }}>
            <span>📅 {post.date}</span>
            <span>⏱ {post.rt} read</span>
            <span>👁 {post.views.toLocaleString()} views</span>
          </div>
        </div>

        <Divider />

        <div style={{ marginTop:44, fontSize:16, color:'var(--text-2)', lineHeight:1.95 }}>
          <p style={{ marginBottom:24, fontSize:18, color:'var(--text)', lineHeight:1.8 }}>{post.excerpt}</p>

          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:22, fontWeight:800, color:'#fff', margin:'36px 0 16px' }}>Why This Matters for Your Business</h2>
          <p style={{ marginBottom:22 }}>The global digital advertising market is experiencing unprecedented growth, projected to reach $870 billion by 2027. Businesses that invest strategically in digital advertising today are positioning themselves for exponential growth tomorrow. The gap between brands that advertise effectively online and those that don't is widening every single day.</p>

          <div style={{ background:'linear-gradient(145deg,rgba(245,158,11,0.08),rgba(37,99,235,0.05))', border:'1px solid rgba(245,158,11,0.2)', borderRadius:16, padding:'22px 28px', margin:'32px 0' }}>
            <div style={{ fontFamily:"'Sora',sans-serif", fontSize:13, fontWeight:700, color:'#fbbf24', marginBottom:10, letterSpacing:1 }}>💡 PRO INSIGHT</div>
            <p style={{ margin:0, color:'var(--text)', lineHeight:1.75 }}>Businesses that combine a strong Rackyweb Promote listing with direct WhatsApp and website integration see an average of 8x more qualified leads compared to single-channel approaches alone.</p>
          </div>

          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:22, fontWeight:800, color:'#fff', margin:'36px 0 16px' }}>Key Strategies to Implement Today</h2>
          {[
            'Prioritize mobile-first advertising — over 70% of global internet users browse primarily on mobile devices.',
            'Leverage direct messaging channels like WhatsApp alongside your digital ads for maximum conversion.',
            'Invest in short-form video content: it generates 3× more engagement than static image campaigns.',
            'Use real-time analytics to continuously optimize your campaigns — data-driven decisions outperform gut feelings by 5x.',
            'Build a multi-channel presence: brands visible on 3+ channels see 80% higher customer retention rates.',
          ].map((s, i) => (
            <div key={i} style={{ display:'flex', gap:14, marginBottom:16 }}>
              <span style={{ color:'#fbbf24', flexShrink:0, fontSize:18, marginTop:1 }}>→</span>
              <span style={{ lineHeight:1.75 }}>{s}</span>
            </div>
          ))}

          <p style={{ marginTop:28 }}>The businesses thriving today are the ones that started building their digital presence yesterday. With Rackyweb Promote, you get the platform, the tools, the audience, and the support to make your brand impossible to ignore. Start your journey today.</p>
        </div>

        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginTop:40 }}>
          {['Digital Marketing','Business Growth','Advertising','ROI','Strategy'].map(t => (
            <span key={t} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', padding:'5px 14px', borderRadius:999, fontSize:12, color:'var(--text-2)' }}>#{t}</span>
          ))}
        </div>

        <div style={{ margin:'52px 0' }}><Divider /></div>

        <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:22, fontWeight:800, color:'#fff', marginBottom:28 }}>Related Articles</h3>
        <div className="grid-3">
          {related.map(p => <PostCard key={p.id} post={p} onClick={() => {}} />)}
        </div>
      </div>
    </main>
  )
}
