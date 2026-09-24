import { CTA_COMMERCIAL, CTA_OPERATIONNEL } from '@/lib/constants'

export default function ContactPage() {
  return (
    <main style={{ minHeight: '82vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '140px 24px 96px', textAlign: 'center' }}>
      <div style={{ maxWidth: 560 }}>
        <div className="label" style={{ display: 'inline-block', marginBottom: 16 }}>Contact</div>
        <h1 className="sec-title" style={{ marginBottom: 18 }}>Parlons de votre organisation.</h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, lineHeight: 1.75, marginBottom: 44 }}>
          Premier échange de 30 min pour cadrer vos enjeux.<br />
          <strong style={{ color: 'rgba(255,255,255,0.75)' }}>Devis personnalisé sous 72 h.</strong>
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={CTA_COMMERCIAL} target="_blank" rel="noopener" className="btn-primary">
            Parler CRM &amp; commercial
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href={CTA_OPERATIONNEL} target="_blank" rel="noopener" className="btn-outline">
            Parler IA &amp; opérationnel
          </a>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, marginTop: 32 }}>
          Ou par email : <a href="mailto:titouan@luphy.io" style={{ color: 'var(--sky)' }}>titouan@luphy.io</a>
        </p>
      </div>
    </main>
  )
}
