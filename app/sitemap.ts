import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { client } from '@/sanity/lib/client'
import { LLMS_CONTENT } from '@/sanity/lib/queries'

const now = new Date().toISOString().split('T')[0]

const routes: Array<{ url: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
  { url: '', priority: 1.0, changeFrequency: 'weekly' },
  { url: '/methode', priority: 0.95, changeFrequency: 'monthly' },
  { url: '/performance-commerciale', priority: 0.9, changeFrequency: 'monthly' },
  { url: '/performance-commerciale/crm', priority: 0.9, changeFrequency: 'monthly' },
  { url: '/performance-commerciale/crm/affinity', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/performance-commerciale/crm/dealcloud', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/performance-commerciale/crm/hubspot', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/performance-commerciale/crm/pipedrive', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/performance-commerciale/crm/notion', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/performance-commerciale/crm/sur-mesure', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/performance-commerciale/outbound', priority: 0.85, changeFrequency: 'monthly' },
  { url: '/performance-operationnelle', priority: 0.9, changeFrequency: 'monthly' },
  { url: '/performance-operationnelle/ia', priority: 0.85, changeFrequency: 'monthly' },
  { url: '/formation', priority: 0.9, changeFrequency: 'monthly' },
  { url: '/formation/acculturation-ia', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/formation/claude', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/formation/crm', priority: 0.75, changeFrequency: 'monthly' },
  { url: '/formation/coaching-dirigeant', priority: 0.75, changeFrequency: 'monthly' },
  { url: '/expertise-finance', priority: 0.85, changeFrequency: 'monthly' },
  { url: '/secteurs/fonds-investissement', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/secteurs/m-a-banques-affaires', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/secteurs/societes-de-gestion', priority: 0.75, changeFrequency: 'monthly' },
  { url: '/secteurs/conseil', priority: 0.75, changeFrequency: 'monthly' },
  { url: '/cas-usage', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/cas-clients', priority: 0.85, changeFrequency: 'monthly' },
  { url: '/cas-clients/allyum', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/cas-clients/fundora', priority: 0.75, changeFrequency: 'monthly' },
  { url: '/cas-clients/hoppi', priority: 0.75, changeFrequency: 'monthly' },
  { url: '/temoignages', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/equipe', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/ressources', priority: 0.85, changeFrequency: 'weekly' },
  { url: '/ressources/crm-fonds-2026', priority: 0.75, changeFrequency: 'monthly' },
  { url: '/ressources/ia-ma-2026', priority: 0.75, changeFrequency: 'monthly' },
  { url: '/faq', priority: 0.65, changeFrequency: 'monthly' },
  { url: '/contact', priority: 0.7, changeFrequency: 'monthly' },
]

// Pages détail Sanity publiées après la mise en ligne : ajoutées automatiquement
export const revalidate = 3600

type Slugs = Record<'casClients' | 'casUsage' | 'articles', Array<{ slug: string }>>

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { casClients, casUsage, articles } = await client.fetch<Slugs>(LLMS_CONTENT)
  const known = new Set(routes.map((r) => r.url))
  const fromSanity = [
    ...casClients.map(({ slug }) => `/cas-clients/${slug}`),
    ...casUsage.map(({ slug }) => `/cas-usage/${slug}`),
    ...articles.map(({ slug }) => `/ressources/${slug}`),
  ]
    .filter((url) => !known.has(url))
    .map((url) => ({ url, priority: 0.7, changeFrequency: 'monthly' as const }))

  return [...routes, ...fromSanity].map(({ url, priority, changeFrequency }) => ({
    url: `${SITE_URL}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
