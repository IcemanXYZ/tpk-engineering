import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Wrench,
  LayoutDashboard,
  Package,
  ClipboardCheck,
  Pickaxe,
  Wheat,
  HardHat,
  ShoppingCart,
  Flame,
  TrendingUp,
  CheckCircle,
  Zap,
  Globe,
  Shield,
} from 'lucide-react'
import { HeroSection } from '@/components/sections/HeroSection'
import { StatsBar } from '@/components/sections/StatsBar'
import { ProductCard } from '@/components/sections/ProductCard'
import { CaseStudyCard } from '@/components/sections/CaseStudyCard'
import { TestimonialSlider } from '@/components/sections/TestimonialSlider'
import { LogoCloud } from '@/components/sections/LogoCloud'
import { CTASection } from '@/components/sections/CTASection'
import { getFeaturedProducts } from '@/lib/data/products'
import { getFeaturedCaseStudies } from '@/lib/data/case-studies'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
}

const services = [
  {
    icon: Wrench,
    name: 'Maintenance & Repairs',
    description: '24/7 breakdown response. Mobile workshops deployed across Zimbabwe, Zambia and Mozambique corridors.',
    href: '/services/maintenance-repairs',
  },
  {
    icon: LayoutDashboard,
    name: 'Fleet Management',
    description: 'Digital asset tracking, scheduled maintenance alerts, and roadworthy reminders — all in one portal.',
    href: '/services/fleet-management',
  },
  {
    icon: Package,
    name: 'Genuine Parts',
    description: 'OEM-spec replacement parts dispatched same-day from our Harare and Bulawayo warehouses.',
    href: '/services/parts-accessories',
  },
  {
    icon: ClipboardCheck,
    name: 'Roadworthy Inspections',
    description: 'ZINARA-certified pre-clearance roadworthy inspections at our facility or your yard.',
    href: '/services/roadworthy-inspections',
  },
]

