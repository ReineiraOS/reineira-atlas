'use client'

import Link from 'next/link'
import { Header, Footer } from '@/components/landing'
import { Block } from '@/components/blocks'
import type { PageConfig } from '@/content/site'

export default function PageView({ page }: { page: PageConfig }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <Header />
      <main>
        {page.hero ? (
          <section className="relative pt-28 sm:pt-32 lg:pt-40 pb-16 overflow-hidden">
            <div className="absolute inset-0 hero-backdrop pointer-events-none" aria-hidden="true" />
            <div className="container relative">
              <div className="max-w-3xl">
                {page.hero.eyebrow ? (
                  <p
                    className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] uppercase mb-4"
                    style={{ color: 'var(--accent)' }}
                  >
                    {page.hero.eyebrow}
                  </p>
                ) : null}
                <h1 className="text-[36px] sm:text-[52px] lg:text-[60px] font-semibold text-white leading-[1.08] tracking-[-0.03em] mb-6">
                  {page.hero.title}
                </h1>
                {page.hero.subtitle ? (
                  <p className="text-lg sm:text-xl lg:text-2xl text-white/60 leading-[1.5] max-w-2xl">
                    {page.hero.subtitle}
                  </p>
                ) : null}
                {page.hero.primaryCta ? (
                  <div className="mt-8">
                    {page.hero.primaryCta.external ? (
                      <a
                        href={page.hero.primaryCta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-7 py-3.5 text-[15px] font-medium rounded-full text-white transition-all hover:opacity-90"
                        style={{ backgroundColor: 'var(--accent)' }}
                      >
                        {page.hero.primaryCta.label}
                      </a>
                    ) : (
                      <Link
                        href={page.hero.primaryCta.href}
                        className="inline-flex items-center px-7 py-3.5 text-[15px] font-medium rounded-full text-white transition-all hover:opacity-90"
                        style={{ backgroundColor: 'var(--accent)' }}
                      >
                        {page.hero.primaryCta.label}
                      </Link>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        ) : null}

        {page.sections.map((block, index) => (
          <Block key={block.id ?? `block-${index}`} block={block} />
        ))}
      </main>
      <Footer />
    </div>
  )
}
