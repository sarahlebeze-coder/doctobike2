'use client'

import { useState } from 'react'
import Link from 'next/link'

const font = "'Nunito', sans-serif"

export default function NavHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header style={{
        background: 'white',
        borderBottom: '1px solid #E6F1FB',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#185FA5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 36 36" fill="none">
              <circle cx="10" cy="22" r="7" fill="none" stroke="#E6F1FB" strokeWidth="1.5"/>
              <circle cx="10" cy="22" r="2" fill="#B5D4F4"/>
              <circle cx="26" cy="22" r="7" fill="none" stroke="#E6F1FB" strokeWidth="1.5"/>
              <circle cx="26" cy="22" r="2" fill="#B5D4F4"/>
              <path d="M10 22 L17 10 L26 22" fill="none" stroke="#E6F1FB" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M17 10 L21 22" stroke="#E6F1FB" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="14" y1="10" x2="19" y2="10" stroke="#E6F1FB" strokeWidth="2" strokeLinecap="round"/>
              <line x1="19" y1="10" x2="19" y2="14" stroke="#E6F1FB" strokeWidth="2" strokeLinecap="round"/>
              <g transform="translate(28,6) rotate(35)">
                <rect x="-2" y="-7" width="4" height="10" rx="1" fill="#FAC775"/>
                <rect x="-3.5" y="-9" width="7" height="3.5" rx="1.5" fill="#FAC775"/>
              </g>
            </svg>
          </div>
          <span style={{ fontFamily: font, fontSize: 20, fontWeight: 800, color: '#042C53' }}>Doctobike</span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="desktop-nav">
          <Link href="/" style={{ fontSize: 14, color: '#444', textDecoration: 'none', padding: '8px 12px', borderRadius: 8, fontFamily: font, fontWeight: 600 }}>
            Accueil
          </Link>
          <Link href="/about" style={{ fontSize: 14, color: '#444', textDecoration: 'none', padding: '8px 12px', borderRadius: 8, fontFamily: font, fontWeight: 600 }}>
            À propos
          </Link>
          <Link href="/booking" style={{ background: '#185FA5', color: 'white', padding: '10px 18px', borderRadius: 10, textDecoration: 'none', fontSize: 14, fontWeight: 700, fontFamily: font, whiteSpace: 'nowrap' }}>
            Réserver
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none', flexDirection: 'column', gap: 5 }}
          aria-label="Menu"
        >
          <span style={{ display: 'block', width: 22, height: 2, background: menuOpen ? 'transparent' : '#042C53', borderRadius: 2, transition: 'all 0.2s' }}/>
          <span style={{ display: 'block', width: 22, height: 2, background: '#042C53', borderRadius: 2, transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none', transition: 'all 0.2s' }}/>
          <span style={{ display: 'block', width: 22, height: 2, background: '#042C53', borderRadius: 2, transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none', transition: 'all 0.2s' }}/>
        </button>
      </header>

      {/* Menu mobile déroulant */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 61, left: 0, right: 0, zIndex: 99,
          background: 'white', borderBottom: '1px solid #E6F1FB',
          padding: '8px 16px 16px',
          display: 'flex', flexDirection: 'column', gap: 4,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}>
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ fontSize: 16, color: '#042C53', textDecoration: 'none', padding: '12px 16px', borderRadius: 10, fontFamily: font, fontWeight: 700 }}>
            Accueil
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} style={{ fontSize: 16, color: '#042C53', textDecoration: 'none', padding: '12px 16px', borderRadius: 10, fontFamily: font, fontWeight: 700 }}>
            À propos
          </Link>
          <Link href="/booking" onClick={() => setMenuOpen(false)} style={{ fontSize: 16, background: '#185FA5', color: 'white', textDecoration: 'none', padding: '12px 16px', borderRadius: 10, fontFamily: font, fontWeight: 700, textAlign: 'center', marginTop: 4 }}>
            Réserver
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 480px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
