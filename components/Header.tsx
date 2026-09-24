'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CTA_COMMERCIAL, CTA_OPERATIONNEL } from '@/lib/constants'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const mobileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <Link href="/" className="nav-logo-link" onClick={() => setMobileOpen(false)}>
            <Image
              src="/brand-assets/Luphy_White_Logo.png"
              alt="Luphy"
              width={160}
              height={80}
              className="nav-logo"
              priority
              style={{ height: 80, width: 'auto' }}
            />
          </Link>

          <ul className="nav-links">
            {/* Services dropdown */}
            <li className="nav-dropdown">
              <span className="dropdown-toggle" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13.5px', fontWeight: 500 }}>
                Services
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <div className="dropdown-menu">
                <Link href="/performance-commerciale">
                  <span className="dm-icon">🏆</span>
                  <span className="dm-text">
                    <span className="dm-title">Performance commerciale</span>
                    <span className="dm-sub">CRM & Outbound</span>
                  </span>
                </Link>
                <Link href="/performance-operationnelle">
                  <span className="dm-icon">⚡</span>
                  <span className="dm-text">
                    <span className="dm-title">Performance opérationnelle</span>
                    <span className="dm-sub">IA & Automatisation</span>
                  </span>
                </Link>
                <div className="dropdown-sep" />
                <Link href="/formation">
                  <span className="dm-icon">📚</span>
                  <span className="dm-text">
                    <span className="dm-title">Formation & adoption</span>
                    <span className="dm-sub">CRM, IA, Claude, coaching</span>
                  </span>
                </Link>
              </div>
            </li>

            <li><Link href="/methode">Méthode</Link></li>
            <li><Link href="/expertise-finance">Expertise finance</Link></li>
            <li><Link href="/cas-clients">Cas clients</Link></li>
            <li><Link href="/ressources">Ressources</Link></li>
          </ul>
        </div>

        <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <a href={CTA_COMMERCIAL} target="_blank" rel="noopener" className="btn-nav-outline" style={{ fontSize: '12.5px', padding: '9px 16px' }}>
            CRM & commercial
          </a>
          <a href={CTA_OPERATIONNEL} target="_blank" rel="noopener" className="btn-nav">
            IA & opérationnel
          </a>
        </div>

        <button
          className={`nav-hamburger${mobileOpen ? ' open' : ''}`}
          aria-label="Menu"
          onClick={() => setMobileOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile panel */}
      <div className={`nav-mobile-panel${mobileOpen ? ' open' : ''}`} ref={mobileRef}>
        <Link href="/performance-commerciale" onClick={() => setMobileOpen(false)}>Performance commerciale</Link>
        <Link href="/performance-operationnelle" onClick={() => setMobileOpen(false)} className="mobile-sub">IA & Automatisation</Link>
        <Link href="/formation" onClick={() => setMobileOpen(false)}>Formation</Link>
        <div className="mobile-sep" />
        <Link href="/methode" onClick={() => setMobileOpen(false)}>Méthode</Link>
        <Link href="/expertise-finance" onClick={() => setMobileOpen(false)}>Expertise finance</Link>
        <Link href="/cas-clients" onClick={() => setMobileOpen(false)}>Cas clients</Link>
        <Link href="/ressources" onClick={() => setMobileOpen(false)}>Ressources</Link>
        <Link href="/equipe" onClick={() => setMobileOpen(false)}>L&apos;équipe</Link>
        <div className="mobile-sep" />
        <a href={CTA_COMMERCIAL} target="_blank" rel="noopener" className="mobile-cta" onClick={() => setMobileOpen(false)}>
          Parler CRM &amp; commercial
        </a>
        <a href={CTA_OPERATIONNEL} target="_blank" rel="noopener" className="mobile-cta" style={{ marginTop: 6 }} onClick={() => setMobileOpen(false)}>
          Parler IA &amp; opérationnel
        </a>
      </div>
    </>
  )
}
