import { useState } from 'react'
import { Counter, Typewriter, SLabel, Divider, Logo } from '../components/UI.jsx'
import AdCard from '../components/AdCard.jsx'
import { STATS, ADS, EARN } from '../data/data.js'

export default function HomePage({ go }) {
  return (
    <main>
      <HeroSection go={go} />
      <StatsSection />
      <Divider />
      <FeaturedSection go={go} />
      <Divider />
      <EarnSection go={go} />
      <Divider />
      <TrustSection />
      <Divider />
      <CTABanner go={go} />
    </main>
  )
}

/* ── HERO ─────────────────────────────────────────────────── */
function HeroSection({ go }) {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
      padding: 'clamp(110px,15vh,160px) clamp(16px,5vw,80px) 80px',
      textAlign: 'center', overflow: 'hidden',
    }}>
      {/* Background mesh gradient */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none',
        background:'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(37,99,235,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 60%, rgba(245,158,11,0.08) 0%, transparent 60%), radial-gradient(ellipse 100% 80% at 50% 100%, rgba(37,99,235,0.06) 0%, transparent 70%)',
      }}/>
      {/* Subtle grid */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none',
        backgroundImage:'linear-gradient(rgba(245,158,11,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,0.03) 1px,transparent 1px)',
        backgroundSize:'80px 80px',
        maskImage:'radial-gradient(ellipse 85% 85% at 50% 50%,black 30%,transparent 100%)',
        WebkitMaskImage:'radial-gradient(ellipse 85% 85% at 50% 50%,black 30%,transparent 100%)',
      }}/>

      <div style={{ position:'relative', zIndex:1, maxWidth:980 }}>
        {/* Eyebrow */}
        <div style={{
          display:'inline-flex', alignItems:'center', gap:10,
          background:'rgba(245,158,11,0.08)', border:'1px solid rgba(245,158,11,0.2)',
          borderRadius:999, padding:'8px 22px', marginBottom:36,
          animation:'fadeUp .5s ease both',
        }}>
          <img src="/logo.png" alt="" style={{ width:24, height:24, objectFit:'contain', borderRadius:'50%' }}/>
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:'#fbbf24', letterSpacing:2 }}>
            RACKYWEB GLOBAL MEDIA — WHERE BUSINESS MEETS INNOVATION
          </span>
        </div>

        {/* Main headline */}
        <h1 style={{
          fontFamily:"'Sora',sans-serif",
          fontSize: 'clamp(38px,7.5vw,92px)',
          fontWeight: 900, lineHeight: 1.04, marginBottom: 20,
          animation: 'fadeUp .65s .1s ease both',
        }}>
          <span style={{ color:'#fff' }}>The World's #1</span>
          <br/>
          <Typewriter texts={['Ad Platform','Growth Engine','Brand Builder','Business Hub','Revenue Machine']} />
        </h1>

        {/* Tagline */}
        <p style={{
          fontFamily:"'Sora',sans-serif",
          fontSize: 'clamp(13px,2vw,20px)',
          fontWeight: 700, letterSpacing: 5, marginBottom: 20,
          background: 'linear-gradient(90deg,#3b82f6,#fbbf24,#f59e0b)',
          WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
          animation: 'fadeUp .65s .2s ease both',
        }}>
          PROMOTE &nbsp;·&nbsp; GROW &nbsp;·&nbsp; DOMINATE
        </p>

        <p style={{
          fontSize: 'clamp(15px,1.8vw,19px)',
          color: 'var(--text-2)', maxWidth: 640, margin: '0 auto 48px',
          lineHeight: 1.8, animation: 'fadeUp .65s .3s ease both',
        }}>
          The complete digital advertising ecosystem where businesses, creators, startups and professionals promote their brands to millions of engaged buyers worldwide.
        </p>

        {/* CTA Buttons */}
        <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap', animation:'fadeUp .65s .4s ease both' }}>
          <button className="btn-gold" style={{ fontSize:15, padding:'16px 38px' }} onClick={() => go('marketplace')}>
            📢 Start Advertising
          </button>
          <button className="btn-blue" style={{ fontSize:15, padding:'16px 38px' }} onClick={() => go('marketplace')}>
            🏢 Promote Your Business
          </button>
          <button className="btn-outline" style={{ fontSize:15, padding:'15px 32px' }} onClick={() => go('plans')}>
            ⭐ View Plans
          </button>
          <button className="btn-ghost" style={{ fontSize:15, padding:'15px 28px' }} onClick={() => go('marketplace')}>
            🔍 Explore Listings
          </button>
        </div>

        {/* Trust badges */}
        <div style={{ marginTop:52, display:'flex', gap:28, justifyContent:'center', flexWrap:'wrap', animation:'fadeUp .65s .55s ease both' }}>
          {['✓ Paystack Secured','✓ Flutterwave Ready','✓ SSL Encrypted','✓ GDPR Compliant'].map(t => (
            <span key={t} style={{ fontSize:12, color:'var(--muted)', fontFamily:"'JetBrains Mono',monospace" }}>
              <span style={{ color:'#fbbf24' }}>✓</span> {t.slice(2)}
            </span>
          ))}
        </div>
      </div>

      {/* Floating accent cards */}
      <FloatingCards />
    </section>
  )
}

