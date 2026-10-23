import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes, matchPath, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer/Footer'
import { IndexMenu } from './components/Shell/IndexMenu'
import { FloatingActions, MobileCapsule, SideRail } from './components/Shell/Shell'
import { paths } from './data/site'
import { preloadPages } from './pages/lazyPages'
import { legacyRedirects, pageCount, pageRoutes, type PageRoute } from './routes'
import styles from './styles/App.module.css'

function scrollToLocation(hash: string) {
  const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  else window.scrollTo({ top: 0, behavior: 'instant' })
}

function Page({ route }: { route: PageRoute }) {
  const { hash } = useLocation()
  const [arrivalHash] = useState(hash)

  useEffect(() => {
    document.title = route.path === paths.home ? route.title : `${route.title} · Sigtrack`
  }, [route])

  useEffect(() => {
    if (!arrivalHash) return
    const id = window.setTimeout(() => scrollToLocation(arrivalHash), 80)
    return () => window.clearTimeout(id)
  }, [arrivalHash])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.2, 0.7, 0.2, 1] } }}
      exit={{ opacity: 0, transition: { duration: 0.15, ease: 'easeIn' } }}
    >
      <main id="main">
        <Suspense fallback={<div className="page-loading" />}>{route.element}</Suspense>
      </main>
      <Footer />
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()
  const [indexOpen, setIndexOpen] = useState(false)
  const current = pageRoutes.find((r) => matchPath(r.path, location.pathname))

  useEffect(() => {
    if (location.hash) scrollToLocation(location.hash)
  }, [location.hash])

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(preloadPages, { timeout: 2500 })
      return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(preloadPages, 1200)
    return () => clearTimeout(id)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      {current && (
        <>
          <SideRail
            page={current.rail.label}
            num={current.rail.num}
            total={pageCount}
            indexOpen={indexOpen}
            onOpenIndex={() => setIndexOpen(true)}
          />
          <MobileCapsule
            page={current.rail.short ?? current.rail.label}
            tone={current.tone.capsule}
            indexOpen={indexOpen}
            onOpenIndex={() => setIndexOpen(true)}
          />
        </>
      )}
      <IndexMenu open={indexOpen} onClose={() => setIndexOpen(false)} />

      <div className={styles.shell}>
        {current && <FloatingActions tone={current.tone.actions} active={current.product} />}
        <AnimatePresence mode="wait" onExitComplete={() => scrollToLocation(location.hash)}>
          <Routes location={location} key={location.pathname}>
            {pageRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={<Page route={route} />} />
            ))}
            {Object.entries(legacyRedirects).map(([from, to]) => (
              <Route key={from} path={from} element={<Navigate to={to} replace />} />
            ))}
            <Route path="*" element={<Navigate to={paths.home} replace />} />
          </Routes>
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
}
