import { db } from './db'

export interface DuplicateCheckInput {
  companyId: string
  role: string
  level: string
  location: string
  baseSalary: number
}

export async function isDuplicate(input: DuplicateCheckInput): Promise<boolean> {
  const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000)

  const existing = await db.salary.findMany({
    where: {
      companyId: input.companyId,
      role: { equals: input.role, mode: 'insensitive' },
      level: input.level as never,
      location: { equals: input.location, mode: 'insensitive' },
      submittedAt: { gte: fortyEightHoursAgo },
    },
    select: { baseSalary: true },
  })

  return existing.some((record) => {
    const diff = Math.abs(Number(record.baseSalary) - input.baseSalary)
    const tolerance = input.baseSalary * 0.1
    return diff <= tolerance
  })
}

export async function deduplicateExistingRecords(): Promise<void> {
  // Find all salary records grouped by company+role+level+location
  const records = await db.salary.findMany({
    orderBy: { submittedAt: 'desc' },
    select: {
      id: true,
      companyId: true,
      role: true,
      level: true,
      location: true,
      baseSalary: true,
      submittedAt: true,
    },
  })

  const seen = new Map<string, string>() // key → most recent id
  const toFlag: string[] = []

  for (const record of records) {
    const key = `${record.companyId}:${record.role.toLowerCase()}:${record.level}:${record.location.toLowerCase()}`

    if (!seen.has(key)) {
      seen.set(key, record.id)
    } else {
      // Check if base is within 5% of the seen record
      const seenRecord = records.find((r) => r.id === seen.get(key))
      if (seenRecord) {
        const diff = Math.abs(Number(record.baseSalary) - Number(seenRecord.baseSalary))
        const tolerance = Number(seenRecord.baseSalary) * 0.05
        if (diff <= tolerance) {
          toFlag.push(record.id)
        }
      }
    }
  }

  if (toFlag.length > 0) {
    await db.salary.updateMany({
      where: { id: { in: toFlag } },
      data: { isVerified: false },
    })
    console.log(`Flagged ${toFlag.length} duplicate records`)
  }
}