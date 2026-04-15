import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock, MessageCircle, AlertCircle } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { ContactFormClient } from '@/components/forms/ContactFormClient'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with TPK Engineering. Call, email or visit our Harare showroom. 24/7 emergency breakdown support available.',
  alternates: { canonical: 'https://tpkengineering.co.zw/contact' },
}

const offices = [
  {
    city: 'Harare (HQ)',
    address: '14 Coventry Road, Workington, Harare',
    phone: '+263 4 750 000',
    email: 'harare@tpkengineering.co.zw',
    hours: 'Mon–Fri 7:00–17:30 | Sat 7:00–12:00',
    isPrimary: true,
  },
  {
    city: 'Bulawayo',
    address: '22 Industrial Road, Belmont, Bulawayo',
    phone: '+263 9 880 000',
    email: 'bulawayo@tpkengineering.co.zw',
    hours: 'Mon–Fri 7:00–17:00',
    isPrimary: false,
  },
  {
    city: 'Lusaka (Zambia)',
    address: '5 Kafue Road, Heavy Industrial Area, Lusaka',
    phone: '+260 211 000 000',
    email: 'lusaka@tpkengineering.co.zw',
    hours: 'Mon–Fri 7:30–17:00',
    isPrimary: false,
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-slate-100 bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-slate-500">
              <li><a href="/" className="hover:text-primary">Home</a></li>
              <li aria-hidden>/</li>
              <li className="font-medium text-slate-900" aria-current="page">Contact</li>
            </ol>
          </nav>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-600">
            Sales, technical support, or just a question — we're here. Our team responds within
            24 hours.
          </p>
        </div>
      </section>

      {/* Emergency banner */}
      <div className="bg-red-50 border-b border-red-100 py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-sm">
            <AlertCircle size={16} className="text-red-600 shrink-0" />
            <span className="font-medium text-red-800">24/7 Breakdown Emergency:</span>
            <a
              href={`tel:${siteConfig.emergencyPhone}`}
              className="font-bold text-red-700 hover:underline"
            >
              {siteConfig.emergencyPhone}
            </a>
            <span className="text-red-600">— staffed by qualified engineers around the clock</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact form */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send Us a Message</h2>
            <div className="rounded-3xl bg-white p-8 shadow-card">
              <ContactFormClient />
            </div>
          </div>

          {/* Offices */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Our Offices</h2>
            {offices.map((office) => (
              <div
                key={office.city}
                className={`rounded-2xl border p-6 ${
                  office.isPrimary
                    ? 'border-primary/20 bg-primary/5'
                    : 'border-slate-100 bg-white shadow-card'
                }`}
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-slate-900">{office.city}</h3>
                  {office.isPrimary && (
                    <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-white">
                      HQ
                    </span>
                  )}
                </div>
                <div className="mt-4 space-y-2.5 text-sm">
                  <div className="flex items-start gap-2.5 text-slate-600">
                    <MapPin size={15} className="mt-0.5 shrink-0 text-secondary" />
                    {office.address}
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-600">
                    <Phone size={15} className="shrink-0 text-secondary" />
                    <a href={`tel:${office.phone}`} className="hover:text-primary font-medium">
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-600">
                    <Mail size={15} className="shrink-0 text-secondary" />
                    <a href={`mailto:${office.email}`} className="hover:text-primary">
                      {office.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-500">
                    <Clock size={15} className="shrink-0" />
                    {office.hours}
                  </div>
                </div>
              </div>
            ))}

            {/* WhatsApp */}
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl bg-[#25D366] p-5 text-white hover:bg-[#1fb659] transition-colors"
            >
              <MessageCircle size={24} />
              <div>
                <p className="font-bold">Chat on WhatsApp</p>
                <p className="text-sm text-white/80">Get a quick response from our sales team</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="bg-slate-100 h-72 flex items-center justify-center">
        <div className="text-center text-slate-400">
          <MapPin size={32} className="mx-auto mb-2" />
          <p className="font-medium">Interactive Map</p>
          <p className="text-sm">14 Coventry Road, Workington, Harare</p>
        </div>
      </div>

      {/* JSON-LD LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            '@id': 'https://tpkengineering.co.zw/#business',
            name: 'TPK Engineering',
            url: 'https://tpkengineering.co.zw',
            telephone: siteConfig.phone,
            email: siteConfig.email,
            address: {
              '@type': 'PostalAddress',
              streetAddress: siteConfig.address.street,
              addressLocality: siteConfig.address.city,
              addressRegion: siteConfig.address.province,
              addressCountry: 'ZW',
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '07:00',
                closes: '17:30',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: 'Saturday',
                opens: '07:00',
                closes: '12:00',
              },
            ],
          }),
        }}
      />
    </>
  )
}
