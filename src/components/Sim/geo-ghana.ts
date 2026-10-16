// Simplified vector map of Ghana for the system simulation. Shapes are hand-traced, generalised outlines
// (border, coast, Lake Volta, main rivers and trunk roads) at roughly 5–15 km accuracy — good enough to read as a
// map of Ghana, not for navigation. Coordinates are [longitude, latitude] in WGS84.

export type LonLat = readonly [number, number]

/** Equirectangular projection into map units: 100 units per degree. */
export const LON0 = -4.6
export const LAT0 = 11.8
export const UNITS_PER_DEG = 100
export const MAP_W = 700
export const MAP_H = 800

export const project = ([lon, lat]: LonLat): [number, number] => [(lon - LON0) * UNITS_PER_DEG, (LAT0 - lat) * UNITS_PER_DEG]
export const unproject = (x: number, y: number): LonLat => [x / UNITS_PER_DEG + LON0, LAT0 - y / UNITS_PER_DEG]

/** Gulf of Guinea coastline, west to east, running past both borders. */
export const coast: LonLat[] = [
  [-4.6, 5.2], [-4.0, 5.23], [-3.3, 5.12], [-3.1, 5.08], [-2.6, 4.98], [-2.3, 4.88], [-2.05, 4.75], [-1.75, 4.88],
  [-1.55, 5.02], [-1.25, 5.1], [-0.95, 5.25], [-0.6, 5.35], [-0.35, 5.48], [-0.15, 5.55], [0.05, 5.62], [0.35, 5.75],
  [0.65, 5.8], [0.85, 5.95], [1.05, 6.05], [1.19, 6.1], [1.6, 6.2], [2.0, 6.33], [2.4, 6.36],
]

/** Land border, from the coast at Aflao (Togo) round the north to the coast at the Côte d'Ivoire border. */
const landBorder: LonLat[] = [
  [1.19, 6.1], [1.05, 6.35], [0.73, 6.55], [0.55, 6.9], [0.62, 7.35], [0.52, 7.55], [0.6, 8.1], [0.38, 8.75],
  [0.45, 9.25], [0.3, 9.8], [0.37, 10.3], [0.03, 10.6], [-0.05, 11.0], [0.0, 11.1], [-0.4, 11.1], [-0.7, 10.95],
  [-1.1, 11.0], [-1.6, 11.02], [-2.2, 10.98], [-2.75, 10.95], [-2.85, 10.7], [-2.93, 10.3], [-2.75, 9.75],
  [-2.68, 9.35], [-2.5, 8.8], [-2.6, 8.2], [-2.95, 7.95], [-3.05, 7.3], [-3.25, 6.8], [-3.2, 6.3], [-2.98, 5.95],
  [-2.75, 5.7], [-3.1, 5.08],
]

const coastIn = coast.slice(coast.findIndex(([lon]) => lon === -3.1), coast.findIndex(([lon]) => lon === 1.19) + 1)
export const ghana: LonLat[] = [...coastIn, ...landBorder.slice(1)]
export const border: LonLat[] = landBorder

export const lakeVolta: LonLat[] = [
  [0.06, 6.3], [0.1, 6.55], [0.18, 6.9], [0.05, 7.3], [-0.05, 7.7], [0.0, 8.05], [-0.25, 8.55], [-0.55, 8.7],
  [-1.0, 8.85], [-1.2, 8.65], [-0.85, 8.45], [-0.5, 8.2], [-0.35, 7.8], [-0.5, 7.35], [-0.9, 7.0], [-1.05, 6.85],
  [-0.8, 6.75], [-0.35, 6.85], [-0.15, 6.6], [-0.05, 6.4],
]

