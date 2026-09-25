import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  id?: string
  delay?: number
  as?: 'div' | 'li' | 'section' | 'article'
}

/** Text reveal (Foundations v2): content rises 12px over 500ms, once. Reduced motion keeps opacity only. */
export function Reveal({ children, className, id, delay = 0, as = 'div' }: RevealProps) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      id={id}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </Component>
  )
}
