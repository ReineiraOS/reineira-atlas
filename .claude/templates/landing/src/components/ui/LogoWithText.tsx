import { site } from '@/content/site'

interface LogoWithTextProps {
  height?: number
  className?: string
}

export default function LogoWithText({ height = 28, className = '' }: LogoWithTextProps) {
  const brandLabel = site.meta.brandName ?? 'Venture'
  const fontSize = Math.round(height * 0.72)

  return (
    <span
      className={`inline-flex items-center ${className}`}
      style={{ height, color: 'var(--foreground)' }}
      aria-label={brandLabel}
    >
      <span
        className="font-semibold tracking-[-0.02em] leading-none"
        style={{ fontSize }}
      >
        {brandLabel}
      </span>
    </span>
  )
}
