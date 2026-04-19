import { Header, TopBanner, Hero, Footer } from '@/components/landing'
import { Block } from '@/components/blocks'
import { site } from '@/content/site'

export default function Home() {
  const brandLabel = site.meta.brandName ?? 'Untitled Venture'
  const hasAnySection = site.home.sections.length > 0

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <TopBanner />
      <Header />
      {site.home.hero ? (
        <Hero />
      ) : (
        <section className="relative pt-40 pb-40 text-center" style={{ backgroundColor: 'var(--background)' }}>
          <div className="container">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-white/40 mb-4">Template</p>
            <h1 className="text-[36px] sm:text-[48px] font-semibold text-white/80 mb-4">{brandLabel}</h1>
            <p className="text-white/40 max-w-md mx-auto">
              Populate <code className="mono text-white/60">src/content/site.ts</code> from the venture brief to
              activate sections.
            </p>
          </div>
        </section>
      )}
      {hasAnySection ? (
        <main>
          {site.home.sections.map((block, index) => (
            <Block key={block.id ?? `block-${index}`} block={block} />
          ))}
        </main>
      ) : null}
      <Footer />
    </div>
  )
}
