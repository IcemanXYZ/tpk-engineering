import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { IndustryBadge } from '@/components/ui/Badge'
import { formatDate, truncate } from '@/lib/utils'
import type { CaseStudy } from '@/types'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
  featured?: boolean
}

export function CaseStudyCard({ caseStudy, featured = false }: CaseStudyCardProps) {
  if (featured) {
    return (
      <article className="group grid overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card hover:shadow-card-hover transition-all md:grid-cols-2">
        <div className="relative overflow-hidden bg-slate-100">
          <Image
            src={caseStudy.heroImage}
            alt={`${caseStudy.title} — TPK Engineering case study`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <IndustryBadge industry={caseStudy.industry} />
          </div>
        </div>
        <div className="flex flex-col justify-between p-8 lg:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Case Study · {formatDate(caseStudy.publishedAt)}
            </p>
            <h3 className="mt-3 text-2xl font-bold leading-snug text-slate-900 group-hover:text-primary transition-colors">
              {caseStudy.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-slate-500">
              {truncate(caseStudy.summary, 180)}
            </p>

            {/* Key results */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {caseStudy.results.slice(0, 3).map((result) => (
                <div key={result.label} className="rounded-xl bg-slate-50 p-3 text-center">
                  <div className="text-xl font-bold text-primary">{result.value}</div>
                  <div className="text-xs text-slate-500 leading-tight mt-0.5">{result.unit}</div>
                  {result.improvement && (
                    <div className="mt-1 flex items-center justify-center gap-0.5 text-2xs font-medium text-accent">
                      <TrendingUp size={10} />
                      <span className="line-clamp-1">{result.improvement}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <Link
              href={`/case-studies/${caseStudy.slug}`}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
            >
              Read Full Case Study <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative h-48 overflow-hidden bg-slate-50">
        <Image
          src={caseStudy.heroImage}
          alt={caseStudy.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute bottom-3 left-3">
          <IndustryBadge industry={caseStudy.industry} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs text-slate-400">{caseStudy.client}</p>
        <h3 className="mt-1.5 line-clamp-2 text-base font-bold text-slate-900 group-hover:text-primary transition-colors">
          {caseStudy.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-500">
          {caseStudy.summary}
        </p>

        {/* 2 top metrics */}
        <div className="mt-4 flex gap-3">
          {caseStudy.results.slice(0, 2).map((result) => (
            <div key={result.label} className="flex-1 rounded-lg bg-slate-50 px-3 py-2">
              <div className="text-lg font-bold text-primary">
                {result.value}
                <span className="text-xs font-normal text-slate-400"> {result.unit}</span>
              </div>
              <div className="text-2xs text-slate-500">{result.label}</div>
            </div>
          ))}
        </div>

        <Link
          href={`/case-studies/${caseStudy.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
        >
          Read Case Study <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  )
}
