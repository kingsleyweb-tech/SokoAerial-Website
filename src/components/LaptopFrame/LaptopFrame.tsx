import type { ReactNode } from 'react'
import styles from '../../styles/LaptopFrame.module.css'
import { ExpandIcon } from '../Icons/Icons'

interface LaptopFrameProps {
  src: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
  /** Overlays drawn on the screen, e.g. HUD tags. */
  children?: ReactNode
  /** Makes the screen a button that opens the screenshot full size. */
  onOpen?: () => void
}

/**
 * A modern laptop: thin black bezel with a camera notch, aluminium base with a thumb groove.
 * Size comes from the element's width (set via className); every detail scales with it.
 */
export function LaptopFrame({ src, alt, className, loading, children, onOpen }: LaptopFrameProps) {
  return (
    <div className={[styles.laptop, className].filter(Boolean).join(' ')}>
      <div className={styles.lid}>
        <div className={styles.screen}>
          <img src={src} alt={alt} loading={loading} />
          <span className={styles.glare} aria-hidden="true" />
          {children}
          {onOpen && (
            <button type="button" className={styles.open} onClick={onOpen} aria-label={`View full size: ${alt}`}>
              <span className={styles.openBadge}>
                <ExpandIcon />
              </span>
            </button>
          )}
        </div>
        <span className={styles.notch} aria-hidden="true">
          <span />
        </span>
      </div>
      <div className={styles.base} aria-hidden="true">
        <span className={styles.groove} />
      </div>
    </div>
  )
}
