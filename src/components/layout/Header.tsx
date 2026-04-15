'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  Phone,
  Menu,
  X,
  Truck,
  Box,
  Snowflake,
  PackageOpen,
  ArrowDownToLine,
  ChevronsDown,
  RotateCcw,
  Settings2,
  Wrench,
  LayoutDashboard,
  Package,
  ClipboardCheck,
  Shield,
  Pickaxe,
  Wheat,
  HardHat,
  ShoppingCart,
  Flame,
  AlertCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { navigation, siteConfig } from '@/lib/config'
import type { NavItem } from '@/types'

const iconMap: Record<string, React.ElementType> = {
  Truck,
  Box,
  Snowflake,
  Cylinder: PackageOpen,
  ArrowDown: ArrowDownToLine,
  ChevronDown: ChevronsDown,
  RotateCcw,
  Settings2,
  Wrench,
  LayoutDashboard,
  Package,
  ClipboardCheck,
  Shield,
  Pickaxe,
  Wheat,
  HardHat,
  ShoppingCart,
  Flame,
}

function MegaMenu({ item, isOpen }: { item: NavItem; isOpen: boolean }) {
  if (!item.children) return null
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="absolute left-1/2 top-full z-50 mt-1 w-[640px] -translate-x-1/2 rounded-2xl border border-slate-100 bg-white shadow-2xl"
          role="menu"
        >
          <div className="p-6">
            <div className="grid grid-cols-2 gap-1">
              {item.children.map((child) => {
                const Icon = child.icon ? iconMap[child.icon] : null
                return (
                  <Link
                    key={child.href}
                    href={child.href}
                    role="menuitem"
                    className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50"
                  >
                    {Icon && (
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                        <Icon size={16} />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-slate-900 group-hover:text-primary">
                        {child.label}
                      </p>
                      {child.description && (
                        <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                          {child.description}
                        </p>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="rounded-b-2xl border-t border-slate-50 bg-slate-50/80 px-6 py-3">
            <Link
              href={item.href}
              className="text-sm font-medium text-primary hover:text-primary-light"
            >
              View all {item.label} →
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function MobileNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    onClose()
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-sm overflow-y-auto bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 p-4">
              <span className="text-lg font-bold text-primary">TPK Engineering</span>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-50"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="divide-y divide-slate-100 p-4">
              {navigation.map((item) =>
                item.children ? (
                  <div key={item.href} className="py-1">
                    <button
                      onClick={() => setExpanded(expanded === item.href ? null : item.href)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left font-medium text-slate-700 hover:bg-slate-50"
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={cn(
                          'transition-transform',
                          expanded === item.href && 'rotate-180',
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {expanded === item.href && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-1 space-y-0.5 pl-4">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div key={item.href} className="py-1">
                    <Link
                      href={item.href}
                      className="block rounded-lg px-3 py-2.5 font-medium text-slate-700 hover:bg-slate-50 hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </div>
                ),
              )}
            </div>

            <div className="border-t border-slate-100 p-4 space-y-3">
              <Link
                href="/service-request"
                className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 hover:bg-red-100"
              >
                <AlertCircle size={16} />
                Emergency Service: {siteConfig.emergencyPhone}
              </Link>
              <Link
                href="/quote"
                className="block w-full rounded-xl bg-primary px-4 py-3 text-center font-semibold text-white hover:bg-primary-light transition-colors"
              >
                Request a Quote
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setActiveMenu(null)
  }, [pathname])

  function handleMouseEnter(href: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveMenu(href)
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 150)
  }

  const isHomePage = pathname === '/'

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-primary py-2 text-center text-xs font-medium text-white/90">
        <span className="hidden sm:inline">24/7 Breakdown Support: </span>
        <a href={`tel:${siteConfig.emergencyPhone}`} className="font-bold text-secondary hover:text-secondary-light">
          {siteConfig.emergencyPhone}
        </a>
        <span className="mx-3 opacity-30">|</span>
        <span className="hidden sm:inline">Serving Zimbabwe, Zambia, Mozambique & Beyond</span>
      </div>

      <header
        className={cn(
          'sticky top-0 z-30 transition-all duration-300',
          scrolled || !isHomePage
            ? 'bg-white/95 shadow-sm backdrop-blur-md'
            : 'bg-white',
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          style={{ height: 72 }}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-bold text-lg">
              T
            </div>
            <div className="leading-tight">
              <div className="text-lg font-bold text-primary tracking-tight">TPK Engineering</div>
              <div className="text-2xs font-medium uppercase tracking-widest text-slate-400">
                Trailer Manufacturers
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navigation.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && handleMouseEnter(item.href)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    pathname.startsWith(item.href) && item.href !== '/'
                      ? 'text-primary bg-primary/5'
                      : 'text-slate-700 hover:text-primary hover:bg-slate-50',
                  )}
                  aria-haspopup={item.children ? 'true' : undefined}
                  aria-expanded={activeMenu === item.href ? 'true' : undefined}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      size={14}
                      className={cn(
                        'transition-transform',
                        activeMenu === item.href && 'rotate-180',
                      )}
                    />
                  )}
                </Link>
                {item.children && (
                  <MegaMenu item={item} isOpen={activeMenu === item.href} />
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary"
            >
              <Phone size={15} />
              {siteConfig.phone}
            </a>
            <Link
              href="/service-request"
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-colors"
            >
              Service Request
            </Link>
            <Link
              href="/quote"
              className="rounded-xl bg-secondary px-5 py-2 text-sm font-semibold text-white shadow-secondary/20 shadow-md hover:bg-secondary-dark transition-colors"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-50"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
