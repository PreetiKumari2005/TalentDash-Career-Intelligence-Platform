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
        <nav className="bg-white border-b border-[#EBEBEB] px-6 py-4 flex items-center justify-between sticky top-0 z-50">
          <Link href="/" className="text-xl font-bold text-[#222222]">
            Talent<span className="text-[#FF5A5F]">Dash</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/salaries" className="text-sm text-[#484848] hover:text-[#222222] transition-colors">
              Salaries
            </Link>
            <Link href="/companies" className="text-sm text-[#484848] hover:text-[#222222] transition-colors">
              Companies
            </Link>
            <Link href="/compare" className="text-sm text-[#484848] hover:text-[#222222] transition-colors">
              Compare
            </Link>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}