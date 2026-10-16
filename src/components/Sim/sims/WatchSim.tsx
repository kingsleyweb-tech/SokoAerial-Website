// Sigtrack Watch, on the wrist: real screenshots from the SIGTRACK WEAR deck (locator, create zone, active
// zone, quick actions) and, beside it, the command centre that receives live tracking, geofencing and SOS
// (ESRI deck). The labels repeat the WEAR slide bullets. The operative's name and the times are invented;
// the coordinates are the ones shown on the real locator screen.
import type { CSSProperties } from 'react'
import { watchScreens } from '../../../data/watch'
import sim from '../../../styles/Sim.module.css'
import styles from '../../../styles/SimProducts.module.css'
import { WatchFrame } from '../../WatchFrame/WatchFrame'
import { MiniMap } from '../draw'
import { Hotspot } from '../Hotspot'
import { SimStage, type SimFrame, type SimStep } from '../SimStage'

const steps: SimStep[] = [
  { label: 'Locator', caption: 'The emergency locator shows live coordinates, speed and position on the map. Command sees the same position.', duration: 4500 },
  { label: 'Create a zone', caption: 'Define a patrol zone from the wrist: describe it, set the radius in metres, then create it.', duration: 4500 },
  { label: 'Active zone', caption: 'The enabled zone is monitored live; leaving or entering it triggers an alert.', duration: 4500 },
  { label: 'Send SOS', caption: 'One press on SOS, and the alert with the position reaches the command centre.', duration: 5000 },
  { label: 'Quick actions', caption: 'The radial menu puts every tool in one ring: call, alert, health, team and settings.', duration: 4000 },
]

const screen = (id: string) => watchScreens.find((s) => s.id === id)!
const shots = [screen('locator'), screen('create-zone'), screen('active-zone'), screen('locator'), screen('quick-actions')]
// one callout per step, word for word from the WEAR deck
const notes = [shots[0].callouts[0], shots[1].callouts[1], shots[2].callouts[1], shots[3].callouts[2], shots[4].callouts[2]]
// where the finger presses, as a fraction of the screen
const taps: Record<number, { x: number; y: number; at: number }> = {
  1: { x: 0.5, y: 0.86, at: 1800 },
  3: { x: 0.12, y: 0.5, at: 900 },
}

const LAT = '5.58758'
const LNG = '-0.15620'

const pct = (x: number, y: number): CSSProperties => ({ left: `${x * 100}%`, top: `${y * 100}%` })

function Scene({ f }: { f: SimFrame }) {
  const shot = shots[f.step]
  const note = notes[f.step]
  const tap = taps[f.step]
  const tapping = tap && f.t > tap.at && f.t < tap.at + 600

  const zoneOn = f.step === 1 ? f.t > 2200 : f.step >= 2
  const sos = f.step === 3 && f.t > 1700
  // keep labels off the screen's own buttons
  const notePos = f.step === 3 ? { x: 0.14, y: 0.66 } : f.step === 2 ? { x: 0.5, y: 0.74 } : note

  return (
    <div className={styles.watchStage} data-compact={f.compact || undefined}>
      <div className={styles.watchSlot}>
        <WatchFrame>
          <img key={f.step} src={shot.image} alt={shot.alt} className={styles.watchShot} />
          {tapping && <span className={styles.tap} style={pct(tap.x, tap.y)} />}
          <Hotspot x={notePos.x} y={notePos.y} label={note.title} align={notePos.x < 0.3 ? 'right' : 'center'} shown={f.p(500, 300)}>
            {note.text}
          </Hotspot>
        </WatchFrame>
      </div>

      <div className={styles.command}>
        <div className={styles.commandHead}>
          Command centre
          <span>Sigtrack</span>
        </div>
        <div className={styles.commandMap}>
          <svg className={sim.canvas} viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <MiniMap W={300} H={200} />
          </svg>
          {zoneOn && <span className={styles.zone} style={{ opacity: f.step === 1 ? f.p(2200, 400) : 1 }} />}
          <span className={styles.wearer} data-sos={sos || undefined}>
            {sos && <i className={sim.pulse} />}
          </span>
          {zoneOn && <span className={styles.zoneLabel}>Patrol zone</span>}
        </div>
        <div className={styles.commandList}>
          <div className={styles.commandRow}>
            <span className={sim.dot} />
            Watch 1<em>Live</em>
          </div>
          {sos ? (
            <div className={sim.alert} style={{ opacity: f.p(1700, 300) }}>
              <strong>SOS · Watch 1</strong>
              <span>
                Lat {LAT} · Lng {LNG}
              </span>
            </div>
          ) : (
            <div className={sim.alert} data-kind="info">
              <strong>{zoneOn ? 'Geofence active' : 'Live tracking'}</strong>
              <span>
                Lat {LAT} · Lng {LNG}
              </span>
            </div>
          )}
        </div>
        {sos && (
          <Hotspot x={0.5} y={0.22} label="SOS received" title="Live SOS" shown={f.p(1900, 300)}>
            The command centre receives the SOS with the wearer’s position, live.
          </Hotspot>
        )}
      </div>
    </div>
  )
}

export default function WatchSim() {
  return (
    <SimStage
      label="Sigtrack Watch: locator, patrol zone, SOS to command and quick actions"
      steps={steps}
      ratio="1000 / 600"
      compactRatio="400 / 720"
      render={(f) => <Scene f={f} />}
    />
  )
}
