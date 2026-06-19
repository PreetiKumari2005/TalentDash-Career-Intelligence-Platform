import * as React from "react";
import { Info } from "lucide-react";

export default function SalaryCalculatorNestedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      {/* Dynamic Sub-Banner specific to the Salary Calculator workflow */}
      <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-100 rounded-lg text-amber-800">
        <Info className="h-4 w-4 shrink-0 mt-0.5 text-amber-600" />
        <div className="text-xs space-y-0.5">
          <span className="font-semibold block">Tax Bracket Disclaimer</span>
          <p className="text-amber-700/90 leading-relaxed">
            Calculations are localized estimates based on a standard localized 28% flat deduction. Real tax indices vary depending on state, local configurations, and filing exemptions.
          </p>
        </div>
      </div>

      {/* Render the core page view target */}
      <div className="bg-white rounded-lg">
        {children}
      </div>
    </div>
  );
}