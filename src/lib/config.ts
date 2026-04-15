import type { SiteConfig, NavItem } from '@/types'

export const siteConfig: SiteConfig = {
  name: 'TPK Engineering',
  tagline: "Africa's Most Trusted Trailer Manufacturer",
  description:
    'TPK Engineering manufactures precision-engineered trailers for mining, agriculture, construction and freight industries across sub-Saharan Africa. 35+ years of excellence.',
  url: 'https://tpkengineering.co.zw',
  phone: '+263 4 750 000',
  emergencyPhone: '+263 77 000 9999',
  email: 'info@tpkengineering.co.zw',
  address: {
    street: '14 Coventry Road, Workington',
    city: 'Harare',
    province: 'Harare Province',
    country: 'Zimbabwe',
    postalCode: '0001',
  },
  social: {
    linkedin: 'https://linkedin.com/company/tpk-engineering',
    facebook: 'https://facebook.com/tpkengineering',
    whatsapp: 'https://wa.me/263770009999',
  },
  certifications: ['ISO 9001:2015', 'SABS Certified', 'ZINARA Approved', 'SAE Compliant'],
}

export const navigation: NavItem[] = [
  {
    label: 'Products',
    href: '/products',
    children: [
      {
        label: 'Flatbed Trailers',
        href: '/products/flatbed-trailers',
        description: 'Standard & extendable flatbeds, up to 35T payload',
        icon: 'Truck',
      },
      {
        label: 'Curtainsider Trailers',
        href: '/products/curtainsider-trailers',
        description: 'Tautliner with full side access, 90m³ capacity',
        icon: 'Box',
      },
      {
        label: 'Refrigerated Trailers',
        href: '/products/refrigerated-trailers',
        description: 'Multi-temp reefer units, -25°C to +25°C',
        icon: 'Snowflake',
      },
      {
        label: 'Tanker Trailers',
        href: '/products/tanker-trailers',
        description: 'Fuel, chemical and water tankers',
        icon: 'Cylinder',
      },
      {
        label: 'Lowbed Trailers',
        href: '/products/lowbed-trailers',
        description: 'Hydraulic neck lowbeds for heavy haul',
        icon: 'ArrowDown',
      },
      {
        label: 'Tipper Trailers',
        href: '/products/tipper-trailers',
        description: 'End & side tipper configurations',
        icon: 'ChevronDown',
      },
      {
        label: 'Side-Tipper Trailers',
        href: '/products/side-tipper-trailers',
        description: 'High-cycle mining side-tippers',
        icon: 'RotateCcw',
      },
      {
        label: 'Custom Solutions',
        href: '/products/custom-solutions',
        description: 'Engineered to your exact specification',
        icon: 'Settings2',
      },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      {
        label: 'Maintenance & Repairs',
        href: '/services/maintenance-repairs',
        description: '24/7 breakdown support across the region',
        icon: 'Wrench',
      },
      {
        label: 'Fleet Management',
        href: '/services/fleet-management',
        description: 'Asset tracking, maintenance scheduling',
        icon: 'LayoutDashboard',
      },
      {
        label: 'Parts & Accessories',
        href: '/services/parts-accessories',
        description: 'Genuine OEM parts, fast dispatch',
        icon: 'Package',
      },
      {
        label: 'Roadworthy Inspections',
        href: '/services/roadworthy-inspections',
        description: 'ZINARA-certified pre-clearance inspections',
        icon: 'ClipboardCheck',
      },
      {
        label: 'Warranty Support',
        href: '/services/warranty-support',
        description: '3-year structural warranty, nation-wide',
        icon: 'Shield',
      },
    ],
  },
  {
    label: 'Solutions',
    href: '/solutions',
    children: [
      { label: 'Mining', href: '/solutions/mining', icon: 'Pickaxe' },
      { label: 'Agriculture', href: '/solutions/agriculture', icon: 'Wheat' },
      { label: 'Construction', href: '/solutions/construction', icon: 'HardHat' },
      { label: 'Retail / FMCG', href: '/solutions/retail-fmcg', icon: 'ShoppingCart' },
      { label: 'Fuel & Chemicals', href: '/solutions/fuel-chemicals', icon: 'Flame' },
    ],
  },
  {
    label: 'Case Studies',
    href: '/case-studies',
  },
  {
    label: 'About',
    href: '/about',
  },
]
