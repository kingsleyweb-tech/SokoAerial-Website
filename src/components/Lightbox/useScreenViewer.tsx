import { useMemo, useState } from 'react'
import { Lightbox, type LightboxItem } from './Lightbox'

/**
 * Full-screen viewer for the screenshots inside a page's phone and laptop mockups.
 * Shots are de-duplicated by src, so the same screenshot used twice on a page opens at one position.
 */
export function useScreenViewer(shots: LightboxItem[]) {
  const items = useMemo(() => shots.filter((s, i) => shots.findIndex((x) => x.src === s.src) === i), [shots])
  const [index, setIndex] = useState<number | null>(null)

  const open = (src: string) => setIndex(Math.max(0, items.findIndex((x) => x.src === src)))

  const viewer = (
    <Lightbox items={items} open={index !== null} index={index ?? 0} onChange={setIndex} onClose={() => setIndex(null)} />
  )

  return { open, viewer }
}
