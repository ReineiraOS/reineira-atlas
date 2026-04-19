export type IconName =
  | 'shield-check'
  | 'lock'
  | 'wallet'
  | 'currency'
  | 'lightning'
  | 'code'
  | 'vault'
  | 'brain'
  | 'plant'
  | 'truck'
  | 'chart'
  | 'stack'
  | 'globe'
  | 'handshake'
  | 'scales'
  | 'device-mobile'
  | 'envelope'
  | 'x'
  | 'telegram'
  | 'github'
  | 'linkedin'
  | 'discord'
  | 'article'
  | 'book'

export interface CtaConfig {
  label: string
  href: string
  external?: boolean
}

export interface MetaConfig {
  siteUrl: string | null
  brandName: string | null
  title: string | null
  description: string | null
  keywords?: string[]
  ogImageAlt?: string | null
  twitterHandle?: string | null
}

export interface BrandingConfig {
  accent: string
  accentSoft?: string
  background?: string
  foreground?: string
  fontSans?: string
  fontMono?: string
  faviconInitial?: string
}

export interface HeroConfig {
  eyebrow?: string | null
  title: string
  subtitle?: string | null
  primaryCta?: CtaConfig | null
  secondaryCta?: CtaConfig | null
}

export interface TopBannerConfig {
  text: string
  href?: string | null
}

export interface TrustedByConfig {
  eyebrow?: string | null
  title?: string | null
  items: string[]
}

export interface MetricItem {
  value: string
  label: string
  caption?: string | null
}
export interface MetricsSection {
  eyebrow?: string | null
  title?: string | null
  items: MetricItem[]
}

export interface ProblemSection {
  eyebrow?: string | null
  title: string
  body: string
}

export interface FeatureItem {
  title: string
  description: string
  icon?: IconName | null
  gradient?: string | null
}
export interface FeaturesSection {
  eyebrow?: string | null
  title: string
  subtitle?: string | null
  items: FeatureItem[]
}

export interface HowItWorksStep {
  title: string
  description: string
}
export interface HowItWorksSection {
  eyebrow?: string | null
  title: string
  subtitle?: string | null
  outro?: string | null
  steps: HowItWorksStep[]
}

export interface ProductItem {
  title: string
  description: string
  href?: string | null
  cta?: string | null
  icon?: IconName | null
}
export interface ProductsSection {
  eyebrow?: string | null
  title: string
  subtitle?: string | null
  items: ProductItem[]
}

export interface ProtocolFlowStep {
  title: string
  description: string
}
export interface ProtocolFlowSection {
  eyebrow?: string | null
  title: string
  subtitle?: string | null
  steps: ProtocolFlowStep[]
}

export interface BusinessModelRow {
  segment: string
  fee: string
  volume?: string | null
  notes?: string | null
}
export interface BusinessModelSection {
  eyebrow?: string | null
  title: string
  subtitle?: string | null
  rows: BusinessModelRow[]
}

export interface FiveYearItem {
  year: string
  milestone: string
  target?: string | null
}
export interface FiveYearArcSection {
  eyebrow?: string | null
  title: string
  subtitle?: string | null
  items: FiveYearItem[]
}

export interface CompetitiveAdvantageItem {
  claim: string
  proof: string
}
export interface CompetitiveAdvantageSection {
  eyebrow?: string | null
  title: string
  subtitle?: string | null
  items: CompetitiveAdvantageItem[]
}

export interface FaqItem {
  question: string
  answer: string
}
export interface FaqSection {
  eyebrow?: string | null
  title: string
  items: FaqItem[]
}

export interface CtaSection {
  title: string
  subtitle?: string | null
  primary?: CtaConfig | null
  secondary?: CtaConfig | null
}

export interface FooterLink {
  label: string
  href: string
  external?: boolean
}
export interface FooterGroup {
  title: string
  links: FooterLink[]
}
export interface SocialLink {
  label: string
  href: string
  icon: IconName
}
export interface FooterConfig {
  tagline?: string | null
  groups: FooterGroup[]
  social: SocialLink[]
  copyrightSuffix?: string | null
}

export interface HeaderNavItem {
  label: string
  href?: string
  items?: Array<{
    label: string
    description?: string
    href: string
    icon?: IconName
    external?: boolean
  }>
}
export interface HeaderConfig {
  nav: HeaderNavItem[]
  primaryCta?: CtaConfig | null
  secondaryCta?: CtaConfig | null
}

