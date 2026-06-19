import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db } from '../../../lib/db'

export const revalidate = 3600

const MOCK_INTERVIEWS = [
  {
    id: 1,
    role: "Software Development Engineer (SDE-2)",
    date: "Feb 2026",
    difficulty: "Hard",
    difficultyColor: "bg-red-50 text-red-700 border-red-200",
    outcome: "Offered",
    outcomeColor: "bg-green-50 text-green-700 border-green-200",
    experience: "The process took about 4 weeks. Standard 1 Online Assessment (OA) followed by 4 rounds of virtual onsite interviews. A heavy emphasis was placed on core engineering problem-solving and leadership scenarios.",
    rounds: [
      { name: "Round 1: Online Assessment", details: "Two technical coding questions + behavioral assessment." },
      { name: "Round 2: Coding & Logical Design", details: "Focus on object-oriented design patterns and deep dive into data structures." },
      { name: "Round 3: System Design", details: "Design a highly available distributed metric monitoring system." },
      { name: "Round 4: Core & Architecture", details: "Deep architecture validation drill down along with an engineering graph challenge." }
    ]
  }
]

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function CompanyInterviewsPage({ params }: PageProps) {
  const resolvedParams = await params
  
  // Fetch the company profile matching the current URL slug
  const company = await db.company.findFirst({
    where: { slug: resolvedParams.slug },
    select: { name: true, industry: true }
  })

  // Throw a 404 screen if a user types a company slug that doesn't exist in your DB
  if (!company) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Link 
        href="/interviews" 
        className="text-sm text-[#717171] hover:text-[#222222] transition-colors inline-flex items-center gap-1 mb-4"
      >
        ← Back to Interviews
      </Link>

      <h1 className="text-3xl font-bold text-[#222222] mb-2">{company.name} Interviews</h1>
      <p className="text-[#717171] mb-8">
        Interview insights and experiences for {company.name} {company.industry ? `(${company.industry})` : ''}
      </p>

      {MOCK_INTERVIEWS.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-12 text-center">
          <p className="text-lg font-medium text-[#222222]">Coming soon</p>
          <p className="text-sm text-[#717171] mt-1">Interview experiences for {company.name} will appear here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {MOCK_INTERVIEWS.map((interview) => (
            <div 
              key={interview.id} 
              className="bg-white rounded-xl border border-[#EBEBEB] p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#F7F7F7] pb-4 mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-[#222222]">{interview.role}</h2>
                  <p className="text-xs text-[#717171] mt-1">Shared in {interview.date}</p>
                </div>
                <div className="flex gap-2">
                  <span className={`px-2.5 py-1 text-xs font-medium border rounded-full ${interview.difficultyColor}`}>
                    {interview.difficulty}
                  </span>
                  <span className={`px-2.5 py-1 text-xs font-medium border rounded-full ${interview.outcomeColor}`}>
                    {interview.outcome}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-[#222222] mb-1">Overall Experience</h3>
                <p className="text-sm text-[#484848] leading-relaxed">{interview.experience}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#222222] mb-3">Interview Breakdown</h3>
                <div className="space-y-3 pl-2 border-l-2 border-[#EBEBEB]">
                  {interview.rounds.map((round, idx) => (
                    <div key={idx} className="relative pl-4">
                      <span className="absolute -left-[13px] top-1.5 w-2 h-2 rounded-full bg-[#FF5A5F]" />
                      <h4 className="text-sm font-medium text-[#222222]">{round.name}</h4>
                      <p className="text-xs text-[#717171] mt-0.5">{round.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}