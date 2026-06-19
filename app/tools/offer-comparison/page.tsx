"use client";
import * as React from "react";
import { Input } from "@/components/ui/Input";

export default function OfferComparisonPage() {
  const [baseA, setBaseA] = React.useState(100000);
  const [bonusA, setBonusA] = React.useState(15000);
  const [baseB, setBaseB] = React.useState(115000);
  const [bonusB, setBonusB] = React.useState(5000);

  const totalA = baseA + bonusA;
  const totalB = baseB + bonusB;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Offer Comparison Worksheet</h1>
        <p className="text-xs text-slate-500 mt-1">Juxtapose competing job offers to compute absolute cash margins.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 space-y-3">
          <h3 className="text-sm font-bold text-slate-700">Proposal Structure A</h3>
          <Input type="number" value={baseA || ""} placeholder="Base Salary" onChange={(e) => setBaseA(Number(e.target.value))} />
          <Input type="number" value={bonusA || ""} placeholder="Variable Pay" onChange={(e) => setBonusA(Number(e.target.value))} />
          <div className="text-right font-mono text-xs text-slate-500 font-bold">Total: ${totalA.toLocaleString()}</div>
        </div>

        <div className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 space-y-3">
          <h3 className="text-sm font-bold text-slate-700">Proposal Structure B</h3>
          <Input type="number" value={baseB || ""} placeholder="Base Salary" onChange={(e) => setBaseB(Number(e.target.value))} />
          <Input type="number" value={bonusB || ""} placeholder="Variable Pay" onChange={(e) => setBonusB(Number(e.target.value))} />
          <div className="text-right font-mono text-xs text-slate-500 font-bold">Total: ${totalB.toLocaleString()}</div>
        </div>
      </div>

      <div className="p-4 border border-indigo-100 bg-indigo-50/50 rounded-xl text-center text-sm font-medium text-slate-700">
        {totalA === totalB ? (
          "Both packages compute to identical gross sums."
        ) : totalA > totalB ? (
          <span>Proposal <strong className="text-indigo-600">A</strong> holds an premium edge margin of <strong className="font-mono text-indigo-700">${(totalA - totalB).toLocaleString()}</strong></span>
        ) : (
          <span>Proposal <strong className="text-indigo-600">B</strong> holds an premium edge margin of <strong className="font-mono text-indigo-700">${(totalB - totalA).toLocaleString()}</strong></span>
        )}
      </div>
    </div>
  );
}