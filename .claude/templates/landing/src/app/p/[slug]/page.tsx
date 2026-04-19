import { notFound } from 'next/navigation'
import CustomPageView from './CustomPageView'
import { site } from '@/content/site'

export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = site.customPages.map((p) => ({ slug: p.slug }))
  return slugs.length > 0 ? slugs : [{ slug: '_placeholder' }]
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = site.customPages.find((p) => p.slug === slug)
  if (!page) return { robots: { index: false, follow: false } }
  return {
    title: `${page.hero.title} | ${site.meta.brandName ?? 'Venture'}`,
    description: page.hero.subtitle ?? undefined,
  }
}

export default async function CustomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = site.customPages.find((p) => p.slug === slug)
  if (!page) notFound()
  return <CustomPageView page={page} />
}
