import { motion } from 'framer-motion'
import { DemoForm } from '../../components/Forms/DemoForm'
import { useScreenViewer } from '../../components/Lightbox/useScreenViewer'
import { LaptopFrame } from '../../components/LaptopFrame/LaptopFrame'
import { ModeTabs } from '../../components/ModeTabs/ModeTabs'
import { Pill } from '../../components/Pill/Pill'
import { watcherModes } from '../../data/content'
import { images } from '../../data/media'
import styles from '../../styles/Desktop.module.css'

const hud = ['Gimbal camera', 'Heading · FOV', 'Telemetry', 'Local + SD recording']
const shots = watcherModes.map((m) => ({ src: m.image, alt: `Watcher — ${m.label}`, caption: m.items[0].t, label: 'Watcher' }))
const uses = ['Aerial surveillance', 'Tethered overwatch', 'Target estimation', 'Search and rescue']

// Shares the Sigtrack Desktop layout: Watcher is also a dark, Windows cockpit app.
export function WatcherPage() {
  const screens = useScreenViewer(shots)

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroHead}>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
          >
            Fly the payload.
            <br />
            <em className="serif">Watch the ground.</em>
          </motion.h1>
          <div className={styles.heroAside}>
            <span className={styles.product}>
              Watcher <span className="mono">Soko Aerial Robotics</span>
            </span>
            <p>
              Drone payload ground control — the gimbal camera, a geospatial operations map and live telemetry in one
              cockpit.
            </p>
            <Pill href="#demo" variant="light">
              Request a demo
            </Pill>
          </div>
        </div>
        <motion.div
          className={styles.heroDevice}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <LaptopFrame src={images.watcherMap} alt="Watcher geospatial operations map with the gimbal feed panel" loading="eager" onOpen={() => screens.open(images.watcherMap)}>
            {hud.map((h, i) => (
              <span key={h} className={`${styles.hud} hide-mobile`} data-pos={i}>
                {h}
              </span>
            ))}
          </LaptopFrame>
        </motion.div>
      </section>

      <ModeTabs modes={watcherModes} label="Feature modes" product="Watcher" onOpenImage={screens.open} />

      <section className={styles.marquee} aria-label="Uses">
        <div className={styles.marqueeTrack}>
          {[0, 1].map((k) => (
            <span key={k} aria-hidden={k === 1 ? 'true' : undefined}>
              {uses.map((u) => (
                <span key={u}>
                  {u} <em className="serif">·</em>{' '}
                </span>
              ))}
            </span>
          ))}
        </div>
      </section>

      {screens.viewer}
      <DemoForm product="Watcher" feedbackLead="On Watcher," mobileFeedbackLabel="My feedback" button="dark" />
    </>
  )
}
