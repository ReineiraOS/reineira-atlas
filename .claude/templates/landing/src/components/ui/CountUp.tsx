'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, animate, useReducedMotion } from 'framer-motion'

interface Parsed {
  prefix: string
  number: number
  decimals: number
  suffix: string
}

function parse(value: string): Parsed | null {
  const match = value.match(/^([^\d.-]*)(-?\d+(?:[.,]\d+)?)(.*)$/)
  if (!match) return null
  const rawNumber = match[2].replace(',', '.')
  const n = parseFloat(rawNumber)
  if (Number.isNaN(n)) return null
  const decimals = rawNumber.includes('.') ? rawNumber.split('.')[1].length : 0
  return {
    prefix: match[1],
    number: n,
    decimals,
    suffix: match[3],
  }
}

function format(n: number, decimals: number): string {
  if (decimals === 0) return Math.round(n).toLocaleString('en-US')
  return n.toFixed(decimals)
}

export default function CountUp({
  value,
  duration = 1.4,
  className,
  style,
}: {
  value: string
  duration?: number
  className?: string
  style?: React.CSSProperties
}) {
  const parsed = parse(value)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const prefersReducedMotion = useReducedMotion()
  const mv = useMotionValue(0)
  const [display, setDisplay] = useState(parsed ? '0' : value)

  useEffect(() => {
    if (!parsed) return
    if (prefersReducedMotion) {
      setDisplay(format(parsed.number, parsed.decimals))
      return
    }
    if (!inView) return
    const controls = animate(mv, parsed.number, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(format(v, parsed.decimals)),
    })
    return () => controls.stop()
  }, [inView, parsed, mv, duration, prefersReducedMotion])

  if (!parsed) {
    return (
      <span ref={ref} className={className} style={style}>
        {value}
      </span>
    )
  }

  return (
    <span ref={ref} className={className} style={style}>
      {parsed.prefix}
      {display}
      {parsed.suffix}
    </span>
  )
}
