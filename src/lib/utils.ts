import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-ZW', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString))
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '…'
}

export function getIndustryLabel(industry: string): string {
  const labels: Record<string, string> = {
    mining: 'Mining',
    agriculture: 'Agriculture',
    construction: 'Construction',
    'retail-fmcg': 'Retail / FMCG',
    'fuel-chemicals': 'Fuel & Chemicals',
    'general-freight': 'General Freight',
  }
  return labels[industry] ?? industry
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    flatbed: 'Flatbed',
    curtainsider: 'Curtainsider',
    refrigerated: 'Refrigerated',
    tanker: 'Tanker',
    lowbed: 'Lowbed',
    tipper: 'Tipper',
    'side-tipper': 'Side-Tipper',
    custom: 'Custom Solutions',
  }
  return labels[category] ?? category
}

export const industryColors: Record<string, string> = {
  mining: 'bg-amber-100 text-amber-800',
  agriculture: 'bg-green-100 text-green-800',
  construction: 'bg-orange-100 text-orange-800',
  'retail-fmcg': 'bg-blue-100 text-blue-800',
  'fuel-chemicals': 'bg-red-100 text-red-800',
  'general-freight': 'bg-slate-100 text-slate-800',
}
