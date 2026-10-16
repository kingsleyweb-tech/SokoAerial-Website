import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRightIcon } from '../../components/Icons/Icons'
import { Pill } from '../../components/Pill/Pill'
import heroPhoto from '../../assets/images/hero-field-command.jpg'
import { productLinks, type ProductId } from '../../data/site'
import styles from '../../styles/HomeSections.module.css'

const platforms: Record<ProductId, string> = {
  web: 'Browser',
  mobile: 'Android',
  desktop: 'Windows',
  watch: 'Wear OS',
  radios: 'Silvus · Meshtastic',
  watcher: 'Drone payload',
  flash: 'Local network',
}

/**
 * Home hero: one message, two actions, and every product one click away, over a full-bleed photo of a
 * Sigtrack field deployment (operators beside a mobile command vehicle at dusk).
 */
export function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroBg} style={{ backgroundImage: `url(${heroPhoto})` }} aria-hidden="true" />
      <div className={styles.heroGrid}>
        <motion.div
          className={styles.heroText}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span className="chip chip--dark">Eyes in the sky · your all-in-one response solution</span>
          <h1 id="hero-title" className={styles.heroTitle}>
            Empowering emergency response <em className="serif">anywhere.</em>
          </h1>
          <p className={styles.heroLead}>
            Sigtrack connects radios, command trailers, drones and the people carrying them, so every team shares one
            picture, on the web, on Android, on Windows and on the wrist.
          </p>
          <div className={styles.heroActions}>
            <Pill href="#products" variant="signal" icon="down">
              Explore products
            </Pill>
            <Pill href="#symbol-demo" variant="outline-light">
              Try the demo
            </Pill>
          </div>
        </motion.div>

      </div>

      <nav className={styles.strip} aria-label="Sigtrack products">
        {productLinks.map((p, i) => (
          <Link key={p.id} to={p.to} className={styles.stripItem}>
            <span className={styles.stripNum}>{String(i + 1).padStart(2, '0')}</span>
            <span className={styles.stripName}>{p.label}</span>
            <span className={styles.stripMeta}>{platforms[p.id]}</span>
            <ArrowUpRightIcon className={styles.stripArrow} />
          </Link>
        ))}
      </nav>

      {/* phones: the same links as compact buttons, all visible at once */}
      <nav className={styles.chips} aria-label="Sigtrack products">
        {productLinks.map((p) => (
          <Link key={p.id} to={p.to} className={styles.chipLink}>
            {p.label.replace('Sigtrack ', '')}
          </Link>
        ))}
      </nav>
    </section>
  )
}
