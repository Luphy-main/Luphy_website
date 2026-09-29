import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { CAS_CLIENT_BY_SLUG, CAS_CLIENTS_LIST } from '@/sanity/lib/queries'
import { SITE_URL } from '@/lib/constants'
import CasClientDetailPage from '@/components/CasClientDetailPage'

export const revalidate = 3600
export const dynamicParams = true

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const etudes: Array<{ slug: string }> = await client.fetch(CAS_CLIENTS_LIST)
  return etudes.map(e => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = await client.fetch(CAS_CLIENT_BY_SLUG, { slug })
  if (!data) return { title: 'Étude de cas | Luphy' }
  return {
    title: `${data.client} | Cas client Luphy`,
    description: data.metaDescription || data.chapeau || `Étude de cas ${data.client} par Luphy.`,
    openGraph: {
      title: `${data.client} | Cas client Luphy`,
      description: data.metaDescription || data.chapeau,
      url: `${SITE_URL}/cas-clients/${slug}`,
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return <CasClientDetailPage slug={slug} />
}
