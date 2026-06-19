import * as React from "react";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { Badge } from "@/components/ui/Badge";
import { Building2, Globe, MapPin } from "lucide-react";

interface CompanyHeaderProps {
  company: {
    name: string;
    logoUrl: string | null;
    industry?: string | null;
    website?: string | null;
  };
  salaryCount: number;
}

export const CompanyHeader: React.FC<CompanyHeaderProps> = ({ company, salaryCount }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <CompanyLogo src={company.logoUrl} name={company.name} size="lg" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{company.name}</h1>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-slate-500">
            {company.industry && (
              <span className="flex items-center gap-1">
                <Building2 className="h-4 w-4" /> {company.industry}
              </span>
            )}
            {company.website && (
              <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-indigo-600 hover:underline">
                <Globe className="h-4 w-4" /> Website
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-lg text-center min-w-[120px]">
        <span className="block text-2xl font-bold text-indigo-700">{salaryCount}</span>
        <span className="text-xs font-medium text-indigo-600 uppercase tracking-wider">Data Points</span>
      </div>
    </div>
  );
};