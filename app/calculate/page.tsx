
'use client';
import { useState } from 'react';

export default function CalculatePage() {
  const [formData, setFormData] = useState({ experienceYears: 2, skillMatchScore: 80, marketDemandIndex: 3 });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) setResult(json.data);
    } catch (err) {
      console.error("Calculation processing error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md border border-slate-200">
      <h1 className="text-xl font-bold text-slate-900 mb-4">TalentDash Intelligence Engine</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Years of Experience</label>
          <input 
            type="number" 
            value={formData.experienceYears}
            onChange={(e) => setFormData({...formData, experienceYears: Number(e.target.value)})}
            className="mt-1 block w-full rounded-md border border-slate-300 p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Skill Match Score (%)</label>
          <input 
            type="number" max="100" 
            value={formData.skillMatchScore}
            onChange={(e) => setFormData({...formData, skillMatchScore: Number(e.target.value)})}
            className="mt-1 block w-full rounded-md border border-slate-300 p-2"
          />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
          {loading ? 'Processing...' : 'Compute Intelligence Metrics'}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-md">
          <h3 className="font-semibold text-slate-800">Results Matrix:</h3>
          <p className="text-sm text-slate-600">Market Percentile: <span className="font-mono font-bold text-slate-900">{result.marketPercentile}%</span></p>
          <p className="text-sm text-slate-600">Estimated Cap: <span className="font-mono font-bold text-slate-900">${result.estimatedSalaryMax}</span></p>
          <p className="text-sm text-slate-600">Status Vector: <span className="font-bold text-green-600">{result.recommendationLevel}</span></p>
        </div>
      )}
    </div>
  );
}