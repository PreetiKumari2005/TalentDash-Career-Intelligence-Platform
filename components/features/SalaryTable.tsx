import * as React from "react";
import { SalaryRow, type SalaryData } from "./SalaryRow";
import { EmptyState } from "@/components/ui/EmptyState";

interface SalaryTableProps {
  salaries: SalaryData[];
}

export const SalaryTable: React.FC<SalaryTableProps> = ({ salaries }) => {
  if (!salaries || salaries.length === 0) {
    return <EmptyState title="No compensation entries matches your query." />;
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full border-collapse text-left text-sm text-slate-500">
        <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-600 border-b border-slate-200">
          <tr>
            <th scope="col" className="py-3.5 px-4 font-semibold">Company</th>
            <th scope="col" className="py-3.5 px-4 font-semibold">Role & Level</th>
            <th scope="col" className="py-3.5 px-4 font-semibold">Experience</th>
            <th scope="col" className="py-3.5 px-4 font-semibold text-right">Total Comp (TC)</th>
            <th scope="col" className="py-3.5 px-4 font-semibold text-center">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {salaries.map((salary) => (
            <SalaryRow key={salary.id} salary={salary} />
          ))}
        </tbody>
      </table>
    </div>
  );
};