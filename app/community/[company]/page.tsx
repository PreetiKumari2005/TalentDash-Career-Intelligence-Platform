import Link from 'next/link'
import { db } from '../../lib/db'

export default async function CommunityCompanyPage({
  params,
}: {
  params: Promise<{ company: string }>
}) {
  const { company: slug } = await params

  const company = await db.company.findUnique({
    where: { slug },
    include: {
      _count: { select: { salaries: true } },
    },
  })

  if (!company) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10">
        <p className="text-[#717171]">Company not found.</p>
        <Link href="/community" className="text-[#FF5A5F] text-sm">
          Back to Community
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-6">
        <Link
          href="/community"
          className="text-sm text-[#717171] hover:text-[#222222] transition-colors"
        >
          ← Back to Community
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 mb-6">
        <h1 className="text-2xl font-bold text-[#222222] mb-1">
          {company.name} Community
        </h1>
        <div className="flex items-center gap-3 text-sm text-[#717171]">
          {company.industry && <span>{company.industry}</span>}
          {company.headquarters && (
            <>
              <span>·</span>
              <span>{company.headquarters}</span>
            </>
          )}
          <span>·</span>
          <span>{company._count.salaries} salary records</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#EBEBEB] p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-[#F7F7F7] flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">💬</span>
        </div>
        <h2 className="text-lg font-semibold text-[#222222] mb-2">
          Community discussions coming soon
        </h2>
        <p className="text-sm text-[#717171] mb-6 max-w-sm mx-auto">
          Anonymous professional discussions about {company.name} will appear here.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href={`/companies/${slug}`}
            className="px-4 py-2 text-sm bg-[#FF5A5F] text-white rounded hover:bg-[#e04e53] transition-colors"
          >
            View Company Page
          </Link>
          <Link
            href={`/companies/${slug}/salaries`}
            className="px-4 py-2 text-sm border border-[#EBEBEB] text-[#484848] rounded hover:bg-[#F2F2F2] transition-colors"
          >
            View Salaries
          </Link>
        </div>
      </div>
    </div>
  )
}
