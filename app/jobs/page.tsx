
import Link from 'next/link'
import { db } from '../../lib/db'

export const revalidate = 3600

export default async function JobsPage() {
  const companies = await db.company.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: { select: { salaries: true } },
    },
  })

  const roles = [
    'Software Engineer',
    'Product Manager',
    'Data Scientist',
    'ML Engineer',
    'Data Analyst',
    'Staff Engineer',
    'Principal Engineer',
    'AI Researcher',
  ]

  const locations = [
    'Bengaluru', 'Mumbai', 'Hyderabad',
    'Pune', 'Delhi', 'Chennai', 'Remote',
  ]

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#222222] mb-2">Jobs</h1>
        <p className="text-[#717171]">
          Explore roles at top companies with verified salary benchmarks
        </p>
      </div>

      {/* Search bar */}
      <div className="bg-white rounded-xl border border-[#EBEBEB] p-4 flex gap-3 mb-8">
        <input
          type="text"
          placeholder="Search role, company, or location..."
          className="flex-1 px-3 py-2 text-sm border border-[#EBEBEB] rounded focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/30"
        />
        <button className="px-5 py-2 bg-[#FF5A5F] text-white text-sm font-medium rounded hover:bg-[#e04e53] transition-colors">
          Search
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left — Companies */}
        <div className="col-span-2 space-y-4">
          <h2 className="text-base font-semibold text-[#222222]">
            Companies Hiring
          </h2>
          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-white rounded-xl border border-[#EBEBEB] p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg border border-[#EBEBEB] bg-[#F7F7F7] flex items-center justify-center">
                      <span className="text-sm font-bold text-[#717171]">
                        {company.name.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#222222]">
                        {company.name}
                      </h3>
                      <p className="text-xs text-[#717171]">
                        {company.industry} · {company.headquarters}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {roles.slice(0, 3).map((role) => (
                      <span
                        key={role}
                        className="px-2 py-1 bg-[#F7F7F7] text-[#484848] text-xs rounded"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#717171] mb-2">
                    {company._count.salaries} salary records
                  </p>
                  <Link
                    href={`/companies/${company.slug}`}
                    className="px-3 py-1.5 text-xs bg-[#FF5A5F] text-white rounded hover:bg-[#e04e53] transition-colors"
                  >
                    View Salaries
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right — Sidebar */}
        <div className="space-y-6">
          {/* Popular Roles */}
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-5">
            <h2 className="text-sm font-semibold text-[#222222] mb-3">
              Popular Roles
            </h2>
            <div className="space-y-2">
              {roles.map((role) => (
                <Link
                  key={role}
                  href={`/salaries?role=${encodeURIComponent(role)}`}
                  className="flex items-center justify-between text-sm text-[#484848] hover:text-[#FF5A5F] transition-colors py-1"
                >
                  <span>{role}</span>
                  <span className="text-[#717171]">→</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-5">
            <h2 className="text-sm font-semibold text-[#222222] mb-3">
              Top Locations
            </h2>
            <div className="flex flex-wrap gap-2">
              {locations.map((loc) => (
                <Link
                  key={loc}
                  href={`/salaries?location=${encodeURIComponent(loc)}`}
                  className="px-3 py-1 bg-[#F7F7F7] text-[#484848] text-xs rounded hover:bg-[#EBEBEB] transition-colors"
                >
                  {loc}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
