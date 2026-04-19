'use client'

import { Header, Footer } from '@/components/landing'
import type { CustomPageConfig, CustomPageSection } from '@/content/site'

function Section({ section }: { section: CustomPageSection }) {
  return (
    <section className="py-20 sm:py-24" style={{ backgroundColor: 'var(--background)' }}>
      <div className="container">
        <div className="max-w-3xl mb-8">
          {section.title ? (
            <h2 className="text-[26px] sm:text-[34px] font-semibold text-white leading-[1.15] tracking-tight mb-3">
              {section.title}
            </h2>
          ) : null}
          {section.subtitle ? <p className="text-base sm:text-lg text-white/60">{section.subtitle}</p> : null}
        </div>

        {section.kind === 'text' && section.body ? (
          <div className="max-w-3xl text-[15px] sm:text-base leading-[1.75] text-white/70 whitespace-pre-line">
            {section.body}
          </div>
        ) : null}

        {section.kind === 'cards' && section.items && section.items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {section.items.map((item, i) => (
              <article
                key={i}
                className="rounded-2xl p-7 border"
                style={{ backgroundColor: 'var(--color-surface-card)', borderColor: 'var(--border-dark)' }}
              >
                {item.title ? <h3 className="text-lg font-semibold text-white mb-2.5">{item.title}</h3> : null}
                {item.description ? <p className="text-[15px] leading-[1.7] text-white/65">{item.description}</p> : null}
              </article>
            ))}
          </div>
        ) : null}

        {section.kind === 'stats' && section.items && section.items.length > 0 ? (
          <div
            className={`grid gap-8 ${section.items.length >= 4 ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'}`}
          >
            {section.items.map((item, i) => (
              <div key={i}>
                <p className="mono text-[36px] font-semibold" style={{ color: 'var(--accent)' }}>
                  {item.value}
                </p>
                <p className="text-sm uppercase tracking-[0.15em] text-white/60 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        ) : null}

        {section.kind === 'steps' && section.items && section.items.length > 0 ? (
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
            {section.items.map((item, i) => (
              <li key={i}>
                <p className="mono text-sm font-semibold mb-2" style={{ color: 'var(--accent)' }}>
                  {String(i + 1).padStart(2, '0')}
                </p>
                {item.title ? <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3> : null}
                {item.description ? <p className="text-[15px] text-white/65 leading-[1.7]">{item.description}</p> : null}
              </li>
            ))}
          </ol>
        ) : null}

        {section.kind === 'table' && section.items && section.items.length > 0 ? (
          <div
            className="max-w-4xl rounded-2xl overflow-hidden border"
            style={{ borderColor: 'var(--border-dark)' }}
          >
            <table className="w-full">
              <thead>
                <tr
                  className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/50"
                  style={{ backgroundColor: 'var(--color-surface-card)' }}
                >
                  {Object.keys(section.items[0]).map((h) => (
                    <th key={h} className="text-left px-5 py-4">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.items.map((row, i) => (
                  <tr key={i} className="border-t" style={{ borderColor: 'var(--border-dark)' }}>
                    {Object.values(row).map((v, j) => (
                      <td key={j} className="px-5 py-4 text-white/80">
                        {String(v)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default function CustomPageView({ page }: { page: CustomPageConfig }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <Header />
      <main>
        <section className="relative pt-28 sm:pt-32 lg:pt-40 pb-16 overflow-hidden">
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
              <h1 className="text-[36px] sm:text-[52px] lg:text-[60px] font-semibold text-white leading-[1.08] tracking-[-0.03em] mb-6">
                {page.hero.title}
              </h1>
              {page.hero.subtitle ? (
                <p className="text-lg sm:text-xl text-white/60 leading-[1.55] max-w-2xl">{page.hero.subtitle}</p>
              ) : null}
            </div>
          </div>
        </section>

        {page.sections.map((section, index) => (
          <Section key={index} section={section} />
        ))}
      </main>
      <Footer />
    </div>
  )
}
