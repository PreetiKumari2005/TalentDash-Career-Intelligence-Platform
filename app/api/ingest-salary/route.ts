import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { validateIngestPayload, computeTotalCompensation } from '@/lib/validation'
import { normaliseCompanyName } from '@/lib/normalise'
import { isDuplicate } from '@/lib/dedupe'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate
    const error = validateIngestPayload(body)
    if (error) {
      return NextResponse.json(error, { status: 400 })
    }

    // Normalise company name
    const normalizedName = normaliseCompanyName(body.company)

    // Find or create company
    let company = await db.company.findFirst({
      where: { normalizedName },
    })

    if (!company) {
      company = await db.company.create({
        data: {
          name: body.company.trim(),
          slug: normalizedName,
          normalizedName,
        },
      })
    }

    // Duplicate check
    const duplicate = await isDuplicate({
      companyId: company.id,
      role: body.role,
      level: body.level,
      location: body.location,
      baseSalary: body.baseSalary,
    })

    if (duplicate) {
      return NextResponse.json(
        { error: true, message: 'Duplicate record submitted within 48 hours' },
        { status: 409 }
      )
    }

    // Recompute total_compensation — never trust client
    const totalCompensation = computeTotalCompensation(body)

    // Store record
    const salary = await db.salary.create({
      data: {
        companyId: company.id,
        role: body.role,
        level: body.level,
        location: body.location,
        currency: body.currency,
        experienceYears: body.experienceYears,
        baseSalary: body.baseSalary,
        bonus: body.bonus ?? 0,
        stock: body.stock ?? 0,
        totalCompensation,
        source: body.source ?? 'CONTRIBUTOR',
        confidenceScore: body.confidenceScore ?? 0.9,
        isVerified: false,
      },
      include: { company: true },
    })

    return NextResponse.json({ error: false, data: salary }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: true, message: 'Internal server error' },
      { status: 500 }
    )
  }
}