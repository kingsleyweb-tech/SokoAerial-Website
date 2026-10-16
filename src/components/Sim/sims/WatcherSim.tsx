// Soko Watcher, in flight: the ground control cockpit described on the Watcher page. Operations map (aircraft,
// heading, camera field of view, ground station), gimbal camera feed with heading and tilt scales,
// picture in picture, telemetry (attitude, altitude AGL and MSL, tether, wind, battery), and recording with
// stills. The terrain is made up and every number is a simulated value, labelled as such.
import sim from '../../../styles/Sim.module.css'
import styles from '../../../styles/SimProducts.module.css'
import { Icon, MiniMap } from '../draw'
import { Hotspot } from '../Hotspot'
import { SimStage, type SimFrame, type SimStep } from '../SimStage'

const steps: SimStep[] = [
  { label: 'Operations map', caption: 'The map shows the aircraft, its heading and the camera’s field of view, with the ground station below.', duration: 5000 },
  { label: 'Gimbal feed', caption: 'The payload camera feed front and centre, with heading and tilt scales. The map stays in picture in picture.', duration: 5000 },
  { label: 'Telemetry', caption: 'Roll, pitch and heading, altitude AGL and MSL, tether deployed, wind and battery, all in one panel.', duration: 4500 },
  { label: 'Record', caption: 'Record video to local storage and SD, and capture stills, from the same cockpit.', duration: 5000 },
]

const M = { W: 740, H: 520 }
const station = { x: 330, y: 330 }
const aircraft = { x: 350, y: 300 }

function heading(total: number) {
  return 64 + 26 * Math.sin(total / 2600)
}

