'use client'

import { useRef } from 'react'
import { m, useInView, useReducedMotion } from 'framer-motion'
import { site, hasItems } from '@/content/site'

export default function FiveYearArc() {
  const section = site.home.fiveYearArc
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })
  const prefersReducedMotion = useReducedMotion()

  if (!section || !hasItems(section.items)) return null

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-36 overflow-hidden"
      style={{ backgroundColor: 'var(--color-surface-elevated)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 10%, var(--accent-soft) 0%, transparent 55%)',
        }}
        aria-hidden="true"
      />
      <div className="container relative">
        <div className="max-w-2xl mb-12 sm:mb-16">
          {section.eyebrow ? (
            <p
              className="text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-3"
              style={{ color: 'var(--accent)' }}
            >
              {section.eyebrow}
            </p>
          ) : null}
          <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-semibold text-white leading-[1.15] tracking-tight mb-4">
            {section.title}
          </h2>
          {section.subtitle ? (
            <p className="text-base sm:text-lg leading-[1.6] text-white/60">{section.subtitle}</p>
          ) : null}
        </div>

        <m.ol
          className="relative space-y-8 sm:space-y-10 max-w-4xl"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={isInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: 'easeOut' }}
        >
          <div
            className="absolute left-[28px] top-3 bottom-3 w-px"
            style={{ backgroundColor: 'var(--accent-border)' }}
            aria-hidden="true"
          />
          {section.items.map((item, index) => (
            <li key={`${item.year}-${index}`} className="relative pl-20 sm:pl-24">
              <div
                className="absolute left-0 top-0 w-[56px] h-[56px] flex items-center justify-center rounded-2xl mono text-[15px] font-semibold"
                style={{
                  background: 'var(--accent-soft)',
                  border: '1px solid var(--accent-border)',
                  color: 'var(--accent)',
                }}
              >
                {item.year}
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">{item.milestone}</h3>
                {item.target ? (
                  <p className="mono text-sm text-white/50">{item.target}</p>
                ) : null}
              </div>
            </li>
          ))}
        </m.ol>
      </div>
    </section>
  )
}
