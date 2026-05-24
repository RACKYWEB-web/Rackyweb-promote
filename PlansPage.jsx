import { useState } from 'react'
import { SLabel, Divider, Toast } from '../components/UI.jsx'
import { PLANS } from '../data/data.js'

export default function PlansPage({ go }) {
  const [billing, setBilling] = useState('monthly')
  const [modal, setModal] = useState(null)
  const [toast, setToast] = useState(null)

  return (
    <main style={{ paddingTop: 80 }}>
      <div className="container section">

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:60 }}>
          <SLabel>ADVERTISING PLANS</SLabel>
          <h1 className="s-title">Choose Your <span className="gt">Growth Plan</span></h1>
          <p className="s-sub" style={{ margin:'0 auto 32px' }}>
            From free listings to enterprise hero banners — transparent pricing, world-class results.
          </p>
          {/* Billing toggle */}
          <div style={{ display:'inline-flex', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:999, padding:5, gap:4 }}>
            {['monthly','yearly'].map(b => (
              <button key={b} onClick={() => setBilling(b)} style={{
                padding:'10px 28px', borderRadius:999, border:'none',
                background: billing === b ? 'linear-gradient(135deg,#f59e0b,#b45309)' : 'none',
                color: billing === b ? '#000' : 'var(--text-2)',
                fontFamily:"'Sora',sans-serif", fontSize:13, fontWeight:700, cursor:'pointer', transition:'all .25s',
              }}>
                {b.charAt(0).toUpperCase()+b.slice(1)}
                {b === 'yearly' && <span style={{ marginLeft:8, fontSize:10, background:'#10b981', color:'#fff', padding:'2px 8px', borderRadius:999 }}>Save 20%</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Plans Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:24, alignItems:'start', marginBottom:80 }}>
          {PLANS.map((plan, idx) => (
            <PlanCard key={plan.name} plan={plan} billing={billing} idx={idx}
              onSelect={() => {
                if (plan.name === 'Free') {
                  setToast({ msg:'🎉 Free plan selected! Setting up your account…', type:'success' })
                  setTimeout(() => go('dashboard'), 1400)
                } else {
                  setModal(plan)
                }
              }}
            />
          ))}
        </div>

        {/* Feature comparison */}
        <FeatureTable />

        {/* Payment logos */}
        <div style={{ textAlign:'center', marginTop:64 }}>
          <div style={{ fontSize:12, color:'var(--muted)', fontFamily:"'JetBrains Mono',monospace", letterSpacing:3, marginBottom:20 }}>
            SECURE PAYMENT METHODS
          </div>
          <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
            {[
              { name:'Paystack',   icon:'💳', col:'#00c3f7' },
              { name:'Flutterwave',icon:'🦋', col:'#f5a623' },
              { name:'Stripe',     icon:'💜', col:'#6772e5' },
              { name:'Bank Transfer',icon:'🏦',col:'#10b981' },
              { name:'USSD',       icon:'📱', col:'#fbbf24' },
            ].map(p => (
              <div key={p.name} style={{ display:'flex', alignItems:'center', gap:10, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:12, padding:'12px 20px' }}>
                <span style={{ fontSize:20 }}>{p.icon}</span>
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:p.col, fontWeight:600 }}>{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginTop:80 }}>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:28, fontWeight:800, color:'#fff', textAlign:'center', marginBottom:40 }}>
            Frequently Asked <span className="gt">Questions</span>
          </h2>
          <FAQ />
        </div>
      </div>

      {/* Payment Modal */}
      {modal && (
        <PayModal plan={modal} onClose={() => setModal(null)}
          onSuccess={() => {
            setModal(null)
            setToast({ msg:`✅ ${modal.name} plan activated! Welcome aboard!`, type:'success' })
            setTimeout(() => go('dashboard'), 1600)
          }}
        />
      )}

      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </main>
  )
}

