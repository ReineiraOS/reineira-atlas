'use client'

import { useRef } from 'react'
import { m, useInView, useReducedMotion } from 'framer-motion'
import { site, hasItems } from '@/content/site'

const TOP_GRADIENT_STYLE = {
  background: 'linear-gradient(to bottom, var(--background) 0%, var(--background) 30%, transparent 100%)',
}

const BG_GRADIENT_STYLE = {
  background:
    'radial-gradient(ellipse at 10% 0%, var(--accent-soft) 0%, transparent 55%), linear-gradient(180deg, var(--color-surface-slate) 0%, var(--color-surface-slate-mid) 50%, var(--color-surface-slate) 100%)',
}

const BOTTOM_GRADIENT_STYLE = {
  background: 'linear-gradient(to top, var(--background) 0%, var(--background) 30%, transparent 100%)',
}

const GLASS_CARD_STYLE = {
  background: 'rgba(255, 255, 255, 0.06)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  borderRadius: 'var(--radius-xl)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.25)',
}

const STEP_NUMBER_STYLE = {
  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
  borderRadius: 'var(--radius-block)',
  color: 'var(--color-bg-secondary)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
}

const EASE_SMOOTH = 'easeOut' as const

function StepCard({
  index,
  step,
  prefersReducedMotion,
}: {
  index: number
  step: { title: string; description: string }
  prefersReducedMotion: boolean | null
}) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-40px' })

  return (
    <m.div
      ref={cardRef}
      className="group relative"
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={isInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: EASE_SMOOTH }}
    >
      <div className="relative p-7 sm:p-8 lg:p-10 h-full" style={GLASS_CARD_STYLE}>
        <div
          className="w-10 h-10 flex items-center justify-center text-sm font-semibold shrink-0 mb-5 mono"
          style={STEP_NUMBER_STYLE}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
        <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-white">{step.title}</h3>
        <p className="text-[15px] sm:text-base leading-[1.65]" style={{ color: 'var(--text-muted)' }}>
          {step.description}
        </p>
      </div>
    </m.div>
  )
}

export default function HowItWorks() {
  const section = site.home.howItWorks
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-60px' })

  if (!section || !hasItems(section.steps)) return null

  return (
    <section ref={sectionRef} id="how-it-works" className="relative overflow-hidden" style={{ padding: 0 }}>
      <div
        className="absolute top-0 left-0 right-0 h-16 sm:h-20 z-[3] pointer-events-none"
        style={TOP_GRADIENT_STYLE}
        aria-hidden="true"
      />
      <div className="absolute inset-0 z-[1]" aria-hidden="true">
        <div className="absolute inset-0" style={BG_GRADIENT_STYLE} />
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 z-[3] pointer-events-none"
        style={BOTTOM_GRADIENT_STYLE}
        aria-hidden="true"
      />

      <div className="container relative z-10 py-20 sm:py-28 lg:py-32">
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 lg:mb-16">
          {section.eyebrow ? (
            <m.p
              className="text-sm sm:text-base font-semibold mb-3 sm:mb-4 text-white uppercase tracking-widest"
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={isHeaderInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: EASE_SMOOTH }}
            >
              {section.eyebrow}
            </m.p>
          ) : null}
          <m.h2
            className="text-[28px] sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight mb-4 sm:mb-5 text-white"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={isHeaderInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: EASE_SMOOTH }}
          >
            {section.title}
          </m.h2>
          {section.subtitle ? (
            <m.p
              className="text-base sm:text-lg lg:text-xl leading-[1.6]"
              style={{ color: 'var(--text-muted)' }}
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={isHeaderInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: EASE_SMOOTH }}
            >
              {section.subtitle}
            </m.p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {section.steps.map((step, index) => (
            <StepCard key={`${step.title}-${index}`} index={index} step={step} prefersReducedMotion={prefersReducedMotion} />
          ))}
        </div>

        {section.outro ? (
          <m.p
            className="text-center mt-8 sm:mt-10 lg:mt-12 text-sm sm:text-base"
            style={{ color: 'var(--text-muted)' }}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={isHeaderInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: EASE_SMOOTH }}
          >
            {section.outro}
          </m.p>
        ) : null}
      </div>
    </section>
  )
}
