'use client'

import { useRef } from 'react'
import { m, useInView, useReducedMotion } from 'framer-motion'

interface SectionFrameProps {
  eyebrow?: string | null
  title?: string | null
  subtitle?: string | null
  align?: 'left' | 'center'
  tone?: 'default' | 'elevated'
  children: React.ReactNode
}

export default function SectionFrame({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  tone = 'default',
  children,
}: SectionFrameProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const prefersReducedMotion = useReducedMotion()

  const headingAlignment = align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'
  const bgStyle =
    tone === 'elevated'
      ? { backgroundColor: 'var(--color-surface-elevated)' }
      : { backgroundColor: 'var(--background)' }

  return (
    <section ref={ref} className="relative py-20 sm:py-24 lg:py-28" style={bgStyle}>
      <div className="container">
        {(eyebrow || title || subtitle) && (
          <m.header
            className={`${headingAlignment} mb-10 sm:mb-12 lg:mb-14`}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={isInView || prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: 'easeOut' }}
          >
            {eyebrow ? (
              <p
                className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase mb-3 sm:mb-4"
                style={{ color: 'var(--accent)' }}
              >
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="text-[26px] sm:text-[32px] md:text-[38px] lg:text-[44px] font-semibold text-white leading-[1.15] tracking-tight">
                {title}
              </h2>
            ) : null}
            {subtitle ? (
              <p className="mt-4 sm:mt-5 text-base sm:text-lg leading-[1.6] text-white/60 max-w-2xl">
                {subtitle}
              </p>
            ) : null}
          </m.header>
        )}
        {children}
      </div>
    </section>
  )
}
