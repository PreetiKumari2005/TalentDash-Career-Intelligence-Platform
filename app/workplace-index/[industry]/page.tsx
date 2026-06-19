import Link from 'next/link'
import { db } from '../../../lib/db'
import { computeMedian } from '../../../lib/salary'

export default async function WorkplaceIndexIndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>
}) {
  const { industry } = await params
  const decodedIndustry = decodeURIComponent(industry)

  const companies = await db.company.findMany({
    where: { industry: { contains: decodedIndustry, mode: 'insensitive' } },
    include: {
      salaries: { select: { totalCompensation: true } },
      _count: { select: { salaries: true } },
    },
  })

  const ranked = companies
    .map((c) => {
      const tcValues = c.salaries.map((s) => Number(s.totalCompensation))
      return { ...c, medianTc: computeMedian(tcValues) }
    })
    .sort((a, b) => b.medianTc - a.medianTc)

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Link
        href="/workplace-index"
        className="text-sm text-[#717171] hover:text-[#222222] mb-6 block"
      >
        ← Back to Workplace Index
      </Link>
      <h1 className="text-3xl font-bold text-[#222222] mb-2">
        {decodedIndustry} Companies
      </h1>
      <p className="text-[#717171] mb-8">{ranked.length} companies found</p>
      <div className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden">
        {ranked.map((company, index) => (
          <Link
            key={company.id}
            href={`/companies/${company.slug}`}
            className="flex items-center justify-between px-6 py-4 border-b border-[#EBEBEB] hover:bg-[#F7F7F7] transition-colors last:border-0"
          >
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold text-[#EBEBEB] w-8">#{index + 1}</span>
              <div>
                <p className="font-semibold text-[#222222]">{company.name}</p>
                <p className="text-xs text-[#717171]">{company._count.salaries} records</p>
              </div>
            </div>
            <p className="font-bold text-[#0369A1]">
              {company.medianTc > 0
                ? `₹${(company.medianTc / 100000).toFixed(1)}L`
                : 'N/A'}
            </p>
          </Link>
        ))}
        {ranked.length === 0 && (
          <div className="px-6 py-10 text-center text-[#717171]">
            No companies found for this industry.
          </div>
        )}
      </div>
    </div>
  )
}
