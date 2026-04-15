import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { siteConfig } from '@/lib/config'

interface CTASectionProps {
  title?: string
  subtitle?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  variant?: 'primary' | 'light' | 'dark'
}

export function CTASection({
  title = 'Ready to spec your next trailer?',
  subtitle = 'Talk to a TPK applications engineer. No obligation — we just love solving hard problems.',
  primaryCta = { label: 'Request a Quote', href: '/quote' },
  secondaryCta = { label: 'Talk to an Engineer', href: '/contact' },
  variant = 'primary',
}: CTASectionProps) {
  const wrapperClass =
    variant === 'primary'
      ? 'bg-primary'
      : variant === 'dark'
        ? 'bg-slate-900'
        : 'bg-slate-50 border-y border-slate-100'

  const titleClass =
    variant === 'light' ? 'text-slate-900' : 'text-white'

  const subtitleClass =
    variant === 'light' ? 'text-slate-600' : 'text-white/70'

  return (
    <section className={wrapperClass} aria-label="Call to action">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="max-w-2xl">
            <h2 className={`text-3xl font-bold sm:text-4xl ${titleClass}`}>{title}</h2>
            <p className={`mt-3 text-lg ${subtitleClass}`}>{subtitle}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center gap-2 rounded-2xl bg-secondary px-7 py-3.5 font-semibold text-white shadow-secondary/25 shadow-lg hover:bg-secondary-dark transition-all"
            >
              {primaryCta.label} <ArrowRight size={16} />
            </Link>
            <Link
              href={secondaryCta.href}
              className={`inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 font-semibold transition-all ${
                variant === 'light'
                  ? 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                  : 'border-2 border-white/25 text-white hover:border-white/50 hover:bg-white/10'
              }`}
            >
              {secondaryCta.label}
            </Link>
          </div>
        </div>

        {/* Emergency line */}
        <div className={`mt-8 flex items-center justify-center gap-2 text-sm ${subtitleClass}`}>
          <Phone size={14} />
          <span>24/7 emergency breakdown support: </span>
          <a
            href={`tel:${siteConfig.emergencyPhone}`}
            className={`font-bold ${variant === 'light' ? 'text-secondary' : 'text-secondary-light'} hover:underline`}
          >
            {siteConfig.emergencyPhone}
          </a>
        </div>
      </div>
    </section>
  )
}
