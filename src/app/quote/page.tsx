import type { Metadata } from 'next'
import { Suspense } from 'react'
import { QuoteForm } from '@/components/forms/QuoteForm'
import { Shield, Clock, Phone } from 'lucide-react'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Request a Quote',
  description:
    'Request a no-obligation quotation for any trailer in the TPK Engineering range. Our applications engineers respond within 24 hours.',
  robots: { index: true, follow: true },
}

function QuoteFormWrapper({ searchParams }: { searchParams: Record<string, string> }) {
  const product = searchParams['product']
  return <QuoteForm initialProduct={product} />
}

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>
}) {
  const params = await searchParams

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page header */}
      <div className="border-b border-slate-100 bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-3">
            <ol className="flex items-center gap-2 text-sm text-slate-500">
              <li><a href="/" className="hover:text-primary">Home</a></li>
              <li aria-hidden>/</li>
              <li className="font-medium text-slate-900" aria-current="page">Request a Quote</li>
            </ol>
          </nav>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Request a Quote</h1>
          <p className="mt-2 text-lg text-slate-500">
            Complete the form below. A TPK engineer will respond within 24 hours.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl bg-white p-8 shadow-card sm:p-10">
              <Suspense>
                <QuoteFormWrapper searchParams={params} />
              </Suspense>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
              <h2 className="font-bold text-slate-900">What Happens Next?</h2>
              <ol className="mt-4 space-y-4">
                {[
                  { step: '01', title: 'We Review', body: 'An applications engineer reviews your requirements — usually within 2 hours.' },
                  { step: '02', title: 'We Clarify', body: 'We may call or email with a few technical questions to ensure accuracy.' },
                  { step: '03', title: 'We Quote', body: 'You receive a detailed PDF quotation with spec, lead time and pricing.' },
                ].map((item) => (
                  <li key={item.step} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                      {item.step}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <p className="mt-0.5 text-sm text-slate-500">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl bg-primary p-6 text-white">
              <Clock size={20} className="text-secondary mb-3" />
              <h3 className="font-bold">24-Hour Response</h3>
              <p className="mt-1 text-sm text-white/70">
                We respond to all quote requests within 24 business hours, Mon–Fri 7am–6pm CAT.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
              <Phone size={18} className="text-primary mb-3" />
              <h3 className="font-bold text-slate-900">Prefer to talk?</h3>
              <p className="mt-1 text-sm text-slate-500">Call our sales team directly:</p>
              <a
                href={`tel:${siteConfig.phone}`}
                className="mt-2 block text-lg font-bold text-primary hover:text-primary-light"
              >
                {siteConfig.phone}
              </a>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
              <Shield size={18} className="text-accent mb-3" />
              <h3 className="font-bold text-slate-900">No Obligation</h3>
              <p className="mt-1 text-sm text-slate-500">
                Quotes are completely free and without obligation. Your information is kept
                confidential and never shared with third parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
