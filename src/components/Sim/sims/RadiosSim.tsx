import type { CSSProperties } from 'react'
import { radioComparison } from '../../../data/content'
import sim from '../../../styles/Sim.module.css'
import styles from '../../../styles/SimProducts.module.css'
import { Icon, Packets, type IconName } from '../draw'
import { along, type Pt } from '../geom'
import { Hotspot } from '../Hotspot'
import { SimStage, type SimFrame, type SimStep } from '../SimStage'

const steps: SimStep[] = [
  { label: 'Silvus mesh', caption: 'Silvus devices form a mesh without a central node: if one drops out, the rest stay connected.', duration: 5000 },
  { label: 'Rich media', caption: 'High speed and high bandwidth carry images, PDFs, documents and video across the mesh.', duration: 4500 },
  { label: 'Meshtastic', caption: 'Meshtastic sends burst messages over long range, on low power. Open source and adaptable.', duration: 4500 },
  { label: 'Works with', caption: 'Silvus works with Sigtrack Mobile and Desktop; Meshtastic with Sigtrack Web, Mobile and Desktop.', duration: 4500 },
]

const silvus: Pt[] = [[110, 190], [250, 140], [390, 190], [140, 340], [340, 350], [250, 260]]
const silvusLinks = silvus.flatMap((a, i) =>
  silvus.slice(i + 1).flatMap((b, j) => (Math.hypot(a[0] - b[0], a[1] - b[1]) < 200 ? [[i, i + 1 + j] as const] : [])),
)
const DROP = 1
const mesht: Pt[] = [[70, 150], [430, 180], [130, 390], [440, 410]]
const meshtLinks = [[0, 1], [0, 2], [1, 3], [2, 3]] as const

const media: { name: IconName; tag: string; path: Pt[] }[] = [
  { name: 'camera', tag: 'Image', path: [silvus[0], silvus[5], silvus[4]] },
  { name: 'file', tag: 'PDF', path: [silvus[3], silvus[5], silvus[2]] },
  { name: 'video', tag: 'Video', path: [silvus[2], silvus[5], silvus[3]] },
]

const works = radioComparison.find((r) => r.key === 'Works with')!
const products = ['Web', 'Mobile', 'Desktop']

function Half({ f, kind, active }: { f: SimFrame; kind: 'silvus' | 'mesht'; active: boolean }) {
  const isS = kind === 'silvus'
  const nodes = isS ? silvus : mesht
  const links = isS ? silvusLinks : meshtLinks
  const dropped = isS && f.step === 0 && f.t > 2600
  const row = (key: string) => radioComparison.find((r) => r.key === key)!
  return (
    <g opacity={active ? 1 : 0.35} className={styles.radioHalf}>
      <text x={40} y={60} className={styles.radioName}>
        {isS ? 'Silvus' : 'Meshtastic'}
      </text>
      <text x={40} y={86} className={styles.radioMeta}>
        {isS ? `${row('Frequency').silvus} · ${row('Strength').silvus}` : `${row('Frequency').mesh} · ${row('Network').mesh}`}
      </text>
      {links.map(([a, b]) => {
        const off = dropped && (a === DROP || b === DROP)
        return (
          <line
            key={`${a}-${b}`}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
            className={isS ? styles.silvusLink : `${styles.meshtLink} ${active ? sim.flow : ''}`}
            opacity={off ? 0.12 : isS && f.step === 0 ? f.p(300, 800) : 1}
          />
        )
      })}
      {nodes.map(([x, y], i) => {
        const off = dropped && i === DROP
        return (
          <g key={i} transform={`translate(${x} ${y})`} opacity={off ? 0.35 : 1}>
            <circle r={22} className={styles.radioNode} data-kind={kind} data-off={off || undefined} />
            <Icon name="radio" x={0} y={0} size={22} color={off ? '#6b7890' : '#fff'} />
            {off && (
              <text y={42} className={styles.radioMeta} textAnchor="middle">
                offline
              </text>
            )}
          </g>
        )
      })}

      {isS && f.step === 0 && dropped && (
        <>
          <Packets pts={[silvus[0], silvus[5], silvus[4]]} t={f.t} period={1500} count={2} r={5} color="#7fb0ff" />
          <Packets pts={[silvus[3], silvus[5], silvus[2]]} t={f.t + 400} period={1500} count={2} r={5} color="#7fb0ff" />
        </>
      )}

      {isS &&
        f.step === 1 &&
        media.map((m, i) => {
          const k = ((f.t / 2200 + i / 3) % 1 + 1) % 1
          const [x, y] = along(m.path, k)
          const o = Math.min(1, k * 8, (1 - k) * 8)
          return (
            <g key={m.tag} transform={`translate(${x} ${y})`} opacity={o}>
              <rect x={-38} y={-13} width={76} height={26} className={styles.mediaChip} />
              <Icon name={m.name} x={-24} y={0} size={14} color="#0b1526" />
              <text x={-12} y={4} className={styles.mediaText}>
                {m.tag}
              </text>
            </g>
          )
        })}

      {!isS && f.step === 2 && (
        <>
          <Packets pts={[mesht[0], mesht[1], mesht[3]]} t={f.t} period={2200} count={1} r={6} color="#6ee7a8" />
          <Packets pts={[mesht[0], mesht[2], mesht[3]]} t={f.t + 1100} period={2200} count={1} r={6} color="#6ee7a8" />
        </>
      )}
    </g>
  )
}

