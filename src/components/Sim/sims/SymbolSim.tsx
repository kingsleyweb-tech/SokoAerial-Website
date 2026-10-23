import { useEffect, useRef, useState, type CSSProperties } from 'react'
import sim from '../../../styles/Sim.module.css'
import styles from '../../../styles/SimSymbols.module.css'
import { SymbolGlyph } from '../../SymbolDemo/SymbolGlyph'
import { formatCoord, map, reportTypes, symbolTabs, symbols, toLatLng } from '../../SymbolDemo/symbols'
import { Icon, type IconName } from '../draw'
import { lerp } from '../geom'
import { Hotspot } from '../Hotspot'
import { SimStage, type SimFrame, type SimStep } from '../SimStage'

const steps: SimStep[] = [
  { label: 'Choose a symbol', caption: 'Open Tactical Symbols and select a symbol from the Friend Air set.', duration: 4200 },
  { label: 'Choose a report', caption: 'Pick the report type: FOB Incident Report or Operations Report.', duration: 2600 },
  { label: 'Place it on the map', caption: 'Drag the symbol to the spot on the map.', duration: 3600 },
  { label: 'Fill in the report', caption: 'The position fills itself in from the map. Add a title and details.', duration: 5600 },
  { label: 'Save', caption: 'Save, and the symbol stays on the map. Select it to see the report and its WGS84 position.', duration: 5200 },
]

const SYMBOL = symbols.find((s) => s.glyph === 'MIL')!
const SYMBOL_INDEX = symbols.indexOf(SYMBOL)
const REPORT = reportTypes[0]
const TITLE = 'Vehicle checkpoint'
const DESCRIPTION = 'Two vehicles stopped at the junction. Team holding position.'

interface Layout {
  W: number
  H: number
  rail: number
  btn: { x: number; y: number; w: number; h: number }
  pk: { x: number; y: number; w: number; pad: number; tile: number; gap: number }
  form: { x: number; y: number; w: number }
  drop: { x: number; y: number }
}

const wide: Layout = {
  W: 1000,
  H: 600,
  rail: 52,
  btn: { x: 68, y: 44, w: 150, h: 32 },
  pk: { x: 250, y: 84, w: 500, pad: 20, tile: 52, gap: 8 },
  form: { x: 330, y: 50, w: 340 },
  drop: { x: 640, y: 372 },
}

const narrow: Layout = {
  W: 400,
  H: 620,
  rail: 0,
  btn: { x: 12, y: 42, w: 150, h: 32 },
  pk: { x: 12, y: 84, w: 376, pad: 14, tile: 38, gap: 5.6 },
  form: { x: 12, y: 60, w: 376 },
  drop: { x: 250, y: 430 },
}

const BAR = 30

function geometry(L: Layout) {
  const { pk, form } = L
  const headH = 44
  const tabsY = pk.y + headH + 8
  const searchY = tabsY + 34
  const reportY = searchY + 42
  const gridY = reportY + 44
  const hintY = gridY + 2 * pk.tile + pk.gap + 10
  const reportW = (pk.w - 2 * pk.pad - 8) / 2
  const tile = (i: number) => ({
    x: pk.x + pk.pad + (i % 8) * (pk.tile + pk.gap) + pk.tile / 2,
    y: gridY + Math.floor(i / 8) * (pk.tile + pk.gap) + pk.tile / 2,
  })
  const fy = form.y + 44 + 12
  return {
    headH,
    tabsY,
    searchY,
    reportY,
    gridY,
    hintY,
    reportW,
    pickerH: hintY + 26 - pk.y,
    tile,
    btnCenter: { x: L.btn.x + L.btn.w / 2, y: L.btn.y + L.btn.h / 2 },
    report: { x: pk.x + pk.pad + reportW / 2, y: reportY + 17 },
    f: {
      title: fy,
      pair: fy + 56,
      desc: fy + 112,
      symbol: fy + 192,
      teams: fy + 250,
      actions: fy + 308,
      h: fy + 354 - form.y,
    },
    titleInput: { x: form.x + form.w / 2, y: fy + 30 },
    descInput: { x: form.x + form.w / 2, y: fy + 138 },
    save: { x: form.x + form.w - 16 - 40, y: fy + 325 },
  }
}