function FloatingCards() {
  return (
    <>
      <div className="floating hide-mobile" style={{
        position:'absolute', left:'clamp(10px,3%,60px)', top:'36%',
        background:'linear-gradient(145deg,rgba(245,158,11,0.1),rgba(6,18,42,0.8))',
        backdropFilter:'blur(20px)', border:'1px solid rgba(245,158,11,0.2)',
        borderRadius:18, padding:'18px 22px', zIndex:0, minWidth:180,
        boxShadow:'0 8px 40px rgba(0,0,0,0.4)',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
          <img src="/logo.png" alt="" style={{ width:32, height:32, objectFit:'contain', borderRadius:'50%' }}/>
          <div>
            <div style={{ fontSize:12, fontWeight:700, color:'#fff', fontFamily:"'Sora',sans-serif" }}>RackyPromote</div>
            <div style={{ fontSize:10, color:'#fbbf24' }}>FEATURED</div>
          </div>
        </div>
        <div style={{ display:'flex', gap:16 }}>
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:15, fontWeight:800, color:'#fbbf24', fontFamily:"'Sora',sans-serif" }}>84.2K</div>
            <div style={{ fontSize:9, color:'var(--muted)' }}>VIEWS</div>
          </div>
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:15, fontWeight:800, color:'#93c5fd', fontFamily:"'Sora',sans-serif" }}>9.8K</div>
            <div style={{ fontSize:9, color:'var(--muted)' }}>CLICKS</div>
          </div>
        </div>
      </div>

      <div className="floating hide-mobile" style={{
        position:'absolute', right:'clamp(10px,3%,60px)', top:'30%',
        background:'linear-gradient(145deg,rgba(59,130,246,0.1),rgba(6,18,42,0.8))',
        backdropFilter:'blur(20px)', border:'1px solid rgba(59,130,246,0.25)',
        borderRadius:18, padding:'18px 22px', zIndex:0, minWidth:200,
        animationDelay:'1.2s', boxShadow:'0 8px 40px rgba(0,0,0,0.4)',
      }}>
        <div style={{ fontSize:11, color:'#93c5fd', fontFamily:"'JetBrains Mono',monospace", letterSpacing:1, marginBottom:10 }}>LIVE CAMPAIGN</div>
        <div style={{ fontSize:14, color:'#fff', fontWeight:700, marginBottom:12, lineHeight:1.3 }}>WorldStage Events 2025</div>
        <div style={{ height:5, background:'rgba(255,255,255,0.08)', borderRadius:3 }}>
          <div style={{ height:'100%', width:'74%', background:'linear-gradient(90deg,#3b82f6,#f59e0b)', borderRadius:3 }}/>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:8, fontSize:10, color:'var(--muted)', fontFamily:"'JetBrains Mono',monospace" }}>
          <span>74% to goal</span><span>6 days left</span>
        </div>
      </div>

      <div className="floating hide-mobile" style={{
        position:'absolute', bottom:'12%', left:'50%', transform:'translateX(-50%)',
        background:'rgba(245,158,11,0.06)', backdropFilter:'blur(20px)',
        border:'1px solid rgba(245,158,11,0.18)', borderRadius:999,
        padding:'11px 26px', display:'flex', alignItems:'center', gap:12, zIndex:0,
        whiteSpace:'nowrap', animationDelay:'.6s',
      }}>
        <div style={{ width:8, height:8, borderRadius:'50%', background:'#10b981', animation:'pulse 2s infinite' }}/>
        <span style={{ fontSize:12, color:'var(--text)', fontFamily:"'JetBrains Mono',monospace" }}>
          48,200+ businesses actively advertising right now
        </span>
      </div>
    </>
  )
}

