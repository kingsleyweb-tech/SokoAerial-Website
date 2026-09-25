import { Reveal } from '../../components/Reveal/Reveal'
import styles from '../../styles/ConnectedResponse.module.css'

/** "Sky, trailer and radio — one picture." Illustrative diagram from the v2 design. */
export function ConnectedResponse() {
  return (
    <section className={`${styles.section} topo`} aria-labelledby="connected-title">
      <Reveal className={styles.text}>
        <span className="chip chip--dark hide-mobile">Connected response</span>
        <h2 id="connected-title" className={styles.title}>
          Sky, trailer and radio — <em className="serif">one picture.</em>
        </h2>
        <p className={`${styles.body} hide-mobile`}>
          Silvus carries rich data — images, PDFs, documents, messages and video. Meshtastic sends reliable burst
          messages where infrastructure is missing. Sigtrack puts it all on the same map.
        </p>
      </Reveal>

      <svg
        className={`${styles.diagram} hide-mobile`}
        viewBox="0 0 1360 800"
        role="img"
        aria-label="Illustration: a drone, a command trailer and radios linked to Sigtrack users in the field"
      >
        <g className={styles.links}>
          <path d="M880 170 C 980 300, 1000 360, 1060 470" />
          <path d="M760 560 C 880 540, 960 520, 1060 470" />
          <path d="M880 170 C 820 330, 790 430, 760 560" />
          <path d="M1060 470 L 1210 400" />
          <path d="M1060 470 L 1230 560" />
          <path d="M1060 470 L 1150 660" />
        </g>
        <g fill="#FFFFFF">
          <circle cx="880" cy="170" r="10" />
          <circle cx="880" cy="170" r="30" fill="none" stroke="#FFFFFF" strokeOpacity="0.35" />
          <rect x="736" y="545" width="48" height="30" rx="6" />
          <circle cx="1060" cy="470" r="14" fill="#2A5FE8" />
          <circle className={styles.pulse} cx="1060" cy="470" r="44" fill="none" stroke="#2A5FE8" strokeOpacity="0.6" />
          <circle cx="1060" cy="470" r="80" fill="none" stroke="#2A5FE8" strokeOpacity="0.25" />
          <circle cx="1210" cy="400" r="7" />
          <circle cx="1230" cy="560" r="7" />
          <circle cx="1150" cy="660" r="7" />
        </g>
        <g className={styles.labels}>
          <text x="920" y="160">DRONE · FULL MOTION VIDEO</text>
          <text x="600" y="600">COMMAND TRAILER</text>
          <text x="1000" y="540">RADIO MESH · SILVUS / MESHTASTIC</text>
          <text x="1224" y="396">WEB</text>
          <text x="1244" y="564">MOBILE</text>
          <text x="1164" y="690">DESKTOP</text>
        </g>
        <text className={styles.note} x="64" y="760">
          ILLUSTRATIVE — NOT A NETWORK SPECIFICATION
        </text>
      </svg>

      <svg
        className={`${styles.mobileDiagram} show-mobile`}
        viewBox="0 0 350 200"
        role="img"
        aria-label="Illustration: drone, trailer and radios linked to Sigtrack users"
      >
        <g className={styles.links}>
          <path d="M70 40 C 150 60, 170 90, 200 110" />
          <path d="M60 160 C 120 150, 160 130, 200 110" />
          <path d="M200 110 L 300 60" />
          <path d="M200 110 L 310 150" />
        </g>
        <circle cx="70" cy="40" r="7" fill="#FFFFFF" />
        <rect x="46" y="150" width="30" height="20" rx="4" fill="#FFFFFF" />
        <circle cx="200" cy="110" r="10" fill="#2A5FE8" />
        <circle cx="200" cy="110" r="30" fill="none" stroke="#2A5FE8" strokeOpacity="0.5" />
        <circle cx="300" cy="60" r="5" fill="#FFFFFF" />
        <circle cx="310" cy="150" r="5" fill="#FFFFFF" />
        <g className={styles.labels} fontSize="9">
          <text x="84" y="36">DRONE</text>
          <text x="84" y="170">TRAILER</text>
          <text x="170" y="150">RADIO MESH</text>
          <text x="262" y="48">WEB</text>
          <text x="268" y="176">MOBILE</text>
        </g>
      </svg>
      <p className={`${styles.body} show-mobile`}>
        Silvus carries images, documents and video; Meshtastic sends reliable burst messages where infrastructure is
        missing.
      </p>
    </section>
  )
}
