'use client'

import { useRef } from 'react'
import { m, useInView, useReducedMotion } from 'framer-motion'
import { site, hasItems } from '@/content/site'

export default function MetricsBanner() {
  const section = site.home.metrics
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' })
  const prefersReducedMotion = useReducedMotion()

  if (!section || !hasItems(section.items)) return null

  return (
    <section
      ref={sectionRef}
      className="relative py-14 sm:py-16 lg:py-20 border-y"
      style={{
        backgroundColor: 'var(--background)',
        borderColor: 'var(--border-dark)',
        backgroundImage:
          'linear-gradient(90deg, transparent 0%, var(--accent-soft) 50%, transparent 100%)',
      }}
    >
      <div className="container">
        {section.title || section.eyebrow ? (
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            {section.eyebrow ? (
              <p
                className="text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3"
                style={{ color: 'var(--accent)' }}
              >
                {section.eyebrow}
              </p>
            ) : null}
            {section.title ? (
              <h2 className="text-[26px] sm:text-[32px] md:text-[40px] font-semibold text-white leading-[1.15] tracking-tight">
                {section.title}
              </h2>
            ) : null}
          </div>
        ) : null}

        <m.div
          className={`grid gap-x-6 gap-y-10 sm:gap-x-8 ${
            section.items.length >= 5
              ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
              : section.items.length === 4
                ? 'grid-cols-2 lg:grid-cols-4'
                : section.items.length === 3
                  ? 'grid-cols-1 sm:grid-cols-3'
                  : 'grid-cols-1 sm:grid-cols-2'
          }`}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={isInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: 'easeOut' }}
        >
          {section.items.map((item, index) => (
            <div key={`${item.label}-${index}`} className="text-center sm:text-left">
              <p
                className="mono text-[36px] sm:text-[44px] lg:text-[52px] font-semibold leading-[1.05] tracking-tight mb-2"
                style={{ color: 'var(--accent)' }}
              >
                {item.value}
              </p>
              <p className="text-[13px] sm:text-sm font-medium text-white uppercase tracking-[0.15em]">{item.label}</p>
              {item.caption ? <p className="mt-1.5 text-[13px] text-white/50 leading-snug">{item.caption}</p> : null}
            </div>
          ))}
        </m.div>
      </div>
    </section>
  )
}
