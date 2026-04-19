import { notFound } from 'next/navigation'
import PageView from './PageView'
import { site } from '@/content/site'

export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = Object.entries(site.pages)
    .filter(([, page]) => page !== null && page !== undefined)
    .map(([slug]) => ({ slug }))
  return slugs.length > 0 ? slugs : [{ slug: '_placeholder' }]
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = site.pages[slug]
  if (!page) return { robots: { index: false, follow: false } }
  return {
    title: `${page.title} | ${site.meta.brandName ?? 'Venture'}`,
    description: page.description ?? undefined,
  }
}

export default async function UniversalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = site.pages[slug]
  if (!page) notFound()
  return <PageView page={page} />
}
