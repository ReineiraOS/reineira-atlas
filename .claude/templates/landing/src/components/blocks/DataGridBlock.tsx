'use client'

import SectionFrame from './SectionFrame'
import type { DataGridBlock, DataCell } from '@/content/site'

function Cell({ cell }: { cell: DataCell }) {
  const emphasis = cell.emphasis
  if (emphasis === 'badge') {
    const tone =
      cell.badgeTone === 'accent'
        ? { color: 'var(--accent)', background: 'var(--accent-soft)', borderColor: 'var(--accent-border)' }
        : cell.badgeTone === 'warning'
          ? { color: '#f3c677', background: 'rgba(243, 198, 119, 0.1)', borderColor: 'rgba(243, 198, 119, 0.22)' }
          : { color: 'rgba(255, 255, 255, 0.75)', background: 'rgba(255, 255, 255, 0.04)', borderColor: 'var(--border-dark)' }
    return (
      <span
        className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase border"
        style={tone}
      >
        {cell.value}
      </span>
    )
  }
  if (emphasis === 'primary') {
    return (
      <span className="text-white font-semibold text-[15px]">{cell.value}</span>
    )
  }
  if (emphasis === 'mono') {
    return (
      <span className="mono text-[15px] font-semibold" style={{ color: 'var(--accent)' }}>
        {cell.value}
      </span>
    )
  }
  if (emphasis === 'muted') {
    return <span className="text-[14px] text-white/50">{cell.value}</span>
  }
  return <span className="text-[14px] text-white/75">{cell.value}</span>
}

export default function DataGridBlockView({ block }: { block: DataGridBlock }) {
  if (!block.rows || block.rows.length === 0 || !block.headers || block.headers.length === 0) return null
  const colCount = block.headers.length

  return (
    <SectionFrame id={block.id} eyebrow={block.eyebrow} title={block.title} subtitle={block.subtitle}>
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ borderColor: 'var(--border-dark)', backgroundColor: 'var(--color-surface-card)' }}
      >
        <div
          className="hidden md:grid text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50"
          style={{
            gridTemplateColumns: `repeat(${colCount}, minmax(140px, 1fr))`,
            backgroundColor: 'var(--color-surface-elevated)',
          }}
        >
          {block.headers.map((h, i) => (
            <div key={`${h}-${i}`} className="px-5 py-4">
              {h}
            </div>
          ))}
        </div>

        <div className="hidden md:block">
          {block.rows.map((row, ri) => (
            <div
              key={`row-${ri}`}
              className="grid border-t transition-colors hover:bg-white/[0.02]"
              style={{
                gridTemplateColumns: `repeat(${colCount}, minmax(140px, 1fr))`,
                borderColor: 'var(--border-dark)',
              }}
            >
              {row.map((cell, ci) => (
                <div key={ci} className="px-5 py-5 flex items-center">
                  <Cell cell={cell} />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="md:hidden">
          {block.rows.map((row, ri) => (
            <div
              key={`mrow-${ri}`}
              className="border-t first:border-t-0 px-5 py-5 space-y-3"
              style={{ borderColor: 'var(--border-dark)' }}
            >
              {row.map((cell, ci) => (
                <div key={ci} className="flex items-start justify-between gap-3">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-white/40 shrink-0 pt-0.5">
                    {block.headers[ci] ?? ''}
                  </span>
                  <div className="text-right min-w-0">
                    <Cell cell={cell} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {block.caption ? (
        <p className="mt-4 text-[12px] text-white/40 text-center italic">{block.caption}</p>
      ) : null}
    </SectionFrame>
  )
}
