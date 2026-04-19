'use client'

import Link from 'next/link'
import { Header, Footer } from '@/components/landing'
import { hasItems, type BusinessPageConfig } from '@/content/site'
import { resolveIcon } from '@/content/icons'

export default function BusinessView({ page }: { page: BusinessPageConfig }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <Header />
      <main>
        <section className="relative pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 overflow-hidden">
          <div className="absolute inset-0 hero-backdrop pointer-events-none" aria-hidden="true" />
          <div className="container relative">
            <div className="max-w-3xl">
              {page.hero.eyebrow ? (
                <p
                  className="text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase mb-4"
                  style={{ color: 'var(--accent)' }}
                >
                  {page.hero.eyebrow}
                </p>
              ) : null}
              <h1 className="text-[36px] sm:text-[52px] lg:text-[64px] font-semibold text-white leading-[1.08] tracking-[-0.03em] mb-6">
                {page.hero.title}
              </h1>
              {page.hero.subtitle ? (
                <p className="text-lg sm:text-xl lg:text-2xl text-white/60 leading-[1.5] max-w-2xl">
                  {page.hero.subtitle}
                </p>
              ) : null}
              {page.hero.cta ? (
                <div className="mt-8">
                  {page.hero.cta.external ? (
                    <a
                      href={page.hero.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-8 py-3.5 text-base font-medium rounded-full text-white transition-all hover:opacity-90"
                      style={{ backgroundColor: 'var(--accent)' }}
                    >
                      {page.hero.cta.label}
                    </a>
                  ) : (
                    <Link
                      href={page.hero.cta.href}
                      className="inline-flex items-center px-8 py-3.5 text-base font-medium rounded-full text-white transition-all hover:opacity-90"
                      style={{ backgroundColor: 'var(--accent)' }}
                    >
                      {page.hero.cta.label}
                    </Link>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {hasItems(page.segments) ? (
          <section className="py-24 sm:py-28" style={{ backgroundColor: 'var(--background)' }}>
            <div className="container">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {page.segments.map((segment, index) => {
                  const Icon = resolveIcon(segment.icon)
                  return (
                    <article
                      key={`${segment.title}-${index}`}
                      className="rounded-2xl p-7 sm:p-8 border"
                      style={{
                        backgroundColor: 'var(--color-surface-card)',
                        borderColor: 'var(--border-dark)',
                      }}
                    >
                      {Icon ? (
                        <div
                          className="w-11 h-11 flex items-center justify-center rounded-xl mb-5"
                          style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                        >
                          <Icon size={22} weight="duotone" />
                        </div>
                      ) : null}
                      <h3 className="text-xl font-semibold text-white mb-2.5">{segment.title}</h3>
                      <p className="text-[15px] leading-[1.7] text-white/65">{segment.description}</p>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>
        ) : null}

        {page.trust && hasItems(page.trust.stats) ? (
          <section
            className="py-20 sm:py-24 border-y"
            style={{ backgroundColor: 'var(--color-surface-elevated)', borderColor: 'var(--border-dark)' }}
          >
            <div className="container">
              {page.trust.title ? (
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white text-center mb-12">
                  {page.trust.title}
                </h2>
              ) : null}
              <div
                className={`grid gap-10 ${
                  page.trust.stats.length >= 4
                    ? 'grid-cols-2 lg:grid-cols-4'
                    : page.trust.stats.length === 3
                      ? 'grid-cols-1 sm:grid-cols-3'
                      : 'grid-cols-1 sm:grid-cols-2'
                }`}
              >
                {page.trust.stats.map((stat, index) => (
                  <div key={`${stat.label}-${index}`} className="text-center">
                    <p
                      className="mono text-[40px] sm:text-[52px] font-semibold leading-[1.05] mb-2"
                      style={{ color: 'var(--accent)' }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-sm font-medium uppercase tracking-[0.15em] text-white/70">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {page.compliance && hasItems(page.compliance.bullets) ? (
          <section className="py-24 sm:py-28" style={{ backgroundColor: 'var(--background)' }}>
            <div className="container max-w-3xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-8">{page.compliance.title}</h2>
              <ul className="space-y-4">
                {page.compliance.bullets.map((bullet, index) => (
                  <li key={index} className="flex gap-4">
                    <span
                      className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: 'var(--accent)' }}
                      aria-hidden="true"
                    />
                    <p className="text-base sm:text-lg leading-[1.7] text-white/70">{bullet}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
