'use client'

import { m } from 'framer-motion'
import { Check, X, Minus, Circle } from '@phosphor-icons/react'
import SectionFrame from './SectionFrame'
import { MOTION, viewportOnce } from '@/lib/motion'
import type { ComparisonBlock, ComparisonMark } from '@/content/site'

function MarkCell({ mark, highlight }: { mark: ComparisonMark; highlight?: boolean }) {
  const tone = highlight ? { color: 'var(--accent)', background: 'var(--accent-soft)' } : {}

  if (mark === 'yes') {
    return (
      <span
        className="inline-flex items-center justify-center w-8 h-8 rounded-full"
        style={{ ...tone, color: highlight ? 'var(--accent)' : '#7ad49f' }}
      >
        <Check size={16} weight="bold" />
      </span>
    )
  }
  if (mark === 'no') {
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white/35">
        <X size={16} weight="bold" />
      </span>
    )
  }
  if (mark === 'partial') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-amber-300/80 bg-amber-400/10">
        <Minus size={12} weight="bold" />
        Partial
      </span>
    )
  }
  if (mark === 'roadmap') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold" style={{ color: 'var(--accent)', background: 'var(--accent-soft)' }}>
        <Circle size={10} weight="bold" />
        Roadmap
      </span>
    )
  }
  return <span className="text-[13px] text-white/60">{mark}</span>
}

export default function ComparisonBlockView({ block }: { block: ComparisonBlock }) {
  if (!block.rows || block.rows.length === 0 || !block.columns || block.columns.length === 0) return null

  const colCount = block.columns.length

  return (
    <SectionFrame id={block.id} eyebrow={block.eyebrow} title={block.title} subtitle={block.subtitle}>
      <div
        className="rounded-[var(--radius-card)] border overflow-hidden"
        style={{
          borderColor: 'var(--border-dark)',
          backgroundColor: 'var(--color-surface-card)',
        }}
      >
        <div
          className="hidden md:grid text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50"
          style={{
            gridTemplateColumns: `2fr repeat(${colCount}, minmax(120px, 1fr))`,
            backgroundColor: 'var(--color-surface-elevated)',
          }}
        >
          <div className="px-5 py-4">Feature</div>
          {block.columns.map((col) => (
            <div
              key={col.key}
              className="px-5 py-4 text-center"
              style={col.highlight ? { color: 'var(--accent)' } : undefined}
            >
              {col.label}
            </div>
          ))}
        </div>

        <m.div
          className="hidden md:block"
          variants={MOTION.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce()}
        >
          {block.rows.map((row, ri) => (
            <m.div
              key={`${row.label}-${ri}`}
              className="grid border-t row-hover-accent"
              style={{
                gridTemplateColumns: `2fr repeat(${colCount}, minmax(120px, 1fr))`,
                borderColor: 'var(--border-dark)',
              }}
              variants={MOTION.staggerItem}
            >
              <div className="px-5 py-5 text-[14px] text-white font-medium">{row.label}</div>
              {block.columns.map((col) => (
                <div
                  key={col.key}
                  className="px-5 py-5 flex items-center justify-center"
                  style={col.highlight ? { background: 'var(--accent-soft)' } : undefined}
                >
                  <MarkCell mark={row.values[col.key] ?? 'no'} highlight={col.highlight} />
                </div>
              ))}
            </m.div>
          ))}
        </m.div>

        <div className="md:hidden">
          {block.rows.map((row, ri) => (
            <div
              key={`mobile-${row.label}-${ri}`}
              className="px-5 py-5 border-t first:border-t-0"
              style={{ borderColor: 'var(--border-dark)' }}
            >
              <p className="text-[14px] text-white font-medium mb-3">{row.label}</p>
              <div className="space-y-1.5">
                {block.columns.map((col) => (
                  <div
                    key={col.key}
                    className="flex items-center justify-between gap-3 py-1.5 px-2 rounded-lg"
                    style={col.highlight ? { background: 'var(--accent-soft)' } : undefined}
                  >
                    <span
                      className="text-[11px] uppercase tracking-[0.15em] text-white/50"
                      style={col.highlight ? { color: 'var(--accent)' } : undefined}
                    >
                      {col.label}
                    </span>
                    <MarkCell mark={row.values[col.key] ?? 'no'} highlight={col.highlight} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionFrame>
  )
}
