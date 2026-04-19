'use client'

import { site, hasItems } from '@/content/site'
import { resolveIcon } from '@/content/icons'

const DEFAULT_GRADIENTS = [
  'radial-gradient(ellipse at 20% 10%, var(--accent-soft-hover) 0%, transparent 55%), linear-gradient(135deg, #10131b 0%, #1a1f2e 100%)',
  'radial-gradient(ellipse at 80% 20%, var(--accent-soft) 0%, transparent 60%), linear-gradient(135deg, #0b0f17 0%, #13192a 100%)',
  'radial-gradient(ellipse at 50% 80%, var(--accent-soft) 0%, transparent 65%), linear-gradient(135deg, #0e1220 0%, #181f33 100%)',
  'radial-gradient(ellipse at 10% 90%, var(--accent-soft-hover) 0%, transparent 55%), linear-gradient(135deg, #0a0d15 0%, #151a27 100%)',
  'radial-gradient(ellipse at 90% 50%, var(--accent-soft) 0%, transparent 55%), linear-gradient(135deg, #0d111a 0%, #171d2b 100%)',
]

export default function Features() {
  const section = site.home.features
  if (!section || !hasItems(section.items)) return null

  return (
    <section id="features" className="relative bg-[var(--background)] py-28 sm:py-32 lg:py-36">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 lg:mb-20">
          {section.eyebrow ? (
            <p
              className="text-sm sm:text-base font-semibold tracking-widest uppercase mb-3 sm:mb-4"
              style={{ color: 'var(--accent)' }}
            >
              {section.eyebrow}
            </p>
          ) : null}
          <h2 className="text-[28px] sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight mb-4 sm:mb-5">
            {section.title}
          </h2>
          {section.subtitle ? (
            <p className="text-base sm:text-lg lg:text-xl leading-[1.6] max-w-2xl mx-auto text-[var(--text-muted)]">
              {section.subtitle}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7">
          {section.items.map((feature, index) => {
            const Icon = resolveIcon(feature.icon)
            const bg = feature.gradient ?? DEFAULT_GRADIENTS[index % DEFAULT_GRADIENTS.length]
            return (
              <article
                key={`${feature.title}-${index}`}
                className={`group relative p-8 sm:p-10 lg:p-12 transition-all duration-300 overflow-hidden flex flex-col justify-end
                  rounded-2xl border border-[var(--border-dark)]
                  ${index === 0 ? 'md:col-span-2 min-h-[280px] sm:min-h-[320px] lg:min-h-[380px]' : 'min-h-[240px] sm:min-h-[280px] lg:min-h-[320px]'}`}
                style={{ backgroundImage: bg }}
              >
                <div className="relative">
                  {Icon ? (
                    <div
                      className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center mb-4 rounded-lg transition-colors duration-300 text-white bg-white/10 group-hover:bg-white group-hover:text-black"
                    >
                      <Icon size={20} weight="duotone" />
                    </div>
                  ) : null}
                  <h3 className="text-xl sm:text-2xl font-semibold mb-3 tracking-[-0.01em] text-white">
                    {feature.title}
                  </h3>
                  <p className="text-[15px] sm:text-base leading-[1.7] text-white/70">{feature.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
