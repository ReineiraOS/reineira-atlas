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
      ? 'inline-flex items-center px-7 py-3.5 text-[15px] font-medium rounded-full transition-all hover:opacity-90 text-white'
      : 'inline-flex items-center justify-center px-7 py-3.5 text-[15px] font-medium rounded-full transition-colors text-white/70 hover:text-white border border-white/20 hover:border-white/40'
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
      className="relative pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 lg:pb-24 overflow-hidden"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="absolute inset-0 hero-backdrop pointer-events-none" aria-hidden="true" />
      <div className="container relative">
        <div className="max-w-4xl">
          {hero.eyebrow ? (
            <m.p
              className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] uppercase mb-5"
              style={{ color: 'var(--accent)' }}
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={isInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: 'easeOut' }}
            >
              {hero.eyebrow}
            </m.p>
          ) : null}

          <m.h1
            className="text-[36px] sm:text-[56px] md:text-[68px] lg:text-[80px] font-semibold text-white leading-[1.05] tracking-[-0.035em] mb-5 sm:mb-6"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={isInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: 'easeOut' }}
          >
            {hero.title}
          </m.h1>

          {hero.subtitle ? (
            <m.p
              className="text-[18px] sm:text-[22px] lg:text-[26px] text-white/65 leading-[1.5] mb-8 sm:mb-10 max-w-3xl"
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={isInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: 'easeOut' }}
            >
              {hero.subtitle}
            </m.p>
          ) : null}

          {hero.tagline ? (
            <m.p
              className="italic text-[15px] sm:text-base text-white/45 mb-8 sm:mb-10 max-w-2xl"
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={isInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: 'easeOut' }}
            >
              {hero.tagline}
            </m.p>
          ) : null}

          {hero.primaryCta || hero.secondaryCta ? (
            <m.div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
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
