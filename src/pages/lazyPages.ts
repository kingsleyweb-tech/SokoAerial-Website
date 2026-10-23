import { createElement, lazy, type ComponentType } from 'react'

type PageModule<K extends string> = Record<K, ComponentType>

function lazyPage<K extends string>(load: () => Promise<PageModule<K>>, name: K) {
  let Loaded: ComponentType | undefined
  let pending: Promise<{ default: ComponentType }> | undefined
  const preload = () =>
    (pending ??= load().then(
      (m) => {
        Loaded = m[name]
        return { default: m[name] }
      },
      (error: unknown) => {
        pending = undefined
        throw error
      },
    ))
  const Lazy = lazy(preload)
  const Page = () => createElement(Loaded ?? Lazy)
  return Object.assign(Page, { preload })
}

export const AboutPage = lazyPage(() => import('./About/AboutPage'), 'AboutPage')
export const CapabilitiesPage = lazyPage(() => import('./Capabilities/CapabilitiesPage'), 'CapabilitiesPage')
export const ContactPage = lazyPage(() => import('./Contact/ContactPage'), 'ContactPage')
export const GalleryPage = lazyPage(() => import('./Gallery/GalleryPage'), 'GalleryPage')
export const LegalPage = lazyPage(() => import('./Legal/LegalPage'), 'LegalPage')
export const PrivacyPage = lazyPage(() => import('./Privacy/PrivacyPage'), 'PrivacyPage')
export const DesktopPage = lazyPage(() => import('./Products/DesktopPage'), 'DesktopPage')
export const MobilePage = lazyPage(() => import('./Products/MobilePage'), 'MobilePage')
export const RadiosPage = lazyPage(() => import('./Products/RadiosPage'), 'RadiosPage')
export const WatcherPage = lazyPage(() => import('./Products/WatcherPage'), 'WatcherPage')
export const FlashPage = lazyPage(() => import('./Products/FlashPage'), 'FlashPage')
export const WatchPage = lazyPage(() => import('./Products/WatchPage'), 'WatchPage')
export const WebPage = lazyPage(() => import('./Products/WebPage'), 'WebPage')

const pages = [
  AboutPage,
  CapabilitiesPage,
  ContactPage,
  GalleryPage,
  LegalPage,
  PrivacyPage,
  DesktopPage,
  MobilePage,
  RadiosPage,
  WatcherPage,
  FlashPage,
  WatchPage,
  WebPage,
]

export function preloadPages() {
  for (const page of pages) page.preload().catch(() => {})
}
