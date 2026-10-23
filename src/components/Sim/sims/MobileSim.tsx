import type { CSSProperties, ReactNode } from 'react'
import sim from '../../../styles/Sim.module.css'
import styles from '../../../styles/SimProducts.module.css'
import { Icon, MiniMap, Packets, type IconName } from '../draw'
import { lerp } from '../geom'
import { Hotspot } from '../Hotspot'
import { SimStage, type SimFrame, type SimStep } from '../SimStage'

const steps: SimStep[] = [
  { label: 'Pair a radio', caption: 'Pair the phone with a Silvus or Meshtastic radio, for robust channels where networks fail.', duration: 4500 },
  { label: 'Drop a marker', caption: 'Drag and drop a marker onto the map.', duration: 4500 },
  { label: 'Share a waypoint', caption: 'Direct teammates to a rendezvous point: the waypoint appears on their phones.', duration: 5000 },
  { label: 'Encrypted chat', caption: 'Secure messaging that safeguards sensitive data.', duration: 5500 },
]

const me = { x: 38, y: 64 }
const mate = { x: 66, y: 30 }
const drop = { x: 62, y: 58 }
const waypoint = { x: 30, y: 34 }
const tray = { x: 22, y: 92 }

const chat = [
  { me: true, text: 'Meet at the rendezvous point.' },
  { me: false, text: 'Copy. On my way, 10 minutes.' },
  { me: true, text: 'Marker added at the bridge.' },
]

const at = (p: { x: number; y: number }): CSSProperties => ({ left: `${p.x}%`, top: `${p.y}%` })

function Glyph({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <Icon name={name} x={12} y={12} />
    </svg>
  )
}

function Phone({ x, label, radio, children }: { x: number; label: string; radio: string; children: ReactNode }) {
  return (
    <div className={styles.phone} style={{ left: `${x}%` }}>
      <div className={styles.phoneScreen}>
        <div className={styles.phoneStatus}>
          <span>09:41</span>
          <span className={styles.phoneRadio}>{radio}</span>
        </div>
        <div className={styles.phoneApp}>
          <strong>Sigtrack</strong>
          <span>{label}</span>
        </div>
        <div className={styles.phoneBody}>{children}</div>
      </div>
    </div>
  )
}

function MapLayer({ f, self, other, showWaypoint, route }: {
  f: SimFrame
  self: { x: number; y: number }
  other: { x: number; y: number }
  showWaypoint: number
  route?: number
}) {
  return (
    <>
      <svg className={sim.canvas} viewBox="0 0 180 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <MiniMap W={180} H={300} />
      </svg>
      {route !== undefined && route > 0 && (
        <svg className={sim.canvas} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line
            x1={self.x}
            y1={self.y}
            x2={lerp(self.x, waypoint.x, route)}
            y2={lerp(self.y, waypoint.y, route)}
            className={`${styles.route} ${sim.flow}`}
          />
        </svg>
      )}
      <span className={styles.selfDot} style={at(self)} />
      <span className={styles.mateDot} style={at(other)} />
      {f.step >= 1 && (
        <span className={styles.dropped} style={{ ...at(drop), opacity: f.step === 1 ? (f.t > 2600 ? 1 : 0) : 1 }}>
          <Glyph name="pin" />
        </span>
      )}
      {showWaypoint > 0.02 && (
        <span className={styles.waypoint} style={{ ...at(waypoint), opacity: showWaypoint }}>
          <i />
          Rendezvous
        </span>
      )}
    </>
  )
}

