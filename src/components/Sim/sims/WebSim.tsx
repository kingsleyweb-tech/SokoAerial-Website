import { Fragment } from 'react'
import { border, ghana, lakeVolta, project, roads, seaPath, toPath, type LonLat } from '../geo-ghana'
import sim from '../../../styles/Sim.module.css'
import styles from '../../../styles/SimProducts.module.css'
import { Icon } from '../draw'
import { along, type Pt } from '../geom'
import { Hotspot, Tip } from '../Hotspot'
import { SimStage, type SimFrame, type SimStep } from '../SimStage'

const steps: SimStep[] = [
  { label: 'Group the team', caption: 'Organise operatives into groups and see the team structure in the Teams panel.', duration: 4500 },
  { label: 'Members as markers', caption: 'Every team member appears on the map as their own marker.', duration: 4000 },
  { label: 'Real time tracking', caption: 'Markers move as members move, so command always sees where each one is.', duration: 5500 },
  { label: 'Meshtastic radio', caption: 'Connect to Meshtastic radio for direct communication between operatives, without the internet.', duration: 4500 },
  { label: 'Chat offline', caption: 'Messages go over Meshtastic radio when there is no internet connection.', duration: 5500 },
]

const teams = [
  {
    name: 'Alpha',
    color: '#2a5fe8',
    members: [
      { id: 'A1', name: 'Mensah', route: [[-0.19, 5.62], [-0.35, 5.81], [-0.46, 6.27]] as LonLat[] },
      { id: 'A2', name: 'Owusu', route: [[-0.62, 5.36], [-0.95, 5.25], [-1.25, 5.11]] as LonLat[] },
      { id: 'A3', name: 'Asante', route: [[-1.62, 6.69], [-1.21, 6.62], [-0.9, 6.5]] as LonLat[] },
    ],
  },
  {
    name: 'Bravo',
    color: '#e5484d',
    members: [
      { id: 'B1', name: 'Abubakar', route: [[-0.85, 9.4], [-0.6, 9.42], [-0.3, 9.44]] as LonLat[] },
      { id: 'B2', name: 'Yeboah', route: [[-1.73, 8.05], [-1.6, 8.4], [-1.47, 8.8]] as LonLat[] },
    ],
  },
]

const members = teams.flatMap((t) => t.members.map((m) => ({ ...m, team: t.name, color: t.color })))

const ghanaD = toPath(ghana, true)
const borderD = toPath(border)
const lakeD = toPath(lakeVolta, true)
const roadDs = roads.map((r) => toPath(r))

const chat = [
  { me: false, who: 'Mensah', text: 'At the checkpoint. Road is clear.' },
  { me: true, who: 'Command', text: 'Copy. Hold position until Bravo reports.' },
  { me: false, who: 'Abubakar', text: 'Bravo moving north, 20 minutes out.' },
]

