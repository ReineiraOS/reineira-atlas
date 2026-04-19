import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header, Footer } from '@/components/landing'
import { site, hasItems } from '@/content/site'

export async function generateMetadata() {
  const page = site.pages.pricing
  if (!page) return { robots: { index: false, follow: false } }
  return {
    title: `${page.hero.title} | ${site.meta.brandName ?? 'Venture'}`,
    description: page.hero.subtitle ?? undefined,
  }
}

export default function PricingPage() {
  const page = site.pages.pricing
  if (!page) notFound()

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <Header />
      <main>
        <section className="relative pt-28 sm:pt-32 lg:pt-40 pb-16 text-center overflow-hidden">
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
                <p className="text-lg sm:text-xl text-white/60 leading-[1.55]">{page.hero.subtitle}</p>
              ) : null}
            </div>
          </div>
        </section>

        {hasItems(page.plans) ? (
          <section
            className="py-16 sm:py-24 border-t"
            style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border-dark)' }}
          >
            <div className="container">
              <div
                className={`grid gap-5 sm:gap-6 ${
                  page.plans.length === 2
                    ? 'md:grid-cols-2 max-w-4xl mx-auto'
                    : page.plans.length === 3
                      ? 'md:grid-cols-3'
                      : 'md:grid-cols-2 lg:grid-cols-4'
                }`}
              >
                {page.plans.map((plan, index) => (
                  <article
                    key={`${plan.name}-${index}`}
                    className="rounded-2xl p-7 sm:p-8 border flex flex-col"
                    style={{
                      backgroundColor: plan.featured
                        ? 'var(--color-surface-elevated)'
                        : 'var(--color-surface-card)',
                      borderColor: plan.featured ? 'var(--accent-border)' : 'var(--border-dark)',
                      ...(plan.featured ? { boxShadow: '0 0 0 1px var(--accent-border) inset' } : {}),
                    }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                    {plan.description ? <p className="text-sm text-white/55 mb-5">{plan.description}</p> : null}
                    <div className="flex items-baseline gap-1.5 mb-6">
                      <p className="mono text-[36px] font-semibold text-white">{plan.price}</p>
                      {plan.priceSuffix ? <span className="text-sm text-white/50">{plan.priceSuffix}</span> : null}
                    </div>
                    {hasItems(plan.features) ? (
                      <ul className="space-y-2.5 mb-8 flex-1">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex gap-3 text-[14px] text-white/75 leading-snug">
                            <span
                              className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                              style={{ backgroundColor: 'var(--accent)' }}
                              aria-hidden="true"
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {plan.cta ? (
                      plan.cta.external ? (
                        <a
                          href={plan.cta.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-5 py-3 rounded-full text-sm font-medium transition-all"
                          style={
                            plan.featured
                              ? { backgroundColor: 'var(--accent)', color: '#fff' }
                              : {
                                  color: '#fff',
                                  border: '1px solid var(--border-dark-hover)',
                                  backgroundColor: 'transparent',
                                }
                          }
                        >
                          {plan.cta.label}
                        </a>
                      ) : (
                        <Link
                          href={plan.cta.href}
                          className="inline-flex items-center justify-center px-5 py-3 rounded-full text-sm font-medium transition-all"
                          style={
                            plan.featured
                              ? { backgroundColor: 'var(--accent)', color: '#fff' }
                              : {
                                  color: '#fff',
                                  border: '1px solid var(--border-dark-hover)',
                                  backgroundColor: 'transparent',
                                }
                          }
                        >
                          {plan.cta.label}
                        </Link>
                      )
                    ) : null}
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
