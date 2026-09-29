import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { DemoForm } from '../../components/Forms/DemoForm'
import { LaptopFrame } from '../../components/LaptopFrame/LaptopFrame'
import { PhoneFrame } from '../../components/PhoneFrame/PhoneFrame'
import { Pill } from '../../components/Pill/Pill'
import { flashModes } from '../../data/content'
import { images } from '../../data/media'
import desktop from '../../styles/Desktop.module.css'
import styles from '../../styles/Mobile.module.css'

const pad = (n: number) => String(n).padStart(2, '0')
const rise = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } }

// Hero borrows the Sigtrack Mobile layout (Android); the tabbed laptop section borrows Sigtrack Desktop's (Windows).
export function FlashPage() {
  const [mode, setMode] = useState(0)
  const cur = flashModes[mode]

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
          Flash
        </motion.span>
        <motion.div className={styles.phoneWrap} {...rise} transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}>
          <PhoneFrame
            className={styles.phone}
            src={images.flashMobileCall}
            y={0.5}
            zoom={1.1}
            alt="A Flash video call on Android"
            loading="eager"
          />
        </motion.div>
        <motion.div className={styles.heroTitle} {...rise} transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}>
          <span className="chip">Flash · Windows &amp; Android</span>
          <h1>
            Off <em className="serif">the grid.</em>
            <span className="visually-hidden"> Flash</span>
          </h1>
        </motion.div>
        <p className={styles.heroText}>
          Chat, call and share files with nearby devices over the local network — no internet required.
        </p>
        <div className={styles.heroCta}>
          <Pill href="#demo" variant="dark">
            Request a demo
          </Pill>
        </div>
      </section>

      <section className={desktop.modes} aria-label="Features">
        <div className={desktop.tabs} role="tablist" aria-label="Features">
          {flashModes.map((m, i) => (
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
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={cur.label}
            id="mode-panel"
            role="tabpanel"
            aria-labelledby={`mode-${mode}`}
            className={desktop.panel}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={desktop.items}>
              {cur.items.map((it) => (
                <div key={it.t} className={desktop.item}>
                  <span>{it.t}</span>
                  <p>{it.b}</p>
                </div>
              ))}
            </div>
            <LaptopFrame className={desktop.modeShot} src={cur.image} alt={`Flash on Windows — ${cur.label}`} loading="lazy" />
          </motion.div>
        </AnimatePresence>
      </section>

      <DemoForm product="Flash" feedbackLead="On Flash," mobileFeedbackLabel="My feedback" button="dark" />
    </>
  )
}
