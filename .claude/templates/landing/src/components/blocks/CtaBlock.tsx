'use client'

import Link from 'next/link'
import type { CtaBlock, CtaConfig } from '@/content/site'

function Button({ cta, variant }: { cta: CtaConfig; variant: 'primary' | 'ghost' }) {
  const className =
    variant === 'primary'
      ? 'inline-flex items-center justify-center px-8 py-3.5 text-base font-medium rounded-full text-white transition-all hover:opacity-90'
      : 'inline-flex items-center gap-2 px-8 py-3.5 text-base font-medium transition-colors text-white/70 hover:text-white'
  const style = variant === 'primary' ? { backgroundColor: 'var(--accent)' } : undefined

  if (cta.external) {
    return (
      <a href={cta.href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
        {cta.label}
      </a>
    )
  }
  return (
    <Link href={cta.href} className={className} style={style}>
      {cta.label}
    </Link>
  )
}

export default function CtaBlockView({ block }: { block: CtaBlock }) {
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
      style={{ backgroundColor: 'var(--color-surface-elevated)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, var(--accent-soft) 0%, transparent 55%)',
        }}
        aria-hidden="true"
      />
      <div className="relative container">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {block.eyebrow ? (
            <p
              className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-4"
              style={{ color: 'var(--accent)' }}
            >
              {block.eyebrow}
            </p>
          ) : null}
          <h2 className="text-[30px] sm:text-[40px] lg:text-[48px] font-medium leading-[1.1] tracking-[-0.02em] text-white mb-5">
            {block.title}
          </h2>
          {block.subtitle ? (
            <p className="text-base sm:text-lg text-white/60 leading-relaxed mb-10">{block.subtitle}</p>
          ) : null}
          {block.primary || block.secondary ? (
            <div className="flex flex-wrap items-center justify-center gap-4">
              {block.primary ? <Button cta={block.primary} variant="primary" /> : null}
              {block.secondary ? <Button cta={block.secondary} variant="ghost" /> : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
