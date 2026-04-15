import type { Metadata } from 'next'
import { CaseStudyCard } from '@/components/sections/CaseStudyCard'
import { caseStudies } from '@/lib/data/case-studies'
import { CTASection } from '@/components/sections/CTASection'
import { getIndustryLabel } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    "Real-world proof: how TPK Engineering trailers perform in Africa's toughest mining, agriculture and logistics operations. Read our case studies.",
  alternates: { canonical: 'https://tpkengineering.co.zw/case-studies' },
}

const industries = ['all', 'mining', 'agriculture', 'construction', 'retail-fmcg', 'fuel-chemicals']

export default function CaseStudiesPage() {
  const featured = caseStudies.filter((cs) => cs.featured)
  const rest = caseStudies.filter((cs) => !cs.featured)

  return (
    <>
      {/* Hero */}
      <section className="border-b border-slate-100 bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-slate-500">
              <li><a href="/" className="hover:text-primary">Home</a></li>
              <li aria-hidden>/</li>
              <li className="font-medium text-slate-900" aria-current="page">Case Studies</li>
            </ol>
          </nav>
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
            Proven Performance
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Results in the Field
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Every claim we make is backed by a real customer outcome. Browse our case studies by
            industry to see how TPK Engineering solves the problems that matter.
          </p>
        </div>
      </section>

      {/* Filter */}
      <div className="border-b border-slate-100 bg-white px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2">
            {industries.map((ind) => (
              <span
                key={ind}
                className="cursor-pointer rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-600 hover:border-primary hover:text-primary transition-colors first:bg-primary first:text-white first:border-primary"
              >
                {ind === 'all' ? 'All Industries' : getIndustryLabel(ind)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Featured case studies */}
      {featured.length > 0 && (
        <section className="section-padding bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-bold text-slate-900">Featured</h2>
            <div className="space-y-8">
              {featured.map((cs) => (
                <CaseStudyCard key={cs.id} caseStudy={cs} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All case studies */}
      {rest.length > 0 && (
        <section className="border-t border-slate-100 bg-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-bold text-slate-900">More Case Studies</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((cs) => (
                <CaseStudyCard key={cs.id} caseStudy={cs} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title="Want results like these?"
        subtitle="Let our team understand your application and build a solution that performs."
        variant="light"
      />
    </>
  )
}
