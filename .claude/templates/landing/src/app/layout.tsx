import type { Metadata, Viewport } from 'next'
import './globals.css'
import MotionProvider from '@/components/MotionProvider'
import { site } from '@/content/site'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: site.branding.background ?? '#000000',
}

export const metadata: Metadata = {
  metadataBase: site.meta.siteUrl ? new URL(site.meta.siteUrl) : undefined,
  title: site.meta.title ?? 'Untitled Venture',
  description: site.meta.description ?? undefined,
  keywords: site.meta.keywords,
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: { url: '/favicon.svg', sizes: '180x180' },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: site.meta.title
    ? {
        title: site.meta.title,
        description: site.meta.description ?? undefined,
        type: 'website',
        url: site.meta.siteUrl ?? undefined,
        siteName: site.meta.brandName ?? site.meta.title,
        locale: 'en_US',
      }
    : undefined,
  twitter: site.meta.twitterHandle
    ? {
        card: 'summary_large_image',
        title: site.meta.title ?? undefined,
        description: site.meta.description ?? undefined,
        creator: site.meta.twitterHandle,
        site: site.meta.twitterHandle,
      }
    : undefined,
  alternates: site.meta.siteUrl ? { canonical: site.meta.siteUrl } : undefined,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { branding } = site
  const cssVars: Record<string, string> = {
    '--accent': branding.accent,
    '--accent-hover': branding.accent,
    '--accent-soft': branding.accentSoft ?? 'rgba(255,255,255,0.08)',
    '--accent-border': branding.accentSoft ?? 'rgba(255,255,255,0.14)',
    '--accent-glow': branding.accentSoft ?? 'rgba(255,255,255,0.14)',
    '--background': branding.background ?? '#000000',
    '--foreground': branding.foreground ?? '#ffffff',
  }
  if (branding.fontSans) cssVars['--font-sans'] = branding.fontSans
  if (branding.fontMono) cssVars['--font-mono'] = branding.fontMono

  return (
    <html lang="en">
      <body className="antialiased" style={cssVars as React.CSSProperties}>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
