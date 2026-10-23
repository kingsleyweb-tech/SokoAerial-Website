import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import styles from '../../styles/Popover.module.css'

export type PopoverSide = 'top' | 'bottom' | 'left' | 'right'

interface InfoPopoverProps {
  title: string
  children: ReactNode
  trigger: ReactNode
  triggerLabel?: string
  triggerClassName?: string
  triggerAttrs?: Record<string, string | number | undefined>
  placement?: PopoverSide
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onActivate?: () => void
}

const CLOSE_DELAY = 280
const MARGIN = 8
const GAP = 10
const OPEN_EVENT = 'sigtrack:popover-open'

const opposite: Record<PopoverSide, PopoverSide> = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' }

function place(anchor: DOMRect, w: number, h: number, preferred: PopoverSide) {
  const vw = document.documentElement.clientWidth
  const vh = window.innerHeight
  const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), Math.max(min, max))
  const at = (side: PopoverSide) => {
    if (side === 'top' || side === 'bottom') {
      const left = clamp(anchor.left + anchor.width / 2 - w / 2, MARGIN, vw - w - MARGIN)
      const top = side === 'top' ? anchor.top - h - GAP : anchor.bottom + GAP
      return { side, left, top, fits: top >= MARGIN && top + h <= vh - MARGIN }
    }
    const top = clamp(anchor.top + anchor.height / 2 - h / 2, MARGIN, vh - h - MARGIN)
    const left = side === 'left' ? anchor.left - w - GAP : anchor.right + GAP
    return { side, left, top, fits: left >= MARGIN && left + w <= vw - MARGIN }
  }
  const order: PopoverSide[] = [preferred, opposite[preferred], 'bottom', 'top', 'right', 'left']
  for (const side of order) {
    const p = at(side)
    if (p.fits) return p
  }
  const p = at(preferred)
  return { ...p, left: clamp(p.left, MARGIN, vw - w - MARGIN), top: clamp(p.top, MARGIN, vh - h - MARGIN) }
}

const isFocusVisible = (el: Element) => {
  try {
    return el.matches(':focus-visible')
  } catch {
    return true
  }
}

export function InfoPopover({
  title,
  children,
  trigger,
  triggerLabel,
  triggerClassName,
  triggerAttrs,
  placement = 'top',
  open,
  onOpenChange,
  onActivate,
}: InfoPopoverProps) {
  const id = useId()
  const panelId = `${id}-panel`
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<number | undefined>(undefined)
  const [internalOpen, setInternalOpen] = useState(false)
  const [pinned, setPinned] = useState(false)
  const [pos, setPos] = useState<{ left: number; top: number; side: PopoverSide } | null>(null)
  const isOpen = open ?? internalOpen

  const setOpen = useCallback(
    (next: boolean) => {
      window.clearTimeout(closeTimer.current)
      if (!next) setPinned(false)
      if (next) window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: id }))
      if (open === undefined) setInternalOpen(next)
      onOpenChange?.(next)
    },
    [id, open, onOpenChange],
  )

  const scheduleClose = () => {
    if (pinned) return
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY)
  }
  const cancelClose = () => window.clearTimeout(closeTimer.current)

  useEffect(() => {
    const onOther = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== id && isOpen) setOpen(false)
    }
    window.addEventListener(OPEN_EVENT, onOther)
    return () => window.removeEventListener(OPEN_EVENT, onOther)
  }, [id, isOpen, setOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      const hadFocus = panelRef.current?.contains(document.activeElement)
      setOpen(false)
      if (hadFocus) triggerRef.current?.focus()
    }
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (!triggerRef.current?.contains(t) && !panelRef.current?.contains(t)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [isOpen, setOpen])

  const reposition = useCallback(() => {
    const t = triggerRef.current
    const p = panelRef.current
    if (!t || !p) return
    setPos(place(t.getBoundingClientRect(), p.offsetWidth, p.offsetHeight, placement))
  }, [placement])

  useLayoutEffect(() => {
    if (!isOpen) return
    reposition()
    window.addEventListener('resize', reposition)
    window.addEventListener('scroll', reposition, true)
    return () => {
      window.removeEventListener('resize', reposition)
      window.removeEventListener('scroll', reposition, true)
    }
  }, [isOpen, reposition])

  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onActivate) {
      onActivate()
      return
    }
    if (e.detail === 0) {
      setOpen(!isOpen)
      return
    }
    if (isOpen && pinned) {
      setOpen(false)
    } else {
      setOpen(true)
      setPinned(true)
    }
  }

  const shown = isOpen ? pos : null
  const style: CSSProperties = shown ? { left: shown.left, top: shown.top } : { left: 0, top: 0, visibility: 'hidden' }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={triggerClassName}
        aria-expanded={isOpen}
        aria-controls={isOpen ? panelId : undefined}
        aria-describedby={isOpen ? panelId : undefined}
        aria-label={triggerLabel}
        data-open={isOpen || undefined}
        {...triggerAttrs}
        onPointerEnter={(e) => {
          if (e.pointerType === 'mouse') {
            cancelClose()
            if (!isOpen) setOpen(true)
          }
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === 'mouse') scheduleClose()
        }}
        onFocus={(e) => {
          if (!isOpen && isFocusVisible(e.currentTarget)) setOpen(true)
        }}
        onBlur={(e) => {
          if (!pinned && !panelRef.current?.contains(e.relatedTarget as Node | null)) scheduleClose()
        }}
        onClick={onClick}
      >
        {trigger}
      </button>
      {isOpen &&
        createPortal(
          <div
            ref={panelRef}
            id={panelId}
            role="tooltip"
            className={styles.panel}
            data-side={shown?.side}
            style={style}
            onPointerEnter={cancelClose}
            onPointerLeave={(e) => {
              if (e.pointerType === 'mouse') scheduleClose()
            }}
          >
            <strong className={styles.title}>{title}</strong>
            <span className={styles.body}>{children}</span>
          </div>,
          document.body,
        )}
    </>
  )
}
