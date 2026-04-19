import { site } from '@/content/site'

interface LogoWithTextProps {
  height?: number
  className?: string
}

export default function LogoWithText({ height = 32, className = '' }: LogoWithTextProps) {
  const initial = site.branding.faviconInitial ?? site.meta.brandName?.charAt(0).toUpperCase() ?? 'V'
  const brandLabel = site.meta.brandName ?? 'Venture'
  const accent = site.branding.accent
  const markSize = Math.round(height * 0.95)

  return (
    <span
      className={`inline-flex items-center gap-2.5 ${className}`}
      style={{ height }}
      aria-label={brandLabel}
    >
      <svg
        width={markSize}
        height={markSize}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-hidden="true"
      >
        <rect width="64" height="64" rx="14" fill={accent} />
        <text
          x="32"
          y="42"
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontSize="30"
          fontWeight="600"
          fill="#ffffff"
        >
          {initial}
        </text>
      </svg>
      <span
        className="font-semibold tracking-tight"
        style={{ fontSize: Math.round(height * 0.58), color: 'currentColor' }}
      >
        {brandLabel}
      </span>
    </span>
  )
}
