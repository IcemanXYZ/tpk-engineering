'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Play, Shield, Award, Zap } from 'lucide-react'

const trustBadges = [
  { icon: Shield, label: 'ISO 9001:2015 Certified' },
  { icon: Award, label: '35+ Years Manufacturing' },
  { icon: Zap, label: '24/7 Pan-Africa Support' },
]

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-primary">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&q=80"
          alt="TPK Engineering trailer fleet on African road"
          fill
          className="object-cover object-center"
          priority
          quality={85}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
        <div className="absolute inset-0 bg-hero-pattern opacity-40" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[92vh] flex-col justify-center py-20">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm"
            >
              <span className="h-2 w-2 animate-pulse-slow rounded-full bg-secondary" />
              <span className="text-sm font-medium text-white/90">
                Zimbabwe's Premier Trailer Manufacturer
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Engineering
              <span className="relative ml-3 text-secondary">
                Africa's
                <svg
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 320 12"
                  fill="none"
                >
                  <path
                    d="M4 8C60 4 180 2 316 8"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              Roads Forward
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl"
            >
              Precision-built trailers for mining, agriculture, construction and freight.
              From Harare to Lusaka to Cape Town — built to survive where it matters most.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-secondary px-7 py-4 text-base font-semibold text-white shadow-secondary/30 shadow-xl hover:bg-secondary-dark transition-all hover:scale-[1.02] active:scale-100"
              >
                View Trailer Catalogue <ArrowRight size={18} />
              </Link>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-white/30 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-all"
              >
                Request a Quote
              </Link>
              <Link
                href="/case-studies"
                className="hidden items-center gap-2 text-sm font-medium text-white/75 hover:text-white transition-colors sm:inline-flex"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10">
                  <Play size={12} className="translate-x-0.5" />
                </span>
                Watch case study
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-12 flex flex-wrap gap-4"
            >
              {trustBadges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm"
                >
                  <Icon size={14} className="text-secondary" />
                  {label}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 p-1.5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="h-2 w-1 rounded-full bg-white/60"
          />
        </div>
      </motion.div>
    </section>
  )
}
