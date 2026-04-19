'use client'

import type { TaglineBlock } from '@/content/site'

export default function TaglineBlockView({ block }: { block: TaglineBlock }) {
  return (
    <section
      id={block.id}
      className="relative py-10 sm:py-14 border-y scroll-mt-20"
      style={{
        borderColor: 'var(--accent-border)',
        backgroundColor: 'var(--background)',
        backgroundImage:
          'linear-gradient(90deg, transparent 0%, var(--accent-soft) 50%, transparent 100%)',
      }}
    >
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 sm:gap-8">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-5 min-w-0">
            {block.label ? (
              <span
                className="mono text-[11px] font-semibold uppercase tracking-[0.22em] shrink-0"
                style={{ color: 'var(--accent)' }}
              >
                {block.label}
              </span>
            ) : null}
            <p className="text-[17px] sm:text-[20px] lg:text-[22px] font-medium text-white leading-snug">
              {block.body}
            </p>
          </div>
          {block.footnotes && block.footnotes.length > 0 ? (
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[11px] text-white/45 shrink-0">
              {block.footnotes.map((fn, i) => (
                <span key={i} className="whitespace-nowrap">
                  {fn}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
