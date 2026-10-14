'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CATEGORIES_ARTICLE } from '@/sanity/lib/categories'

export type ArticleCarte = {
  _id: string
  titre: string
  slug: string
  chapeau?: string
  categorie?: string
  date?: string
}

const SVG_ARROW = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const PARAM = 'categorie'

// Catégorie active lue dans l'URL (?categorie=crm) ; valeur inconnue = aucun filtre
function categorieDepuisUrl() {
  const slug = new URLSearchParams(window.location.search).get(PARAM)
  return CATEGORIES_ARTICLE.find(c => c.slug === slug)?.slug ?? null
}

// Le HTML serveur contient toujours tous les articles (page indexable) ; le filtre ne fait que masquer des cartes.
export default function RessourcesListe({ articles }: { articles: ArticleCarte[] }) {
  const [actif, setActif] = useState<string | null>(null)

  useEffect(() => {
    setActif(categorieDepuisUrl())
    const surRetour = () => setActif(categorieDepuisUrl())
    window.addEventListener('popstate', surRetour)
    return () => window.removeEventListener('popstate', surRetour)
  }, [])

  const choisir = (slug: string | null) => {
    const url = new URL(window.location.href)
    if (slug) url.searchParams.set(PARAM, slug)
    else url.searchParams.delete(PARAM)
    window.history.pushState(null, '', url)
    setActif(slug)
  }

  // Seules les catégories qui ont au moins un article ont un bouton ; une catégorie vide dans l'URL est ignorée (jamais de liste vide)
  const presentes = CATEGORIES_ARTICLE.filter(c => articles.some(a => a.categorie === c.titre))
  const titreActif = presentes.find(c => c.slug === actif)?.titre

  return (
    <>
      {presentes.length > 1 && (
        <div className="filtre-cat" role="group" aria-label="Filtrer par catégorie">
          <button type="button" aria-pressed={!titreActif} onClick={() => choisir(null)}>Tous</button>
          {presentes.map(c => (
            <button key={c.slug} type="button" aria-pressed={actif === c.slug} onClick={() => choisir(c.slug)}>
              {c.titre}
            </button>
          ))}
        </div>
      )}
      <div className="offers-grid">
        {articles.map((a, i) => (
          <Link
            key={a._id}
            href={`/ressources/${a.slug}`}
            className={`offer-card reveal${i > 0 ? ` d${Math.min(i % 4, 4)}` : ''}`}
            style={{ textDecoration: 'none', ...(titreActif && a.categorie !== titreActif && { display: 'none' }) }}
          >
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16 }}>
              {a.categorie && (
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--sky)', background: 'rgba(75,159,191,0.12)', border: '1px solid rgba(75,159,191,0.25)', borderRadius: 5, padding: '3px 10px' }}>{a.categorie}</span>
              )}
              {a.date && (
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{a.date}</span>
              )}
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, lineHeight: 1.4 }}>{a.titre}</h3>
            {a.chapeau && (
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>{a.chapeau}</p>
            )}
            <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--sky)', fontWeight: 600 }}>
              Lire l&apos;article {SVG_ARROW}
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
