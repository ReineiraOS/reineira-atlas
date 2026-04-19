'use client'

import { useSyncExternalStore, useState } from 'react'
import Link from 'next/link'
import { X } from '@phosphor-icons/react'
import { site } from '@/content/site'

const STORAGE_KEY = 'venture-banner-dismissed'

function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}

export default function TopBanner() {
  const banner = site.topBanner
  const mounted = useIsMounted()
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === 'undefined') return false
    return sessionStorage.getItem(STORAGE_KEY) === 'true'
  })

  const handleDismiss = () => {
    setDismissed(true)
    sessionStorage.setItem(STORAGE_KEY, 'true')
  }

  if (!banner || !mounted || dismissed) return null

  const isExternal = banner.href?.startsWith('http')

  const label = (
    <span className="text-[13px] font-medium hover:opacity-80 transition-opacity inline-flex items-center gap-1">
      {banner.text}
      {banner.href ? (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="inline-block ml-0.5">
          <path
            d="M5 8H11M11 8L8.5 5.5M11 8L8.5 10.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </span>
  )

  return (
    <div className="sticky top-0 z-[60] text-white border-b border-white/[0.06]" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="container flex items-center justify-center h-10">
        {banner.href ? (
          isExternal ? (
            <a href={banner.href} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          ) : (
            <Link href={banner.href}>{label}</Link>
          )
        ) : (
          label
        )}
      </div>
      <button
        onClick={handleDismiss}
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 p-2 flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer"
        aria-label="Dismiss banner"
      >
        <X size={14} weight="light" />
      </button>
    </div>
  )
}
