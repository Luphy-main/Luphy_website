'use client'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { MIDBOUND_SCRIPT } from '@/lib/constants'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio')
  if (isStudio) return <>{children}</>
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      {/* Midbound : chargé après le load de la page, jamais sur /studio */}
      <Script src={MIDBOUND_SCRIPT} strategy="lazyOnload" />
    </>
  )
}
