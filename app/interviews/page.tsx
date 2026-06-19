import Link from 'next/link'
import { db } from '../../lib/db'

export const revalidate = 3600

export default async function InterviewsPage() {
  const companies = await db.company.findMany({
    orderBy: { name: 'asc' },
    select: { id: true, name: true, slug: true, industry: true },
  })

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#222222] mb-2">Interview Experiences</h1>
      <p className="text-[#717171] mb-8">Real interview experiences by company and role</p>
      <div className="grid grid-cols-1 gap-3">
        {companies.map((c) => (
          <Link
            key={c.id}
            href={`/interviews/${c.slug}`}
            className="bg-white rounded-xl border border-[#EBEBEB] px-5 py-4 hover:shadow-md transition-shadow flex items-center justify-between"
          >
            <div>
              <span className="font-medium text-[#222222]">{c.name}</span>
              {c.industry && (
                <span className="ml-3 text-xs text-[#717171]">{c.industry}</span>
              )}
            </div>
            <span className="text-[#FF5A5F] text-sm">View →</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
