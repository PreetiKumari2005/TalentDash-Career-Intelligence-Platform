import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Make sure lib/db.ts exports a Prisma client instance
import { z } from 'zod';

const SalaryInboundSchema = z.object({
  companyName: z.string(),
  role: z.string(),
  baseSalary: z.number(),
  currency: z.string().default("USD"),
  location: z.string(),
  yearsOfExp: z.number(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = SalaryInboundSchema.parse(body);

    // Upsert company matching the slug
    const companySlug = validatedData.companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const company = await db.company.upsert({
      where: { slug: companySlug },
      update: {},
      create: { name: validatedData.companyName, slug: companySlug }
    });

    // Write new salary record
    const newSalary = await db.salary.create({
      data: {
        companyId: company.id,
        role: validatedData.role,
        baseSalary: validatedData.baseSalary,
        currency: validatedData.currency,
        location: validatedData.location,
        yearsOfExp: validatedData.yearsOfExp,
        yearsAtCompany: 0,
      }
    });

    return NextResponse.json({ success: true, data: newSalary }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}