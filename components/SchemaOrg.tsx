import { SITE_URL, SITE_NAME, LINKEDIN_URL } from '@/lib/constants'
import { getEquipe, personJsonLd } from '@/sanity/lib/equipe'

interface SchemaOrgProps {
  type?: 'website' | 'article'
  title?: string
  description?: string
  url?: string
}

export default async function SchemaOrg({ type = 'website', url }: SchemaOrgProps) {
  const fondateurs = (await getEquipe()).filter(m => m.fondateur)

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: 'LUPHY',
    url: SITE_URL,
    logo: `${SITE_URL}/brand-assets/luphy-logo-square.png`,
    description:
      "Luphy est une agence de performance digitale basée à Paris, spécialisée dans la finance (fonds d'investissement, M&A, sociétés de gestion, conseil). Elle conseille et implémente des solutions CRM, d'automatisation et d'IA, en partant d'une méthodologie de diagnostic centrée sur le ROI.",
    address: { '@type': 'PostalAddress', addressLocality: 'Paris', addressCountry: 'FR' },
    vatID: 'FR32939716833',
    identifier: { '@type': 'PropertyValue', propertyID: 'SIREN', value: '939716833' },
    areaServed: 'FR',
    sameAs: [LINKEDIN_URL],
    memberOf: {
      '@type': 'Organization',
      name: 'HubSpot Solutions Partner Program',
      url: 'https://ecosystem.hubspot.com/fr/marketplace/solutions/luphy',
    },
    ...(fondateurs.length > 0 && { founder: fondateurs.map(m => personJsonLd(m)) }),
  }

  const webpage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: url ?? SITE_URL,
    isPartOf: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'fr',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      {type === 'website' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webpage) }}
        />
      )}
    </>
  )
}
