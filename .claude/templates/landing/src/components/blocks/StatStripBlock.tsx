'use client'

import { useRef } from 'react'
import { m, useInView, useReducedMotion } from 'framer-motion'
import CountUp from '@/components/ui/CountUp'
import type { StatStripBlock } from '@/content/site'

export default function StatStripBlockView({ block }: { block: StatStripBlock }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const prefersReducedMotion = useReducedMotion()

  if (!block.items || block.items.length === 0) return null
  const count = block.items.length
  const isBanner = block.tone !== 'inline'

  const gridCols =
    count >= 5
      ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
      : count === 4
        ? 'grid-cols-2 lg:grid-cols-4'
        : count === 3
          ? 'grid-cols-1 sm:grid-cols-3'
          : 'grid-cols-1 sm:grid-cols-2'

  const content = (
    <m.div
      ref={ref}
      className={`grid ${gridCols} divide-x divide-y sm:divide-y-0`}
      style={{
        ['--tw-divide-opacity' as string]: '1',
        borderColor: 'var(--border-dark)',
      }}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
      animate={isInView || prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: 'easeOut' }}
    >
      {block.items.map((item, index) => (
        <div
          key={`${item.label}-${index}`}
          className="px-5 py-7 sm:px-7 sm:py-9 lg:px-9 lg:py-10 text-center"
          style={{ borderColor: 'var(--border-dark)' }}
        >
          <CountUp
            value={item.value}
            className="mono block text-[26px] sm:text-[34px] lg:text-[44px] font-semibold leading-[1.05] tracking-tight mb-2"
            style={{ color: 'var(--accent)' }}
          />
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-white/65">{item.label}</p>
          {item.footnote ? <p className="mt-1.5 text-[10px] text-white/35">{item.footnote}</p> : null}
        </div>
      ))}
    </m.div>
  )

  if (block.tone === 'inline') {
    return (
      <section id={block.id} className="relative scroll-mt-20" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container">
          {block.eyebrow ? (
            <p
              className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-5 text-center"
              style={{ color: 'var(--accent)' }}
            >
              {block.eyebrow}
            </p>
          ) : null}
          <div
            className="rounded-[var(--radius-card)] border overflow-hidden"
            style={{ borderColor: 'var(--border-dark)', backgroundColor: 'var(--color-surface-card)' }}
          >
            {content}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id={block.id}
      className="relative py-10 sm:py-14 border-y scroll-mt-20"
      style={{
        backgroundColor: 'var(--background)',
        borderColor: 'var(--border-dark)',
        backgroundImage:
          'linear-gradient(90deg, transparent 0%, var(--accent-soft) 50%, transparent 100%)',
      }}
    >
      <div className="container">
        {block.eyebrow || block.title ? (
          <div className="text-center max-w-2xl mx-auto mb-10">
            {block.eyebrow ? (
              <p
                className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-3"
                style={{ color: 'var(--accent)' }}
              >
                {block.eyebrow}
              </p>
            ) : null}
            {block.title ? (
              <h2 className="text-[24px] sm:text-[30px] font-semibold text-white tracking-tight">{block.title}</h2>
            ) : null}
          </div>
        ) : null}
        {isBanner && block.tone === 'bordered' ? (
          <div
            className="rounded-[var(--radius-card)] border overflow-hidden"
            style={{ borderColor: 'var(--border-dark)', backgroundColor: 'var(--color-surface-card)' }}
          >
            {content}
          </div>
        ) : (
          content
        )}
      </div>
    </section>
  )
}
