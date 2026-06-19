// app/compare/page.tsx
'use client';
import * as React from "react";
import { useState } from "react";

interface OfferDetails {
  companyName: string;
  baseSalary: number;
  variablePay: number;
  stockOptions: number;
  location: string;
}

export default function CompareOffersPage() {
  const [offerA, setOfferA] = useState<OfferDetails>({
    companyName: "Enterprise Alpha",
    baseSalary: 1200000,
    variablePay: 150000,
    stockOptions: 200000,
    location: "Bengaluru",
  });

  const [offerB, setOfferB] = useState<OfferDetails>({
    companyName: "Beta Systems",
    baseSalary: 1400000,
    variablePay: 100000,
    stockOptions: 0,
    location: "Remote",
  });

  const calculateTotalCTC = (offer: OfferDetails) => {
    return offer.baseSalary + offer.variablePay + offer.stockOptions;
  };

  const totalA = calculateTotalCTC(offerA);
  const totalB = calculateTotalCTC(offerB);

  return (
    <div className="min-h-[calc(100vh-73px)] bg-[#F7F7F7] px-4 py-12 flex flex-col items-center selection:bg-[#FF5A5F] selection:text-white">
      
      {/* Page Title Header Block */}
      <div className="text-center mb-12 max-w-2xl">
        <div className="inline-block transform -rotate-1 border-2 border-[#222222] bg-[#FF5A5F] text-white text-xs font-black px-4 py-1 rounded-lg tracking-wider uppercase shadow-[3px_3px_0px_#222222] mb-4">
          ⚖️ Decision Analytics Engine
        </div>
        <h1 className="text-4xl font-black text-[#222222] tracking-tight">
          Compare Compensation Offers
        </h1>
        <p className="text-sm text-[#484848] mt-2 font-medium">
          Evaluate base pay vectors, bonus metrics, and overall total CTC values cleanly side-by-side.
        </p>
      </div>

      {/* Main Grid Content Matrix */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card: Offer A */}
        <div className="bg-white border-2 border-[#222222] rounded-2xl p-6 shadow-[6px_6px_0px_#222222] relative transition-transform hover:-translate-y-0.5">
          <div className="absolute -top-3 left-6 border border-[#222222] bg-white text-[#222222] px-3 py-0.5 text-xs font-bold rounded shadow-[2px_2px_0px_#222222]">
            Offer Option A
          </div>
          
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#484848] uppercase tracking-wider mb-1">Company / Enterprise</label>
              <input 
                type="text" 
                value={offerA.companyName}
                onChange={(e) => setOfferA({ ...offerA, companyName: e.target.value })}
                className="w-full border-2 border-[#222222] rounded-xl px-3 py-2 font-bold text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#484848] uppercase tracking-wider mb-1">Base Salary (₹)</label>
                <input 
                  type="number" 
                  value={offerA.baseSalary}
                  onChange={(e) => setOfferA({ ...offerA, baseSalary: Number(e.target.value) })}
                  className="w-full border-2 border-[#222222] font-mono rounded-xl px-3 py-2 text-sm text-[#222222] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#484848] uppercase tracking-wider mb-1">Variable Pay (₹)</label>
                <input 
                  type="number" 
                  value={offerA.variablePay}
                  onChange={(e) => setOfferA({ ...offerA, variablePay: Number(e.target.value) })}
                  className="w-full border-2 border-[#222222] font-mono rounded-xl px-3 py-2 text-sm text-[#222222] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#484848] uppercase tracking-wider mb-1">Stock / RSUs (₹)</label>
                <input 
                  type="number" 
                  value={offerA.stockOptions}
                  onChange={(e) => setOfferA({ ...offerA, stockOptions: Number(e.target.value) })}
                  className="w-full border-2 border-[#222222] font-mono rounded-xl px-3 py-2 text-sm text-[#222222] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#484848] uppercase tracking-wider mb-1">Location</label>
                <input 
                  type="text" 
                  value={offerA.location}
                  onChange={(e) => setOfferA({ ...offerA, location: e.target.value })}
                  className="w-full border-2 border-[#222222] rounded-xl px-3 py-2 text-sm text-[#222222] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Result Block Option A */}
          <div className="mt-6 pt-5 border-t-2 border-dashed border-slate-200 flex justify-between items-center bg-[#F7F7F7]/60 p-4 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-[#484848] uppercase">Computed Total CTC:</span>
            <span className="text-xl font-black font-mono text-[#222222]">₹{totalA.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Card: Offer B */}
        <div className="bg-white border-2 border-[#222222] rounded-2xl p-6 shadow-[6px_6px_0px_#222222] relative transition-transform hover:-translate-y-0.5">
          <div className="absolute -top-3 left-6 border border-[#222222] bg-[#FF5A5F] text-white px-3 py-0.5 text-xs font-bold rounded shadow-[2px_2px_0px_#222222]">
            Offer Option B
          </div>
          
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#484848] uppercase tracking-wider mb-1">Company / Enterprise</label>
              <input 
                type="text" 
                value={offerB.companyName}
                onChange={(e) => setOfferB({ ...offerB, companyName: e.target.value })}
                className="w-full border-2 border-[#222222] rounded-xl px-3 py-2 font-bold text-[#222222] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#484848] uppercase tracking-wider mb-1">Base Salary (₹)</label>
                <input 
                  type="number" 
                  value={offerB.baseSalary}
                  onChange={(e) => setOfferB({ ...offerB, baseSalary: Number(e.target.value) })}
                  className="w-full border-2 border-[#222222] font-mono rounded-xl px-3 py-2 text-sm text-[#222222] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#484848] uppercase tracking-wider mb-1">Variable Pay (₹)</label>
                <input 
                  type="number" 
                  value={offerB.variablePay}
                  onChange={(e) => setOfferB({ ...offerB, variablePay: Number(e.target.value) })}
                  className="w-full border-2 border-[#222222] font-mono rounded-xl px-3 py-2 text-sm text-[#222222] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#484848] uppercase tracking-wider mb-1">Stock / RSUs (₹)</label>
                <input 
                  type="number" 
                  value={offerB.stockOptions}
                  onChange={(e) => setOfferB({ ...offerB, stockOptions: Number(e.target.value) })}
                  className="w-full border-2 border-[#222222] font-mono rounded-xl px-3 py-2 text-sm text-[#222222] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#484848] uppercase tracking-wider mb-1">Location</label>
                <input 
                  type="text" 
                  value={offerB.location}
                  onChange={(e) => setOfferB({ ...offerB, location: e.target.value })}
                  className="w-full border-2 border-[#222222] rounded-xl px-3 py-2 text-sm text-[#222222] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Result Block Option B */}
          <div className="mt-6 pt-5 border-t-2 border-dashed border-slate-200 flex justify-between items-center bg-[#F7F7F7]/60 p-4 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-[#484848] uppercase">Computed Total CTC:</span>
            <span className="text-xl font-black font-mono text-[#222222]">₹{totalB.toLocaleString('en-IN')}</span>
          </div>
        </div>

      </div>

      {/* Delta Analytics Summary Flag Element */}
      <div className="mt-12 w-full max-w-5xl border-2 border-[#222222] bg-white rounded-2xl p-6 shadow-[6px_6px_0px_#222222] flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-left">
          <h4 className="font-black text-[#222222] text-lg">Variance Analyzer Delta</h4>
          <p className="text-xs text-[#484848] font-medium mt-0.5">Automated computational gap index between the active offers.</p>
        </div>
        <div className="bg-[#FF5A5F]/10 border-2 border-dashed border-[#FF5A5F] text-[#FF5A5F] font-black font-mono text-lg px-6 py-3 rounded-xl tracking-tight">
          Difference: ₹{Math.abs(totalA - totalB).toLocaleString('en-IN')}
        </div>
      </div>

    </div>
  );
}