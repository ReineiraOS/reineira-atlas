'use client'

import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'
import SectionFrame from './SectionFrame'
import { resolveIcon } from '@/content/icons'
import type { CardsBlock } from '@/content/site'

export default function CardsBlockView({ block }: { block: CardsBlock }) {
  if (!block.items || block.items.length === 0) return null
  const cols = block.columns ?? (block.items.length >= 4 ? 3 : 2)
  const gridCols =
    cols === 2 ? 'md:grid-cols-2' : cols === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3'

  return (
    <SectionFrame id={block.id} eyebrow={block.eyebrow} title={block.title} subtitle={block.subtitle}>
      <div className={`grid grid-cols-1 ${gridCols} gap-4 sm:gap-5`}>
        {block.items.map((item, index) => {
          const Icon = resolveIcon(item.icon)
          const isExternal = item.href?.startsWith('http')
          const inner = (
            <article
              className="group relative h-full rounded-2xl p-7 sm:p-8 border transition-colors hover:border-white/20"
              style={{
                backgroundColor: 'var(--color-surface-card)',
                borderColor: 'var(--border-dark)',
              }}
            >
              {item.badge ? (
                <span
                  className="mono text-[10px] uppercase tracking-[0.18em] font-semibold px-2 py-0.5 rounded mb-4 inline-block"
                  style={{
                    color: 'var(--accent)',
                    background: 'var(--accent-soft)',
                    border: '1px solid var(--accent-border)',
                  }}
                >
                  {item.badge}
                </span>
              ) : null}
              {Icon ? (
                <div
                  className="w-11 h-11 flex items-center justify-center rounded-xl mb-5"
                  style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                >
                  <Icon size={22} weight="duotone" />
                </div>
              ) : null}
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2.5 leading-snug">{item.title}</h3>
              <p className="text-[14px] sm:text-[15px] leading-[1.7] text-white/60">{item.description}</p>
              {item.href ? (
                <span
                  className="inline-flex items-center gap-2 mt-5 text-sm font-medium transition-colors"
                  style={{ color: 'var(--accent)' }}
                >
                  Learn more
                  <ArrowRight size={14} weight="regular" />
                </span>
              ) : null}
            </article>
          )

          if (item.href) {
            if (isExternal) {
              return (
                <a key={`${item.title}-${index}`} href={item.href} target="_blank" rel="noopener noreferrer">
                  {inner}
                </a>
              )
            }
            return (
              <Link key={`${item.title}-${index}`} href={item.href}>
                {inner}
              </Link>
            )
          }
          return <div key={`${item.title}-${index}`}>{inner}</div>
        })}
      </div>
    </SectionFrame>
  )
}