/* ── STATS ────────────────────────────────────────────────── */
function StatsSection() {
  return (
    <section style={{ padding:'64px 0 72px' }}>
      <div className="container">
        <div className="grid-4">
          {STATS.map(s => (
            <div key={s.label} className="card card-blue" style={{ padding:'28px 24px', textAlign:'center' }}>
              <div style={{ fontSize:36, marginBottom:14 }}>{s.icon}</div>
              <div style={{
                fontFamily:"'Sora',sans-serif", fontSize:32, fontWeight:900,
                color: s.color, textShadow:`0 0 20px ${s.color}60`, marginBottom:8,
              }}>
                <Counter end={s.value} suffix={s.suffix}/>
              </div>
              <div style={{ fontSize:13, color:'var(--text-2)', fontFamily:"'JetBrains Mono',monospace", letterSpacing:.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── FEATURED ─────────────────────────────────────────────── */
function FeaturedSection({ go }) {
  return (
    <section className="section">
      <div className="container">
        <SLabel>FEATURED BUSINESSES</SLabel>
        <h2 className="s-title">Top Promoted <span className="gt">Brands</span></h2>
        <p className="s-sub" style={{ marginBottom:48 }}>Discover the world's most active and verified businesses on our premium advertising network.</p>
        <div className="grid-3">
          {ADS.filter(a => a.featured).map(ad => (
            <AdCard key={ad.id} ad={ad} onClick={() => {}} />
          ))}
        </div>
        <div style={{ textAlign:'center', marginTop:48 }}>
          <button className="btn-outline" onClick={() => go('marketplace')} style={{ fontSize:15 }}>
            View All Businesses →
          </button>
        </div>
      </div>
    </section>
  )
}

/* ── EARN / WHY ───────────────────────────────────────────── */
function EarnSection({ go }) {
  return (
    <section className="section" style={{ background:'rgba(245,158,11,0.015)' }}>
      <div className="container" style={{ textAlign:'center' }}>
        <SLabel>WHY RACKYWEB PROMOTE</SLabel>
        <h2 className="s-title">Grow Your Business <span className="gt">Exponentially</span></h2>
        <p className="s-sub" style={{ margin:'0 auto 56px' }}>Join 48,200+ businesses worldwide using Rackyweb Promote to reach millions of customers and generate measurable revenue.</p>

        <div className="grid-3" style={{ textAlign:'left' }}>
          {EARN.map((f, i) => (
            <div key={i} className="card" style={{ padding:28 }}>
              <div style={{
                width:54, height:54, borderRadius:14,
                background:`${f.color}15`, border:`1px solid ${f.color}25`,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:26, marginBottom:20,
              }}>{f.icon}</div>
              <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:16, fontWeight:700, color:'#fff', marginBottom:10 }}>{f.title}</h3>
              <p style={{ fontSize:13, color:'var(--text-2)', lineHeight:1.75, marginBottom:16 }}>{f.desc}</p>
              <span style={{
                display:'inline-block', padding:'5px 14px',
                background:`${f.color}12`, border:`1px solid ${f.color}28`,
                borderRadius:999, fontSize:11, color:f.color,
                fontFamily:"'JetBrains Mono',monospace",
              }}>{f.stat}</span>
            </div>
          ))}
        </div>

        {/* Big ROI */}
        <div style={{ marginTop:80 }}>
          <div style={{
            display:'inline-block',
            background:'linear-gradient(145deg,rgba(245,158,11,0.07),rgba(37,99,235,0.05))',
            border:'1px solid rgba(245,158,11,0.18)',
            borderRadius:28, padding:'clamp(32px,5vw,56px) clamp(32px,6vw,96px)',
          }}>
            <div style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(56px,9vw,110px)', fontWeight:900, lineHeight:1 }}>
              <span className="gt">340%</span>
            </div>
            <div style={{ fontFamily:"'Sora',sans-serif", fontSize:15, fontWeight:700, color:'#fff', letterSpacing:2, marginTop:10 }}>
              AVERAGE RETURN ON INVESTMENT
            </div>
            <div style={{ fontSize:13, color:'var(--text-2)', marginTop:8 }}>
              Based on 90-day campaign data across 500+ verified advertisers
            </div>
            <div style={{ marginTop:32 }}>
              <button className="btn-gold" style={{ fontSize:15, padding:'16px 40px' }} onClick={() => go('plans')}>
                Start Growing Today →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── TRUST LOGOS ─────────────────────────────────────────── */
function TrustSection() {
  const logos = ['Paystack','Flutterwave','Stripe','PayPal','Visa','Mastercard']
  return (
    <section style={{ padding:'48px 0' }}>
      <div className="container" style={{ textAlign:'center' }}>
        <div style={{ fontSize:12, color:'var(--muted)', fontFamily:"'JetBrains Mono',monospace", letterSpacing:3, marginBottom:28 }}>
          SECURE PAYMENTS POWERED BY
        </div>
        <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
          {[
            { name:'Paystack', icon:'💳', col:'#00c3f7' },
            { name:'Flutterwave', icon:'🦋', col:'#f5a623' },
            { name:'Stripe', icon:'💜', col:'#6772e5' },
            { name:'PayPal', icon:'🔵', col:'#009cde' },
          ].map(p => (
            <div key={p.name} style={{
              display:'flex', alignItems:'center', gap:10,
              background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)',
              borderRadius:12, padding:'12px 22px', transition:'all .2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${p.col}40`; e.currentTarget.style.background = `${p.col}08` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
            >
              <span style={{ fontSize:20 }}>{p.icon}</span>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:13, color:p.col, fontWeight:600 }}>{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── CTA BANNER ──────────────────────────────────────────── */
function CTABanner({ go }) {
  return (
    <section style={{ padding:'clamp(60px,8vw,100px) 0' }}>
      <div className="container">
        <div style={{
          background:'linear-gradient(135deg,rgba(37,99,235,0.12) 0%,rgba(245,158,11,0.1) 50%,rgba(37,99,235,0.08) 100%)',
          border:'1px solid rgba(245,158,11,0.18)',
          borderRadius:28, padding:'clamp(40px,6vw,72px)',
          textAlign:'center', position:'relative', overflow:'hidden',
        }}>
          <div style={{ position:'absolute', top:-60, right:-60, width:260, height:260, borderRadius:'50%', background:'radial-gradient(circle,rgba(245,158,11,0.15) 0%,transparent 70%)', pointerEvents:'none' }}/>
          <div style={{ position:'absolute', bottom:-60, left:-60, width:200, height:200, borderRadius:'50%', background:'radial-gradient(circle,rgba(37,99,235,0.12) 0%,transparent 70%)', pointerEvents:'none' }}/>

          <div style={{ position:'relative', zIndex:1 }}>
            {/* Logo centered */}
            <div style={{ display:'flex', justifyContent:'center', marginBottom:24 }}>
              <img src="/logo.png" alt="Rackyweb" style={{ width:72, height:72, objectFit:'contain', filter:'drop-shadow(0 0 20px rgba(245,158,11,0.5))' }}/>
            </div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:'#fbbf24', letterSpacing:3, marginBottom:18 }}>
              🔥 LIMITED TIME OFFER
            </div>
            <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(28px,5vw,52px)', fontWeight:900, color:'#fff', marginBottom:18, lineHeight:1.1 }}>
              Get Your First Month <span className="gt">FREE</span>
            </h2>
            <p style={{ fontSize:17, color:'var(--text-2)', marginBottom:40, maxWidth:500, margin:'0 auto 40px', lineHeight:1.75 }}>
              Start promoting your business today. No credit card required for the free plan. Upgrade anytime.
            </p>
            <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
              <button className="btn-gold" style={{ fontSize:15, padding:'16px 40px' }} onClick={() => go('plans')}>
                🚀 Claim Free Listing
              </button>
              <button className="btn-blue" style={{ fontSize:15, padding:'16px 36px' }} onClick={() => go('marketplace')}>
                Browse Marketplace
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
