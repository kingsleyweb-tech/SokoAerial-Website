import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import type { HeroSlide } from '../../data/content'
import { paths } from '../../data/site'
import styles from '../../styles/HeroSlider.module.css'
import { ArrowDownIcon, PlusIcon } from '../Icons/Icons'
import { Pill } from '../Pill/Pill'

const INTERVAL = 6500
const pad = (n: number) => String(n).padStart(2, '0')

function Media({ slide, active }: { slide: HeroSlide; active: boolean }) {
  if (slide.media.type === 'video') {
    return active ? (
      <video className={styles.media} src={slide.media.src} autoPlay muted loop playsInline preload="metadata" aria-label={slide.media.label} />
    ) : null
  }
  return <img className={styles.media} src={slide.media.src} alt={active ? slide.media.alt : ''} decoding="async" />
}

/**
 * Hero panels (Foundations v2): the active panel widens over 800ms while the others collapse
 * to labelled strips. Autoplays every 6.5s with a progress line; pauses on hover, focus or touch.
 * On phones it becomes a swipeable image stack.
 */
export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [touching, setTouching] = useState(false)
  const [hidden, setHidden] = useState(false)
  const swipe = useRef<number | null>(null)

  const count = slides.length
  const playing = !reduceMotion && !hovered && !focused && !touching && !hidden
  const go = (i: number) => setIndex(((i % count) + count) % count)
  const next = () => go(index + 1)
  const slide = slides[index]

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const timing = { '--slide': `${INTERVAL}ms`, '--state': playing ? 'running' : 'paused' } as CSSProperties

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === 'mouse') return
    swipe.current = e.clientX
    setTouching(true)
  }
  const onPointerUp = (e: PointerEvent) => {
    setTouching(false)
    if (swipe.current === null) return
    const dx = e.clientX - swipe.current
    swipe.current = null
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1))
  }

  return (
    <section
      className={styles.hero}
      style={timing}
      aria-roledescription="carousel"
      aria-label="Sigtrack highlights"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setHovered(false)}
      onFocus={(e) => e.target.matches(':focus-visible') && setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false)
      }}
    >
      {/* ---------- Desktop: accordion panels ---------- */}
      <div className={styles.panels}>
        {slides.map((s, i) => {
          const active = i === index
          const distance = (i - index + count) % count
          return (
            <div
              key={s.name}
              className={`${styles.panel} topo photo`}
              data-active={active || undefined}
              data-near={distance <= 2 || undefined}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${s.name}`}
            >
              <Media slide={s} active={active} />
              {active ? (
                <div className={styles.activeContent}>
                  <span className={styles.progress} aria-hidden="true">
                    <span key={index} className={styles.fill} onAnimationEnd={next} />
                  </span>
                  <div className={styles.copy}>
                    <motion.span
                      key={`chip-${index}`}
                      className={styles.chip}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.25 }}
                    >
                      {pad(i + 1)} · {s.name}
                    </motion.span>
                    <h1 className={styles.title}>
                      <motion.span
                        key={`lead-${index}`}
                        className={styles.line}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.31, ease: [0.2, 0.7, 0.2, 1] }}
                      >
                        {s.lead}
                      </motion.span>
                      <motion.em
                        key={`accent-${index}`}
                        className={`serif ${styles.line} ${styles.accent}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        {s.accent}
                      </motion.em>
                    </h1>
                    <motion.p
                      key={`body-${index}`}
                      className={styles.body}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.43 }}
                    >
                      {s.body}
                    </motion.p>
                  </div>
                  <div className={styles.actions}>
                    <Pill to={paths.plans} variant="light">
                      Get Sigtrack
                    </Pill>
                    <Pill to={paths.capabilities} variant="outline-light">
                      Explore capabilities
                    </Pill>
                  </div>
                </div>
              ) : (
                <button type="button" className={styles.strip} onClick={() => go(i)} aria-label={`Show ${s.name}`}>
                  <span className={styles.stripNum}>{pad(i + 1)}</span>
                  <span className={styles.stripName}>{s.name}</span>
                  <span className={styles.stripPlus}>
                    <PlusIcon />
                  </span>
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* ---------- Mobile: swipeable image stack ---------- */}
      <div className={styles.stack}>
        <div className={styles.cards} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => setTouching(false)}>
          <span className={`${styles.back} ${styles.back2} topo`} aria-hidden="true" />
          <span className={`${styles.back} ${styles.back1} topo`} aria-hidden="true" />
          <button type="button" className={`${styles.front} topo photo`} onClick={next} aria-label="Next slide">
            <AnimatePresence initial={false}>
              <motion.span
                key={index}
                className={styles.frontMedia}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <Media slide={slide} active />
              </motion.span>
            </AnimatePresence>
            <span className={styles.frontShade} />
            <span className={styles.frontChip}>
              {pad(index + 1)} · {slide.name}
            </span>
            <span className={styles.frontHint}>Tap or swipe →</span>
          </button>
        </div>
        <div className={styles.dots} aria-hidden="true">
          {slides.map((s, i) => (
            <span key={s.name} data-active={i === index || undefined}>
              {i === index && <span key={index} className={styles.fill} onAnimationEnd={next} />}
            </span>
          ))}
        </div>
        <h1 className={styles.stackTitle} aria-live={playing ? 'off' : 'polite'}>
          {slide.lead}
          <br />
          <em className="serif">{slide.accent}</em>
        </h1>
        <p className={styles.stackBody}>{slide.mobileBody}</p>
        <div className={styles.stackActions}>
          <Pill to={paths.plans} variant="light" block>
            Get Sigtrack
          </Pill>
          <Link to={paths.capabilities} className={styles.down} aria-label="Explore capabilities">
            <ArrowDownIcon />
          </Link>
        </div>
      </div>
    </section>
  )
}
