import type { ReactNode } from 'react'
import styles from '../../styles/Sim.module.css'
import { InfoPopover, type PopoverSide } from '../Popover/InfoPopover'

interface HotspotProps {
  /** Position over the stage, as a fraction of its width and height. */
  x: number
  y: number
  /** The visible label on the stage. */
  label: string
  /** Panel heading; defaults to the label. */
  title?: string
  children: ReactNode
  placement?: PopoverSide
  /** Which way the label sits from its anchor point. */
  align?: 'left' | 'right' | 'center'
  /** Fades the label in as its element appears (0 → 1). */
  shown?: number
}

/**
 * A labelled point on a simulation. Hover or focus shows a short explanation, which closes when the pointer
 * leaves; a tap toggles it on touch screens (InfoPopover).
 */
export function Hotspot({ x, y, label, title, children, placement = 'top', align = 'center', shown = 1 }: HotspotProps) {
  if (shown <= 0.02) return null
  return (
    <span className={styles.hotspot} data-align={align} style={{ left: `${x * 100}%`, top: `${y * 100}%`, opacity: shown }}>
      <InfoPopover title={title ?? label} trigger={label} triggerClassName={styles.hotspotBtn} placement={placement}>
        {children}
      </InfoPopover>
    </span>
  )
}

/** The same explanation, as an inline label inside a drawn panel (no positioning). */
export function Tip({ label, title, children, placement = 'top' }: { label: string; title?: string; children: ReactNode; placement?: PopoverSide }) {
  return (
    <span className={styles.tip}>
      <InfoPopover title={title ?? label} trigger={label} triggerClassName={styles.hotspotBtn} placement={placement}>
        {children}
      </InfoPopover>
    </span>
  )
}
