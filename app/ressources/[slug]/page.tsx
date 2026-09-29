import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { ARTICLE_BY_SLUG, ARTICLE_SLUGS } from '@/sanity/lib/queries'
import { SITE_URL } from '@/lib/constants'
import ArticleDetailPage from '@/components/ArticleDetailPage'

export const revalidate = 3600
export const dynamicParams = true

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(ARTICLE_SLUGS)
  return slugs.map(s => ({ slug: s }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = await client.fetch(ARTICLE_BY_SLUG, { slug })
  if (!data) return { title: 'Article | Luphy' }
  return {
    title: `${data.titre} | Luphy`,
    description: data.metaDescription || data.chapeau || `Article Luphy : ${data.titre}`,
    openGraph: {
      title: `${data.titre} | Luphy`,
      description: data.metaDescription || data.chapeau,
      url: `${SITE_URL}/ressources/${slug}`,
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return <ArticleDetailPage slug={slug} />
}
