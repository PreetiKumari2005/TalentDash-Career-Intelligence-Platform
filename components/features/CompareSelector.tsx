"use client";
import * as React from "react";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

interface CompareSelectorProps {
  companies: { slug: string; name: string }[];
  onCompare: (slugA: string, slugB: string) => void;
}

export const CompareSelector: React.FC<CompareSelectorProps> = ({ companies, onCompare }) => {
  const [compA, setCompA] = React.useState("");
  const [compB, setCompB] = React.useState("");

  const options = companies.map(c => ({ label: c.name, value: c.slug }));

  return (
    <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold text-slate-900 mb-4 text-center">Compare Side-by-Side Compensation</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <Select 
          options={options} 
          placeholder="Select Company A" 
          value={compA} 
          onChange={(e) => setCompA(e.target.value)} 
        />
        <Select 
          options={options.filter(o => o.value !== compA)} 
          placeholder="Select Company B" 
          value={compB} 
          onChange={(e) => setCompB(e.target.value)} 
        />
      </div>
      <Button 
        className="w-full mt-4" 
        disabled={!compA || !compB}
        onClick={() => onCompare(compA, compB)}
      >
        Compare Now
      </Button>
    </div>
  );
};