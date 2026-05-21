// ═══════════════════════════════════════════════
//  RACKYWEB PROMOTE — APP ROOT
//  Powered by Rackyweb Global
// ═══════════════════════════════════════════════
import { useState, useEffect } from 'react';
import Navbar      from './components/Navbar';
import Footer      from './components/Footer';
import AIAssistant from './components/AIAssistant';
import { ParticleCanvas } from './components/UI';

import HomePage       from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import PlansPage      from './pages/PlansPage';
import DashboardPage  from './pages/DashboardPage';
import BlogPage       from './pages/BlogPage';
import AboutPage      from './pages/AboutPage';

export default function App() {
  const [page, setPage]           = useState('home');
  const [darkMode, setDarkMode]   = useState(true);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const navigate = (p) => setPage(p.toLowerCase());

  return (
    <div style={{ minHeight: '100vh', background: 'var(--black)', color: 'var(--text)', position: 'relative' }}>
      {/* Particle Background */}
      <ParticleCanvas />

      {/* Global gradient bg */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 120% 80% at 50% -10%, rgba(0,240,255,0.04) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 80% 80%, rgba(139,92,246,0.04) 0%, transparent 60%)',
      }} />

      {/* Navbar */}
      <Navbar setPage={navigate} />

      {/* Page Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {page === 'home'        && <HomePage       setPage={navigate} />}
        {page === 'marketplace' && <MarketplacePage setPage={navigate} />}
        {page === 'plans'       && <PlansPage       setPage={navigate} />}
        {page === 'dashboard'   && <DashboardPage   setPage={navigate} />}
        {page === 'blog'        && <BlogPage />}
        {page === 'about'       && <AboutPage       setPage={navigate} />}
      </div>

      {/* Footer */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Footer setPage={navigate} />
      </div>

      {/* AI Assistant FAB */}
      <AIAssistant />

      {/* Dark/Light Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        title="Toggle dark/light mode"
        style={{
          position: 'fixed', bottom: 24, left: 24, zIndex: 990,
          width: 44, height: 44, borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          cursor: 'pointer', fontSize: 18,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s',
          backdropFilter: 'blur(12px)',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,240,255,0.1)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      {/* Back to top */}
      <BackToTop />
    </div>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed', bottom: 88, left: 24, zIndex: 990,
        width: 44, height: 44, borderRadius: '50%',
        background: 'rgba(0,240,255,0.08)',
        border: '1px solid rgba(0,240,255,0.25)',
        cursor: 'pointer', fontSize: 16, color: '#00f0ff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s', backdropFilter: 'blur(12px)',
        animation: 'fadeInUp 0.3s ease',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,240,255,0.15)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,240,255,0.08)'}
    >↑</button>
  );
}
