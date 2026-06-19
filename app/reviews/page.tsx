import Link from 'next/link'
import { db } from '../../lib/db'
import { computeMedian } from '../../lib/salary'

export const revalidate = 7200

export default async function ReviewsPage() {
  const companies = await db.company.findMany({
    orderBy: { name: 'asc' },
    include: {
      salaries: {
        select: { totalCompensation: true },
      },
      _count: {
        select: { salaries: true },
      },
    },
  })

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#222222] mb-2">Company Reviews</h1>
        <p className="text-[#717171]">
          Explore what it is like to work at top companies in India
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {companies.map((company) => {
          const tcValues = company.salaries.map((s) => Number(s.totalCompensation))
          const medianTc = computeMedian(tcValues)

          return (
            <div
              key={company.id}
              className="bg-white rounded-xl border border-[#EBEBEB] p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[#222222] mb-1">
                    {company.name}
                  </h2>
                  <div className="flex items-center gap-3 text-xs text-[#717171] mb-3">
                    {company.industry && <span>{company.industry}</span>}
                    {company.headquarters && (
                      <>
                        <span>·</span>
                        <span>{company.headquarters}</span>
                      </>
                    )}
                    {company.headcountRange && (
                      <>
                        <span>·</span>
                        <span>{company.headcountRange} employees</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-[#484848]">
                    {company._count.salaries} salary records ·{' '}
                    Median TC:{' '}
                    <span className="font-semibold text-[#0369A1]">
                      {medianTc > 0
                        ? `₹${(medianTc / 100000).toFixed(1)}L`
                        : 'N/A'}
                    </span>
                  </p>
                </div>

                <div className="flex flex-col gap-2 items-end">
                  <Link
                    href={`/companies/${company.slug}`}
                    className="px-3 py-1.5 text-xs font-medium bg-[#FF5A5F] text-white rounded hover:bg-[#e04e53] transition-colors"
                  >
                    View Company
                  </Link>
                  <Link
                    href={`/companies/${company.slug}/salaries`}
                    className="px-3 py-1.5 text-xs font-medium border border-[#EBEBEB] text-[#484848] rounded hover:bg-[#F2F2F2] transition-colors"
                  >
                    View Salaries
                  </Link>
                </div>
              </div>

              {/* Culture tags */}
              <div className="flex gap-2 mt-4 flex-wrap">
                {company.foundedYear && (
                  <span className="px-2 py-1 bg-[#F7F7F7] text-[#717171] text-xs rounded">
                    Founded {company.foundedYear}
                  </span>
                )}
                <span className="px-2 py-1 bg-[#F7F7F7] text-[#717171] text-xs rounded">
                  {company._count.salaries} data points
                </span>
                <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded">
                  Verified Data
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {companies.length === 0 && (
        <div className="text-center py-20">
          <p className="text-[#717171]">No company data available yet.</p>
        </div>
      )}
    </div>
  )
}