function MapView({ f, hdg, mini = false }: { f: SimFrame; hdg: number; mini?: boolean }) {
  const r = (hdg * Math.PI) / 180
  // camera footprint ahead of the aircraft, in the direction of the heading
  const cx = aircraft.x + Math.sin(r) * 150
  const cy = aircraft.y - Math.cos(r) * 150
  const side = (d: number) => [cx + Math.cos(r) * d, cy + Math.sin(r) * d]
  const [ax, ay] = side(-60)
  const [bx, by] = side(60)
  return (
    <svg className={sim.canvas} viewBox={`0 0 ${M.W} ${M.H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <MiniMap W={M.W} H={M.H} tone="sat" />
      <polygon points={`${aircraft.x},${aircraft.y} ${ax},${ay} ${bx},${by}`} className={styles.fov} />
      <line x1={station.x} y1={station.y} x2={aircraft.x} y2={aircraft.y} className={styles.tether} />
      <g transform={`translate(${station.x} ${station.y})`}>
        <rect x={-11} y={-11} width={22} height={22} className={styles.station} />
        {!mini && (
          <text x={16} y={26} className={styles.mapLabel}>
            Ground station
          </text>
        )}
      </g>
      <g transform={`translate(${aircraft.x} ${aircraft.y}) rotate(${hdg})`}>
        <circle r={16} className={styles.aircraftRing} />
        <path d="M0 -14 L9 10 L0 5 L-9 10Z" className={styles.aircraft} />
      </g>
      {!mini && f.step === 0 && (
        <text x={aircraft.x + 24} y={aircraft.y - 8} className={styles.mapLabel}>
          HDG {Math.round(hdg)}°
        </text>
      )}
    </svg>
  )
}

function FeedView({ hdg, tilt, mini = false, compact = false }: { hdg: number; tilt: number; mini?: boolean; compact?: boolean }) {
  const k = compact ? 1.9 : 1.1
  // the camera looks at the ground: pan with heading, move with tilt
  const dx = (hdg - 64) * 3
  const dy = (tilt + 35) * 3
  const ticks = []
  for (let d = Math.floor((hdg - 50 / k) / 10) * 10; d <= hdg + 50 / k; d += 10) ticks.push(d)
  return (
    <>
      <svg className={sim.canvas} viewBox={`0 0 ${M.W} ${M.H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g transform={`translate(${M.W / 2 - dx} ${M.H / 2 - dy}) scale(1.8) translate(${-M.W / 2} ${-M.H / 2})`}>
          <MiniMap W={M.W} H={M.H} tone="sat" />
        </g>
      </svg>
      <span className={styles.crosshair} />
      {!mini && (
        <>
          <div className={styles.hdgScale} aria-hidden="true">
            {ticks.map((d) => (
              <span key={d} style={{ left: `${50 + (d - hdg) * k}%` }}>
                {((d % 360) + 360) % 360}
              </span>
            ))}
            <i />
          </div>
          <div className={styles.tiltScale} aria-hidden="true">
            {[0, -15, -30, -45, -60, -75, -90].map((d) => (
              <span key={d} style={{ top: `${50 - (d - tilt) * 1.2}%` }}>
                {d}
              </span>
            ))}
            <i />
          </div>
        </>
      )}
    </>
  )
}

function Scene({ f }: { f: SimFrame }) {
  // a continuous clock across steps, so the aircraft keeps turning gently
  const total = steps.slice(0, f.step).reduce((a, s) => a + s.duration, 0) + f.t
  const hdg = heading(f.reduced ? 0 : total)
  const tilt = -35 + 8 * Math.sin((f.reduced ? 0 : total) / 1900)
  const feedMain = f.step >= 1
  const rec = f.step === 3 && f.t > 500
  const recSecs = rec ? Math.floor((f.t - 500) / 1000) : 0
  const still = f.step === 3 && f.t > 2600 && f.t < 2900
  const stillSaved = f.step === 3 && f.t > 2700
  const w = f.reduced ? 0 : total

  const telemetry: [string, string][] = [
    ['Roll', `${(1.8 * Math.sin(w / 900)).toFixed(1)}°`],
    ['Pitch', `${(-1.2 + Math.sin(w / 1300)).toFixed(1)}°`],
    ['Heading', `${Math.round(hdg)}°`],
    ['Alt AGL', `${(118 + Math.sin(w / 2000)).toFixed(1)} m`],
    ['Alt MSL', `${(181 + Math.sin(w / 2000)).toFixed(1)} m`],
    ['Tether', '124 m'],
    ['Wind', `${(4 + 0.6 * Math.sin(w / 1500)).toFixed(1)} m/s`],
    ['Battery', '86%'],
  ]

  return (
    <div className={styles.cockpit} data-compact={f.compact || undefined}>
      <div className={styles.cockpitBar}>
        <strong>Soko Watcher</strong>
        <span className={styles.linkOk}>Link</span>
        {rec && (
          <span className={styles.rec}>
            <i className={sim.blink} />
            REC 00:{String(recSecs).padStart(2, '0')}
          </span>
        )}
        <span className={styles.simTag}>Simulated values</span>
      </div>

      <div className={styles.cockpitMain}>
        {feedMain ? <FeedView hdg={hdg} tilt={tilt} compact={f.compact} /> : <MapView f={f} hdg={hdg} />}
        {still && <span className={styles.flash} />}
        <div className={styles.pip}>{feedMain ? <MapView f={f} hdg={hdg} mini /> : <FeedView hdg={hdg} tilt={tilt} mini />}</div>
        {f.step === 3 && (
          <div className={styles.recPanel}>
            <span data-on={rec || undefined}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <Icon name="video" x={12} y={12} />
              </svg>
              Record
            </span>
            <span data-on={stillSaved || undefined}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <Icon name="camera" x={12} y={12} />
              </svg>
              {stillSaved ? 'Still saved' : 'Still'}
            </span>
          </div>
        )}

        {f.step === 0 && (
          <Hotspot x={0.5} y={0.1} label="Aircraft and field of view" title="Geospatial operations map" shown={f.p(500, 300)}>
            Satellite imagery with the aircraft position, heading and camera field of view drawn on the map, plus the ground station.
          </Hotspot>
        )}
        {f.step === 1 && (
          <Hotspot x={0.5} y={0.82} label="Gimbal feed" title="Live EO camera" align="center" shown={f.p(500, 300)}>
            The payload gimbal feed front and centre, with heading and tilt scales. The map stays on screen in picture in picture.
          </Hotspot>
        )}
        {f.step === 3 && (
          <Hotspot x={0.5} y={0.82} label="Recording" title="Recording" shown={f.p(500, 300)}>
            Record to local storage and SD, and capture stills, from the same cockpit.
          </Hotspot>
        )}
      </div>

      <aside className={styles.telemetry} data-on={f.step === 2 || undefined}>
        {telemetry.map(([k, v]) => (
          <div key={k}>
            <span>{k}</span>
            <strong>{v}</strong>
          </div>
        ))}
        {f.step === 2 && (
          <Hotspot x={0.5} y={f.compact ? -0.18 : 0.94} label="Telemetry" title="Attitude, altitude, power" shown={f.p(400, 300)}>
            Roll, pitch and heading, altitude AGL and MSL, tether deployed, wind speed and battery reserve. The numbers here are simulated.
          </Hotspot>
        )}
      </aside>
    </div>
  )
}

export default function WatcherSim() {
  return (
    <SimStage
      label="Soko Watcher: operations map, gimbal feed, telemetry and recording"
      steps={steps}
      ratio="1000 / 600"
      compactRatio="400 / 600"
      render={(f) => <Scene f={f} />}
    />
  )
}

