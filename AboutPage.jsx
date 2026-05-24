import { useState } from 'react'
import { SLabel, Divider, Toast } from '../components/UI.jsx'
import { TEAM } from '../data/data.js'

export default function AboutPage({ go }) {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [sent, setSent] = useState(false)
  const [toast, setToast] = useState(null)

  const handleSend = () => {
    if (!form.name || !form.email || !form.message) {
      setToast({ msg:'⚠️ Please fill in all required fields.', type:'warning' })
      return
    }
    setSent(true)
  }

  return (
    <main style={{ paddingTop: 80 }}>
      <div className="container">

        {/* ── HERO ── */}
        <section className="section" style={{ paddingBottom:60 }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:64, alignItems:'center' }}>
            <div>
              <SLabel>OUR STORY</SLabel>
              <h1 className="s-title">Built to Make Businesses <span className="gt">Unstoppable</span></h1>
              <p style={{ fontSize:16, color:'var(--text-2)', lineHeight:1.85, marginBottom:28 }}>
                Rackyweb Global Media was founded on a single belief: every business deserves world-class advertising infrastructure. We built Rackyweb Promote to give businesses of all sizes the tools, visibility, and audience they need to grow exponentially in the digital age.
              </p>
              <p style={{ fontSize:15, color:'var(--text-2)', lineHeight:1.85, marginBottom:36 }}>
                From a solo entrepreneur's first listing to a Fortune 500 enterprise campaign — we power growth at every scale, in every market, for every industry.
              </p>
              <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
                <button className="btn-gold" style={{ fontSize:14 }} onClick={() => go('plans')}>Start Advertising</button>
                <a href="https://wa.me/2347087806251" target="_blank" rel="noreferrer">
                  <button className="btn-outline" style={{ fontSize:14 }}>WhatsApp Us</button>
                </a>
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 }}>
              {[
                { v:'2021', l:'Founded', i:'🗓', c:'#fbbf24' },
                { v:'48K+', l:'Advertisers', i:'📢', c:'#3b82f6' },
                { v:'4.2M', l:'Monthly Visitors', i:'👁', c:'#fbbf24' },
                { v:'$2B+', l:'Revenue Generated', i:'💰', c:'#10b981' },
              ].map(s => (
                <div key={s.l} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:18, padding:'26px 20px', textAlign:'center', transition:'all .25s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(245,158,11,0.3)'; e.currentTarget.style.background='rgba(245,158,11,0.05)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; e.currentTarget.style.background='rgba(255,255,255,0.04)' }}>
                  <div style={{ fontSize:30, marginBottom:10 }}>{s.i}</div>
                  <div style={{ fontFamily:"'Sora',sans-serif", fontSize:26, fontWeight:900, color:s.c, marginBottom:6 }}>{s.v}</div>
                  <div style={{ fontSize:12, color:'var(--text-2)' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ── MISSION & VALUES ── */}
        <section className="section">
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <SLabel>MISSION & VALUES</SLabel>
            <h2 className="s-title">What We <span className="gt">Stand For</span></h2>
          </div>
          <div className="grid-3">
            {[
              { i:'🚀', t:'Innovation First',       d:'We constantly push boundaries — AI-powered tools, smart targeting, and cutting-edge ad formats that keep our advertisers ahead of the curve.',      c:'#fbbf24' },
              { i:'🤝', t:'Client Success',          d:'Every feature we build is designed with one goal: helping businesses attract more customers, generate more leads, and grow sustainable revenue.',      c:'#3b82f6' },
              { i:'🔒', t:'Trust & Transparency',    d:'Real-time analytics, honest pricing, and verified business badges ensure our platform is one you can build your entire brand strategy around.',      c:'#10b981' },
              { i:'🌍', t:'Global Reach',            d:'We serve businesses across 60+ countries. Our platform is built for global realities — multiple currencies, languages, and market segments.',          c:'#fbbf24' },
              { i:'💡', t:'AI-Powered Intelligence', d:'Artificial intelligence is woven into every layer of our platform — from campaign optimization to predictive analytics to content generation.',          c:'#a78bfa' },
              { i:'📈', t:'Results Obsessed',        d:'We measure our success by yours. Our advertiser average 340% ROI within 90 days, and we\'re relentlessly focused on improving that number.',           c:'#fbbf24' },
            ].map((v, i) => (
              <div key={i} className="card" style={{ padding:28 }}>
                <div style={{ width:54, height:54, borderRadius:14, background:`${v.c}15`, border:`1px solid ${v.c}25`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, marginBottom:20 }}>{v.i}</div>
                <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:16, fontWeight:700, color:'#fff', marginBottom:12 }}>{v.t}</h3>
                <p style={{ fontSize:13, color:'var(--text-2)', lineHeight:1.75 }}>{v.d}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── TEAM ── */}
        <section className="section">
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <SLabel>LEADERSHIP TEAM</SLabel>
            <h2 className="s-title">Meet the <span className="gt">Builders</span></h2>
            <p className="s-sub" style={{ margin:'0 auto' }}>
              A world-class team of entrepreneurs, engineers, and marketers united by one mission.
            </p>
          </div>

          {/* Featured founder card */}
          <div style={{
            background:'linear-gradient(145deg,rgba(245,158,11,0.1),rgba(37,99,235,0.06))',
            border:'1px solid rgba(245,158,11,0.25)', borderRadius:24,
            padding:'clamp(32px,5vw,56px)', marginBottom:32,
            display:'flex', gap:40, flexWrap:'wrap', alignItems:'center',
          }}>
            <div style={{ textAlign:'center' }}>
              <img src="/logo.png" alt="Edward Prince" style={{ width:110, height:110, objectFit:'contain', borderRadius:'50%', border:'3px solid rgba(245,158,11,0.4)', boxShadow:'0 0 30px rgba(245,158,11,0.3)', marginBottom:14 }}/>
              <div style={{ fontFamily:"'Sora',sans-serif", fontSize:16, fontWeight:800, color:'#fff' }}>Edward Prince</div>
              <div style={{ fontSize:11, color:'#fbbf24', fontFamily:"'JetBrains Mono',monospace", letterSpacing:1.5, marginTop:4 }}>FOUNDER & CEO</div>
            </div>
            <div style={{ flex:1, minWidth:260 }}>
              <div style={{ fontFamily:"'Sora',sans-serif", fontSize:22, fontWeight:800, color:'#fff', marginBottom:14 }}>
                "Where Business Meets <span className="gt">Innovation</span>"
              </div>
              <p style={{ fontSize:15, color:'var(--text-2)', lineHeight:1.85, marginBottom:20 }}>
                Edward Prince founded Rackyweb Global Media with a vision to democratize access to world-class digital advertising. With years of experience in digital marketing, branding, and business development, he built Rackyweb Promote into the global platform it is today — empowering businesses of all sizes to grow, scale, and dominate their markets.
              </p>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <a href="https://wa.me/2347087806251" target="_blank" rel="noreferrer">
                  <button className="btn-gold" style={{ fontSize:13 }}>💬 WhatsApp</button>
                </a>
                <a href="mailto:edwardzethan792@gmail.com">
                  <button className="btn-outline" style={{ fontSize:13 }}>✉️ Email</button>
                </a>
                <a href="https://rackyweb-web.github.io/RACKYWEB-About-me/" target="_blank" rel="noreferrer">
                  <button className="btn-ghost" style={{ fontSize:13 }}>🌐 Portfolio</button>
                </a>
              </div>
            </div>
          </div>

          {/* Team grid */}
          <div className="grid-4">
            {TEAM.slice(1).map(m => (
              <div key={m.name} className="card" style={{ padding:28, textAlign:'center' }}>
                <div style={{ width:72, height:72, borderRadius:'50%', margin:'0 auto 16px', background:`linear-gradient(135deg,${m.color}25,${m.color}08)`, border:`2px solid ${m.color}40`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:32 }}>{m.emoji}</div>
                <div style={{ fontFamily:"'Sora',sans-serif", fontSize:14, fontWeight:800, color:'#fff', marginBottom:5 }}>{m.name}</div>
                <div style={{ fontSize:10, color:m.color, fontFamily:"'JetBrains Mono',monospace", letterSpacing:1.5, marginBottom:14 }}>{m.role}</div>
                <p style={{ fontSize:12, color:'var(--text-2)', lineHeight:1.65 }}>{m.bio}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── CONTACT ── */}
        <section className="section" style={{ paddingBottom:80 }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:56, alignItems:'start' }}>

            {/* Contact Info */}
            <div>
              <SLabel>GET IN TOUCH</SLabel>
              <h2 className="s-title">Let's Build <span className="gt">Together</span></h2>
              <p style={{ fontSize:15, color:'var(--text-2)', lineHeight:1.85, marginBottom:32 }}>
                Ready to grow your business? Have questions about our platform? Looking for partnership opportunities? We'd love to hear from you.
              </p>

              <div style={{ display:'flex', flexDirection:'column', gap:14, marginBottom:36 }}>
                {[
                  { i:'💬', l:'WhatsApp',  v:'+2347087806251',                      href:'https://wa.me/2347087806251',                              c:'#25D366' },
                  { i:'✉️', l:'Email',     v:'edwardzethan792@gmail.com',            href:'mailto:edwardzethan792@gmail.com',                          c:'#fbbf24' },
                  { i:'🌐', l:'Portfolio', v:'rackyweb-web.github.io',               href:'https://rackyweb-web.github.io/RACKYWEB-About-me/',          c:'#3b82f6' },
                  { i:'🤝', l:'Partnership','Let\'s build the future together',       href:'mailto:edwardzethan792@gmail.com?subject=Partnership',       c:'#a78bfa' },
                ].map(ct => (
                  <a key={ct.l} href={ct.href} target={ct.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                    style={{ display:'flex', alignItems:'center', gap:16, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:14, padding:'16px 20px', transition:'all .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor=`${ct.c}40`; e.currentTarget.style.background=`${ct.c}08` }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; e.currentTarget.style.background='rgba(255,255,255,0.04)' }}>
                    <span style={{ fontSize:24, flexShrink:0 }}>{ct.i}</span>
                    <div>
                      <div style={{ fontSize:11, color:'var(--muted)', fontFamily:"'JetBrains Mono',monospace", letterSpacing:1.5, marginBottom:3 }}>{ct.l.toUpperCase()}</div>
                      <div style={{ fontSize:14, color:ct.c, fontWeight:600, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{ct.v}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Partnership callout */}
              <div style={{ background:'linear-gradient(145deg,rgba(245,158,11,0.08),rgba(37,99,235,0.05))', border:'1px solid rgba(245,158,11,0.2)', borderRadius:16, padding:'22px 24px', display:'flex', alignItems:'center', gap:14 }}>
                <span style={{ fontSize:28 }}>🤝</span>
                <div>
                  <div style={{ fontFamily:"'Sora',sans-serif", fontSize:15, fontWeight:700, color:'#fbbf24', marginBottom:4 }}>Open for Partnership</div>
                  <div style={{ fontSize:13, color:'var(--text-2)' }}>Let's build the future together.</div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div style={{ background:'rgba(255,255,255,0.04)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:22, padding:'clamp(24px,4vw,40px)' }}>
              <div style={{ fontFamily:"'Sora',sans-serif", fontSize:18, fontWeight:800, color:'#fff', marginBottom:28 }}>
                Send a Message
              </div>
              {sent ? (
                <div style={{ textAlign:'center', padding:'32px 0' }}>
                  <div style={{ fontSize:60, marginBottom:18, animation:'float 3s ease-in-out infinite' }}>🎉</div>
                  <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:22, fontWeight:900, color:'#fff', marginBottom:10 }}>Message Sent!</h3>
                  <p style={{ color:'var(--text-2)', fontSize:14, marginBottom:28, lineHeight:1.7 }}>
                    Thank you for reaching out! We'll get back to you within 24 hours.
                  </p>
                  <button className="btn-outline" style={{ fontSize:13 }} onClick={() => setSent(false)}>Send Another</button>
                </div>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
                  {[['Full Name *','name','text'],['Email Address *','email','email'],['Subject','subject','text']].map(([l,k,t]) => (
                    <div key={k}>
                      <label style={{ fontSize:12, color:'var(--muted)', fontFamily:"'Sora',sans-serif", fontWeight:600, display:'block', marginBottom:8 }}>{l.toUpperCase()}</label>
                      <input type={t} placeholder={l.replace(' *','')} value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})}
                        className="inp" style={{ borderRadius:10 }}/>
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize:12, color:'var(--muted)', fontFamily:"'Sora',sans-serif", fontWeight:600, display:'block', marginBottom:8 }}>MESSAGE *</label>
                    <textarea rows={5} placeholder="Tell us about your business or project…" value={form.message} onChange={e => setForm({...form,message:e.target.value})}
                      className="inp" style={{ borderRadius:10, resize:'vertical' }}/>
                  </div>
                  <button className="btn-gold" style={{ fontSize:14, marginTop:4, justifyContent:'center' }} onClick={handleSend}>
                    Send Message →
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

      </div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </main>
  )
}
