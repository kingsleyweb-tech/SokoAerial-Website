import { AnimatePresence, motion } from 'framer-motion'
import { useState, type FocusEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRightIcon } from '../../components/Icons/Icons'
import { LaptopFrame } from '../../components/LaptopFrame/LaptopFrame'
import { PhoneFrame } from '../../components/PhoneFrame/PhoneFrame'
import { WatchFrame } from '../../components/WatchFrame/WatchFrame'
import { systemProducts } from '../../data/content'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import styles from '../../styles/HomeSections.module.css'

type Product = (typeof systemProducts)[number]
const pad = (n: number) => String(n).padStart(2, '0')
const exploreLabel = (p: Product) => (p.name === 'Sigtrack' ? `Sigtrack ${p.sub}` : p.sub)

function Device({ p }: { p: Product }) {
  const alt = `${p.name} ${p.sub}`
  switch (p.frame) {
    case 'phone':
      return <PhoneFrame src={p.image} alt={alt} className={styles.devicePhone} loading="lazy" />
    case 'laptop':
      return <LaptopFrame src={p.image} alt={alt} className={styles.deviceLaptop} loading="lazy" />
    case 'watch':
      return (
        <WatchFrame className={styles.deviceWatch}>
          <img src={p.image} alt={alt} loading="lazy" />
        </WatchFrame>
      )
    case 'browser':
      return (
        <div className={styles.deviceBrowser}>
          <span className={styles.browserBar} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <img src={p.image} alt={alt} loading="lazy" />
        </div>
      )
    default:
      return (
        <div className={`${styles.devicePhoto} topo photo`}>
          <img src={p.image} alt={alt} loading="lazy" />
        </div>
      )
  }
}

export function ProductShowcase() {
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [stopped, setStopped] = useState(false)
  const compact = useMediaQuery('(max-width: 1023px)')
  const cur = systemProducts[active]
  const paused = hovered || stopped
  const next = () => setActive((i) => (i + 1) % systemProducts.length)

  const pauseHandlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setHovered(true),
    onBlur: (e: FocusEvent<HTMLElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget)) setHovered(false)
    },
  }

  const preview = (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={cur.sub}
        className={styles.previewInner}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <div className={styles.stage}>
          <Device p={cur} />
        </div>
        <p className={styles.previewText}>{cur.desc}</p>
        {compact && (
          <Link to={cur.to} className={styles.exploreLink}>
            Explore {exploreLabel(cur)} <ArrowUpRightIcon />
          </Link>
        )}
      </motion.div>
    </AnimatePresence>
  )

  const progress = (i: number) =>
    i === active && <i key={active} className={styles.rowProgress} aria-hidden="true" onAnimationEnd={next} />

  return (
    <section id="products" className={styles.products} aria-labelledby="products-title" data-paused={paused || undefined}>
      <div className={styles.productsHead}>
        <span className="chip chip--dark">The system</span>
        <h2 id="products-title" className={styles.h2}>
          Seven products, <em className="serif">one picture.</em>
        </h2>
        <button
          type="button"
          className={styles.autoToggle}
          aria-pressed={stopped}
          onClick={() => setStopped((s) => !s)}
        >
          <span aria-hidden="true">{stopped ? '▶' : '❚❚'}</span>
          {stopped ? 'Play' : 'Pause'} rotation
        </button>
      </div>

      {compact ? (
        <div className={styles.productsCompact} {...pauseHandlers}>
          <div className={styles.preview} aria-live="polite">
            {preview}
          </div>
          <ul className={styles.productList}>
            {systemProducts.map((p, i) => (
              <li key={p.sub}>
                <button
                  type="button"
                  className={styles.productRow}
                  data-active={i === active || undefined}
                  aria-pressed={i === active}
                  onClick={() => setActive(i)}
                >
                  <span className={styles.rowNum}>{pad(i + 1)}</span>
                  <span className={styles.rowName}>
                    {p.name} <em className="serif">{p.sub}</em>
                  </span>
                  <span className={styles.rowMeta}>{p.platform}</span>
                  {progress(i)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={styles.productsGrid} {...pauseHandlers}>
          <ul className={styles.productList}>
            {systemProducts.map((p, i) => (
              <li key={p.sub}>
                <Link
                  to={p.to}
                  className={styles.productRow}
                  data-active={i === active || undefined}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <span className={styles.rowNum}>{pad(i + 1)}</span>
                  <span className={styles.rowName}>
                    {p.name} <em className="serif">{p.sub}</em>
                  </span>
                  <span className={styles.rowMeta}>{p.platform}</span>
                  <ArrowUpRightIcon className={styles.rowArrow} />
                  {progress(i)}
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.preview}>{preview}</div>
        </div>
      )}
    </section>
  )
}
