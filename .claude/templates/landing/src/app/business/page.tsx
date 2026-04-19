import { notFound } from 'next/navigation'
import BusinessView from './BusinessView'
import { site } from '@/content/site'

export async function generateMetadata() {
  const page = site.pages.business
  if (!page) return { robots: { index: false, follow: false } }
  return {
    title: `${page.hero.title} | ${site.meta.brandName ?? 'Venture'}`,
    description: page.hero.subtitle ?? undefined,
  }
}

export default function BusinessPage() {
  const page = site.pages.business
  if (!page) notFound()
  return <BusinessView page={page} />
}