function cover(L: Layout) {
  const mapW = L.W - L.rail
  const mapH = L.H - BAR
  const s = Math.max(mapW / map.width, mapH / map.height)
  return { w: map.width * s, h: map.height * s, x: (mapW - map.width * s) / 2, y: (mapH - map.height * s) / 2 }
}

function dropOnMap(L: Layout) {
  const c = cover(L)
  return toLatLng((L.drop.x - L.rail - c.x) / c.w, (L.drop.y - BAR - c.y) / c.h)
}

interface Waypoint {
  t: number
  x: number
  y: number
  click?: boolean
}

const ease = (v: number) => (v < 0.5 ? 2 * v * v : 1 - Math.pow(-2 * v + 2, 2) / 2)

function cursorAt(path: Waypoint[], t: number) {
  let i = 0
  while (i < path.length - 1 && t >= path[i + 1].t) i++
  const a = path[i]
  const b = path[Math.min(i + 1, path.length - 1)]
  const k = b.t === a.t ? 1 : ease(Math.min(1, Math.max(0, (t - a.t) / (b.t - a.t))))
  const pressed = path.some((w) => w.click && t >= w.t && t < w.t + 220)
  return { x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k), pressed }
}

const typed = (text: string, f: SimFrame, start: number, len: number) => text.slice(0, Math.round(text.length * f.p(start, len)))

function useScale(designW: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [k, setK] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setK(el.clientWidth / designW)
    update()
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [designW])
  return { ref, k }
}

function Glyph({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <Icon name={name} x={12} y={12} />
    </svg>
  )
}

