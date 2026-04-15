'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { AlertCircle, CheckCircle, Loader2, MapPin } from 'lucide-react'
import { siteConfig } from '@/lib/config'

const schema = z.object({
  registrationNumber: z.string().min(3, 'Registration number required'),
  fleetId: z.string().optional(),
  priority: z.enum(['breakdown', 'scheduled', 'inspection']),
  faultDescription: z.string().min(10, 'Please describe the fault (10+ chars)'),
  locationDescription: z.string().min(5, 'Location required'),
  contactName: z.string().min(2),
  contactPhone: z.string().min(8),
  contactEmail: z.string().email(),
})

type FormData = z.infer<typeof schema>

const priorities = [
  {
    value: 'breakdown',
    label: 'Breakdown (Emergency)',
    description: 'Vehicle is immobilised — needs immediate response',
    color: 'border-red-300 bg-red-50 text-red-800',
    selectedColor: 'border-red-500 bg-red-100 ring-red-300',
  },
  {
    value: 'scheduled',
    label: 'Scheduled Maintenance',
    description: 'Pre-planned service appointment',
    color: 'border-slate-200 bg-white text-slate-800',
    selectedColor: 'border-primary bg-primary/5 ring-primary/20',
  },
  {
    value: 'inspection',
    label: 'Roadworthy Inspection',
    description: 'ZINARA pre-clearance or annual inspection',
    color: 'border-slate-200 bg-white text-slate-800',
    selectedColor: 'border-primary bg-primary/5 ring-primary/20',
  },
] as const

export default function ServiceRequestPage() {
  const [submitted, setSubmitted] = useState<{ ticketId: string; estimatedResponse: string } | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { priority: 'breakdown' },
  })

  const selectedPriority = watch('priority')

  async function onSubmit(data: FormData) {
    setSubmitting(true)
    try {
      const res = await fetch('/api/service-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (json.success) {
        setSubmitted({ ticketId: json.ticketId, estimatedResponse: json.estimatedResponse })
      }
    } catch {
      // handle error
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = (err: boolean) =>
    `w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary ${
      err ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white hover:border-slate-300'
    }`

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-3xl bg-white p-10 shadow-card text-center">
          <CheckCircle size={52} className="mx-auto text-accent" />
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Request Logged</h1>
          <p className="mt-2 text-slate-500">
            Ticket reference:{' '}
            <span className="font-mono font-bold text-primary">{submitted.ticketId}</span>
          </p>
          <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            <p className="font-medium">Estimated response time:</p>
            <p className="text-2xl font-bold text-primary mt-1">{submitted.estimatedResponse}</p>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            A TPK technician will contact you on the phone number provided. Keep your vehicle
            position accessible.
          </p>
          <a
            href="/"
            className="mt-6 inline-block rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-light transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="border-b border-slate-100 bg-white py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle size={20} className="text-secondary" />
            <a
              href={`tel:${siteConfig.emergencyPhone}`}
              className="text-sm font-bold text-secondary"
            >
              Emergency 24/7: {siteConfig.emergencyPhone}
            </a>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Service Request</h1>
          <p className="mt-2 text-slate-500">
            Log a breakdown, schedule maintenance, or request a roadworthy inspection.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
          {/* Priority */}
          <div>
            <h2 className="mb-4 text-lg font-bold text-slate-900">Request Type</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {priorities.map((p) => (
                <label
                  key={p.value}
                  className={`cursor-pointer rounded-2xl border-2 p-4 ring-2 ring-transparent transition-all ${
                    selectedPriority === p.value ? p.selectedColor : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <input type="radio" value={p.value} {...register('priority')} className="sr-only" />
                  <p className={`font-semibold text-sm ${selectedPriority === p.value && p.value === 'breakdown' ? 'text-red-700' : 'text-slate-900'}`}>
                    {p.label}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{p.description}</p>
                </label>
              ))}
            </div>
          </div>

          {/* Vehicle */}
          <div className="rounded-2xl bg-white p-6 shadow-card space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Vehicle Details</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Registration Number *
                </label>
                <input
                  type="text"
                  className={inputClass(!!errors.registrationNumber)}
                  {...register('registrationNumber')}
                  placeholder="e.g. ZW 123 ABC"
                  autoCapitalize="characters"
                />
                {errors.registrationNumber && (
                  <p className="mt-1 text-xs text-red-600">{errors.registrationNumber.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  TPK Fleet ID (if known)
                </label>
                <input
                  type="text"
                  className={inputClass(false)}
                  {...register('fleetId')}
                  placeholder="e.g. TPK-F-00234"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Fault Description *
              </label>
              <textarea
                rows={4}
                className={`${inputClass(!!errors.faultDescription)} resize-none`}
                {...register('faultDescription')}
                placeholder="Describe the problem in as much detail as possible — noises, symptoms, what happened before the fault…"
              />
              {errors.faultDescription && (
                <p className="mt-1 text-xs text-red-600">{errors.faultDescription.message}</p>
              )}
            </div>
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700">
                <MapPin size={14} />
                Current Location *
              </label>
              <input
                type="text"
                className={inputClass(!!errors.locationDescription)}
                {...register('locationDescription')}
                placeholder="e.g. A4 Harare–Mutare road, approx 50km from Harare, near Ruwa turnoff"
              />
              {errors.locationDescription && (
                <p className="mt-1 text-xs text-red-600">{errors.locationDescription.message}</p>
              )}
            </div>
          </div>

          {/* Contact */}
          <div className="rounded-2xl bg-white p-6 shadow-card space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Your Contact Details</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Name *</label>
                <input
                  type="text"
                  className={inputClass(!!errors.contactName)}
                  {...register('contactName')}
                  autoComplete="name"
                />
                {errors.contactName && <p className="mt-1 text-xs text-red-600">{errors.contactName.message}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Phone *</label>
                <input
                  type="tel"
                  className={inputClass(!!errors.contactPhone)}
                  {...register('contactPhone')}
                  placeholder="+263 77 xxx xxxx"
                  autoComplete="tel"
                />
                {errors.contactPhone && <p className="mt-1 text-xs text-red-600">{errors.contactPhone.message}</p>}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Email *</label>
              <input
                type="email"
                className={inputClass(!!errors.contactEmail)}
                {...register('contactEmail')}
                autoComplete="email"
              />
              {errors.contactEmail && <p className="mt-1 text-xs text-red-600">{errors.contactEmail.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-2xl bg-secondary py-4 text-base font-bold text-white shadow-secondary/20 shadow-lg hover:bg-secondary-dark disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
          >
            {submitting ? (
              <><Loader2 size={18} className="animate-spin" /> Submitting…</>
            ) : (
              <>Submit Service Request</>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
