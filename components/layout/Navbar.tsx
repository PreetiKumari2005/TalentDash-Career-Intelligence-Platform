import * as React from "react";
import Link from "next/link";
import { DollarSign, Building2, Calculator, Users } from "lucide-react";

export const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-extrabold text-lg transition-transform group-hover:scale-105">
                T
              </span>
              <span className="font-bold text-xl text-slate-900 tracking-tight">
                Talent<span className="text-indigo-600">Dash</span>
              </span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/salaries" className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-colors">
                <DollarSign className="h-4 w-4" /> Salaries
              </Link>
              <Link href="/companies" className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-colors">
                <Building2 className="h-4 w-4" /> Companies
              </Link>
              <Link href="/tools/salary-calculator" className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-colors">
                <Calculator className="h-4 w-4" /> Tools
              </Link>
              <Link href="/community" className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-colors">
                <Users className="h-4 w-4" /> Community
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/salaries" 
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 active:bg-indigo-800 shadow-sm transition-all"
            >
              Add Salary
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};