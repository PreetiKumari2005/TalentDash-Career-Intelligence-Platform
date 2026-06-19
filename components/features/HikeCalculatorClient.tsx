'use client'

import { useState } from 'react'

export function HikeCalculatorClient() {
  const [current, setCurrent] = useState('')
  const [hike, setHike] = useState('')
  const [result, setResult] = useState<null | {
    newSalary: number
    increase: number
    hikeAmount: number
  }>(null)

  function calculate() {
    const currentCtc = parseFloat(current)
    const hikePercent = parseFloat(hike)
    if (!currentCtc || !hikePercent) return

    const hikeAmount = (currentCtc * hikePercent) / 100
    const newSalary = currentCtc + hikeAmount

    setResult({
      newSalary: Math.round(newSalary * 100) / 100,
      increase: Math.round(hikeAmount * 100) / 100,
      hikeAmount: Math.round(hikeAmount * 100) / 100,
    })
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#484848] mb-2">
            Current CTC (in Lakhs)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717171] text-sm">₹</span>
            <input
              type="number"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="e.g. 18"
              className="w-full pl-7 pr-12 py-2.5 text-sm border border-[#EBEBEB] rounded focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/30"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#717171] text-xs">LPA</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#484848] mb-2">
            Hike Percentage
          </label>
          <div className="relative">
            <input
              type="number"
              value={hike}
              onChange={(e) => setHike(e.target.value)}
              placeholder="e.g. 30"
              className="w-full px-3 pr-8 py-2.5 text-sm border border-[#EBEBEB] rounded focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/30"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#717171] text-sm">%</span>
          </div>
        </div>
        <button
          onClick={calculate}
          className="w-full py-2.5 bg-[#FF5A5F] text-white text-sm font-medium rounded hover:bg-[#e04e53] transition-colors"
        >
          Calculate Hike
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
          <div className="bg-[#F7F7F7] rounded-lg p-4 mb-4 text-center">
            <p className="text-xs text-[#717171] mb-1">New CTC</p>
            <p className="text-4xl font-bold text-[#008A05]">
              ₹{result.newSalary} LPA
            </p>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Current CTC',    value: `₹${current} LPA`,            color: 'text-[#222222]' },
              { label: 'Hike Amount',    value: `+₹${result.hikeAmount} LPA`, color: 'text-[#008A05]' },
              { label: 'New CTC',        value: `₹${result.newSalary} LPA`,   color: 'text-[#0369A1]' },
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
