# TPK Engineering — Architecture Blueprint
> Principal Architect: Vercel  
> Date: 2026-04-15  
> Stack: Next.js 15 · TypeScript · Tailwind CSS · Framer Motion

---

## 1. SITE MAP (Page Hierarchy)

```
TPK Engineering
├── / ................................................... Home
├── /products ............................................ Product Catalog
│   ├── /products/flatbed-trailers
│   ├── /products/curtainsider-trailers
│   ├── /products/refrigerated-trailers
│   ├── /products/tanker-trailers
│   ├── /products/lowbed-trailers
│   ├── /products/tipper-trailers
│   ├── /products/side-tipper-trailers
│   └── /products/custom-solutions
├── /services ............................................ Services Overview
│   ├── /services/maintenance-repairs
│   ├── /services/fleet-management
│   ├── /services/parts-accessories
│   ├── /services/roadworthy-inspections
│   └── /services/warranty-support
├── /solutions ........................................... Industry Solutions
│   ├── /solutions/mining
│   ├── /solutions/agriculture
│   ├── /solutions/construction
│   ├── /solutions/retail-fmcg
│   └── /solutions/fuel-chemicals
├── /case-studies ........................................ Case Studies
│   └── /case-studies/[slug]
├── /about ............................................... About TPK
│   ├── /about#history
│   ├── /about#team
│   ├── /about#certifications
│   └── /about#csr
├── /contact ............................................. Contact / Locations
├── /quote ............................................... Request a Quote
├── /service-request ..................................... Log a Service Request
└── /fleet-portal ........................................ Fleet Management Portal (auth-gated)
    ├── /fleet-portal/dashboard
    ├── /fleet-portal/assets
    ├── /fleet-portal/maintenance
    └── /fleet-portal/documents
```

---

## 2. USER FLOWS (3 Distinct Journeys)

### Flow A — Fleet Buyer (Decision Maker)
```
Landing (Google Ad / Organic search "trailer manufacturer Zimbabwe")
  └── Home Page
        ├── Sees hero: "Africa's most trusted trailer manufacturer"
        ├── Browses product categories grid
        └── Clicks "Flatbed Trailers"
              └── /products/flatbed-trailers
                    ├── Reads specs, payload, configuration options
                    ├── Views image gallery & 360° spin
                    └── Clicks "Request a Quote"
                          └── /quote?product=flatbed-trailers
                                ├── Fills multi-step form:
                                │   Step 1: Product config (type, payload, axles)
                                │   Step 2: Fleet details (quantity, delivery timeline)
                                │   Step 3: Contact info
                                └── Submit → POST /api/quote
                                      └── Confirmation page + CRM email trigger
```

### Flow B — Existing Customer (Service / Breakdown)
```
Direct URL or Google search "TPK Engineering service request"
  └── Home Page (sticky "Emergency Service" banner)
        └── Clicks "Service Request" in nav
              └── /service-request
                    ├── Fills form:
                    │   - Registration number / fleet ID
                    │   - Fault description
                    │   - Location (GPS or manual)
                    │   - Priority: Breakdown | Scheduled | Inspection
                    └── Submit → POST /api/service-request
                          └── Ticket confirmation + SMS notification
```

### Flow C — Researcher / Evaluator (Case Studies)
```
LinkedIn article link / organic search "mining trailer case study Africa"
  └── /case-studies
        ├── Filter by industry: Mining
        ├── Clicks "Zimplats Fleet Expansion — 120 Side-Tippers"
        └── /case-studies/zimplats-fleet-expansion
              ├── Reads challenge → solution → results
              ├── Sees before/after metrics (downtime -40%, payload +8%)
              ├── Related products sidebar
              └── CTA: "Talk to a Solutions Expert"
                    └── /contact?ref=case-study-zimplats
                          └── Contact form pre-tagged with source
```

---

## 3. DATA MODELS

### Product
```typescript
interface Product {
  id: string
  slug: string
  name: string
  category: ProductCategory
  tagline: string
  description: string
  heroImage: string
  gallery: string[]
  specifications: {
    payload: string          // "30,000 kg"
    deckLength: string       // "13.6 m"
    deckWidth: string        // "2.48 m"
    axles: number
    suspension: string       // "Air / Mechanical"
    kingpinHeight: string
    tareWeight: string
    brakeSystem: string
  }
  features: string[]
  options: ProductOption[]
  relatedProducts: string[]  // slugs
  documents: Document[]
  inStock: boolean
  leadTimeDays: number
  certifications: string[]
  industries: Industry[]
  seoTitle: string
  seoDescription: string
  publishedAt: string
}
```

### Service
```typescript
interface Service {
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
  applicableProducts: string[]
}
```

### CaseStudy
```typescript
interface CaseStudy {
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
}
```

