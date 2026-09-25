import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { DemoForm } from '../../components/Forms/DemoForm'
import { PlayIcon } from '../../components/Icons/Icons'
import { Pill } from '../../components/Pill/Pill'
import { desktopModes } from '../../data/content'
import { images, videos } from '../../data/media'
import styles from '../../styles/Desktop.module.css'

const pad = (n: number) => String(n).padStart(2, '0')
const hud = ['Live updates', 'History playback', 'Silvus · Meshtastic', 'Custom markers']
const clips = [
  { src: videos.sigtrackDemo1, name: 'Sigtrack video 1', cover: images.desktopWorldMap },
  { src: videos.sigtrackDemo2, name: 'Sigtrack video 2', cover: images.desktopSatellite },
  { src: videos.sigtrackDemo3, name: 'Sigtrack video 3', cover: images.desktopGlobe },
]
const uses = ['Search and rescue', 'Military exercises', 'Outdoor adventures', 'Remote team coordination']

export function DesktopPage() {
  const [mode, setMode] = useState(0)
  const [clip, setClip] = useState(0)
  const [playing, setPlaying] = useState(false)
  const cur = desktopModes[mode]
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
              Robust mapping, tracking and communication — different map types, custom markers, and Silvus and Meshtastic
              radios for offline communication.
            </p>
            <Pill href="#demo" variant="light">
              Try the demo
            </Pill>
          </div>
        </div>
        <motion.div
          className={`${styles.screen} topo`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <img src={images.desktopTracking} alt="Sigtrack Desktop tracking team members on a map" />
          {hud.map((h) => (
            <span key={h} className={`${styles.hud} hide-mobile`}>
              {h}
            </span>
          ))}
        </motion.div>
      </section>

      <section className={styles.modes} aria-label="Feature modes">
        <div className={styles.tabs} role="tablist" aria-label="Feature modes">
          {desktopModes.map((m, i) => (
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
            className={styles.panel}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.items}>
              {cur.items.map((it) => (
                <div key={it.t} className={styles.item}>
                  <span>{it.t}</span>
                  <p>{it.b}</p>
                </div>
              ))}
            </div>
            <div className={`${styles.modeShot} topo photo--zoom`}>
              <img src={cur.image} alt={`Sigtrack Desktop — ${cur.label}`} loading="lazy" />
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      <section className={styles.replay}>
        <div className={styles.replayHead}>
          <h2>
            Replay every <em className="serif">movement.</em>
          </h2>
          <p>
            History playback and movement analysis for post-operation review — useful for training, debriefing and
            improving future operations.
          </p>
        </div>
        <div className={styles.playback} aria-hidden="true">
          <span className={styles.playBtn}>
            <PlayIcon />
          </span>
          <span className={styles.timeline}>
            <span className={styles.fill} />
            <span className={styles.tick} style={{ left: '18%' }} data-label="Marker" />
            <span className={styles.tick} style={{ left: '41%' }} data-label="Waypoint" />
            <span className={`${styles.tick} ${styles.tickDim}`} style={{ left: '73%' }} />
            <span className={styles.head} />
          </span>
          <span className={`${styles.illus} hide-mobile`}>Illustrative playback UI</span>
        </div>
      </section>

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

      <DemoForm product="Sigtrack Desktop" feedbackLead="On Sigtrack Desktop," mobileFeedbackLabel="My feedback" button="dark" />
    </>
  )
}
