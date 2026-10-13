'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { HUBSPOT_SCRIPT, MIDBOUND_SCRIPT } from '@/lib/constants'

type HubSpotConsent = { allowed: boolean; categories: { analytics?: boolean } }

declare global {
  interface Window {
    _hsp?: unknown[]
  }
}

let consentListenerAdded = false

// Midbound : injecté une seule fois, uniquement après consentement « analytics » HubSpot
// (consentement donné maintenant ou lors d'une visite précédente), jamais en cas de refus
function loadMidboundOnConsent() {
  if (consentListenerAdded) return
  consentListenerAdded = true
  window._hsp = window._hsp || []
  window._hsp.push([
    'addPrivacyConsentListener',
    (consent: HubSpotConsent) => {
      if (!consent.categories.analytics) return
      if (document.getElementById('midbound-script')) return
      const script = document.createElement('script')
      script.id = 'midbound-script'
      script.src = MIDBOUND_SCRIPT
      script.async = true
      document.body.appendChild(script)
    },
  ])
}

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio')

  useEffect(() => {
    if (!isStudio) loadMidboundOnConsent()
  }, [isStudio])

  if (isStudio) return <>{children}</>
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      {/* HubSpot : suivi + bannière de consentement, chargé après le load de la page, jamais sur /studio */}
      <Script id="hs-script-loader" src={HUBSPOT_SCRIPT} strategy="lazyOnload" />
    </>
  )
}