function Scene({ f }: { f: SimFrame }) {
  const L = f.compact ? narrow : wide
  const G = geometry(L)
  const { ref, k } = useScale(L.W)
  const { step, t } = f
  const tileC = G.tile(SYMBOL_INDEX)
  const home = { x: L.W * 0.6, y: L.H * 0.55 }

  const paths: Waypoint[][] = [
    [
      { t: 0, ...home },
      { t: 900, ...G.btnCenter },
      { t: 1000, ...G.btnCenter, click: true },
      { t: 1500, ...G.btnCenter },
      { t: 2400, ...tileC },
      { t: 2500, ...tileC, click: true },
    ],
    [
      { t: 0, ...tileC },
      { t: 1000, ...G.report },
      { t: 1100, ...G.report, click: true },
    ],
    [
      { t: 0, ...G.report },
      { t: 1800, ...L.drop },
      { t: 1900, ...L.drop, click: true },
    ],
    [
      { t: 0, ...L.drop },
      { t: 600, ...G.titleInput },
      { t: 700, ...G.titleInput, click: true },
      { t: 2300, ...G.titleInput },
      { t: 2700, ...G.descInput },
      { t: 2800, ...G.descInput, click: true },
    ],
    [
      { t: 0, ...G.descInput },
      { t: 900, ...G.save },
      { t: 1000, ...G.save, click: true },
      { t: 1700, ...G.save },
      { t: 2600, x: L.drop.x, y: L.drop.y },
      { t: 2700, x: L.drop.x, y: L.drop.y, click: true },
    ],
  ]
  const cur = cursorAt(paths[step], t)

  const pickerOpen = (step === 0 && t > 1100) || (step === 1 && t < 1300)
  const selected = (step === 0 && t > 2500) || step === 1
  const ghost = (step === 1 && t > 1300) || (step === 2 && t < 1900)
  const loading = step === 2 && t >= 1900
  const formOpen = step === 3 || (step === 4 && t < 1150)
  const placed = step === 4 && t >= 1150
  const card = step === 4 && t > 2700
  const title = step === 3 ? typed(TITLE, f, 800, 1300) : step === 4 ? TITLE : ''
  const description = step === 3 ? typed(DESCRIPTION, f, 2900, 1900) : step === 4 ? DESCRIPTION : ''
  const focus = step === 3 ? (t > 2800 ? 'desc' : t > 700 ? 'title' : '') : ''
  const pos = dropOnMap(L)
  const still = cover(L)
  const coords = `${formatCoord(pos.lat)}, ${formatCoord(pos.lng)}`

  const px = (x: number, y: number): CSSProperties => ({ left: x, top: y })

  return (
    <div ref={ref} className={styles.fit}>
      <div className={styles.app} style={{ width: L.W, height: L.H, transform: `scale(${k})`, visibility: k ? 'visible' : 'hidden' }}>
        <div className={styles.bar}>
          <i />
          <i />
          <i />
          <span>Sigtrack Web</span>
        </div>
        {L.rail > 0 && (
          <div className={styles.rail} style={{ width: L.rail }}>
            {(['map', 'people', 'pin', 'chat', 'video', 'file'] as const).map((n, i) => (
              <span key={n} data-on={(i === 2 && (pickerOpen || ghost || formOpen)) || undefined}>
                <Glyph name={n} />
              </span>
            ))}
          </div>
        )}
        <div className={styles.map} style={{ left: L.rail, top: BAR }}>
          <img src={map.src} alt="" draggable={false} style={{ left: still.x, top: still.y, width: still.w, height: still.h }} />
          <span className={styles.attribution}>{map.attribution}</span>
        </div>

        <span className={styles.symbolsBtn} data-active={cur.pressed && step === 0 && t < 1200 ? true : undefined} style={{ ...px(L.btn.x, L.btn.y), width: L.btn.w, height: L.btn.h }}>
          Tactical Symbols
        </span>

        {(loading || placed) && (
          <span className={styles.pin} data-pending={loading || undefined} style={px(L.drop.x, L.drop.y)}>
            <SymbolGlyph symbol={SYMBOL} />
          </span>
        )}
        {loading && (
          <span className={styles.loading} style={px(L.drop.x, L.drop.y + 34)}>
            <i className={styles.spinner} />
            Loading…
          </span>
        )}
        {card && (
          <div className={styles.card} style={{ ...px(L.drop.x, L.drop.y), opacity: f.p(2750, 250) }} data-left={f.compact || undefined}>
            <div className={styles.cardHead}>
              <strong>{TITLE}</strong>
              <span>×</span>
            </div>
            <span className={styles.cardMeta}>{REPORT}</span>
            <span className={styles.cardCoords}>WGS84 {coords}</span>
            <p>{DESCRIPTION}</p>
            <div className={styles.cardActions}>
              <b>Edit</b>
              <b data-danger>Delete</b>
            </div>
          </div>
        )}
        {placed && !card && (
          <span className={styles.toast} style={{ opacity: f.p(1150, 250) }}>
            Report saved
          </span>
        )}

        {pickerOpen && (
          <>
            <span className={styles.backdrop} />
            <div className={styles.dialog} style={{ ...px(L.pk.x, L.pk.y), width: L.pk.w, height: G.pickerH }}>
              <div className={styles.dialogHead} style={{ height: G.headH, padding: `0 ${L.pk.pad}px` }}>
                <strong>Tactical Symbols</strong>
                <span>×</span>
              </div>
              <div className={styles.tabs} style={{ ...px(L.pk.pad, G.tabsY - L.pk.y), right: L.pk.pad }}>
                {symbolTabs.map((s, i) => (
                  <span key={s} data-on={i === 0 || undefined}>
                    {s}
                  </span>
                ))}
              </div>
              <span className={styles.search} style={{ ...px(L.pk.pad, G.searchY - L.pk.y), right: L.pk.pad }}>
                Search symbols by name
              </span>
              {selected && (
                <div className={styles.reports} style={{ ...px(L.pk.pad, G.reportY - L.pk.y), right: L.pk.pad }}>
                  {reportTypes.map((r, i) => (
                    <span key={r} data-primary={i === 0 || undefined} data-active={(step === 1 && cur.pressed && i === 0) || undefined}>
                      {r}
                    </span>
                  ))}
                </div>
              )}
              {symbols.map((s, i) => {
                const c = G.tile(i)
                return (
                  <span
                    key={s.id}
                    className={styles.tile}
                    data-on={(selected && i === SYMBOL_INDEX) || undefined}
                    style={{ left: c.x - L.pk.x - L.pk.tile / 2, top: c.y - L.pk.y - L.pk.tile / 2, width: L.pk.tile, height: L.pk.tile }}
                  >
                    <SymbolGlyph symbol={s} />
                  </span>
                )
              })}
              <span className={styles.hint} style={px(L.pk.pad, G.hintY - L.pk.y)}>
                {selected ? `${SYMBOL.name} selected. Choose a report type.` : 'Select a symbol.'}
              </span>
            </div>
          </>
        )}

        {formOpen && (
          <>
            <span className={styles.backdrop} />
            <div className={styles.dialog} style={{ ...px(L.form.x, L.form.y), width: L.form.w, height: G.f.h }}>
              <div className={styles.dialogHead} style={{ height: 44, padding: '0 16px' }}>
                <strong>{REPORT}</strong>
                <span>×</span>
              </div>
              <div className={styles.field} style={{ top: G.f.title - L.form.y }}>
                <label>Title</label>
                <span className={styles.input} data-focus={focus === 'title' || undefined} data-empty={!title || undefined}>
                  {title || 'Enter a title'}
                  {focus === 'title' && <i className={`${styles.caret} ${sim.blink}`} />}
                </span>
              </div>
              <div className={styles.pair} style={{ top: G.f.pair - L.form.y }}>
                <div>
                  <label>Latitude</label>
                  <span className={styles.input} data-readonly>
                    {formatCoord(pos.lat)}
                  </span>
                </div>
                <div>
                  <label>Longitude</label>
                  <span className={styles.input} data-readonly>
                    {formatCoord(pos.lng)}
                  </span>
                </div>
              </div>
              <div className={styles.field} style={{ top: G.f.desc - L.form.y }}>
                <label>Description</label>
                <span className={`${styles.input} ${styles.textarea}`} data-focus={focus === 'desc' || undefined} data-empty={!description || undefined}>
                  {description || 'Additional details'}
                  {focus === 'desc' && <i className={`${styles.caret} ${sim.blink}`} />}
                </span>
              </div>
              <div className={styles.field} style={{ top: G.f.symbol - L.form.y }}>
                <label>Symbol</label>
                <span className={styles.symbolRow}>
                  <SymbolGlyph symbol={SYMBOL} />
                  {SYMBOL.name}
                </span>
              </div>
              <div className={styles.field} style={{ top: G.f.teams - L.form.y }}>
                <label>Teams</label>
                <span className={`${styles.input} ${styles.select}`}>All teams</span>
              </div>
              <div className={styles.actions} style={{ top: G.f.actions - L.form.y }}>
                <span>Cancel</span>
                <span data-primary data-active={(step === 4 && cur.pressed) || undefined}>
                  Save
                </span>
              </div>
            </div>
          </>
        )}

        {ghost && (
          <span className={styles.ghost} style={px(cur.x, cur.y)}>
            <SymbolGlyph symbol={SYMBOL} />
          </span>
        )}
        <span className={styles.cursor} data-pressed={cur.pressed || undefined} style={px(cur.x, cur.y)} aria-hidden="true">
          <svg viewBox="0 0 20 24">
            <path d="M2 2v18l5-5 3.5 7 3-1.5L10 13.5h7z" />
          </svg>
        </span>
      </div>

      {step === 0 && (
        <Hotspot x={(L.pk.x + L.pk.w - 70) / L.W} y={(L.pk.y + 22) / L.H} label="Symbol sets" title="Tactical Symbols" shown={f.p(1300, 300)}>
          Symbols come in sets such as Friend Air, Friend Land and Hostile Air. This replay uses the Friend Air set from the recording.
        </Hotspot>
      )}
      {step === 1 && (
        <Hotspot x={(L.pk.x + L.pk.w - 70) / L.W} y={(L.pk.y + 22) / L.H} label="Report types" title="Two report types" shown={f.p(200, 300)}>
          Each symbol is filed as a FOB Incident Report or an Operations Report.
        </Hotspot>
      )}
      {step === 3 && (
        <Hotspot x={(L.form.x + L.form.w - 60) / L.W} y={(G.f.pair - 10) / L.H} label="From the map" title="Position from the map" shown={f.p(300, 300)}>
          Latitude and longitude are read from where the symbol was dropped.
        </Hotspot>
      )}
      {card && (
        <Hotspot x={f.compact ? 0.72 : 0.5} y={0.1} label="Shared on the map" title="The report stays on the map" shown={f.p(3000, 300)}>
          The symbol stays where it was placed. Selecting it shows the report, its WGS84 position and the edit and delete actions.
        </Hotspot>
      )}
    </div>
  )
}

export default function SymbolSim() {
  return (
    <SimStage
      label="Sigtrack Web tactical symbols: choose a symbol, choose a report, place it, fill it in and save"
      steps={steps}
      tone="light"
      ratio="1000 / 600"
      compactRatio="400 / 620"
      render={(f) => <Scene f={f} />}
    />
  )
}
