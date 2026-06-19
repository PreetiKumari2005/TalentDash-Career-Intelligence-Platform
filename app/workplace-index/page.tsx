import Link from 'next/link'
import { db } from '../../lib/db'
import { computeMedian } from '../../lib/salary'

export const revalidate = 3600

export default async function WorkplaceIndexPage() {
  const companies = await db.company.findMany({
    orderBy: { name: 'asc' },
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
      <h1 className="text-3xl font-bold text-[#222222] mb-2">Workplace Index</h1>
      <p className="text-[#717171] mb-8">Companies ranked by median total compensation</p>
      <div className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden">
        {ranked.map((company, index) => (
          <Link
            key={company.id}
            href={`/companies/${company.slug}`}
            className="flex items-center justify-between px-6 py-4 border-b border-[#EBEBEB] hover:bg-[#F7F7F7] transition-colors last:border-0"
          >
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold text-[#EBEBEB] w-8">
                #{index + 1}
              </span>
              <div>
                <p className="font-semibold text-[#222222]">{company.name}</p>
                <p className="text-xs text-[#717171]">
                  {company.industry} · {company._count.salaries} records
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-[#0369A1]">
                {company.medianTc > 0
                  ? `₹${(company.medianTc / 100000).toFixed(1)}L`
                  : 'N/A'}
              </p>
              <p className="text-xs text-[#717171]">Median TC</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
