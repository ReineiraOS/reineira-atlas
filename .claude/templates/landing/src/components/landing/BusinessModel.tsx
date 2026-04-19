'use client'

import { useRef } from 'react'
import { m, useInView, useReducedMotion } from 'framer-motion'
import { site, hasItems } from '@/content/site'

export default function BusinessModel() {
  const section = site.home.businessModel
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })
  const prefersReducedMotion = useReducedMotion()

  if (!section || !hasItems(section.rows)) return null
  const showVolume = section.rows.some((row) => row.volume)
  const showNotes = section.rows.some((row) => row.notes)

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-36"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-14">
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
          className="max-w-4xl mx-auto rounded-2xl overflow-hidden border"
          style={{ borderColor: 'var(--border-dark)' }}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={isInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: 'easeOut' }}
        >
          <table className="w-full">
            <thead>
              <tr
                className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-white/50"
                style={{ backgroundColor: 'var(--color-surface-card)' }}
              >
                <th className="text-left px-5 sm:px-7 py-4">Segment</th>
                <th className="text-left px-5 sm:px-7 py-4">Fee</th>
                {showVolume ? <th className="text-left px-5 sm:px-7 py-4">Volume</th> : null}
                {showNotes ? <th className="text-left px-5 sm:px-7 py-4">Notes</th> : null}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, index) => (
                <tr
                  key={`${row.segment}-${index}`}
                  className="border-t"
                  style={{ borderColor: 'var(--border-dark)' }}
                >
                  <td className="px-5 sm:px-7 py-4 text-white font-medium">{row.segment}</td>
                  <td className="px-5 sm:px-7 py-4 mono text-white/90" style={{ color: 'var(--accent)' }}>
                    {row.fee}
                  </td>
                  {showVolume ? <td className="px-5 sm:px-7 py-4 mono text-white/70">{row.volume ?? '—'}</td> : null}
                  {showNotes ? <td className="px-5 sm:px-7 py-4 text-white/60 text-sm">{row.notes ?? '—'}</td> : null}
                </tr>
              ))}
            </tbody>
          </table>
        </m.div>
      </div>
    </section>
  )
}
