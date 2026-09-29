import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { ARTICLE_BY_SLUG } from '@/sanity/lib/queries'
import { SITE_URL } from '@/lib/constants'
import ArticleDetailPage from '@/components/ArticleDetailPage'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(ARTICLE_BY_SLUG, { slug: 'crm-fonds-2026' })
  if (!data) return { title: 'Le guide du parfait CRM pour les fonds en 2026 | Luphy' }
  return {
    title: `${data.titre} | Luphy`,
    description: data.metaDescription || data.chapeau,
    openGraph: {
      title: `${data.titre} | Luphy`,
      description: data.metaDescription || data.chapeau,
      url: `${SITE_URL}/ressources/crm-fonds-2026`,
    },
  }
}

export default function Page() {
  return <ArticleDetailPage slug="crm-fonds-2026" />
}