### QuoteRequest
```typescript
interface QuoteRequest {
  id: string
  productSlug?: string
  productCategory?: string
  quantity: number
  payloadRequirement: string
  deliveryTimeline: string
  customRequirements: string
  contact: {
    name: string
    company: string
    email: string
    phone: string
    country: string
  }
  status: 'new' | 'reviewing' | 'quoted' | 'won' | 'lost'
  createdAt: string
  crmRef?: string
}
```

### ServiceRequest
```typescript
interface ServiceRequest {
  id: string
  fleetId?: string
  registrationNumber: string
  faultDescription: string
  priority: 'breakdown' | 'scheduled' | 'inspection'
  location: { lat?: number; lng?: number; description: string }
  contact: { name: string; phone: string; email: string }
  images?: string[]
  status: 'new' | 'assigned' | 'in-progress' | 'resolved'
  assignedTechId?: string
  createdAt: string
}
```

### FleetAsset
```typescript
interface FleetAsset {
  id: string
  customerId: string
  registrationNumber: string
  productSlug: string
  serialNumber: string
  purchaseDate: string
  warrantyExpiry: string
  lastService: string
  nextServiceDue: string
  mileageKm: number
  status: 'operational' | 'in-service' | 'grounded'
  documents: Document[]
  serviceHistory: ServiceRecord[]
}
```

---

## 4. API REQUIREMENTS

### Public Endpoints
| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/quote | Submit quote request → CRM |
| POST | /api/contact | General contact form → CRM/Email |
| POST | /api/service-request | Log service ticket → Field service system |
| POST | /api/newsletter | Subscribe to newsletter |
| GET | /api/products | Product catalog (for search/filter) |
| GET | /api/case-studies | Case studies list |

### Authenticated (Fleet Portal)
| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/fleet/assets | Customer's registered fleet |
| POST | /api/fleet/assets | Register new asset |
| GET | /api/fleet/assets/[id]/history | Service history for asset |
| GET | /api/fleet/service-tickets | Open/closed tickets |
| GET | /api/fleet/documents | Warranties, certificates, invoices |

### Headers & Constraints
- Rate limiting: 20 req/min per IP on public form endpoints
- CORS: restricted to tpkengineering.co.zw
- Auth: JWT via cookie (httpOnly) for fleet portal
- Validation: Zod schemas shared between client and server

---

## 5. COMPONENT INVENTORY (40 items)

### Layout (5)
| # | Component | Description |
|---|-----------|-------------|
| 1 | `Header` | Sticky nav, mega-menu, mobile hamburger, CTA buttons |
| 2 | `Footer` | Links, certifications logos, contact info, newsletter |
| 3 | `Navigation` | Desktop mega-menu with product categories |
| 4 | `MobileMenu` | Full-screen drawer, animated |
| 5 | `Breadcrumb` | Schema.org BreadcrumbList markup |

### UI Primitives (12)
| # | Component | Description |
|---|-----------|-------------|
| 6 | `Button` | Primary/Secondary/Ghost/Destructive variants |
| 7 | `Badge` | Status, industry, category tags |
| 8 | `Card` | Base card with optional hover/lift |
| 9 | `Input` | Controlled text input with validation state |
| 10 | `Select` | Custom dropdown with search |
| 11 | `Textarea` | Resizable with char counter |
| 12 | `Checkbox` | Accessible checkbox group |
| 13 | `RadioGroup` | Option selector |
| 14 | `Skeleton` | Loading placeholder |
| 15 | `Toast` | Success/Error/Info notifications |
| 16 | `Modal` | Accessible dialog overlay |
| 17 | `Tabs` | Horizontal/Vertical tab switcher |

### Section Components (16)
| # | Component | Description |
|---|-----------|-------------|
| 18 | `HeroSection` | Full-bleed hero, video bg option, animated headline |
| 19 | `StatsBar` | Animated counters: years, trailers, clients, countries |
| 20 | `ProductGrid` | Filterable grid with category tabs |
| 21 | `ProductCard` | Image, name, payload, CTA |
| 22 | `ServiceCard` | Icon, name, description, link |
| 23 | `CaseStudyCard` | Image, client, metrics, industry badge |
| 24 | `TestimonialSlider` | Auto-advancing carousel with pause |
| 25 | `CTASection` | Full-width band, headline + 2 actions |
| 26 | `IndustrySolutions` | Grid of industries with icons |
| 27 | `FeatureHighlight` | Alternating image+text sections |
| 28 | `LogoCloud` | Partner/client logos row |
| 29 | `NewsletterSignup` | Email capture with confirmation |
| 30 | `TeamGrid` | Team member cards with roles |
| 31 | `Timeline` | Company history vertical timeline |
| 32 | `CertificationBadges` | ISO, SABS, etc. certification display |
| 33 | `ImageGallery` | Lightbox-enabled product gallery |
| 34 | `SpecTable` | Structured specs table with units toggle |

