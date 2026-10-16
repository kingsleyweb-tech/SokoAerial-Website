import { motion } from 'framer-motion'
import { useState } from 'react'
import { DemoForm } from '../../components/Forms/DemoForm'
import { PlayIcon } from '../../components/Icons/Icons'
import { useScreenViewer } from '../../components/Lightbox/useScreenViewer'
import { LaptopFrame } from '../../components/LaptopFrame/LaptopFrame'
import { ModeTabs } from '../../components/ModeTabs/ModeTabs'
import { Pill } from '../../components/Pill/Pill'
import { desktopModes } from '../../data/content'
import { images, videos } from '../../data/media'
import styles from '../../styles/Desktop.module.css'
import { SimSection } from '../../components/Sim/SimSection'

const hud = ['Live updates', 'History playback', 'Silvus · Meshtastic', 'Custom markers']
const clips = [
  { src: videos.sigtrackDemo1, name: 'Sigtrack video 1', cover: images.desktopWorldMap },
  { src: videos.sigtrackDemo2, name: 'Sigtrack video 2', cover: images.desktopSatellite },
  { src: videos.sigtrackDemo3, name: 'Sigtrack video 3', cover: images.desktopGlobe },
]
const shots = [
  { src: images.desktopTracking, alt: 'Sigtrack Desktop tracking team members on a map', caption: 'Live tracking', label: 'Sigtrack Desktop' },
  ...desktopModes.map((m) => ({ src: m.image, alt: `Sigtrack Desktop: ${m.label}`, caption: m.label, label: 'Sigtrack Desktop' })),
]
const uses = ['Search and rescue', 'Military exercises', 'Outdoor adventures', 'Remote team coordination']

export function DesktopPage() {
  const [clip, setClip] = useState(0)
  const [playing, setPlaying] = useState(false)
  const screens = useScreenViewer(shots)
  const main = clips[clip]
  const others = clips.filter((_, i) => i !== clip)

  const play = (src: string) => {
    setClip(clips.findIndex((c) => c.src === src))
    setPlaying(true)
  }

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroHead}>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
          >
            Track live.
            <br />
            <em className="serif">Replay later.</em>
          </motion.h1>
          <div className={styles.heroAside}>
            <span className={styles.product}>
              Sigtrack Desktop <span className="mono">Windows</span>
            </span>
            <p>
              Robust mapping, tracking and communication: different map types, custom markers, and Silvus and Meshtastic
              radios for offline communication.
            </p>
            <Pill href="#demo" variant="light">
              Try the demo
            </Pill>
          </div>
        </div>
        <motion.div
          className={styles.heroDevice}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <LaptopFrame src={images.desktopTracking} alt="Sigtrack Desktop tracking team members on a map" loading="eager" onOpen={() => screens.open(images.desktopTracking)}>
            {hud.map((h, i) => (
              <span key={h} className={`${styles.hud} hide-mobile`} data-pos={i}>
                {h}
              </span>
            ))}
          </LaptopFrame>
        </motion.div>
      </section>

      <ModeTabs modes={desktopModes} label="Feature modes" product="Sigtrack Desktop" onOpenImage={screens.open} />


      <section className={styles.videos} aria-label="Videos">
        <div className={styles.bigVideo}>
          {playing ? (
            <video key={main.src} src={main.src} controls autoPlay playsInline />
          ) : (
            <button type="button" className={`${styles.poster} topo`} onClick={() => setPlaying(true)} aria-label={`Play ${main.name}`}>
              <img src={main.cover} alt="" loading="lazy" />
              <span className={styles.bigPlay}>
                <PlayIcon />
              </span>
              <span className={styles.caption}>Now playing · {main.name}</span>
            </button>
          )}
        </div>
        <div className={styles.side}>
          <h2>
            See it <em className="serif">running.</em>
          </h2>
          {others.map((c) => (
            <button key={c.src} type="button" className={`${styles.small} topo`} onClick={() => play(c.src)} aria-label={`Play ${c.name}`}>
              <img src={c.cover} alt="" loading="lazy" />
              <span className={styles.smallPlay}>
                <PlayIcon />
              </span>
              <span className={styles.caption}>Up next · {c.name}</span>
            </button>
          ))}
        </div>
      </section>

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
      <SimSection
        sim="desktop"
        chip="See it work"
        title={
          <>
            Sigtrack Desktop <em className="serif">on Windows.</em>
          </>
        }
        lead="Live tracking, history playback for debriefing, markers shared with the team, and mesh radio links. Hover over or tap a label for details."
        summary={[
          'Track team members and assets live.',
          'Replay movement history for debriefing.',
          'Drop and customise markers, then share them.',
          'Communicate over Silvus and Meshtastic radios.',
        ]}
      />

      <DemoForm product="Sigtrack Desktop" feedbackLead="On Sigtrack Desktop," mobileFeedbackLabel="My feedback" button="dark" />
    </>
  )
}
