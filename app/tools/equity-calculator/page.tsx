"use client";
import * as React from "react";
import { Input } from "@/components/ui/Input";

export default function EquityCalculatorPage() {
  const [grants, setGrants] = React.useState<number>(40000);
  const [years, setYears] = React.useState<number>(4);

  const annualValue = years > 0 ? grants / years : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Stock Option & Equity Evaluator</h1>
        <p className="text-xs text-slate-500 mt-1">Annualize broad block grants across structured vest schedules.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1.5">Total Grant Portfolio Value ($)</label>
          <Input type="number" value={grants || ""} onChange={(e) => setGrants(Number(e.target.value))} />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1.5">Vesting Term Horizon (Years)</label>
          <Input type="number" value={years || ""} onChange={(e) => setYears(Number(e.target.value))} />
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4 bg-indigo-50 p-4 rounded-xl text-center font-mono">
        <span className="text-xs text-indigo-500 block font-sans uppercase tracking-wider font-semibold">Annualized Ingestion Stock Rate Equivalent</span>
        <span className="text-2xl font-black text-indigo-700">${annualValue.toLocaleString()} / year</span>
      </div>
    </div>
  );
}