'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { CheckCircle, Loader2 } from 'lucide-react'
import type { ContactFormData } from '@/types'

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(3, 'Subject required'),
  message: z.string().min(20, 'Please provide a detailed message (20+ characters)'),
  preferredContact: z.enum(['email', 'phone', 'whatsapp']),
})

type FormData = z.infer<typeof schema>

export function ContactFormClient() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { preferredContact: 'email' },
  })

  async function onSubmit(data: FormData) {
    setSubmitting(true)
    try {
      await fetch('/api/contact', {
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
      <div className="flex flex-col items-center py-12 text-center">
        <CheckCircle size={48} className="text-accent" />
        <h3 className="mt-4 text-xl font-bold text-slate-900">Message Sent!</h3>
        <p className="mt-2 text-slate-500">We'll be in touch within 24 hours.</p>
      </div>
    )
  }

  const inputClass = (err: boolean) =>
    `w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary ${
      err ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white hover:border-slate-300'
    }`

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Full Name *</label>
          <input
            type="text"
            className={inputClass(!!errors.name)}
            {...register('name')}
            placeholder="Your name"
            autoComplete="name"
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Company</label>
          <input
            type="text"
            className={inputClass(false)}
            {...register('company')}
            placeholder="Your company"
            autoComplete="organization"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Email *</label>
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
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Phone</label>
          <input
            type="tel"
            className={inputClass(false)}
            {...register('phone')}
            placeholder="+263 77 xxx xxxx"
            autoComplete="tel"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Subject *</label>
        <input
          type="text"
          className={inputClass(!!errors.subject)}
          {...register('subject')}
          placeholder="e.g. Quote enquiry for 5x side-tippers"
        />
        {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject.message}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Message *</label>
        <textarea
          rows={5}
          className={`${inputClass(!!errors.message)} resize-none`}
          {...register('message')}
          placeholder="Tell us about your requirements…"
        />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">Preferred contact method</p>
        <div className="flex gap-4">
          {(['email', 'phone', 'whatsapp'] as const).map((method) => (
            <label key={method} className="flex cursor-pointer items-center gap-2">
              <input type="radio" value={method} {...register('preferredContact')} className="accent-primary" />
              <span className="text-sm capitalize text-slate-600">{method}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-primary py-3.5 font-semibold text-white hover:bg-primary-light disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
      >
        {submitting ? (
          <><Loader2 size={16} className="animate-spin" /> Sending…</>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  )
}
