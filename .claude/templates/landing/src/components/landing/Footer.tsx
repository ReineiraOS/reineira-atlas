'use client'

import Link from 'next/link'
import { LogoWithText } from '@/components/ui'
import { resolveIcon } from '@/content/icons'
import { site, hasItems } from '@/content/site'

const CURRENT_YEAR = new Date().getFullYear()

function FooterLink({ href, external, children }: { href: string; external?: boolean; children: React.ReactNode }) {
  const className = 'text-[14px] text-white/50 hover:text-white transition-colors duration-200'
  if (external ?? href.startsWith('http')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

function FooterGroupBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-white/50 mb-4">{title}</h3>
      <ul className="space-y-3">{children}</ul>
    </div>
  )
}

export default function Footer() {
  const { footer, meta } = site
  const brandLabel = meta.brandName ?? 'Venture'
  const hasGroups = hasItems(footer.groups)
  const hasSocial = hasItems(footer.social)

  return (
    <footer className="border-t" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border-dark)' }}>
      <div className="container">
        <div className="pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-14 lg:pb-16">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-[28%] shrink-0 mb-12 lg:mb-0">
              <Link href="/" className="inline-block" aria-label={`${brandLabel} Home`}>
                <LogoWithText height={26} />
              </Link>
              {footer.tagline ? (
                <p className="mt-5 text-sm leading-relaxed text-white/50 max-w-xs">{footer.tagline}</p>
              ) : null}
            </div>

            {hasGroups ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 lg:gap-x-12 gap-y-10 flex-1">
                {footer.groups.map((group) => (
                  <div key={group.title}>
                    <FooterGroupBlock title={group.title}>
                      {group.links.map((link) => (
                        <li key={link.label}>
                          <FooterLink href={link.href} external={link.external}>
                            {link.label}
                          </FooterLink>
                        </li>
                      ))}
                    </FooterGroupBlock>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="py-6 border-t border-white/[0.06] flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          {hasSocial ? (
            <div className="flex items-center gap-2.5">
              {footer.social.map((social) => {
                const Icon = resolveIcon(social.icon)
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow on ${social.label}`}
                    className="w-11 h-11 flex items-center justify-center text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {Icon ? <Icon size={18} weight="regular" /> : social.label}
                  </a>
                )
              })}
            </div>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-4 sm:gap-6 text-[12px] text-white/40">
            <span>
              &copy; {CURRENT_YEAR} {brandLabel}
              {footer.copyrightSuffix ? `. ${footer.copyrightSuffix}` : '.'}
            </span>
            {site.pages['terms'] ? (
              <Link href="/terms" className="hover:text-white/50 transition-colors">
                Terms
              </Link>
            ) : null}
            {site.pages['privacy'] ? (
              <Link href="/privacy" className="hover:text-white/50 transition-colors">
                Privacy
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  )
}
