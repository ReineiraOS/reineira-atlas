import { notFound } from 'next/navigation'
import LegalLayout from '@/components/legal/LegalLayout'
import { site } from '@/content/site'

export async function generateMetadata() {
  const page = site.pages.terms
  if (!page) return { robots: { index: false, follow: false } }
  return {
    title: `${page.title} | ${site.meta.brandName ?? 'Venture'}`,
  }
}

export default function TermsPage() {
  const page = site.pages.terms
  if (!page) notFound()

  return <LegalLayout title={page.title} lastUpdated={page.updatedAt ?? undefined} body={page.body} />
}