export const rivers: LonLat[][] = [
  // White Volta
  [[-0.9, 10.95], [-0.95, 10.2], [-1.0, 9.6], [-1.1, 9.2], [-1.0, 8.85]],
  // Black Volta
  [[-2.85, 10.6], [-2.7, 9.9], [-2.6, 9.4], [-2.2, 8.75], [-1.6, 8.7], [-1.2, 8.65]],
  // Oti
  [[0.35, 10.2], [0.2, 9.2], [0.05, 8.3], [-0.1, 8.1]],
  // Lower Volta, dam to the sea at Ada
  [[0.06, 6.3], [0.2, 6.05], [0.45, 5.88], [0.62, 5.79]],
]

/** Trunk roads (N1, N6, N10, N2), simplified to their main towns. */
export const roads: LonLat[][] = [
  [[1.19, 6.1], [0.6, 5.85], [-0.01, 5.67], [-0.19, 5.6], [-0.62, 5.35], [-1.25, 5.11], [-1.76, 4.9]],
  [[-0.19, 5.6], [-0.35, 5.81], [-0.46, 6.27], [-1.21, 6.62], [-1.62, 6.69]],
  [[-1.62, 6.69], [-1.94, 7.59], [-1.73, 8.05], [-1.47, 8.8], [-0.85, 9.4], [-0.8, 10.35], [-0.85, 10.79]],
  [[-0.01, 5.67], [0.05, 6.3], [0.47, 6.6], [0.47, 7.15]],
  [[-1.62, 6.69], [-2.33, 7.34]],
  [[-0.85, 9.4], [-0.01, 9.44]],
  [[-0.85, 9.4], [-1.82, 9.08], [-2.5, 10.06]],
]

export interface City {
  name: string
  at: LonLat
  /** 1 = always labelled, 2 = only when zoomed in */
  rank: 1 | 2
  /** label to the left of the dot (keeps it clear of a marker drawn on the right) */
  left?: boolean
}

export const cities: City[] = [
  { name: 'Accra', at: [-0.19, 5.6], rank: 1, left: true },
  { name: 'Kumasi', at: [-1.62, 6.69], rank: 1 },
  { name: 'Tamale', at: [-0.85, 9.4], rank: 1 },
  { name: 'Takoradi', at: [-1.76, 4.9], rank: 1 },
  { name: 'Bolgatanga', at: [-0.85, 10.79], rank: 1 },
  { name: 'Wa', at: [-2.5, 10.06], rank: 1 },
  { name: 'Ho', at: [0.47, 6.6], rank: 1 },
  { name: 'Sunyani', at: [-2.33, 7.34], rank: 1 },
  { name: 'Cape Coast', at: [-1.25, 5.11], rank: 2 },
  { name: 'Tema', at: [-0.01, 5.67], rank: 2 },
  { name: 'Koforidua', at: [-0.26, 6.09], rank: 2 },
  { name: 'Akosombo', at: [0.05, 6.3], rank: 2 },
  { name: 'Techiman', at: [-1.94, 7.59], rank: 2 },
  { name: 'Yendi', at: [-0.01, 9.44], rank: 2 },
  { name: 'Hohoe', at: [0.47, 7.15], rank: 2 },
  { name: 'Nsawam', at: [-0.35, 5.81], rank: 2 },
]

export const regionLabels: { name: string; at: LonLat }[] = [
  { name: 'BURKINA FASO', at: [-1.6, 11.5] },
  { name: "CÔTE D'IVOIRE", at: [-4.0, 7.6] },
  { name: 'TOGO', at: [1.15, 8.2] },
  { name: 'GULF OF GUINEA', at: [-1.2, 4.3] },
  { name: 'Lake Volta', at: [-0.3, 7.6] },
]

export const toPath = (pts: readonly LonLat[], close = false) =>
  pts.map((p, i) => `${i ? 'L' : 'M'}${project(p).map((n) => n.toFixed(1)).join(' ')}`).join('') + (close ? 'Z' : '')

/** The sea: everything south of the coastline, carried well past both edges so a wide camera never runs out. */
export const seaPath = `${toPath([[-9, 5.25], ...coast, [7, 6.4]])}L1100 1300L-500 1300Z`
