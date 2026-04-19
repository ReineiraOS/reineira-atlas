'use client'

import SectionFrame from './SectionFrame'
import type { TimelineBlock } from '@/content/site'

export default function TimelineBlockView({ block }: { block: TimelineBlock }) {
  if (!block.items || block.items.length === 0) return null

  return (
    <SectionFrame id={block.id} eyebrow={block.eyebrow} title={block.title} subtitle={block.subtitle}>
      <ol className="relative max-w-4xl">
        <div
          className="absolute left-[26px] sm:left-[30px] top-3 bottom-3 w-px"
          style={{ backgroundColor: 'var(--accent-border)' }}
          aria-hidden="true"
        />
        {block.items.map((item, index) => {
          const progress = (index + 1) / block.items.length
          return (
            <li key={`${item.label}-${index}`} className="relative pl-[76px] sm:pl-[88px] pb-8 last:pb-0">
              <div
                className="absolute left-0 top-0 w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] flex items-center justify-center rounded-2xl mono text-[13px] sm:text-sm font-semibold"
                style={{
                  background: `rgba(59, 139, 255, ${0.05 + progress * 0.18})`,
                  border: '1px solid var(--accent-border)',
                  color: 'var(--accent)',
                }}
              >
                {item.label}
              </div>
              <div className="pt-1">
                <h3 className="text-[16px] sm:text-lg font-semibold text-white leading-snug mb-1">
                  {item.title}
                </h3>
                {item.description ? (
                  <p className="text-[14px] text-white/55 leading-[1.65] mb-2">{item.description}</p>
                ) : null}
                {item.target ? (
                  <p
                    className="mono text-[13px] sm:text-sm font-semibold"
                    style={{ color: 'var(--accent)' }}
                  >
                    {item.target}
                  </p>
                ) : null}
              </div>
            </li>
          )
        })}
      </ol>
    </SectionFrame>
  )
}
