'use client'

import { m, useReducedMotion } from 'framer-motion'
import { viewportOnce } from '@/lib/motion'

interface Props {
  className?: string
  width?: string
  delay?: number
}

export default function RuleLine({ className = '', width = '64px', delay = 0.15 }: Props) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <m.span
      className={`rule-line ${className}`}
      style={{ width }}
      initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={viewportOnce()}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      aria-hidden="true"
    />
  )
}
