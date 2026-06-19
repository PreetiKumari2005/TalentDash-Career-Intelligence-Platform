import { db } from './db'
import type { SalaryFilters } from '../types/salary'

export function computeMedian(values: number[]): number {
  if (values.length === 0) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 !== 0
    ? sorted[mid]!
    : Math.round((sorted[mid - 1]! + sorted[mid]!) / 2)
}

export function computeLevelDistribution(
  levels: string[]
): Record<string, number> {
  return levels.reduce<Record<string, number>>((acc, level) => {
    acc[level] = (acc[level] ?? 0) + 1
    return acc
  }, {})
}

export async function getSalaries(filters: SalaryFilters) {
  const {
    company,
    role,
    level,
    location,
    sort = 'total_comp_desc',
    page = 1,
    limit = 25,
  } = filters

  const cappedLimit = Math.min(limit, 100)
  const skip = (page - 1) * cappedLimit

  const where: Record<string, unknown> = {}

  if (company) {
    where.company = {
      normalizedName: { contains: company.toLowerCase() },
    }
  }
  if (role)     where.role     = { contains: role,     mode: 'insensitive' }
  if (level)    where.level    = level
  if (location) where.location = { contains: location, mode: 'insensitive' }

  const orderBy =
    sort === 'total_comp_asc'
      ? { totalCompensation: 'asc' as const }
      : sort === 'date_desc'
      ? { submittedAt: 'desc' as const }
      : { totalCompensation: 'desc' as const }

  const [data, total] = await Promise.all([
    db.salary.findMany({
      where,
      include: { company: true },
      orderBy,
      skip,
      take: cappedLimit,
    }),
    db.salary.count({ where }),
  ])

  return {
    data,
    meta: {
      total,
      page,
      limit: cappedLimit,
      totalPages: Math.ceil(total / cappedLimit),
    },
  }
}
