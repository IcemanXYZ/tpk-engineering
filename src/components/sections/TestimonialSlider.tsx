'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { IndustryBadge } from '@/components/ui/Badge'
import { testimonials } from '@/lib/data/testimonials'

export function TestimonialSlider() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((c) => (c + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [paused, next])

  const t = testimonials[current]

  return (
    <section
      className="bg-slate-50 section-padding"
      aria-label="Customer testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
            Testimonials
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Trusted by Africa's Best
          </h2>
        </div>

        {/* Slider */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 40 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="rounded-3xl bg-white p-8 shadow-card sm:p-12"
            >
              {/* Stars */}
              <div className="flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="mt-5">
                <p className="text-xl font-medium leading-relaxed text-slate-800 sm:text-2xl">
                  "{t.quote}"
                </p>
              </blockquote>

              {/* Attribution */}
              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{t.author}</p>
                    <p className="text-sm text-slate-500">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
                <IndustryBadge industry={t.industry} />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-between">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1)
                    setCurrent(i)
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'w-6 bg-primary' : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="rounded-xl border border-slate-200 p-2.5 text-slate-500 hover:border-primary hover:text-primary transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="rounded-xl border border-slate-200 p-2.5 text-slate-500 hover:border-primary hover:text-primary transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
