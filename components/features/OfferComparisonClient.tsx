'use client'

import { useState } from 'react'

interface Offer {
  company: string
  role: string
  base: string
  bonus: string
  stock: string
  joiningBonus: string
}

const EMPTY_OFFER: Offer = {
  company: '', role: '', base: '', bonus: '', stock: '', joiningBonus: '',
}

export function OfferComparisonClient() {
  const [offer1, setOffer1] = useState<Offer>({ ...EMPTY_OFFER })
  const [offer2, setOffer2] = useState<Offer>({ ...EMPTY_OFFER })

  const tc1 = (parseFloat(offer1.base) || 0) + (parseFloat(offer1.bonus) || 0) + (parseFloat(offer1.stock) || 0)
  const tc2 = (parseFloat(offer2.base) || 0) + (parseFloat(offer2.bonus) || 0) + (parseFloat(offer2.stock) || 0)
  const winner = tc1 > tc2 ? 1 : tc2 > tc1 ? 2 : 0

  const fields: { key: keyof Offer; label: string; suffix?: string }[] = [
    { key: 'company',      label: 'Company Name' },
    { key: 'role',         label: 'Role / Title' },
    { key: 'base',         label: 'Base Salary',     suffix: 'LPA' },
    { key: 'bonus',        label: 'Annual Bonus',    suffix: 'LPA' },
    { key: 'stock',        label: 'Stock / ESOP',    suffix: 'LPA' },
    { key: 'joiningBonus', label: 'Joining Bonus',   suffix: '₹' },
  ]

  function updateOffer(offer: Offer, key: keyof Offer, value: string, setter: (o: Offer) => void) {
    setter({ ...offer, [key]: value })
  }

  const fmt = (n: number) => n > 0 ? `₹${n.toFixed(1)} LPA` : '—'
  const delta = tc1 - tc2

  return (
    <div className="space-y-6">
      {/* Input grid */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { offer: offer1, setter: setOffer1, label: 'Offer A', num: 1 },
          { offer: offer2, setter: setOffer2, label: 'Offer B', num: 2 },
        ].map(({ offer, setter, label, num }) => (
          <div key={label} className="bg-white rounded-xl border border-[#EBEBEB] p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-[#222222]">{label}</h2>
              {winner === num && (
                <span className="px-2 py-0.5 bg-[#0369A1] text-white text-xs rounded font-medium">
                  Better TC ✓
                </span>
              )}
            </div>
            <div className="space-y-3">
              {fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-xs text-[#717171] mb-1">{field.label}</label>
                  <div className="relative">
                    <input
                      type={['base','bonus','stock','joiningBonus'].includes(field.key) ? 'number' : 'text'}
                      value={offer[field.key]}
                      onChange={(e) => updateOffer(offer, field.key, e.target.value, setter)}
                      placeholder={field.key === 'company' ? 'e.g. Google' : field.key === 'role' ? 'e.g. SDE-II' : '0'}
                      className="w-full px-3 py-2 text-sm border border-[#EBEBEB] rounded focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/30 pr-12"
                    />
                    {field.suffix && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#717171] text-xs">
                        {field.suffix}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#EBEBEB]">
              <div className="flex justify-between">
                <span className="text-sm text-[#484848]">Total TC</span>
                <span className={`text-base font-bold ${winner === num ? 'text-[#008A05]' : 'text-[#0369A1]'}`}>
                  {fmt(num === 1 ? tc1 : tc2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison result */}
      {(tc1 > 0 || tc2 > 0) && (
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
          <h2 className="font-semibold text-[#222222] mb-4">Comparison</h2>
          <div className="space-y-3">
            {[
              { label: 'Offer A Total TC', value: fmt(tc1), color: winner === 1 ? 'text-[#008A05]' : 'text-[#222222]' },
              { label: 'Offer B Total TC', value: fmt(tc2), color: winner === 2 ? 'text-[#008A05]' : 'text-[#222222]' },
              {
                label: 'Difference',
                value: delta === 0 ? 'Equal' : `${delta > 0 ? 'Offer A' : 'Offer B'} pays more by ₹${Math.abs(delta).toFixed(1)} LPA`,
                color: delta === 0 ? 'text-[#717171]' : 'text-[#008A05]',
              },
            ].map((row) => (
              <div key={row.label} className="flex justify-between py-2 border-b border-[#EBEBEB] last:border-0">
                <span className="text-sm text-[#484848]">{row.label}</span>
                <span className={`text-sm font-semibold ${row.color}`}>{row.value}</span>
              </div>
            ))}
          </div>

          {winner !== 0 && (
            <div className="mt-4 p-3 bg-[#F7F7F7] rounded-lg text-center">
              <p className="text-sm font-medium text-[#222222]">
                🏆 Offer {winner === 1 ? 'A' : 'B'}
                {offer1.company || offer2.company
                  ? ` (${winner === 1 ? offer1.company : offer2.company})`
                  : ''}{' '}
                has a better total compensation
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
