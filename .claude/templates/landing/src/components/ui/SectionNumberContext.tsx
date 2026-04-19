'use client'

import { createContext, useContext } from 'react'

export const SectionNumberContext = createContext<number | null>(null)

export function useSectionNumber(): number | null {
  return useContext(SectionNumberContext)
}
