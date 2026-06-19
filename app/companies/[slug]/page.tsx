import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db } from '../../../lib/db'
import { computeMedian, computeLevelDistribution } from '../../../lib/salary'
import { formatSalary } from '../../../lib/format'
import { LEVEL_DISPLAY, LEVEL_BADGE_CLASS } from '../../../types/enums'

export async function generateStaticParams() {
  const companies = await db.company.findMany({ select: { slug: true } })
  return companies.map((c) => ({ slug: c.slug }))
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const company = await db.company.findUnique({
    where: { slug },
    include: {
      salaries: { orderBy: { totalCompensation: 'desc' } },
      _count: { select: { salaries: true } },
    },
  })

  if (!company) notFound()

  const tcValues = company.salaries.map((s) => Number(s.totalCompensation))
  const medianTc = computeMedian(tcValues)
  const levelDist = computeLevelDistribution(company.salaries.map((s) => s.level))
  const totalLevels = Object.values(levelDist).reduce((a, b) => a + b, 0)

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#222222] mb-1">{company.name}</h1>
            <div className="flex items-center gap-3 text-sm text-[#717171]">
              {company.industry && <span>{company.industry}</span>}
              {company.headquarters && <><span>·</span><span>{company.headquarters}</span></>}
              {company.foundedYear && <><span>·</span><span>Est. {company.foundedYear}</span></>}
              {company.headcountRange && <><span>·</span><span>{company.headcountRange} employees</span></>}
            </div>
          </div>
          <Link
            href={`/compare?c1=${slug}`}
            className="px-4 py-2 text-sm border border-[#EBEBEB] text-[#484848] rounded hover:bg-[#F2F2F2] transition-colors"
          >
            Compare →
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-4 text-center">
          <p className="text-2xl font-bold text-[#0369A1]">
            {medianTc > 0 ? formatSalary(medianTc, 'INR') : 'N/A'}
          </p>
          <p className="text-xs text-[#717171] mt-1">Median Total TC</p>
        </div>
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-4 text-center">
          <p className="text-2xl font-bold text-[#222222]">{company._count.salaries}</p>
          <p className="text-xs text-[#717171] mt-1">Salary Records</p>
        </div>
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-4 text-center">
          <p className="text-2xl font-bold text-[#222222]">
            {tcValues.length ? formatSalary(Math.max(...tcValues), 'INR') : 'N/A'}
          </p>
          <p className="text-xs text-[#717171] mt-1">Highest TC</p>
        </div>
      </div>

      {/* Level Distribution */}
      {totalLevels > 0 && (
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-5 mb-6">
          <h2 className="text-sm font-semibold text-[#222222] mb-3">Level Distribution</h2>
          <div className="flex rounded-full overflow-hidden h-3 mb-3">
            {Object.entries(levelDist).map(([level, count]) => (
              <div
                key={level}
                style={{ width: `${(count / totalLevels) * 100}%` }}
                className="bg-[#0369A1] opacity-70 first:opacity-100"
                title={`${LEVEL_DISPLAY[level] ?? level}: ${count}`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(levelDist).map(([level, count]) => (
              <span
                key={level}
                className={`px-2 py-0.5 rounded text-xs font-medium ${LEVEL_BADGE_CLASS[level] ?? 'bg-gray-100 text-gray-600'}`}
              >
                {LEVEL_DISPLAY[level] ?? level}: {count}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Salary Table */}
      <div className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#EBEBEB]">
          <h2 className="text-base font-semibold text-[#222222]">Salary Records</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F7F7F7] border-b border-[#EBEBEB]">
                {['Role', 'Level', 'Location', 'Exp', 'Base', 'Stock', 'Total TC'].map((h) => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold text-[#484848] uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {company.salaries.map((s) => (
                <tr key={s.id} className="border-b border-[#EBEBEB] hover:bg-[#F7F7F7] transition-colors last:border-0">
                  <td className="px-4 py-3 text-sm text-[#484848]">{s.role}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${LEVEL_BADGE_CLASS[s.level] ?? 'bg-gray-100 text-gray-600'}`}>
                      {LEVEL_DISPLAY[s.level] ?? s.level}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#484848]">{s.location}</td>
                  <td className="px-4 py-3 text-sm text-[#484848]">{s.experienceYears}y</td>
                  <td className="px-4 py-3 text-sm text-[#484848]">{formatSalary(Number(s.baseSalary), s.currency)}</td>
                  <td className="px-4 py-3 text-sm text-[#484848]">{Number(s.stock) > 0 ? formatSalary(Number(s.stock), s.currency) : '—'}</td>
                  <td className="px-4 py-3 text-base font-bold text-[#0369A1]">{formatSalary(Number(s.totalCompensation), s.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
