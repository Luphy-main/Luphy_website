import Link from 'next/link'

interface Props {
  label?: string
  title: string
  subtitle?: string
}

export default function PlaceholderPage({ label, title, subtitle }: Props) {
  return (
    <main style={{ minHeight: '82vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '140px 24px 96px', textAlign: 'center' }}>
      <div>
        {label && <div className="label" style={{ display: 'inline-block', marginBottom: 16 }}>{label}</div>}
        <h1 className="sec-title" style={{ marginBottom: 18 }}>{title}</h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 16, lineHeight: 1.75, maxWidth: 440, margin: '0 auto 40px' }}>
          {subtitle ?? 'Cette page est en cours de construction. Revenez bientôt.'}
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn-outline" style={{ fontSize: 14, padding: '12px 26px' }}>
            ← Accueil
          </Link>
          <Link href="/contact" className="btn-primary" style={{ fontSize: 14, padding: '12px 26px' }}>
            Nous contacter
          </Link>
        </div>
      </div>
    </main>
  )
}
