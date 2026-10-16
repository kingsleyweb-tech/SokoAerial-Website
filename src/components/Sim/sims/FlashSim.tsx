// Flash, without the internet: the features on the Flash page. Paired Windows and Android devices on the same
// local network, encrypted chat, a file the recipient accepts and that arrives verified, and a video call that
// shows latency, resolution, frame rate and bitrate. File names, messages and every number are invented.
import type { CSSProperties, ReactNode } from 'react'
import sim from '../../../styles/Sim.module.css'
import styles from '../../../styles/SimProducts.module.css'
import { Icon, Packets, type IconName } from '../draw'
import { Hotspot } from '../Hotspot'
import { SimStage, type SimFrame, type SimStep } from '../SimStage'

const steps: SimStep[] = [
  { label: 'Find devices', caption: 'Windows laptops and Android phones on the same local network find each other. No internet needed.', duration: 4000 },
  { label: 'Encrypted chat', caption: 'Every conversation is encrypted, with the connection state always visible.', duration: 5000 },
  { label: 'Send a file', caption: 'Send a file: the recipient accepts or declines, and the received file is verified.', duration: 5500 },
  { label: 'Video call', caption: 'Face to face calls, with latency, resolution, frame rate and bitrate on screen.', duration: 5000 },
]

const chat = [
  { fromLaptop: true, text: 'Are you on the site network?' },
  { fromLaptop: false, text: 'Yes, connected. No internet here.' },
  { fromLaptop: true, text: 'Sending the survey video now.' },
]

function Glyph({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <Icon name={name} x={12} y={12} />
    </svg>
  )
}

function Chat({ f, laptop }: { f: SimFrame; laptop: boolean }) {
  return (
    <div className={styles.flashChat}>
      <div className={styles.phoneChatHead}>
        <Glyph name="lock" />
        Encrypted · connected
      </div>
      {chat.map((c, i) => {
        const o = f.p(400 + i * 1400 + (c.fromLaptop === laptop ? 0 : 350), 300)
        return o > 0.02 ? (
          <div key={i} className={sim.bubble} data-me={c.fromLaptop === laptop || undefined} style={{ opacity: o }}>
            {c.text}
          </div>
        ) : null
      })}
    </div>
  )
}

function Transfer({ f, receiver }: { f: SimFrame; receiver: boolean }) {
  const accepted = f.t > 1700
  const progress = f.p(1900, 2200)
  const verified = f.t > 4200
  return (
    <div className={styles.fileCard}>
      <div className={sim.row}>
        <Glyph name="video" />
        <div>
          <strong>survey.mp4</strong>
          <span>Video file</span>
        </div>
      </div>
      {!accepted ? (
        receiver ? (
          <div className={styles.fileBtns}>
            <b>Decline</b>
            <b data-primary>Accept</b>
          </div>
        ) : (
          <span className={styles.fileState}>Waiting for the recipient…</span>
        )
      ) : (
        <>
          <div className={sim.meter}>
            <i style={{ width: `${progress * 100}%` }} />
          </div>
          <span className={styles.fileState} data-ok={verified || undefined}>
            {verified ? '✓ Verified' : `${Math.round(progress * 100)}%`}
          </span>
        </>
      )}
      {receiver && f.t > 1450 && f.t < 1950 && <span className={styles.tapSmall} />}
    </div>
  )
}

function Call({ compact }: { compact?: boolean }) {
  return (
    <div className={styles.call}>
      <div className={styles.callFace}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <Icon name="people" x={12} y={12} />
        </svg>
      </div>
      {!compact && <span className={styles.callSelf} />}
      <div className={styles.callBtns}>
        {(['chat', 'camera'] as const).map((n) => (
          <span key={n}>
            <Glyph name={n} />
          </span>
        ))}
        <span data-end />
      </div>
    </div>
  )
}

function Phone({ style, children }: { style: CSSProperties; children: ReactNode }) {
  return (
    <div className={styles.phone} style={style}>
      <div className={styles.phoneScreen}>
        <div className={styles.phoneStatus}>
          <span>09:41</span>
          <span className={styles.phoneRadio}>Wi‑Fi</span>
        </div>
        <div className={styles.phoneApp}>
          <strong>Flash</strong>
          <span>Android</span>
        </div>
        <div className={styles.phoneBody}>{children}</div>
      </div>
    </div>
  )
}

