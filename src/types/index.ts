export type Industry =
  | 'mining'
  | 'agriculture'
  | 'construction'
  | 'retail-fmcg'
  | 'fuel-chemicals'
  | 'general-freight'

export type ProductCategory =
  | 'flatbed'
  | 'curtainsider'
  | 'refrigerated'
  | 'tanker'
  | 'lowbed'
  | 'tipper'
  | 'side-tipper'
  | 'custom'

export interface ProductSpecifications {
  payload: string
  deckLength: string
  deckWidth: string
  deckHeight?: string
  axles: number
  suspension: string
  kingpinHeight?: string
  tareWeight: string
  brakeSystem: string
  tyreSizeAxle?: string
  kingpinOptions?: string
  bodyMaterial?: string
}

export interface ProductOption {
  id: string
  name: string
  description: string
  priceIndicator?: 'included' | 'optional' | 'premium'
}

export interface Document {
  id: string
  name: string
  type: 'spec-sheet' | 'certificate' | 'warranty' | 'manual' | 'other'
  url: string
  sizeMb?: number
}

export interface Product {
  id: string
  slug: string
  name: string
  category: ProductCategory
  tagline: string
  description: string
  heroImage: string
  gallery: string[]
  specifications: ProductSpecifications
  features: string[]
  options: ProductOption[]
  relatedProductSlugs: string[]
  documents: Document[]
  inStock: boolean
  leadTimeDays: number
  certifications: string[]
  industries: Industry[]
  seoTitle: string
  seoDescription: string
  publishedAt: string
  featured: boolean
}

export interface ProcessStep {
  step: number
  title: string
  description: string
}

export interface Service {
  id: string
  slug: string
  name: string
  icon: string
  shortDescription: string
  description: string
  benefits: string[]
  process: ProcessStep[]
  turnaroundTime: string
  warranty: string
  applicableCategories: ProductCategory[]
}

export interface Metric {
  label: string
  value: string
  unit?: string
  improvement?: string
}

export interface Testimonial {
  id: string
  author: string
  role: string
  company: string
  industry: Industry
  quote: string
  avatar?: string
  rating: number
}

export interface CaseStudy {
  id: string
  slug: string
  title: string
  client: string
  industry: Industry
  heroImage: string
  summary: string
  challenge: string
  solution: string
  results: Metric[]
  productsUsed: string[]
  testimonial?: Testimonial
  publishedAt: string
  tags: string[]
  featured: boolean
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  avatar: string
  linkedin?: string
  yearsWithCompany: number
}

export interface IndustrySolution {
  id: Industry
  name: string
  icon: string
  description: string
  challenges: string[]
  solutions: string[]
  productSlugs: string[]
  caseStudySlugs: string[]
  heroImage: string
}

export interface QuoteFormData {
  productSlug?: string
  productCategory: string
  quantity: number
  payloadRequirement: string
  deliveryTimeline: string
  customRequirements: string
  name: string
  company: string
  email: string
  phone: string
  country: string
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
  preferredContact: 'email' | 'phone' | 'whatsapp'
}

export interface ServiceRequestFormData {
  registrationNumber: string
  fleetId?: string
  priority: 'breakdown' | 'scheduled' | 'inspection'
  faultDescription: string
  locationDescription: string
  contactName: string
  contactPhone: string
  contactEmail: string
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
  description?: string
  icon?: string
}

export interface SiteConfig {
  name: string
  tagline: string
  description: string
  url: string
  phone: string
  emergencyPhone: string
  email: string
  address: {
    street: string
    city: string
    province: string
    country: string
    postalCode: string
  }
  social: {
    linkedin?: string
    facebook?: string
    twitter?: string
    youtube?: string
    whatsapp?: string
  }
  certifications: string[]
}