const industries = [
  { icon: Pickaxe, label: 'Mining', href: '/solutions/mining', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  { icon: Wheat, label: 'Agriculture', href: '/solutions/agriculture', color: 'bg-green-50 text-green-600 border-green-100' },
  { icon: HardHat, label: 'Construction', href: '/solutions/construction', color: 'bg-orange-50 text-orange-600 border-orange-100' },
  { icon: ShoppingCart, label: 'Retail / FMCG', href: '/solutions/retail-fmcg', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { icon: Flame, label: 'Fuel & Chemicals', href: '/solutions/fuel-chemicals', color: 'bg-red-50 text-red-600 border-red-100' },
]

const whyTPK = [
  {
    icon: Shield,
    title: 'Built for African Conditions',
    body: 'Every trailer is designed around the unique demands of sub-Saharan Africa\'s roads — from D-class farm tracks to mine haul roads. Reinforced suspensions, protective coatings, and locally-sourced components for fast field repairs.',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=75',
  },
  {
    icon: Globe,
    title: 'Pan-Africa Service Network',
    body: 'Service centres and mobile workshops operate in Zimbabwe, Zambia, Mozambique, and Botswana. Genuine parts dispatched to any depot within 48 hours. 24/7 breakdown line staffed by qualified engineers.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75',
  },
  {
    icon: Zap,
    title: 'Engineering-Led Innovation',
    body: 'Our in-house engineering team uses SolidWorks FEA simulation to validate every new design. From Hardox wear-steel selection to hydraulic cylinder sizing — nothing leaves our factory without data behind it.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=75',
  },
]

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()
  const featuredCaseStudies = getFeaturedCaseStudies()

  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Stats */}
      <StatsBar />

      {/* 3. Product categories */}
      <section className="section-padding bg-white" aria-labelledby="products-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
                Our Products
              </p>
              <h2
                id="products-heading"
                className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
              >
                The Full Trailer Range
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden items-center gap-2 text-sm font-semibold text-primary hover:text-primary-light sm:flex"
            >
              View all products <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              View all products <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Why TPK — alternating feature highlight */}
      <section className="section-padding bg-slate-50" aria-labelledby="why-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Why TPK Engineering
            </p>
            <h2
              id="why-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            >
              The TPK Difference
            </h2>
          </div>

          <div className="space-y-20">
            {whyTPK.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className={`flex flex-col items-center gap-10 lg:flex-row ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className="w-full lg:w-1/2">
                    <div className="overflow-hidden rounded-3xl shadow-xl">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={600}
                        height={400}
                        className="w-full object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <h3 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-lg leading-relaxed text-slate-600">{item.body}</p>
                    <Link
                      href="/about"
                      className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:gap-3 transition-all"
                    >
                      Learn more <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. Industry solutions */}
      <section className="section-padding bg-white" aria-labelledby="industries-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Industry Solutions
            </p>
            <h2
              id="industries-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            >
              Built for Every Sector
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-slate-500">
              Whether you're hauling platinum ore in the Midlands or chilled FMCG along the Beira
              corridor — TPK has the trailer and the expertise.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {industries.map(({ icon: Icon, label, href, color }) => (
              <Link
                key={href}
                href={href}
                className={`group flex flex-col items-center gap-3 rounded-2xl border p-6 text-center transition-all hover:-translate-y-1 hover:shadow-card-hover ${color}`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Icon size={22} />
                </div>
                <span className="text-sm font-semibold">{label}</span>
                <ArrowRight
                  size={14}
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Featured case study */}
      {featuredCaseStudies[0] && (
        <section className="section-padding bg-slate-50" aria-labelledby="case-study-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
                  Case Studies
                </p>
                <h2
                  id="case-study-heading"
                  className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
                >
                  Proven in the Field
                </h2>
              </div>
              <Link
                href="/case-studies"
                className="hidden items-center gap-2 text-sm font-semibold text-primary sm:flex"
              >
                All case studies <ArrowRight size={14} />
              </Link>
            </div>
            <CaseStudyCard caseStudy={featuredCaseStudies[0]} featured />
            {featuredCaseStudies.length > 1 && (
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredCaseStudies.slice(1).map((cs) => (
                  <CaseStudyCard key={cs.id} caseStudy={cs} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 7. Services */}
      <section className="section-padding bg-white" aria-labelledby="services-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              After-Sales
            </p>
            <h2
              id="services-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            >
              We're There After the Sale
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-slate-500">
              A TPK trailer is supported for its full operational life. From breakdown response to
              scheduled maintenance — we keep your fleet earning.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, name, description, href }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary/20 hover:shadow-card-hover"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/8 transition-colors group-hover:bg-primary">
                  <Icon size={20} className="text-primary transition-colors group-hover:text-white" />
                </div>
                <h3 className="mt-4 font-bold text-slate-900">{name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{description}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary">
                  Learn more <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Fleet management callout */}
      <section className="bg-primary section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
                Fleet Portal
              </p>
              <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                Manage Your Entire Fleet
                <br />
                in One Dashboard
              </h2>
              <p className="mt-4 text-lg text-white/70">
                Register your TPK assets, track service history, receive maintenance reminders,
                and download warranty certificates — all from a single login.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Instant roadworthy status alerts',
                  'Service history and next-service reminders',
                  'Document vault: warranties, certs, invoices',
                  'Online service request logging',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/80">
                    <CheckCircle size={16} className="shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex gap-3">
                <Link
                  href="/fleet-portal"
                  className="inline-flex items-center gap-2 rounded-xl bg-secondary px-6 py-3 font-semibold text-white hover:bg-secondary-dark transition-colors"
                >
                  Access Fleet Portal <ArrowRight size={16} />
                </Link>
                <Link
                  href="/services/fleet-management"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-white/25 px-6 py-3 font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              {/* Mock dashboard */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-white/80">Fleet Overview</span>
                  <span className="rounded-full bg-accent/20 px-2.5 py-1 text-xs font-semibold text-accent">
                    Live
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Total Assets', value: '48' },
                    { label: 'Operational', value: '44' },
                    { label: 'In Service', value: '4' },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl bg-white/10 p-4 text-center">
                      <div className="text-2xl font-bold text-white">{item.value}</div>
                      <div className="text-xs text-white/60">{item.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    { id: 'ZW 123 ABC', model: 'Flatbed 3-axle', status: 'Operational', dot: 'bg-accent' },
                    { id: 'ZW 456 DEF', model: 'Side-Tipper', status: 'Service Due', dot: 'bg-amber-400' },
                    { id: 'ZW 789 GHI', model: 'Reefer 3-axle', status: 'Operational', dot: 'bg-accent' },
                  ].map((asset) => (
                    <div
                      key={asset.id}
                      className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2.5"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`h-2 w-2 rounded-full ${asset.dot}`} />
                        <div>
                          <p className="text-xs font-semibold text-white/90">{asset.id}</p>
                          <p className="text-2xs text-white/50">{asset.model}</p>
                        </div>
                      </div>
                      <span className="text-2xs text-white/60">{asset.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Testimonials */}
      <TestimonialSlider />

      {/* 10. Logo cloud */}
      <LogoCloud />

      {/* 11. Final CTA */}
      <CTASection />
    </>
  )
}
