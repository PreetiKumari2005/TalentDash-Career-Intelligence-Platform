import * as React from "react";

export default function HomePage() {
  // Platform metrics tracking array matching database parameters
  const operationalMetrics = [
    { label: "Verified Enterprises", count: "1,420+", description: "Active tech salary datasets" },
    { label: "Data Points Indexed", count: "45,000+", description: "Real-time compensation records" },
    { label: "Interview Arrays", count: "8,500+", description: "Direct developer transcripts" },
  ];

  return (
    <div className="relative min-h-[calc(100vh-73px)] bg-[#F7F7F7] px-4 py-12 flex flex-col items-center justify-center overflow-hidden selection:bg-[#FF5A5F] selection:text-white">
      
      {/* Dynamic 3D Grid Layer Concept Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `linear-gradient(#222 1px, transparent 1px), linear-gradient(to right, #222 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(60deg) translateY(-100px)',
          transformOrigin: 'top center'
        }}
      />

      {/* Main Copy Shell Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 flex flex-col items-center">
        
        {/* Stylized 3D Welcome Header */}
        <div className="transform -rotate-1 border-2 border-[#222222] bg-[#FF5A5F] text-white text-xs font-black px-4 py-1.5 rounded-xl tracking-wider uppercase shadow-[3px_3px_0px_#222222] mb-3 animate-bounce-short">
          ✨ Welcome to TechDash ✨
        </div>

        {/* Tactile High-Impact Heading */}
        <h1 className="text-5xl md:text-7xl font-black text-[#222222] tracking-tight leading-[1.05] drop-shadow-[0_2px_2px_rgba(0,0,0,0.05)]">
          Democratizing <br />
          <span className="relative inline-block text-[#FF5A5F]">
            Tech Pay
            {/* 3D Underline layer block */}
            <span className="absolute bottom-1 left-0 w-full h-2 bg-[#FF5A5F]/10 -z-10 rounded" />
          </span>
        </h1>
        
        {/* Core Narrative Text Block */}
        <p className="text-base md:text-lg text-[#484848] max-w-2xl font-medium leading-relaxed">
          Explore verified salaries, interview questions, and total compensation benchmarks for software professionals.
        </p>

        {/* Interactive Action Buttons with 3D Depressed Layer Mechanics */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          
          {/* Primary Action Button (Pink) */}
          <a 
            href="/salaries" 
            className="group relative w-full sm:w-auto inline-block text-center bg-[#FF5A5F] border-2 border-[#222222] text-white font-bold px-8 py-3.5 rounded-xl shadow-[4px_4px_0px_#222222] transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#222222]" 
          >
            Browse Salaries
          </a>
          
          {/* Secondary Action Button (White) */}
          <a 
            href="/calculate" 
            className="group relative w-full sm:w-auto inline-block text-center bg-white border-2 border-[#222222] text-[#222222] font-bold px-8 py-3.5 rounded-xl shadow-[4px_4px_0px_#222222] transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#222222]"
          >
            Calculate Pay
          </a>

        </div>
      </div>

      {/* Isometric Metric Data Cards Container Block */}
      <section className="relative z-10 mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-2">
        {operationalMetrics.map((metric, index) => (
          <div 
            key={index}
            className="relative p-6 bg-white border-2 border-[#222222] rounded-2xl shadow-[6px_6px_0px_rgba(34,34,34,0.9)] hover:shadow-[8px_8px_0px_#222222] transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
          >
            {/* Top Border Highlight Line Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF5A5F]/40 to-transparent rounded-t-xl" />
            
            <div>
              <span className="text-xs font-bold text-[#484848] uppercase tracking-widest font-mono">
                {metric.label}
              </span>
              <h3 className="text-3xl font-black text-[#222222] tracking-tight mt-2 font-mono">
                {metric.count}
              </h3>
            </div>
            
            <p className="text-xs text-[#484848] font-medium mt-4 pt-3 border-t border-slate-100">
              {metric.description}
            </p>
          </div>
        ))}
      </section>

    </div>
  );
}