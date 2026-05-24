import { useState, useEffect } from 'react'
import { Logo } from './UI.jsx'

export default function Navbar({ page, go }) {
  const [sc, setSc] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const h = () => setSc(window.scrollY > 50)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  const links = [
    ['Home','home'], ['Marketplace','marketplace'], ['Plans','plans'],
    ['Dashboard','dashboard'], ['Blog','blog'], ['About','about'],
  ]
  const nav = p => { go(p); setOpen(false) }

  return (
    <nav style={{
      position: 'fixed', top:0, left:0, right:0, zIndex:1000,
      background: sc ? 'rgba(3,11,26,0.95)' : 'transparent',
      backdropFilter: sc ? 'blur(24px)' : 'none',
      WebkitBackdropFilter: sc ? 'blur(24px)' : 'none',
      borderBottom: sc ? '1px solid rgba(245,158,11,0.1)' : 'none',
      transition: 'all .4s ease',
    }}>
      <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:72 }}>

        {/* Logo */}
        <div onClick={() => nav('home')}>
          <Logo size={42} showText={true} />
        </div>

        {/* Desktop Nav */}
        <div style={{ display:'flex', gap:2, alignItems:'center' }}>
          {links.map(([l, p]) => (
            <button key={p} onClick={() => nav(p)}
              className={`nav-link ${page === p ? 'active' : ''}`}>
              {l}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          <button className="btn-ghost" style={{ padding:'9px 20px', fontSize:13 }} onClick={() => nav('dashboard')}>
            Sign In
          </button>
          <button className="btn-gold" style={{ padding:'10px 22px', fontSize:13 }} onClick={() => nav('plans')}>
            Get Started →
          </button>
        </div>

      </div>

      {/* Mobile hamburger styles */}
      <style>{`
        @media(max-width:900px){
          nav > .container > div:nth-child(2){ display:none!important }
          nav > .container > div:nth-child(3){ display:none!important }
        }
        @media(min-width:901px){ .ham-btn{ display:none!important } .mob-menu{ display:none!important } }
      `}</style>
    </nav>
  )
}
