import { Header, TopBanner, Hero, Footer } from '@/components/landing'
import { Block } from '@/components/blocks'
import { SectionNumberContext } from '@/components/ui/SectionNumberContext'
import { site } from '@/content/site'
import { design } from '@/content/design'
import type { SectionBlock } from '@/content/site'

function hasEyebrow(block: SectionBlock): boolean {
  return 'eyebrow' in block && !!(block as { eyebrow?: string | null }).eyebrow
}

export default function Home() {
  const brandLabel = site.meta.brandName ?? 'Untitled Venture'
  const hasAnySection = site.home.sections.length > 0
  const showSectionNumbers = design.overrides?.showSectionNumbers ?? true

  let runningIndex = 0

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
          {site.home.sections.map((block, index) => {
            let value: number | null = null
            if (showSectionNumbers && hasEyebrow(block)) {
              runningIndex += 1
              value = runningIndex
            }
            return (
              <SectionNumberContext.Provider key={block.id ?? `block-${index}`} value={value}>
                <Block block={block} />
              </SectionNumberContext.Provider>
            )
          })}
        </main>
      ) : null}
      <Footer />
    </div>
  )
}
