'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const font = "'Plus Jakarta Sans', sans-serif"

export default function NavHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const navLink = (href: string, label: string) => {
    const active = pathname === href || pathname.startsWith(href + '/')
    return (
      <Link href={href} style={{
        fontSize: 14,
        color: active ? '#2E8B6A' : '#444',
        textDecoration: 'none',
        padding: '8px 12px',
        borderRadius: 8,
        fontFamily: font,
        fontWeight: active ? 700 : 600,
        borderBottom: active ? '2px solid #2E8B6A' : '2px solid transparent',
      }}>
        {label}
      </Link>
    )
  }

  const mobileLink = (href: string, label: string) => {
    const active = pathname === href || pathname.startsWith(href + '/')
    return (
      <Link href={href} onClick={() => setMenuOpen(false)} style={{
        fontSize: 16,
        color: active ? '#2E8B6A' : '#1B4D3E',
        textDecoration: 'none',
        padding: '12px 16px',
        borderRadius: 10,
        fontFamily: font,
        fontWeight: 700,
        background: active ? '#E8F5EE' : 'transparent',
      }}>
        {label}
      </Link>
    )
  }

  return (
    <>
      <header style={{
        background: 'white',
        borderBottom: '1px solid #E8F5EE',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1B4D3E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 36 36" fill="none">
              <circle cx="10" cy="22" r="7" fill="none" stroke="#E8F5EE" strokeWidth="1.5"/>
              <circle cx="10" cy="22" r="2" fill="#4DB892"/>
              <circle cx="26" cy="22" r="7" fill="none" stroke="#E8F5EE" strokeWidth="1.5"/>
              <circle cx="26" cy="22" r="2" fill="#4DB892"/>
              <path d="M10 22 L17 10 L26 22" fill="none" stroke="#E8F5EE" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M17 10 L21 22" stroke="#E8F5EE" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="14" y1="10" x2="19" y2="10" stroke="#E8F5EE" strokeWidth="2" strokeLinecap="round"/>
              <line x1="19" y1="10" x2="19" y2="14" stroke="#E8F5EE" strokeWidth="2" strokeLinecap="round"/>
              <g transform="translate(28,6) rotate(35)">
                <rect x="-2" y="-7" width="4" height="10" rx="1" fill="#FAC775"/>
                <rect x="-3.5" y="-9" width="7" height="3.5" rx="1.5" fill="#FAC775"/>
              </g>
            </svg>
          </div>
          <span style={{ fontFamily: font, fontSize: 20, fontWeight: 800, color: '#1B4D3E' }}>Doctobike</span>
        </Link>

        {/* Desktop nav */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {navLink('/', 'Accueil')}
          {navLink('/entreprise', 'Atelier en entreprise')}
          {navLink('/coaching', 'Assistance & dépannage')}
          {navLink('/about', 'À propos')}
        </nav>

        {/* Hamburger mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none', flexDirection: 'column', gap: 5 }}
          aria-label="Menu"
        >
          <span style={{ display: 'block', width: 22, height: 2, background: menuOpen ? 'transparent' : '#1B4D3E', borderRadius: 2, transition: 'all 0.2s' }}/>
          <span style={{ display: 'block', width: 22, height: 2, background: '#1B4D3E', borderRadius: 2, transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none', transition: 'all 0.2s' }}/>
          <span style={{ display: 'block', width: 22, height: 2, background: '#1B4D3E', borderRadius: 2, transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none', transition: 'all 0.2s' }}/>
        </button>
      </header>

      {/* Menu mobile déroulant */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 61, left: 0, right: 0, zIndex: 99,
          background: 'white', borderBottom: '1px solid #E8F5EE',
          padding: '8px 16px 16px',
          display: 'flex', flexDirection: 'column', gap: 4,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}>
          {mobileLink('/', 'Accueil')}
          {mobileLink('/entreprise', '🏢 Atelier en entreprise')}
          {mobileLink('/coaching', '🔧 Assistance & dépannage')}
          {mobileLink('/about', 'À propos')}
        </div>
      )}

      <style>{`
        @media (max-width: 760px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
