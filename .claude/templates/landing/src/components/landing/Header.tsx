'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import Link from 'next/link'
import { CaretDown, X } from '@phosphor-icons/react'
import { LogoWithText } from '@/components/ui'
import { useScrolled } from '@/hooks/useScrolled'
import { useScrollLock } from '@/hooks/useScrollLock'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { site } from '@/content/site'
import { resolveIcon } from '@/content/icons'

const HEADER_SCROLLED_STYLE = {
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderBottom: '1px solid var(--border-dark)',
}

const HEADER_DEFAULT_STYLE = {
  backgroundColor: 'transparent',
  backdropFilter: 'blur(0px)',
  WebkitBackdropFilter: 'blur(0px)',
  borderBottom: '1px solid var(--border-dark)',
}

function DropdownMenu({
  items,
  isOpen,
}: {
  items: NonNullable<(typeof site.header.nav)[number]['items']>
  isOpen: boolean
}) {
  return (
    <div
      className={`absolute top-full left-0 pt-3 transition-all duration-200 ${
        isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
      }`}
    >
      <div
        className="rounded-2xl border border-white/[0.06] p-2 min-w-[320px]"
        style={{
          backgroundColor: 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: '0 16px 48px rgba(0, 0, 0, 0.4)',
        }}
      >
        {items.map((item) => {
          const Icon = resolveIcon(item.icon)
          const content = (
            <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-white/[0.04] transition-colors group/item">
              {Icon ? (
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.06] text-white/50 group-hover/item:text-white group-hover/item:bg-white/[0.1] transition-colors shrink-0 mt-0.5">
                  <Icon size={18} weight="light" />
                </div>
              ) : null}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white mb-0.5 flex items-center gap-1.5">
                  {item.label}
                  {item.external && (
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="text-white/30">
                      <path
                        d="M3 9L9 3M9 3H4.5M9 3V7.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </p>
                {item.description && <p className="text-[13px] text-white/50 leading-snug">{item.description}</p>}
              </div>
            </div>
          )

          if (item.external) {
            return (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                {content}
              </a>
            )
          }
          return (
            <Link key={item.label} href={item.href}>
              {content}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default function Header() {
  const { nav, primaryCta, secondaryCta } = site.header
  const brandLabel = site.meta.brandName ?? 'Venture'
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null)
  const isScrolled = useScrolled(50)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const previousIsMenuOpenRef = useRef(false)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useScrollLock(isMenuOpen)
  useEscapeKey(
    useCallback(() => {
      if (openDropdown) {
        setOpenDropdown(null)
      } else {
        setIsMenuOpen(false)
      }
    }, [openDropdown])
  )

  useEffect(() => {
    if (isMenuOpen) {
      const menu = menuRef.current
      if (menu) {
        const focusable = menu.querySelectorAll<HTMLElement>(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length > 0) focusable[0].focus()
      }
    } else if (previousIsMenuOpenRef.current) {
      hamburgerRef.current?.focus()
    }
    previousIsMenuOpenRef.current = isMenuOpen
  }, [isMenuOpen])

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    }
  }, [])

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    setOpenDropdown(label)
  }

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null)
    }, 150)
  }

  const handleLinkClick = () => {
    setIsMenuOpen(false)
    setOpenDropdown(null)
  }

  const toggleMobileSection = (label: string) => {
    setMobileExpandedSection(mobileExpandedSection === label ? null : label)
  }

  const renderCta = (cta: typeof primaryCta, variant: 'primary' | 'secondary', onClick?: () => void) => {
    if (!cta) return null
    const className =
      variant === 'primary'
        ? 'px-5 py-2.5 text-sm font-medium rounded-full transition-all cursor-pointer text-white'
        : 'px-5 py-2.5 text-sm font-medium rounded-full transition-colors text-white/70 hover:text-white border border-white/20 hover:border-white/40'
    const style: React.CSSProperties | undefined =
      variant === 'primary' ? { backgroundColor: 'var(--accent)' } : undefined
    if (cta.external) {
      return (
        <a href={cta.href} target="_blank" rel="noopener noreferrer" className={className} style={style} onClick={onClick}>
          {cta.label}
        </a>
      )
    }
    return (
      <Link href={cta.href} className={className} style={style} onClick={onClick}>
        {cta.label}
      </Link>
    )
  }

  const hasNav = nav.length > 0
  const hasCtas = Boolean(primaryCta || secondaryCta)

  return (
    <>
      <header
        className="sticky top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300"
        style={isScrolled ? HEADER_SCROLLED_STYLE : HEADER_DEFAULT_STYLE}
      >
        <nav className="container flex items-center h-[72px]" aria-label="Main navigation">
          <Link href="/" className="flex items-center shrink-0" aria-label={`${brandLabel} Home`}>
            <LogoWithText height={26} />
          </Link>

          {hasNav ? (
            <div className="hidden lg:flex items-center gap-1 ml-8">
              {nav.map((item) => {
                if (item.href) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="px-4 py-2.5 text-sm font-medium transition-colors rounded-lg hover:bg-white/5 text-white/60 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  )
                }

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => handleDropdownEnter(item.label)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button
                      className="flex items-center gap-1 px-4 py-2.5 text-sm font-medium transition-colors rounded-lg hover:bg-white/5 text-white/60 hover:text-white cursor-pointer"
                      aria-expanded={openDropdown === item.label}
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    >
                      {item.label}
                      <CaretDown
                        size={14}
                        weight="light"
                        className={`transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {item.items && item.items.length > 0 ? (
                      <DropdownMenu items={item.items} isOpen={openDropdown === item.label} />
                    ) : null}
                  </div>
                )
              })}
            </div>
          ) : null}

          {hasCtas ? (
            <div className="hidden lg:flex items-center gap-3 ml-auto">
              {renderCta(secondaryCta, 'secondary')}
              {renderCta(primaryCta, 'primary')}
            </div>
          ) : null}

          {hasNav || hasCtas ? (
            <button
              ref={hamburgerRef}
              className="lg:hidden ml-auto flex items-center justify-center w-11 h-11 rounded-lg transition-colors hover:bg-white/5"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="relative w-5 h-4">
                <span
                  className={`absolute left-0 w-5 h-0.5 bg-white transition-all duration-300 ease-out ${
                    isMenuOpen ? 'top-[7px] rotate-45' : 'top-0 rotate-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] w-5 h-0.5 bg-white transition-all duration-300 ease-out ${
                    isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                  }`}
                />
                <span
                  className={`absolute left-0 w-5 h-0.5 bg-white transition-all duration-300 ease-out ${
                    isMenuOpen ? 'top-[7px] -rotate-45' : 'top-[14px] rotate-0'
                  }`}
                />
              </div>
            </button>
          ) : null}
        </nav>
      </header>

      {(hasNav || hasCtas) && (
        <div
          ref={menuRef}
          id="mobile-menu"
          className={`fixed inset-0 z-[60] lg:hidden transition-transform duration-300 ease-out bg-[var(--color-surface-elevated)] ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          aria-hidden={!isMenuOpen}
        >
          <div className="flex items-center justify-between px-5 sm:px-6 h-[72px] border-b border-white/[0.06]">
            <Link href="/" onClick={handleLinkClick} aria-label={`${brandLabel} Home`}>
              <LogoWithText height={24} />
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center w-11 h-11 rounded-full transition-colors bg-white/[0.06] cursor-pointer"
              aria-label="Close menu"
            >
              <X size={18} weight="light" />
            </button>
          </div>

          <nav className="px-5 sm:px-6 pt-6 overflow-y-auto max-h-[calc(100vh-72px)]">
            {nav.map((item) => {
              if (item.href) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={handleLinkClick}
                    className="block py-3.5 text-lg font-medium text-white transition-opacity hover:opacity-70"
                  >
                    {item.label}
                  </Link>
                )
              }

              const isExpanded = mobileExpandedSection === item.label
              return (
                <div key={item.label} className="border-b border-white/[0.06]">
                  <button
                    onClick={() => toggleMobileSection(item.label)}
                    className="flex items-center justify-between w-full py-3.5 text-lg font-medium text-white cursor-pointer"
                  >
                    {item.label}
                    <CaretDown
                      size={18}
                      weight="light"
                      className={`text-white/40 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isExpanded && item.items && (
                    <div className="pb-3 pl-1 space-y-1">
                      {item.items.map((subItem) => {
                        const SubIcon = resolveIcon(subItem.icon)
                        const content = (
                          <div className="flex items-center gap-3 py-2.5 px-3 rounded-xl">
                            {SubIcon ? (
                              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/[0.06] text-white/40 shrink-0">
                                <SubIcon size={18} weight="light" />
                              </div>
                            ) : null}
                            <div>
                              <p className="text-[15px] font-medium text-white/80">{subItem.label}</p>
                              {subItem.description && <p className="text-xs text-white/50">{subItem.description}</p>}
                            </div>
                          </div>
                        )

                        if (subItem.external) {
                          return (
                            <a
                              key={subItem.label}
                              href={subItem.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={handleLinkClick}
                            >
                              {content}
                            </a>
                          )
                        }
                        return (
                          <Link key={subItem.label} href={subItem.href} onClick={handleLinkClick}>
                            {content}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}

            {hasCtas ? (
              <div className="mt-8 pt-6 space-y-4 border-t border-white/[0.06]">
                {renderCta(primaryCta, 'primary', handleLinkClick)}
                {renderCta(secondaryCta, 'secondary', handleLinkClick)}
              </div>
            ) : null}
          </nav>
        </div>
      )}
    </>
  )
}
