import {
  ShieldCheck,
  Lock,
  Wallet,
  CurrencyCircleDollar,
  Lightning,
  Code,
  Vault,
  Brain,
  Plant,
  Truck,
  ChartLineUp,
  Stack,
  Globe,
  Handshake,
  Scales,
  DeviceMobile,
  EnvelopeSimple,
  X,
  TelegramLogo,
  GithubLogo,
  LinkedinLogo,
  DiscordLogo,
  Article,
  BookOpen,
  type Icon as IconComponent,
} from '@phosphor-icons/react'

import type { IconName } from './site'

const MAP: Record<IconName, IconComponent> = {
  'shield-check': ShieldCheck,
  lock: Lock,
  wallet: Wallet,
  currency: CurrencyCircleDollar,
  lightning: Lightning,
  code: Code,
  vault: Vault,
  brain: Brain,
  plant: Plant,
  truck: Truck,
  chart: ChartLineUp,
  stack: Stack,
  globe: Globe,
  handshake: Handshake,
  scales: Scales,
  'device-mobile': DeviceMobile,
  envelope: EnvelopeSimple,
  x: X,
  telegram: TelegramLogo,
  github: GithubLogo,
  linkedin: LinkedinLogo,
  discord: DiscordLogo,
  article: Article,
  book: BookOpen,
}

export function resolveIcon(name: IconName | null | undefined): IconComponent | null {
  if (!name) return null
  return MAP[name] ?? null
}
