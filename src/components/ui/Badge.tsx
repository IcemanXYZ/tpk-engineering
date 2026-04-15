import { cn, getIndustryLabel, industryColors } from '@/lib/utils'
import type { Industry } from '@/types'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md'
  className?: string
}

const variantStyles = {
  default: 'bg-slate-100 text-slate-700',
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary-dark',
  outline: 'border border-slate-200 bg-transparent text-slate-600',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-amber-100 text-amber-800',
  danger: 'bg-red-100 text-red-700',
}

const sizeStyles = {
  sm: 'px-2 py-0.5 text-2xs',
  md: 'px-2.5 py-1 text-xs',
}

export function Badge({ children, variant = 'default', size = 'md', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-semibold',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function IndustryBadge({ industry }: { industry: Industry }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
        industryColors[industry] ?? 'bg-slate-100 text-slate-700',
      )}
    >
      {getIndustryLabel(industry)}
    </span>
  )
}

export function StockBadge({ inStock }: { inStock: boolean }) {
  return (
    <Badge variant={inStock ? 'success' : 'warning'}>
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          inStock ? 'bg-green-600' : 'bg-amber-500',
        )}
      />
      {inStock ? 'Available' : 'Made to Order'}
    </Badge>
  )
}
