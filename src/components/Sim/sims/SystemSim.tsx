import { Link } from 'react-router-dom'
import { paths } from '../../../data/site'
import styles from '../../../styles/SimSystem.module.css'
import sim from '../../../styles/Sim.module.css'
import { InfoPopover } from '../../Popover/InfoPopover'
import { Icon, Packets, type IconName } from '../draw'
import { polyD, type Pt } from '../geom'
import { SimStage, type SimFrame, type SimStep } from '../SimStage'

const steps: SimStep[] = [
  {
    label: 'Field operators',
    caption: 'Watches, phones, body cams and drones report positions, alerts and video from the field.',
    duration: 4500,
  },
  {
    label: 'Any link',
    caption: 'Information travels over whichever link is available: cellular, satellite, radio mesh, or offline Wi-Fi and peer to peer.',
    duration: 5200,
  },
  {
    label: 'Drone',
    caption: 'A drone keeps a site under surveillance. Its ground control station sends the view on to Sigtrack.',
    duration: 4600,
  },
  {
    label: 'Operational GIS',
    caption: 'Sigtrack brings it together on one map: what is happening, where, and who is affected. AI processing adds analytics and reports.',
    duration: 5000,
  },
  {
    label: 'Command',
    caption: 'The command centre sees everything on Sigtrack Web and Desktop, and sends orders back down to the teams and patrols.',
    duration: 5600,
  },
]

type NodeId = 'watch' | 'phone' | 'body' | 'drone' | 'gcs' | 'hub' | 'ai' | 'web' | 'desktop' | 'patrol'
type Box = { x: number; y: number; w: number; h: number }

interface Layout {
  W: number
  H: number
  nodes: Record<NodeId, Box>
  lanes: Box[]
  groups: { label: string; x: number; y: number }[]
  commandBox: Box
  site: Box
  edges: {
    field: Pt[][]
    spineIn: Pt[]
    laneIn: Pt[][]
    laneOut: Pt[][]
    toHub: Pt[]
    drone: Pt[]
    gcs: Pt[]
    ai: Pt[]
    command: Pt[]
    patrol: Pt[]
  }
}

const wide: Layout = {
  W: 1120,
  H: 600,
  nodes: {
    watch: { x: 40, y: 96, w: 190, h: 52 },
    phone: { x: 40, y: 172, w: 190, h: 52 },
    body: { x: 40, y: 248, w: 190, h: 52 },
    drone: { x: 40, y: 372, w: 190, h: 52 },
    gcs: { x: 330, y: 414, w: 230, h: 52 },
    hub: { x: 650, y: 230, w: 140, h: 140 },
    ai: { x: 870, y: 92, w: 210, h: 52 },
    web: { x: 886, y: 238, w: 178, h: 48 },
    desktop: { x: 886, y: 302, w: 178, h: 48 },
    patrol: { x: 870, y: 456, w: 210, h: 52 },
  },
  lanes: [130, 186, 242, 298].map((y) => ({ x: 330, y: y - 20, w: 230, h: 40 })),
  groups: [
    { label: 'Field operators', x: 40, y: 80 },
    { label: 'Links', x: 330, y: 92 },
    { label: 'Command centre · supervisors', x: 870, y: 214 },
  ],
  commandBox: { x: 870, y: 222, w: 210, h: 144 },
  site: { x: 40, y: 452, w: 190, h: 110 },
  edges: {
    field: [
      [[230, 122], [280, 122]],
      [[230, 198], [280, 198]],
      [[230, 274], [280, 274]],
    ],
    spineIn: [[280, 122], [280, 298]],
    laneIn: [130, 186, 242, 298].map((y) => [[280, y], [330, y]] as Pt[]),
    laneOut: [130, 186, 242, 298].map((y) => [[560, y], [610, y], [610, 300], [650, 300]] as Pt[]),
    toHub: [[610, 300], [650, 300]],
    drone: [[230, 398], [280, 398], [280, 440], [330, 440]],
    gcs: [[560, 440], [610, 440], [610, 352], [668, 352]],
    ai: [[760, 246], [800, 246], [800, 118], [870, 118]],
    command: [[790, 300], [870, 300]],
    patrol: [[760, 354], [800, 354], [800, 482], [870, 482]],
  },
}

