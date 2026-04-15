import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, CheckCircle } from 'lucide-react'
import { Badge, StockBadge } from '@/components/ui/Badge'
import { getCategoryLabel } from '@/lib/utils'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'compact'
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  if (variant === 'compact') {
    return (
      <Link
        href={`/products/${product.slug}`}
        className="group flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-card transition-all hover:border-primary/20 hover:shadow-card-hover"
      >
        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100">
          <Image
            src={product.heroImage}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="96px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-900 group-hover:text-primary">
            {product.name}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">{product.specifications.payload} payload</p>
        </div>
        <ArrowRight size={14} className="shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
      </Link>
    )
  }

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-slate-50">
        <Image
          src={product.heroImage}
          alt={`${product.name} — TPK Engineering`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Category badge overlay */}
        <div className="absolute left-3 top-3">
          <Badge variant="primary" size="sm">
            {getCategoryLabel(product.category)}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug">
            {product.name}
          </h3>
          <StockBadge inStock={product.inStock} />
        </div>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
          {product.tagline}
        </p>

        {/* Key specs */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-slate-50 px-3 py-2">
            <p className="text-2xs font-medium uppercase tracking-wide text-slate-400">Payload</p>
            <p className="mt-0.5 text-sm font-bold text-slate-900">{product.specifications.payload}</p>
          </div>
          <div className="rounded-lg bg-slate-50 px-3 py-2">
            <p className="text-2xs font-medium uppercase tracking-wide text-slate-400">Axles</p>
            <p className="mt-0.5 text-sm font-bold text-slate-900">{product.specifications.axles}</p>
          </div>
        </div>

        {/* Top features */}
        <ul className="mt-4 space-y-1.5">
          {product.features.slice(0, 2).map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-xs text-slate-600">
              <CheckCircle size={13} className="mt-0.5 shrink-0 text-accent" />
              <span className="line-clamp-1">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Lead time */}
        <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
          <Clock size={12} />
          <span>Est. lead time: {product.leadTimeDays} days</span>
        </div>

        {/* CTA */}
        <div className="mt-4 flex gap-2 pt-4 border-t border-slate-50">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-primary-light transition-colors"
          >
            View Specs
          </Link>
          <Link
            href={`/quote?product=${product.slug}`}
            className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 hover:border-secondary hover:text-secondary transition-colors"
          >
            Quote <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  )
}
