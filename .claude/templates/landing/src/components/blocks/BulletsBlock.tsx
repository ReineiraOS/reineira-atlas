'use client'

import { m } from 'framer-motion'
import SectionFrame from './SectionFrame'
import { resolveIcon } from '@/content/icons'
import { MOTION, viewportOnce } from '@/lib/motion'
import type { BulletsBlock } from '@/content/site'

export default function BulletsBlockView({ block }: { block: BulletsBlock }) {
  if (!block.items || block.items.length === 0) return null

  if (block.layout === 'list') {
    return (
      <SectionFrame id={block.id} eyebrow={block.eyebrow} title={block.title} subtitle={block.subtitle}>
        <m.ul
          className="max-w-3xl space-y-5 sm:space-y-6"
          variants={MOTION.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce()}
        >
          {block.items.map((item, index) => {
            const Icon = resolveIcon(item.icon)
            return (
              <m.li
                key={`${item.title}-${index}`}
                className="flex gap-4 sm:gap-5"
                variants={MOTION.staggerItem}
              >
                <span
                  className="mt-1 w-1.5 h-1.5 rounded-full shrink-0 self-start sm:mt-2"
                  style={{ backgroundColor: 'var(--accent)' }}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-[17px] sm:text-lg font-semibold text-white mb-1">
                    {Icon ? (
                      <span className="inline-flex items-center gap-2 align-middle">
                        <Icon size={16} weight="duotone" style={{ color: 'var(--accent)' }} />
                        {item.title}
                      </span>
                    ) : (
                      item.title
                    )}
                  </h3>
                  {item.description ? (
                    <p className="text-[14px] sm:text-[15px] leading-[1.7] text-white/60">{item.description}</p>
                  ) : null}
                </div>
              </m.li>
            )
          })}
        </m.ul>
      </SectionFrame>
    )
  }

  const cols = block.items.length >= 4 ? 'lg:grid-cols-3' : 'md:grid-cols-2'

  return (
    <SectionFrame id={block.id} eyebrow={block.eyebrow} title={block.title} subtitle={block.subtitle}>
      <m.div
        className={`grid grid-cols-1 ${cols} gap-4 sm:gap-5`}
        variants={MOTION.staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce()}
      >
        {block.items.map((item, index) => {
          const Icon = resolveIcon(item.icon)
          return (
            <m.article
              key={`${item.title}-${index}`}
              className="rounded-[var(--radius-card)] p-6 sm:p-7 border flex gap-4"
              style={{
                backgroundColor: 'var(--color-surface-card)',
                borderColor: 'var(--border-dark)',
              }}
              variants={MOTION.staggerItem}
            >
              {Icon ? (
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-lg shrink-0"
                  style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                >
                  <Icon size={20} weight="duotone" />
                </div>
              ) : (
                <div
                  className="w-1 shrink-0 rounded-full self-stretch"
                  style={{ background: 'var(--accent-soft)' }}
                />
              )}
              <div className="min-w-0">
                <h3 className="text-[16px] sm:text-[17px] font-semibold text-white mb-1.5 leading-snug">
                  {item.title}
                </h3>
                {item.description ? (
                  <p className="text-[14px] leading-[1.65] text-white/60">{item.description}</p>
                ) : null}
              </div>
            </m.article>
          )
        })}
      </m.div>
    </SectionFrame>
  )
}
