import Link from 'next/link'
import { Phone, Mail, MapPin, Linkedin, Facebook, MessageCircle, ArrowRight } from 'lucide-react'
import { siteConfig } from '@/lib/config'

const footerLinks = {
  Products: [
    { label: 'Flatbed Trailers', href: '/products/flatbed-trailers' },
    { label: 'Curtainsider Trailers', href: '/products/curtainsider-trailers' },
    { label: 'Refrigerated Trailers', href: '/products/refrigerated-trailers' },
    { label: 'Tanker Trailers', href: '/products/tanker-trailers' },
    { label: 'Lowbed Trailers', href: '/products/lowbed-trailers' },
    { label: 'Tipper Trailers', href: '/products/tipper-trailers' },
    { label: 'Side-Tipper Trailers', href: '/products/side-tipper-trailers' },
    { label: 'Custom Solutions', href: '/products/custom-solutions' },
  ],
  Services: [
    { label: 'Maintenance & Repairs', href: '/services/maintenance-repairs' },
    { label: 'Fleet Management', href: '/services/fleet-management' },
    { label: 'Parts & Accessories', href: '/services/parts-accessories' },
    { label: 'Roadworthy Inspections', href: '/services/roadworthy-inspections' },
    { label: 'Warranty Support', href: '/services/warranty-support' },
  ],
  Company: [
    { label: 'About TPK', href: '/about' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Industry Solutions', href: '/solutions' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Request a Quote', href: '/quote' },
    { label: 'Service Request', href: '/service-request' },
  ],
}

const certifications = [
  { label: 'ISO 9001:2015', color: 'bg-blue-50 text-blue-700 border-blue-100' },
  { label: 'SABS Certified', color: 'bg-green-50 text-green-700 border-green-100' },
  { label: 'ZINARA Approved', color: 'bg-amber-50 text-amber-700 border-amber-100' },
  { label: 'SAE Compliant', color: 'bg-slate-50 text-slate-700 border-slate-100' },
]

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* CTA band */}
      <div className="bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Ready to spec your next trailer?
              </h2>
              <p className="mt-2 text-primary-100 text-white/70">
                Talk to a TPK applications engineer today — no obligation.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 rounded-xl bg-secondary px-6 py-3 font-semibold text-white shadow-lg hover:bg-secondary-dark transition-colors"
              >
                Get a Quote <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20 transition-colors"
              >
                Talk to an Engineer
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-bold text-lg shrink-0">
                T
              </div>
              <div>
                <div className="text-lg font-bold text-white">TPK Engineering</div>
                <div className="text-2xs font-medium uppercase tracking-widest text-slate-500">
                  Trailer Manufacturers
                </div>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 max-w-xs">
              Engineering Africa's roads forward since 1989. Precision-built trailers trusted by
              the continent's leading mining, agricultural and logistics companies.
            </p>

            {/* Certifications */}
            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                Certifications
              </p>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <span
                    key={cert.label}
                    className={`rounded-full border px-2.5 py-1 text-2xs font-semibold ${cert.color}`}
                  >
                    {cert.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="mt-6 flex items-center gap-3">
              {siteConfig.social.linkedin && (
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TPK Engineering on LinkedIn"
                  className="rounded-lg bg-slate-800 p-2 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <Linkedin size={16} />
                </a>
              )}
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TPK Engineering on Facebook"
                  className="rounded-lg bg-slate-800 p-2 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <Facebook size={16} />
                </a>
              )}
              {siteConfig.social.whatsapp && (
                <a
                  href={siteConfig.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with TPK on WhatsApp"
                  className="rounded-lg bg-slate-800 p-2 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <MessageCircle size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
                {heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact row */}
        <div className="mt-12 rounded-2xl bg-slate-800/50 p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-3 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-700 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                <Phone size={15} />
              </div>
              <div>
                <p className="text-2xs text-slate-500 uppercase tracking-wide">Call us</p>
                <p className="text-sm font-medium text-slate-200">{siteConfig.phone}</p>
              </div>
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-700 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                <Mail size={15} />
              </div>
              <div>
                <p className="text-2xs text-slate-500 uppercase tracking-wide">Email us</p>
                <p className="text-sm font-medium text-slate-200">{siteConfig.email}</p>
              </div>
            </a>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-700 text-secondary">
                <MapPin size={15} />
              </div>
              <div>
                <p className="text-2xs text-slate-500 uppercase tracking-wide">Visit us</p>
                <p className="text-sm font-medium text-slate-200">{siteConfig.address.street}, {siteConfig.address.city}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-8 sm:flex-row">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} TPK Engineering (Pvt) Ltd. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-600">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms of Use</Link>
            <Link href="/sitemap.xml" className="hover:text-slate-400 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