function PlanCard({ plan, billing, idx, onSelect }) {
  const [h, setH] = useState(false)
  const price = billing === 'yearly' && plan.price !== '$0'
    ? '$' + Math.round(parseFloat(plan.price.replace('$','')) * 0.8)
    : plan.price

  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        background: plan.popular ? `linear-gradient(145deg,${plan.color}12,rgba(6,18,42,0.9))` : 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${h || plan.popular ? plan.color+'45' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 22, padding: 30,
        transition: 'all .32s cubic-bezier(.4,0,.2,1)',
        transform: plan.popular ? 'scale(1.03)' : h ? 'translateY(-5px)' : 'none',
        boxShadow: plan.popular ? `0 0 60px ${plan.glow},0 20px 60px rgba(0,0,0,0.4)` : h ? '0 20px 50px rgba(0,0,0,0.4)' : '0 4px 24px rgba(0,0,0,0.3)',
        position: 'relative',
        animation: `fadeUp .55s ${idx * 0.1}s ease both`,
      }}
    >
      {plan.popular && (
        <div style={{
          position:'absolute', top:-16, left:'50%', transform:'translateX(-50%)',
          background:'linear-gradient(135deg,#f59e0b,#b45309)',
          color:'#000', fontFamily:"'Sora',sans-serif", fontSize:11, fontWeight:800,
          letterSpacing:2, padding:'6px 22px', borderRadius:999, whiteSpace:'nowrap',
          boxShadow:'0 4px 16px rgba(245,158,11,0.4)',
        }}>{plan.badge}</div>
      )}

      {/* Plan header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:22 }}>
        <div>
          <div style={{ fontFamily:"'Sora',sans-serif", fontSize:18, fontWeight:900, color:'#fff', marginBottom:4 }}>
            {plan.name.toUpperCase()}
          </div>
          {!plan.popular && (
            <div style={{ fontSize:10, color:plan.color, fontFamily:"'JetBrains Mono',monospace", letterSpacing:1.5 }}>{plan.badge}</div>
          )}
        </div>
        <div style={{ width:44, height:44, borderRadius:12, background:`${plan.color}18`, border:`1px solid ${plan.color}30`, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ width:16, height:16, borderRadius:'50%', background:plan.color, boxShadow:`0 0 12px ${plan.color}` }}/>
        </div>
      </div>

      {/* Price */}
      <div style={{ marginBottom:8 }}>
        <span style={{ fontFamily:"'Sora',sans-serif", fontSize:38, fontWeight:900, color:plan.color }}>{price}</span>
        <span style={{ fontSize:14, color:'var(--muted)', marginLeft:6 }}>{plan.period}</span>
      </div>
      {billing === 'yearly' && plan.price !== '$0' && (
        <div style={{ fontSize:12, color:'#10b981', marginBottom:16, fontFamily:"'JetBrains Mono',monospace" }}>
          💰 Saving 20% — billed annually
        </div>
      )}

      <Divider />

      {/* Features */}
      <div style={{ margin:'20px 0 24px' }}>
        {plan.on.map(f => (
          <div key={f} style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:10 }}>
            <span style={{ color:plan.color, flexShrink:0, marginTop:2, fontSize:14 }}>✓</span>
            <span style={{ fontSize:13, color:'var(--text)', lineHeight:1.5 }}>{f}</span>
          </div>
        ))}
        {plan.off.map(f => (
          <div key={f} style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:10, opacity:.3 }}>
            <span style={{ color:'var(--muted)', flexShrink:0, marginTop:2, fontSize:14 }}>✗</span>
            <span style={{ fontSize:13, color:'var(--muted)', lineHeight:1.5, textDecoration:'line-through' }}>{f}</span>
          </div>
        ))}
      </div>

      <button onClick={onSelect} style={{
        width:'100%', padding:'14px 0',
        background: plan.popular ? `linear-gradient(135deg,${plan.color},${plan.color}cc)` : h ? `${plan.color}20` : `${plan.color}10`,
        border: `1px solid ${plan.popular ? 'transparent' : plan.color+'40'}`,
        borderRadius:12, color: plan.popular ? '#000' : plan.color,
        fontFamily:"'Sora',sans-serif", fontSize:13, fontWeight:800,
        cursor:'pointer', transition:'all .2s',
        boxShadow: plan.popular ? `0 0 24px ${plan.glow}` : 'none',
      }}>
        {plan.name === 'Free' ? 'Start Free →' : `Get ${plan.name} →`}
      </button>
    </div>
  )
}

