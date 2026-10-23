
export type Pt = readonly [number, number]

export const lerp = (a: number, b: number, f: number) => a + (b - a) * f

export function along(pts: readonly Pt[], f: number): Pt {
  const segs = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]))
  const total = segs.reduce((a, b) => a + b, 0)
  let d = Math.min(1, Math.max(0, f)) * total
  for (let i = 0; i < segs.length; i++) {
    if (d <= segs[i] || i === segs.length - 1) {
      const k = segs[i] ? d / segs[i] : 0
      return [lerp(pts[i][0], pts[i + 1][0], k), lerp(pts[i][1], pts[i + 1][1], k)]
    }
    d -= segs[i]
  }
  return pts[pts.length - 1]
}

export const polyD = (pts: readonly Pt[]) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('')
