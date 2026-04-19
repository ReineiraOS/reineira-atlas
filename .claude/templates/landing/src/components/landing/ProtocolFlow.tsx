'use client'

import { useRef } from 'react'
import { m, useInView, useReducedMotion } from 'framer-motion'
import { site, hasItems } from '@/content/site'

export default function ProtocolFlow() {
  const section = site.home.protocolFlow
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })
  const prefersReducedMotion = useReducedMotion()

  if (!section || !hasItems(section.steps)) return null

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-36 overflow-hidden"
      style={{ backgroundColor: 'var(--color-surface-elevated)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, var(--accent-soft) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />
      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
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

        <div className="relative">
          <div
            className="hidden md:block absolute left-0 right-0 top-[46px] h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, var(--accent-border), transparent)' }}
            aria-hidden="true"
          />
          <m.ol
            className={`grid gap-8 md:gap-6 ${
              section.steps.length >= 5
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5'
                : section.steps.length === 4
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                  : 'grid-cols-1 sm:grid-cols-3'
            }`}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={isInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: 'easeOut' }}
          >
            {section.steps.map((step, index) => (
              <li key={`${step.title}-${index}`} className="relative">
                <div
                  className="mono w-[92px] h-[92px] flex items-center justify-center rounded-2xl mx-auto md:mx-0 mb-5 text-2xl font-semibold"
                  style={{
                    background: 'var(--accent-soft)',
                    border: '1px solid var(--accent-border)',
                    color: 'var(--accent)',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 text-center md:text-left">
                  {step.title}
                </h3>
                <p className="text-[14px] sm:text-[15px] leading-[1.65] text-white/55 text-center md:text-left">
                  {step.description}
                </p>
              </li>
            ))}
          </m.ol>
        </div>
      </div>
    </section>
  )
}
