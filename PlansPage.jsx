// ═══════════════════════════════════════════════
//  RACKYWEB PROMOTE — PLANS / PRICING PAGE
// ═══════════════════════════════════════════════
import { useState } from 'react';
import { SectionHeader, GlassCard, NeonDivider, Toast } from '../components/UI';
import { PLANS } from '../data/data';

export default function PlansPage({ setPage }) {
  const [billing, setBilling] = useState('monthly'); // monthly | yearly
  const [toast,   setToast]   = useState(null);
  const [modal,   setModal]   = useState(null);

  const handleSelect = (plan) => {
    if (plan.name === 'Free') {
      setToast({ msg: '🎉 Free plan selected! Redirecting to dashboard...', type: 'success' });
      setTimeout(() => setPage('dashboard'), 1500);
    } else {
      setModal(plan);
    }
  };

  return (
    <main style={{ position: 'relative', zIndex: 1, paddingTop: 80 }}>
      <div className="container section">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <SectionHeader
            label="ADVERTISING PLANS"
            title={<>Choose Your <span className="gradient-text">Growth Plan</span></>}
            sub="From free listings to enterprise hero banners — we have a plan for every business size and budget."
            center
          />

          {/* Billing Toggle */}
          <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 50, padding: 4, gap: 4, marginTop: 8 }}>
            {['monthly', 'yearly'].map(b => (
              <button key={b} onClick={() => setBilling(b)} style={{
                padding: '9px 24px', borderRadius: 50, border: 'none',
                background: billing === b ? 'linear-gradient(135deg, #00f0ff, #8b5cf6)' : 'none',
                color: billing === b ? '#050816' : '#8892aa',
                fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, letterSpacing: 1,
                cursor: 'pointer', transition: 'all 0.2s',
              }}>
                {b.toUpperCase()}
                {b === 'yearly' && (
                  <span style={{ marginLeft: 6, fontSize: 9, background: '#ff0080', color: '#fff', padding: '2px 6px', borderRadius: 10 }}>-20%</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plans Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, alignItems: 'start' }}>
          {PLANS.map((plan, i) => (
            <PlanCard
              key={plan.name}
              plan={plan}
              billing={billing}
              onSelect={() => handleSelect(plan)}
              delay={i * 0.1}
            />
          ))}
        </div>

        {/* Feature Comparison */}
        <div style={{ marginTop: 80 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: '#fff', textAlign: 'center', marginBottom: 40 }}>
            Full Feature <span className="gradient-text-cp">Comparison</span>
          </h3>
          <FeatureTable />
        </div>

        {/* Payment badges */}
        <div style={{ textAlign: 'center', marginTop: 60 }}>
          <div style={{ marginBottom: 16, fontSize: 13, color: '#6b7280', fontFamily: 'var(--font-mono)' }}>
            SECURE PAYMENT POWERED BY
          </div>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { name: 'Paystack', icon: '💳', color: '#00c3f7' },
              { name: 'Flutterwave', icon: '🦋', color: '#f5a623' },
              { name: 'Bank Transfer', icon: '🏦', color: '#10b981' },
              { name: 'USSD', icon: '📱', color: '#8b5cf6' },
            ].map(p => (
              <div key={p.name} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 10, padding: '10px 18px',
              }}>
                <span style={{ fontSize: 18 }}>{p.icon}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: p.color }}>{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginTop: 80 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 32, textAlign: 'center' }}>
            Frequently Asked <span className="gradient-text-cp">Questions</span>
          </h3>
          <FAQ />
        </div>
      </div>

      {/* Payment Modal */}
      {modal && <PaymentModal plan={modal} onClose={() => setModal(null)} onSuccess={() => {
        setModal(null);
        setToast({ msg: `✅ ${modal.name} plan activated! Welcome to Rackyweb Promote!`, type: 'success' });
      }} />}

      {/* Toast */}
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </main>
  );
}

