'use client'

import { Header, Footer } from '@/components/landing'
import { hasItems, type ContactPageConfig } from '@/content/site'
import { resolveIcon } from '@/content/icons'

export default function ContactView({ page }: { page: ContactPageConfig }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <Header />
      <main>
        <section className="relative pt-28 sm:pt-32 lg:pt-40 pb-24 overflow-hidden">
          <div className="absolute inset-0 hero-backdrop pointer-events-none" aria-hidden="true" />
          <div className="container relative">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-[36px] sm:text-[52px] lg:text-[60px] font-semibold text-white leading-[1.08] tracking-[-0.03em] mb-6">
                {page.hero.title}
              </h1>
              {page.hero.subtitle ? (
                <p className="text-lg text-white/60 leading-[1.55]">{page.hero.subtitle}</p>
              ) : null}
            </div>

            {hasItems(page.channels) ? (
              <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto gap-4 sm:gap-5">
                {page.channels.map((channel, index) => {
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
                        <p className="text-xs uppercase tracking-[0.18em] text-white/45 mb-1">{channel.label}</p>
                        <p className="text-[15px] sm:text-base text-white font-medium truncate">{channel.value}</p>
                      </div>
                    </a>
                  )
                })}
              </div>
            ) : null}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