const narrow: Layout = {
  W: 400,
  H: 680,
  nodes: {
    watch: { x: 8, y: 40, w: 92, h: 48 },
    phone: { x: 106, y: 40, w: 92, h: 48 },
    body: { x: 204, y: 40, w: 92, h: 48 },
    drone: { x: 302, y: 40, w: 90, h: 48 },
    gcs: { x: 300, y: 380, w: 92, h: 48 },
    hub: { x: 150, y: 354, w: 100, h: 100 },
    ai: { x: 8, y: 380, w: 92, h: 48 },
    web: { x: 20, y: 580, w: 174, h: 46 },
    desktop: { x: 206, y: 580, w: 174, h: 46 },
    patrol: { x: 30, y: 480, w: 150, h: 44 },
  },
  lanes: [150, 196, 242, 288].map((y) => ({ x: 40, y: y - 18, w: 244, h: 36 })),
  groups: [
    { label: 'Field operators', x: 8, y: 26 },
    { label: 'Links', x: 40, y: 122 },
    { label: 'Command centre', x: 8, y: 552 },
  ],
  commandBox: { x: 8, y: 562, w: 384, h: 78 },
  site: { x: 302, y: 98, w: 90, h: 60 },
  edges: {
    field: [
      [[54, 88], [54, 108]],
      [[152, 88], [152, 108]],
      [[250, 88], [250, 108]],
    ],
    spineIn: [[250, 108], [20, 108], [20, 288]],
    laneIn: [150, 196, 242, 288].map((y) => [[20, y], [40, y]] as Pt[]),
    laneOut: [150, 196, 242, 288].map((y) => [[284, y], [300, y], [300, 326], [200, 326], [200, 354]] as Pt[]),
    toHub: [[200, 326], [200, 354]],
    drone: [[347, 158], [347, 380]],
    gcs: [[300, 404], [250, 404]],
    ai: [[150, 404], [100, 404]],
    command: [[230, 446], [300, 480], [300, 562]],
    patrol: [[170, 446], [105, 480]],
  },
}

const laneInfo: { label: string; icon: IconName; title: string; text: string; to?: string; toLabel?: string }[] = [
  { label: 'Cellular', icon: 'tower', title: 'Cellular', text: 'Mobile networks carry positions, alerts and video wherever there is coverage.' },
  { label: 'Satellite', icon: 'satellite', title: 'Satellite', text: 'Satellite links reach places with no ground network.' },
  {
    label: 'Radio mesh',
    icon: 'radio',
    title: 'Radio communication and mesh',
    text: 'Silvus radios for bandwidth and Meshtastic for long range, so teams stay connected without the internet.',
    to: paths.radios,
    toLabel: 'The radios',
  },
  {
    label: 'Offline Wi-Fi · peer to peer',
    icon: 'wifi',
    title: 'Offline Wi-Fi and peer to peer',
    text: 'Nearby devices connect directly, with no internet. Flash uses the local network for chat, calls and files.',
    to: paths.flash,
    toLabel: 'Flash',
  },
]

const nodeInfo: Record<NodeId, { name: string; short?: string; sub: string; icon: IconName; text: string; to?: string; toLabel?: string }> = {
  watch: {
    name: 'Sigtrack Watch',
    short: 'Watch',
    sub: 'SOS · location',
    icon: 'watch',
    text: 'On the wrist: send an SOS, detect emergencies automatically, call, and receive alerts of nearby incidents.',
    to: paths.watch,
    toLabel: 'Sigtrack Watch',
  },
  phone: {
    name: 'Sigtrack Mobile',
    short: 'Phone',
    sub: 'Android',
    icon: 'phone',
    text: 'Team communication, push to talk, offline communication, video conferencing and alerts of nearby incidents.',
    to: paths.mobile,
    toLabel: 'Sigtrack Mobile',
  },
  body: {
    name: 'Body cam · head mount',
    short: 'Body cam',
    sub: 'I see what you see',
    icon: 'camera',
    text: 'Shows command what the wearer sees, over cellular and satellite, with night vision, SOS alerts and calls.',
  },
  drone: {
    name: 'Drone',
    sub: 'Aerial view',
    icon: 'drone',
    text: 'Unmanned vehicles for search and rescue, live video, surveillance and intel: here, a site kept under surveillance and mapped.',
  },
  gcs: {
    name: 'Ground control station',
    short: 'Ground station',
    sub: 'Soko Watcher',
    icon: 'station',
    text: 'Soko Watcher flies the drone payload: live gimbal camera, operations map and telemetry.',
    to: paths.watcher,
    toLabel: 'Soko Watcher',
  },
  hub: {
    name: 'Sigtrack',
    sub: 'Operational GIS',
    icon: 'cloud',
    text: 'An operational GIS, not just software: it shows what is happening in real time, where, who is affected and what should happen next, and lets you plan and control remotely through the map.',
  },
  ai: {
    name: 'AI processing',
    short: 'AI',
    sub: 'Analytics · reports',
    icon: 'ai',
    text: 'An AI analytics dashboard and report system, for periodic reports and analysis after an operation.',
  },
  web: {
    name: 'Sigtrack Web',
    sub: 'Browser',
    icon: 'monitor',
    text: 'At the command centre: live tracking, live SOS and geofencing, tactical symbols and video feeds, in the browser.',
    to: paths.web,
    toLabel: 'Sigtrack Web',
  },
  desktop: {
    name: 'Sigtrack Desktop',
    sub: 'Windows',
    icon: 'laptop',
    text: 'Live tracking, history playback and markers on Windows, with Silvus and Meshtastic for offline communication.',
    to: paths.desktop,
    toLabel: 'Sigtrack Desktop',
  },
  patrol: {
    name: 'Mobile patrol · rapid unit',
    short: 'Mobile patrol',
    sub: 'Connected to the cloud',
    icon: 'truck',
    text: 'A mobile patrol or rapid response unit, connected through the Sigtrack cloud.',
  },
}

