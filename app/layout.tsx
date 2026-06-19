import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'TalentDash — Career Intelligence for India',
  description: 'Structured salary data, company reviews, and interview experiences for Indian professionals.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F7F7F7]">
        <nav className="bg-white border-b border-[#EBEBEB] px-6 py-3 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-[#222222]">
              Talent<span className="text-[#FF5A5F]">Dash</span>
            </Link>
            <div className="flex items-center gap-5">
              <Link href="/companies"       className="text-sm text-[#484848] hover:text-[#222222] transition-colors">Companies</Link>
              <Link href="/salaries"        className="text-sm text-[#484848] hover:text-[#222222] transition-colors">Salaries</Link>
              <Link href="/reviews"         className="text-sm text-[#484848] hover:text-[#222222] transition-colors">Reviews</Link>
              <Link href="/interviews"      className="text-sm text-[#484848] hover:text-[#222222] transition-colors">Interviews</Link>
              <Link href="/jobs"            className="text-sm text-[#484848] hover:text-[#222222] transition-colors">Jobs</Link>
              <Link href="/community"       className="text-sm text-[#484848] hover:text-[#222222] transition-colors">Community</Link>
              <Link href="/tools"           className="text-sm text-[#484848] hover:text-[#222222] transition-colors">Tools</Link>
              <Link href="/workplace-index" className="text-sm text-[#484848] hover:text-[#222222] transition-colors">Workplace Index</Link>
              <Link href="/compare"         className="px-4 py-1.5 bg-[#FF5A5F] text-white text-sm font-medium rounded hover:bg-[#e04e53] transition-colors">Compare</Link>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}
