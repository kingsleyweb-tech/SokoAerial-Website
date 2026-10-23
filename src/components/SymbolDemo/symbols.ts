import demoMap from '../../assets/images/demo-map-accra.webp'

export type ReportType = 'FOB Incident Report' | 'Operations Report'
export const reportTypes: ReportType[] = ['FOB Incident Report', 'Operations Report']

export const symbolTabs = ['Friend Air', 'Friend Equipment', 'Friend Land', 'Friend Subsurface', 'Hostile Air', 'Hostile Equipment']

export interface TacticalSymbol {
  id: string
  glyph: string
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

export const map = {
  src: demoMap,
  width: 1170,
  height: 752,
  attribution: 'Map data ©2026 Google',
}

const ANCHOR = { x: 507, y: 564, lat: 5.58831, lng: -0.184021 }
const PX_PER_DEG_LAT = 4334.5
const PX_PER_DEG_LNG = 4343

export function toLatLng(x: number, y: number) {
  return {
    lat: ANCHOR.lat - (y * map.height - ANCHOR.y) / PX_PER_DEG_LAT,
    lng: ANCHOR.lng + (x * map.width - ANCHOR.x) / PX_PER_DEG_LNG,
  }
}

export const formatCoord = (n: number) => n.toFixed(6)
