"use client";
import * as React from "react";
import { Input } from "@/components/ui/Input";

export default function HikeCalculatorPage() {
  const [current, setCurrent] = React.useState<number>(100000);
  const [percent, setPercent] = React.useState<number>(15);

  const raiseAmount = current * (percent / 100);
  const newSalary = current + raiseAmount;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Appraisal & Hike Estimator</h1>
        <p className="text-xs text-slate-500 mt-1">Calculate step increments onto standard compensation structures.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1.5">Current Base Pay ($)</label>
          <Input type="number" value={current || ""} onChange={(e) => setCurrent(Number(e.target.value))} />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1.5">Hike Target (%)</label>
          <Input type="number" value={percent || ""} onChange={(e) => setPercent(Number(e.target.value))} />
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4 grid grid-cols-2 gap-4 text-sm font-mono">
        <div className="bg-slate-50 p-3 rounded-lg">
          <span className="text-xs text-slate-400 block font-sans">Bump Value Increase</span>
          <span className="text-base font-bold text-emerald-600">+${raiseAmount.toLocaleString()}</span>
        </div>
        <div className="bg-slate-900 text-white p-3 rounded-lg">
          <span className="text-xs text-slate-400 block font-sans">Adjusted Total Package</span>
          <span className="text-base font-bold text-white">${newSalary.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}