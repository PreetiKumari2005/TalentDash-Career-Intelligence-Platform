import * as React from "react";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { db } from "@/lib/db";

export default async function WorkplaceIndexRootPage() {
  const industries = await db.company.findMany({
    where: { industry: { not: null } },
    distinct: ["industry"],
    select: { industry: true }
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Market Sector Aggregations</h1>
        <p className="text-sm text-slate-500">Track structural pay shifts clustered across overarching industry verticals.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {industries.map((ind) => (
          <Link
            key={ind.industry}
            href={`/workplace-index/${encodeURIComponent(ind.industry!.toLowerCase())}`}
            className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between hover:border-indigo-500 group transition"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 rounded-lg transition">
                <Layers className="h-4 w-4" />
              </div>
              <span className="font-semibold text-slate-800 text-sm group-hover:text-indigo-600 transition">{ind.industry}</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-600 transition" />
          </Link>
        ))}
      </div>
    </div>
  );
}