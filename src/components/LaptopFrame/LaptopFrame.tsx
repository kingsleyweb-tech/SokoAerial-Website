import type { ReactNode } from 'react'
import styles from '../../styles/LaptopFrame.module.css'
import { ExpandIcon } from '../Icons/Icons'

interface LaptopFrameProps {
  src: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
  children?: ReactNode
  onOpen?: () => void
}

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
