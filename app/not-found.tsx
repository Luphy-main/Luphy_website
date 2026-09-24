import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{ minHeight: '82vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '140px 24px 96px', textAlign: 'center' }}>
      <div>
        <div className="label" style={{ display: 'inline-block', marginBottom: 16 }}>Erreur 404</div>
        <h1 className="sec-title" style={{ marginBottom: 18 }}>Page introuvable</h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 16, lineHeight: 1.75, maxWidth: 400, margin: '0 auto 40px' }}>
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
        <Link href="/" className="btn-primary">
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  )
}
