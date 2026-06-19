
export interface SalaryInput {
  annualCTC: number; // e.g., 1200000 for 12 LPA
}

export interface SalaryBreakdown {
  monthlyCTC: number;
  monthlyBaseGross: number;
  epfDeduction: number;
  professionalTax: number;
  monthlyIncomeTax: number;
  monthlyInHand: number;
  annualTax: number;
}

export function calculateInHandSalary(ctc: number): SalaryBreakdown {
  const monthlyCTC = Math.round(ctc / 12);
  
  // 1. Rough approximation of Gross Salary (CTC minus company benefits/variable components, usually ~90% of CTC)
  const annualGross = ctc * 0.90;
  const monthlyBaseGross = Math.round(annualGross / 12);

  // 2. Standard Deductions
  // Employee EPF: 12% of Basic (Assuming Basic is 50% of Gross), capped or flat
  const monthlyEPF = Math.min(Math.round((monthlyBaseGross * 0.5) * 0.12), 1800);
  const annualEPF = monthlyEPF * 12;

  // Professional Tax (Standard across states, approx ₹200/month, ₹2500/year)
  const monthlyPT = 200;
  const annualPT = 2400;

  // 3. Income Tax Calculation (New Tax Regime - Budget 2025 updates valid for 2026)
  const standardDeduction = 75000;
  const taxableIncome = Math.max(0, annualGross - standardDeduction - annualPT);

  let annualTax = 0;

  // Tax Slabs (New Regime)
  // Up to 4,00,000: Nil
  // 4,00,001 to 8,00,000: 5%
  // 8,00,001 to 12,00,000: 10%
  // 12,00,001 to 16,00,000: 15%
  // Above 16,00,000: 20%
  
  // Tax Rebate: Full tax rebate if taxable income is up to ₹12,00,000 (effectively zero tax up to 12L gross)
  if (annualGross <= 1200000) {
    annualTax = 0;
  } else {
    if (taxableIncome > 1600000) {
      annualTax += (taxableIncome - 1600000) * 0.20;
      annualTax += 400000 * 0.15; // 12L to 16L
      annualTax += 400000 * 0.10; // 8L to 12L
      annualTax += 400000 * 0.05; // 4L to 8L
    } else if (taxableIncome > 1200000) {
      annualTax += (taxableIncome - 1200000) * 0.15;
      annualTax += 400000 * 0.10;
      annualTax += 400000 * 0.05;
    } else if (taxableIncome > 800000) {
      annualTax += (taxableIncome - 800000) * 0.10;
      annualTax += 400000 * 0.05;
    } else if (taxableIncome > 400000) {
      annualTax += (taxableIncome - 400000) * 0.05;
    }
    
    // Add 4% Health & Education Cess
    annualTax = annualTax * 1.04;
  }

  const monthlyIncomeTax = Math.round(annualTax / 12);

  // 4. In-Hand Calculation
  // Take-home = Monthly Gross - EPF - PT - TDS (Tax)
  const monthlyInHand = monthlyBaseGross - monthlyEPF - monthlyPT - monthlyIncomeTax;

  return {
    monthlyCTC,
    monthlyBaseGross,
    epfDeduction: monthlyEPF,
    professionalTax: monthlyPT,
    monthlyIncomeTax,
    monthlyInHand,
    annualTax: Math.round(annualTax)
  };
}