### Forms (4)
| # | Component | Description |
|---|-----------|-------------|
| 35 | `QuoteForm` | Multi-step quote wizard |
| 36 | `ContactForm` | General enquiry form |
| 37 | `ServiceRequestForm` | Breakdown/maintenance request |
| 38 | `FilterBar` | Product catalog filter sidebar/bar |

### Utility (2)
| # | Component | Description |
|---|-----------|-------------|
| 39 | `SearchBar` | Site-wide product/content search |
| 40 | `StickyServiceCTA` | Fixed emergency service button (mobile) |

---

## 6. PAGE TEMPLATES

### Home (/)
```
┌─────────────────────────────────────────────────────────┐
│  HEADER: Logo | Products | Services | Solutions | Quote  │
├─────────────────────────────────────────────────────────┤
│  HERO: [BG: truck/trailer yard aerial photo]            │
│  "Engineering Africa's Roads Forward"                   │
│  [View Products]  [Request a Quote]                     │
│  ▼ scroll indicator                                     │
├─────────────────────────────────────────────────────────┤
│  STATS BAR: 35 Years | 12,000+ Trailers | 500+ Clients  │
├─────────────────────────────────────────────────────────┤
│  PRODUCT CATEGORIES (6-up grid):                        │
│  [Flatbed][Curtainsider][Refrigerated]                  │
│  [Tanker][Lowbed][Tipper]                               │
├─────────────────────────────────────────────────────────┤
│  WHY TPK — Feature highlight (alt img+text×3):          │
│  1. Precision Engineering  2. 35yr Heritage             │
│  3. Pan-Africa Service Network                          │
├─────────────────────────────────────────────────────────┤
│  INDUSTRY SOLUTIONS (5 tiles): Mining|Agri|Const|FMCG…  │
├─────────────────────────────────────────────────────────┤
│  FEATURED CASE STUDY (full-width card)                  │
├─────────────────────────────────────────────────────────┤
│  SERVICES OVERVIEW (4 cards row)                        │
├─────────────────────────────────────────────────────────┤
│  TESTIMONIALS SLIDER                                    │
├─────────────────────────────────────────────────────────┤
│  CLIENT LOGOS (scrolling row)                           │
├─────────────────────────────────────────────────────────┤
│  CTA BAND: "Ready to spec your next trailer?"           │
│  [Get a Quote]  [Talk to an Engineer]                   │
├─────────────────────────────────────────────────────────┤
│  FOOTER                                                 │
└─────────────────────────────────────────────────────────┘
```

### Products Catalog (/products)
```
┌─────────────────────────────────────────────────────────┐
│  HEADER                                                  │
├─────────────────────────────────────────────────────────┤
│  PAGE HERO: "Trailer Catalogue" — short intro text      │
├──────────┬──────────────────────────────────────────────┤
│  FILTER  │  PRODUCT GRID (3-col → 2-col → 1-col)       │
│  SIDEBAR │                                              │
│  ·Category│  [Card][Card][Card]                        │
│  ·Payload │  [Card][Card][Card]                        │
│  ·Axles  │  [Card][Card][Card]                        │
│  ·Industry│                                             │
│          │  Pagination / Load More                     │
└──────────┴──────────────────────────────────────────────┘
```

### Product Detail (/products/[slug])
```
Breadcrumb: Home › Products › Flatbed Trailers
┌──────────────────────┬──────────────────────────────────┐
│  IMAGE GALLERY        │  Product Name                   │
│  [main]              │  Tagline                        │
│  [thumb][thumb][…]   │  SPEC HIGHLIGHTS (4 pills)      │
│                      │  Description paragraph          │
│                      │  Key Features (checkmarks)      │
│                      │  [Request Quote] [Download Spec]│
└──────────────────────┴──────────────────────────────────┘
│  TABS: Specifications | Options | Downloads | Related   │
│  (spec table | option cards | PDF links | product grid) │
└─────────────────────────────────────────────────────────┘
```

### Quote Request (/quote)
```
Stepper: 1. Product ── 2. Requirements ── 3. Contact ── 4. Review
[Multi-step form filling entire viewport minus header]
Progress bar at top
```

### Case Studies (/case-studies)
```
Hero: "Proven Performance in the Field"
Filter: [All] [Mining] [Agriculture] [Construction] [FMCG]
Grid: 3-col cards → stacks to 1-col
Each card: image | industry badge | title | 2 metrics | Read More
```

---