// ── Plan Card ─────────────────────────────────────────────────
function PlanCard({ plan, billing, onSelect, delay }) {
  const [hov, setHov] = useState(false);
  const price = billing === 'yearly' && plan.price !== '₦0'
    ? '₦' + (parseInt(plan.price.replace(/[₦,]/g, '')) * 0.8).toLocaleString()
    : plan.price;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: plan.popular ? `linear-gradient(135deg, ${plan.color}10, ${plan.color}05)` : 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${hov || plan.popular ? plan.color + '40' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 22,
        padding: 28,
        transition: 'all 0.35s cubic-bezier(.4,0,.2,1)',
        transform: plan.popular ? 'scale(1.03)' : hov ? 'translateY(-4px)' : 'none',
        boxShadow: plan.popular
          ? `0 0 50px ${plan.glow}, 0 16px 50px rgba(0,0,0,0.4)`
          : hov ? `0 16px 50px rgba(0,0,0,0.4)` : '0 4px 20px rgba(0,0,0,0.3)',
        position: 'relative',
        animation: `fadeInUp 0.5s ${delay}s ease both`,
      }}
    >
      {/* Popular ribbon */}
      {plan.popular && (
        <div style={{
          position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, #00f0ff, #8b5cf6)',
          color: '#050816', fontFamily: 'var(--font-display)', fontSize: 10,
          fontWeight: 800, letterSpacing: 2, padding: '5px 20px', borderRadius: 20,
          whiteSpace: 'nowrap',
        }}>{plan.badge}</div>
      )}

      {/* Plan header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 900, color: '#fff', marginBottom: 4 }}>
              {plan.name.toUpperCase()}
            </div>
            {!plan.popular && (
              <div style={{ fontSize: 10, color: plan.color, fontFamily: 'var(--font-mono)', letterSpacing: 1 }}>
                {plan.badge}
              </div>
            )}
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: `${plan.color}18`, border: `1px solid ${plan.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: plan.color, boxShadow: `0 0 10px ${plan.color}` }} />
          </div>
        </div>

        <div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 900, color: plan.color }}>
            {price}
          </span>
          <span style={{ fontSize: 13, color: '#6b7280', marginLeft: 4 }}>{plan.period}</span>
        </div>
        {billing === 'yearly' && plan.price !== '₦0' && (
          <div style={{ fontSize: 11, color: '#10b981', marginTop: 4, fontFamily: 'var(--font-mono)' }}>
            💰 Save 20% with yearly billing
          </div>
        )}
      </div>

      <NeonDivider />
      <div style={{ margin: '20px 0' }} />

      {/* Features */}
      <div style={{ marginBottom: 24 }}>
        {plan.features.map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
            <span style={{ color: plan.color, flexShrink: 0, marginTop: 1 }}>✓</span>
            <span style={{ fontSize: 13, color: '#c8cfe0', lineHeight: 1.4 }}>{f}</span>
          </div>
        ))}
        {plan.disabled?.map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10, opacity: 0.35 }}>
            <span style={{ color: '#6b7280', flexShrink: 0, marginTop: 1 }}>✗</span>
            <span style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.4, textDecoration: 'line-through' }}>{f}</span>
          </div>
        ))}
      </div>

      <button onClick={onSelect} style={{
        width: '100%', padding: '13px 0',
        background: plan.popular
          ? `linear-gradient(135deg, ${plan.color}, #8b5cf6)`
          : hov ? `${plan.color}18` : `${plan.color}0d`,
        border: `1px solid ${plan.color}${plan.popular ? '00' : '35'}`,
        borderRadius: 12, color: plan.popular ? '#050816' : plan.color,
        fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 800,
        letterSpacing: 1.5, cursor: 'pointer', transition: 'all 0.2s',
        boxShadow: plan.popular ? `0 0 20px ${plan.glow}` : 'none',
      }}>
        {plan.name === 'Free' ? 'START FREE →' : `GET ${plan.name.toUpperCase()} →`}
      </button>
    </div>
  );
}

