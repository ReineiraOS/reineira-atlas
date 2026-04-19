'use client'

import Link from 'next/link'
import { LogoWithText } from '@/components/ui'
import { Footer } from '@/components/landing'

interface LegalLayoutProps {
  title: string
  lastUpdated?: string | null
  body: string
}

export default function LegalLayout({ title, lastUpdated, body }: LegalLayoutProps) {
  const blocks = body
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean)

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <header className="fixed top-0 left-0 right-0 z-50 header-backdrop">
        <nav className="container flex items-center justify-between h-16 sm:h-[72px]">
          <Link href="/">
            <LogoWithText height={26} />
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </nav>
      </header>

      <main className="pt-20 sm:pt-24">
        <div className="container pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-12 lg:pb-16 border-b border-white/[0.06]">
          <p className="text-[13px] font-medium text-white/40 uppercase tracking-wider mb-4">Legal</p>
          <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-medium text-white tracking-tight leading-[1.1] mb-4">
            {title}
          </h1>
          {lastUpdated ? <p className="text-[15px] text-white/40">Last updated: {lastUpdated}</p> : null}
        </div>

        <div className="container py-10 sm:py-12 lg:py-16">
          <article className="max-w-[720px] mx-auto">
            <div className="legal-content space-y-5">
              {blocks.map((block, index) => {
                if (block.startsWith('## ')) {
                  return (
                    <h2 key={index}>{block.replace(/^##\s+/, '')}</h2>
                  )
                }
                if (block.startsWith('### ')) {
                  return (
                    <h3 key={index}>{block.replace(/^###\s+/, '')}</h3>
                  )
                }
                return <p key={index}>{block}</p>
              })}
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  )
}
