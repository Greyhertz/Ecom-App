import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: ['/admin/', '/cart/', '/orders/'],
    },
    // Change this line to your live URL:
    sitemap: 'https://shelfmark-seven.vercel.app/sitemap.xml',
  }
}