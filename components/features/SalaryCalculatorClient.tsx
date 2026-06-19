'use client'

import { useState } from 'react'

export function SalaryCalculatorClient() {
  const [ctc, setCtc] = useState('')
  const [result, setResult] = useState<null | {
    monthly: number
    annual: number
    tax: number
    pf: number
    inhand: number
  }>(null)

  function calculate() {
    const annual = parseFloat(ctc) * 100000
    if (!annual || annual <= 0) return

    // PF = 12% of basic (basic = 50% of CTC)
    const basic = annual * 0.5
    const pf = basic * 0.12

    // Tax calculation (simplified FY2024-25 new regime)
    let tax = 0
    if (annual <= 300000) tax = 0
    else if (annual <= 600000) tax = (annual - 300000) * 0.05
    else if (annual <= 900000) tax = 15000 + (annual - 600000) * 0.10
    else if (annual <= 1200000) tax = 45000 + (annual - 900000) * 0.15
    else if (annual <= 1500000) tax = 90000 + (annual - 1200000) * 0.20
    else tax = 150000 + (annual - 1500000) * 0.30

    // 4% cess on tax
    tax = tax * 1.04

    const inhand = annual - tax - pf
    const monthly = inhand / 12

    setResult({
      monthly: Math.round(monthly),
      annual: Math.round(annual),
      tax: Math.round(tax),
      pf: Math.round(pf),
      inhand: Math.round(inhand),
    })
  }

  const fmt = (n: number) =>
    n >= 100000
      ? `₹${(n / 100000).toFixed(2)} L`
      : `₹${n.toLocaleString('en-IN')}`

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
        <label className="block text-sm font-medium text-[#484848] mb-2">
          Annual CTC (in Lakhs)
        </label>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717171] text-sm">₹</span>
            <input
              type="number"
              value={ctc}
              onChange={(e) => setCtc(e.target.value)}
              placeholder="e.g. 42"
              className="w-full pl-7 pr-12 py-2.5 text-sm border border-[#EBEBEB] rounded focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/30 focus:border-[#FF5A5F]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#717171] text-xs">LPA</span>
          </div>
          <button
            onClick={calculate}
            className="px-6 py-2.5 bg-[#FF5A5F] text-white text-sm font-medium rounded hover:bg-[#e04e53] transition-colors"
          >
            Calculate
          </button>
        </div>
        <p className="text-xs text-[#717171] mt-2">
          Based on new tax regime FY2024-25. Basic salary assumed at 50% of CTC.
        </p>
      </div>

      {/* Result */}
      {result && (
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
          <h2 className="text-base font-semibold text-[#222222] mb-4">
            Breakdown
          </h2>

          {/* In-hand highlight */}
          <div className="bg-[#F7F7F7] rounded-lg p-4 mb-4 text-center">
            <p className="text-xs text-[#717171] mb-1">Monthly In-Hand</p>
            <p className="text-4xl font-bold text-[#0369A1]">
              {fmt(result.monthly)}
            </p>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Gross CTC (Annual)',    value: result.annual,  color: 'text-[#222222]' },
              { label: 'PF Deduction',          value: -result.pf,     color: 'text-[#D93025]' },
              { label: 'Income Tax (Est.)',     value: -result.tax,    color: 'text-[#D93025]' },
              { label: 'Annual In-Hand',        value: result.inhand,  color: 'text-[#008A05]' },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between py-2 border-b border-[#EBEBEB] last:border-0"
              >
                <span className="text-sm text-[#484848]">{row.label}</span>
                <span className={`text-sm font-semibold ${row.color}`}>
                  {row.value < 0 ? `-${fmt(Math.abs(row.value))}` : fmt(row.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
