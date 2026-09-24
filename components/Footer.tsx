'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LINKEDIN_URL } from '@/lib/constants'

export default function Footer() {
  const [legalOpen, setLegalOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLegalOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <footer>
        <Link href="/">
          <Image
            src="/brand-assets/Luphy_White_Logo.png"
            alt="Luphy"
            width={120}
            height={52}
            style={{ height: 52, width: 'auto', opacity: 0.85 }}
          />
        </Link>

        <p>© 2026 Luphy · Tous droits réservés</p>

        <div className="footer-right">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener"
            className="footer-linkedin"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
          <button className="footer-legal" onClick={() => setLegalOpen(true)}>
            Mentions légales
          </button>
        </div>
      </footer>

      {/* Mentions légales modal */}
      <div
        className={`modal-overlay${legalOpen ? ' open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) setLegalOpen(false) }}
      >
        <div className="modal-box">
          <button className="modal-close" onClick={() => setLegalOpen(false)} aria-label="Fermer">✕</button>
          <h2>Mentions légales</h2>
          <h3>Éditeur du site</h3>
          <p>
            <strong>Luphy SAS</strong><br />
            Société par actions simplifiée au capital variable<br />
            Siège social : Paris, France<br />
            Directeur de la publication : Titouan Galpin<br />
            Contact : <a href="mailto:titouan@luphy.io">titouan@luphy.io</a>
          </p>
          <h3>Hébergement</h3>
          <p>
            Le site est hébergé par Vercel Inc. (San Francisco, CA).<br />
            Pour toute question : <a href="mailto:titouan@luphy.io">titouan@luphy.io</a>
          </p>
          <h3>Propriété intellectuelle</h3>
          <p>L&apos;ensemble des contenus présents sur ce site sont la propriété exclusive de Luphy SAS et sont protégés par le droit de la propriété intellectuelle.</p>
          <h3>Données personnelles</h3>
          <p>Les informations collectées via les formulaires de contact sont utilisées uniquement pour répondre à vos demandes. Contact : <a href="mailto:titouan@luphy.io">titouan@luphy.io</a></p>
        </div>
      </div>
    </>
  )
}
