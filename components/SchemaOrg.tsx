import { SITE_URL, SITE_NAME, LINKEDIN_URL } from '@/lib/constants'

interface SchemaOrgProps {
  type?: 'website' | 'article'
  title?: string
  description?: string
  url?: string
}

export default function SchemaOrg({ type = 'website', url }: SchemaOrgProps) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/brand-assets/Luphy_White_Logo.png`,
    description:
      "Luphy est une agence de performance digitale basée à Paris, spécialisée dans la finance (fonds d'investissement, M&A, sociétés de gestion, conseil). Elle conseille et implémente des solutions CRM, d'automatisation et d'IA, en partant d'une méthodologie de diagnostic centrée sur le ROI.",
    address: { '@type': 'PostalAddress', addressLocality: 'Paris', addressCountry: 'FR' },
    areaServed: 'FR',
    sameAs: [LINKEDIN_URL],
    founder: [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#titouan-galpin`,
        name: 'Titouan Galpin',
        jobTitle: 'Co-fondateur',
        worksFor: { '@id': `${SITE_URL}/#organization` },
        sameAs: 'https://www.linkedin.com/in/titouan-galpin/',
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#tristan-camilli`,
        name: 'Tristan Camilli',
        jobTitle: 'Co-fondateur & Président',
        worksFor: { '@id': `${SITE_URL}/#organization` },
        alumniOf: ['INSA Toulouse', 'ESCP'],
        sameAs: 'https://www.linkedin.com/in/tristan-camilli/',
      },
    ],
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
