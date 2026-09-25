import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { contact, indexPages, paths, productLinks } from '../../data/site'
import styles from '../../styles/IndexMenu.module.css'
import { CloseIcon } from '../Icons/Icons'
import { Pill } from '../Pill/Pill'

interface IndexMenuProps {
  open: boolean
  onClose: () => void
}

const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.18 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0.7, 0.2, 1] } },
}

const pad = (n: number) => String(n).padStart(2, '0')

export function IndexMenu({ open, onClose }: IndexMenuProps) {
  const { pathname } = useLocation()
  const currentIndex = Math.max(
    0,
    indexPages.findIndex((p) => p.to === pathname),
  )
  const [hovered, setHovered] = useState<number | null>(null)
  const preview = indexPages[hovered ?? currentIndex]
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const close = useEffectEvent(onClose)

  // Lock background scroll, move focus in, trap Tab, close on Escape.
  useEffect(() => {
    if (!open) return
    const opener = document.activeElement as HTMLElement | null
    document.body.classList.add('is-locked')
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')).filter(
        (el) => el.offsetParent !== null,
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('is-locked')
      document.removeEventListener('keydown', onKey)
      opener?.focus()
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          id="site-index"
          className={styles.index}
          role="dialog"
          aria-modal="true"
          aria-label="Site index"
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          exit={{ clipPath: 'inset(0 100% 0 0)' }}
          transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <div className={styles.closeColumn}>
            <motion.button
              ref={closeRef}
              type="button"
              className={styles.close}
              aria-label="Close index"
              onClick={onClose}
              initial={{ rotate: -90 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <CloseIcon />
            </motion.button>
            <span className={styles.closeLabel}>Close</span>
          </div>

          <div className={styles.body}>
            <div className={styles.left}>
              <motion.nav aria-label="Pages" className={styles.pages} variants={list} initial="hidden" animate="visible">
                {indexPages.map((p, i) => (
                  <motion.div key={p.to} variants={item}>
                    <Link
                      to={p.to}
                      className={styles.pageLink}
                      data-active={(hovered ?? currentIndex) === i || undefined}
                      aria-current={pathname === p.to ? 'page' : undefined}
                      onMouseEnter={() => setHovered(i)}
                      onFocus={() => setHovered(i)}
                      onClick={onClose}
                    >
                      <span className={styles.pageNum}>{pad(i + 1)}</span>
                      <span className={styles.pageLabel}>{p.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>
              <div className={styles.meta}>
                <span>
                  {contact.addressLines[0]}
                  <br />
                  {contact.addressLines[1]}
                </span>
                <span>
                  <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
                  <br />
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </span>
                <span>
                  <Link to={paths.legal} onClick={onClose}>
                    Legal Notice
                  </Link>
                  <br />
                  <Link to={paths.privacy} onClick={onClose}>
                    Privacy
                  </Link>
                </span>
              </div>
            </div>

            <div className={styles.right}>
              <div className={`${styles.preview} topo photo`}>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.img
                    key={preview.to}
                    src={preview.image}
                    alt=""
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  />
                </AnimatePresence>
                <span className={styles.previewTag}>Preview · {preview.label}</span>
                <span className={styles.previewBlurb}>{preview.blurb}</span>
              </div>
              <span className={styles.productsLabel}>Products</span>
              <ul className={styles.products}>
                {productLinks.map((p) => (
                  <li key={p.id}>
                    <Link to={p.to} className={styles.product} onClick={onClose}>
                      <span className={`${styles.productImage} topo photo`}>
                        <img src={p.image} alt="" loading="lazy" />
                      </span>
                      <span className={styles.productLabel}>{p.short}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Pill to={paths.plans} variant="signal" block onClick={onClose}>
                Get Sigtrack
              </Pill>
              <div className={styles.mobileContact}>
                <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
