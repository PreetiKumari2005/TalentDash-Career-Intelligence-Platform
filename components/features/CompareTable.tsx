import * as React from "react";
import { DeltaCell } from "./DeltaCell";

interface MetricRow {
  label: string;
  valA: number;
  valB: number;
  isCurrency?: boolean;
}

interface CompareTableProps {
  nameA: string;
  nameB: string;
  metrics: MetricRow[];
}

export const CompareTable: React.FC<CompareTableProps> = ({ nameA, nameB, metrics }) => {
  const format = (val: number, isCurr?: boolean) => {
    if (!isCurr) return `${val} yrs`;
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="overflow-hidden border border-slate-200 rounded-xl bg-white shadow-sm mt-6">
      <table className="w-full border-collapse text-left text-sm text-slate-500">
        <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
          <tr>
            <th className="py-3 px-4 font-semibold">Comparison Metric</th>
            <th className="py-3 px-4 font-semibold text-right">{nameA}</th>
            <th className="py-3 px-4 font-semibold text-right">{nameB}</th>
            <th className="py-3 px-4 font-semibold text-right">Difference</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-900">
          {metrics.map((m, idx) => (
            <tr key={idx} className="hover:bg-slate-50/50">
              <td className="py-3.5 px-4 font-medium text-slate-600">{m.label}</td>
              <td className="py-3.5 px-4 text-right font-mono">{format(m.valA, m.isCurrency)}</td>
              <td className="py-3.5 px-4 text-right font-mono">{format(m.valB, m.isCurrency)}</td>
              <td className="py-3.5 px-4 text-right">
                <DeltaCell current={m.valB} baseline={m.valA} isCurrency={m.isCurrency} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};