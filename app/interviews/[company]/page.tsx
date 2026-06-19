import Link from 'next/link'
import { db } from '../../../lib/db'

export default async function InterviewsCompanyPage({
  params,
}: {
  params: Promise<{ company: string }>
}) {
  const { company: slug } = await params

  const company = await db.company.findUnique({ where: { slug } })

  if (!company) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10">
        <p className="text-[#717171]">Company not found.</p>
        <Link href="/interviews" className="text-[#FF5A5F] text-sm">← Back</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Link href="/interviews" className="text-sm text-[#717171] hover:text-[#222222] mb-6 block">
        ← Back to Interviews
      </Link>
      <h1 className="text-2xl font-bold text-[#222222] mb-2">
        {company.name} Interviews
      </h1>
      <div className="bg-white rounded-xl border border-[#EBEBEB] p-10 text-center mt-6">
        <span className="text-4xl mb-4 block">📝</span>
        <h2 className="text-lg font-semibold text-[#222222] mb-2">Coming soon</h2>
        <p className="text-sm text-[#717171]">
          Interview experiences for {company.name} will appear here.
        </p>
      </div>
    </div>
  )
}
