import Link from 'next/link'
import { ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
        <Search size={32} className="text-slate-400" />
      </div>
      <h1 className="mt-6 text-4xl font-bold text-slate-900 sm:text-5xl">Page Not Found</h1>
      <p className="mt-4 max-w-md text-lg text-slate-500">
        The page you're looking for doesn't exist or has been moved. Browse our product catalogue
        or get in touch.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-light transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    </div>
  )
}
