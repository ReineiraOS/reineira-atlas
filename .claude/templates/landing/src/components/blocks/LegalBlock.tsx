'use client'

import type { LegalBlock } from '@/content/site'

export default function LegalBlockView({ block }: { block: LegalBlock }) {
  const blocks = block.body
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean)

  return (
    <section id={block.id} className="relative py-16 sm:py-20 scroll-mt-20" style={{ backgroundColor: 'var(--background)' }}>
      <div className="container">
        <div className="max-w-[720px] mx-auto">
          {block.title ? (
            <h2 className="text-[26px] sm:text-[32px] font-semibold text-white mb-2">{block.title}</h2>
          ) : null}
          {block.updatedAt ? (
            <p className="text-[13px] text-white/40 mb-8">Last updated: {block.updatedAt}</p>
          ) : null}
          <div className="legal-content space-y-5">
            {blocks.map((b, i) => {
              if (b.startsWith('## ')) return <h2 key={i}>{b.replace(/^##\s+/, '')}</h2>
              if (b.startsWith('### ')) return <h3 key={i}>{b.replace(/^###\s+/, '')}</h3>
              return <p key={i}>{b}</p>
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