## 7. TECH STACK

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 15 (App Router) | RSC, streaming, built-in ISR, Vercel-native |
| Language | TypeScript 5.4 | Type safety, IDE DX, Zod integration |
| Styling | Tailwind CSS 3.4 | Utility-first, JIT, zero-runtime |
| Animation | Framer Motion 11 | Production-grade, declarative, FLIP |
| Forms | React Hook Form + Zod | Perf-first, schema-validated end-to-end |
| Icons | Lucide React | Tree-shakeable, consistent style |
| Images | next/image | WebP/AVIF auto, lazy, blur placeholder |
| Fonts | next/font (Inter + Geist Mono) | Zero CLS, self-hosted |
| Email | Resend + react-email | Transactional, dev-friendly |
| CMS | Contentlayer + MDX (Phase 2) | Type-safe content for case studies/blog |
| Auth | NextAuth.js v5 (fleet portal) | JWT + session, provider-agnostic |
| DB | Supabase (PostgreSQL) | Quotes, service tickets, fleet assets |
| Cache | Vercel KV (Redis) | Rate limiting, session store |
| Search | Algolia InstantSearch | Product/content search with analytics |
| Analytics | Vercel Analytics + GA4 | Privacy-first, Core Web Vitals |
| Monitoring | Sentry | Error tracking, performance traces |
| CI/CD | Vercel (preview + prod) | Zero-config, branch previews |

---

## 8. PERFORMANCE BUDGETS

| Metric | Budget | Target |
|--------|--------|--------|
| LCP | ≤ 2.5 s | ≤ 1.8 s |
| INP | ≤ 200 ms | ≤ 100 ms |
| CLS | ≤ 0.1 | ≤ 0.05 |
| FCP | ≤ 1.8 s | ≤ 1.2 s |
| TTFB | ≤ 600 ms | ≤ 200 ms (edge cached) |
| JS Bundle (initial) | ≤ 150 KB gzip | ≤ 100 KB |
| CSS | ≤ 20 KB gzip | ≤ 12 KB |
| Hero image | ≤ 150 KB (AVIF) | ≤ 80 KB |
| Lighthouse score | ≥ 90 all categories | ≥ 95 |
| Total page weight | ≤ 1.5 MB | ≤ 800 KB |

### Strategies
- **Images**: `next/image` with AVIF/WebP, explicit `width`/`height`, `priority` on LCP image
- **Fonts**: `display: swap`, preload critical weight, `next/font` for zero CLS
- **JS**: Route-based code splitting, dynamic imports for heavy components (gallery, map)
- **CSS**: Tailwind JIT purges unused classes; no CSS-in-JS runtime
- **Caching**: ISR for product pages (revalidate: 3600), static for marketing pages
- **Edge**: Middleware on `/api/quote` for geo-routing; static assets on CDN
- **Third-party**: Google Maps loaded async; analytics loaded after interaction

---

## 9. SEO STRUCTURE

### Metadata Strategy
```typescript
// Per-page metadata via Next.js generateMetadata()
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: `${product.name} | TPK Engineering`,
    description: product.seoDescription,
    openGraph: {
      title, description, images: [{ url: product.heroImage, width: 1200, height: 630 }],
      type: 'website', locale: 'en_ZW',
    },
    twitter: { card: 'summary_large_image', title, description, images },
    alternates: { canonical: `https://tpkengineering.co.zw/products/${params.slug}` },
  }
}
```

### Structured Data (JSON-LD)
| Page | Schema Type |
|------|-------------|
| Home | `Organization`, `LocalBusiness`, `WebSite` (sitelinks search) |
| Product | `Product`, `Offer`, `AggregateRating` |
| Product list | `ItemList` |
| Case Study | `Article`, `Review` |
| Contact | `LocalBusiness` with geo coordinates |
| Breadcrumb | `BreadcrumbList` (all pages) |
| FAQ | `FAQPage` (product pages) |

### URL Structure
- Descriptive slugs: `/products/flatbed-trailers` (not `/products/3`)
- Breadcrumbs: `Home › Products › Flatbed Trailers`
- Canonical tags on all pages
- Hreflang: `en-ZW`, `en-ZA`, `en-GB` (SADC market)

### Robots & Sitemap
```
/robots.txt
  Allow: /
  Disallow: /fleet-portal/
  Sitemap: https://tpkengineering.co.zw/sitemap.xml

/sitemap.xml — auto-generated by next-sitemap
  Priority: / = 1.0, /products/* = 0.9, /case-studies/* = 0.8
  Change frequency: products = weekly, case-studies = monthly
```

### Technical SEO Checklist
- [x] Mobile-first responsive (Google mobile-first indexing)
- [x] Core Web Vitals within budget
- [x] HTTPS (enforced via Vercel)
- [x] No broken links (checked in CI)
- [x] Semantic HTML (h1→h6 hierarchy, landmark elements)
- [x] Alt text on all images (automated required field in CMS)
- [x] Internal linking: each product links to related products + relevant case studies
- [x] Page speed (target 95+ PageSpeed score)
- [x] Schema.org markup validated
- [x] XML sitemap with `lastmod` timestamps
- [x] Open Graph / Twitter Card images (1200×630)
