
export interface SalaryInput {
  annualCTC: number;
  skillMatchScore: number; // 0 to 100
}

export interface SalaryBreakdown {
  monthlyCTC: number;
  monthlyBaseGross: number;
  skillPremiumPay: number; // New component
  epfDeduction: number;
  professionalTax: number;
  monthlyIncomeTax: number;
  monthlyInHand: number;
  annualTax: number;
}

export function calculateInHandSalary(ctc: number, skillScore: number = 0): SalaryBreakdown {
  const monthlyCTC = Math.round(ctc / 12);
  
  // 1. Calculate Skill Premium Pay (e.g., maximum 15% of monthly CTC for a 100% skill match)
  const maxPremiumPercent = 0.15;
  const premiumFactor = skillScore / 100;
  const skillPremiumPay = Math.round(monthlyCTC * maxPremiumPercent * premiumFactor);

  // 2. Base Gross Salary (90% of CTC) + Skill Premium added on top
  const monthlyBaseGross = Math.round((ctc * 0.90) / 12) + skillPremiumPay;
  const annualGross = monthlyBaseGross * 12;

  // 3. Standard Deductions
  const monthlyEPF = Math.min(Math.round((monthlyBaseGross * 0.5) * 0.12), 1800);
  const annualEPF = monthlyEPF * 12;
  const monthlyPT = 200;
  const annualPT = 2400;

  // 4. Income Tax (New Regime)
  const standardDeduction = 75000;
  const taxableIncome = Math.max(0, annualGross - standardDeduction - annualPT);
  let annualTax = 0;

  if (annualGross <= 1200000) {
    annualTax = 0;
  } else {
    if (taxableIncome > 1600000) {
      annualTax += (taxableIncome - 1600000) * 0.20 + (400000 * 0.15) + (400000 * 0.10) + (400000 * 0.05);
    } else if (taxableIncome > 1200000) {
      annualTax += (taxableIncome - 1200000) * 0.15 + (400000 * 0.10) + (400000 * 0.05);
    } else if (taxableIncome > 800000) {
      annualTax += (taxableIncome - 800000) * 0.10 + (400000 * 0.05);
    } else if (taxableIncome > 400000) {
      annualTax += (taxableIncome - 400000) * 0.05;
    }
    annualTax = annualTax * 1.04; // 4% Cess
  }

  const monthlyIncomeTax = Math.round(annualTax / 12);

  // 5. Net In-Hand Take Home
  const monthlyInHand = monthlyBaseGross - monthlyEPF - monthlyPT - monthlyIncomeTax;

  return {
    monthlyCTC,
    monthlyBaseGross,
    skillPremiumPay,
    epfDeduction: monthlyEPF,
    professionalTax: monthlyPT,
    monthlyIncomeTax,
    monthlyInHand,
    annualTax: Math.round(annualTax)
  };
}