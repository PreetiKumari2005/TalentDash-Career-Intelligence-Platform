import Link from 'next/link'
import { db } from '../../../../lib/db'

export default async function InterviewsRolePage({
  params,
}: {
  params: Promise<{ company: string; role: string }>
}) {
  const { company: slug, role } = await params
  const decodedRole = decodeURIComponent(role)

  const company = await db.company.findUnique({ where: { slug } })

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Link href={`/interviews/${slug}`} className="text-sm text-[#717171] hover:text-[#222222] mb-6 block">
        ← Back
      </Link>
      <h1 className="text-2xl font-bold text-[#222222] mb-2">
        {company?.name ?? slug} — {decodedRole} Interviews
      </h1>
      <div className="bg-white rounded-xl border border-[#EBEBEB] p-10 text-center mt-6">
        <span className="text-4xl mb-4 block">📝</span>
        <h2 className="text-lg font-semibold text-[#222222] mb-2">Coming soon</h2>
        <p className="text-sm text-[#717171]">
          {decodedRole} interview experiences will appear here.
        </p>
      </div>
    </div>
  )
}
