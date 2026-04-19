import type { Metadata, Viewport } from 'next'
import './globals.css'
import MotionProvider from '@/components/MotionProvider'
import ScrollProgress from '@/components/ui/ScrollProgress'
import { site } from '@/content/site'
import { design } from '@/content/design'
import { EDITORIAL, buildGoogleFontsHref } from '@/content/directions'
import { buildAccentScale, accentRgba } from '@/lib/accent-scale'

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
  const fontsHref = buildGoogleFontsHref(EDITORIAL)
  const scale = buildAccentScale(branding.accent)
  const noiseOpacity = design.overrides?.noiseOpacity ?? 0.06
  const orbOpacity = design.overrides?.accentOrbOpacity ?? 0.55

  const cssVars: Record<string, string> = {
    '--accent': branding.accent,
    '--accent-hover': scale['400'],
    '--accent-soft': branding.accentSoft ?? accentRgba(branding.accent, 0.12),
    '--accent-border': branding.accentBorder ?? accentRgba(branding.accent, 0.22),
    '--accent-glow': accentRgba(branding.accent, 0.18),
    '--accent-50': scale['50'],
    '--accent-100': scale['100'],
    '--accent-200': scale['200'],
    '--accent-300': scale['300'],
    '--accent-400': scale['400'],
    '--accent-500': scale['500'],
    '--accent-600': scale['600'],
    '--accent-700': scale['700'],
    '--accent-800': scale['800'],
    '--accent-900': scale['900'],
    '--background': branding.background ?? '#000000',
    '--foreground': branding.foreground ?? '#ffffff',
    '--font-sans': EDITORIAL.fontSans.family,
    '--font-mono': EDITORIAL.fontMono.family,
    '--font-display': EDITORIAL.fontDisplay.family,
    '--noise-opacity': String(noiseOpacity),
    '--accent-orb-opacity': String(orbOpacity),
  }
  if (design.overrides?.radiusCard) cssVars['--radius-card'] = design.overrides.radiusCard
  if (design.overrides?.radiusButton) cssVars['--radius-button'] = design.overrides.radiusButton

  return (
    <html lang="en">
      {fontsHref ? (
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link rel="stylesheet" href={fontsHref} />
        </head>
      ) : null}
      <body className="antialiased" style={cssVars as React.CSSProperties}>
        <MotionProvider>
          <ScrollProgress />
          {children}
        </MotionProvider>
      </body>
    </html>
  )
}
