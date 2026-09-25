import { useEffect, useState } from 'react'
import { LegalHero } from '../../components/LegalHero/LegalHero'
import { Pill } from '../../components/Pill/Pill'
import styles from '../../styles/Privacy.module.css'
import { privacySections, type PolicyBlock } from './privacyContent'

const OPT_OUT_KEY = 'sigtrack-matomo-opt-out'
const pad = (n: number) => String(n).padStart(2, '0')
const total = pad(privacySections.length)

function readOptOut() {
  try {
    return localStorage.getItem(OPT_OUT_KEY) === '1'
  } catch {
    return false
  }
}

type MatomoQueue = unknown[][]

function OptOut() {
  const [optedOut, setOptedOut] = useState(readOptOut)

  const toggle = () => {
    const next = !optedOut
    try {
      localStorage.setItem(OPT_OUT_KEY, next ? '1' : '0')
    } catch {
      // Storage unavailable — the choice still applies for this visit.
    }
    const paq = (window as unknown as { _paq?: MatomoQueue })._paq
    paq?.push([next ? 'optUserOut' : 'forgetUserOptOut'])
    setOptedOut(next)
  }

  return (
    <div className={styles.optOut}>
      <p>
        {optedOut
          ? 'You have opted out. Your visits to this website are not recorded by Matomo.'
          : 'Your visit to this website is currently recorded by Matomo web analytics.'}
      </p>
      <Pill type="button" variant="light" onClick={toggle}>
        {optedOut ? 'Allow tracking again' : 'Opt out of tracking'}
      </Pill>
    </div>
  )
}

function Block({ block }: { block: PolicyBlock }) {
  const chips = block.heading === 'Server log files'
  return (
    <div className={styles.block}>
      {block.heading && <h3>{block.heading}</h3>}
      {block.paragraphs?.map((p) => <p key={p}>{p}</p>)}
      {block.list && (
        <ul className={chips ? styles.chips : styles.bullets}>
          {block.list.map((li) => (
            <li key={li}>{li}</li>
          ))}
        </ul>
      )}
      {block.after?.map((p) => <p key={p}>{p}</p>)}
      {block.optOut && <OptOut />}
    </div>
  )
}

export function PrivacyPage() {
  const [active, setActive] = useState(privacySections[0].id)
  const [tocOpen, setTocOpen] = useState(false)
  const activeIndex = privacySections.findIndex((s) => s.id === active)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: '-20% 0px -65% 0px' },
    )
    privacySections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const toc = (
    <ol className={styles.tocList}>
      {privacySections.map((s, i) => (
        <li key={s.id}>
          <a href={`#${s.id}`} aria-current={s.id === active ? 'true' : undefined} onClick={() => setTocOpen(false)}>
            <span className="mono">{pad(i + 1)}</span>
            {s.toc}
          </a>
        </li>
      ))}
    </ol>
  )

  return (
    <>
      <LegalHero lead="Privacy" accent="policy." />
      <section className={styles.body}>
        <aside className={styles.toc} aria-label="On this page">
          <div className="hide-mobile">
            <span className="label">On this page</span>
            <span className={styles.progress} aria-hidden="true">
              <span style={{ height: `${((activeIndex + 1) / privacySections.length) * 100}%` }} />
            </span>
            {toc}
          </div>
          <div className={`${styles.tocMobile} show-mobile`}>
            <button type="button" aria-expanded={tocOpen} aria-controls="privacy-toc" onClick={() => setTocOpen((o) => !o)}>
              <span>On this page</span>
              <span className="mono">
                {pad(activeIndex + 1)} / {total}
              </span>
              <span className={styles.bar} aria-hidden="true">
                <span style={{ width: `${((activeIndex + 1) / privacySections.length) * 100}%` }} />
              </span>
            </button>
            <div id="privacy-toc" hidden={!tocOpen}>
              {toc}
            </div>
          </div>
        </aside>

        <article className={styles.article}>
          {privacySections.map((s, i) => (
            <section key={s.id} id={s.id} className={styles.section} aria-labelledby={`${s.id}-title`}>
              <span className={`serif ${styles.num}`}>{pad(i + 1)}</span>
              <h2 id={`${s.id}-title`}>{s.title}</h2>
              {s.blocks.map((b, j) => (
                <Block key={b.heading ?? j} block={b} />
              ))}
            </section>
          ))}
        </article>
      </section>
    </>
  )
}
