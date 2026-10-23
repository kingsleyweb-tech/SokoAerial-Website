import { motion } from 'framer-motion'
import { DemoForm } from '../../components/Forms/DemoForm'
import { useScreenViewer } from '../../components/Lightbox/useScreenViewer'
import { PhoneFrame } from '../../components/PhoneFrame/PhoneFrame'
import { ModeTabs } from '../../components/ModeTabs/ModeTabs'
import { Pill } from '../../components/Pill/Pill'
import { flashModes } from '../../data/content'
import { images } from '../../data/media'
import styles from '../../styles/Mobile.module.css'
import { SimSection } from '../../components/Sim/SimSection'

const shots = [
  { src: images.flashMobileCall, alt: 'A Flash video call on Android', caption: 'Video call on Android', label: 'Flash' },
  ...flashModes.map((m) => ({ src: m.image, alt: `Flash on Windows: ${m.label}`, caption: m.items[0].t, label: 'Flash' })),
]
const rise = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } }

export function FlashPage() {
  const screens = useScreenViewer(shots)

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
            alt="A Flash video call on Android"
            loading="eager"
            onOpen={() => screens.open(images.flashMobileCall)}
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
          Chat, call and share files with nearby devices over the local network. No internet required.
        </p>
        <div className={styles.heroCta}>
          <Pill href="#demo" variant="dark">
            Request a demo
          </Pill>
        </div>
      </section>

      <ModeTabs modes={flashModes} label="Features" product="Flash on Windows" onOpenImage={screens.open} />

      {screens.viewer}
      <SimSection
        sim="flash"
        chip="See it work"
        title={
          <>
            Flash <em className="serif">without the internet.</em>
          </>
        }
        lead="Nearby Windows and Android devices on the same local network: encrypted chat, a file sent and verified, and a video call. Hover over or tap a label for details."
        summary={[
          'Devices on the same local network find each other, no internet needed.',
          'Chat is encrypted.',
          'Send a file: the recipient accepts, and the transfer is verified.',
          'Video calls show latency, resolution, frame rate and bitrate.',
        ]}
      />

      <DemoForm product="Flash" feedbackLead="On Flash," mobileFeedbackLabel="My feedback" button="dark" />
    </>
  )
}
