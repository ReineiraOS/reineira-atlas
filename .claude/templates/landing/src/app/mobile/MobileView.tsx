'use client'

import Link from 'next/link'
import { Header, Footer } from '@/components/landing'
import { hasItems, type MobilePageConfig } from '@/content/site'
import { resolveIcon } from '@/content/icons'

export default function MobileView({ page }: { page: MobilePageConfig }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <Header />
      <main>
        <section className="relative pt-28 sm:pt-32 lg:pt-40 pb-20 text-center overflow-hidden">
          <div className="absolute inset-0 hero-backdrop pointer-events-none" aria-hidden="true" />
          <div className="container relative">
            <div className="max-w-3xl mx-auto">
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
                <p className="text-lg sm:text-xl text-white/60 leading-[1.55] mb-8">{page.hero.subtitle}</p>
              ) : null}
              {page.hero.cta ? (
                page.hero.cta.external ? (
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
                )
              ) : null}
            </div>
          </div>
        </section>

        {hasItems(page.features) ? (
          <section
            className="py-24 sm:py-28 border-t"
            style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border-dark)' }}
          >
            <div className="container">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {page.features.map((feature, index) => {
                  const Icon = resolveIcon(feature.icon)
                  return (
                    <article
                      key={`${feature.title}-${index}`}
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
                      <h3 className="text-xl font-semibold text-white mb-2.5">{feature.title}</h3>
                      <p className="text-[15px] leading-[1.7] text-white/65">{feature.description}</p>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
