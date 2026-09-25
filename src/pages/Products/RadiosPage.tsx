import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRightIcon } from '../../components/Icons/Icons'
import { Reveal } from '../../components/Reveal/Reveal'
import { radioComparison } from '../../data/content'
import { images } from '../../data/media'
import { paths } from '../../data/site'
import styles from '../../styles/Radios.module.css'

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.2, 0.7, 0.2, 1] as const },
})

const products = [
  { label: 'Sigtrack Web', radios: 'Meshtastic', to: paths.web },
  { label: 'Sigtrack Mobile', radios: 'Silvus · Meshtastic', to: paths.mobile },
  { label: 'Sigtrack Desktop', radios: 'Silvus · Meshtastic', to: paths.desktop },
]

const mosaic = [
  { src: images.meshtasticSetup, alt: 'Meshtastic radios set up with a laptop' },
  { src: images.sigtrackRadioTable, alt: 'Sigtrack radios on a table' },
  { src: images.sigtrackRadioCloseup, alt: 'Close-up of a Sigtrack radio' },
  { src: images.silvusPromo, alt: 'Silvus radio' },
]

export function RadiosPage() {
  return (
    <>
      <section className={styles.hero}>
        <h1 className="visually-hidden">Radios: Silvus and Meshtastic</h1>
        <div className={styles.silvus}>
          <motion.span className="mono" {...rise()}>
            High frequency · high bandwidth
          </motion.span>
          <motion.span className={styles.silvusName} {...rise(0.05)}>
            Silvus
          </motion.span>
          <motion.div className={`${styles.round} topo photo`} {...rise(0.1)}>
            <img src={images.silvusRadio} alt="Silvus radio" />
          </motion.div>
          <p>Images, PDFs, documents, messages and videos — rich multimedia for detailed information sharing.</p>
        </div>
        <div className={styles.mesh}>
          <motion.span className="mono" {...rise()}>
            Lower frequency · long range
          </motion.span>
          <motion.span className={`serif ${styles.meshName}`} {...rise(0.05)}>
            Meshtastic
          </motion.span>
          <motion.div className={`${styles.round} topo`} {...rise(0.1)}>
            <img src={images.meshtasticDevice} alt="Meshtastic radio" />
          </motion.div>
          <p>Efficient burst messages — reliable coverage in challenging terrain and remote locations.</p>
        </div>
        <motion.div
          className={styles.both}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span className={styles.plus}>+</span>
          <span className="mono">Sigtrack integrates both</span>
        </motion.div>
      </section>

      <section className={styles.spectrum} aria-labelledby="spectrum-title">
        <h2 id="spectrum-title">
          Two ends of the <em className="serif">spectrum.</em>
        </h2>
        <Reveal className={styles.scale}>
          <div className={styles.bar}>
            <span className={styles.markMesh}>Meshtastic</span>
            <span className={styles.markSilvus}>Silvus</span>
          </div>
          <div className={styles.ends}>
            <span>Lower frequency · burst messages · range</span>
            <span>Higher frequency · multimedia · bandwidth</span>
          </div>
          <span className={styles.note}>Qualitative — not to scale</span>
        </Reveal>
      </section>

      <section className={styles.compare} aria-labelledby="compare-title">
        <div className={styles.compareHead}>
          <span>Silvus</span>
          <h2 id="compare-title" className="mono">
            Side by side
          </h2>
          <span className="serif">Meshtastic</span>
        </div>
        <dl>
          {radioComparison.map((r) => (
            <Reveal key={r.key} className={styles.compareRow}>
              <dd className={styles.left}>
                <span className="hide-mobile">{r.silvus}</span>
                <span className="show-mobile">{r.sShort}</span>
              </dd>
              <dt>{r.key}</dt>
              <dd className={styles.right}>
                <span className="hide-mobile">{r.mesh}</span>
                <span className="show-mobile">{r.mShort}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <section className={styles.statement}>
        <p>
          Rich multimedia when bandwidth allows. Dependable messaging <em className="serif">when it doesn’t.</em> One
          integration, every environment.
        </p>
      </section>

      <section className={styles.mosaic} aria-label="Radios in use">
        {mosaic.map((m) => (
          <div key={m.src} className="topo photo photo--zoom">
            <img src={m.src} alt={m.alt} loading="lazy" />
          </div>
        ))}
      </section>

      <section className={styles.built} aria-labelledby="built-title">
        <h2 id="built-title">
          Built into <em className="serif">every product.</em>
        </h2>
        <ul>
          {products.map((p) => (
            <li key={p.label}>
              <Link to={p.to} className={styles.link}>
                <span className={styles.linkName}>{p.label}</span>
                <span className="mono">{p.radios}</span>
                <ArrowUpRightIcon />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