function Scene({ f }: { f: SimFrame }) {
  const W = f.compact ? 400 : 750
  const H = f.compact ? 330 : 568
  const rail = f.compact ? 0 : 44
  const mapW = W - rail
  const [x0, y0] = project([-3.4, 11.25])
  const [x1, y1] = project([1.3, 4.65])
  const k = Math.min(mapW / (x1 - x0), H / (y1 - y0)) * 0.96
  const ox = rail + (mapW - (x1 - x0) * k) / 2 - x0 * k
  const oy = (H - (y1 - y0) * k) / 2 - y0 * k
  const toScreen = (p: LonLat): Pt => {
    const [x, y] = project(p)
    return [ox + x * k, oy + y * k]
  }

  const showMarkers = f.step >= 1
  const travel = f.step < 2 ? 0 : f.step === 2 ? f.t / steps[2].duration : 1
  const pos = (m: (typeof members)[number]) => along(m.route.map(toScreen), travel)
  const showMesh = f.step >= 3
  const [bx, by] = pos(members[4])
  const anchor = f.compact
    ? { x: (bx - 18) / W, y: 0.06 + (by / H) * 0.94 * (330 / 608) }
    : { x: ((bx - 20) / W) * 0.75, y: 0.053 + (by / H) * 0.947 }

  return (
    <div className={styles.browser}>
      <div className={styles.browserBar} aria-hidden="true">
        <i />
        <i />
        <i />
        <span>Sigtrack Web</span>
      </div>
      <div className={styles.browserBody} data-compact={f.compact || undefined}>
        <div className={styles.mapArea}>
          <svg className={sim.canvas} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <rect width={W} height={H} fill="#e9ede4" />
            <g transform={`translate(${ox} ${oy}) scale(${k})`}>
              <path d={seaPath} fill="#b9d7ef" />
              <path d={ghanaD} fill="#f3f1e9" />
              <path d={lakeD} fill="#b9d7ef" />
              {roadDs.map((d, i) => (
                <path key={i} d={d} fill="none" stroke="#f2c14e" strokeWidth={1.4} vectorEffect="non-scaling-stroke" />
              ))}
              <path d={borderD} fill="none" stroke="#1d1d1d" strokeWidth={6} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              <path d={borderD} fill="none" stroke="#f08a24" strokeWidth={3} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            </g>

            {showMesh &&
              members.slice(0, -1).map((m, i) => {
                const a = pos(m)
                const b = pos(members[i + 1])
                return (
                  <line
                    key={m.id}
                    x1={a[0]}
                    y1={a[1]}
                    x2={b[0]}
                    y2={b[1]}
                    className={`${styles.mesh} ${sim.flow}`}
                    opacity={f.step === 3 ? f.p(i * 250, 400) : 1}
                  />
                )
              })}

            {showMarkers &&
              members.map((m, i) => {
                const [x, y] = pos(m)
                const appear = f.step === 1 ? f.p(i * 350, 400) : 1
                const trail = f.step >= 2 ? m.route.map(toScreen) : []
                return (
                  <g key={m.id} opacity={appear}>
                    {trail.length > 0 && (
                      <polyline
                        points={[...trail.filter((_, j) => j / (trail.length - 1) <= travel), [x, y]].map((p) => p.join(',')).join(' ')}
                        className={styles.trail}
                        stroke={m.color}
                      />
                    )}
                    <g transform={`translate(${x} ${y - (1 - appear) * 14})`}>
                      <circle r={11} fill={m.color} stroke="#fff" strokeWidth={2} />
                      <text y={3.5} className={styles.markerText}>
                        {m.id}
                      </text>
                      {!f.compact && (
                        <text x={15} y={4} className={styles.markerLabel}>
                          {m.name}
                        </text>
                      )}
                    </g>
                  </g>
                )
              })}
          </svg>
          {!f.compact && (
            <div className={styles.rail} aria-hidden="true">
              {(['map', 'people', 'pin', 'chat'] as const).map((n) => (
                <svg key={n} viewBox="0 0 24 24">
                  <Icon name={n} x={12} y={12} />
                </svg>
              ))}
            </div>
          )}
        </div>

        <aside className={styles.sidePanel}>
          {f.step < 4 ? (
            <>
              <div className={sim.panelTitle}>
                Teams
                <Tip label="Teams" title="Group and display team members" placement="left">
                  Organise operatives into groups and see the team structure directly in the platform.
                </Tip>
              </div>
              {teams.map((t, ti) => (
                <div key={t.name} className={styles.team} style={{ opacity: f.step === 0 ? f.p(ti * 500, 400) : 1 }}>
                  <div className={sim.row}>
                    <span className={sim.dot} style={{ background: t.color }} />
                    <strong>{t.name}</strong>
                    <span className={sim.panelMeta}>{t.members.length}</span>
                  </div>
                  {(!f.compact || ti === 0) &&
                    t.members.map((m, mi) => (
                      <div key={m.id} className={styles.member} style={{ opacity: f.step === 0 ? f.p(900 + ti * 500 + mi * 250, 300) : 1 }}>
                        <span className={styles.memberId} style={{ background: t.color }}>
                          {m.id}
                        </span>
                        {m.name}
                        {f.step >= 2 && <span className={styles.live}>live</span>}
                      </div>
                    ))}
                </div>
              ))}
              {f.step >= 3 && (
                <Tip label="Radio" title="Connect to Meshtastic radio" placement="left">
                  Direct communication between operatives without traditional internet connectivity.
                </Tip>
              )}
              {f.step >= 3 && (
                <div className={styles.radio} style={{ opacity: f.step === 3 ? f.p(300) : 1 }}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <Icon name="radio" x={12} y={12} />
                  </svg>
                  Meshtastic
                  <span className={styles.connected}>{f.step === 3 && f.t < 900 ? 'connecting' : 'connected'}</span>
                </div>
              )}
            </>
          ) : (
            <>
              <div className={sim.panelTitle}>
                Chat
                <Tip label="Offline chat" title="Chat without internet" placement="left">
                  Offline messaging over Meshtastic radio.
                </Tip>
              </div>
              <span className={styles.offline}>No internet · via Meshtastic</span>
              <div className={styles.chat}>
                {chat.map((c, i) => (
                  <Fragment key={i}>
                    {f.p(400 + i * 1300, 350) > 0.02 && (
                      <div className={sim.bubble} data-me={c.me || undefined} style={{ opacity: f.p(400 + i * 1300, 350) }}>
                        {c.text}
                        <span className={sim.bubbleMeta}>{c.who}</span>
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>
            </>
          )}
        </aside>
      </div>

      {showMarkers && (
        <Hotspot x={anchor.x} y={anchor.y} label="Markers" title="Each member as a marker" align="left" placement="bottom" shown={f.step === 1 ? f.p(1400, 400) : 1}>
          The location of every team member, pinpointed as a distinct marker on the map.
        </Hotspot>
      )}
    </div>
  )
}

export default function WebSim() {
  return (
    <SimStage
      label="Sigtrack Web: teams, markers, tracking and offline chat"
      steps={steps}
      tone="light"
      ratio="1000 / 600"
      compactRatio="400 / 640"
      render={(f) => <Scene f={f} />}
    />
  )
}
