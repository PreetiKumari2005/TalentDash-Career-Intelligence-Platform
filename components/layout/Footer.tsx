import * as React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <span className="font-bold text-lg text-slate-900 tracking-tight">
              Talent<span className="text-indigo-600">Dash</span>
            </span>
            <p className="text-xs text-slate-500 leading-relaxed">
              Democratizing compensation visibility and market insights for builders and tech specialists worldwide.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/salaries" className="text-slate-600 hover:text-indigo-600 transition-colors">Salary Benchmarks</Link></li>
              <li><Link href="/companies" className="text-slate-600 hover:text-indigo-600 transition-colors">Company Indexes</Link></li>
              <li><Link href="/compare" className="text-slate-600 hover:text-indigo-600 transition-colors">Side-by-Side Compare</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Calculators</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tools/salary-calculator" className="text-slate-600 hover:text-indigo-600 transition-colors">Take-Home Pay</Link></li>
              <li><Link href="/tools/equity-calculator" className="text-slate-600 hover:text-indigo-600 transition-colors">Stock Options Value</Link></li>
              <li><Link href="/tools/hike-calculator" className="text-slate-600 hover:text-indigo-600 transition-colors">Appraisal Estimator</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-100 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">&copy; {currentYear} TalentDash. All rights reserved.</p>
          <div className="text-xs text-slate-400 flex gap-4">
            <span>Built anonymously for compensation equality.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};