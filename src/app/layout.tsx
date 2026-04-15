import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { siteConfig } from '@/lib/config'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'trailer manufacturer Zimbabwe',
    'flatbed trailer',
    'curtainsider trailer',
    'refrigerated trailer',
    'mining trailer Zimbabwe',
    'tipper trailer',
    'TPK Engineering',
    'trailer manufacturing Africa',
    'fleet management trailers',
  ],
  authors: [{ name: 'TPK Engineering' }],
  creator: 'TPK Engineering',
  publisher: 'TPK Engineering',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZW',
    alternateLocale: ['en_ZA', 'en_GB'],
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ['/og-default.jpg'],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  verification: {
    google: 'google-site-verification-token',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1E3A5F' },
    { media: '(prefers-color-scheme: dark)', color: '#1E3A5F' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZW" className={inter.variable}>
      <body>
        {/* Skip navigation for a11y */}
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>

        {/* Organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: siteConfig.name,
              url: siteConfig.url,
              logo: `${siteConfig.url}/logo.png`,
              description: siteConfig.description,
              telephone: siteConfig.phone,
              email: siteConfig.email,
              address: {
                '@type': 'PostalAddress',
                streetAddress: siteConfig.address.street,
                addressLocality: siteConfig.address.city,
                addressRegion: siteConfig.address.province,
                addressCountry: 'ZW',
              },
              sameAs: [siteConfig.social.linkedin, siteConfig.social.facebook].filter(Boolean),
            }),
          }}
        />

        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
