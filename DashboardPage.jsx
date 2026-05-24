import { useState } from 'react'
import { SLabel, Divider, ProgressBar, Toast, MiniBars } from '../components/UI.jsx'
import { CAMPAIGNS } from '../data/data.js'

const TABS = ['Overview','Campaigns','Create Ad','Analytics','Notifications','Settings']

export default function DashboardPage({ go }) {
  const [tab, setTab] = useState('Overview')
  const [toast, setToast] = useState(null)

  return (
    <main style={{ paddingTop: 80 }}>
      <div className="container" style={{ paddingTop:32, paddingBottom:80 }}>

        {/* Page header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16, marginBottom:28 }}>
          <div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:'#fbbf24', letterSpacing:3, marginBottom:8 }}>ADVERTISER DASHBOARD</div>
            <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:'clamp(22px,3.5vw,36px)', fontWeight:900, color:'#fff' }}>
              Welcome back, <span className="gt">Edward Prince</span> 👋
            </h1>
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <button className="btn-outline" style={{ fontSize:13 }} onClick={() => setTab('Create Ad')}>+ New Campaign</button>
            <button className="btn-gold" style={{ fontSize:13 }} onClick={() => go('plans')}>⬆ Upgrade Plan</button>
          </div>
        </div>

        {/* Plan badge */}
        <div style={{ display:'inline-flex', alignItems:'center', gap:12, background:'linear-gradient(135deg,rgba(245,158,11,0.1),rgba(37,99,235,0.08))', border:'1px solid rgba(245,158,11,0.25)', borderRadius:12, padding:'12px 22px', marginBottom:32 }}>
          <img src="/logo.png" alt="" style={{ width:28, height:28, objectFit:'contain', borderRadius:'50%' }}/>
          <span style={{ fontFamily:"'Sora',sans-serif", fontSize:13, color:'#fbbf24', fontWeight:700 }}>PRO PLAN</span>
          <span style={{ color:'rgba(255,255,255,0.2)' }}>|</span>
          <span style={{ fontSize:13, color:'var(--text-2)' }}>Renews March 1, 2026</span>
          <span style={{ fontSize:11, color:'#10b981', fontFamily:"'JetBrains Mono',monospace", background:'rgba(16,185,129,0.1)', padding:'3px 10px', borderRadius:999 }}>● ACTIVE</span>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:4, flexWrap:'wrap', marginBottom:36, background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, padding:6 }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding:'10px 18px', borderRadius:10, border:'none',
              background: tab === t ? 'rgba(245,158,11,0.12)' : 'none',
              color: tab === t ? '#fbbf24' : 'var(--muted)',
              fontFamily:"'Sora',sans-serif", fontSize:13, fontWeight:600,
              cursor:'pointer', transition:'all .2s',
              borderBottom: tab === t ? '1px solid rgba(245,158,11,0.4)' : '1px solid transparent',
            }}>{t}</button>
          ))}
        </div>

        {tab === 'Overview'       && <DashOverview setTab={setTab} />}
        {tab === 'Campaigns'      && <DashCampaigns setToast={setToast} />}
        {tab === 'Create Ad'      && <DashCreateAd setToast={setToast} setTab={setTab} go={go} />}
        {tab === 'Analytics'      && <DashAnalytics />}
        {tab === 'Notifications'  && <DashNotifications />}
        {tab === 'Settings'       && <DashSettings setToast={setToast} />}
      </div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </main>
  )
}

