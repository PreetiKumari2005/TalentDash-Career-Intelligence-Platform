import { db } from './db'
import { computeMedian, computeLevelDistribution } from './salary'
import type { CompanyWithStats } from '@/types/company'

export async function getAllCompanySlugs(): Promise<string[]> {
  const companies = await db.company.findMany({ select: { slug: true } })
  return companies.map((c) => c.slug)
}

export async function getCompanyBySlug(slug: string): Promise<CompanyWithStats | null> {
  const company = await db.company.findUnique({
    where: { slug },
    include: {
      salaries: {
        orderBy: { totalCompensation: 'desc' },
        include: { company: true },
      },
    },
  })

  if (!company) return null

  const tcValues = company.salaries.map((s) => Number(s.totalCompensation))
  const levels = company.salaries.map((s) => s.level as string)

  return {
    id: company.id,
    name: company.name,
    slug: company.slug,
    normalizedName: company.normalizedName,
    industry: company.industry,
    headquarters: company.headquarters,
    foundedYear: company.foundedYear,
    headcountRange: company.headcountRange,
    createdAt: company.createdAt.toISOString(),
    updatedAt: company.updatedAt.toISOString(),
    salaries: company.salaries.map((s) => ({
      id: s.id,
      companyId: s.companyId,
      companyName: company.name,
      companySlug: company.slug,
      role: s.role,
      level: s.level as never,
      location: s.location,
      currency: s.currency as never,
      experienceYears: s.experienceYears,
      baseSalary: Number(s.baseSalary),
      bonus: Number(s.bonus),
      stock: Number(s.stock),
      totalCompensation: Number(s.totalCompensation),
      source: s.source as never,
      confidenceScore: Number(s.confidenceScore),
      isVerified: s.isVerified,
      submittedAt: s.submittedAt.toISOString(),
    })),
    medianTotalCompensation: computeMedian(tcValues),
    levelDistribution: computeLevelDistribution(levels),
    salaryCount: company.salaries.length,
    minTc: tcValues.length ? Math.min(...tcValues) : 0,
    maxTc: tcValues.length ? Math.max(...tcValues) : 0,
  }
}

export async function getAllCompanies() {
  return db.company.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { salaries: true } } },
  })
}