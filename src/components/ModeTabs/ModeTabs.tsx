import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import styles from '../../styles/Desktop.module.css'
import { LaptopFrame } from '../LaptopFrame/LaptopFrame'

interface Mode {
  label: string
  image: string
  items: { t: string; b: string }[]
}

interface ModeTabsProps {
  modes: Mode[]
  /** Accessible name for the section and tab list. */
  label: string
  /** Prefix for the laptop screenshot's alt text, e.g. "Watcher". */
  product: string
  onOpenImage: (src: string) => void
}

const pad = (n: number) => String(n).padStart(2, '0')
const ease = [0.2, 0.7, 0.2, 1] as const

const panel: Variants = {
  enter: { transition: { staggerChildren: 0.07 } },
  exit: { transition: { staggerChildren: 0.03 } },
}

const item: Variants = {
  initial: { opacity: 0, x: -24 },
  enter: { opacity: 1, x: 0, transition: { duration: 0.45, ease } },
  exit: { opacity: 0, x: 24, transition: { duration: 0.25, ease } },
}

const shot: Variants = {
  initial: { opacity: 0, x: 48, scale: 0.98 },
  enter: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, ease } },
  exit: { opacity: 0, x: -48, scale: 0.98, transition: { duration: 0.3, ease } },
}

/**
 * Big tab row (e.g. Track · Communicate · Mark) with a feature list and laptop screenshot per mode.
 * Modes advance every 4s — driven by the progress bar's CSS animation — and pause while hovered or focused.
 */
export function ModeTabs({ modes, label, product, onOpenImage }: ModeTabsProps) {
  const [mode, setMode] = useState(0)
  const [paused, setPaused] = useState(false)
  const tabsRef = useRef<HTMLDivElement>(null)
  const cur = modes[mode]

  // Preload every mode's screenshot so the rotation never shows an empty laptop.
  useEffect(() => {
    modes.forEach((m) => {
      new Image().src = m.image
    })
  }, [modes])

  // On narrow screens the tab row scrolls; keep the active tab in view.
  useEffect(() => {
    const tabs = tabsRef.current
    const active = tabs?.children[mode] as HTMLElement | undefined
    if (tabs && active) tabs.scrollTo({ left: active.offsetLeft - tabs.offsetLeft, behavior: 'smooth' })
  }, [mode])

  return (
    <section
      className={styles.modes}
      aria-label={label}
      data-paused={paused || undefined}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false)
      }}
    >
      <div ref={tabsRef} className={styles.tabs} role="tablist" aria-label={label}>
        {modes.map((m, i) => (
          <button
            key={m.label}
            type="button"
            role="tab"
            id={`mode-${i}`}
            aria-selected={i === mode}
            aria-controls="mode-panel"
            onClick={() => setMode(i)}
          >
            {m.label}
            <sup className="mono">{pad(i + 1)}</sup>
            {i === mode && (
              <span
                key={mode}
                className={styles.tabProgress}
                aria-hidden="true"
                onAnimationEnd={() => setMode((mode + 1) % modes.length)}
              />
            )}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={cur.label}
          id="mode-panel"
          role="tabpanel"
          aria-labelledby={`mode-${mode}`}
          className={styles.panel}
          variants={panel}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <div className={styles.items}>
            {cur.items.map((it) => (
              <motion.div key={it.t} className={styles.item} variants={item}>
                <span>{it.t}</span>
                <p>{it.b}</p>
              </motion.div>
            ))}
          </div>
          <motion.div className={styles.modeShot} variants={shot}>
            <LaptopFrame
              src={cur.image}
              alt={`${product} — ${cur.label}`}
              onOpen={() => onOpenImage(cur.image)}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
