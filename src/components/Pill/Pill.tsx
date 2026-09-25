import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styles from '../../styles/Pill.module.css'
import { ArrowDownIcon, ArrowUpRightIcon } from '../Icons/Icons'

/**
 * Pill control from Foundations v2: a rounded pill with a circle arrow.
 * dark = midnight + signal circle · signal = blue + white circle · light = white + signal circle
 * contrast = white + midnight circle · outline / outline-light = bordered, no circle.
 */
export type PillVariant = 'dark' | 'signal' | 'light' | 'contrast' | 'outline' | 'outline-light'

interface CommonProps {
  children: ReactNode
  variant?: PillVariant
  size?: 'sm' | 'md' | 'lg'
  icon?: 'up-right' | 'down' | 'none'
  block?: boolean
  className?: string
}

type PillProps = CommonProps &
  (
    | { to: string; href?: never; type?: never; onClick?: () => void; disabled?: never }
    | { href: string; to?: never; type?: never; onClick?: never; disabled?: never }
    | { to?: never; href?: never; type?: 'button' | 'submit'; onClick?: () => void; disabled?: boolean }
  )

export function Pill({ children, variant = 'dark', size = 'md', icon, block = false, className, ...rest }: PillProps) {
  const glyph = icon ?? (variant.startsWith('outline') ? 'none' : 'up-right')
  const classes = [styles.pill, styles[variant], styles[size], glyph === 'none' && styles.plain, block && styles.block, className]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      <span>{children}</span>
      {glyph !== 'none' && (
        <span className={styles.circle} data-glyph={glyph}>
          {glyph === 'down' ? <ArrowDownIcon /> : <ArrowUpRightIcon />}
        </span>
      )}
    </>
  )

  if (rest.to !== undefined) {
    return (
      <Link to={rest.to} className={classes} onClick={rest.onClick}>
        {content}
      </Link>
    )
  }
  if (rest.href !== undefined) {
    return (
      <a href={rest.href} className={classes}>
        {content}
      </a>
    )
  }
  return (
    <button type={rest.type ?? 'button'} className={classes} onClick={rest.onClick} disabled={rest.disabled}>
      {content}
    </button>
  )
}
