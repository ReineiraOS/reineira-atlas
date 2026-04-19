'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { m, useInView, useReducedMotion } from 'framer-motion'
import { site } from '@/content/site'

function CtaLink({
  href,
  external,
  variant,
  children,
}: {
  href: string
  external?: boolean
  variant: 'primary' | 'secondary'
  children: React.ReactNode
}) {
  const className =
    variant === 'primary'
      ? 'inline-flex items-center px-8 py-3.5 text-base font-medium rounded-full transition-all hover:opacity-90 cursor-pointer text-white'
      : 'inline-flex items-center justify-center px-8 py-3.5 text-base font-medium rounded-full whitespace-nowrap transition-colors text-white/70 hover:text-white border border-white/20 hover:border-white/40'

  const style = variant === 'primary' ? { backgroundColor: 'var(--accent)' } : undefined

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={className} style={style}>
      {children}
    </Link>
  )
}

export default function Hero() {
  const hero = site.home.hero
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' })

  if (!hero) return null

  return (
    <section
      ref={sectionRef}
      className="relative pt-28 sm:pt-28 lg:pt-36 pb-20 sm:pb-24 lg:pb-28 overflow-hidden"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="absolute inset-0 hero-backdrop pointer-events-none" aria-hidden="true" />
      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">
          {hero.eyebrow ? (
            <m.p
              className="text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-6"
              style={{ color: 'var(--accent)' }}
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={isInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: 'easeOut' }}
            >
              {hero.eyebrow}
            </m.p>
          ) : null}

          <m.h1
            className="text-[36px] sm:text-[56px] md:text-[72px] lg:text-[84px] font-semibold text-white leading-[1.12] sm:leading-[1.05] tracking-[-0.035em] mb-6 sm:mb-8"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={isInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: 'easeOut' }}
          >
            {hero.title}
          </m.h1>

          {hero.subtitle ? (
            <m.p
              className="text-[20px] sm:text-[22px] lg:text-[26px] text-white/60 leading-[1.5] mb-10 sm:mb-12 max-w-2xl mx-auto"
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={isInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: 'easeOut' }}
            >
              {hero.subtitle}
            </m.p>
          ) : null}

          {hero.primaryCta || hero.secondaryCta ? (
            <m.div
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={isInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: 'easeOut' }}
            >
              {hero.primaryCta ? (
                <CtaLink href={hero.primaryCta.href} external={hero.primaryCta.external} variant="primary">
                  {hero.primaryCta.label}
                </CtaLink>
              ) : null}
              {hero.secondaryCta ? (
                <CtaLink href={hero.secondaryCta.href} external={hero.secondaryCta.external} variant="secondary">
                  {hero.secondaryCta.label}
                </CtaLink>
              ) : null}
            </m.div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