function Scene({ f }: { f: SimFrame }) {
  const found = f.step > 0 || f.t > 1200
  const traffic = f.step >= 1 && f.step <= 3

  const laptopBody =
    f.step === 0 ? (
      <div className={styles.devList}>
        <span className={styles.devHead}>On this network</span>
        {found ? (
          <div className={styles.devRow} style={{ opacity: f.step === 0 ? f.p(1200, 300) : 1 }}>
            <Glyph name="phone" />
            Field phone
            <em>Online</em>
          </div>
        ) : (
          <span className={styles.fileState}>Searching…</span>
        )}
      </div>
    ) : f.step === 1 ? (
      <Chat f={f} laptop />
    ) : f.step === 2 ? (
      <div className={styles.flashPad}>
        <Transfer f={f} receiver={false} />
      </div>
    ) : (
      <>
        <Call />
        <div className={styles.callStats}>
          <span>Latency 38 ms</span>
          <span>1280×720</span>
          <span>30 fps</span>
          <span>1.6 Mbps</span>
        </div>
      </>
    )

  const phoneBody =
    f.step === 0 ? (
      <div className={styles.devList}>
        <span className={styles.devHead}>On this network</span>
        {found && (
          <div className={styles.devRow} style={{ opacity: f.step === 0 ? f.p(1400, 300) : 1 }}>
            <Glyph name="laptop" />
            Command laptop
            <em>Online</em>
          </div>
        )}
      </div>
    ) : f.step === 1 ? (
      <Chat f={f} laptop={false} />
    ) : f.step === 2 ? (
      <div className={styles.flashPad}>
        <Transfer f={f} receiver />
      </div>
    ) : (
      <Call compact />
    )

  const phoneStyle: CSSProperties = f.compact ? { left: '72%', top: '47%', height: '50%' } : { left: '83%' }

  return (
    <div className={styles.flashStage} data-compact={f.compact || undefined}>
      <svg className={sim.canvas} viewBox={f.compact ? '0 0 400 680' : '0 0 1000 600'} preserveAspectRatio="none" aria-hidden="true">
        {f.compact ? (
          <>
            <path d="M100 262 V430 H206" className={styles.lan} />
            {traffic && <Packets pts={[[100, 262], [100, 430], [206, 430]]} t={f.t} period={1300} count={2} r={3} color="#2a5fe8" />}
          </>
        ) : (
          <>
            <line x1={570} y1={300} x2={700} y2={300} className={styles.lan} />
            {traffic && <Packets pts={[[570, 300], [700, 300]]} t={f.t} period={1300} count={2} r={3} color="#2a5fe8" />}
          </>
        )}
      </svg>

      <div className={styles.lanBadge} style={f.compact ? { left: '25%', top: '78%' } : { left: '63.5%', top: '40%' }}>
        <Glyph name="wifi" />
        <span>Local network</span>
        <em>No internet</em>
      </div>

      <div className={styles.laptop}>
        <div className={styles.laptopScreen}>
          <div className={styles.flashBar}>
            <strong>Flash</strong>
            <span>Windows</span>
            {f.step === 3 && <em>Sample values</em>}
          </div>
          <div className={styles.flashBody}>{laptopBody}</div>
        </div>
        <div className={styles.laptopBase} />
      </div>

      <Phone style={phoneStyle}>{phoneBody}</Phone>

      {f.step === 0 && (
        <Hotspot x={f.compact ? 0.25 : 0.635} y={f.compact ? 0.69 : 0.27} label="No internet" title="Local network only" shown={f.p(800, 300)}>
          Flash works between devices on the same local network. Paired devices online appear straight away.
        </Hotspot>
      )}
      {f.step === 1 && (
        <Hotspot x={f.compact ? 0.25 : 0.635} y={f.compact ? 0.69 : 0.27} label="Encrypted" title="Encrypted chat" shown={f.p(500, 300)}>
          Every conversation is encrypted, with the connection state always visible.
        </Hotspot>
      )}
      {f.step === 2 && (
        <Hotspot x={f.compact ? 0.25 : 0.635} y={f.compact ? 0.69 : 0.27} label="Verified" title="Verified transfers" shown={f.p(4200, 300)}>
          The recipient accepts or declines. Transfer history keeps every received file verified.
        </Hotspot>
      )}
      {f.step === 3 && (
        <Hotspot x={f.compact ? 0.5 : 0.35} y={f.compact ? 0.06 : 0.12} label="Link quality" title="Live link quality" shown={f.p(500, 300)}>
          Latency, resolution, frame rate and bitrate shown on every call. The numbers here are samples.
        </Hotspot>
      )}
    </div>
  )
}

export default function FlashSim() {
  return (
    <SimStage
      label="Flash: local network discovery, encrypted chat, verified file transfer and video call"
      steps={steps}
      tone="light"
      ratio="1000 / 600"
      compactRatio="400 / 680"
      render={(f) => <Scene f={f} />}
    />
  )
}
