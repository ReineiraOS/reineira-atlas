'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { m, useInView, useReducedMotion } from 'framer-motion'
import { site } from '@/content/site'
import { MOTION, viewportOnce } from '@/lib/motion'
import TextReveal from '@/components/ui/TextReveal'

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
      ? 'shimmer-cta inline-flex items-center px-7 py-3.5 text-[15px] font-medium transition-all hover:opacity-90 text-white'
      : 'inline-flex items-center justify-center px-7 py-3.5 text-[15px] font-medium transition-colors text-white/70 hover:text-white border border-white/20 hover:border-white/40'
  const style: React.CSSProperties =
    variant === 'primary'
      ? { backgroundColor: 'var(--accent)', borderRadius: 'var(--radius-button)' }
      : { borderRadius: 'var(--radius-button)' }

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
  const isInView = useInView(sectionRef, viewportOnce())

  if (!hero) return null

  return (
    <section
      ref={sectionRef}
      className="relative pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 lg:pb-24 overflow-hidden"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="absolute inset-0 pointer-events-none backdrop-pattern" aria-hidden="true" />

      <m.div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          width: '900px',
          height: '900px',
          left: '-10%',
          top: '-20%',
          background:
            'radial-gradient(circle at center, var(--accent-soft) 0%, transparent 62%)',
          filter: 'blur(40px)',
          opacity: 'var(--accent-orb-opacity)',
          borderRadius: '50%',
        }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, 40, -20, 0],
                y: [0, -20, 30, 0],
              }
        }
        transition={{ duration: 28, ease: 'easeInOut', repeat: Infinity }}
      />

      <div className="container relative">
        <div className="max-w-5xl flex flex-col items-start">
          {hero.eyebrow ? (
            <m.p
              className="mono text-[11px] sm:text-xs font-semibold tracking-[0.24em] uppercase mb-6"
              style={{ color: 'var(--accent)' }}
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={isInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : MOTION.duration }}
            >
              {hero.eyebrow}
            </m.p>
          ) : null}

          <TextReveal
            as="h1"
            text={hero.title}
            className="display-font text-[40px] sm:text-[64px] md:text-[80px] lg:text-[96px] text-white leading-[1.02] mb-5 sm:mb-6 max-w-[20ch]"
            style={{
              fontWeight: 'var(--display-weight)' as unknown as number,
              letterSpacing: 'var(--letter-spacing-hero)',
            }}
            delay={0.05}
          />

          {hero.subtitle ? (
            <m.p
              className="text-[18px] sm:text-[22px] lg:text-[24px] text-white/65 leading-[1.5] mb-6 sm:mb-8 max-w-[60ch]"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={isInView || prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: prefersReducedMotion ? 0 : MOTION.duration, delay: 0.4 }}
            >
              {hero.subtitle}
            </m.p>
          ) : null}

          {hero.tagline ? (
            <m.p
              className="italic text-[15px] sm:text-base text-white/45 mb-6 sm:mb-8 max-w-[60ch]"
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={isInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : MOTION.duration, delay: 0.55 }}
            >
              {hero.tagline}
            </m.p>
          ) : null}

          {hero.primaryCta || hero.secondaryCta ? (
            <m.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 items-start sm:items-center"
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={isInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : MOTION.duration, delay: 0.7 }}
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
