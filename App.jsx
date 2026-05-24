import { useState, useEffect } from 'react'
import Navbar        from './components/Navbar.jsx'
import Footer        from './components/Footer.jsx'
import AIAssistant   from './components/AIAssistant.jsx'
import { Particles } from './components/UI.jsx'

import HomePage       from './pages/HomePage.jsx'
import MarketplacePage from './pages/MarketplacePage.jsx'
import PlansPage      from './pages/PlansPage.jsx'
import DashboardPage  from './pages/DashboardPage.jsx'
import BlogPage       from './pages/BlogPage.jsx'
import AboutPage      from './pages/AboutPage.jsx'

export default function App() {
  const [page, setPage] = useState('home')
  const [showTop, setShowTop] = useState(false)

  const go = (p) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const h = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <>
      {/* Global styles for animations */}
      <style>{`
        @keyframes glow {
          0%,100% { box-shadow: 0 0 20px rgba(245,158,11,0.3); }
          50%      { box-shadow: 0 0 50px rgba(245,158,11,0.7), 0 0 80px rgba(245,158,11,0.3); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-14px); }
        }
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.4; transform:scale(.85); }
        }
        @keyframes blink {
          0%,100% { opacity:1; }
          50%      { opacity:0; }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:none; }
        }
        @keyframes ringOut {
          0%   { transform:scale(1); opacity:.7; }
          100% { transform:scale(2.2); opacity:0; }
        }
        @keyframes slideIn {
          from { opacity:0; transform:translateX(16px); }
          to   { opacity:1; transform:none; }
        }
        @keyframes shimmer {
          0%   { background-position:-200% center; }
          100% { background-position:200% center; }
        }
        .gt {
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      <div style={{ minHeight:'100vh', background:'#030b1a', color:'var(--text)', position:'relative' }}>
        {/* Particle background */}
        <Particles />

        {/* Ambient glow overlay */}
        <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none',
          background:'radial-gradient(ellipse 100% 70% at 20% 20%, rgba(37,99,235,0.06) 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 80% 80%, rgba(245,158,11,0.05) 0%, transparent 60%)',
        }}/>

        {/* Navigation */}
        <Navbar page={page} go={go} />

        {/* Page content */}
        <div style={{ position:'relative', zIndex:1 }}>
          {page === 'home'        && <HomePage        go={go} />}
          {page === 'marketplace' && <MarketplacePage go={go} />}
          {page === 'plans'       && <PlansPage       go={go} />}
          {page === 'dashboard'   && <DashboardPage   go={go} />}
          {page === 'blog'        && <BlogPage />}
          {page === 'about'       && <AboutPage       go={go} />}
        </div>

        {/* Footer */}
        <div style={{ position:'relative', zIndex:1 }}>
          <Footer go={go} />
        </div>

        {/* AI Assistant */}
        <AIAssistant />

        {/* Back to top */}
        {showTop && (
          <button
            onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
            style={{
              position:'fixed', bottom:90, left:20, zIndex:990,
              width:44, height:44, borderRadius:'50%',
              background:'rgba(245,158,11,0.1)',
              border:'1px solid rgba(245,158,11,0.3)',
              cursor:'pointer', fontSize:16, color:'#fbbf24',
              display:'flex', alignItems:'center', justifyContent:'center',
              backdropFilter:'blur(12px)', transition:'all .2s',
              animation:'fadeUp .3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='rgba(245,158,11,0.2)'; e.currentTarget.style.transform='translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background='rgba(245,158,11,0.1)'; e.currentTarget.style.transform='none' }}
          >↑</button>
        )}
      </div>
    </>
  )
}
