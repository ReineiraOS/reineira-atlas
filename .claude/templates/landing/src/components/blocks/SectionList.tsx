'use client'

import Block from './Block'
import { SectionNumberContext } from '@/components/ui/SectionNumberContext'
import type { SectionBlock } from '@/content/site'

function hasEyebrow(block: SectionBlock): boolean {
  return 'eyebrow' in block && !!(block as { eyebrow?: string | null }).eyebrow
}

export default function SectionList({
  sections,
  showSectionNumbers = true,
}: {
  sections: SectionBlock[]
  showSectionNumbers?: boolean
}) {
  let runningIndex = 0
  return (
    <>
      {sections.map((block, index) => {
        let value: number | null = null
        if (showSectionNumbers && hasEyebrow(block)) {
          runningIndex += 1
          value = runningIndex
        }
        return (
          <SectionNumberContext.Provider key={block.id ?? `block-${index}`} value={value}>
            <Block block={block} />
          </SectionNumberContext.Provider>
        )
      })}
    </>
  )
}
