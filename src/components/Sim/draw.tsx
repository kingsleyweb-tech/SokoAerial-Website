import { along, type Pt } from './geom'

export function Packets({
  pts,
  t,
  period = 1600,
  count = 2,
  r = 4,
  color = '#cfe0ff',
  reverse = false,
}: {
  pts: readonly Pt[]
  t: number
  period?: number
  count?: number
  r?: number
  color?: string
  reverse?: boolean
}) {
  return (
    <g>
      {Array.from({ length: count }, (_, i) => {
        let f = ((t / period + i / count) % 1 + 1) % 1
        if (reverse) f = 1 - f
        const [x, y] = along(pts, f)
        const o = Math.min(1, f * 6, (1 - f) * 6)
        return <circle key={i} cx={x} cy={y} r={r} fill={color} opacity={o} />
      })}
    </g>
  )
}

const iconPaths: Record<string, string> = {
  watch: 'M8 3h8l1 4v10l-1 4H8l-1-4V7zM7 7h10v10H7zM12 10v2.5l1.5 1',
  phone: 'M8 2.5h8a1.5 1.5 0 0 1 1.5 1.5v16a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 20V4A1.5 1.5 0 0 1 8 2.5zM11 18.5h2',
  camera: 'M4 7h4l1.5-2h5L16 7h4v12H4zM12 10a3 3 0 1 0 0 6a3 3 0 0 0 0-6z',
  drone:
    'M9 11h6v3H9zM9 12.5H5M15 12.5h4M5 12.5V9M19 12.5V9M2.5 9h5M16.5 9h5M12 14v2.5M10 16.5h4',
  station: 'M3 18h11v-6H3zM14 14h4l3 3v1h-7M6.5 20a1.5 1.5 0 1 0 0-.01M17.5 20a1.5 1.5 0 1 0 0-.01M8 12V6M5 6h6',
  cloud: 'M7 18a4 4 0 0 1-.5-8A5.5 5.5 0 0 1 17 8.5a4.5 4.5 0 0 1 .5 9.5z',
  monitor: 'M3 4.5h18v12H3zM9 20.5h6M12 16.5v4',
  laptop: 'M5 5.5h14v10H5zM2.5 18.5h19',
  ai: 'M7 7h10v10H7zM10 10h4v4h-4zM10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4',
  truck: 'M2.5 7h11v9h-11zM13.5 10h4l3 3v3h-7M6 18.5a1.5 1.5 0 1 0 0-.01M17 18.5a1.5 1.5 0 1 0 0-.01',
  tower: 'M12 6v15M8 21l4-15 4 15M9 15h6M7.5 4.5a6 6 0 0 1 9 0M5 2a9.5 9.5 0 0 1 14 0',
  satellite: 'M9 9l6 6M10.5 7.5l6 6l-3 3l-6-6zM6 12l-3 3 3 3 3-3M12 6l3-3 3 3-3 3M18 15a3 3 0 0 1-3 3M21 15a6 6 0 0 1-6 6',
  radio: 'M7 8h10v13H7zM9 8V3M10 12h4M10 15h4M10 18h1',
  wifi: 'M3 9a13 13 0 0 1 18 0M6 12.5a8.5 8.5 0 0 1 12 0M9 16a4 4 0 0 1 6 0M12 19.5h.01',
  map: 'M3 6l6-2.5 6 2.5 6-2.5v14l-6 2.5-6-2.5-6 2.5zM9 3.5v14M15 6v14',
  sos: 'M12 3l9 16H3zM12 9.5v4.5M12 16.5h.01',
  lock: 'M6.5 11h11v9h-11zM8.5 11V8a3.5 3.5 0 0 1 7 0v3',
  file: 'M6 3h8l4 4v14H6zM14 3v4h4',
  video: 'M3 7h12v10H3zM15 10.5l6-3.5v10l-6-3.5',
  chat: 'M4 5h16v11H9l-5 4z',
  pin: 'M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11zM12 7.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5z',
  people: 'M9 11a3 3 0 1 0 0-6a3 3 0 0 0 0 6zM3.5 19a5.5 5.5 0 0 1 11 0M16 11a2.5 2.5 0 1 0 0-5M17 14a4.5 4.5 0 0 1 4 5',
}

export type IconName = keyof typeof iconPaths

export function Icon({ name, x, y, size = 24, color = 'currentColor', width = 1.6 }: {
  name: IconName
  x: number
  y: number
  size?: number
  color?: string
  width?: number
}) {
  const s = size / 24
  return (
    <path
      d={iconPaths[name]}
      transform={`translate(${x - size / 2} ${y - size / 2}) scale(${s})`}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
    />
  )
}

const mapTones = {
  light: { ground: '#eef1ea', park: '#d7e8cf', water: '#b9d7ef', road: '#ffffff', edge: '#d3d8cf', block: '#e2e4dd' },
  dark: { ground: '#101c2e', park: '#13283a', water: '#0b3354', road: '#26354d', edge: '#1a2a40', block: '#16243a' },
  sat: { ground: '#4d5a3c', park: '#3c4d2e', water: '#2d4d5c', road: '#a9a28f', edge: '#5d6649', block: '#7b7563' },
}

export function MiniMap({ W, H, tone = 'light' }: { W: number; H: number; tone?: keyof typeof mapTones }) {
  const c = mapTones[tone]
  const k = Math.max(W / 400, H / 300)
  return (
    <g transform={`translate(${(W - 400 * k) / 2} ${(H - 300 * k) / 2}) scale(${k})`}>
      <rect width={400} height={300} fill={c.ground} />
      <path d="M0 210 C70 190 110 240 180 225 S300 170 400 190 V300 H0Z" fill={c.park} opacity={0.7} />
      <path d="M250 0 C230 60 280 100 260 150 S200 230 230 300" fill="none" stroke={c.water} strokeWidth={14} />
      {[
        [40, 40, 60, 40],
        [120, 30, 70, 50],
        [40, 110, 50, 60],
        [300, 40, 70, 50],
        [310, 120, 60, 40],
        [110, 120, 60, 40],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill={c.block} />
      ))}
      {['M0 95 H400', 'M0 180 C120 170 200 190 400 160', 'M100 0 V300', 'M290 0 C285 100 300 200 290 300', 'M20 300 L200 0'].map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke={c.edge} strokeWidth={i < 2 ? 9 : 7} />
          <path d={d} fill="none" stroke={c.road} strokeWidth={i < 2 ? 6 : 4} />
        </g>
      ))}
    </g>
  )
}
