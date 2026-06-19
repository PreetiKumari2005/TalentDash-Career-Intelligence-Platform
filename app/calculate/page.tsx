
'use client';
import { useState } from 'react';

export default function SalaryCalculator() {
  const [ctc, setCtc] = useState<string>('1200000'); // Default 12 LPA
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ annualCTC: ctc }),
      });
      const json = await res.json();
      if (json.success) setReport(json.data);
    } catch (err) {
      console.error("Calculation transmission error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Take-Home Salary Estimator</h1>
        <p className="text-sm text-slate-500 mt-1">Break down your CTC into actual cash-in-hand under the New Tax Regime</p>
      </div>

      <form onSubmit={handleCalculate} className="max-w-md mx-auto mb-8 flex gap-3">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Enter Annual CTC (₹)</label>
          <input 
            type="number" 
            value={ctc} 
            onChange={(e) => setCtc(e.target.value)} 
            placeholder="e.g. 1200000"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button 
          type="submit" 
          disabled={loading} 
          className="h-max mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Breakdown'}
        </button>
      </form>

      {report && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
          
          {/* Box 1: In Hand */}
          <div className="p-5 bg-emerald-50/60 border border-emerald-100 rounded-xl text-center">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Monthly In-Hand</span>
            <h2 className="text-3xl font-mono font-bold text-emerald-900 mt-2">₹{report.monthlyInHand.toLocaleString('en-IN')}</h2>
            <p className="text-xs text-emerald-600 mt-1">This hits your bank account</p>
          </div>

          {/* Box 2: CTC Specs */}
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Gross Metrics Breakdown</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Monthly CTC:</span> <span className="font-mono font-medium">₹{report.monthlyCTC.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Estimated Base Gross:</span> <span className="font-mono font-medium">₹{report.monthlyBaseGross.toLocaleString('en-IN')}</span></div>
            </div>
          </div>

          {/* Box 3: Deductions */}
          <div className="p-5 bg-red-50/50 border border-red-100 rounded-xl">
            <h3 className="text-xs font-bold text-red-700 uppercase tracking-wider mb-3">Monthly Deductions</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Provident Fund (EPF):</span> <span className="font-mono text-red-600">-₹{report.epfDeduction}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Professional Tax (PT):</span> <span className="font-mono text-red-600">-₹{report.professionalTax}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Income Tax (TDS):</span> <span className="font-mono text-red-600">-₹{report.monthlyIncomeTax}</span></div>
            </div>
            <div className="mt-3 pt-2 border-t border-red-100 flex justify-between text-xs font-semibold text-red-800">
              <span>Annual Tax Liability:</span>
              <span className="font-mono">₹{report.annualTax.toLocaleString('en-IN')}</span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}