'use client'

import Accordion from '@/components/shared/Accordion'
import type { AccordionItem } from '@/components/shared/Accordion'
import type { FaqBlock } from '@/content/site'

function getIconClassName(isOpen: boolean): string {
  return isOpen ? 'border-white bg-white text-black' : 'border-white/20 bg-transparent text-white'
}

export default function FaqBlockView({ block }: { block: FaqBlock }) {
  if (!block.items || block.items.length === 0) return null

  const items: AccordionItem[] = block.items.map((item, index) => ({
    id: `faq-${index}`,
    question: item.question,
    answer: item.answer,
  }))

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: block.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Accordion
        items={items}
        title={block.title ?? 'Frequently asked questions'}
        subtitle={block.eyebrow ?? undefined}
        classNames={{
          section: 'bg-[var(--background)]',
          subtitle: 'text-white/50',
          title: 'text-white',
          border: 'border-white/10',
          button: 'focus-visible:ring-white/50',
          question: 'text-white',
          answer: 'text-white/50',
        }}
        iconClassName={getIconClassName}
      />
    </>
  )
}
