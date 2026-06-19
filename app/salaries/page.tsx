import * as React from "react";
import { db } from "@/lib/db";
import { SalaryTable } from "@/components/features/SalaryTable";

// Coerce layout options forcing runtime environment to evaluate fresh entries dynamically
export const revalidate = 0;

export default async function SalariesRootPage() {
  // Server Component directly queries database context securely without standard hydration API roundtrips
  const compensationEntries = await db.salary.findMany({
    where: { isVerified: true },
    include: {
      company: {
        select: {
          name: true,
          logoUrl: true,
          slug: true // 👈 ADD THIS FIELD HERE TO MAP THE COLORS
        }
      }
    },
    orderBy: {
      submittedAt: "desc"
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Verified Technical Compensation Logs
        </h1>
        <p className="text-sm text-slate-500">
          Real-time market analytics pulled straight from verified pipeline datasets and platform submissions.
        </p>
      </div>

      {/* Output fully computed presentation structure directly down data stream pipe */}
      <SalaryTable salaries={compensationEntries} />
    </div>
  );
}