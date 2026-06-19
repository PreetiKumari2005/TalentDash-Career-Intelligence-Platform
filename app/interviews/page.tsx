import * as React from "react";
import Link from "next/link";
import { HelpCircle, ChevronRight, HelpCircle as HelpIcon } from "lucide-react";
import { db } from "@/lib/db";

export default async function InterviewsRootPage() {
  const targets = await db.company.findMany({
    take: 5,
    select: { name: true, slug: true }
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Interview Technical Debriefs</h1>
        <p className="text-sm text-slate-500">Review precise design tasks and algorithm hurdles experienced by real candidates.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100 shadow-sm overflow-hidden">
        {targets.map((item) => (
          <Link 
            key={item.slug}
            href={`/interviews/${item.slug}`} 
            className="p-4 flex items-center justify-between hover:bg-slate-50/60 transition group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <HelpIcon className="h-4 w-4" />
              </div>
              <div>
                <span className="font-semibold text-slate-800 block group-hover:text-indigo-600 transition">{item.name} Preparation Portal</span>
                <span className="text-xs text-slate-400">Systems design, live loops, and behavioral matching loops</span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-slate-500 transition" />
          </Link>
        ))}
      </div>
    </div>
  );
}