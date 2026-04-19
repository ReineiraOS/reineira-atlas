import { site } from '@/content/site'

interface LogoProps {
  size?: number
  variant?: 'with-background' | 'icon-only'
  className?: string
}

export default function Logo({ size = 40, variant = 'with-background', className = '' }: LogoProps) {
  const initial = site.branding.faviconInitial ?? site.meta.brandName?.charAt(0).toUpperCase() ?? 'V'
  const accent = site.branding.accent
  const fg = site.branding.foreground ?? '#ffffff'
  const brandLabel = site.meta.brandName ?? 'Venture'

  if (variant === 'icon-only') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label={`${brandLabel} logo`}
        role="img"
      >
        <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="3" fill="none" />
        <text
          x="32"
          y="42"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="28"
          fontWeight="600"
          fill="currentColor"
        >
          {initial}
        </text>
      </svg>
    )
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={`${brandLabel} logo`}
      role="img"
    >
      <rect width="64" height="64" rx="14" fill={accent} />
      <text
        x="32"
        y="42"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="30"
        fontWeight="600"
        fill={fg}
      >
        {initial}
      </text>
    </svg>
  )
}
