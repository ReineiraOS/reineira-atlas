'use client'

import type { SectionBlock } from '@/content/site'
import ProseBlockView from './ProseBlock'
import StatStripBlockView from './StatStripBlock'
import BulletsBlockView from './BulletsBlock'
import StepsBlockView from './StepsBlock'
import CardsBlockView from './CardsBlock'
import ComparisonBlockView from './ComparisonBlock'
import DataGridBlockView from './DataGridBlock'
import TimelineBlockView from './TimelineBlock'
import TaglineBlockView from './TaglineBlock'
import CtaBlockView from './CtaBlock'
import FaqBlockView from './FaqBlock'
import ContactBlockView from './ContactBlock'
import LegalBlockView from './LegalBlock'

export default function Block({ block }: { block: SectionBlock }) {
  switch (block.kind) {
    case 'prose':
      return <ProseBlockView block={block} />
    case 'stat-strip':
      return <StatStripBlockView block={block} />
    case 'bullets':
      return <BulletsBlockView block={block} />
    case 'steps':
      return <StepsBlockView block={block} />
    case 'cards':
      return <CardsBlockView block={block} />
    case 'comparison':
      return <ComparisonBlockView block={block} />
    case 'data-grid':
      return <DataGridBlockView block={block} />
    case 'timeline':
      return <TimelineBlockView block={block} />
    case 'tagline':
      return <TaglineBlockView block={block} />
    case 'cta':
      return <CtaBlockView block={block} />
    case 'faq':
      return <FaqBlockView block={block} />
    case 'contact':
      return <ContactBlockView block={block} />
    case 'legal':
      return <LegalBlockView block={block} />
    default:
      return null
  }
}
