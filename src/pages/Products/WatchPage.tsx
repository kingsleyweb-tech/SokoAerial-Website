import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react'
import { InfoPopover } from '../../components/Popover/InfoPopover'
import { Pill } from '../../components/Pill/Pill'
import { Reveal } from '../../components/Reveal/Reveal'
import { WatchFrame } from '../../components/WatchFrame/WatchFrame'
import { paths } from '../../data/site'
import { watchPhoto, watchScreens, watchSystemFeatures } from '../../data/watch'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import styles from '../../styles/Watch.module.css'
import { SimSection } from '../../components/Sim/SimSection'

const pad = (n: number) => String(n).padStart(2, '0')

interface Leader {
  d: string
  i: number
}

export function WatchPage() {
  const [screenIndex, setScreenIndex] = useState(0)
  const [active, setActive] = useState<number | null>(null)
  const compact = useMediaQuery('(max-width: 1023px)')
  const screen = watchScreens[screenIndex]
  const numbered = screen.callouts.map((c, i) => ({ ...c, i }))
  const left = numbered.filter((c) => c.x < 0.5).sort((a, b) => a.y - b.y)
  const right = numbered.filter((c) => c.x >= 0.5).sort((a, b) => a.y - b.y)

  const stageRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [leaders, setLeaders] = useState<Leader[]>([])

  const choose = (i: number) => {
    setScreenIndex(i)
    setActive(null)
  }

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = watchScreens.length - 1
    const next = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last }[e.key]
    if (next === undefined) return
    e.preventDefault()
    choose(next)
    tabRefs.current[next]?.focus()
  }

  const toggle = (i: number) => (open: boolean) => setActive((a) => (open ? i : a === i ? null : a))

  const measure = useCallback(() => {
    const stage = stageRef.current
    if (!stage || compact) {
      setLeaders([])
      return
    }
    const box = stage.getBoundingClientRect()
    const next: Leader[] = []
    stage.querySelectorAll<HTMLElement>('[data-label]').forEach((label) => {
      const i = Number(label.dataset.label)
      const dot = stage.querySelector<HTMLElement>(`[data-dot="${i}"]`)
      if (!dot) return
      const l = label.getBoundingClientRect()
      const d = dot.getBoundingClientRect()
      const onLeft = label.dataset.side === 'left'
      const sx = (onLeft ? l.right + 8 : l.left - 8) - box.left
      const sy = l.top + l.height / 2 - box.top
      const ex = onLeft ? sx + 28 : sx - 28
      const dx = d.left + d.width / 2 - box.left
      const dy = d.top + d.height / 2 - box.top
      next.push({ i, d: `M${sx} ${sy} H${ex} L${dx} ${dy}` })
    })
    setLeaders(next)
  }, [compact])

  useLayoutEffect(() => {
    measure()
    const stage = stageRef.current
    if (!stage || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(measure)
    ro.observe(stage)
    return () => ro.disconnect()
  }, [measure, screenIndex])

  const label = (c: (typeof numbered)[number], side: 'left' | 'right') => (
    <li key={`${screen.id}-${c.i}`}>
      <InfoPopover
        title={c.title}
        trigger={
          <>
            <span className={styles.labelNum}>{pad(c.i + 1)}</span>
            <span className={styles.labelText}>{c.title}</span>
          </>
        }
        triggerClassName={styles.label}
        triggerAttrs={{ 'data-label': c.i, 'data-side': side, 'data-active': active === c.i ? '' : undefined }}
        placement={side}
        open={active === c.i}
        onOpenChange={toggle(c.i)}
      >
        {c.text}
      </InfoPopover>
    </li>
  )

  return (
    <>
      <section className={styles.hero} aria-labelledby="watch-title">
        <motion.div
          className={styles.heroText}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span className="chip chip--dark">Sigtrack Wear · Wear OS</span>
          <h1 id="watch-title" className={styles.title}>
            Sigtrack <em className="serif">Watch</em>
          </h1>
          <p className={styles.lead}>
            Real-time situational awareness on the wrist: a tactical companion running on Wear OS, for security, emergency
            response and field operations.
          </p>
        </motion.div>

        <div className={styles.tabs} role="tablist" aria-label="Watch screens">
          {watchScreens.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              id={`watch-tab-${s.id}`}
              type="button"
              role="tab"
              aria-selected={i === screenIndex}
              aria-controls="watch-panel"
              tabIndex={i === screenIndex ? 0 : -1}
              onClick={() => choose(i)}
              onKeyDown={(e) => onTabKey(e, i)}
            >
              <span className="mono">{pad(i + 1)}</span>
              {s.label}
            </button>
          ))}
        </div>

        <div id="watch-panel" role="tabpanel" aria-labelledby={`watch-tab-${screen.id}`} className={styles.panel}>
          <div ref={stageRef} className={styles.stage}>
            {!compact && <ul className={`${styles.labels} ${styles.labelsLeft}`}>{left.map((c) => label(c, 'left'))}</ul>}

            <motion.div
              className={styles.watchCol}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
              onAnimationComplete={measure}
            >
              <WatchFrame className={styles.watch}>
                <AnimatePresence initial={false}>
                  <motion.img
                    key={screen.id}
                    className={styles.screenImg}
                    src={screen.image}
                    alt={screen.alt}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  />
                </AnimatePresence>
                {numbered.map((c) =>
                  compact ? (
                    <span key={`${screen.id}-${c.i}`} className={styles.dotWrap} style={{ left: `${c.x * 100}%`, top: `${c.y * 100}%` }}>
                      <InfoPopover
                        title={c.title}
                        trigger={pad(c.i + 1)}
                        triggerLabel={`${c.i + 1}: ${c.title}`}
                        triggerClassName={styles.dotButton}
                        triggerAttrs={{ 'data-active': active === c.i ? '' : undefined }}
                        placement={c.y < 0.5 ? 'bottom' : 'top'}
                        open={active === c.i}
                        onOpenChange={toggle(c.i)}
                      >
                        {c.text}
                      </InfoPopover>
                    </span>
                  ) : (
                    <span
                      key={`${screen.id}-${c.i}`}
                      className={styles.dot}
                      data-dot={c.i}
                      data-active={active === c.i || undefined}
                      style={{ left: `${c.x * 100}%`, top: `${c.y * 100}%` }}
                      aria-hidden="true"
                    />
                  ),
                )}
              </WatchFrame>
              <div className={styles.caption} aria-live="polite">
                <strong>{screen.title}</strong>
                <span>{screen.intro}</span>
              </div>
            </motion.div>

            {!compact && <ul className={`${styles.labels} ${styles.labelsRight}`}>{right.map((c) => label(c, 'right'))}</ul>}

            {!compact && (
              <svg className={styles.leaders} aria-hidden="true">
                {leaders.map((l) => (
                  <path key={`${screen.id}-${l.i}`} d={l.d} data-active={active === l.i || undefined} />
                ))}
              </svg>
            )}
          </div>

          <ol className={compact ? styles.list : 'visually-hidden'}>
            {numbered.map((c) => (
              <li key={`${screen.id}-${c.i}`} data-active={active === c.i || undefined}>
                <span className={styles.listNum}>{pad(c.i + 1)}</span>
                <span>
                  <strong>{c.title}</strong> {c.text}
                </span>
              </li>
            ))}
          </ol>
          <p className={styles.hint}>
            {compact ? 'Tap a number on the screen to see what it does.' : 'Hover, focus or click a label to see what it does.'}
          </p>
        </div>
      </section>

      <section className={styles.system} aria-labelledby="system-title">
        <Reveal className={`${styles.photo} topo photo`}>
          <img src={watchPhoto.src} alt={watchPhoto.alt} loading="lazy" />
        </Reveal>
        <Reveal className={styles.systemText}>
          <span className="chip">In the field</span>
          <h2 id="system-title" className={styles.h2}>
            One of the team’s <em className="serif">field devices.</em>
          </h2>
          <p>
            Sigtrack links field operators to the command centre. The watch sits alongside the mobile phone, body cam,
            head mount and drone as a field-operator device, and puts these on the wrist:
          </p>
          <ul className={styles.features}>
            {watchSystemFeatures.map((f, i) => (
              <li key={f}>
                <span className="mono">{pad(i + 1)}</span>
                {f}
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <Pill to={`${paths.home}#ecosystem`} variant="dark">
              See the ecosystem
            </Pill>
            <Pill to={paths.contact} variant="outline">
              Ask about the watch
            </Pill>
          </div>
        </Reveal>
      </section>
      <SimSection
        sim="watch"
        chip="See it work"
        title={
          <>
            Sigtrack Watch <em className="serif">on the wrist.</em>
          </>
        }
        lead="Real Sigtrack Watch screens: the emergency locator, a patrol zone created from the wrist, and an SOS reaching the command centre. Hover over or tap a label for details."
        summary={[
          'The emergency locator shows live coordinates and position.',
          'Create a geofence patrol zone with a radius in metres.',
          'The active zone is monitored; leaving it raises an alert.',
          'Press SOS: the alert and position reach the command centre.',
          'The quick action menu gives every tool in one ring.',
        ]}
      />
    </>
  )
}
