"use client";
import * as React from "react";

interface CurrencyToggleProps {
  currentCurrency: string;
  onCurrencyChange: (currency: string) => void;
}

export const CurrencyToggle: React.FC<CurrencyToggleProps> = ({ currentCurrency, onCurrencyChange }) => {
  const currencies = ["USD", "INR", "EUR", "GBP"];

  return (
    <div className="inline-flex rounded-md shadow-sm bg-slate-100 p-1 border border-slate-200">
      {currencies.map((curr) => (
        <button
          key={curr}
          onClick={() => onCurrencyChange(curr)}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
            currentCurrency === curr
              ? "bg-white text-indigo-600 shadow-sm border border-slate-200/50"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          {curr}
        </button>
      ))}
    </div>
  );
};