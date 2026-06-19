import * as React from "react";
import Link from "next/link";
import { MessageCircle, Star } from "lucide-react";
import { db } from "@/lib/db";

export default async function ReviewsRootPage() {
  const reviewsSummary = await db.company.findMany({
    take: 4,
    include: {
      reviews: { take: 1, orderBy: { createdAt: "desc" } }
    }
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Workplace Quality Indexes</h1>
        <p className="text-sm text-slate-500">Unfiltered engineering culture logs tracking leadership transparency and internal progression velocity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviewsSummary.map((item) => {
          const sampleReview = item.reviews[0];
          return (
            <div key={item.id} className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-50 pb-3 mb-3">
                  <span className="font-bold text-slate-900">{item.name}</span>
                  <Link href={`/companies/${item.slug}/reviews`} className="text-xs text-indigo-600 hover:underline font-medium">
                    View all reviews
                  </Link>
                </div>
                {sampleReview ? (
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm italic">"{sampleReview.title}"</h4>
                    <p className="text-xs text-slate-500 line-clamp-3 mt-1.5 leading-relaxed">
                      <strong className="text-slate-700">Pros:</strong> {sampleReview.pros}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No feedback submitted for this organization index yet.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}