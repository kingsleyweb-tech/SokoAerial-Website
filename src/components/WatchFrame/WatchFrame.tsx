import type { ReactNode } from 'react'
import styles from '../../styles/WatchFrame.module.css'

interface WatchFrameProps {
  /** Screen contents: the screenshot plus any overlays. Laid out in a square box. */
  children: ReactNode
  className?: string
}

/**
 * A rugged smartwatch drawn in SVG — modelled on the rectangular rugged watch in the Sigtrack field photo
 * (raised bezel, corner screws, side buttons, vented strap), without any third-party branding.
 * The screen is a square HTML box over the drawing, so screenshots and callout dots line up exactly.
 * Size comes from the element's width.
 */
export function WatchFrame({ children, className }: WatchFrameProps) {
  return (
    <div className={[styles.watch, className].filter(Boolean).join(' ')}>
      <svg className={styles.art} viewBox="0 0 520 700" aria-hidden="true">
        <defs>
          <linearGradient id="wf-case" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4a5160" />
            <stop offset="0.45" stopColor="#262b35" />
            <stop offset="1" stopColor="#14171d" />
          </linearGradient>
          <linearGradient id="wf-bezel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8b93a3" />
            <stop offset="0.5" stopColor="#3a404c" />
            <stop offset="1" stopColor="#6d7585" />
          </linearGradient>
          <linearGradient id="wf-strap" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#15181e" />
            <stop offset="0.5" stopColor="#242832" />
            <stop offset="1" stopColor="#15181e" />
          </linearGradient>
        </defs>

        {/* strap */}
        <g className={styles.strap}>
          <path d="M150 0 H370 L382 168 H138 Z" fill="url(#wf-strap)" />
          <path d="M138 532 H382 L370 700 H150 Z" fill="url(#wf-strap)" />
          {[34, 70, 106].map((y) => (
            <rect key={`t${y}`} x="236" y={y} width="48" height="16" rx="8" fill="#0b0d11" />
          ))}
          {[580, 616, 652].map((y) => (
            <rect key={`b${y}`} x="236" y={y} width="48" height="16" rx="8" fill="#0b0d11" />
          ))}
        </g>

        {/* side buttons */}
        <g fill="#2c313b" stroke="#545c6b" strokeWidth="2">
          <rect x="462" y="228" width="22" height="62" rx="6" />
          <rect x="462" y="330" width="22" height="92" rx="6" />
          <rect x="36" y="250" width="22" height="58" rx="6" />
          <rect x="36" y="350" width="22" height="58" rx="6" />
        </g>
        <g stroke="#6b7384" strokeWidth="2">
          {[346, 360, 374, 388, 402].map((y) => (
            <line key={y} x1="466" y1={y} x2="480" y2={y} />
          ))}
        </g>

        {/* case */}
        <rect x="54" y="140" width="412" height="420" rx="70" fill="url(#wf-case)" />
        <rect x="54" y="140" width="412" height="420" rx="70" fill="none" stroke="#5b6372" strokeWidth="2" />
        {/* raised bezel */}
        <rect x="80" y="166" width="360" height="368" rx="52" fill="url(#wf-bezel)" />
        <rect x="92" y="178" width="336" height="344" rx="42" fill="#07090c" />

        {/* corner screws */}
        <g>
          {[
            [92, 168],
            [428, 168],
            [92, 532],
            [428, 532],
          ].map(([cx, cy]) => (
            <g key={`${cx}-${cy}`}>
              <circle cx={cx} cy={cy} r="11" fill="#1a1d23" stroke="#7a8292" strokeWidth="2" />
              <path d={`M${cx - 5} ${cy}H${cx + 5}M${cx} ${cy - 5}V${cy + 5}`} stroke="#7a8292" strokeWidth="2" />
            </g>
          ))}
        </g>
      </svg>
      <div className={styles.screen}>{children}</div>
    </div>
  )
}
