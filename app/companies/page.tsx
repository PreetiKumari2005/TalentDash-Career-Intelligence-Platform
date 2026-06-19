import * as React from "react";
import { db } from "@/lib/db";

export const revalidate = 0;

// 🎨 Exact official brand color configurations mapping to slugs
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

export default async function CompaniesPage() {
  const companies = await db.company.findMany({
    include: {
      _count: {
        select: { salaries: true },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Explore Top Technical Companies
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Browse verified organizational metrics, corporate profiles, and real-time compensation benchmarks.
        </p>
      </div>

      {companies.length === 0 ? (
        <div className="text-center py-12 bg-white border border-slate-200 rounded-xl shadow-sm">
          <p className="text-slate-500 text-sm">No company data found. Make sure your database is seeded!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => {
            // Get the specific brand color styling, or fallback to standard slate gray
            const brandStyle = BRAND_COLORS[company.slug] || { 
              bg: "bg-slate-50 text-slate-400 border-slate-200", 
              text: company.name.charAt(0) 
            };

            return (
              <div 
                key={company.id} 
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Section: Logo & Name */}
                  <div className="flex items-center gap-4">
                    {company.logoUrl ? (
                      <img 
                        src={company.logoUrl} 
                        alt={company.name} 
                        className="h-12 w-12 rounded-lg object-contain border border-slate-100 p-1"
                      />
                    ) : (
                      /*  DYNAMIC BRAND COLORS INJECTION HERE */
                      <div className={`h-12 w-12 rounded-lg border flex items-center justify-center font-black text-xl ${brandStyle.bg}`}>
                        {brandStyle.text}
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 tracking-tight">
                        {company.name}
                      </h3>
                      <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                        {company.industry || "Technology"}
                      </span>
                    </div>
                  </div>

                  {/* Middle Section */}
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 pt-2 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-400 block">Headquarters</span>
                      <span className="font-medium text-slate-700">{company.headquarters || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Headcount</span>
                      <span className="font-medium text-slate-700">{company.headcountRange || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Founded Year</span>
                      <span className="font-medium text-slate-700">{company.foundedYear || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Database Slug</span>
                      <span className="font-mono text-slate-500 bg-slate-50 px-1 rounded">{company.slug}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full ring-1 ring-inset ring-emerald-600/10">
                    {company._count.salaries} {company._count.salaries === 1 ? "Salary Log" : "Salary Logs"}
                  </span>
                  
                  <a 
                    href={`/companies/${company.slug}`}
                    className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors inline-flex items-center gap-1"
                  >
                    View Profile <span>→</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}