function Card({ children, style = {} }) {
  return (
    <div style={{ background:'rgba(255,255,255,0.04)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:18, padding:24, ...style }}>
      {children}
    </div>
  )
}

function DashOverview({ setTab }) {
  const metrics = [
    { l:'Total Views',   v:'241,240', ch:'+18%', i:'👁',  c:'#fbbf24' },
    { l:'Total Clicks',  v:'28,720',  ch:'+12%', i:'🖱',  c:'#93c5fd' },
    { l:'Total Leads',   v:'2,690',   ch:'+34%', i:'🎯',  c:'#10b981' },
    { l:'Est. Revenue',  v:'$84.2K',  ch:'+22%', i:'💰',  c:'#fbbf24' },
  ]
  return (
    <div>
      {/* KPI cards */}
      <div className="grid-4" style={{ marginBottom:28 }}>
        {metrics.map(m => (
          <Card key={m.l} style={{ padding:24 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
              <span style={{ fontSize:28 }}>{m.i}</span>
              <span style={{ fontSize:11, color:'#10b981', background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.2)', borderRadius:999, padding:'3px 10px', fontFamily:"'JetBrains Mono',monospace" }}>{m.ch}</span>
            </div>
            <div style={{ fontFamily:"'Sora',sans-serif", fontSize:26, fontWeight:900, color:m.c, marginBottom:6 }}>{m.v}</div>
            <div style={{ fontSize:13, color:'var(--text-2)' }}>{m.l}</div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid-2" style={{ marginBottom:24 }}>
        <Card>
          <div style={{ fontFamily:"'Sora',sans-serif", fontSize:14, fontWeight:700, color:'#fff', marginBottom:20 }}>Views This Week</div>
          <MiniBars data={[40,65,45,80,55,90,75]} color="#fbbf24" />
        </Card>
        <Card>
          <div style={{ fontFamily:"'Sora',sans-serif", fontSize:14, fontWeight:700, color:'#fff', marginBottom:20 }}>Clicks This Week</div>
          <MiniBars data={[22,38,30,52,36,62,48]} color="#3b82f6" />
        </Card>
      </div>

      {/* Active campaigns */}
      <Card>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:22 }}>
          <div style={{ fontFamily:"'Sora',sans-serif", fontSize:15, fontWeight:700, color:'#fff' }}>Active Campaigns</div>
          <button onClick={() => setTab('Campaigns')} style={{ background:'none', border:'none', color:'#fbbf24', fontSize:13, cursor:'pointer', fontFamily:"'Sora',sans-serif", fontWeight:600 }}>View All →</button>
        </div>
        {CAMPAIGNS.filter(c => c.status === 'active').map(c => (
          <div key={c.id} style={{ marginBottom:22 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:9 }}>
              <span style={{ fontSize:14, color:'#fff', fontWeight:600, fontFamily:"'Sora',sans-serif" }}>{c.name}</span>
              <span style={{ fontSize:11, color:'#10b981', fontFamily:"'JetBrains Mono',monospace", background:'rgba(16,185,129,0.1)', padding:'2px 10px', borderRadius:999 }}>● LIVE</span>
            </div>
            <ProgressBar value={c.spent} max={c.budget} color="#fbbf24" label={`$${c.spent.toLocaleString()} / $${c.budget.toLocaleString()} budget`} />
            <div style={{ display:'flex', gap:20, marginTop:9, fontSize:12, color:'var(--muted)', fontFamily:"'JetBrains Mono',monospace" }}>
              <span>👁 {c.views.toLocaleString()} views</span>
              <span>🖱 {c.clicks.toLocaleString()} clicks</span>
              <span>🎯 {c.leads} leads</span>
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}

function DashCampaigns({ setToast }) {
  const [camps, setCamps] = useState(CAMPAIGNS)
  const stCol = { active:'#10b981', paused:'#f59e0b', completed:'#64748b' }
  const stLbl = { active:'● LIVE', paused:'⏸ PAUSED', completed:'✓ DONE' }

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:20 }}>
        <button className="btn-gold" style={{ fontSize:13 }}>+ New Campaign</button>
      </div>
      {camps.map(c => (
        <Card key={c.id} style={{ marginBottom:18 }}>
          <div style={{ display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:12, marginBottom:18 }}>
            <div>
              <div style={{ fontFamily:"'Sora',sans-serif", fontSize:15, fontWeight:700, color:'#fff', marginBottom:4 }}>{c.name}</div>
            </div>
            <div style={{ display:'flex', gap:10, alignItems:'center', flexWrap:'wrap' }}>
              <span style={{ fontSize:12, color:stCol[c.status], background:`${stCol[c.status]}15`, padding:'5px 12px', borderRadius:999, fontFamily:"'JetBrains Mono',monospace" }}>{stLbl[c.status]}</span>
              {c.status !== 'completed' && (
                <button
                  onClick={() => {
                    setCamps(cs => cs.map(x => x.id === c.id ? { ...x, status: x.status === 'active' ? 'paused' : 'active' } : x))
                    setToast({ msg:`✅ Campaign ${c.status === 'active' ? 'paused' : 'resumed'} successfully!`, type:'success' })
                  }}
                  style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'var(--text)', borderRadius:8, padding:'7px 16px', cursor:'pointer', fontSize:12, fontFamily:"'Sora',sans-serif" }}>
                  {c.status === 'active' ? 'Pause' : 'Resume'}
                </button>
              )}
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(100px,1fr))', gap:14, marginBottom:16 }}>
            {[
              { l:'Views',  v:c.views.toLocaleString(),  c:'#fbbf24' },
              { l:'Clicks', v:c.clicks.toLocaleString(), c:'#93c5fd' },
              { l:'Leads',  v:c.leads,                   c:'#10b981' },
              { l:'CTR',    v:`${((c.clicks/c.views)*100).toFixed(1)}%`, c:'#a78bfa' },
            ].map(s => (
              <div key={s.l} style={{ background:'rgba(255,255,255,0.04)', borderRadius:10, padding:14, textAlign:'center' }}>
                <div style={{ fontFamily:"'Sora',sans-serif", fontSize:18, fontWeight:800, color:s.c }}>{s.v}</div>
                <div style={{ fontSize:11, color:'var(--muted)', marginTop:4 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <ProgressBar value={c.spent} max={c.budget} color="#fbbf24" label={`Spent: $${c.spent.toLocaleString()} of $${c.budget.toLocaleString()}`} />
        </Card>
      ))}
    </div>
  )
}

function DashCreateAd({ setToast, setTab, go }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name:'', cat:'', tagline:'', desc:'', website:'', wa:'', plan:'Free' })
  const CATS = ['Technology','Fashion','Education','Food & Dining','Media','AI & Tech','Finance','Real Estate','Events','Healthcare']

  const fld = (l, k, t='text', ph) => (
    <div key={k}>
      <label style={{ fontSize:12, color:'var(--muted)', fontFamily:"'Sora',sans-serif", fontWeight:600, display:'block', marginBottom:8 }}>{l.toUpperCase()}</label>
      <input type={t} placeholder={ph||l} value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})}
        className="inp" style={{ borderRadius:10 }}/>
    </div>
  )

  return (
    <div style={{ maxWidth:680 }}>
      {/* Steps */}
      <div style={{ display:'flex', gap:6, marginBottom:36, alignItems:'center', flexWrap:'wrap' }}>
        {[1,2,3].map(s => (
          <div key={s} style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:32, height:32, borderRadius:'50%', background: step >= s ? 'linear-gradient(135deg,#f59e0b,#b45309)' : 'rgba(255,255,255,0.06)', border: step >= s ? 'none' : '1px solid rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Sora',sans-serif", fontSize:13, fontWeight:800, color: step >= s ? '#000' : 'var(--muted)' }}>{s}</div>
            <span style={{ fontSize:12, color: step >= s ? 'var(--text)' : 'var(--muted)', fontFamily:"'Sora',sans-serif" }}>{['Business Info','Ad Details','Review'][s-1]}</span>
            {s < 3 && <div style={{ width:32, height:1, background: step > s ? '#fbbf24' : 'rgba(255,255,255,0.1)', margin:'0 4px' }}/>}
          </div>
        ))}
      </div>

      <Card style={{ padding:32 }}>
        {step === 1 && (
          <div>
            <div style={{ fontFamily:"'Sora',sans-serif", fontSize:18, fontWeight:800, color:'#fff', marginBottom:24 }}>Business Information</div>
            <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
              {fld('Business Name','name','text','e.g. LaunchPad Global')}
              <div>
                <label style={{ fontSize:12, color:'var(--muted)', fontFamily:"'Sora',sans-serif", fontWeight:600, display:'block', marginBottom:8 }}>CATEGORY</label>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  {CATS.map(c => (
                    <button key={c} onClick={() => setForm({...form,cat:c})} style={{ background: form.cat===c ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)', border:`1px solid ${form.cat===c ? 'rgba(245,158,11,0.4)' : 'rgba(255,255,255,0.08)'}`, borderRadius:999, padding:'6px 14px', color: form.cat===c ? '#fbbf24' : 'var(--muted)', fontSize:12, cursor:'pointer', transition:'all .2s' }}>{c}</button>
                  ))}
                </div>
              </div>
              {fld('Website URL','website','url','https://yourbusiness.com')}
              {fld('WhatsApp Number','wa','tel','+1 234 567 8900')}
            </div>
            <div style={{ marginTop:28 }}>
              <button className="btn-gold" style={{ fontSize:13 }} onClick={() => setStep(2)}>Next: Ad Details →</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={{ fontFamily:"'Sora',sans-serif", fontSize:18, fontWeight:800, color:'#fff', marginBottom:24 }}>Ad Details</div>
            <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
              {fld('Tagline','tagline','text','e.g. The World\'s Leading Platform')}
              <div>
                <label style={{ fontSize:12, color:'var(--muted)', fontFamily:"'Sora',sans-serif", fontWeight:600, display:'block', marginBottom:8 }}>DESCRIPTION</label>
                <textarea value={form.desc} onChange={e => setForm({...form,desc:e.target.value})} rows={4} placeholder="Describe your business, products, or services in detail…"
                  className="inp" style={{ borderRadius:10, resize:'vertical' }}/>
              </div>
              <div>
                <label style={{ fontSize:12, color:'var(--muted)', fontFamily:"'Sora',sans-serif", fontWeight:600, display:'block', marginBottom:10 }}>AD PLAN</label>
                {['Free','Starter','Pro','Enterprise'].map(p => (
                  <label key={p} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0', cursor:'pointer', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
                    <input type="radio" name="plan" value={p} checked={form.plan===p} onChange={() => setForm({...form,plan:p})} style={{ accentColor:'#f59e0b', width:16, height:16 }}/>
                    <span style={{ fontSize:14, color: form.plan===p ? '#fbbf24' : 'var(--text)', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{p}</span>
                  </label>
                ))}
              </div>
            </div>
            <div style={{ display:'flex', gap:12, marginTop:28 }}>
              <button className="btn-ghost" style={{ fontSize:13 }} onClick={() => setStep(1)}>← Back</button>
              <button className="btn-gold" style={{ fontSize:13 }} onClick={() => setStep(3)}>Next: Review →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div style={{ fontFamily:"'Sora',sans-serif", fontSize:18, fontWeight:800, color:'#fff', marginBottom:24 }}>Review Your Ad</div>
            <div style={{ background:'rgba(245,158,11,0.05)', border:'1px solid rgba(245,158,11,0.18)', borderRadius:14, padding:24, marginBottom:24 }}>
              {[['Business',form.name||'—'],['Category',form.cat||'—'],['Tagline',form.tagline||'—'],['Website',form.website||'—'],['Plan',form.plan]].map(([k,v]) => (
                <div key={k} style={{ display:'flex', justifyContent:'space-between', borderBottom:'1px solid rgba(255,255,255,0.06)', padding:'11px 0', fontSize:14 }}>
                  <span style={{ color:'var(--muted)' }}>{k}</span>
                  <span style={{ color:'var(--text)', fontWeight:600 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ background:'rgba(59,130,246,0.06)', border:'1px solid rgba(59,130,246,0.2)', borderRadius:12, padding:'12px 16px', marginBottom:24, fontSize:13, color:'var(--text-2)' }}>
              ℹ️ Your ad will be reviewed within 24 hours before going live.
            </div>
            <div style={{ display:'flex', gap:12 }}>
              <button className="btn-ghost" style={{ fontSize:13 }} onClick={() => setStep(2)}>← Back</button>
              <button className="btn-gold" style={{ fontSize:13 }} onClick={() => { setToast({msg:'🚀 Ad submitted for review!',type:'success'}); setTimeout(()=>setTab('Campaigns'),1200) }}>
                🚀 Submit Ad
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

function DashAnalytics() {
  const wk = [{d:'Mon',v:1240,c:98},{d:'Tue',v:1890,c:152},{d:'Wed',v:1560,c:120},{d:'Thu',v:2400,c:210},{d:'Fri',v:1980,c:165},{d:'Sat',v:3100,c:280},{d:'Sun',v:2750,c:230}]
  const mv = Math.max(...wk.map(x=>x.v))
  return (
    <div>
      <div className="grid-4" style={{ marginBottom:24 }}>
        {[{l:'Avg CTR',v:'8.9%',c:'#fbbf24',i:'📊'},{l:'Conversion',v:'6.2%',c:'#93c5fd',i:'🎯'},{l:'Cost/Lead',v:'$12.40',c:'#10b981',i:'💸'},{l:'ROI',v:'340%',c:'#a78bfa',i:'📈'}].map(m=>(
          <Card key={m.l} style={{ padding:20, textAlign:'center' }}>
            <div style={{ fontSize:24, marginBottom:10 }}>{m.i}</div>
            <div style={{ fontFamily:"'Sora',sans-serif", fontSize:24, fontWeight:900, color:m.c }}>{m.v}</div>
            <div style={{ fontSize:12, color:'var(--text-2)', marginTop:6 }}>{m.l}</div>
          </Card>
        ))}
      </div>
      <Card style={{ marginBottom:22 }}>
        <div style={{ fontFamily:"'Sora',sans-serif", fontSize:15, fontWeight:700, color:'#fff', marginBottom:22 }}>Weekly Performance</div>
        <div style={{ display:'flex', alignItems:'flex-end', gap:12, height:160 }}>
          {wk.map(d => (
            <div key={d.d} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
              <div style={{ width:'100%', flex:1, display:'flex', flexDirection:'column', gap:3, justifyContent:'flex-end' }}>
                <div style={{ width:'100%', height:`${(d.c/mv)*140}px`, minHeight:4, background:'linear-gradient(180deg,#3b82f6,#3b82f644)', borderRadius:'3px 3px 0 0' }}/>
                <div style={{ width:'100%', height:`${(d.v/mv)*140}px`, minHeight:4, background:'linear-gradient(180deg,#fbbf24,#fbbf2444)', borderRadius:'3px 3px 0 0' }}/>
              </div>
              <span style={{ fontSize:9, color:'var(--muted)', fontFamily:"'JetBrains Mono',monospace" }}>{d.d.slice(0,3)}</span>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', gap:20, marginTop:16 }}>
          {[{c:'#fbbf24',l:'Views'},{c:'#3b82f6',l:'Clicks'}].map(x=>(
            <div key={x.l} style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:10,height:10,borderRadius:2,background:x.c }}/>
              <span style={{ fontSize:12, color:'var(--text-2)' }}>{x.l}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <div style={{ fontFamily:"'Sora',sans-serif", fontSize:15, fontWeight:700, color:'#fff', marginBottom:20 }}>Traffic Sources</div>
        {[{s:'Direct Search',p:38,c:'#fbbf24'},{s:'Homepage Feature',p:30,c:'#3b82f6'},{s:'Category Browse',p:20,c:'#10b981'},{s:'Referral',p:12,c:'#a78bfa'}].map(x=>(
          <div key={x.s} style={{ marginBottom:18 }}><ProgressBar value={x.p} max={100} color={x.c} label={x.s}/></div>
        ))}
      </Card>
    </div>
  )
}

function DashNotifications() {
  const notes = [
    {i:'🚀',t:'Campaign Now Live!',d:'Your Q1 Brand Awareness Campaign is live and receiving traffic.',time:'3 min ago',u:true,c:'#10b981'},
    {i:'🎯',t:'New Lead Captured',d:'A visitor clicked your contact button from search results.',time:'18 min ago',u:true,c:'#fbbf24'},
    {i:'📊',t:'Weekly Report Ready',d:'Your week 12 performance report is ready. Views up 18%.',time:'1 hr ago',u:true,c:'#3b82f6'},
    {i:'⭐',t:'Featured Slot Available',d:'A homepage featured slot just opened. Upgrade to claim it.',time:'4 hrs ago',u:false,c:'#f59e0b'},
    {i:'💬',t:'Ad Approved',d:'Your Product Launch campaign has been approved and is now live.',time:'1 day ago',u:false,c:'#10b981'},
    {i:'💰',t:'Payment Confirmed',d:'Your Pro plan was successfully renewed.',time:'3 days ago',u:false,c:'#fbbf24'},
  ]
  return (
    <div style={{ maxWidth:640 }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:20 }}>
        <span style={{ fontSize:13, color:'var(--muted)', fontFamily:"'JetBrains Mono',monospace" }}>{notes.filter(n=>n.u).length} UNREAD</span>
        <button style={{ background:'none', border:'none', color:'#fbbf24', cursor:'pointer', fontSize:13, fontFamily:"'Sora',sans-serif", fontWeight:600 }}>Mark All as Read</button>
      </div>
      {notes.map((n, i) => (
        <div key={i} style={{ display:'flex', gap:14, padding:'16px 18px', marginBottom:10, background: n.u ? 'rgba(245,158,11,0.04)' : 'rgba(255,255,255,0.02)', border:`1px solid ${n.u ? 'rgba(245,158,11,0.18)' : 'rgba(255,255,255,0.07)'}`, borderRadius:14, transition:'all .2s' }}
          onMouseEnter={e => e.currentTarget.style.borderColor='rgba(245,158,11,0.3)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = n.u ? 'rgba(245,158,11,0.18)' : 'rgba(255,255,255,0.07)'}>
          <div style={{ width:40, height:40, borderRadius:'50%', background:`${n.c}18`, border:`1px solid ${n.c}30`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>{n.i}</div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
              <span style={{ fontWeight:700, fontSize:14, color: n.u ? '#fff' : 'var(--text-2)', fontFamily:"'Sora',sans-serif" }}>{n.t}</span>
              {n.u && <div style={{ width:8, height:8, borderRadius:'50%', background:'#fbbf24', flexShrink:0, marginTop:5 }}/>}
            </div>
            <div style={{ fontSize:13, color:'var(--muted)', marginBottom:5 }}>{n.d}</div>
            <div style={{ fontSize:11, color:'var(--muted)', fontFamily:"'JetBrains Mono',monospace" }}>{n.time}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function DashSettings({ setToast }) {
  const [p, setP] = useState({ name:'Edward Prince', email:'edwardzethan792@gmail.com', phone:'+2347087806251', bio:'Founder & CEO of Rackyweb Global Media. Where Business Meets Innovation.' })
  const [n, setN] = useState({ leads:true, campaigns:true, reports:false, promotions:true })
  return (
    <div style={{ maxWidth:680 }}>
      <Card style={{ marginBottom:24 }}>
        <div style={{ fontFamily:"'Sora',sans-serif", fontSize:16, fontWeight:800, color:'#fff', marginBottom:22 }}>Profile Settings</div>
        <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
          {[['Full Name','name'],['Email Address','email'],['Phone Number','phone']].map(([l,k]) => (
            <div key={k}>
              <label style={{ fontSize:12, color:'var(--muted)', fontFamily:"'Sora',sans-serif", fontWeight:600, display:'block', marginBottom:8 }}>{l.toUpperCase()}</label>
              <input value={p[k]} onChange={e => setP({...p,[k]:e.target.value})} className="inp" style={{ borderRadius:10 }}/>
            </div>
          ))}
          <div>
            <label style={{ fontSize:12, color:'var(--muted)', fontFamily:"'Sora',sans-serif", fontWeight:600, display:'block', marginBottom:8 }}>BIO</label>
            <textarea value={p.bio} onChange={e => setP({...p,bio:e.target.value})} rows={3} className="inp" style={{ borderRadius:10, resize:'none' }}/>
          </div>
        </div>
        <div style={{ marginTop:24 }}>
          <button className="btn-gold" style={{ fontSize:13 }} onClick={() => setToast({msg:'✅ Profile saved successfully!',type:'success'})}>
            Save Changes
          </button>
        </div>
      </Card>
      <Card>
        <div style={{ fontFamily:"'Sora',sans-serif", fontSize:16, fontWeight:800, color:'#fff', marginBottom:22 }}>Notification Preferences</div>
        {[['leads','New Lead Notifications','When someone contacts you from your listing'],
          ['campaigns','Campaign Updates','Status changes, approvals, and expirations'],
          ['reports','Weekly Reports','Automated performance summaries every Monday'],
          ['promotions','Platform Promotions','Special offers, new features, and upgrades']].map(([k,title,desc]) => (
          <div key={k} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 0', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <div style={{ fontSize:14, fontWeight:600, color:'var(--text)', marginBottom:3, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{title}</div>
              <div style={{ fontSize:12, color:'var(--muted)' }}>{desc}</div>
            </div>
            <button onClick={() => setN({...n,[k]:!n[k]})} className="toggle"
              style={{ background: n[k] ? 'linear-gradient(90deg,#f59e0b,#b45309)' : 'rgba(255,255,255,0.1)' }}>
              <div className="knob" style={{ left: n[k] ? 23 : 3 }}/>
            </button>
          </div>
        ))}
      </Card>
    </div>
  )
}
