import * as React from "react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-73px)] bg-[#F7F7F7] px-4 text-center">
      {/* Main Heading Group */}
      <h1 className="text-5xl md:text-6xl font-black text-[#222222] tracking-tight max-w-4xl">
        Democratizing <span className="text-[#FF5A5F]">Tech Pay</span>
      </h1>
      
      <p className="mt-4 text-base md:text-lg text-[#484848] max-w-2xl">
        Explore verified salaries, interview questions, and total compensation benchmarks for software professionals.
      </p>

      {/* Interactive Action Buttons */}
      <div className="mt-8 flex items-center gap-4">
        <a 
          href="/salaries" 
          className="bg-[#FF5A5F] hover:bg-[#e04f53] text-white font-semibold px-6 py-3 rounded-xl shadow-sm transition-colors" 
        >
          Browse Salaries
        </a>
        
        <a 
          href="/calculate" 
          className="bg-white hover:bg-slate-50 text-[#222222] border border-slate-200 font-semibold px-6 py-3 rounded-xl shadow-sm transition-colors"
        >
          Calculate Pay
        </a>
      </div>
    </div>
  );
}