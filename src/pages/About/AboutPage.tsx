import { motion } from 'framer-motion'
import { Reveal } from '../../components/Reveal/Reveal'
import { aboutChapters, isrRoles } from '../../data/content'
import { images } from '../../data/media'
import styles from '../../styles/About.module.css'

const pad = (n: number) => String(n).padStart(2, '0')

// Seven roles around the post-mission cycle (positions from the v2 artboard).
const cycle = [
  { cx: 400, cy: 150, lines: ['Data analysis', '& exploitation'], x: 400, y: 104, anchor: 'middle' },
  { cx: 556.4, cy: 225.3, lines: ['Mission reporting', '& debriefing'], x: 578, y: 222, anchor: 'start' },
  { cx: 595, cy: 394.5, lines: ['Data archiving', '& management'], x: 617, y: 392, anchor: 'start' },
  { cx: 486.8, cy: 530.2, lines: ['Intelligence', 'dissemination'], x: 500, y: 566, anchor: 'start' },
  { cx: 313.2, cy: 530.2, lines: ['Training', '& simulation'], x: 300, y: 566, anchor: 'end' },
  { cx: 205, cy: 394.5, lines: ['System maintenance', '& upgrade'], x: 183, y: 392, anchor: 'end' },
  { cx: 243.6, cy: 225.3, lines: ['Security', '& encryption'], x: 222, y: 222, anchor: 'end' },
] as const

export function AboutPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={`${styles.heroImage} topo photo`}>
          <img src={images.radioWorkbench} alt="Radios and a laptop running Sigtrack on a workbench" />
        </div>
        <motion.div
          className={styles.heroText}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span className="chip chip--dark">About Sigtrack</span>
          <h1 className={styles.title}>
            Drones, software <em className="serif">&amp; seamless</em> radio connectivity.
          </h1>
        </motion.div>
        <p className={styles.heroLead}>
          Sigtrack innovates to optimize communication and coordination — delivering efficient solutions across industries.
        </p>
      </section>

      <section className={`${styles.band} topo photo`}>
        <img src={images.meshtasticSetup} alt="Configuring a Meshtastic radio beside a laptop in the field" />
        <div className={styles.addressCard}>
          <span className="label">Listed address</span>
          <span className={styles.address}>
            Burma Camp, <em className="serif">Accra</em>
          </span>
        </div>
      </section>

      <section className={styles.chapters} aria-label="About Sigtrack">
        {aboutChapters.map((c, i) => (
          <Reveal key={c.kicker} className={styles.chapter}>
            <span className={styles.chapterHead}>
              <span className={`serif ${styles.chapterNum}`}>{pad(i + 1)}</span>
              <span className="label">{c.kicker}</span>
            </span>
            <h2 className={styles.chapterTitle}>{c.title}</h2>
            <p className={styles.chapterBody}>{c.body}</p>
          </Reveal>
        ))}
      </section>

      <section className={styles.isr} aria-labelledby="isr-title">
        <Reveal className={styles.isrText}>
          <span className="chip chip--dark hide-mobile">Intelligence, surveillance &amp; reconnaissance</span>
          <h2 id="isr-title" className={styles.isrTitle}>
            After the <em className="serif">mission.</em>
          </h2>
          <p className="hide-mobile">
            As ISR post-mission software, Sigtrack plays a pivotal role from the moment data comes back to the moment it
            informs the next decision.
          </p>
        </Reveal>

        <svg className={`${styles.cycle} hide-mobile`} viewBox="0 0 800 700" role="img" aria-label="Seven ISR post-mission roles arranged in a cycle">
          <circle className={styles.orbit} cx="400" cy="350" r="200" />
          <circle cx="400" cy="350" r="100" fill="#0F2F5F" />
          <text x="400" y="344" textAnchor="middle" fill="#FFFFFF" fontSize="24" fontWeight="600">
            Sigtrack
          </text>
          <text x="400" y="374" textAnchor="middle" fill="#CFE0FF" fontSize="22" fontStyle="italic" fontFamily="Instrument Serif, serif">
            post-mission
          </text>
          {cycle.map((c, i) => (
            <g key={c.lines[0]}>
              <circle cx={c.cx} cy={c.cy} r="9" fill="#2A5FE8" />
              <text x={c.x} y={c.y - 20} textAnchor={c.anchor} className={styles.cycleNum}>
                {pad(i + 1)}
              </text>
              <text x={c.x} y={c.y} textAnchor={c.anchor} className={styles.cycleLabel}>
                {c.lines[0]}
              </text>
              <text x={c.x} y={c.y + 20} textAnchor={c.anchor} className={styles.cycleLabel}>
                {c.lines[1]}
              </text>
            </g>
          ))}
        </svg>

        <svg className={`${styles.cycleSmall} show-mobile`} viewBox="0 0 350 250" role="img" aria-label="Seven ISR post-mission roles in a cycle">
          <circle className={styles.orbit} cx="175" cy="125" r="100" />
          <circle cx="175" cy="125" r="46" fill="#0F2F5F" />
          <text x="175" y="130" textAnchor="middle" fill="#CFE0FF" fontSize="15" fontStyle="italic" fontFamily="Instrument Serif, serif">
            post-mission
          </text>
          {cycle.map((c, i) => {
            const x = 175 + (c.cx - 400) / 2
            const y = 125 + (c.cy - 350) / 2
            return (
              <g key={c.lines[0]}>
                <circle cx={x} cy={y} r="13" fill="#2A5FE8" />
                <text x={x} y={y + 3} textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="Geist Mono, monospace">
                  {pad(i + 1)}
                </text>
              </g>
            )
          })}
        </svg>
        <ol className={`${styles.isrList} show-mobile`}>
          {isrRoles.map((r, i) => (
            <li key={r.title}>
              <span className="mono">{pad(i + 1)}</span>
              {r.title}
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.places} aria-label="Where personnel use Sigtrack">
        <span className={`label ${styles.placesLabel} hide-mobile`}>Where personnel use Sigtrack</span>
        <Reveal>
          <span className={styles.place}>In the field.</span>
        </Reveal>
        <Reveal delay={0.06}>
          <span className={`serif ${styles.place} ${styles.placeAccent}`}>At a command center.</span>
        </Reveal>
        <Reveal delay={0.12}>
          <span className={`${styles.place} ${styles.placeLast}`}>In an office.</span>
        </Reveal>
      </section>
    </>
  )
}
