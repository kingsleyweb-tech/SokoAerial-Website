import { motion } from 'framer-motion'
import { useState, type CSSProperties } from 'react'
import { DemoForm } from '../../components/Forms/DemoForm'
import { Pill } from '../../components/Pill/Pill'
import { webFeatures } from '../../data/content'
import { images } from '../../data/media'
import styles from '../../styles/Web.module.css'

const pad = (n: number) => String(n).padStart(2, '0')

export function WebPage() {
  const [active, setActive] = useState(0)
  const cur = webFeatures[active]

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <motion.div
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <span className="chip">
              The Sigtrack Web · <span className="hide-mobile">in the </span>browser
            </span>
            <h1>
              <span className={styles.word}>Sigtrack</span>
              <em className={`serif ${styles.accent}`}>Web</em>
            </h1>
          </motion.div>
          <div className={styles.heroAside}>
            <p>
              <span className="hide-mobile">A formidable tool for modern operations — a</span>
              <span className="show-mobile">A</span> robust suite of features designed to streamline coordination and
              enhance situational awareness.
            </p>
            <Pill href="#demo" variant="dark">
              Try the demo
            </Pill>
          </div>
        </div>

        <div className={styles.browser}>
          <div className={styles.browserBar} aria-hidden="true">
            <span className={styles.dots}>
              <span />
              <span />
              <span />
            </span>
            <span className={`${styles.address} hide-mobile`}>Sigtrack Web</span>
          </div>
          <div className={`${styles.screen} topo`}>
            <img src={images.webDashboard} alt="The Sigtrack Web interface with team members on the map" />
            {webFeatures.map((f, i) => (
              <button
                key={f.title}
                type="button"
                className={styles.hotspot}
                style={{ left: `${f.x}%`, top: `${f.y}%` } as CSSProperties}
                aria-label={`Feature ${i + 1}: ${f.title}`}
                aria-pressed={i === active}
                onClick={() => setActive(i)}
              >
                {pad(i + 1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.features} aria-label="Features">
        <div className={`${styles.featureGrid} hide-mobile`}>
          {webFeatures.map((f, i) => (
            <button key={f.title} type="button" className={styles.feature} aria-pressed={i === active} onClick={() => setActive(i)}>
              <span className="mono">{pad(i + 1)}</span>
              <span className={styles.featureTitle}>{f.title}</span>
              <span className={styles.featureBody}>{f.body}</span>
            </button>
          ))}
        </div>

        <div className={`${styles.mobileFeature} show-mobile`} aria-live="polite">
          <span className="mono">{pad(active + 1)} / 05</span>
          <span className={styles.featureTitle}>{cur.title}</span>
          <span className={styles.featureBody}>{cur.body}</span>
          <span className={styles.bars}>
            {webFeatures.map((f, i) => (
              <button
                key={f.title}
                type="button"
                aria-label={`Feature ${i + 1}`}
                aria-current={i === active ? 'true' : undefined}
                onClick={() => setActive(i)}
              />
            ))}
          </span>
        </div>
      </section>

      <section className={styles.chat}>
        <svg className={styles.wave} viewBox="0 0 1232 200" aria-hidden="true">
          <path d="M0 100 Q 77 20 154 100 T 308 100 T 462 100 T 616 100 T 770 100 T 924 100 T 1078 100 T 1232 100" />
          <path
            className={styles.waveSoft}
            d="M0 100 Q 77 60 154 100 T 308 100 T 462 100 T 616 100 T 770 100 T 924 100 T 1078 100 T 1232 100"
          />
        </svg>
        <h2 className={styles.chatTitle}>
          Chat <em className="serif">without</em>
          <br className="hide-mobile" /> internet.
        </h2>
        <p className={styles.chatText}>
          <span className="hide-mobile">
            Sigtrack Web integrates with Meshtastic radio, enabling direct communication between operatives without
            relying on traditional internet connectivity — and real-time tracking over the same link.
          </span>
          <span className="show-mobile">
            Meshtastic radio integration enables direct communication between operatives without relying on traditional
            internet connectivity.
          </span>
        </p>
      </section>

      <DemoForm
        product="Sigtrack Web"
        casual
        feedbackLead="After trying the demo,"
        mobileFeedbackLabel="What I think after trying it"
        button="signal"
      />
    </>
  )
}
