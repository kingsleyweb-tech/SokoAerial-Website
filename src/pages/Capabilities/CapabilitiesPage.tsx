import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from '../../components/Reveal/Reveal'
import { capabilityAreas, dualUse, isrRoles, stanagTopics } from '../../data/content'
import { images } from '../../data/media'
import { paths } from '../../data/site'
import styles from '../../styles/Capabilities.module.css'

const pad = (n: number) => String(n).padStart(2, '0')
const palettes = ['midnight', 'white', 'signal', 'ice', 'navy', 'white', 'midnight'] as const

export function CapabilitiesPage() {
  const [area, setArea] = useState(0)
  const [paused, setPaused] = useState(false)
  const cur = capabilityAreas[area]
  const next = () => setArea((a) => (a + 1) % capabilityAreas.length)

  const pick = (i: number) => {
    setArea(i)
    document.getElementById('explorer')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <section className={styles.hero}>
        <motion.div
          className={styles.titleWrap}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <h1 className={styles.title}>
            <span className="hide-mobile">Capabilities</span>
            <span className="show-mobile">
              Capa-
              <br />
              bilities
            </span>
          </h1>
          <span className={`serif ${styles.tag}`}>dual usage</span>
        </motion.div>
        <nav
          className={`${styles.areaMarquee} hide-mobile`}
          aria-label="Capability areas"
          data-paused={paused || undefined}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false)
          }}
        >
          <div className={styles.areaNav}>
            {[0, 1].map((copy) =>
              capabilityAreas.map((c, i) => (
                <button
                  key={`${copy}-${c.label}`}
                  type="button"
                  aria-pressed={i === area}
                  aria-hidden={copy === 1 || undefined}
                  tabIndex={copy === 1 ? -1 : undefined}
                  onClick={() => pick(i)}
                >
                  <span className="mono">{pad(i + 1)}</span>
                  {c.label}
                  {i === area && (
                    <i
                      key={area}
                      className={styles.areaProgress}
                      aria-hidden="true"
                      onAnimationEnd={copy === 0 ? next : undefined}
                    />
                  )}
                </button>
              )),
            )}
          </div>
        </nav>
      </section>

      <section id="explorer" className={styles.explorer} aria-labelledby="explorer-title">
        <div className={styles.explorerNav}>
          <nav aria-label="Explore capabilities" className={styles.areaList}>
            {capabilityAreas.map((c, i) => (
              <button key={c.label} type="button" aria-pressed={i === area} onClick={() => setArea(i)}>
                <span className="hide-mobile">{c.label}</span>
                <span className="show-mobile">{c.short}</span>
                <span className={`mono ${styles.count} hide-mobile`}>{pad(c.items.length)}</span>
              </button>
            ))}
          </nav>
          <span className={`${styles.hint} hide-mobile`}>Select an area ↑</span>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={area}
            className={styles.explorerBody}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div className={styles.explorerHead}>
              <span className="chip chip--dark">
                {cur.tag}
                <span className="show-mobile">&nbsp;· {pad(area + 1)} / 06</span>
              </span>
              <h2 id="explorer-title" className={styles.explorerTitle}>
                {cur.head} <em className="serif">{cur.accent}</em>
              </h2>
              <p className={styles.explorerText}>{cur.body}</p>
            </div>
            <div className={styles.explorerGrid}>
              <ul className={styles.items}>
                {cur.items.map((t) => (
                  <li key={t}>
                    <span aria-hidden="true">→</span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className={`${styles.explorerImage} topo photo`}>
                <img src={cur.image} alt="" loading="lazy" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      <section className={styles.stanag} aria-labelledby="stanag-title">
        <div className={styles.stanagBlock}>
          <span className={styles.stanagLabel}>
            STANAG<span className="show-mobile"> · Full Motion Video</span>
          </span>
          <span className={`serif ${styles.stanagNumber}`} aria-hidden="true">
            4609
          </span>
        </div>
        <Reveal className={styles.stanagText}>
          <h2 id="stanag-title" className={`${styles.stanagTitle} hide-mobile`}>
            Full Motion Video, <em className="serif">to standard.</em>
          </h2>
          <p className="hide-mobile">
            STANAG 4609 sets requirements for the capture, compression, transmission and playback of FMV within NATO and
            Advanced Electro-Optical/Infrared (EOIR) systems, so FMV intelligence can be shared across forces and
            manufacturers.
          </p>
          <ol className={styles.leaders}>
            {stanagTopics.map((t, i) => (
              <li key={t.full}>
                <span>
                  <span className="hide-mobile">{t.full}</span>
                  <span className="show-mobile">{t.short}</span>
                </span>
                <span className={styles.dots} aria-hidden="true" />
                <span className="mono">{pad(i + 1)}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <section className={styles.roles} aria-labelledby="roles-title">
        <div className={styles.rolesHead}>
          <h2 id="roles-title" className={styles.rolesTitle}>
            Seven roles <em className="serif">after the mission.</em>
          </h2>
          <span className="label hide-mobile">ISR post-mission</span>
        </div>
        <div className={styles.roleMarquee}>
          <div className={styles.roleTrack}>
            {[0, 1].map((copy) =>
              isrRoles.map((r, i) => (
                <div key={`${copy}-${r.title}`} className={styles.role} data-tone={palettes[i]} aria-hidden={copy === 1 || undefined}>
                  <span className={styles.roleNum}>{pad(i + 1)}</span>
                  <span className={styles.roleText}>
                    <span className={styles.roleTitle}>{r.title}</span>
                    <span className={styles.roleBody}>{r.body}</span>
                  </span>
                </div>
              )),
            )}
          </div>
        </div>
      </section>

      <section className={styles.mirror} aria-labelledby="mirror-title">
        <h2 id="mirror-title" className="visually-hidden">
          Military and civilian capabilities
        </h2>
        <div className={styles.mirrorHead} aria-hidden="true">
          <span>Military</span>
          <span className={styles.mirrorRule} />
          <em className="serif">Civilian</em>
        </div>
        <ul>
          {dualUse.map((row, i) => (
            <Reveal as="li" key={row.military} className={styles.mirrorRow} delay={i * 0.04}>
              <span>
                <span className="hide-mobile">{row.military}</span>
                <span className="show-mobile">{row.mShort}</span>
              </span>
              <span className={styles.mirrorDot} aria-hidden="true" />
              <span>
                <span className="hide-mobile">{row.civilian}</span>
                <span className="show-mobile">{row.cShort}</span>
              </span>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className={styles.versions} aria-labelledby="versions-title">
        <h2 id="versions-title" className={styles.versionsTitle}>
          <span className="hide-mobile">Wherever the work is, </span>
          <span className="show-mobile">Three </span>
          <em className="serif">
            <span className="hide-mobile">three </span>dedicated versions.
          </em>
        </h2>
        <div className={styles.devices}>
          <Link to={paths.web} className={styles.device} data-kind="browser">
            <span className={`${styles.screen} topo photo hide-mobile`}>
              <img src={images.webDashboard} alt="" loading="lazy" />
            </span>
            <span className={styles.deviceName}>
              Sigtrack Web
              <span className={`mono ${styles.deviceTag} hide-mobile`}>Command center · Office</span>
              <span className={`${styles.deviceArrow} show-mobile`}>↗</span>
            </span>
          </Link>
          <Link to={paths.mobile} className={styles.device} data-kind="phone">
            <span className={`${styles.screen} topo photo hide-mobile`}>
              <img src={images.mobileFieldKit} alt="" loading="lazy" />
            </span>
            <span className={styles.deviceName}>
              Sigtrack Mobile
              <span className={`${styles.deviceArrow} show-mobile`}>↗</span>
            </span>
          </Link>
          <Link to={paths.desktop} className={styles.device} data-kind="laptop">
            <span className={`${styles.laptop} hide-mobile`}>
              <span className={`${styles.screen} topo photo`}>
                <img src={images.desktopTracking} alt="" loading="lazy" />
              </span>
              <span className={styles.base} />
            </span>
            <span className={styles.deviceName}>
              Sigtrack Desktop
              <span className={`mono ${styles.deviceTag} hide-mobile`}>In the field · Laptop</span>
              <span className={`${styles.deviceArrow} show-mobile`}>↗</span>
            </span>
          </Link>
        </div>
      </section>
    </>
  )
}
