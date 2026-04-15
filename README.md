# TPK Engineering — Website

> Principal Architect: Vercel | Next.js 15 · TypeScript · Tailwind CSS · Framer Motion

A production-ready marketing and lead-generation website for TPK Engineering, a trailer manufacturer serving mining, agriculture, construction and freight industries across sub-Saharan Africa.

## Quick Start

```bash
npm install
npm run dev         # http://localhost:3000
npm run build       # production build
npm run start       # serve production build
```

## Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── layout.tsx          # Root layout (header, footer, metadata)
│   ├── page.tsx            # Home page
│   ├── products/
│   │   ├── page.tsx        # Product catalog
│   │   └── [slug]/page.tsx # Product detail (SSG)
│   ├── case-studies/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── quote/page.tsx
│   ├── service-request/page.tsx
│   └── api/
│       ├── quote/route.ts
│       ├── contact/route.ts
│       └── service-request/route.ts
├── components/
│   ├── layout/             # Header, Footer
│   ├── sections/           # Page section components
│   ├── ui/                 # Primitive components
│   └── forms/              # Form components (React Hook Form + Zod)
├── lib/
│   ├── config.ts           # Site config, navigation
│   ├── utils.ts            # Shared utilities
│   └── data/               # Static data (products, case studies, testimonials)
└── types/
    └── index.ts            # TypeScript interfaces
```

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, stats, products, case study, services, testimonials |
| Products | `/products` | Full catalog with filter |
| Product Detail | `/products/[slug]` | Specs, gallery, options, quote CTA |
| Case Studies | `/case-studies` | Industry-filtered listing |
| Case Study | `/case-studies/[slug]` | Full narrative with results |
| About | `/about` | History timeline, values, certifications |
| Contact | `/contact` | Offices, form, WhatsApp link |
| Quote | `/quote` | Multi-step quote wizard |
| Service Request | `/service-request` | Breakdown / maintenance logging |
| 404 | `*` | Custom not-found page |

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full architecture blueprint including:
- Site map
- User flows
- Data models
- API requirements
- Component inventory (40 items)
- Page wireframes
- Tech stack
- Performance budgets
- SEO structure

## Production Integration Checklist

- [ ] Replace `console.log` in API routes with Supabase inserts + Resend email triggers
- [ ] Add NextAuth.js for fleet portal authentication
- [ ] Connect Algolia for product/content search
- [ ] Set up Vercel Analytics + GA4
- [ ] Add Sentry for error monitoring
- [ ] Generate `og-default.jpg` and `/logo.png`
- [ ] Replace Unsplash placeholder images with real product photography
- [ ] Set `NEXT_PUBLIC_SITE_URL` environment variable
- [ ] Configure `next-sitemap` in `postbuild` script
- [ ] Set up Vercel KV for rate limiting on API routes

## Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://tpkengineering.co.zw
SUPABASE_URL=
SUPABASE_ANON_KEY=
RESEND_API_KEY=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
NEXT_PUBLIC_ALGOLIA_APP_ID=
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=
```
