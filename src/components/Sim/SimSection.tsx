import { lazy, type ReactNode } from 'react'
import type { ProductId } from '../../data/site'
import styles from '../../styles/Sim.module.css'
import { LazySection } from '../LazySection/LazySection'
import { Reveal } from '../Reveal/Reveal'
import { SafeBoundary } from '../SafeBoundary/SafeBoundary'

export type SimId = ProductId | 'system' | 'symbols'

const sims: Record<SimId, ReturnType<typeof lazy>> = {
  system: lazy(() => import('./sims/SystemSim')),
  web: lazy(() => import('./sims/WebSim')),
  mobile: lazy(() => import('./sims/MobileSim')),
  desktop: lazy(() => import('./sims/DesktopSim')),
  watch: lazy(() => import('./sims/WatchSim')),
  radios: lazy(() => import('./sims/RadiosSim')),
  watcher: lazy(() => import('./sims/WatcherSim')),
  flash: lazy(() => import('./sims/FlashSim')),
  symbols: lazy(() => import('./sims/SymbolSim')),
}

interface Props {
  sim: SimId
  id?: string
  chip: string
  title: ReactNode
  lead: ReactNode
  summary: string[]
  tone?: 'dark' | 'light'
}

export function SimSection({ sim, id = 'simulation', chip, title, lead, summary, tone = 'dark' }: Props) {
  const Sim = sims[sim]
  const fallback = (
    <ol className={styles.noscriptList}>
      {summary.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ol>
  )
  return (
    <section
      id={id}
      className={`${styles.section}${tone === 'dark' ? ' topo' : ''}`}
      data-tone={tone}
      aria-labelledby={`${id}-title`}
    >
      <Reveal className={styles.head}>
        <span className={`chip${tone === 'dark' ? ' chip--dark' : ''}`}>{chip}</span>
        <h2 id={`${id}-title`} className={styles.title}>
          {title}
        </h2>
        <p className={styles.lead}>{lead}</p>
      </Reveal>
      <SafeBoundary fallback={fallback}>
        <LazySection placeholder={<div className={styles.placeholder} aria-hidden="true" />}>
          <Sim />
        </LazySection>
      </SafeBoundary>
    </section>
  )
}
