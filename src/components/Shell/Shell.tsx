import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { logo } from '../../data/media'
import { paths, productLinks, type ProductId } from '../../data/site'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import styles from '../../styles/Shell.module.css'
import { Pill } from '../Pill/Pill'

const pad = (n: number) => String(n).padStart(2, '0')

/** Four-dot Index glyph used on the rail and capsule buttons. */
function Dots() {
  return (
    <span className={styles.dots} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </span>
  )
}

interface RailProps {
  page: string
  num: number
  total: number
  indexOpen: boolean
  onOpenIndex: () => void
}

/** Desktop: fixed 80px midnight rail — Index button, vertical wordmark, page name and scroll progress. */
export function SideRail({ page, num, total, indexOpen, onOpenIndex }: RailProps) {
  const progress = useScrollProgress()

  return (
    <aside className={styles.rail} aria-label="Site rail">
      <div className={styles.railTop}>
        <button
          type="button"
          className={styles.indexButton}
          aria-label="Open index"
          aria-expanded={indexOpen}
          aria-controls="site-index"
          onClick={onOpenIndex}
        >
          <Dots />
        </button>
        <span className={styles.railLabel}>Index</span>
      </div>

      <Link to={paths.home} className={styles.railBrand} aria-label="Sigtrack home">
        <img src={logo} alt="" width={36} height={37} />
        <span className={styles.railWordmark}>Sigtrack</span>
      </Link>

      <div className={styles.railBottom}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={page}
            className={styles.railPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {page}
          </motion.span>
        </AnimatePresence>
        <span className={styles.railNum}>
          {pad(num)} / {pad(total)}
        </span>
        <span className={styles.progress} aria-hidden="true">
          <span style={{ transform: `scaleY(${progress})` }} />
        </span>
      </div>
    </aside>
  )
}

interface CapsuleProps {
  page: string
  tone: 'dark' | 'light'
  indexOpen: boolean
  onOpenIndex: () => void
}

/** Mobile: floating capsule with the wordmark, page name and the Index button. */
export function MobileCapsule({ page, tone, indexOpen, onOpenIndex }: CapsuleProps) {
  return (
    <div className={styles.capsuleWrap}>
      <header className={`${styles.capsule} ${styles[tone]}`}>
        <Link to={paths.home} className={styles.capsuleBrand} aria-label="Sigtrack home">
          <img src={logo} alt="" width={28} height={29} />
          <span className={styles.capsuleWordmark}>Sigtrack</span>
          <span className={`serif ${styles.capsulePage}`}>{page}</span>
        </Link>
        <button
          type="button"
          className={styles.capsuleButton}
          aria-label="Open index"
          aria-expanded={indexOpen}
          aria-controls="site-index"
          onClick={onOpenIndex}
        >
          <Dots />
        </button>
      </header>
    </div>
  )
}

interface ActionsProps {
  tone: 'dark' | 'light'
  active?: ProductId
}

/** Desktop: floating product switcher and Get Sigtrack pill, top right of each page. */
export function FloatingActions({ tone, active }: ActionsProps) {
  return (
    <div className={`${styles.actions} ${styles[tone]}`}>
      <nav aria-label="Products" className={styles.switcher}>
        <span className={styles.switcherLabel}>Products</span>
        {productLinks.map((p) => (
          <Link key={p.id} to={p.to} className={styles.switcherLink} aria-current={active === p.id ? 'page' : undefined}>
            {p.short}
          </Link>
        ))}
      </nav>
      <Pill to={paths.plans} variant="signal" size="sm">
        Get Sigtrack
      </Pill>
    </div>
  )
}
