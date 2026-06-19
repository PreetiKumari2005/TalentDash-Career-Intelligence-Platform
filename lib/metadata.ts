import type { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://talentdash.com'

export function buildSalaryPageMeta(params: {
  role?: string
  company?: string
  location?: string
}): Metadata {
  const { role, company, location } = params
  const title = [
    role,
    company ? `at ${company}` : null,
    location ?? 'India',
    '| TalentDash',
  ]
    .filter(Boolean)
    .join(' ')

  const description = `Real ${role ?? 'salary'} compensation data${company ? ` at ${company}` : ''} in ${location ?? 'India'}. Compare base salary, bonus, stock, and total comp by level.`

  const canonical = [
    `${BASE_URL}/salaries`,
    role?.toLowerCase().replace(/\s+/g, '-'),
    location?.toLowerCase(),
  ]
    .filter(Boolean)
    .join('/')

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: 'TalentDash' },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export function buildCompanyPageMeta(companyName: string, slug: string): Metadata {
  const title = `${companyName} Salaries, Reviews & Interview Experiences | TalentDash`
  const description = `Explore verified salary data, employee reviews, and interview experiences at ${companyName}. Compare compensation levels and discover what it's really like to work there.`
  const canonical = `${BASE_URL}/companies/${slug}`

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: 'TalentDash' },
  }
}

export function buildComparePageMeta(company1: string, company2: string): Metadata {
  const title = `${company1} vs ${company2} — Salary & Culture Comparison | TalentDash`
  const description = `Side-by-side salary and compensation comparison between ${company1} and ${company2}. See base pay, bonuses, stock, and total comp differences.`
  return { title, description }
}