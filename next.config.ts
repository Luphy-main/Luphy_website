import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Pages principales
      { source: '/crm', destination: '/performance-commerciale/crm', permanent: true },
      { source: '/ia-automation', destination: '/performance-operationnelle/ia', permanent: true },
      { source: '/outbound', destination: '/performance-commerciale/outbound', permanent: true },
      { source: '/team', destination: '/equipe', permanent: true },
      { source: '/blog', destination: '/ressources', permanent: true },
      // Articles blog
      { source: '/blog-crm-fonds-2026', destination: '/ressources/crm-fonds-2026', permanent: true },
      { source: '/blog-ia-ma-2026', destination: '/ressources/ia-ma-2026', permanent: true },
      // Études de cas
      { source: '/case-study-allyum', destination: '/cas-clients/allyum', permanent: true },
      { source: '/case-study-fundora', destination: '/cas-clients/fundora', permanent: true },
      { source: '/case-study-hoppi', destination: '/cas-clients/hoppi', permanent: true },
      // Versions .html (cleanUrls désactivé en Next.js)
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/crm.html', destination: '/performance-commerciale/crm', permanent: true },
      { source: '/ia-automation.html', destination: '/performance-operationnelle/ia', permanent: true },
      { source: '/outbound.html', destination: '/performance-commerciale/outbound', permanent: true },
      { source: '/team.html', destination: '/equipe', permanent: true },
      { source: '/blog.html', destination: '/ressources', permanent: true },
      { source: '/blog-crm-fonds-2026.html', destination: '/ressources/crm-fonds-2026', permanent: true },
      { source: '/blog-ia-ma-2026.html', destination: '/ressources/ia-ma-2026', permanent: true },
      { source: '/case-study-allyum.html', destination: '/cas-clients/allyum', permanent: true },
      { source: '/case-study-fundora.html', destination: '/cas-clients/fundora', permanent: true },
      { source: '/case-study-hoppi.html', destination: '/cas-clients/hoppi', permanent: true },
      { source: '/cas-clients.html', destination: '/cas-clients', permanent: true },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
