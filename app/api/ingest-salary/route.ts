import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

// Strict validation contract mapping what the Python LLM pipeline extracts
const InboundIngestionSchema = z.object({
  companyName: z.string().min(1),
  role: z.string().min(1),
  level: z.string().nullable().optional(),
  baseSalary: z.number().positive(),
  variablePay: z.number().nonnegative().default(0),
  equityPay: z.number().nonnegative().default(0),
  currency: z.string().length(3).default("USD"),
  yearsOfExp: z.number().nonnegative(),
  location: z.string().min(2),
  pipelineSecret: z.string()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = InboundIngestionSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error.errors }, { status: 400 });
    }

    const data = result.data;

    // Secure pipeline-only endpoint protection hook
    if (data.pipelineSecret !== process.env.PIPELINE_SHARED_SECRET) {
      return NextResponse.json({ success: false, error: "Unauthorized access token payload." }, { status: 401 });
    }

    const companySlug = data.companyName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    // Atomic transaction: Find or build target company reference entity, then push normalized entry
    const record = await db.$transaction(async (tx) => {
      const company = await tx.company.upsert({
        where: { slug: companySlug },
        update: {},
        create: { name: data.companyName, slug: companySlug }
      });

      return await tx.salary.create({
        data: {
          companyId: company.id,
          role: data.role,
          level: data.level || null,
          baseSalary: data.baseSalary,
          variablePay: data.variablePay,
          equityPay: data.equityPay,
          currency: data.currency,
          yearsOfExp: data.yearsOfExp,
          yearsAtCompany: 0,
          location: data.location,
          isVerified: true // Automatically trusted coming out of programmatic LLM pipeline
        }
      });
    });

    return NextResponse.json({ success: true, salaryId: record.id }, { status: 201 });

  } catch (error) {
    console.error("[PIPELINE_INGEST_ERROR]:", error);
    return NextResponse.json({ success: false, error: "Database mapping transaction exception." }, { status: 500 });
  }
}