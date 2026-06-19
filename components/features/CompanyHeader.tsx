import Link from 'next/link'

interface Company {
  id: string
  name: string
  slug: string
  industry: string | null
  headquarters: string | null
  foundedYear: number | null
  headcountRange: string | null
}

interface CompanyHeaderProps {
  company: Company
  salaryCount?: number
  medianTc?: number
}

export function CompanyHeader({ company, salaryCount = 0, medianTc = 0 }: CompanyHeaderProps) {
  return (
    <div className="bg-white border border-[#EBEBEB] rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-4">
        {/* Logo placeholder */}
        <div className="w-14 h-14 rounded-xl border border-[#EBEBEB] bg-[#F7F7F7] flex items-center justify-center flex-shrink-0">
          <span className="text-lg font-bold text-[#717171]">
            {company.name.slice(0, 2).toUpperCase()}
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-[#222222]">{company.name}</h1>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-[#717171]">
            {company.industry && <span>{company.industry}</span>}
            {company.headquarters && (
              <>
                <span>·</span>
                <span>{company.headquarters}</span>
              </>
            )}
            {company.foundedYear && (
              <>
                <span>·</span>
                <span>Est. {company.foundedYear}</span>
              </>
            )}
            {company.headcountRange && (
              <>
                <span>·</span>
                <span>{company.headcountRange} employees</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {medianTc > 0 && (
          <div className="text-right mr-4">
            <p className="text-xl font-bold text-[#0369A1]">
              ₹{(medianTc / 100000).toFixed(1)}L
            </p>
            <p className="text-xs text-[#717171]">Median TC · {salaryCount} records</p>
          </div>
        )}
        <Link
          href={`/compare?c1=${company.slug}`}
          className="px-4 py-2 text-sm border border-[#EBEBEB] text-[#484848] rounded hover:bg-[#F2F2F2] transition-colors"
        >
          Compare →
        </Link>
      </div>
    </div>
  )
}
