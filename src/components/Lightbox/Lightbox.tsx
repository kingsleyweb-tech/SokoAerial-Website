import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useEffectEvent, useRef, type PointerEvent } from 'react'
import { galleryCategoryLabels, type GalleryItem } from '../../data/content'
import styles from '../../styles/Lightbox.module.css'
import { ArrowIcon, ArrowLeftIcon, CloseIcon } from '../Icons/Icons'

interface LightboxProps {
  items: GalleryItem[]
  open: boolean
  index: number
  onChange: (index: number) => void
  onClose: () => void
}

const pad = (n: number) => String(n).padStart(2, '0')

/** Full-screen image viewer: arrow keys, swipe, Esc to close. */
export function Lightbox({ items, open, index, onChange, onClose }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const swipeX = useRef<number | null>(null)
  const count = items.length
  const current = items[index]

  const go = (delta: number) => onChange((index + delta + count) % count)
  const stepFromKey = useEffectEvent(go)
  const close = useEffectEvent(onClose)

  useEffect(() => {
    if (!open) return
    const opener = document.activeElement as HTMLElement | null
    document.body.classList.add('is-locked')
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') stepFromKey(1)
      if (e.key === 'ArrowLeft') stepFromKey(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('is-locked')
      document.removeEventListener('keydown', onKey)
      opener?.focus()
    }
  }, [open])

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') swipeX.current = e.clientX
  }
  const onPointerUp = (e: PointerEvent) => {
    if (swipeX.current === null) return
    const dx = e.clientX - swipeX.current
    swipeX.current = null
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
  }

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          className={styles.viewer}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.24, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <div className={`${styles.stage} topo`} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={current.src}
                src={current.src}
                alt={current.alt}
                draggable={false}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </AnimatePresence>
            <button type="button" className={styles.prev} aria-label="Previous image" onClick={() => go(-1)}>
              <ArrowLeftIcon />
            </button>
            <button type="button" className={styles.next} aria-label="Next image" onClick={() => go(1)}>
              <ArrowIcon />
            </button>
          </div>

          <aside className={styles.side}>
            <div className={styles.top}>
              <span className={`serif ${styles.counter}`} aria-live="polite">
                {pad(index + 1)}/{pad(count)}
              </span>
              <button ref={closeRef} type="button" className={styles.close} aria-label="Close viewer" onClick={onClose}>
                <CloseIcon />
              </button>
            </div>
            <div className={styles.info}>
              <span className={styles.category}>{galleryCategoryLabels[current.category]}</span>
              <span className={styles.caption}>{current.caption}</span>
            </div>
            <div className={styles.thumbs}>
              {items.map((it, i) => (
                <button
                  key={it.src}
                  type="button"
                  className={`${styles.thumb} topo`}
                  aria-label={`Image ${i + 1}: ${it.caption}`}
                  aria-current={i === index ? 'true' : undefined}
                  onClick={() => onChange(i)}
                >
                  <img src={it.src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
            <span className={`${styles.hint} hide-mobile`}>← → keys · Swipe · Esc to close</span>
          </aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
