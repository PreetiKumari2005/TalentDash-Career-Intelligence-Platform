import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db } from '../../../../lib/db'

export default async function CompanyInterviewsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const company = await db.company.findUnique({ where: { slug } })

  if (!company) notFound()

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Link href={`/companies/${slug}`} className="text-sm text-[#717171] hover:text-[#222222] mb-6 block">
        ← Back to {company.name}
      </Link>
      <h1 className="text-2xl font-bold text-[#222222] mb-2">
        {company.name} Interview Experiences
      </h1>
      <p className="text-[#717171] mb-8">Real interview experiences from candidates</p>
      <div className="bg-white rounded-xl border border-[#EBEBEB] p-10 text-center">
        <span className="text-4xl mb-4 block">📝</span>
        <h2 className="text-lg font-semibold text-[#222222] mb-2">Interview data coming soon</h2>
        <p className="text-sm text-[#717171] mb-6">
          Interview experiences for {company.name} will appear here.
        </p>
        <Link
          href={`/companies/${slug}`}
          className="px-4 py-2 text-sm bg-[#FF5A5F] text-white rounded hover:bg-[#e04e53] transition-colors"
        >
          View Company Page
        </Link>
      </div>
    </div>
  )
}
