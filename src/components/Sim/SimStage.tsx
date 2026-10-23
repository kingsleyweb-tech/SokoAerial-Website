import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import styles from '../../styles/Sim.module.css'

export interface SimStep {
  label: string
  caption: string
  duration: number
}

export interface SimFrame {
  step: number
  t: number
  compact: boolean
  reduced: boolean
  p: (start: number, len?: number) => number
}

interface SimStageProps {
  label: string
  steps: SimStep[]
  render: (f: SimFrame) => ReactNode
  ratio: string
  compactRatio?: string
  tone?: 'dark' | 'light'
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const easeOut = (v: number) => 1 - Math.pow(1 - v, 3)

export function SimStage({ label, steps, render, ratio, compactRatio, tone = 'dark' }: SimStageProps) {
  const reduced = !!useReducedMotion()
  const compact = useMediaQuery('(max-width: 767px)')
  const [clock, setClock] = useState({ step: 0, t: 0 })
  const [playing, setPlaying] = useState(true)
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined')
  const rootRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLOListElement>(null)

  const running = playing && !reduced && inView

  useEffect(() => {
    const el = rootRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!running) return
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(64, now - last)
      last = now
      setClock((c) => {
        const t = c.t + dt
        return t < steps[c.step].duration ? { step: c.step, t } : { step: (c.step + 1) % steps.length, t: 0 }
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [running, steps])

  useEffect(() => {
    const list = listRef.current
    const item = list?.children[clock.step] as HTMLElement | undefined
    if (list && item && list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: item.offsetLeft - list.offsetLeft - 8, behavior: reduced ? 'auto' : 'smooth' })
    }
  }, [clock.step, reduced])

  const step = steps[clock.step]
  const t = reduced ? step.duration : clock.t
  const frame: SimFrame = {
    step: clock.step,
    t,
    compact,
    reduced,
    p: (start, len = 500) => (reduced ? 1 : easeOut(clamp01((t - start) / len))),
  }

  const go = (i: number) => setClock({ step: i, t: 0 })

  return (
    <figure ref={rootRef} className={styles.sim} data-tone={tone} data-paused={!running || undefined}>
      <span className={styles.badge}>Simulation · not live data</span>
      <div
        className={styles.stage}
        style={{ aspectRatio: compact && compactRatio ? compactRatio : ratio }}
        role="group"
        aria-label={`${label} (simulation, not live data)`}
      >
        {render(frame)}
      </div>

      <figcaption className={styles.bar}>
        <div className={styles.captionRow}>
          <button
            type="button"
            className={styles.play}
            onClick={() => setPlaying((v) => !v)}
            disabled={reduced}
            aria-label={playing && !reduced ? 'Pause the simulation' : 'Play the simulation'}
          >
            {playing && !reduced ? <PauseIcon /> : <PlayIcon />}
          </button>
          <p className={styles.caption} aria-live="polite">
            <strong>{step.label}.</strong> {step.caption}
          </p>
        </div>
        <ol ref={listRef} className={styles.steps}>
          {steps.map((s, i) => (
            <li key={s.label}>
              <button
                type="button"
                className={styles.stepBtn}
                aria-current={i === clock.step ? 'step' : undefined}
                onClick={() => go(i)}
              >
                <span className={styles.stepNum}>{String(i + 1).padStart(2, '0')}</span>
                {s.label}
                <i
                  className={styles.stepBar}
                  aria-hidden="true"
                  style={{ '--p': i < clock.step ? 1 : i === clock.step ? t / s.duration : 0 } as CSSProperties}
                />
              </button>
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  )
}

const PlayIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M4 2.5v11l9-5.5z" fill="currentColor" />
  </svg>
)

const PauseIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" fill="currentColor" />
  </svg>
)
