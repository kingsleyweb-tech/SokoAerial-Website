// Data for the tactical-symbol demo, taken from a screen recording of Sigtrack Web's "Tactical Symbols"
// workflow. Symbols are redrawn from the recording's Friend Air set and named only by the label they show.
import demoMap from '../../assets/images/demo-map-accra.jpg'

export type ReportType = 'FOB Incident Report' | 'Operations Report'
export const reportTypes: ReportType[] = ['FOB Incident Report', 'Operations Report']

/** Category tabs in the order shown in the recording. Only Friend Air is reproduced. */
export const symbolTabs = ['Friend Air', 'Friend Equipment', 'Friend Land', 'Friend Subsurface', 'Hostile Air', 'Hostile Equipment']

export interface TacticalSymbol {
  id: string
  /** Text drawn inside the frame (empty for the plain symbol). */
  glyph: string
  /** Civilian symbols are drawn in the recording's light purple instead of light blue. */
  civilian?: boolean
  name: string
}

const glyphs = ['', 'CIV', 'MIL', 'A', 'B', 'C', 'D', 'F', 'H', 'I', 'J', 'K', 'L', 'N', 'P', 'SOF']

export const symbols: TacticalSymbol[] = glyphs.map((glyph) => ({
  id: glyph ? glyph.toLowerCase() : 'plain',
  glyph,
  civilian: glyph === 'CIV',
  name: glyph ? `Friend Air · ${glyph}` : 'Friend Air',
}))

/** The demo map: a still of the map from the same recording (Accra), 1170 × 752 px. */
export const map = {
  src: demoMap,
  width: 1170,
  height: 752,
  attribution: 'Map data ©2026 Google',
}

// Pixel ↔ WGS84 for that still. Anchored on the point the recording reports (5.588310, -0.184021 at
// x 507, y 564) and scaled from its 5 km scale bar; good to roughly 100 m — a demo, not a survey.
const ANCHOR = { x: 507, y: 564, lat: 5.58831, lng: -0.184021 }
const PX_PER_DEG_LAT = 4334.5
const PX_PER_DEG_LNG = 4343

/** x/y are fractions (0–1) of the map, so placed symbols stay put at any screen size. */
export function toLatLng(x: number, y: number) {
  return {
    lat: ANCHOR.lat - (y * map.height - ANCHOR.y) / PX_PER_DEG_LAT,
    lng: ANCHOR.lng + (x * map.width - ANCHOR.x) / PX_PER_DEG_LNG,
  }
}

export const formatCoord = (n: number) => n.toFixed(6)
