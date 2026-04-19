'use client'

import Link from 'next/link'
import { site } from '@/content/site'

function CtaButton({
  label,
  href,
  external,
  variant,
}: {
  label: string
  href: string
  external?: boolean
  variant: 'primary' | 'ghost'
}) {
  const className =
    variant === 'primary'
      ? 'btn-cta-outline px-10 sm:px-12 py-4 text-lg font-medium'
      : 'inline-flex items-center gap-2 px-10 py-4 text-lg font-medium transition-colors duration-200 text-white/60 hover:text-white'

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  )
}

export default function CTA() {
  const section = site.home.cta
  if (!section) return null

  return (
    <section
      id="request-access"
      className="relative overflow-hidden flex items-center justify-center py-20 sm:py-24 lg:py-28"
      style={{ backgroundColor: 'var(--color-surface-elevated)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, var(--accent-soft-hover) 0%, transparent 55%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 15% 70%, var(--accent-soft) 0%, transparent 40%), radial-gradient(circle at 85% 30%, var(--accent-soft) 0%, transparent 40%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex items-center justify-center px-6">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <h2 className="text-[36px] sm:text-[44px] lg:text-[52px] font-medium leading-[1.1] tracking-[-0.03em] mb-5 sm:mb-6 text-white">
            {section.title}
          </h2>
          {section.subtitle ? (
            <p className="text-base sm:text-lg leading-relaxed mb-10 sm:mb-12 text-white/60">{section.subtitle}</p>
          ) : null}

          {section.primary || section.secondary ? (
            <div className="flex flex-wrap items-center justify-center gap-4">
              {section.primary ? (
                <CtaButton
                  label={section.primary.label}
                  href={section.primary.href}
                  external={section.primary.external}
                  variant="primary"
                />
              ) : null}
              {section.secondary ? (
                <CtaButton
                  label={section.secondary.label}
                  href={section.secondary.href}
                  external={section.secondary.external}
                  variant="ghost"
                />
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
