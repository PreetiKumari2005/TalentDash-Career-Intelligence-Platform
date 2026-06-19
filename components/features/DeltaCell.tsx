import * as React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface DeltaCellProps {
  current: number;
  baseline: number;
  isCurrency?: boolean;
}

export const DeltaCell: React.FC<DeltaCellProps> = ({ current, baseline, isCurrency = true }) => {
  const diff = current - baseline;
  if (baseline === 0) return <span className="text-slate-400">N/A</span>;
  const percent = (diff / baseline) * 100;

  const formatAmount = (val: number) => {
    const absVal = Math.abs(val);
    if (!isCurrency) return `${absVal.toFixed(1)} yrs`;
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(absVal);
  };

  if (diff > 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-xs font-medium text-emerald-600 font-mono bg-emerald-50 px-2 py-0.5 rounded">
        <ArrowUpRight className="h-3 w-3 shrink-0" />
        +{formatAmount(diff)} (+{percent.toFixed(1)}%)
      </span>
    );
  }

  if (diff < 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-xs font-medium text-red-600 font-mono bg-red-50 px-2 py-0.5 rounded">
        <ArrowDownRight className="h-3 w-3 shrink-0" />
        -{formatAmount(diff)} ({percent.toFixed(1)}%)
      </span>
    );
  }

  return <span className="text-xs text-slate-400 font-mono">0% flat</span>;
};