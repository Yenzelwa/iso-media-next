import type { MetadataRoute } from 'next'

const site = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '/',
    '/browse/',
    '/series/',
    '/documentary/',
    '/about-us/',
    '/contact-us/',
    '/faqs/',
    '/privacy-policy/',
    '/terms-conditions/',
  ]

  const now = new Date().toISOString()

  return routes.map((path) => ({
    url: `${site}${path.startsWith('/') ? '' : '/'}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.7,
  }))
}

