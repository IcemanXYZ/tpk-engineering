import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Download, ArrowRight, CheckCircle, Clock, Package } from 'lucide-react'
import { getProductBySlug, products, getRelatedProducts } from '@/lib/data/products'
import { ProductCard } from '@/components/sections/ProductCard'
import { Badge, StockBadge, IndustryBadge } from '@/components/ui/Badge'
import { getCategoryLabel } from '@/lib/utils'
import { CTASection } from '@/components/sections/CTASection'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return {
    title: product.seoTitle,
    description: product.seoDescription,
    alternates: { canonical: `https://tpkengineering.co.zw/products/${product.slug}` },
    openGraph: {
      title: product.seoTitle,
      description: product.seoDescription,
      images: [{ url: product.heroImage, width: 1200, height: 630 }],
    },
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = getRelatedProducts(product.relatedProductSlugs)

  const specRows = [
    ['Payload', product.specifications.payload],
    ['Deck Length', product.specifications.deckLength],
    ['Deck Width', product.specifications.deckWidth],
    product.specifications.deckHeight && ['Deck / Body Height', product.specifications.deckHeight],
    ['Axles', String(product.specifications.axles)],
    ['Suspension', product.specifications.suspension],
    product.specifications.kingpinHeight && ['Kingpin Height', product.specifications.kingpinHeight],
    ['Tare Weight', product.specifications.tareWeight],
    ['Brake System', product.specifications.brakeSystem],
    product.specifications.tyreSizeAxle && ['Tyre Size', product.specifications.tyreSizeAxle],
    product.specifications.bodyMaterial && ['Body Material', product.specifications.bodyMaterial],
  ].filter(Boolean) as [string, string][]

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-slate-100 bg-slate-50 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-slate-500">
              <li><a href="/" className="hover:text-primary">Home</a></li>
              <li aria-hidden>/</li>
              <li><a href="/products" className="hover:text-primary">Products</a></li>
              <li aria-hidden>/</li>
              <li className="font-medium text-slate-900" aria-current="page">{product.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product hero */}
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-slate-100">
                <Image
                  src={product.heroImage}
                  alt={`${product.name} — TPK Engineering`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {product.gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.gallery.map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-square overflow-hidden rounded-xl bg-slate-100 ring-2 ring-transparent hover:ring-primary cursor-pointer transition-all"
                    >
                      <Image
                        src={img}
                        alt={`${product.name} view ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="primary">{getCategoryLabel(product.category)}</Badge>
                <StockBadge inStock={product.inStock} />
                {product.certifications.map((cert) => (
                  <Badge key={cert} variant="outline" size="sm">{cert}</Badge>
                ))}
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-2 text-lg font-medium text-secondary">{product.tagline}</p>
              <p className="mt-4 leading-relaxed text-slate-600">{product.description}</p>

              {/* Key spec pills */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl bg-slate-50 p-3 text-center">
                  <p className="text-2xs font-medium uppercase tracking-wide text-slate-400">Payload</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">{product.specifications.payload}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 text-center">
                  <p className="text-2xs font-medium uppercase tracking-wide text-slate-400">Length</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">{product.specifications.deckLength}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 text-center">
                  <p className="text-2xs font-medium uppercase tracking-wide text-slate-400">Axles</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">{product.specifications.axles}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 text-center">
                  <p className="text-2xs font-medium uppercase tracking-wide text-slate-400">Lead Time</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">{product.leadTimeDays}d</p>
                </div>
              </div>

              {/* Top features */}
              <ul className="mt-6 space-y-2">
                {product.features.slice(0, 5).map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle size={15} className="mt-0.5 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Industries */}
              <div className="mt-6 flex flex-wrap gap-2">
                {product.industries.map((ind) => (
                  <IndustryBadge key={ind} industry={ind} />
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/quote?product=${product.slug}`}
                  className="flex-1 rounded-2xl bg-secondary px-6 py-3.5 text-center font-semibold text-white shadow-secondary/20 shadow-md hover:bg-secondary-dark transition-colors"
                >
                  Request a Quote
                </Link>
                {product.documents[0] && (
                  <a
                    href={product.documents[0].url}
                    className="flex items-center justify-center gap-2 rounded-2xl border-2 border-primary px-6 py-3.5 font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <Download size={16} />
                    Download Spec Sheet
                  </a>
                )}
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                <Clock size={13} />
                <span>Estimated lead time: {product.leadTimeDays} days from order confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full specs table */}
      <section className="border-t border-slate-100 bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Technical Specifications</h2>
          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-50">
                {specRows.map(([label, value]) => (
                  <tr key={label} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-600 w-2/5">{label}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* All features */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Standard Features</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {product.features.map((feature) => (
              <div key={feature} className="flex items-start gap-3 rounded-xl bg-slate-50 px-4 py-3">
                <CheckCircle size={16} className="mt-0.5 shrink-0 text-accent" />
                <span className="text-sm text-slate-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Options */}
      {product.options.length > 0 && (
        <section className="border-t border-slate-100 bg-slate-50 py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">Options & Upgrades</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {product.options.map((option) => (
                <div key={option.id} className="rounded-2xl border border-slate-100 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">{option.name}</h3>
                    {option.priceIndicator && (
                      <Badge
                        variant={
                          option.priceIndicator === 'included'
                            ? 'success'
                            : option.priceIndicator === 'premium'
                              ? 'warning'
                              : 'outline'
                        }
                        size="sm"
                      >
                        {option.priceIndicator === 'included'
                          ? 'Std'
                          : option.priceIndicator === 'premium'
                            ? 'Premium'
                            : 'Optional'}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-slate-500">{option.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related products */}
      {related.length > 0 && (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">Related Products</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description,
            image: product.heroImage,
            brand: { '@type': 'Brand', name: 'TPK Engineering' },
            manufacturer: {
              '@type': 'Organization',
              name: 'TPK Engineering',
              url: 'https://tpkengineering.co.zw',
            },
            offers: {
              '@type': 'Offer',
              availability: product.inStock
                ? 'https://schema.org/InStock'
                : 'https://schema.org/MadeToOrder',
              areaServed: 'ZW',
              priceCurrency: 'USD',
            },
          }),
        }}
      />

      <CTASection
        title={`Ready to order your ${product.name}?`}
        subtitle="Get a detailed, no-obligation quotation from a TPK applications engineer."
        primaryCta={{ label: 'Request a Quote', href: `/quote?product=${product.slug}` }}
        secondaryCta={{ label: 'Call Us Now', href: '/contact' }}
      />
    </>
  )
}
