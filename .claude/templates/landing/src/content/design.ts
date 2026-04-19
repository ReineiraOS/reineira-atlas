export interface DesignConfig {
  rationale?: string
  overrides?: {
    radiusCard?: string
    radiusButton?: string
    noiseOpacity?: number
    accentOrbOpacity?: number
    showSectionNumbers?: boolean
  }
}

export const design: DesignConfig = {
  rationale:
    'Editorial direction: analytical pitch-deck aesthetic with Instrument Serif display + Inter body. Applied across all ventures for consistent institutional tone.',
}
