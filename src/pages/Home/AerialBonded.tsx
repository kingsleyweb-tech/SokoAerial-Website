import helicopterTest from '../../assets/images/aerial-helicopter-test.jpg'
import starlinkMount from '../../assets/images/aerial-starlink-mount.jpg'
import transmitter from '../../assets/images/aerial-transmitter.jpg'
import { Reveal } from '../../components/Reveal/Reveal'
import styles from '../../styles/HomeSections.module.css'

// From the "Sigtrack with Starlink" paper.
const points = [
  { t: 'Bonded links', b: 'Up to eight 5G/LTE modems bonded at once, with optional LEO satellite links such as Starlink.' },
  { t: '4K UHD, HEVC', b: 'Encoded on board and streamed as NDI, SRT, RTMP and more.' },
  { t: 'LinkMatrix cloud', b: 'Bonding, encryption, routing and remote control managed from the cloud.' },
  { t: 'Secured and rugged', b: 'End-to-end AES encryption; ARINC-compliant, DO-160G-certified design for aviation.' },
]

const photos = [
  { src: transmitter, alt: 'The Sigtrack transmitter: antenna, SDI, Ethernet and power connectors on its rear panel', caption: 'Transmitter' },
  { src: helicopterTest, alt: 'Helicopter on the apron with a Starlink terminal on the ground beside it during testing', caption: 'Helicopter test' },
  { src: starlinkMount, alt: 'Starlink Mini terminal mounted on board the aircraft', caption: 'Starlink Mini on board' },
]

const lanes = [70, 110, 150, 190]

/**
 * "Aerial video, bonded." The figure loops the documented helicopter-test result: several cellular paths
 * and a Starlink path merge into one stream; when the Starlink path drops, the stream carries on.
 */
export function AerialBonded() {
  return (
    <section id="aerial" className={styles.aerial} aria-labelledby="aerial-title">
      <Reveal className={styles.aerialText}>
        <span className="chip">Sigtrack transmitter · aerial video</span>
        <h2 id="aerial-title" className={styles.h2}>
          Aerial video, <em className="serif">bonded.</em>
        </h2>
        <p className={styles.aerialLead}>
          Live video from aircraft, carried over every link at once. In helicopter testing, the bonded cellular links kept
          the stream going whenever the Starlink connection dropped.
        </p>
        <dl className={styles.aerialPoints}>
          {points.map((p) => (
            <div key={p.t}>
              <dt>{p.t}</dt>
              <dd>{p.b}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <div className={styles.aerialVisual}>
        <figure className={styles.bond}>
          <svg viewBox="0 0 560 280" role="img" aria-labelledby="bond-title">
            <title id="bond-title">
              Illustration: four 5G/LTE paths and a Starlink path merge into one video stream; the Starlink path
              periodically drops while the stream continues.
            </title>
            <g className={styles.bondPaths}>
              {lanes.map((y) => (
                <path key={y} d={`M60 ${y} C 200 ${y}, 220 140, 330 140`} />
              ))}
              <path className={styles.bondStarlink} d="M60 30 C 200 30, 220 140, 330 140" />
            </g>
            <path className={styles.bondOut} d="M390 140 H520" />
            <g className={styles.bondLabels}>
              <text x="0" y="34">LEO</text>
              {lanes.map((y, i) => (
                <text key={y} x="0" y={y + 4}>
                  5G {i + 1}
                </text>
              ))}
              <text x="0" y="232">… up to 8</text>
              <text x="398" y="126">STREAM</text>
              <text className={styles.bondDrop} x="90" y="18">
                STARLINK DROP
              </text>
            </g>
            <rect className={styles.bondNode} x="330" y="114" width="60" height="52" />
            <text className={styles.bondNodeText} x="360" y="145" textAnchor="middle">
              TX
            </text>
          </svg>
          <figcaption>Illustrative, based on the helicopter test in the Sigtrack with Starlink paper.</figcaption>
        </figure>
        <ul className={styles.aerialPhotos}>
          {photos.map((p) => (
            <li key={p.caption}>
              <div className={styles.aerialPhoto}>
                <img src={p.src} alt={p.alt} loading="lazy" />
              </div>
              <span>{p.caption}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
