import { notFound } from 'next/navigation'
import MobileView from './MobileView'
import { site } from '@/content/site'

export async function generateMetadata() {
  const page = site.pages.mobile
  if (!page) return { robots: { index: false, follow: false } }
  return {
    title: `${page.hero.title} | ${site.meta.brandName ?? 'Venture'}`,
    description: page.hero.subtitle ?? undefined,
  }
}

export default function MobilePage() {
  const page = site.pages.mobile
  if (!page) notFound()
  return <MobileView page={page} />
}