function FeatureTable() {
  const rows = [
    { n:'Business Listings',   f:'1',     s:'5',         p:'20',      e:'Unlimited' },
    { n:'Analytics',           f:'✗',     s:'Basic',     p:'Full',    e:'Enterprise' },
    { n:'Featured Badge',      f:'✗',     s:'✓',         p:'✓',       e:'Gold ✓' },
    { n:'Homepage Placement',  f:'✗',     s:'✗',         p:'✓',       e:'Hero Banner' },
    { n:'AI Assistant',        f:'✗',     s:'✗',         p:'✓',       e:'Custom AI' },
    { n:'Verification',        f:'✗',     s:'✗',         p:'Silver',  e:'Gold' },
    { n:'Global Reach Boost',  f:'✗',     s:'✗',         p:'Standard',e:'Premium' },
    { n:'Support',             f:'Email', s:'Priority',  p:'24/7',    e:'Dedicated' },
    { n:'API Access',          f:'✗',     s:'✗',         p:'✗',       e:'✓' },
    { n:'White-label',         f:'✗',     s:'✗',         p:'✗',       e:'✓' },
  ]
  const cols = [
    { k:'f', n:'Free',       c:'#64748b' },
    { k:'s', n:'Starter',    c:'#3b82f6' },
    { k:'p', n:'Pro',        c:'#f59e0b' },
    { k:'e', n:'Enterprise', c:'#fbbf24' },
  ]
  return (
    <div>
      <h2 style={{ fontFamily:"'Sora',sans-serif", fontSize:28, fontWeight:800, color:'#fff', textAlign:'center', marginBottom:36 }}>
        Full Feature <span className="gt">Comparison</span>
      </h2>
      <div style={{ overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', background:'rgba(255,255,255,0.02)', borderRadius:18, overflow:'hidden' }}>
          <thead>
            <tr>
              <th style={{ padding:'16px 22px', textAlign:'left', borderBottom:'1px solid rgba(255,255,255,0.07)', fontFamily:"'Sora',sans-serif", fontSize:12, color:'var(--muted)', letterSpacing:1 }}>FEATURE</th>
              {cols.map(c => (
                <th key={c.k} style={{ padding:'16px 22px', textAlign:'center', borderBottom:'1px solid rgba(255,255,255,0.07)', fontFamily:"'Sora',sans-serif", fontSize:14, fontWeight:700, color:c.c }}>
                  {c.n}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.n} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
                <td style={{ padding:'14px 22px', fontSize:14, color:'var(--text)', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>{r.n}</td>
                {cols.map(c => (
                  <td key={c.k} style={{ padding:'14px 22px', textAlign:'center', fontSize:13, borderBottom:'1px solid rgba(255,255,255,0.05)', fontFamily:"'JetBrains Mono',monospace", color: r[c.k] === '✗' ? '#374151' : c.c }}>
                    {r[c.k]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function FAQ() {
  const [open, setOpen] = useState(null)
  const items = [
    { q:'Can I cancel my subscription at any time?', a:'Yes! Cancel anytime from your dashboard. Your listing stays active until the end of your billing period — no questions asked.' },
    { q:'How does featured placement work?', a:'Featured businesses appear at the top of search results and on the homepage carousel. Pro and Enterprise plans include homepage placement for maximum visibility.' },
    { q:'What payment methods do you accept?', a:'We accept all major credit/debit cards via Stripe, Paystack, and Flutterwave. We also support bank transfers, PayPal, and USSD payments.' },
    { q:'How long does ad approval take?', a:'Free and Starter ads are reviewed within 24 hours. Pro and Enterprise ads receive priority review within 2 hours.' },
    { q:'Can I upgrade or downgrade my plan?', a:'Absolutely. Upgrades apply immediately, downgrades take effect at the next billing cycle. You can switch plans anytime from your dashboard.' },
    { q:'Do you offer refunds?', a:'Yes, we offer a 7-day money-back guarantee on all paid plans if you\'re not completely satisfied.' },
  ]
  return (
    <div style={{ maxWidth:720, margin:'0 auto' }}>
      {items.map((item, i) => (
        <div key={i} style={{
          background: open === i ? 'rgba(245,158,11,0.05)' : 'rgba(255,255,255,0.03)',
          border: `1px solid ${open === i ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.08)'}`,
          borderRadius: 14, marginBottom:12, overflow:'hidden', transition:'all .25s',
        }}>
          <button onClick={() => setOpen(open === i ? null : i)} style={{
            width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center',
            padding:'18px 22px', background:'none', border:'none', cursor:'pointer', textAlign:'left',
          }}>
            <span style={{ fontSize:15, fontWeight:600, color: open === i ? '#fbbf24' : 'var(--text)', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{item.q}</span>
            <span style={{ color:'#fbbf24', fontSize:22, transition:'transform .25s', transform: open === i ? 'rotate(45deg)' : 'none', flexShrink:0, marginLeft:16 }}>+</span>
          </button>
          {open === i && (
            <div style={{ padding:'0 22px 20px', fontSize:14, color:'var(--text-2)', lineHeight:1.75, animation:'fadeUp .2s ease' }}>
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function PayModal({ plan, onClose, onSuccess }) {
  const [step, setStep] = useState(1)
  const [payer, setPayer] = useState('paystack')
  const [form, setForm] = useState({ name:'', email:'', phone:'', business:'' })

  return (
    <div style={{ position:'fixed', inset:0, zIndex:2000, background:'rgba(3,11,26,0.92)', backdropFilter:'blur(10px)', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background:'linear-gradient(160deg,#06122a,#0a1c3e)',
        border:`1px solid ${plan.color}30`,
        borderRadius:24, padding:'clamp(24px,4vw,44px)',
        width:'100%', maxWidth:480,
        boxShadow:`0 0 60px ${plan.glow},0 20px 60px rgba(0,0,0,0.7)`,
        animation:'fadeUp .3s ease',
      }}>
        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
          <div>
            <div style={{ fontFamily:"'Sora',sans-serif", fontSize:20, fontWeight:900, color:'#fff' }}>
              Subscribe to <span style={{ color:plan.color }}>{plan.name}</span>
            </div>
            <div style={{ fontSize:13, color:'var(--text-2)', marginTop:4 }}>{plan.price}/month · Cancel anytime</div>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'var(--muted)', fontSize:24, cursor:'pointer' }}>×</button>
        </div>

        {step === 1 && (
          <>
            <div style={{ display:'flex', flexDirection:'column', gap:16, marginBottom:24 }}>
              {[['Full Name','name','text'],['Email Address','email','email'],['Phone Number','phone','tel'],['Business Name','business','text']].map(([l,k,t]) => (
                <div key={k}>
                  <label style={{ fontSize:12, color:'var(--muted)', fontFamily:"'Sora',sans-serif", fontWeight:600, display:'block', marginBottom:7 }}>{l.toUpperCase()}</label>
                  <input type={t} placeholder={l} value={form[k]} onChange={e => setForm({ ...form, [k]:e.target.value })}
                    className="inp" style={{ borderRadius:10 }}/>
                </div>
              ))}
            </div>
            <button className="btn-gold" style={{ width:'100%', justifyContent:'center', fontSize:14 }} onClick={() => setStep(2)}>
              Continue to Payment →
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div style={{ marginBottom:22 }}>
              {[
                { id:'paystack',    name:'Paystack',    icon:'💳', col:'#00c3f7', desc:'Cards · Bank Transfer · USSD' },
                { id:'flutterwave', name:'Flutterwave', icon:'🦋', col:'#f5a623', desc:'Cards · Mobile Money · Bank' },
                { id:'stripe',      name:'Stripe',      icon:'💜', col:'#6772e5', desc:'Global Cards · Apple/Google Pay' },
              ].map(p => (
                <div key={p.id} onClick={() => setPayer(p.id)} style={{
                  display:'flex', alignItems:'center', gap:14, padding:'14px 18px',
                  background: payer === p.id ? `${p.col}12` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${payer === p.id ? p.col+'40' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius:14, cursor:'pointer', marginBottom:10, transition:'all .2s',
                }}>
                  <span style={{ fontSize:24 }}>{p.icon}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"'Sora',sans-serif", fontSize:14, fontWeight:700, color: payer === p.id ? p.col : '#fff' }}>{p.name}</div>
                    <div style={{ fontSize:11, color:'var(--muted)' }}>{p.desc}</div>
                  </div>
                  <div style={{ width:18, height:18, borderRadius:'50%', border:`2px solid ${payer === p.id ? p.col : '#374151'}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    {payer === p.id && <div style={{ width:8, height:8, borderRadius:'50%', background:p.col }}/>}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:12, padding:'14px 18px', marginBottom:20 }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'var(--text-2)', marginBottom:8 }}>
                <span>{plan.name} Plan (Monthly)</span><span>{plan.price}</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:16, fontWeight:700, color:'#fff', borderTop:'1px solid rgba(255,255,255,0.08)', paddingTop:10 }}>
                <span>Total Today</span><span style={{ color:'#fbbf24' }}>{plan.price}</span>
              </div>
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <button className="btn-ghost" onClick={() => setStep(1)} style={{ flex:1 }}>← Back</button>
              <button className="btn-gold" onClick={() => setStep(3)} style={{ flex:2, justifyContent:'center' }}>
                Pay {plan.price} →
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <div style={{ textAlign:'center', padding:'20px 0' }}>
            <div style={{ fontSize:64, marginBottom:18, animation:'float 3s ease-in-out infinite' }}>🎉</div>
            <h3 style={{ fontFamily:"'Sora',sans-serif", fontSize:24, fontWeight:900, color:'#fff', marginBottom:10 }}>
              Payment <span style={{ color:'#10b981' }}>Successful!</span>
            </h3>
            <p style={{ fontSize:14, color:'var(--text-2)', marginBottom:28, lineHeight:1.7 }}>
              Your {plan.name} plan is now active. Let's start building your brand!
            </p>
            <button className="btn-gold" style={{ fontSize:14 }} onClick={onSuccess}>
              Go to Dashboard →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