const focus: Record<number, { nodes: NodeId[]; lanes: boolean; drone: boolean }> = {
  0: { nodes: ['watch', 'phone', 'body'], lanes: false, drone: false },
  1: { nodes: ['hub'], lanes: true, drone: false },
  2: { nodes: ['drone', 'gcs', 'hub'], lanes: false, drone: true },
  3: { nodes: ['hub', 'ai'], lanes: false, drone: false },
  4: { nodes: ['web', 'desktop', 'patrol', 'hub'], lanes: false, drone: false },
}

const pct = (v: number, of: number) => `${(v / of) * 100}%`

function Explain({ text, to, toLabel }: { text: string; to?: string; toLabel?: string }) {
  return (
    <>
      {text}
      {to && (
        <>
          {' '}
          <Link to={to} className={styles.explore}>
            Explore {toLabel}
          </Link>
        </>
      )}
    </>
  )
}

function Scene({ f }: { f: SimFrame }) {
  const L = f.compact ? narrow : wide
  const { W, H, edges } = L
  const on = focus[f.step]
  const lit = (id: NodeId) => on.nodes.includes(id)
  const laneLit = (i: number) => f.step === 1 && f.t > i * 900

  const edge = (pts: Pt[], active: boolean, key?: string) => (
    <path key={key} d={polyD(pts)} className={styles.edge} data-on={active || undefined} />
  )

  const moving: { pts: Pt[]; reverse?: boolean; color?: string; period?: number }[] = []
  if (f.step === 0) edges.field.forEach((pts) => moving.push({ pts: [...pts, ...edges.spineIn.slice(1)] }))
  if (f.step === 1) edges.laneOut.forEach((pts, i) => laneLit(i) && moving.push({ pts: [edges.laneIn[i][0], ...pts], period: 2000 }))
  if (f.step === 2) {
    moving.push({ pts: edges.drone, color: '#7fd3ff' })
    if (f.t > 1400) moving.push({ pts: edges.gcs, color: '#7fd3ff' })
  }
  if (f.step === 3) moving.push({ pts: edges.ai }, { pts: edges.ai, reverse: true, color: '#9ff0c4' })
  if (f.step === 4) {
    moving.push({ pts: edges.command })
    if (f.t > 1800) {
      moving.push({ pts: edges.patrol, color: '#9ff0c4' })
      edges.field.forEach((pts) => moving.push({ pts, reverse: true, color: '#9ff0c4', period: 1800 }))
    }
  }

  const hub = L.nodes.hub
  const hcx = hub.x + hub.w / 2
  const hcy = hub.y + hub.h / 2
  const site = L.site
  const sweep = f.reduced ? 0.5 : (f.t / 2400) % 1

  return (
    <div className={styles.scene}>
      <svg className={sim.canvas} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        {L.groups.map((g) => (
          <text key={g.label} x={g.x} y={g.y} className={styles.groupLabel}>
            {g.label}
          </text>
        ))}
        <rect {...L.commandBox} className={styles.commandBox} data-on={f.step === 4 || undefined} />

        {edges.field.map((pts, i) => edge(pts, f.step === 0 || f.step === 4, `f${i}`))}
        {edge(edges.spineIn, f.step <= 1 || f.step === 4)}
        {edges.laneIn.map((pts, i) => edge(pts, laneLit(i), `li${i}`))}
        {edges.laneOut.map((pts, i) => edge(pts, laneLit(i), `lo${i}`))}
        {edge(edges.drone, f.step === 2)}
        {edge(edges.gcs, f.step === 2 && f.t > 1400)}
        {edge(edges.ai, f.step === 3)}
        {edge(edges.command, f.step === 4)}
        {edge(edges.patrol, f.step === 4 && f.t > 1800)}

        <g className={styles.site} data-on={f.step === 2 || undefined}>
          <rect {...site} />
          {Array.from({ length: 5 }, (_, i) => (
            <path key={i} d={`M${site.x} ${site.y + ((i + 1) * site.h) / 6}h${site.w}`} />
          ))}
          {f.step === 2 && (
            <path
              className={styles.cone}
              d={`M${L.nodes.drone.x + L.nodes.drone.w / 2} ${L.nodes.drone.y + L.nodes.drone.h}L${site.x + sweep * (site.w - site.w * 0.28)} ${site.y}h${site.w * 0.28}Z`}
            />
          )}
          {f.step === 2 && (
            <rect x={site.x + sweep * (site.w - site.w * 0.28)} y={site.y} width={site.w * 0.28} height={site.h} className={styles.sweep} />
          )}
          {!f.compact && (
            <text x={site.x + 8} y={site.y + site.h - 8} className={styles.siteLabel}>
              Site under surveillance
            </text>
          )}
        </g>

        <circle cx={hcx} cy={hcy} r={hub.w / 2} className={styles.hubRing} data-on={lit('hub') || undefined} />
        {lit('hub') && <circle cx={hcx} cy={hcy} r={hub.w / 2} className={`${styles.hubPulse} ${sim.pulse}`} />}
        {f.step === 3 &&
          [
            [-0.42, -0.1],
            [-0.15, 0.25],
            [0.2, -0.3],
            [0.35, 0.18],
            [0.02, -0.02],
          ].map(([dx, dy], i) => (
            <circle
              key={i}
              cx={hcx + dx * hub.w * 0.7}
              cy={hcy + dy * hub.w * 0.7 + hub.w * 0.18}
              r={3.5}
              className={styles.hubDot}
              opacity={f.p(400 + i * 300, 300)}
            />
          ))}

        {moving.map((m, i) => (
          <Packets key={i} pts={m.pts} t={f.t + i * 137} period={m.period ?? 1500} count={2} r={f.compact ? 3.5 : 4.5} color={m.color} reverse={m.reverse} />
        ))}
      </svg>

      {(Object.keys(L.nodes) as NodeId[]).map((id) => {
        const b = L.nodes[id]
        const n = nodeInfo[id]
        return (
          <div
            key={id}
            className={styles.node}
            data-kind={id === 'hub' ? 'hub' : undefined}
            data-on={lit(id) || undefined}
            style={{ left: pct(b.x, W), top: pct(b.y, H), width: pct(b.w, W), height: pct(b.h, H) }}
          >
            <InfoPopover
              title={n.name}
              triggerClassName={styles.nodeBtn}
              placement={b.y > H / 2 ? 'top' : 'bottom'}
              trigger={
                <>
                  <svg viewBox="0 0 24 24" className={styles.nodeIcon} aria-hidden="true">
                    <Icon name={n.icon} x={12} y={12} />
                  </svg>
                  <span className={styles.nodeText}>
                    <span className={styles.nodeName}>{f.compact && n.short ? n.short : n.name}</span>
                    <span className={styles.nodeSub}>{n.sub}</span>
                  </span>
                </>
              }
            >
              <Explain text={n.text} to={n.to} toLabel={n.toLabel} />
            </InfoPopover>
          </div>
        )
      })}
      {L.lanes.map((b, i) => {
        const l = laneInfo[i]
        return (
          <div
            key={l.label}
            className={styles.node}
            data-kind="lane"
            data-on={laneLit(i) || undefined}
            style={{ left: pct(b.x, W), top: pct(b.y, H), width: pct(b.w, W), height: pct(b.h, H) }}
          >
            <InfoPopover
              title={l.title}
              triggerClassName={styles.nodeBtn}
              placement="right"
              trigger={
                <>
                  <svg viewBox="0 0 24 24" className={styles.nodeIcon} aria-hidden="true">
                    <Icon name={l.icon} x={12} y={12} />
                  </svg>
                  <span className={styles.nodeName}>{l.label}</span>
                </>
              }
            >
              <Explain text={l.text} to={l.to} toLabel={l.toLabel} />
            </InfoPopover>
          </div>
        )
      })}
    </div>
  )
}

export default function SystemSim() {
  return (
    <SimStage
      label="How information flows through the Sigtrack system"
      steps={steps}
      ratio="1120 / 600"
      compactRatio="400 / 680"
      render={(f) => <Scene f={f} />}
    />
  )
}
