'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react'
import type { QuoteFormData } from '@/types'

const schema = z.object({
  productCategory: z.string().min(1, 'Please select a product category'),
  quantity: z.coerce.number().min(1, 'Minimum 1 unit').max(500),
  payloadRequirement: z.string().min(1, 'Please specify payload requirement'),
  deliveryTimeline: z.string().min(1, 'Please select a timeline'),
  customRequirements: z.string().optional(),
  name: z.string().min(2, 'Full name required'),
  company: z.string().min(2, 'Company name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(8, 'Valid phone number required'),
  country: z.string().min(1, 'Country required'),
})

const productCategories = [
  'Flatbed Trailers',
  'Curtainsider Trailers',
  'Refrigerated Trailers',
  'Tanker Trailers',
  'Lowbed Trailers',
  'Tipper Trailers',
  'Side-Tipper Trailers',
  'Custom Solutions',
]

const timelines = [
  'ASAP (within 30 days)',
  '1 – 3 months',
  '3 – 6 months',
  '6 – 12 months',
  '12+ months (planning)',
]

const STEPS = [
  { id: 1, label: 'Product' },
  { id: 2, label: 'Requirements' },
  { id: 3, label: 'Contact' },
]

type FormData = z.infer<typeof schema>

function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all ${
                  s.id < step
                    ? 'bg-accent text-white'
                    : s.id === step
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 text-slate-400'
                }`}
              >
                {s.id < step ? <CheckCircle size={18} /> : s.id}
              </div>
              <p
                className={`mt-1.5 text-xs font-medium ${
                  s.id <= step ? 'text-slate-700' : 'text-slate-400'
                }`}
              >
                {s.label}
              </p>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-3 mb-5 transition-all ${s.id < step ? 'bg-accent' : 'bg-slate-100'}`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-2 h-1 w-full rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${((step - 1) / (total - 1)) * 100}%` }}
        />
      </div>
    </div>
  )
}

export function QuoteForm({ initialProduct }: { initialProduct?: string }) {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      productCategory: initialProduct ?? '',
      quantity: 1,
    },
  })

  async function nextStep() {
    const fields: (keyof FormData)[][] = [
      ['productCategory', 'quantity'],
      ['payloadRequirement', 'deliveryTimeline'],
      ['name', 'company', 'email', 'phone', 'country'],
    ]
    const valid = await trigger(fields[step - 1])
    if (valid) setStep((s) => s + 1)
  }

  async function onSubmit(data: FormData) {
    setSubmitting(true)
    try {
      await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setSubmitted(true)
    } catch {
      // handle error
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center py-16 text-center"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
          <CheckCircle size={40} className="text-accent" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-slate-900">Quote Request Received!</h2>
        <p className="mt-3 max-w-md text-slate-500">
          A TPK applications engineer will contact you within 24 hours with a detailed quotation.
          Check your inbox for a confirmation email.
        </p>
      </motion.div>
    )
  }

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary ${
      hasError ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white hover:border-slate-300'
    }`

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <StepIndicator step={step} total={STEPS.length} />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-5"
          >
            <h2 className="text-xl font-bold text-slate-900">Which product interests you?</h2>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Product Category *
              </label>
              <select className={inputClass(!!errors.productCategory)} {...register('productCategory')}>
                <option value="">Select a trailer type…</option>
                {productCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.productCategory && (
                <p className="mt-1 text-xs text-red-600">{errors.productCategory.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Quantity Required *
              </label>
              <input
                type="number"
                min={1}
                className={inputClass(!!errors.quantity)}
                {...register('quantity')}
                placeholder="e.g. 5"
              />
              {errors.quantity && (
                <p className="mt-1 text-xs text-red-600">{errors.quantity.message}</p>
              )}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-5"
          >
            <h2 className="text-xl font-bold text-slate-900">Tell us about your requirements</h2>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Payload / Capacity Requirement *
              </label>
              <input
                type="text"
                className={inputClass(!!errors.payloadRequirement)}
                {...register('payloadRequirement')}
                placeholder="e.g. 30,000 kg — platinum ore"
              />
              {errors.payloadRequirement && (
                <p className="mt-1 text-xs text-red-600">{errors.payloadRequirement.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Delivery Timeline *
              </label>
              <select className={inputClass(!!errors.deliveryTimeline)} {...register('deliveryTimeline')}>
                <option value="">Select timeline…</option>
                {timelines.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.deliveryTimeline && (
                <p className="mt-1 text-xs text-red-600">{errors.deliveryTimeline.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Special Requirements or Notes
              </label>
              <textarea
                rows={4}
                className={`${inputClass(false)} resize-none`}
                {...register('customRequirements')}
                placeholder="Any specific configurations, load types, terrain, regulations…"
              />
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-5"
          >
            <h2 className="text-xl font-bold text-slate-900">Your contact details</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  className={inputClass(!!errors.name)}
                  {...register('name')}
                  placeholder="Your full name"
                  autoComplete="name"
                />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Company *
                </label>
                <input
                  type="text"
                  className={inputClass(!!errors.company)}
                  {...register('company')}
                  placeholder="Your company name"
                  autoComplete="organization"
                />
                {errors.company && <p className="mt-1 text-xs text-red-600">{errors.company.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  className={inputClass(!!errors.email)}
                  {...register('email')}
                  placeholder="you@company.com"
                  autoComplete="email"
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  className={inputClass(!!errors.phone)}
                  {...register('phone')}
                  placeholder="+263 77 xxx xxxx"
                  autoComplete="tel"
                />
                {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Country *
              </label>
              <select className={inputClass(!!errors.country)} {...register('country')} autoComplete="country">
                <option value="">Select country…</option>
                {['Zimbabwe', 'Zambia', 'Mozambique', 'South Africa', 'Malawi', 'Botswana', 'Tanzania', 'Kenya', 'Other'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.country && <p className="mt-1 text-xs text-red-600">{errors.country.message}</p>}
            </div>

            <p className="text-xs text-slate-400">
              By submitting, you agree to be contacted by a TPK sales representative. Your data
              is handled in accordance with our Privacy Policy.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft size={16} /> Back
          </button>
        ) : (
          <div />
        )}

        {step < STEPS.length ? (
          <button
            type="button"
            onClick={nextStep}
            className="flex items-center gap-2 rounded-xl bg-primary px-7 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
          >
            Continue <ChevronRight size={16} />
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 rounded-xl bg-secondary px-7 py-2.5 text-sm font-semibold text-white hover:bg-secondary-dark disabled:opacity-60 transition-colors"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Submitting…
              </>
            ) : (
              <>Submit Request</>
            )}
          </button>
        )}
      </div>
    </form>
  )
}
