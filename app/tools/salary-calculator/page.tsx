"use client";
import * as React from "react";
import { Input } from "@/components/ui/Input";

export default function SalaryCalculatorPage() {
  const [gross, setGross] = React.useState<number>(120000);

  const tax = gross * 0.28; 
  const netPay = gross - tax;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Take-Home Pay Calculator</h1>
        <p className="text-xs text-slate-500 mt-1">Estimate standard net deductions from annualized raw base packages.</p>
      </div>

      <div className="max-w-md">
        <label className="text-xs font-semibold text-slate-600 block mb-1.5">Annual Gross Base Pay ($)</label>
        <Input 
          type="number" 
          value={gross || ""} 
          onChange={(e) => setGross(Number(e.target.value))} 
        />
      </div>

      <div className="border-t border-slate-100 pt-4 grid grid-cols-2 gap-4 text-sm font-mono">
        <div className="bg-slate-50 p-3 rounded-lg">
          <span className="text-xs text-slate-400 block font-sans">Estimated Tax (28%)</span>
          <span className="text-base font-bold text-red-600">${tax.toLocaleString()}</span>
        </div>
        <div className="bg-indigo-50 p-3 rounded-lg">
          <span className="text-xs text-indigo-400 block font-sans">Net Take-Home Pay</span>
          <span className="text-base font-bold text-indigo-700">${netPay.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}