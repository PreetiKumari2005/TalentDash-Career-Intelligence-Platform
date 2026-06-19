import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const company  = searchParams.get('company') ?? undefined
    const role     = searchParams.get('role') ?? undefined
    const level    = searchParams.get('level') ?? undefined
    const location = searchParams.get('location') ?? undefined
    const sort     = searchParams.get('sort') ?? 'total_comp_desc'
    const page     = Math.max(1, parseInt(searchParams.get('page') ?? '1'))
    const limit    = Math.min(100, parseInt(searchParams.get('limit') ?? '25'))
    const skip     = (page - 1) * limit

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
      sort === 'total_comp_asc' ? { totalCompensation: 'asc' as const }
      : sort === 'date_desc'    ? { submittedAt: 'desc' as const }
      :                           { totalCompensation: 'desc' as const }

    const [data, total] = await Promise.all([
      db.salary.findMany({
        where,
        include: { company: true },
        orderBy,
        skip,
        take: limit,
      }),
      db.salary.count({ where }),
    ])

    return NextResponse.json(
      {
        data,
        meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
      },
      {
        headers: {
          'Cache-Control': 's-maxage=300, stale-while-revalidate=3600',
        },
      }
    )
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: true, message: 'Internal server error' },
      { status: 500 }
    )
  }
}