import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react'

interface LazySectionProps {
  children: ReactNode
  placeholder: ReactNode
  rootMargin?: string
}

export function LazySection({ children, placeholder, rootMargin = '600px 0px' }: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null)
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
