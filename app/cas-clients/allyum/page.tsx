import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { CAS_CLIENT_BY_SLUG } from '@/sanity/lib/queries'
import { SITE_URL } from '@/lib/constants'
import CasClientDetailPage from '@/components/CasClientDetailPage'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(CAS_CLIENT_BY_SLUG, { slug: 'allyum' })
  if (!data) return { title: 'Allyum | Cas client Luphy' }
  return {
    title: `${data.client} | Cas client Luphy`,
    description: data.metaDescription || data.chapeau || 'Étude de cas Allyum par Luphy.',
    openGraph: {
      title: `${data.client} | Cas client Luphy`,
      description: data.metaDescription || data.chapeau,
      url: `${SITE_URL}/cas-clients/allyum`,
    },
  }
}

export default function Page() {
  return <CasClientDetailPage slug="allyum" />
}
