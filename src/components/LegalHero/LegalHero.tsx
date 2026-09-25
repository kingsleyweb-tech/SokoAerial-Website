import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { paths } from '../../data/site'
import styles from '../../styles/LegalHero.module.css'

/** Fog hero shared by Legal Notice and Privacy Policy, with the segmented switch between them. */
export function LegalHero({ lead, accent }: { lead: string; accent: string }) {
  return (
    <section className={styles.hero}>
      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
      >
        {lead}
        <br />
        <em className="serif">{accent}</em>
      </motion.h1>
      <nav className={styles.switch} aria-label="Legal pages">
        <NavLink to={paths.legal}>Legal Notice</NavLink>
        <NavLink to={paths.privacy}>Privacy Policy</NavLink>
      </nav>
    </section>
  )
}
