export type DirectionName = 'editorial'

export interface FontSpec {
  family: string
  googleFontQuery: string | null
}

export interface EditorialPreset {
  name: DirectionName
  fontDisplay: FontSpec
  fontSans: FontSpec
  fontMono: FontSpec
  radiusCard: string
  radiusButton: string
  sectionPadding: string
  displayWeight: number
  letterSpacingHero: string
  motionDuration: number
  motionEase: [number, number, number, number]
  viewportMarginPx: number
}

export const EDITORIAL: EditorialPreset = {
  name: 'editorial',
  fontDisplay: {
    family: "'Instrument Serif', 'Times New Roman', serif",
    googleFontQuery: 'Instrument+Serif:ital@0;1',
  },
  fontSans: {
    family:
      "'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
    googleFontQuery: 'Inter:wght@400;500;600;700',
  },
  fontMono: {
    family: "'JetBrains Mono', 'SF Mono', ui-monospace, monospace",
    googleFontQuery: 'JetBrains+Mono:wght@400;500;600',
  },
  radiusCard: '18px',
  radiusButton: '9999px',
  sectionPadding: '7rem',
  displayWeight: 400,
  letterSpacingHero: '-0.03em',
  motionDuration: 0.6,
  motionEase: [0.22, 1, 0.36, 1],
  viewportMarginPx: -60,
}

export function buildGoogleFontsHref(preset: EditorialPreset = EDITORIAL): string | null {
  const families = new Set<string>()
  if (preset.fontDisplay.googleFontQuery) families.add(preset.fontDisplay.googleFontQuery)
  if (preset.fontSans.googleFontQuery) families.add(preset.fontSans.googleFontQuery)
  if (preset.fontMono.googleFontQuery) families.add(preset.fontMono.googleFontQuery)
  if (families.size === 0) return null
  const params = [...families].map((q) => `family=${q}`).join('&')
  return `https://fonts.googleapis.com/css2?${params}&display=swap`
}
