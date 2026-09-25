import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes, matchPath, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer/Footer'
import { IndexMenu } from './components/Shell/IndexMenu'
import { FloatingActions, MobileCapsule, SideRail } from './components/Shell/Shell'
import { paths } from './data/site'
import { legacyRedirects, pageCount, pageRoutes, type PageRoute } from './routes'
import styles from './styles/App.module.css'

function scrollToLocation(hash: string) {
  const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  else window.scrollTo({ top: 0, behavior: 'instant' })
}

// Page change (Foundations v2): the rail stays fixed; content fades out 150ms and in 250ms.
function Page({ route }: { route: PageRoute }) {
  const { hash } = useLocation()

  useEffect(() => {
    document.title = route.path === paths.home ? route.title : `${route.title} · Sigtrack`
  }, [route])

  // Arriving with a hash (e.g. a "Try the demo" link from another page): scroll once content is in place.
  useEffect(() => {
    if (!hash) return
    const id = window.setTimeout(() => scrollToLocation(hash), 80)
    return () => window.clearTimeout(id)
    // Only on arrival; in-page hash changes are handled by App.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } }}
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