function Scene({ f }: { f: SimFrame }) {
  const paired = f.step > 0 || f.t > 1600
  const radioState = paired ? 'Radio ✓' : 'Radio …'

  const drag = f.step === 1 ? f.p(900, 1500) : 0
  const finger = f.step === 1 && f.t > 500 && f.t < 3000
  const wpHere = f.step === 2 ? f.p(500, 400) : f.step > 2 ? 1 : 0
  const shared = f.step === 2 ? f.p(2200, 500) : f.step > 2 ? 1 : 0
  const route = f.step === 2 ? f.p(2800, 1600) : f.step > 2 ? 1 : 0
  const linkOn = paired && (f.step === 2 || f.step === 3)

  const screenA =
    f.step === 0 ? (
      <div className={styles.phoneList}>
        <div className={styles.phoneListHead}>Radios</div>
        <div className={styles.phoneRow}>
          <Glyph name="radio" />
          Silvus
          <span data-on={paired || undefined}>{paired ? 'Paired' : f.t > 700 ? 'Pairing…' : 'Pair'}</span>
        </div>
        <div className={styles.phoneRow}>
          <Glyph name="radio" />
          Meshtastic
          <span>Pair</span>
        </div>
        <p className={styles.phoneNote}>Works where there is no cellular signal.</p>
      </div>
    ) : f.step === 3 ? (
      <ChatScreen f={f} mine />
    ) : (
      <>
        <MapLayer f={f} self={me} other={mate} showWaypoint={wpHere} />
        {f.step === 1 && (
          <div className={styles.markerTray}>
            {(['pin', 'sos', 'camera'] as const).map((n) => (
              <span key={n}>
                <Glyph name={n} />
              </span>
            ))}
          </div>
        )}
        {f.step === 1 && finger && drag < 1 && (
          <span className={styles.dragging} style={at({ x: lerp(tray.x, drop.x, drag), y: lerp(tray.y, drop.y, drag) })}>
            <Glyph name="pin" />
          </span>
        )}
        {finger && <span className={styles.finger} style={at({ x: lerp(tray.x, drop.x, drag) + 3, y: lerp(tray.y, drop.y, drag) + 4 })} />}
        {f.step === 2 && (
          <div className={styles.toast} style={{ opacity: f.p(1400, 300) }}>
            {shared > 0.9 ? 'Waypoint shared with the team' : 'Share waypoint'}
          </div>
        )}
      </>
    )

  const screenB =
    f.step === 3 ? (
      <ChatScreen f={f} />
    ) : (
      <MapLayer f={f} self={mate} other={me} showWaypoint={f.step === 2 ? shared : f.step > 2 ? 1 : 0} route={f.step === 2 ? route : 0} />
    )

  return (
    <div className={styles.phoneStage}>
      {!f.compact && (
        <svg className={sim.canvas} viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
          <line x1={420} y1={300} x2={480} y2={300} className={styles.radioLink} data-on={paired || undefined} />
          <line x1={520} y1={300} x2={580} y2={300} className={styles.radioLink} data-on />
          {linkOn && (
            <>
              <Packets pts={[[420, 300], [580, 300]]} t={f.t} period={1400} count={2} r={3} color="#2a5fe8" />
              <Packets pts={[[420, 300], [580, 300]]} t={f.t + 500} period={1400} count={1} r={3} color="#2a5fe8" reverse />
            </>
          )}
        </svg>
      )}
      {!f.compact && (
        <div className={styles.radioUnit}>
          <Glyph name="radio" />
          <span>Radio</span>
        </div>
      )}

      <Phone x={f.compact ? 50 : 29} label={f.step === 3 ? 'Chat' : f.step === 0 ? 'Settings' : 'Map'} radio={radioState}>
        {screenA}
      </Phone>
      {!f.compact && (
        <Phone x={71} label={f.step === 3 ? 'Chat' : 'Map'} radio="Radio ✓">
          {screenB}
        </Phone>
      )}
      {!f.compact && (
        <>
          <span className={styles.phoneTag} style={{ left: '29%' }}>Your phone</span>
          <span className={styles.phoneTag} style={{ left: '71%' }}>Teammate</span>
        </>
      )}

      {f.step === 0 && (
        <Hotspot x={f.compact ? 0.5 : 0.5} y={f.compact ? 0.12 : 0.4} label="Radio" title="Silvus + Meshtastic radio">
          Robust channels in the most challenging environments. The phone talks to the team through the paired radio.
        </Hotspot>
      )}
      {f.step === 1 && (
        <Hotspot x={f.compact ? 0.5 : 0.29} y={0.2} label="Markers" title="Custom markers and images" shown={f.p(300, 300)}>
          Drag and drop markers or images onto the map.
        </Hotspot>
      )}
      {f.step === 2 && (
        <Hotspot x={f.compact ? 0.5 : 0.71} y={0.2} label="Waypoint" title="Waypoint sharing" shown={f.p(2200, 300)}>
          Direct teammates to rendezvous points and objectives.
        </Hotspot>
      )}
      {f.step === 3 && (
        <Hotspot x={f.compact ? 0.5 : 0.5} y={f.compact ? 0.12 : 0.4} label="Encrypted" title="Encrypted chatting">
          Secure messaging that safeguards sensitive data.
        </Hotspot>
      )}
    </div>
  )
}

function ChatScreen({ f, mine = false }: { f: SimFrame; mine?: boolean }) {
  return (
    <div className={styles.phoneChat}>
      <div className={styles.phoneChatHead}>
        <Glyph name="lock" />
        Team · encrypted
      </div>
      {chat.map((c, i) => {
        const o = f.p(400 + i * 1500 + (c.me === mine ? 0 : 500), 300)
        return o > 0.02 ? (
          <div key={i} className={sim.bubble} data-me={c.me === mine || undefined} style={{ opacity: o }}>
            {c.text}
          </div>
        ) : null
      })}
    </div>
  )
}

export default function MobileSim() {
  return (
    <SimStage
      label="Sigtrack Mobile: radio pairing, markers, waypoint sharing and encrypted chat"
      steps={steps}
      tone="light"
      ratio="1000 / 600"
      compactRatio="400 / 640"
      render={(f) => <Scene f={f} />}
    />
  )
}
