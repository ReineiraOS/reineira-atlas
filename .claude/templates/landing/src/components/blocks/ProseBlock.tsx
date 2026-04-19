'use client'

import SectionFrame from './SectionFrame'
import type { ProseBlock } from '@/content/site'

export default function ProseBlockView({ block }: { block: ProseBlock }) {
  const paragraphs = block.body.split(/\n\s*\n/).filter(Boolean)
  const textColor = block.tone === 'muted' ? 'text-white/55' : 'text-white/75'

  if (block.layout === 'two-col') {
    return (
      <SectionFrame id={block.id} eyebrow={block.eyebrow} title={null}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16">
          <div>
            {block.title ? (
              <h2 className="text-[26px] sm:text-[32px] md:text-[38px] lg:text-[44px] font-semibold text-white leading-[1.15] tracking-tight">
                {block.title}
              </h2>
            ) : null}
            {block.subtitle ? <p className="mt-4 text-white/55 text-base leading-[1.6]">{block.subtitle}</p> : null}
          </div>
          <div className={`space-y-4 sm:space-y-5 text-[15px] sm:text-base lg:text-lg leading-[1.7] ${textColor}`}>
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </SectionFrame>
    )
  }

  return (
    <SectionFrame id={block.id} eyebrow={block.eyebrow} title={block.title} subtitle={block.subtitle} align={block.layout === 'center' ? 'center' : 'left'}>
      <div
        className={`${block.layout === 'center' ? 'mx-auto text-center' : ''} max-w-3xl space-y-4 sm:space-y-5 text-[15px] sm:text-base lg:text-lg leading-[1.7] ${textColor}`}
      >
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </SectionFrame>
  )
}
