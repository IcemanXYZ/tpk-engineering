import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Award, Users, Globe, Factory } from 'lucide-react'
import { CTASection } from '@/components/sections/CTASection'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'About TPK Engineering',
  description:
    "TPK Engineering's story: 35+ years manufacturing precision trailers in Zimbabwe. ISO 9001 certified, ZINARA approved. Meet the team and learn our history.",
  alternates: { canonical: 'https://tpkengineering.co.zw/about' },
}

const milestones = [
  { year: '1989', title: 'Founded', body: 'TPK Engineering established in Harare by Thomas Peter Khumalo with a 3-man team building flatbed trailers.' },
  { year: '1997', title: 'ISO Certification', body: 'Achieved ISO 9001 certification — the first trailer manufacturer in Zimbabwe to do so.' },
  { year: '2004', title: 'Factory Expansion', body: 'Doubled factory capacity to 4,000 m² and launched the refrigerated trailer product line.' },
  { year: '2010', title: 'Regional Expansion', body: 'Opened service centres in Bulawayo and Lusaka, Zambia. Service network now spans 3 countries.' },
  { year: '2016', title: 'Engineering Lab', body: 'Invested in SolidWorks CAD and FEA simulation capability. First custom-engineered lowbed designed in-house.' },
  { year: '2019', title: '30th Anniversary', body: 'Celebrated 30 years with 10,000th trailer rolling off the production line. Fleet portal launched.' },
  { year: '2024', title: 'Today', body: '12,000+ trailers built. 500+ active clients. Pan-Africa service network serving 14 countries.' },
]

const values = [
  { icon: Award, title: 'Engineering Excellence', body: 'We do not compromise on material specifications or build quality. Every trailer is built to outlast industry expectations.' },
  { icon: Users, title: 'Customer Partnership', body: 'Our engineers work alongside your operations team. We solve your specific problem — not a generic version of it.' },
  { icon: Globe, title: 'African Context', body: 'Built for sub-Saharan Africa\'s roads, climate and operating conditions. Designed with local repair capability in mind.' },
  { icon: Factory, title: 'Local Manufacturing', body: 'Proudly manufactured in Zimbabwe. We employ 180+ Zimbabweans and invest in skills development and apprenticeships.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-24">
        <div className="absolute inset-0 bg-hero-pattern opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-white/60">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li aria-hidden>/</li>
              <li className="text-white/90" aria-current="page">About</li>
            </ol>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              35 Years Building
              <br />
              <span className="text-secondary">Africa's Roads Forward</span>
            </h1>
            <p className="mt-6 text-xl text-white/70">
              TPK Engineering was founded on a simple belief: that trailers built for African
              conditions, by people who understand those conditions, will always outperform
              imported alternatives.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
                Our Mission
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                Engineering Trailers That Earn Their Keep
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                We measure success not at the point of sale, but at the end of a trailer's
                operational life. When a customer returns to order their next fleet — that's the
                signal that we've done our job.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Our 35-year journey is built on that philosophy: engineer honestly, support
                completely, and earn trust through performance rather than promises.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80"
                alt="TPK Engineering factory floor"
                width={700}
                height={467}
                className="w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 py-20" id="values">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Our Values
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl bg-white p-7 shadow-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon size={22} className="text-primary" />
                </div>
                <h3 className="mt-4 font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History timeline */}
      <section className="bg-white py-20" id="history">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Our Story
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              35 Years in the Making
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 h-full w-px bg-slate-100 sm:left-1/2" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative flex gap-6 sm:gap-0 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                >
                  {/* Year dot */}
                  <div className="absolute left-6 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-secondary text-2xs font-bold text-white sm:left-1/2">
                    <span className="sr-only">{m.year}</span>
                  </div>

                  <div className={`pl-14 sm:w-1/2 sm:pl-0 ${i % 2 === 0 ? 'sm:pr-14' : 'sm:pl-14'}`}>
                    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card">
                      <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                        {m.year}
                      </span>
                      <h3 className="mt-1 font-bold text-slate-900">{m.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{m.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="border-y border-slate-100 bg-slate-50 py-16" id="certifications">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900">Certifications & Standards</h2>
            <p className="mt-2 text-slate-500">
              Every TPK trailer is manufactured to documented quality standards.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {siteConfig.certifications.map((cert) => (
              <div key={cert} className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <div>
                  <Award size={28} className="mx-auto text-primary mb-2" />
                  <p className="font-bold text-slate-900 text-sm">{cert}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection variant="light" />
    </>
  )
}
