import { motion } from 'framer-motion'
import { DemoForm } from '../../components/Forms/DemoForm'
import { ArrowIcon, ArrowLeftIcon } from '../../components/Icons/Icons'
import { PhoneFrame } from '../../components/PhoneFrame/PhoneFrame'
import { Pill } from '../../components/Pill/Pill'
import { Reveal } from '../../components/Reveal/Reveal'
import { awarenessKit, mobileFeatures } from '../../data/content'
import { images } from '../../data/media'
import { useSnapCarousel } from '../../hooks/useSnapCarousel'
import styles from '../../styles/Mobile.module.css'

const pad = (n: number) => String(n).padStart(2, '0')
const rise = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } }

export function MobilePage() {
  const { trackRef, current: trackIndex, onScroll: onTrackScroll, scrollTo: scrollTrackTo } = useSnapCarousel<HTMLDivElement>(mobileFeatures.length)

  return (
    <>
      <section className={styles.hero}>
        <motion.span
          className={`serif ${styles.giant}`}
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
        >
          Mobile
        </motion.span>
        <motion.div className={styles.phoneWrap} {...rise} transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}>
          <PhoneFrame
            className={styles.phone}
            src={images.mobileRadioMap}
            x={0.24}
            y={0.52}
            zoom={1.16}
            alt="Sigtrack Mobile on the map, with Silvus and Meshtastic radio options"
            loading="eager"
          />
        </motion.div>
        <motion.div className={styles.heroTitle} {...rise} transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}>
          <span className="chip">The Sigtrack Mobile · Android</span>
          <h1>
            Sigtrack <span className="visually-hidden">Mobile</span>
          </h1>
        </motion.div>
        <p className={styles.heroText}>
          Comprehensive, real-time situational awareness for field operatives — in the palm of their hand.
        </p>
        <div className={styles.heroCta}>
          <Pill href="#demo" variant="dark">
            Try the demo
          </Pill>
        </div>
      </section>

      <section className={styles.pocket} aria-labelledby="pocket-title">
        <div className={styles.pocketHead}>
          <h2 id="pocket-title">
            Five things <em className="serif">in your pocket.</em>
          </h2>
          <div className={`${styles.arrows} hide-mobile`}>
            <button
              type="button"
              aria-label="Previous"
              disabled={trackIndex === 0}
              onClick={() => scrollTrackTo(Math.max(0, trackIndex - 1))}
            >
              <ArrowLeftIcon />
            </button>
            <button
              type="button"
              aria-label="Next"
              disabled={trackIndex === mobileFeatures.length - 1}
              onClick={() => scrollTrackTo(Math.min(mobileFeatures.length - 1, trackIndex + 1))}
            >
              <ArrowIcon />
            </button>
          </div>
        </div>
        <div ref={trackRef} className={styles.track} onScroll={onTrackScroll}>
          {mobileFeatures.map((f, i) => (
            <article key={f.title} className={styles.card}>
              <PhoneFrame className={styles.cardPhone} {...f.screen} alt="" loading="lazy" />
              <span className="mono">
                {pad(i + 1)} / {pad(mobileFeatures.length)}
              </span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.kit} aria-labelledby="kit-title">
        <h2 id="kit-title" className="chip">
          Field Situation Awareness Kit
        </h2>
        <ul>
          {awarenessKit.map((k, i) => (
            <Reveal as="li" key={k.a} className={styles.kitRow}>
              <span className="mono">{pad(i + 1)}</span>
              <span className={styles.kitWord}>
                {k.a} <em className="serif">{k.b}</em>
              </span>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className={styles.radios}>
        <Reveal className={`${styles.arch} topo photo`}>
          <img src={images.sigtrackRadiosPair} alt="Sigtrack radios in the field" loading="lazy" />
        </Reveal>
        <div className={styles.radiosText}>
          <div className={styles.chips}>
            <span>Silvus</span>
            <span>Meshtastic</span>
          </div>
          <p>Uninterrupted connectivity in dense forests, urban canyons and remote terrain.</p>
        </div>
      </section>

      <DemoForm
        product="Sigtrack Mobile"
        tone="signal"
        feedbackLead="On Sigtrack Mobile,"
        mobileFeedbackLabel="My feedback"
        button="contrast"
      />
    </>
  )
}
