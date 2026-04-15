import type { Metadata } from 'next'
import { ProductCard } from '@/components/sections/ProductCard'
import { products } from '@/lib/data/products'
import { CTASection } from '@/components/sections/CTASection'
import { getCategoryLabel, getIndustryLabel } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Trailer Catalogue',
  description:
    'Browse the full TPK Engineering trailer catalogue — flatbed, curtainsider, refrigerated, tanker, lowbed, tipper and custom trailers. Serving Africa since 1989.',
  alternates: { canonical: 'https://tpkengineering.co.zw/products' },
}

const categories = ['all', 'flatbed', 'curtainsider', 'refrigerated', 'tanker', 'lowbed', 'tipper', 'side-tipper', 'custom']

export default function ProductsPage() {
  return (
    <>
      {/* Page hero */}
      <section className="border-b border-slate-100 bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-slate-500">
              <li><a href="/" className="hover:text-primary">Home</a></li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-slate-900" aria-current="page">Products</li>
            </ol>
          </nav>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Trailer Catalogue
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Every trailer in our range is manufactured to ISO 9001:2015 standards at our
            Harare factory. Browse specs, download data sheets, and request a quote.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category filter tabs */}
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <span
                key={cat}
                className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-600 hover:border-primary hover:text-primary transition-colors first:bg-primary first:text-white first:border-primary"
              >
                {cat === 'all' ? 'All Products' : getCategoryLabel(cat)}
              </span>
            ))}
          </div>

          {/* Results count */}
          <p className="mb-6 text-sm text-slate-500">{products.length} products</p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* JSON-LD ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'TPK Engineering Trailer Catalogue',
            numberOfItems: products.length,
            itemListElement: products.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: p.name,
              url: `https://tpkengineering.co.zw/products/${p.slug}`,
            })),
          }),
        }}
      />

      <CTASection
        title="Can't find what you need?"
        subtitle="Our engineering team designs custom trailers for unique applications. Tell us what you need."
        primaryCta={{ label: 'Discuss Custom Solution', href: '/quote' }}
        secondaryCta={{ label: 'Talk to an Engineer', href: '/contact' }}
        variant="light"
      />
    </>
  )
}
