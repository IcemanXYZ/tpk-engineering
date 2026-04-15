import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, TrendingUp, Star, Quote } from 'lucide-react'
import { getCaseStudyBySlug, caseStudies } from '@/lib/data/case-studies'
import { IndustryBadge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import { CTASection } from '@/components/sections/CTASection'
import { ProductCard } from '@/components/sections/ProductCard'
import { getProductBySlug } from '@/lib/data/products'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cs = getCaseStudyBySlug(slug)
  if (!cs) return {}
  return {
    title: cs.title,
    description: cs.summary,
    alternates: { canonical: `https://tpkengineering.co.zw/case-studies/${cs.slug}` },
    openGraph: {
      title: cs.title,
      description: cs.summary,
      images: [{ url: cs.heroImage, width: 1200, height: 630 }],
    },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const cs = getCaseStudyBySlug(slug)
  if (!cs) notFound()

  const relatedProducts = cs.productsUsed
    .map((s) => getProductBySlug(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getProductBySlug>>[]

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-primary py-20 sm:py-28">
        <div className="absolute inset-0">
          <Image
            src={cs.heroImage}
            alt={cs.title}
            fill
            className="object-cover opacity-20"
            priority
            sizes="100vw"
          />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-white/60">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li aria-hidden>/</li>
              <li><a href="/case-studies" className="hover:text-white">Case Studies</a></li>
              <li aria-hidden>/</li>
              <li className="text-white/90" aria-current="page">{cs.client}</li>
            </ol>
          </nav>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <IndustryBadge industry={cs.industry} />
            <span className="text-sm text-white/60">{formatDate(cs.publishedAt)}</span>
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl leading-tight">
            {cs.title}
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl">{cs.summary}</p>
        </div>
      </section>

      {/* Results metrics */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-xl font-bold text-slate-900">Key Results</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {cs.results.map((result) => (
              <div key={result.label} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-center">
                <div className="text-2xl font-bold text-primary">{result.value}</div>
                {result.unit && <div className="text-xs text-slate-400">{result.unit}</div>}
                <div className="mt-1 text-xs font-medium text-slate-700">{result.label}</div>
                {result.improvement && (
                  <div className="mt-1 flex items-center justify-center gap-0.5 text-2xs font-medium text-accent">
                    <TrendingUp size={9} />
                    {result.improvement}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative */}
      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-slate prose-lg">
          <h2>The Challenge</h2>
          <p>{cs.challenge}</p>

          <h2>The Solution</h2>
          <p>{cs.solution}</p>
        </div>
      </article>

      {/* Testimonial */}
      {cs.testimonial && (
        <section className="border-y border-slate-100 bg-slate-50 py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-white p-8 shadow-card sm:p-12">
              <Quote size={32} className="text-primary/20 mb-4" />
              <blockquote className="text-xl font-medium leading-relaxed text-slate-800">
                "{cs.testimonial.quote}"
              </blockquote>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                  {cs.testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{cs.testimonial.author}</p>
                  <p className="text-sm text-slate-500">
                    {cs.testimonial.role} · {cs.testimonial.company}
                  </p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: cs.testimonial.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Products used */}
      {relatedProducts.length > 0 && (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">Products Used</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Article structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: cs.title,
            description: cs.summary,
            image: cs.heroImage,
            datePublished: cs.publishedAt,
            author: { '@type': 'Organization', name: 'TPK Engineering' },
            publisher: {
              '@type': 'Organization',
              name: 'TPK Engineering',
              logo: { '@type': 'ImageObject', url: 'https://tpkengineering.co.zw/logo.png' },
            },
          }),
        }}
      />

      <CTASection
        title="Achieve similar results"
        subtitle={`Talk to the TPK team about how we can support your ${cs.industry} operation.`}
        primaryCta={{ label: 'Request a Quote', href: `/quote?ref=case-study-${cs.slug}` }}
        secondaryCta={{ label: 'Contact Us', href: `/contact?ref=case-study-${cs.slug}` }}
      />
    </>
  )
}
