import * as React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export default function SalariesLoadingShell() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Simulated FilterBar Component Skeleton */}
      <div className="h-16 w-full bg-white border border-slate-200 rounded-xl flex items-center px-4 gap-4">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-64" />
      </div>

      {/* Simulated SalaryTable Component Skeleton */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
        <div className="h-12 bg-slate-50 border-b border-slate-200" />
        <div className="p-4 space-y-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}