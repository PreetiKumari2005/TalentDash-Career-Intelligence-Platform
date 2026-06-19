import * as React from "react";
import { Prisma } from "@prisma/client";

// Define the Prisma payload type structure
export type SalaryData = Prisma.SalaryGetPayload<{
  include: {
    company: {
      select: {
        name: true;
        logoUrl: true;
        slug: true; // Make sure slug is included!
      };
    };
  };
}>;

interface SalaryRowProps {
  salary: SalaryData;
}


const BRAND_COLORS: Record<string, { bg: string; text: string }> = {
  google:    { bg: "bg-blue-50 text-blue-600 border-blue-200", text: "G" },
  amazon:    { bg: "bg-[#FF9900]/10 text-[#FF9900] border-[#FF9900]/20", text: "A" }, // Official Amazon Orange
  meta:      { bg: "bg-[#0668E1]/10 text-[#0668E1] border-[#0668E1]/20", text: "M" }, // Meta Blue
  microsoft: { bg: "bg-[#F25022]/10 text-[#F25022] border-[#F25022]/20", text: "M" }, // Microsoft Red/Orange
  flipkart:  { bg: "bg-[#2874F0]/10 text-[#2874F0]/20 text-[#2874F0]", text: "F" }, // Flipkart Blue
  meesho:    { bg: "bg-[#F43397]/10 text-[#F43397] border-[#F43397]/20", text: "M" }, // Meesho Pink
  nvidia:    { bg: "bg-[#76B900]/10 text-[#76B900] border-[#76B900]/20", text: "N" }, // Nvidia Green
  tcs:       { bg: "bg-[#1B365D]/10 text-[#1B365D] border-[#1B365D]/20", text: "T" }, // TCS Corporate Blue
  infosys:   { bg: "bg-[#007CC3]/10 text-[#007CC3] border-[#007CC3]/20", text: "I" }, // Infosys Blue
  wipro:     { bg: "bg-purple-50 text-purple-600 border-purple-200", text: "W" },
  razorpay:  { bg: "bg-[#0B72E7]/10 text-[#0B72E7] border-[#0B72E7]/20", text: "R" }, // Razorpay Blue
  zepto:     { bg: "bg-[#800080]/10 text-[#800080] border-[#800080]/20", text: "Z" }, // Zepto Purple
};

export const SalaryRow: React.FC<SalaryRowProps> = ({ salary }) => {
  const formatCurrency = (value: number, currencyCode: string) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Resolve dynamic colors using the company slug
  const companySlug = salary.company?.slug || "";
  const brandStyle = BRAND_COLORS[companySlug] || {
    bg: "bg-slate-50 text-slate-400 border-slate-200",
    text: salary.company?.name?.charAt(0) || "C",
  };

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      {/* Company Column with Custom Dynamic Logo Badges */}
      <td className="py-4 px-4 font-medium text-slate-900">
        <div className="flex items-center gap-3">
          {salary.company?.logoUrl ? (
            <img 
              src={salary.company.logoUrl} 
              alt={salary.company.name} 
              className="h-8 w-8 rounded-md object-contain border border-slate-100"
            />
          ) : (
            /* DYNAMIC COLOURED BADGES APPLIED HERE */
            <div className={`h-8 w-8 rounded-md border flex items-center justify-center font-bold text-xs ${brandStyle.bg}`}>
              {brandStyle.text}
            </div>
          )}
          <span>{salary.company?.name || "Unknown Company"}</span>
        </div>
      </td>

      {/* Role & Level Column */}
      <td className="py-4 px-4 text-slate-700">
        <div className="font-medium text-slate-900">{salary.role}</div>
        {salary.level && <div className="text-xs text-slate-400">{salary.level}</div>}
      </td>

      {/* Experience Column */}
      <td className="py-4 px-4 text-slate-600">
        {salary.experienceYears} {salary.experienceYears === 1 ? "year" : "years"}
      </td>

      {/* Total Compensation Column */}
      <td className="py-4 px-4 text-right font-semibold text-slate-900">
        {formatCurrency(salary.totalCompensation, salary.currency)}
      </td>

      {/* Status Badge */}
      <td className="py-4 px-4 text-center">
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
          Verified
        </span>
      </td>
    </tr>
  );
};