import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { ARTICLES_DU_JOUR, visibilite } from '@/sanity/lib/queries'

// Cron Vercel quotidien (vercel.json) : rend visibles les articles programmés pour aujourd'hui (heure de Paris)
// Vercel envoie : GET /api/cron/publication-du-jour avec l'en-tête Authorization: Bearer <CRON_SECRET>
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const envSecret = process.env.CRON_SECRET
  // Sans CRON_SECRET configuré, la route reste fermée
  if (!envSecret || req.headers.get('authorization') !== `Bearer ${envSecret}`) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const params = visibilite()
    const articles = await client.fetch<Array<{ slug: string; edition?: number | null }>>(ARTICLES_DU_JOUR, params)
    const editions = [...new Set(articles.map(a => a.edition).filter((n): n is number => typeof n === 'number'))]

    const chemins = [
      '/ressources',
      ...articles.map(a => `/ressources/${a.slug}`),
      ...(editions.length ? ['/ressources/newsletter', ...editions.map(n => `/ressources/newsletter/${n}`)] : []),
      '/sitemap.xml',
      '/llms.txt',
    ]
    chemins.forEach(p => revalidatePath(p))

    return NextResponse.json({ revalidated: true, today: params.today, articles: articles.map(a => a.slug), chemins })
  } catch (err) {
    return NextResponse.json({ message: 'Revalidation error', err: String(err) }, { status: 500 })
  }
}
