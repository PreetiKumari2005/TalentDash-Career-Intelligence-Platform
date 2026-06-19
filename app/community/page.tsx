import * as React from "react";
import Link from "next/link";
import { MessageSquare, ArrowRight, Users2 } from "lucide-react";
import { db } from "@/lib/db";

export default async function CommunityRootPage() {
  const activeHubs = await db.company.findMany({
    take: 6,
    select: {
      name: true,
      slug: true,
      _count: { select: { salaries: true } }
    }
  });

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="text-center mb-10">
        <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
          <Users2 className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Workplace Forums</h1>
        <p className="text-slate-500 mt-2">Discuss anonymous offers, culture, and team structure transitions with verified peers.</p>
      </div>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Trending Company Channels</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {activeHubs.map((hub) => (
          <Link 
            key={hub.slug} 
            href={`/community/${hub.slug}`}
            className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-500 hover:shadow-sm transition group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-50 rounded-lg text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <span className="font-semibold text-slate-900 block">{hub.name} Hub</span>
                <span className="text-xs text-slate-400">{hub._count.salaries * 3 + 12} online users</span>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-600 transition transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </div>
  );
}