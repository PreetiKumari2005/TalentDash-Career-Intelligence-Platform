// app/companies/page.tsx
'use client';
import * as React from "react";
import { useState } from "react";

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const trackCompanies = [
    { name: "Enterprise Alpha", industry: "Cloud Infrastructure", positions: "140+ Roles", rating: "4.6 ★", location: "Bengaluru" },
    { name: "Beta Systems", industry: "FinTech & Payments", positions: "95+ Roles", rating: "4.2 ★", location: "Remote" },
    { name: "Quantum Analytics", industry: "Artificial Intelligence", positions: "60+ Roles", rating: "4.8 ★", location: "Mumbai" },
    { name: "Nexus Healthcare", industry: "HealthTech", positions: "40+ Roles", rating: "4.0 ★", location: "Pune" },
  ];

  const filtered = trackCompanies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-73px)] bg-[#F7F7F7] px-4 py-12 flex flex-col items-center selection:bg-[#FF5A5F] selection:text-white">
      
      {/* Structural Header Area */}
      <div className="text-center mb-10 max-w-2xl">
        <div className="inline-block transform -rotate-1 border-2 border-[#222222] bg-[#FF5A5F] text-white text-xs font-black px-4 py-1 rounded-lg tracking-wider uppercase shadow-[3px_3px_0px_#222222] mb-4">
          🏢 Ecosystem Directory
        </div>
        <h1 className="text-4xl font-black text-[#222222] tracking-tight">
          Tracked Tech Enterprises
        </h1>
        <p className="text-sm text-[#484848] mt-2 font-medium">
          Explore payroll health, corporate cultures, and tier benchmarks across verified corporate entities.
        </p>
      </div>

      {/* Styled Interactive Filter Input */}
      <div className="w-full max-w-4xl mb-10">
        <input 
          type="text"
          placeholder="🔍 Filter enterprise names (e.g. Alpha)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border-2 border-[#222222] px-4 py-3 rounded-xl font-bold text-[#222222] shadow-[4px_4px_0px_#222222] focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20 placeholder-slate-400"
        />
      </div>

      {/* Corporate Dashboard Grid Grid */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((company, idx) => (
          <div 
            key={idx}
            className="bg-white border-2 border-[#222222] rounded-2xl p-6 shadow-[5px_5px_0px_#222222] hover:shadow-[7px_7px_0px_#222222] transition-all duration-150 hover:-translate-y-0.5 flex flex-col justify-between relative"
          >
            <div className="absolute top-4 right-4 bg-slate-50 border border-[#222222] text-xs font-bold px-2 py-0.5 rounded font-mono">
              {company.rating}
            </div>

            <div>
              <span className="text-[10px] font-black uppercase text-[#FF5A5F] tracking-widest font-mono">
                {company.industry}
              </span>
              <h3 className="text-xl font-black text-[#222222] tracking-tight mt-1">
                {company.name}
              </h3>
              <p className="text-xs text-[#484848] font-semibold mt-1 flex items-center gap-1">
                📍 {company.location}
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="text-[#484848] font-medium">Indexed Openings:</span>
              <span className="font-bold font-mono text-[#222222] bg-slate-100 px-2 py-1 rounded">
                {company.positions}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}