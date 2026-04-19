'use client'

import SectionFrame from './SectionFrame'
import { resolveIcon } from '@/content/icons'
import type { ContactBlock } from '@/content/site'

export default function ContactBlockView({ block }: { block: ContactBlock }) {
  if (!block.items || block.items.length === 0) return null

  return (
    <SectionFrame eyebrow={block.eyebrow} title={block.title} subtitle={block.subtitle}>
      <div className="grid grid-cols-1 sm:grid-cols-2 max-w-3xl gap-4 sm:gap-5">
        {block.items.map((channel, index) => {
          const Icon = resolveIcon(channel.icon)
          const isExternal = channel.href.startsWith('http') || channel.href.startsWith('mailto:')
          return (
            <a
              key={`${channel.label}-${index}`}
              href={channel.href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-4 rounded-2xl border p-5 transition-colors hover:border-white/20"
              style={{
                backgroundColor: 'var(--color-surface-card)',
                borderColor: 'var(--border-dark)',
              }}
            >
              {Icon ? (
                <div
                  className="w-11 h-11 flex items-center justify-center rounded-xl shrink-0"
                  style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                >
                  <Icon size={22} weight="duotone" />
                </div>
              ) : null}
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/45 mb-1">{channel.label}</p>
                <p className="text-[15px] text-white font-medium truncate">{channel.value}</p>
              </div>
            </a>
          )
        })}
      </div>
    </SectionFrame>
  )
}
