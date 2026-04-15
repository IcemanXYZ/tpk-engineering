import { forwardRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  className?: string
  children?: React.ReactNode
}

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined
  }

type ButtonAsLink = ButtonBaseProps & {
  href: string
  target?: string
  rel?: string
}

type ButtonProps = ButtonAsButton | ButtonAsLink

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white shadow-primary/20 shadow-md hover:bg-primary-light active:bg-primary-dark focus-visible:ring-primary',
  secondary:
    'bg-secondary text-white shadow-secondary/25 shadow-md hover:bg-secondary-dark active:bg-secondary-dark focus-visible:ring-secondary',
  outline:
    'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white focus-visible:ring-primary',
  ghost:
    'text-slate-700 bg-transparent hover:bg-slate-100 focus-visible:ring-slate-400',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3.5 text-xs gap-1.5 rounded-lg',
  md: 'h-10 px-4 text-sm gap-2 rounded-xl',
  lg: 'h-12 px-6 text-base gap-2 rounded-xl',
  xl: 'h-14 px-8 text-lg gap-3 rounded-2xl',
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      className,
      children,
      ...rest
    } = props

    const classes = cn(
      'inline-flex items-center justify-center font-semibold transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && 'w-full',
      className,
    )

    const content = (
      <>
        {loading && <Spinner />}
        {!loading && icon && iconPosition === 'left' && icon}
        {children}
        {!loading && icon && iconPosition === 'right' && icon}
      </>
    )

    if ('href' in props && props.href !== undefined) {
      const { href, target, rel, ...linkRest } = rest as ButtonAsLink
      return (
        <Link
          href={href}
          target={target}
          rel={rel}
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(linkRest as object)}
        >
          {content}
        </Link>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={loading || (rest as ButtonAsButton).disabled}
        className={classes}
        {...(rest as ButtonAsButton)}
      >
        {content}
      </button>
    )
  },
)
