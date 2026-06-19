import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db } from '../../../../lib/db'
import { formatSalary } from '../../../../lib/format'
import { LEVEL_DISPLAY, LEVEL_BADGE_CLASS } from '../../../../types/enums'

export default async function CompanySalariesPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const company = await db.company.findUnique({
    where: { slug },
    include: {
      salaries: { orderBy: { totalCompensation: 'desc' } },
    },
  })

  if (!company) notFound()

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <Link href={`/companies/${slug}`} className="text-sm text-[#717171] hover:text-[#222222] mb-6 block">
        ← Back to {company.name}
      </Link>
      <h1 className="text-2xl font-bold text-[#222222] mb-6">
        {company.name} — All Salaries
      </h1>
      <div className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F7F7F7] border-b border-[#EBEBEB]">
                {['Role', 'Level', 'Location', 'Exp', 'Base', 'Bonus', 'Stock', 'Total TC'].map((h) => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold text-[#484848] uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {company.salaries.map((s) => (
                <tr key={s.id} className="border-b border-[#EBEBEB] hover:bg-[#F7F7F7] last:border-0">
                  <td className="px-4 py-3 text-sm text-[#484848]">{s.role}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${LEVEL_BADGE_CLASS[s.level] ?? 'bg-gray-100 text-gray-600'}`}>
                      {LEVEL_DISPLAY[s.level] ?? s.level}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#484848]">{s.location}</td>
                  <td className="px-4 py-3 text-sm text-[#484848]">{s.experienceYears}y</td>
                  <td className="px-4 py-3 text-sm text-[#484848]">{formatSalary(Number(s.baseSalary), s.currency)}</td>
                  <td className="px-4 py-3 text-sm text-[#484848]">{Number(s.bonus) > 0 ? formatSalary(Number(s.bonus), s.currency) : '—'}</td>
                  <td className="px-4 py-3 text-sm text-[#484848]">{Number(s.stock) > 0 ? formatSalary(Number(s.stock), s.currency) : '—'}</td>
                  <td className="px-4 py-3 text-base font-bold text-[#0369A1]">{formatSalary(Number(s.totalCompensation), s.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {company.salaries.length === 0 && (
            <div className="px-6 py-10 text-center text-[#717171]">No salary records yet.</div>
          )}
        </div>
      </div>
    </div>
  )
}
