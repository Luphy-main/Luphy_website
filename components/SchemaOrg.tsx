import { SITE_URL, SITE_NAME, LINKEDIN_URL, DEFINITION_LUPHY, HUBSPOT_MARKETPLACE_URL } from '@/lib/constants'
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
    description: DEFINITION_LUPHY,
    foundingDate: '2025',
    foundingLocation: { '@type': 'Place', name: 'Paris' },
    address: { '@type': 'PostalAddress', addressLocality: 'Paris', addressCountry: 'FR' },
    vatID: 'FR32939716833',
    identifier: { '@type': 'PropertyValue', propertyID: 'SIREN', value: '939716833' },
    areaServed: 'FR',
    sameAs: [LINKEDIN_URL],
    memberOf: {
      '@type': 'Organization',
      name: 'HubSpot Solutions Partner Program',
      url: HUBSPOT_MARKETPLACE_URL,
    },
    ...(fondateurs.length > 0 && { founder: fondateurs.map(m => personJsonLd(m, m.titreOfficiel ?? m.fonction)) }),
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
