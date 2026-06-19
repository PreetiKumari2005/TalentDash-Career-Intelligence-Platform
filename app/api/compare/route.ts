import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slugA = searchParams.get("slugA");
    const slugB = searchParams.get("slugB");

    if (!slugA || !slugB) {
      return NextResponse.json(
        { success: false, error: "Missing required query parameters: 'slugA' and 'slugB'." },
        { status: 400 }
      );
    }

    // Pull companies and their entire salary records simultaneously
    const [companyA, companyB] = await Promise.all([
      db.company.findUnique({
        where: { slug: slugA },
        include: { salaries: true },
      }),
      db.company.findUnique({
        where: { slug: slugB },
        include: { salaries: true },
      }),
    ]);

    if (!companyA || !companyB) {
      return NextResponse.json(
        { success: false, error: "One or both specified companies could not be found." },
        { status: 404 }
      );
    }

    // Helper metric computing utility
    const calculateMetrics = (salaries: any[]) => {
      if (salaries.length === 0) return { avgBase: 0, avgTotal: 0, avgYoE: 0 };
      
      const sums = salaries.reduce(
        (acc, curr) => {
          acc.base += curr.baseSalary;
          acc.total += curr.baseSalary + curr.variablePay + curr.equityPay;
          acc.yoe += curr.yearsOfExp;
          return acc;
        },
        { base: 0, total: 0, yoe: 0 }
      );

      return {
        avgBase: Math.round(sums.base / salaries.length),
        avgTotal: Math.round(sums.total / salaries.length),
        avgYoE: parseFloat((sums.yoe / salaries.length).toFixed(1)),
      };
    };

    return NextResponse.json({
      success: true,
      data: {
        companyA: { name: companyA.name, slug: companyA.slug, metrics: calculateMetrics(companyA.salaries) },
        companyB: { name: companyB.name, slug: companyB.slug, metrics: calculateMetrics(companyB.salaries) },
      }
    }, { status: 200 });

  } catch (error) {
    console.error("[COMPARE_API_ERROR]:", error);
    return NextResponse.json(
      { success: false, error: "Internal compute server error during comparison analysis." },
      { status: 500 }
    );
  }
}