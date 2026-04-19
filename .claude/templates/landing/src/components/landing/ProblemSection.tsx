'use client'

import { useRef } from 'react'
import { m, useInView, useReducedMotion } from 'framer-motion'
import { site } from '@/content/site'

export default function ProblemSection() {
  const section = site.home.problem
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' })
  const prefersReducedMotion = useReducedMotion()

  if (!section) return null

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-36"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--accent-border), transparent)' }}
        aria-hidden="true"
      />
      <div className="container">
        <m.div
          className="max-w-3xl mx-auto text-center"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={isInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: 'easeOut' }}
        >
          {section.eyebrow ? (
            <p
              className="text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-4 sm:mb-5"
              style={{ color: 'var(--accent)' }}
            >
              {section.eyebrow}
            </p>
          ) : null}
          <h2 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] font-semibold text-white leading-[1.15] tracking-tight mb-6 sm:mb-8">
            {section.title}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl leading-[1.7] text-white/65">{section.body}</p>
        </m.div>
      </div>
    </section>
  )
}
