import type { Metadata } from 'next'
import PlaceholderPage from '@/components/PlaceholderPage'

// Page vide : non indexée, hors sitemap et hors menus tant qu'elle n'a pas de contenu
export const metadata: Metadata = {
  title: 'Automatisation de processus | Luphy',
  robots: { index: false, follow: true },
}

export default function Page() {
  return <PlaceholderPage label="Performance opérationnelle" title="Automatisation de processus" subtitle="Workflows intelligents avec n8n, Make, Zapier, sur vos données et vos process réels. Page en cours de construction." />
}
