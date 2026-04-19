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
  tagline?: string | null
  title: string | null
  description: string | null
  keywords?: string[]
  ogImageAlt?: string | null
  twitterHandle?: string | null
}

export interface BrandingConfig {
  accent: string
  accentSoft?: string
  accentBorder?: string
  background?: string
  foreground?: string
  fontSans?: string
  fontMono?: string
}

export interface HeroConfig {
  eyebrow?: string | null
  title: string
  subtitle?: string | null
  tagline?: string | null
  primaryCta?: CtaConfig | null
  secondaryCta?: CtaConfig | null
}

export interface TopBannerConfig {
  text: string
  href?: string | null
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

export interface BlockBase {
  id?: string
  eyebrow?: string | null
  title?: string | null
  subtitle?: string | null
}

export interface ProseBlock extends BlockBase {
  kind: 'prose'
  body: string
  tone?: 'neutral' | 'accent' | 'muted'
  layout?: 'center' | 'wide' | 'two-col'
}

export interface StatStripItem {
  value: string
  label: string
  footnote?: string | null
}
export interface StatStripBlock extends BlockBase {
  kind: 'stat-strip'
  items: StatStripItem[]
  tone?: 'banner' | 'inline' | 'bordered'
}

export interface BulletItem {
  title: string
  description?: string | null
  icon?: IconName | null
}
export interface BulletsBlock extends BlockBase {
  kind: 'bullets'
  items: BulletItem[]
  layout?: 'grid' | 'list'
}

export interface StepItem {
  title: string
  description: string
}
export interface StepsBlock extends BlockBase {
  kind: 'steps'
  items: StepItem[]
  numbering?: 'decimal' | 'alpha' | 'none'
}

export interface CardItem {
  title: string
  description: string
  icon?: IconName | null
  badge?: string | null
  href?: string | null
}
export interface CardsBlock extends BlockBase {
  kind: 'cards'
  items: CardItem[]
  columns?: 2 | 3 | 4
}

export type ComparisonMark = 'yes' | 'no' | 'partial' | 'roadmap' | string
export interface ComparisonColumn {
  key: string
  label: string
  highlight?: boolean
}
export interface ComparisonRow {
  label: string
  values: Record<string, ComparisonMark>
}
export interface ComparisonBlock extends BlockBase {
  kind: 'comparison'
  columns: ComparisonColumn[]
  rows: ComparisonRow[]
}

export interface DataCell {
  value: string
  emphasis?: 'primary' | 'mono' | 'badge' | 'muted'
  badgeTone?: 'neutral' | 'accent' | 'warning'
}
export interface DataGridBlock extends BlockBase {
  kind: 'data-grid'
  headers: string[]
  rows: DataCell[][]
  caption?: string | null
}

export interface TimelineItem {
  label: string
  title: string
  description?: string | null
  target?: string | null
}
export interface TimelineBlock extends BlockBase {
  kind: 'timeline'
  items: TimelineItem[]
}

export interface TaglineBlock extends BlockBase {
  kind: 'tagline'
  body: string
  footnotes?: string[]
  label?: string | null
}

export interface CtaBlock extends BlockBase {
  kind: 'cta'
  primary?: CtaConfig | null
  secondary?: CtaConfig | null
}

export interface FaqItem {
  question: string
  answer: string
}
export interface FaqBlock extends BlockBase {
  kind: 'faq'
  items: FaqItem[]
}

export interface ContactItem {
  label: string
  value: string
  href: string
  icon?: IconName | null
}
export interface ContactBlock extends BlockBase {
  kind: 'contact'
  items: ContactItem[]
}

export interface LegalBlock extends BlockBase {
  kind: 'legal'
  updatedAt?: string | null
  body: string
}

export type SectionBlock =
  | ProseBlock
  | StatStripBlock
  | BulletsBlock
  | StepsBlock
  | CardsBlock
  | ComparisonBlock
  | DataGridBlock
  | TimelineBlock
  | TaglineBlock
  | CtaBlock
  | FaqBlock
  | ContactBlock
  | LegalBlock

export interface PageConfig {
  title: string
  description?: string | null
  hero?: HeroConfig | null
  sections: SectionBlock[]
}

export interface SiteConfig {
  meta: MetaConfig
  branding: BrandingConfig
  header: HeaderConfig
  footer: FooterConfig
  topBanner: TopBannerConfig | null
  home: {
    hero: HeroConfig | null
    sections: SectionBlock[]
  }
  pages: Record<string, PageConfig | null>
}

export const site: SiteConfig = {
  meta: {
    siteUrl: null,
    brandName: null,
    tagline: null,
    title: null,
    description: null,
    keywords: [],
    ogImageAlt: null,
    twitterHandle: null,
  },
  branding: {
    accent: '#3b8bff',
    accentSoft: 'rgba(59, 139, 255, 0.12)',
    accentBorder: 'rgba(59, 139, 255, 0.22)',
    background: '#000000',
    foreground: '#ffffff',
    fontSans:
      "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontMono: "'SF Mono', ui-monospace, monospace",
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
    sections: [],
  },
  pages: {},
}

export function hasItems<T>(list: T[] | null | undefined): list is T[] {
  return Array.isArray(list) && list.length > 0
}

export function isPageEnabled(page: PageConfig | null | undefined): page is PageConfig {
  return page !== null && page !== undefined
}
