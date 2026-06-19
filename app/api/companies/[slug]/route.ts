import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { computeMedian, computeLevelDistribution } from '@/lib/salary'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const company = await db.company.findUnique({
      where: { slug },
      include: {
        salaries: {
          orderBy: { totalCompensation: 'desc' },
        },
      },
    })

    if (!company) {
      return NextResponse.json(
        { error: true, message: 'Company not found' },
        { status: 404 }
      )
    }

    const tcValues = company.salaries.map((s) => Number(s.totalCompensation))
    const levels = company.salaries.map((s) => s.level as string)

    return NextResponse.json(
      {
        data: {
          ...company,
          medianTotalCompensation: computeMedian(tcValues),
          levelDistribution: computeLevelDistribution(levels),
          salaryCount: company.salaries.length,
          minTc: tcValues.length ? Math.min(...tcValues) : 0,
          maxTc: tcValues.length ? Math.max(...tcValues) : 0,
        },
      },
      {
        headers: {
          'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
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
