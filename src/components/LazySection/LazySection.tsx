import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react'

interface LazySectionProps {
  /** Usually a React.lazy component; it is only rendered (and so only downloaded) near the viewport. */
  children: ReactNode
  /** Reserved space while loading, so the page does not jump. */
  placeholder: ReactNode
  /** How far ahead of the viewport to start loading. */
  rootMargin?: string
}

/** Defers a heavy interactive section until it is about to scroll into view. */
export function LazySection({ children, placeholder, rootMargin = '600px 0px' }: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  // Without IntersectionObserver (very old browsers) load straight away.
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    if (visible || !ref.current) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin },
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [visible, rootMargin])

  if (!visible) return <div ref={ref}>{placeholder}</div>
  return <Suspense fallback={placeholder}>{children}</Suspense>
}
