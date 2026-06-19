'use client'

import { useState } from 'react'

export function EquityCalculatorClient() {
  const [shares, setShares] = useState('')
  const [strikePrice, setStrikePrice] = useState('')
  const [currentPrice, setCurrentPrice] = useState('')
  const [vestedPercent, setVestedPercent] = useState('25')
  const [result, setResult] = useState<null | {
    vestedShares: number
    grossValue: number
    costToExercise: number
    netValue: number
    tax: number
    netAfterTax: number
  }>(null)

  function calculate() {
    const totalShares = parseFloat(shares)
    const strike = parseFloat(strikePrice)
    const current = parseFloat(currentPrice)
    const vested = parseFloat(vestedPercent) / 100

    if (!totalShares || !strike || !current) return

    const vestedShares = Math.floor(totalShares * vested)
    const grossValue = vestedShares * current
    const costToExercise = vestedShares * strike
    const netValue = grossValue - costToExercise
    const tax = netValue * 0.3 // 30% tax estimate
    const netAfterTax = netValue - tax

    setResult({
      vestedShares,
      grossValue: Math.round(grossValue),
      costToExercise: Math.round(costToExercise),
      netValue: Math.round(netValue),
      tax: Math.round(tax),
      netAfterTax: Math.round(netAfterTax),
    })
  }

  const fmt = (n: number) =>
    n >= 100000
      ? `₹${(n / 100000).toFixed(2)}L`
      : `₹${n.toLocaleString('en-IN')}`

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 space-y-4">
        {[
          { label: 'Total Options/Shares Granted', value: shares, setter: setShares, placeholder: 'e.g. 10000', suffix: 'shares' },
          { label: 'Strike Price per Share (₹)',    value: strikePrice, setter: setStrikePrice, placeholder: 'e.g. 50', suffix: '₹' },
          { label: 'Current Share Price (₹)',       value: currentPrice, setter: setCurrentPrice, placeholder: 'e.g. 500', suffix: '₹' },
        ].map((field) => (
          <div key={field.label}>
            <label className="block text-sm font-medium text-[#484848] mb-2">{field.label}</label>
            <div className="relative">
              <input
                type="number"
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-3 pr-16 py-2.5 text-sm border border-[#EBEBEB] rounded focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/30"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#717171] text-xs">{field.suffix}</span>
            </div>
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-[#484848] mb-2">
            Vested: {vestedPercent}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            step="25"
            value={vestedPercent}
            onChange={(e) => setVestedPercent(e.target.value)}
            className="w-full accent-[#FF5A5F]"
          />
          <div className="flex justify-between text-xs text-[#717171] mt-1">
            <span>0%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span>
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full py-2.5 bg-[#FF5A5F] text-white text-sm font-medium rounded hover:bg-[#e04e53] transition-colors"
        >
          Calculate Equity Value
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
          <div className="bg-[#F7F7F7] rounded-lg p-4 mb-4 text-center">
            <p className="text-xs text-[#717171] mb-1">Net Value After Tax</p>
            <p className="text-4xl font-bold text-[#008A05]">{fmt(result.netAfterTax)}</p>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Vested Shares',        value: `${result.vestedShares.toLocaleString()} shares`, color: 'text-[#222222]' },
              { label: 'Gross Value',          value: fmt(result.grossValue),     color: 'text-[#222222]' },
              { label: 'Cost to Exercise',     value: `-${fmt(result.costToExercise)}`, color: 'text-[#D93025]' },
              { label: 'Net Gain',             value: fmt(result.netValue),       color: 'text-[#222222]' },
              { label: 'Est. Tax (30%)',        value: `-${fmt(result.tax)}`,      color: 'text-[#D93025]' },
              { label: 'Net After Tax',        value: fmt(result.netAfterTax),    color: 'text-[#008A05]' },
            ].map((row) => (
              <div key={row.label} className="flex justify-between py-2 border-b border-[#EBEBEB] last:border-0">
                <span className="text-sm text-[#484848]">{row.label}</span>
                <span className={`text-sm font-semibold ${row.color}`}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
