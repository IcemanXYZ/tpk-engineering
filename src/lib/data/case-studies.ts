import type { CaseStudy } from '@/types'

export const caseStudies: CaseStudy[] = [
  {
    id: 'cs001',
    slug: 'zimplats-fleet-expansion',
    title: 'Zimplats Fleet Expansion: 120 Side-Tippers in 18 Months',
    client: 'Zimplats Holdings',
    industry: 'mining',
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    summary:
      'When Zimplats needed to double its ore haulage capacity across the Great Dyke, TPK Engineering delivered 120 Hardox 500 side-tippers on schedule — reducing operational downtime by 40% vs. the imported fleet they replaced.',
    challenge:
      "Zimplats' existing imported fleet was experiencing excessive wear in the abrasive platinum ore environment. Average body replacement interval had dropped to 14 months, creating unpredictable capex and significant downtime. The client required a locally supportable solution with faster turnaround on repairs and a 24-month+ body life.",
    solution:
      "TPK Engineering's engineering team collaborated with Zimplats maintenance engineers to specify a Hardox 500 base plate with Hardox 450 sides. The body geometry was redesigned with a steeper 58° tip angle to achieve complete self-cleaning, eliminating the carryback that was accelerating premature wear. A dedicated on-site service contract was established with four TPK-employed technicians at the mine.",
    results: [
      { label: 'Trailers Delivered', value: '120', unit: 'units', improvement: 'on time' },
      { label: 'Body Wear Life', value: '28', unit: 'months avg', improvement: '+100% vs. prior fleet' },
      { label: 'Fleet Downtime', value: '40', unit: '% reduction', improvement: 'vs. baseline year' },
      { label: 'Payload Increase', value: '8', unit: '%', improvement: 'from lighter body spec' },
      { label: 'Parts Response Time', value: '4', unit: 'hrs avg', improvement: 'vs. 72hrs for imports' },
      { label: 'Total Cost of Ownership', value: '22', unit: '% lower', improvement: 'over 5-year period' },
    ],
    productsUsed: ['side-tipper-trailers'],
    testimonial: {
      id: 't001',
      author: 'Blessing Chikwanda',
      role: 'VP Operations',
      company: 'Zimplats Holdings',
      industry: 'mining',
      quote:
        "TPK didn't just sell us trailers — they partnered with us to solve an operational problem. The body life improvement alone justified the switch. Having local engineering support on-site is a game-changer in our environment.",
      rating: 5,
    },
    publishedAt: '2024-03-15',
    tags: ['mining', 'side-tipper', 'fleet-expansion', 'total-cost-of-ownership'],
    featured: true,
  },
  {
    id: 'cs002',
    slug: 'innscor-cold-chain-upgrade',
    title: 'Innscor Cold Chain: Nationwide Reefer Standardisation',
    client: 'Innscor Africa',
    industry: 'retail-fmcg',
    heroImage: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80',
    summary:
      'Innscor replaced a disparate mix of aging refrigerated trailers with 34 standardised TPK reefer units, achieving HACCP compliance, reducing refrigerant consumption by 18%, and improving on-time delivery by 12%.',
    challenge:
      "Innscor's distribution division was operating 11 different trailer configurations across its cold chain, making parts management complex and driver training inconsistent. Multiple refrigeration brands created a specialist technician shortage. A food safety audit flagged temperature excursion risks from aging door seals and inadequate evaporator capacity.",
    solution:
      'TPK specified a single standard reefer configuration across the fleet: 13.4 m GRP/aluminium body, Thermo King T-1200R with DataLogic HACCP recorder, dual-temperature capability, and remote GSM temperature monitoring. TPK also supplied a master spare parts kit and conducted a two-day maintenance training program for Innscor's workshop team.',
    results: [
      { label: 'Trailers Standardised', value: '34', unit: 'units' },
      { label: 'Refrigerant Consumption', value: '18', unit: '% reduction' },
      { label: 'On-Time Delivery', value: '12', unit: '% improvement' },
      { label: 'HACCP Compliance', value: '100', unit: '%', improvement: 'passed audit' },
      { label: 'Temperature Excursions', value: '0', unit: 'per quarter', improvement: 'post-deployment' },
    ],
    productsUsed: ['refrigerated-trailers'],
    testimonial: {
      id: 't002',
      author: 'Tendai Mafumo',
      role: 'Head of Logistics',
      company: 'Innscor Africa',
      industry: 'retail-fmcg',
      quote:
        'The standardisation project transformed our cold chain. One trailer spec, one spare parts list, one training programme. Our HACCP audit passed first time and our drivers love the consistency.',
      rating: 5,
    },
    publishedAt: '2024-05-20',
    tags: ['refrigerated', 'cold-chain', 'fmcg', 'haccp', 'standardisation'],
    featured: true,
  },
  {
    id: 'cs003',
    slug: 'mashonaland-agri-flatbed',
    title: 'Mashonaland Tobacco Cooperative: Seasonal Fleet Solution',
    client: 'Mashonaland Tobacco Cooperative',
    industry: 'agriculture',
    heroImage: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80',
    summary:
      'A 25-unit flatbed fleet built for the punishing roads of Zimbabwe's tobacco heartland — with a local service agreement that kept 98% trailer availability during the critical 10-week selling season.',
    challenge:
      "The cooperative needed trailers capable of operating on C-class and D-class roads between farms and auction floors, while meeting ZINARA roadworthy requirements at weigh bridges. Previous fleet showed chronic suspension and deck cracking issues from overloading on poor surfaces.",
    solution:
      'TPK Engineering specified a reinforced flatbed with thickened main rails (180×80×8 RHS vs. standard 6 mm), upgraded to Hendrickson HN461 suspension with extra load capacity, and applied a Safeguard wax-injection anti-corrosion treatment to all hollow sections. A pre-season inspection program was included in the contract.',
    results: [
      { label: 'Fleet Availability', value: '98', unit: '%', improvement: 'during peak season' },
      { label: 'Suspension Failures', value: '0', unit: 'in-season', improvement: 'vs. 14 prior year' },
      { label: 'ZINARA Pass Rate', value: '100', unit: '%', improvement: 'all units, all weigh bridges' },
      { label: 'Season Uptime', value: '10', unit: 'weeks uninterrupted' },
    ],
    productsUsed: ['flatbed-trailers'],
    testimonial: {
      id: 't003',
      author: 'Farai Mutasa',
      role: 'General Manager',
      company: 'Mashonaland Tobacco Cooperative',
      industry: 'agriculture',
      quote:
        "During tobacco season, a broken trailer doesn't mean lost revenue — it means farmers don't eat. TPK's build quality and their pre-season inspection program gave us the certainty we needed.",
      rating: 5,
    },
    publishedAt: '2024-07-10',
    tags: ['agriculture', 'flatbed', 'tobacco', 'seasonal', 'rural-roads'],
    featured: false,
  },
  {
    id: 'cs004',
    slug: 'nyamandlovu-water-tanker',
    title: 'ZINWA Water Infrastructure: 60 Tankers for Rural Delivery',
    client: 'ZINWA (Zimbabwe National Water Authority)',
    industry: 'fuel-chemicals',
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    summary:
      'Government emergency water delivery program required 60 food-grade water tankers in 90 days. TPK mobilised a second shift and delivered on time, providing safe water access to 250,000 rural residents.',
    challenge:
      "Zimbabwe's 2023 drought emergency required rapid deployment of potable water tankers to rural districts. ZINWA required food-grade stainless steel tanks, DN80 gravity-discharge fittings, and ZINARA-approved roadworthy certificates — all within a 90-day window that traditional procurement could not meet.",
    solution:
      'TPK activated a surge-capacity manufacturing protocol, extended to two 10-hour shifts, and sourced 304 SS coil stock from a pre-qualified South African mill to meet food-grade certification. Sanitation fittings were specified to WHO potable water guidelines. All 60 units passed ZINARA roadworthy inspection.',
    results: [
      { label: 'Units Delivered', value: '60', unit: 'tankers', improvement: 'on time, Day 88' },
      { label: 'Residents Served', value: '250,000', unit: 'people' },
      { label: 'Districts Covered', value: '12', unit: 'rural districts' },
      { label: 'ZINARA Pass Rate', value: '100', unit: '%' },
      { label: 'Delivery Timeline', value: '88', unit: 'days', improvement: '2 days early' },
    ],
    productsUsed: ['tanker-trailers'],
    publishedAt: '2023-12-01',
    tags: ['tanker', 'water', 'government', 'emergency', 'stainless-steel'],
    featured: false,
  },
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug)
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((cs) => cs.featured)
}

export function getCaseStudiesByIndustry(industry: string): CaseStudy[] {
  return caseStudies.filter((cs) => cs.industry === industry)
}
