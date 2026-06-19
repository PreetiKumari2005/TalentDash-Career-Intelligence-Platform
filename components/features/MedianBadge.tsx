import * as React from "react";
import { Badge } from "@/components/ui/Badge";

interface MedianBadgeProps {
  amount: number;
  currency: string;
}

export const MedianBadge: React.FC<MedianBadgeProps> = ({ amount, currency }) => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);

  return (
    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg p-3 w-max">
      <div>
        <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block">Median Pay</span>
        <span className="text-lg font-bold text-slate-900 font-mono">{formatted}</span>
      </div>
      <Badge variant="gray" className="h-max text-[10px] bg-white">Market Core</Badge>
    </div>
  );
};