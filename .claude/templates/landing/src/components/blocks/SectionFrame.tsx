'use client'

import { useRef } from 'react'
import { m, useInView, useReducedMotion } from 'framer-motion'
import SectionNumber from '@/components/ui/SectionNumber'
import RuleLine from '@/components/ui/RuleLine'
import { useSectionNumber } from '@/components/ui/SectionNumberContext'

interface SectionFrameProps {
  id?: string
  eyebrow?: string | null
  title?: string | null
  subtitle?: string | null
  align?: 'left' | 'center'
  tone?: 'default' | 'elevated'
  children: React.ReactNode
}

export default function SectionFrame({
  id,
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
  const sectionNumber = useSectionNumber()

  const headingAlignment = align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'
  const bgStyle =
    tone === 'elevated'
      ? { backgroundColor: 'var(--color-surface-elevated)' }
      : { backgroundColor: 'var(--background)' }

  return (
    <section
      ref={ref}
      id={id}
      className="relative scroll-mt-20"
      style={{ ...bgStyle, paddingTop: 'var(--section-padding)', paddingBottom: 'var(--section-padding)' }}
    >
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
                className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase mb-3 sm:mb-4 flex items-center gap-0"
                style={{ color: 'var(--accent)' }}
              >
                {sectionNumber !== null ? <SectionNumber index={sectionNumber} /> : null}
                <span>{eyebrow}</span>
              </p>
            ) : null}
            <RuleLine className="mb-5 sm:mb-6" />
            {title ? (
              <h2
                className="display-font text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] text-white leading-[1.1]"
                style={{
                  fontWeight: 'var(--display-weight)' as unknown as number,
                  letterSpacing: 'var(--letter-spacing-hero)',
                }}
              >
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
