'use client'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio')
  if (isStudio) return <>{children}</>
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
