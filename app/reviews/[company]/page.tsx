import Link from 'next/link'
import { db } from '../../../lib/db'

export const revalidate = 7200

export default async function ReviewsCompanyPage({
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
        <Link href="/reviews" className="text-[#FF5A5F] text-sm">
          ← Back to Reviews
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Link
        href="/reviews"
        className="text-sm text-[#717171] hover:text-[#222222] mb-6 block"
      >
        ← Back to Reviews
      </Link>

      <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 mb-6">
        <h1 className="text-2xl font-bold text-[#222222] mb-1">
          {company.name} Reviews
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

      <div className="bg-white rounded-xl border border-[#EBEBEB] p-10 text-center">
        <span className="text-4xl mb-4 block">⭐</span>
        <h2 className="text-lg font-semibold text-[#222222] mb-2">
          Reviews coming soon
        </h2>
        <p className="text-sm text-[#717171] mb-6 max-w-sm mx-auto">
          Anonymous employee reviews for {company.name} will appear here.
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
