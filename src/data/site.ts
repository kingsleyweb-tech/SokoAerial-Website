import { images } from './media'

export const paths = {
  home: '/',
  capabilities: '/capabilities',
  gallery: '/gallery',
  contact: '/contact',
  about: '/about',
  web: '/sigtrack-web',
  mobile: '/sigtrack-mobile',
  desktop: '/sigtrack-desktop',
  radios: '/radios',
  legal: '/legal-notice',
  privacy: '/privacy',
  plans: '/plans',
} as const

export const contact = {
  addressLines: ['Burma Camp', 'Accra 12345'],
  address: 'Burma Camp, Accra 12345',
  phoneDisplay: '+233 24 324 9309',
  phoneLegal: '+233243249309',
  phoneHref: 'tel:+233243249309',
  email: 'sokoaerial@gmail.com',
  site: 'sigtrackapp.com',
}

export type ProductId = 'web' | 'mobile' | 'desktop' | 'radios'

export interface ProductLink {
  id: ProductId
  label: string
  short: string
  to: string
  image: string
}

export const productLinks: ProductLink[] = [
  { id: 'web', label: 'Sigtrack Web', short: 'Web', to: paths.web, image: images.webDashboard },
  { id: 'mobile', label: 'Sigtrack Mobile', short: 'Mobile', to: paths.mobile, image: images.mobileRadioMap },
  { id: 'desktop', label: 'Sigtrack Desktop', short: 'Desktop', to: paths.desktop, image: images.desktopTracking },
  { id: 'radios', label: 'Radios', short: 'Radios', to: paths.radios, image: images.silvusRadio },
]

/** Pages listed in the full-screen index, with the preview shown on hover. */
export const indexPages = [
  { label: 'Home', to: paths.home, image: images.sigtrackRadioTable, blurb: 'Eyes in the sky — the all-in-one response solution.' },
  { label: 'Capabilities', to: paths.capabilities, image: images.desktopSatellite, blurb: 'Dual usage: military ISR and civilian mapping, side by side.' },
  { label: 'Gallery', to: paths.gallery, image: images.commandSetup, blurb: 'Sigtrack Web, Mobile and Desktop in use.' },
  { label: 'About Us', to: paths.about, image: images.fieldTeam, blurb: 'Drones, software and seamless radio connectivity.' },
  { label: 'Contact', to: paths.contact, image: images.webMeshMap, blurb: 'Burma Camp, Accra — call, email or send a message.' },
]

export const footerColumns = [
  { title: 'Products', links: productLinks.map(({ label, to }) => ({ label, to })) },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: paths.about },
      { label: 'Capabilities', to: paths.capabilities },
      { label: 'Gallery', to: paths.gallery },
      { label: 'Contact', to: paths.contact },
    ],
  },
  {
    title: 'Get Sigtrack',
    links: [
      { label: 'Plans', to: paths.plans },
      { label: 'Payment', to: `${paths.plans}?plan=pro` },
      { label: 'Try the demo', to: `${paths.web}#demo` },
    ],
  },
]

/** Software options offered on the live sigtrackapp.com payment form. */
export const softwareOptions = ['Sigtrack Desktop Professional', 'Sigtrack Mobile', 'Sigtrack Web']

export const plans = {
  basic: { label: 'Basic plan', monthly: 0, yearly: 0 },
  pro: { label: 'Professional plan', monthly: 50, yearlyLabel: 'USD 6K', yearly: 6000 },
} as const
