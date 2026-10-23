import type { ReactNode } from 'react'
import styles from '../../styles/Sim.module.css'
import { InfoPopover, type PopoverSide } from '../Popover/InfoPopover'

interface HotspotProps {
  x: number
  y: number
  label: string
  title?: string
  children: ReactNode
  placement?: PopoverSide
  align?: 'left' | 'right' | 'center'
  shown?: number
}

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

export function Tip({ label, title, children, placement = 'top' }: { label: string; title?: string; children: ReactNode; placement?: PopoverSide }) {
  return (
    <span className={styles.tip}>
      <InfoPopover title={title ?? label} trigger={label} triggerClassName={styles.hotspotBtn} placement={placement}>
        {children}
      </InfoPopover>
    </span>
  )
}
