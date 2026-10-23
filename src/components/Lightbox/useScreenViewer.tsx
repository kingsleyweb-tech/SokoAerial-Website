import { useMemo, useState } from 'react'
import { Lightbox, type LightboxItem } from './Lightbox'

export function useScreenViewer(shots: LightboxItem[]) {
  const items = useMemo(() => shots.filter((s, i) => shots.findIndex((x) => x.src === s.src) === i), [shots])
  const [index, setIndex] = useState<number | null>(null)

  const open = (src: string) => setIndex(Math.max(0, items.findIndex((x) => x.src === src)))

  const viewer = (
    <Lightbox items={items} open={index !== null} index={index ?? 0} onChange={setIndex} onClose={() => setIndex(null)} />
  )

  return { open, viewer }
}
