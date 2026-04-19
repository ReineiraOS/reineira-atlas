'use client'

import { m, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { site, hasItems } from '@/content/site'

export default function TrustedBy() {
  const section = site.home.trustedBy
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' })
  const prefersReducedMotion = useReducedMotion()

  if (!section || !hasItems(section.items)) return null

  return (
    <section
      ref={sectionRef}
      className="relative py-10 sm:py-12 lg:py-14 border-b"
      style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border-dark)' }}
    >
      <div className="container">
        <p className="text-center text-[11px] sm:text-xs font-medium text-white/40 tracking-[0.22em] uppercase mb-7">
          {section.eyebrow ?? section.title ?? 'Trusted by'}
        </p>
        <m.div
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12 lg:gap-x-16"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={isInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: 'easeOut' }}
        >
          {section.items.map((name) => (
            <span
              key={name}
              className="text-sm sm:text-base font-medium tracking-tight text-white/60 hover:text-white/90 transition-colors duration-200"
            >
              {name}
            </span>
          ))}
        </m.div>
      </div>
    </section>
  )
}
