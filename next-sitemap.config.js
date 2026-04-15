/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://tpkengineering.co.zw',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/fleet-portal/' },
      { userAgent: '*', disallow: '/api/' },
    ],
  },
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    const priorities = {
      '/': 1.0,
      '/products': 0.9,
      '/services': 0.8,
      '/case-studies': 0.8,
      '/about': 0.7,
      '/contact': 0.7,
      '/quote': 0.9,
    }
    const isProductPage = path.startsWith('/products/')
    const isCaseStudy = path.startsWith('/case-studies/')

    return {
      loc: path,
      changefreq: isProductPage ? 'weekly' : isCaseStudy ? 'monthly' : 'weekly',
      priority: priorities[path] ?? (isProductPage ? 0.85 : 0.7),
      lastmod: new Date().toISOString(),
    }
  },
}

module.exports = config