export interface BusinessPageConfig {
  hero: {
    eyebrow?: string | null
    title: string
    subtitle?: string | null
    cta?: CtaConfig | null
  }
  segments?: Array<{ title: string; description: string; icon?: IconName | null }> | null
  trust?: {
    title?: string | null
    stats: Array<{ value: string; label: string }>
  } | null
  compliance?: {
    title: string
    bullets: string[]
  } | null
  faq?: FaqSection | null
  cta?: CtaSection | null
}

export interface MobilePageConfig {
  hero: {
    eyebrow?: string | null
    title: string
    subtitle?: string | null
    cta?: CtaConfig | null
  }
  features?: Array<{ title: string; description: string; icon?: IconName | null }> | null
  faq?: FaqSection | null
  cta?: CtaSection | null
}

export interface PricingPlan {
  name: string
  price: string
  priceSuffix?: string | null
  description?: string | null
  features: string[]
  cta?: CtaConfig | null
  featured?: boolean
}
export interface PricingPageConfig {
  hero: {
    eyebrow?: string | null
    title: string
    subtitle?: string | null
  }
  plans: PricingPlan[]
  faq?: FaqSection | null
}

export interface ContactPageConfig {
  hero: {
    title: string
    subtitle?: string | null
  }
  channels: Array<{
    label: string
    value: string
    href: string
    icon?: IconName | null
  }>
}

export interface LegalPageConfig {
  title: string
  updatedAt?: string | null
  body: string
}

export interface CustomPageSection {
  kind: 'text' | 'cards' | 'stats' | 'steps' | 'table'
  title?: string | null
  subtitle?: string | null
  body?: string | null
  items?: Array<Record<string, string>> | null
}
export interface CustomPageConfig {
  slug: string
  label: string
  hero: {
    eyebrow?: string | null
    title: string
    subtitle?: string | null
  }
  sections: CustomPageSection[]
}

export interface SiteConfig {
  meta: MetaConfig
  branding: BrandingConfig
  header: HeaderConfig
  footer: FooterConfig
  topBanner: TopBannerConfig | null
  home: {
    hero: HeroConfig | null
    trustedBy: TrustedByConfig | null
    metrics: MetricsSection | null
    problem: ProblemSection | null
    features: FeaturesSection | null
    howItWorks: HowItWorksSection | null
    products: ProductsSection | null
    protocolFlow: ProtocolFlowSection | null
    businessModel: BusinessModelSection | null
    fiveYearArc: FiveYearArcSection | null
    competitiveAdvantage: CompetitiveAdvantageSection | null
    faq: FaqSection | null
    cta: CtaSection | null
  }
  pages: {
    business: BusinessPageConfig | null
    mobile: MobilePageConfig | null
    pricing: PricingPageConfig | null
    contact: ContactPageConfig | null
    privacy: LegalPageConfig | null
    terms: LegalPageConfig | null
  }
  customPages: CustomPageConfig[]
}

export const site: SiteConfig = {
  meta: {
    siteUrl: null,
    brandName: null,
    title: null,
    description: null,
    keywords: [],
    ogImageAlt: null,
    twitterHandle: null,
  },
  branding: {
    accent: '#3b8bff',
    accentSoft: 'rgba(59, 139, 255, 0.12)',
    background: '#000000',
    foreground: '#ffffff',
    fontSans:
      "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontMono: "'SF Mono', ui-monospace, monospace",
    faviconInitial: 'V',
  },
  header: {
    nav: [],
    primaryCta: null,
    secondaryCta: null,
  },
  footer: {
    tagline: null,
    groups: [],
    social: [],
    copyrightSuffix: null,
  },
  topBanner: null,
  home: {
    hero: null,
    trustedBy: null,
    metrics: null,
    problem: null,
    features: null,
    howItWorks: null,
    products: null,
    protocolFlow: null,
    businessModel: null,
    fiveYearArc: null,
    competitiveAdvantage: null,
    faq: null,
    cta: null,
  },
  pages: {
    business: null,
    mobile: null,
    pricing: null,
    contact: null,
    privacy: null,
    terms: null,
  },
  customPages: [],
}

export function isPageEnabled(page: unknown): boolean {
  return page !== null && page !== undefined
}

export function hasItems<T>(list: T[] | null | undefined): list is T[] {
  return Array.isArray(list) && list.length > 0
}
