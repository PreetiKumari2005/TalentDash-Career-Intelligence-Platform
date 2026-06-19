// lib/calculator.ts
export interface CalculationInput {
  experienceYears: number;
  skillMatchScore: number; // 0 to 100
  marketDemandIndex: number; // 1 to 5
}

export interface CalculationResult {
  marketPercentile: number;
  estimatedSalaryMax: number;
  recommendationLevel: 'High' | 'Medium' | 'Low';
}

export function calculateCareerMetrics(data: CalculationInput): CalculationResult {
  const { experienceYears, skillMatchScore, marketDemandIndex } = data;
  
  // Base predictive calculation logic
  const baseScore = (skillMatchScore * 0.5) + (experienceYears * 5) + (marketDemandIndex * 10);
  const marketPercentile = Math.min(Math.max(Math.round(baseScore), 10), 99);
  
  const estimatedSalaryMax = 50000 + (marketPercentile * 1500);
  
  let recommendationLevel: 'High' | 'Medium' | 'Low' = 'Medium';
  if (marketPercentile > 75) recommendationLevel = 'High';
  else if (marketPercentile < 40) recommendationLevel = 'Low';

  return {
    marketPercentile,
    estimatedSalaryMax,
    recommendationLevel,
  };
}