// ── Feature Comparison Table ──────────────────────────────────
function FeatureTable() {
  const features = [
    { name: 'Business Listings', free: '1', starter: '3', pro: '10', enterprise: 'Unlimited' },
    { name: 'Analytics Dashboard', free: '✗', starter: 'Basic', pro: 'Full', enterprise: 'Enterprise' },
    { name: 'Featured Badge', free: '✗', starter: '✓', pro: '✓', enterprise: 'Gold ✓' },
    { name: 'Homepage Placement', free: '✗', starter: '✗', pro: '✓', enterprise: 'Hero Banner' },
    { name: 'AI Campaign Assistant', free: '✗', starter: '✗', pro: '✓', enterprise: '✓ + Custom' },
    { name: 'Business Verification', free: '✗', starter: '✗', pro: 'Silver', enterprise: 'Gold' },
    { name: 'Lead Tracker', free: '✗', starter: '✗', pro: '✓', enterprise: '✓ + CRM' },
    { name: 'WhatsApp Integration', free: '✓', starter: '✓', pro: '✓', enterprise: '✓ + API' },
    { name: 'Global Visibility', free: '✗', starter: '✗', pro: 'Nigeria', enterprise: 'Global' },
    { name: 'Support', free: 'Email', starter: 'Priority', pro: '24/7', enterprise: 'Dedicated Manager' },
  ];

  const planNames = ['Free', 'Starter', 'Pro', 'Enterprise'];
  const planColors = ['#6b7280', '#00f0ff', '#8b5cf6', '#ff0080'];

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.02)', borderRadius: 16, overflow: 'hidden' }}>
        <thead>
          <tr>
            <th style={{ padding: '16px 20px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)', fontFamily: 'var(--font-display)', fontSize: 12, color: '#6b7280', letterSpacing: 1 }}>FEATURE</th>
            {planNames.map((n, i) => (
              <th key={n} style={{ padding: '16px 20px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', fontFamily: 'var(--font-display)', fontSize: 13, color: planColors[i], letterSpacing: 1 }}>{n.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((f, i) => (
            <tr key={f.name} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
              <td style={{ padding: '14px 20px', fontSize: 13, color: '#c8cfe0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{f.name}</td>
              {['free', 'starter', 'pro', 'enterprise'].map((k, j) => (
                <td key={k} style={{ padding: '14px 20px', textAlign: 'center', fontSize: 12, borderBottom: '1px solid rgba(255,255,255,0.04)', fontFamily: 'var(--font-mono)', color: f[k] === '✗' ? '#4b5563' : planColors[j] }}>
                  {f[k]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── FAQ ───────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);
  const items = [
    { q: 'Can I cancel my subscription anytime?', a: 'Yes! You can cancel at any time from your dashboard. Your listing stays active until the end of your billing period.' },
    { q: 'How does the featured placement work?', a: 'Featured businesses appear at the top of search results, on the homepage carousel, and with a special badge. Pro and Enterprise plans get homepage placement.' },
    { q: 'What payment methods do you accept?', a: 'We accept Paystack (cards, bank transfer, USSD), Flutterwave (cards, mobile money), and direct bank transfer. All payments are in Naira.' },
    { q: 'How long does ad approval take?', a: 'Free and Starter ads are reviewed within 24 hours. Pro and Enterprise ads get priority review within 2 hours.' },
    { q: 'Can I upgrade or downgrade my plan?', a: 'Absolutely! You can change your plan at any time. Upgrades take effect immediately, and downgrades apply at the next billing cycle.' },
  ];
  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      {items.map((item, i) => (
        <div key={i} style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 12, marginBottom: 12, overflow: 'hidden', transition: 'border-color 0.2s',
          ...(open === i ? { borderColor: 'rgba(0,240,255,0.2)' } : {}),
        }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 600, color: open === i ? '#00f0ff' : '#e8eaf0' }}>{item.q}</span>
            <span style={{ color: '#00f0ff', fontSize: 18, transition: 'transform 0.2s', transform: open === i ? 'rotate(45deg)' : 'none', flexShrink: 0, marginLeft: 12 }}>+</span>
          </button>
          {open === i && (
            <div style={{ padding: '0 20px 16px', fontSize: 14, color: '#8892aa', lineHeight: 1.7, animation: 'fadeInUp 0.2s ease' }}>
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Payment Modal ─────────────────────────────────────────────
function PaymentModal({ plan, onClose, onSuccess }) {
  const [step,  setStep]  = useState(1); // 1: details, 2: payment, 3: success
  const [payer, setPayer] = useState('paystack');
  const [form,  setForm]  = useState({ name: '', email: '', phone: '', business: '' });

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 2000,
      background: 'rgba(5,8,22,0.9)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: 'rgba(5,8,22,0.98)', backdropFilter: 'blur(30px)',
        border: `1px solid ${plan.color}30`, borderRadius: 24,
        padding: 'clamp(24px, 4vw, 40px)',
        width: '100%', maxWidth: 480,
        boxShadow: `0 0 60px ${plan.glow}`,
        animation: 'fadeInUp 0.3s ease',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 900, color: '#fff' }}>
              Subscribe to <span style={{ color: plan.color }}>{plan.name}</span>
            </div>
            <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>{plan.price}/month</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: 22, cursor: 'pointer' }}>×</button>
        </div>

        {step === 1 && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
              {[['Full Name', 'name', 'text'], ['Email Address', 'email', 'email'], ['Phone Number', 'phone', 'tel'], ['Business Name', 'business', 'text']].map(([label, key, type]) => (
                <div key={key}>
                  <label style={{ fontSize: 12, color: '#8892aa', fontFamily: 'var(--font-display)', letterSpacing: 0.5, display: 'block', marginBottom: 6 }}>{label.toUpperCase()}</label>
                  <input
                    type={type}
                    className="input-field"
                    placeholder={label}
                    value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    style={{ borderRadius: 10 }}
                  />
                </div>
              ))}
            </div>
            <button onClick={() => setStep(2)} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              CONTINUE TO PAYMENT →
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, color: '#8892aa', marginBottom: 14, fontFamily: 'var(--font-display)', letterSpacing: 0.5 }}>SELECT PAYMENT METHOD</div>
              {[
                { id: 'paystack', name: 'Paystack', desc: 'Cards, Bank Transfer, USSD', icon: '💳', color: '#00c3f7' },
                { id: 'flutterwave', name: 'Flutterwave', desc: 'Cards, Mobile Money, Bank', icon: '🦋', color: '#f5a623' },
              ].map(p => (
                <div key={p.id} onClick={() => setPayer(p.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                  background: payer === p.id ? `${p.color}12` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${payer === p.id ? p.color + '40' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: 12, cursor: 'pointer', marginBottom: 10, transition: 'all 0.2s',
                }}>
                  <span style={{ fontSize: 24 }}>{p.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: payer === p.id ? p.color : '#fff' }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>{p.desc}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', width: 18, height: 18, borderRadius: '50%', border: `2px solid ${payer === p.id ? p.color : '#4b5563'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {payer === p.id && <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '14px 16px', marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#8892aa', marginBottom: 8 }}>
                <span>{plan.name} Plan (Monthly)</span><span>{plan.price}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 700, color: '#fff', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 8 }}>
                <span>Total</span><span style={{ color: plan.color }}>{plan.price}/mo</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setStep(1)} className="btn-secondary" style={{ flex: 1, fontSize: 11 }}>← BACK</button>
              <button onClick={() => setStep(3)} style={{ flex: 2 }} className="btn-primary">
                PAY {plan.price} →
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 64, marginBottom: 16, animation: 'float 3s ease-in-out infinite' }}>🎉</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 900, color: '#fff', marginBottom: 8 }}>
              Payment <span style={{ color: '#10b981' }}>Successful!</span>
            </div>
            <p style={{ fontSize: 14, color: '#8892aa', marginBottom: 28 }}>
              Your {plan.name} plan is now active. Welcome to Rackyweb Promote!
            </p>
            <button onClick={onSuccess} className="btn-primary" style={{ fontSize: 12 }}>
              GO TO DASHBOARD →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
