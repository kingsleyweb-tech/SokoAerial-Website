import { useCallback, useEffect, useRef, useState } from 'react'
import styles from '../../styles/PhoneFrame.module.css'
import { ExpandIcon } from '../Icons/Icons'

export interface PhoneScreen {
  src: string
}

interface PhoneFrameProps extends PhoneScreen {
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
  /** Makes the screen a button that opens the screenshot full size. */
  onOpen?: () => void
}

type Orientation = 'portrait' | 'landscape'

/**
 * A modern phone: titanium edge and side buttons around the screenshot. The screenshot is always shown whole —
 * the screen takes the image's own proportions, so a landscape capture gets a phone turned on its side.
 * Size comes from the width of the element (set `width` via className; pages may widen `[data-orientation='landscape']`).
 */
export function PhoneFrame({ src, alt, className, loading, onOpen }: PhoneFrameProps) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [orientation, setOrientation] = useState<Orientation | undefined>(undefined)

  const measure = useCallback(() => {
    const img = imgRef.current
    if (img?.naturalWidth) setOrientation(img.naturalWidth > img.naturalHeight ? 'landscape' : 'portrait')
  }, [])

  // a cached image can finish loading before React attaches onLoad
  useEffect(() => {
    if (imgRef.current?.complete) measure()
  }, [src, measure])

  return (
    <div className={[styles.phone, className].filter(Boolean).join(' ')} data-orientation={orientation}>
      <span className={styles.body}>
        <span className={`${styles.button} ${styles.action}`} aria-hidden="true" />
        <span className={`${styles.button} ${styles.volUp}`} aria-hidden="true" />
        <span className={`${styles.button} ${styles.volDown}`} aria-hidden="true" />
        <span className={`${styles.button} ${styles.power}`} aria-hidden="true" />
        <span className={styles.screen}>
          <img ref={imgRef} src={src} alt={alt} loading={loading} onLoad={measure} />
          {onOpen && (
            <button type="button" className={styles.open} onClick={onOpen} aria-label={`View full size${alt ? `: ${alt}` : ''}`}>
              <span className={styles.openBadge}>
                <ExpandIcon />
              </span>
            </button>
          )}
        </span>
      </span>
    </div>
  )
}
