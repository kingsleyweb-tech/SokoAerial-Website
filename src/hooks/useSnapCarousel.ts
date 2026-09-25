import { useCallback, useRef, useState } from 'react'

/** Tracks the current card of a horizontal scroll-snap rail and scrolls to a card on demand. */
export function useSnapCarousel<T extends HTMLElement>(count: number) {
  const trackRef = useRef<T>(null)
  const [current, setCurrent] = useState(0)

  const onScroll = useCallback(() => {
    const track = trackRef.current
    const first = track?.firstElementChild as HTMLElement | null
    if (!track || !first) return
    const step = first.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0')
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2
    setCurrent(atEnd ? count - 1 : Math.round(track.scrollLeft / step))
  }, [count])

  const scrollTo = useCallback((i: number) => {
    const track = trackRef.current
    const card = track?.children[i] as HTMLElement | undefined
    if (!track || !card) return
    const offset = card.getBoundingClientRect().left - track.getBoundingClientRect().left
    const padding = parseFloat(getComputedStyle(track).paddingLeft) || 0
    track.scrollTo({ left: track.scrollLeft + offset - padding, behavior: 'smooth' })
  }, [])

  return { trackRef, current, onScroll, scrollTo }
}
