import * as React from "react";

interface DistributionData {
  level: string;
  count: number;
}

interface LevelDistributionBarProps {
  distributions: DistributionData[];
}

export const LevelDistributionBar: React.FC<LevelDistributionBarProps> = ({ distributions }) => {
  const total = distributions.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm">
      <h4 className="text-sm font-semibold text-slate-800 mb-4">Sample Data Distribution Across Seniority Tiers</h4>
      <div className="h-6 w-full flex rounded-full overflow-hidden bg-slate-100">
        {distributions.map((item, idx) => {
          const percentage = total > 0 ? (item.count / total) * 100 : 0;
          const colors = ["bg-indigo-600", "bg-violet-500", "bg-purple-400", "bg-sky-400"];
          const currentColor = colors[idx % colors.length];

          return (
            <div
              key={item.level}
              style={{ width: `${percentage}%` }}
              className={`${currentColor} h-full group relative transition-all duration-300`}
              title={`${item.level}: ${item.count} entries`}
            />
          );
        })}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
        {distributions.map((item, idx) => {
          const colors = ["bg-indigo-600", "bg-violet-500", "bg-purple-400", "bg-sky-400"];
          return (
            <div key={item.level} className="flex items-center gap-2 text-xs font-medium text-slate-600">
              <span className={`w-3 h-3 rounded-full ${colors[idx % colors.length]}`} />
              <span>{item.level} ({item.count})</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};