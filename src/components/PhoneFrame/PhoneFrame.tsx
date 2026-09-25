import type { CSSProperties } from 'react'
import styles from '../../styles/PhoneFrame.module.css'

export interface PhoneScreen {
  src: string
  /** Horizontal focus point, 0–1 across the image: this spot is centred on the screen. */
  x?: number
  /** Vertical focus point, 0–1 down the image. */
  y?: number
  /** Image height relative to the screen (1 = fits the height); above 1 crops baked-in bezels and bars. */
  zoom?: number
}

interface PhoneFrameProps extends PhoneScreen {
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
}

/**
 * A modern phone: titanium edge, side buttons, dynamic island, status bar and home indicator.
 * Size comes from the width of the element (set `width` via className); everything scales with it.
 */
export function PhoneFrame({ src, alt, x = 0.5, y = 0.5, zoom = 1, className, loading }: PhoneFrameProps) {
  // The image keeps its own proportions; translate(%) is relative to the image, so the focus point lands mid-screen.
  const imageStyle = { height: `${zoom * 100}%`, transform: `translate(${-x * 100}%, ${-y * 100}%)` } as CSSProperties
  return (
    <div className={[styles.phone, className].filter(Boolean).join(' ')}>
      <span className={styles.body}>
        <span className={`${styles.button} ${styles.action}`} aria-hidden="true" />
        <span className={`${styles.button} ${styles.volUp}`} aria-hidden="true" />
        <span className={`${styles.button} ${styles.volDown}`} aria-hidden="true" />
        <span className={`${styles.button} ${styles.power}`} aria-hidden="true" />
        <span className={styles.screen}>
          <img src={src} alt={alt} loading={loading} style={imageStyle} />
          <span className={styles.shade} aria-hidden="true" />
          <span className={styles.status} aria-hidden="true">
            <span className={styles.time}>9:41</span>
            <span className={styles.icons}>
              <svg viewBox="0 0 18 12">
                <rect x="0" y="8" width="3" height="4" rx="1" />
                <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
                <rect x="10" y="3" width="3" height="9" rx="1" />
                <rect x="15" y="0" width="3" height="12" rx="1" />
              </svg>
              <svg viewBox="0 0 16 12">
                <path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.3-1.4A10.6 10.6 0 0 0 8 .3 10.6 10.6 0 0 0 .7 3.2L2 4.6a8.7 8.7 0 0 1 6-2.4Z" />
                <path d="M8 5.8c1.3 0 2.5.5 3.4 1.3l1.3-1.4A6.9 6.9 0 0 0 8 3.9a6.9 6.9 0 0 0-4.7 1.8l1.3 1.4A5 5 0 0 1 8 5.8Z" />
                <path d="M8 9.2 9.9 7.9a3.1 3.1 0 0 0-3.8 0Z" transform="translate(0 1.4)" />
              </svg>
              <svg viewBox="0 0 27 12">
                <rect x="0.5" y="0.5" width="23" height="11" rx="3.5" fill="none" stroke="currentColor" strokeOpacity="0.45" />
                <rect x="2" y="2" width="17" height="8" rx="2" />
                <path d="M25 4v4c.8-.3 1.5-1.1 1.5-2S25.8 4.3 25 4Z" fillOpacity="0.45" />
              </svg>
            </span>
          </span>
          <span className={styles.island} aria-hidden="true">
            <span className={styles.lens} />
          </span>
          <span className={styles.home} aria-hidden="true" />
          <span className={styles.glare} aria-hidden="true" />
        </span>
      </span>
    </div>
  )
}
