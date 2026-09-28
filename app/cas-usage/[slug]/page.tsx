import type { Metadata } from 'next'
import Link from 'next/link'
import ClientEffects from '@/components/ClientEffects'
import { SITE_URL } from '@/lib/constants'

// Cette page est un placeholder. En Phase 3, elle sera alimentée par Sanity CMS.
// noindex jusqu'à ce que le contenu réel soit disponible.
export const metadata: Metadata = {
  title: "Cas d'usage | Luphy",
  robots: { index: false, follow: false },
}

export default function Page({ params }: { params: { slug: string } }) {
  void params
  return (
    <>
      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link><span>/</span>
        <Link href="/cas-usage">Cas d&apos;usage</Link><span>/</span>
        <span>À venir</span>
      </nav>

      <section className="page-hero">
        <div className="label">Cas d&apos;usage</div>
        <h1>Contenu<br /><em>à venir.</em></h1>
        <p>
          Ce cas d&apos;usage sera disponible prochainement.
          En attendant, retrouvez tous les cas d&apos;usage disponibles dans la bibliothèque.
        </p>
        <div className="cta-btns">
          <Link href="/cas-usage" className="btn-primary">
            Voir la bibliothèque
          </Link>
          <Link href="/methode" className="btn-outline">Voir la méthode</Link>
        </div>
      </section>

      <ClientEffects />
    </>
  )
}
