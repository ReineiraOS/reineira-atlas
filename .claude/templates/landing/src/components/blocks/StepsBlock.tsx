'use client'

import SectionFrame from './SectionFrame'
import type { StepsBlock } from '@/content/site'

function formatNumber(index: number, numbering: 'decimal' | 'alpha' | 'none') {
  if (numbering === 'none') return ''
  if (numbering === 'alpha') return String.fromCharCode(65 + index) + '.'
  return String(index + 1).padStart(2, '0')
}

export default function StepsBlockView({ block }: { block: StepsBlock }) {
  if (!block.items || block.items.length === 0) return null
  const numbering = block.numbering ?? 'decimal'

  return (
    <SectionFrame id={block.id} eyebrow={block.eyebrow} title={block.title} subtitle={block.subtitle}>
      <ol className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {block.items.map((step, index) => (
          <li
            key={`${step.title}-${index}`}
            className="relative rounded-2xl p-6 sm:p-7 border"
            style={{
              backgroundColor: 'var(--color-surface-card)',
              borderColor: 'var(--border-dark)',
            }}
          >
            {numbering !== 'none' ? (
              <div
                className="mono inline-flex items-center justify-center px-2.5 py-1 rounded-md text-[12px] font-semibold mb-4"
                style={{
                  background: 'var(--accent-soft)',
                  color: 'var(--accent)',
                  border: '1px solid var(--accent-border)',
                }}
              >
                {formatNumber(index, numbering)}
              </div>
            ) : null}
            <h3 className="text-[17px] sm:text-lg font-semibold text-white mb-2 leading-snug">{step.title}</h3>
            <p className="text-[14px] sm:text-[15px] leading-[1.65] text-white/60">{step.description}</p>
          </li>
        ))}
      </ol>
    </SectionFrame>
  )
}