function Scene({ f }: { f: SimFrame }) {
  const sActive = f.step < 2
  const showS = !f.compact || f.step < 2
  const showM = !f.compact || f.step >= 2
  const W = f.compact ? 500 : 1000

  return (
    <div className={styles.radiosStage}>
      <svg className={sim.canvas} viewBox={`0 0 ${W} 480`} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        {!f.compact && <line x1={500} y1={40} x2={500} y2={450} className={styles.radioDivider} />}
        {showS && <Half f={f} kind="silvus" active={sActive} />}
        {showM && (
          <g transform={f.compact ? undefined : 'translate(500 0)'}>
            <Half f={f} kind="mesht" active={f.step === 2} />
          </g>
        )}
      </svg>

      {f.step === 3 && (
        <div className={styles.worksWith}>
          <div />
          {products.map((p) => (
            <strong key={p}>Sigtrack {p}</strong>
          ))}
          {(['silvus', 'mesh'] as const).map((r, ri) => (
            <div key={r} className={styles.worksRow}>
              <span>{r === 'silvus' ? 'Silvus' : 'Meshtastic'}</span>
              {products.map((p, pi) => {
                const yes = works[r].includes(p)
                return (
                  <i key={p} data-yes={yes || undefined} style={{ opacity: f.p(300 + (ri * 3 + pi) * 180, 300) } as CSSProperties}>
                    {yes ? '✓' : '–'}
                  </i>
                )
              })}
            </div>
          ))}
        </div>
      )}

      {f.step === 0 && (
        <Hotspot x={f.compact ? 0.5 : 0.25} y={0.92} label="No central node" title="Mesh networking" shown={f.p(2700, 300)}>
          Silvus devices communicate without relying on a central node, so the network carries on when one drops out.
        </Hotspot>
      )}
      {f.step === 1 && (
        <Hotspot x={f.compact ? 0.5 : 0.25} y={0.92} label="Rich multimedia" title="High speed, high bandwidth">
          Images, PDFs, documents, messages and videos.
        </Hotspot>
      )}
      {f.step === 2 && (
        <Hotspot x={f.compact ? 0.5 : 0.75} y={0.92} label="Burst messages" title="Long range, low power">
          Dependable messaging for extended field operations. Meshtastic is open source and adaptable.
        </Hotspot>
      )}
    </div>
  )
}

export default function RadiosSim() {
  return (
    <SimStage
      label="Radios: Silvus mesh with rich media, Meshtastic long range burst messages, and the Sigtrack products each works with"
      steps={steps}
      ratio="1000 / 500"
      compactRatio="500 / 520"
      render={(f) => <Scene f={f} />}
    />
  )
}
