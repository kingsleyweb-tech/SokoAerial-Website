import { lazy } from 'react'

// Home ships in the main bundle; other pages load on first visit.
export const AboutPage = lazy(() => import('./About/AboutPage').then((m) => ({ default: m.AboutPage })))
export const CapabilitiesPage = lazy(() =>
  import('./Capabilities/CapabilitiesPage').then((m) => ({ default: m.CapabilitiesPage })),
)
export const ContactPage = lazy(() => import('./Contact/ContactPage').then((m) => ({ default: m.ContactPage })))
export const GalleryPage = lazy(() => import('./Gallery/GalleryPage').then((m) => ({ default: m.GalleryPage })))
export const LegalPage = lazy(() => import('./Legal/LegalPage').then((m) => ({ default: m.LegalPage })))
export const PrivacyPage = lazy(() => import('./Privacy/PrivacyPage').then((m) => ({ default: m.PrivacyPage })))
export const DesktopPage = lazy(() => import('./Products/DesktopPage').then((m) => ({ default: m.DesktopPage })))
export const MobilePage = lazy(() => import('./Products/MobilePage').then((m) => ({ default: m.MobilePage })))
export const RadiosPage = lazy(() => import('./Products/RadiosPage').then((m) => ({ default: m.RadiosPage })))
export const WebPage = lazy(() => import('./Products/WebPage').then((m) => ({ default: m.WebPage })))
export const PlansPage = lazy(() => import('./Plans/PlansPage').then((m) => ({ default: m.PlansPage })))
