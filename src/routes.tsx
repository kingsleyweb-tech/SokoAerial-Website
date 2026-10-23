import type { ReactElement } from 'react'
import { paths, type ProductId } from './data/site'
import { HomePage } from './pages/Home/HomePage'
import {
  AboutPage,
  CapabilitiesPage,
  ContactPage,
  DesktopPage,
  FlashPage,
  GalleryPage,
  LegalPage,
  MobilePage,
  PrivacyPage,
  RadiosPage,
  WatcherPage,
  WatchPage,
  WebPage,
} from './pages/lazyPages'

type Tone = 'dark' | 'light'

export interface PageRoute {
  path: string
  title: string
  element: ReactElement
  rail: { label: string; short?: string; num: number }
  tone: { actions: Tone; capsule: Tone }
  product?: ProductId
}

export const pageRoutes: PageRoute[] = [
  { path: paths.home, title: 'Sigtrack', element: <HomePage />, rail: { label: 'Home', num: 1 }, tone: { actions: 'dark', capsule: 'dark' } },
  { path: paths.capabilities, title: 'Capabilities', element: <CapabilitiesPage />, rail: { label: 'Capabilities', num: 2 }, tone: { actions: 'light', capsule: 'light' } },
  { path: paths.gallery, title: 'Gallery', element: <GalleryPage />, rail: { label: 'Gallery', num: 3 }, tone: { actions: 'dark', capsule: 'dark' } },
  { path: paths.contact, title: 'Contact', element: <ContactPage />, rail: { label: 'Contact', num: 4 }, tone: { actions: 'dark', capsule: 'dark' } },
  { path: paths.about, title: 'About Us', element: <AboutPage />, rail: { label: 'About Us', num: 5 }, tone: { actions: 'dark', capsule: 'dark' } },
  { path: paths.web, title: 'Sigtrack Web', element: <WebPage />, rail: { label: 'Sigtrack Web', short: 'Web', num: 6 }, tone: { actions: 'light', capsule: 'light' }, product: 'web' },
  { path: paths.mobile, title: 'Sigtrack Mobile', element: <MobilePage />, rail: { label: 'Sigtrack Mobile', short: 'Mobile', num: 7 }, tone: { actions: 'light', capsule: 'light' }, product: 'mobile' },
  { path: paths.desktop, title: 'Sigtrack Desktop', element: <DesktopPage />, rail: { label: 'Sigtrack Desktop', short: 'Desktop', num: 8 }, tone: { actions: 'dark', capsule: 'dark' }, product: 'desktop' },
  { path: paths.watch, title: 'Sigtrack Watch', element: <WatchPage />, rail: { label: 'Sigtrack Watch', short: 'Watch', num: 9 }, tone: { actions: 'dark', capsule: 'dark' }, product: 'watch' },
  { path: paths.radios, title: 'Radios', element: <RadiosPage />, rail: { label: 'Radios', num: 10 }, tone: { actions: 'light', capsule: 'dark' }, product: 'radios' },
  { path: paths.watcher, title: 'Watcher', element: <WatcherPage />, rail: { label: 'Watcher', num: 11 }, tone: { actions: 'dark', capsule: 'dark' }, product: 'watcher' },
  { path: paths.flash, title: 'Flash', element: <FlashPage />, rail: { label: 'Flash', num: 12 }, tone: { actions: 'light', capsule: 'light' }, product: 'flash' },
  { path: paths.legal, title: 'Legal Notice', element: <LegalPage />, rail: { label: 'Legal Notice', short: 'Legal', num: 13 }, tone: { actions: 'light', capsule: 'light' } },
  { path: paths.privacy, title: 'Privacy Policy', element: <PrivacyPage />, rail: { label: 'Privacy Policy', short: 'Privacy', num: 14 }, tone: { actions: 'light', capsule: 'light' } },
]

export const pageCount = pageRoutes.length

export const legacyRedirects: Record<string, string> = {
  '/about-us-13': paths.about,
  '/sigtackweb': paths.web,
  '/chooseplan': paths.contact,
  '/payment': paths.contact,
  '/exhibition': paths.gallery,
}
