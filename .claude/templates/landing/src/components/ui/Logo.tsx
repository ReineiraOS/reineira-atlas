import { site } from '@/content/site'

interface LogoProps {
  size?: number
  className?: string
}

export default function Logo({ size = 40, className = '' }: LogoProps) {
  const brandLabel = site.meta.brandName ?? 'Venture'
  return (
    <span
      className={`inline-flex items-center font-semibold tracking-[-0.02em] leading-none ${className}`}
      style={{ fontSize: size, color: 'currentColor' }}
      aria-label={brandLabel}
    >
      {brandLabel}
    </span>
  )
}
