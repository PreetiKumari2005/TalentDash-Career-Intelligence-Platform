import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Fetch companies alongside aggregated counts to feed comparison and selection lists
    const companies = await db.company.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        industry: true,
        logoUrl: true,
        _count: {
          select: { salaries: true },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({ success: true, data: companies }, { status: 200 });
  } catch (error) {
    console.error("[COMPANIES_GET_API_ERROR]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch companies inventory." },
      { status: 500 }
    );
  }
}