'use client'

import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'
import { m, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { site, hasItems } from '@/content/site'
import { resolveIcon } from '@/content/icons'

const CARD_GRADIENTS = [
  'radial-gradient(ellipse at 30% 20%, var(--accent-soft-hover) 0%, transparent 55%), linear-gradient(135deg, #0c1120 0%, #1a2238 100%)',
  'radial-gradient(ellipse at 70% 80%, var(--accent-soft) 0%, transparent 60%), linear-gradient(135deg, #0a0f1c 0%, #141b2e 100%)',
  'radial-gradient(ellipse at 20% 90%, var(--accent-soft) 0%, transparent 55%), linear-gradient(135deg, #0e131e 0%, #1a2134 100%)',
]

export default function Products() {
  const section = site.home.products
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()

  if (!section || !hasItems(section.items)) return null

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative py-24 sm:py-32 lg:py-36"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-16 mb-12 sm:mb-16 lg:mb-20">
          <m.h2
            className="text-[32px] sm:text-[40px] lg:text-[48px] xl:text-[56px] font-medium text-white leading-[1.1] tracking-[-0.03em] max-w-md lg:max-w-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {section.title}
          </m.h2>
          {section.subtitle ? (
            <m.p
              className="text-base sm:text-lg lg:text-[22px] text-white/50 leading-[1.6] max-w-md lg:max-w-lg lg:pt-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {section.subtitle}
            </m.p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          {section.items.map((product, index) => {
            const Icon = resolveIcon(product.icon)
            const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length]
            const href = product.href
            const cta = product.cta
            const isExternal = href?.startsWith('http')

            return (
              <m.article
                key={`${product.title}-${index}`}
                className="group relative rounded-2xl overflow-hidden border border-white/10 min-h-[320px] sm:min-h-[420px] flex flex-col justify-end hover:border-white/20 transition-all duration-300"
                style={{ backgroundImage: gradient }}
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={isInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: 'easeOut' }}
              >
                <div className="relative p-6 sm:p-8 lg:p-10">
                  {Icon ? (
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-300 text-white bg-white/10 group-hover:bg-white group-hover:text-black">
                        <Icon size={20} weight="duotone" />
                      </div>
                    </div>
                  ) : null}

                  <h3 className="text-2xl sm:text-3xl font-medium text-white leading-[1.2] tracking-[-0.02em] mb-3">
                    {product.title}
                  </h3>
                  <p className="text-[15px] sm:text-base leading-[1.7] text-white/60 mb-6">{product.description}</p>

                  {href && cta ? (
                    isExternal ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-2 text-sm font-medium transition-colors"
                        style={{ color: 'var(--accent)' }}
                      >
                        {cta}
                        <ArrowRight size={14} weight="regular" className="shrink-0" />
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="group/link inline-flex items-center gap-2 text-sm font-medium transition-colors"
                        style={{ color: 'var(--accent)' }}
                      >
                        {cta}
                        <ArrowRight size={14} weight="regular" className="shrink-0" />
                      </Link>
                    )
                  ) : null}
                </div>
              </m.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
