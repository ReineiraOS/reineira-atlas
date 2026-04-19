import { notFound } from 'next/navigation'
import ContactView from './ContactView'
import { site } from '@/content/site'

export async function generateMetadata() {
  const page = site.pages.contact
  if (!page) return { robots: { index: false, follow: false } }
  return {
    title: `${page.hero.title} | ${site.meta.brandName ?? 'Venture'}`,
    description: page.hero.subtitle ?? undefined,
  }
}

export default function ContactPage() {
  const page = site.pages.contact
  if (!page) notFound()
  return <ContactView page={page} />
}
