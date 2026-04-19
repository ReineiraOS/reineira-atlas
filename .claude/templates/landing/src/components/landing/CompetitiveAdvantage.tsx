'use client'

import { useRef } from 'react'
import { m, useInView, useReducedMotion } from 'framer-motion'
import { site, hasItems } from '@/content/site'

export default function CompetitiveAdvantage() {
  const section = site.home.competitiveAdvantage
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })
  const prefersReducedMotion = useReducedMotion()

  if (!section || !hasItems(section.items)) return null

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-36"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="container">
        <div className="max-w-2xl mb-12 sm:mb-14">
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

        <m.div
          className={`grid gap-5 sm:gap-6 ${
            section.items.length >= 4 ? 'md:grid-cols-2 lg:grid-cols-2' : 'md:grid-cols-2'
          }`}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={isInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: 'easeOut' }}
        >
          {section.items.map((item, index) => (
            <article
              key={`${item.claim}-${index}`}
              className="rounded-2xl p-7 sm:p-8 lg:p-10 border"
              style={{
                backgroundColor: 'var(--color-surface-card)',
                borderColor: 'var(--border-dark)',
              }}
            >
              <p
                className="mono text-xs tracking-[0.2em] uppercase mb-3"
                style={{ color: 'var(--accent)' }}
              >
                Claim {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="text-xl sm:text-2xl font-semibold text-white leading-snug mb-3">{item.claim}</h3>
              <p className="text-[15px] sm:text-base leading-[1.7] text-white/65">
                <span className="text-white/40 mr-2 mono text-[12px] uppercase tracking-widest">Proof</span>
                {item.proof}
              </p>
            </article>
          ))}
        </m.div>
      </div>
    </section>
  )
}
