import { AnimatePresence, motion } from 'framer-motion'
import { useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { HeroSlider } from '../../components/HeroSlider/HeroSlider'
import { ArrowIcon, ArrowLeftIcon, ArrowUpRightIcon } from '../../components/Icons/Icons'
import { Pill } from '../../components/Pill/Pill'
import { Reveal } from '../../components/Reveal/Reveal'
import { facts, fieldRows, heroSlides, systemProducts, usage, uses } from '../../data/content'
import { images } from '../../data/media'
import { paths } from '../../data/site'
import { useSnapCarousel } from '../../hooks/useSnapCarousel'
import styles from '../../styles/Home.module.css'
import { ConnectedResponse } from './ConnectedResponse'

const pad = (n: number) => String(n).padStart(2, '0')

export function HomePage() {
  const { trackRef, current: trackIndex, onScroll: onTrackScroll, scrollTo: scrollTrackTo } = useSnapCarousel<HTMLDivElement>(systemProducts.length)
  const [military, setMilitary] = useState(true)
  const [use, setUse] = useState(0)
  const usageSet = military ? usage.military : usage.civilian

  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* Statement */}
      <section className={styles.statement}>
        <Reveal>
          <span className="chip hide-mobile">Your all-in-one response solution</span>
          <p className={styles.statementText}>
            Sigtrack connects radios{' '}
            <span className={`${styles.pill} topo photo`}>
              <img src={images.sigtrackRadiosPair} alt="" />
            </span>{' '}
            command trailers{' '}
            <span className={`${styles.pill} ${styles.pillSmall} topo--light photo hide-mobile`}>
              <img src={images.commandSetup} alt="" />
            </span>{' '}
            and drones — so every team shares <em className="serif">one picture,</em> anywhere.
          </p>
        </Reveal>
      </section>

      {/* Facts */}
      <section className={styles.facts} aria-label="Sigtrack at a glance">
        {facts.map((f, i) => (
          <Reveal key={f.t} className={styles.fact} delay={i * 0.06}>
            <span className={styles.factNum}>{f.n}</span>
            <span className={styles.factTitle}>{f.t}</span>
            <span className={styles.factText}>
              <span className="hide-mobile">{f.d}</span>
              <span className="show-mobile">{f.short}</span>
            </span>
          </Reveal>
        ))}
      </section>

      {/* The system — product track */}
      <section className={styles.system} aria-labelledby="system-title">
        <div className={styles.systemHead}>
          <h2 id="system-title" className={styles.h2}>
            The <em className="serif">system.</em>
          </h2>
          <div className={`${styles.trackControls} hide-mobile`}>
            <span className={styles.counter}>
              {pad(trackIndex + 1)} / {pad(systemProducts.length)}
            </span>
            <button
              type="button"
              className={styles.roundOutline}
              aria-label="Previous product"
              onClick={() => scrollTrackTo(Math.max(0, trackIndex - 1))}
            >
              <ArrowLeftIcon />
            </button>
            <button
              type="button"
              className={styles.roundSolid}
              aria-label="Next product"
              onClick={() => scrollTrackTo(Math.min(systemProducts.length - 1, trackIndex + 1))}
            >
              <ArrowIcon />
            </button>
          </div>
        </div>
        <div ref={trackRef} className={styles.track} onScroll={onTrackScroll}>
          {systemProducts.map((p, i) => (
            <Link key={p.sub} to={p.to} className={styles.card} data-tone={p.tone}>
              <div className={styles.cardText}>
                <div className={styles.cardTop}>
                  <span className={styles.cardMeta}>
                    {pad(i + 1)} · {p.platform}
                  </span>
                  <span className={styles.cardName}>
                    {p.name} <br className="hide-mobile" />
                    <em className="serif">{p.sub}</em>
                  </span>
                  <span className={styles.cardDesc}>
                    <span className="hide-mobile">{p.desc}</span>
                    <span className="show-mobile">{p.short}</span>
                  </span>
                </div>
                <span className={`${styles.cardLink} hide-mobile`}>
                  Explore {p.sub} <ArrowUpRightIcon />
                </span>
              </div>
              <span className={`${styles.device} topo photo`} data-frame={p.frame}>
                <img src={p.image} alt="" loading="lazy" />
              </span>
            </Link>
          ))}
        </div>
        <span className={`${styles.swipeHint} show-mobile`}>
          Swipe · {pad(trackIndex + 1)} / {pad(systemProducts.length)}
        </span>
      </section>

      <ConnectedResponse />

      {/* Dual usage */}
      <section className={styles.usage} aria-labelledby="usage-title">
        <h2 id="usage-title" className={`${styles.usageTitle} hide-mobile`}>
          One platform, <em className="serif">dual usage</em>
        </h2>
        <div className={styles.knob} role="tablist" aria-label="Usage">
          <span className={styles.knobThumb} data-side={military ? 'left' : 'right'} aria-hidden="true" />
          <button type="button" role="tab" aria-selected={military} onClick={() => setMilitary(true)}>
            Military
          </button>
          <button type="button" role="tab" aria-selected={!military} onClick={() => setMilitary(false)}>
            Civilian
          </button>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={military ? 'mil' : 'civ'}
            className={styles.usageBody}
            role="tabpanel"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <p className={`${styles.usageIntro} hide-mobile`}>{usageSet.intro}</p>
            <ol className={styles.caps}>
              {usageSet.items.map((t, i) => (
                <li key={t}>
                  <span className="serif">{pad(i + 1)}</span>
                  {t}
                </li>
              ))}
            </ol>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Where it works */}
      <section className={styles.works} aria-labelledby="works-title">
        <Reveal className={styles.worksHead}>
          <h2 id="works-title" className={styles.h2}>
            Where it <em className="serif">works.</em>
          </h2>
          <span className={`${styles.worksLead} hide-mobile`}>
            Wherever precise location tracking and reliable communication matter.
          </span>
        </Reveal>
        <div className={styles.worksGrid}>
          <ul className={styles.useList}>
            {uses.map((u, i) => (
              <li key={u.title}>
                <Link
                  to={paths.capabilities}
                  className={styles.useRow}
                  data-active={i === use || undefined}
                  onMouseEnter={() => setUse(i)}
                  onFocus={() => setUse(i)}
                >
                  <span className={`${styles.useNum} hide-mobile`}>{pad(i + 1)}</span>
                  <span className={styles.useTitle}>{u.title}</span>
                  <span className={styles.useArrow} aria-hidden="true">
                    <span className="hide-mobile">→</span>
                    <span className="show-mobile">↗</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className={`${styles.usePreview} hide-mobile`}>
            <div className={`${styles.useImage} topo photo`}>
              <AnimatePresence initial={false}>
                <motion.img
                  key={use}
                  src={uses[use].image}
                  alt={uses[use].alt}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>
            </div>
            <p className={styles.useBody}>{uses[use].body}</p>
          </div>
        </div>
      </section>

      {/* In the field */}
      <section className={styles.field} aria-labelledby="field-title">
        <div className={styles.fieldHead}>
          <h2 id="field-title" className={styles.h2}>
            In the <em className="serif">field.</em>
          </h2>
          <Pill to={paths.gallery} variant="outline-light" size="sm" className="hide-mobile">
            Enter the gallery →
          </Pill>
          <Link to={paths.gallery} className={`${styles.fieldLink} show-mobile`}>
            Gallery ↗
          </Link>
        </div>
        {fieldRows.map((row, r) => (
          <div key={r} className={styles.fieldRow} data-row={r}>
            {row.map((tile) => (
              <Link
                key={tile.src}
                to={paths.gallery}
                className={`${styles.fieldTile} topo photo photo--zoom`}
                style={{ '--w': tile.w } as CSSProperties}
                aria-label="Open the gallery"
              >
                <img src={tile.src} alt="" loading="lazy" />
              </Link>
            ))}
          </div>
        ))}
      </section>

      {/* Get Sigtrack */}
      <section className={styles.get} aria-labelledby="get-title">
        <h2 id="get-title" className={styles.getTitle}>
          Get Sigtrack<em className="serif">.</em>
        </h2>
        <div className={styles.planRows}>
          <Link to={`${paths.plans}?plan=basic`} className={styles.planRow}>
            <span className={styles.planLabel}>Basic plan</span>
            <span className={styles.planPrice}>Free</span>
            <span className={styles.planAction}>Download</span>
            <span className={styles.planArrow} aria-hidden="true">
              ↗
            </span>
          </Link>
          <Link to={`${paths.plans}?plan=pro`} className={styles.planRow}>
            <span className={styles.planLabel}>Professional plan</span>
            <span className={styles.planPrice}>
              USD 50 <em className="serif">/ month</em>
            </span>
            <span className={styles.planAction}>Choose plan</span>
            <span className={styles.planArrow} aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
      </section>
    </>
  )
}
