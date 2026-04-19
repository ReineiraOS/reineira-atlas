'use client'

import { m, useReducedMotion, type Variants } from 'framer-motion'
import { MOTION, viewportOnce } from '@/lib/motion'

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span'

interface Props {
  text: string
  as?: Tag
  className?: string
  style?: React.CSSProperties
  delay?: number
}

export default function TextReveal({ text, as = 'h1', className, style, delay = 0.1 }: Props) {
  const prefersReducedMotion = useReducedMotion()
  const words = text.split(/\s+/).filter(Boolean)

  if (prefersReducedMotion) {
    const StaticTag: React.ElementType = as
    return (
      <StaticTag className={className} style={style}>
        {text}
      </StaticTag>
    )
  }

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.06, delayChildren: delay },
    },
  }

  const inner = (
    <>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'top',
            marginRight: '0.25em',
          }}
        >
          <m.span style={{ display: 'inline-block' }} variants={MOTION.textRevealWord}>
            {word}
          </m.span>
        </span>
      ))}
    </>
  )

  const common = {
    className,
    style,
    variants: container,
    initial: 'hidden' as const,
    whileInView: 'visible' as const,
    viewport: viewportOnce(),
  }

  if (as === 'h1') return <m.h1 {...common}>{inner}</m.h1>
  if (as === 'h2') return <m.h2 {...common}>{inner}</m.h2>
  if (as === 'h3') return <m.h3 {...common}>{inner}</m.h3>
  if (as === 'p') return <m.p {...common}>{inner}</m.p>
  return <m.span {...common}>{inner}</m.span>
}
