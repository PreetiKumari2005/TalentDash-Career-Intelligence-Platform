'use client'

import { useState } from 'react'
import type { SalaryRecord } from '../../types/salary'
import { formatSalary, formatDelta } from '@/lib/format'
import { LEVEL_DISPLAY, LEVEL_BADGE_CLASS } from '@/types/enums'

interface CompareClientProps {
  salaries: SalaryRecord[]
}

export function CompareClient({ salaries }: CompareClientProps) {
  const [s1Id, setS1Id] = useState<string>('')
  const [s2Id, setS2Id] = useState<string>('')

  const record1 = salaries.find((s) => s.id === s1Id) ?? null
  const record2 = salaries.find((s) => s.id === s2Id) ?? null

  const delta = record1 && record2
    ? {
        base:  record1.baseSalary - record2.baseSalary,
        bonus: record1.bonus - record2.bonus,
        stock: record1.stock - record2.stock,
        tc:    record1.totalCompensation - record2.totalCompensation,
        exp:   record1.experienceYears - record2.experienceYears,
      }
    : null

  const winner =
    delta === null ? null
    : delta.tc > 0 ? 'record1'
    : delta.tc < 0 ? 'record2'
    : 'tie'

  const rows = [
    { label: 'Company',    v1: record1?.companyName,       v2: record2?.companyName,       delta: null },
    { label: 'Role',       v1: record1?.role,               v2: record2?.role,               delta: null },
    { label: 'Location',   v1: record1?.location,           v2: record2?.location,           delta: null },
    { label: 'Experience', v1: record1 ? `${record1.experienceYears}y` : null, v2: record2 ? `${record2.experienceYears}y` : null, delta: delta?.exp ?? null, isNum: false },
    { label: 'Base',       v1: record1 ? formatSalary(record1.baseSalary, record1.currency) : null, v2: record2 ? formatSalary(record2.baseSalary, record2.currency) : null, delta: delta?.base ?? null },
    { label: 'Bonus',      v1: record1 ? formatSalary(record1.bonus, record1.currency) : null,      v2: record2 ? formatSalary(record2.bonus, record2.currency) : null,      delta: delta?.bonus ?? null },
    { label: 'Stock',      v1: record1 ? formatSalary(record1.stock, record1.currency) : null,      v2: record2 ? formatSalary(record2.stock, record2.currency) : null,      delta: delta?.stock ?? null },
    { label: 'Total TC',   v1: record1 ? formatSalary(record1.totalCompensation, record1.currency) : null, v2: record2 ? formatSalary(record2.totalCompensation, record2.currency) : null, delta: delta?.tc ?? null, isTc: true },
  ]

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#222222] mb-2">Compare Offers</h1>
      <p className="text-[#717171] mb-8">Select two salary records to compare side by side</p>

      {/* Selectors */}
      <div className="grid grid-cols-2 gap-6 mb-10">
        <div>
          <label className="block text-xs font-medium text-[#484848] mb-2">Offer A</label>
          <select
            value={s1Id}
            onChange={(e) => setS1Id(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-[#EBEBEB] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/30"
          >
            <option value="">Select a record...</option>
            {salaries.map((s) => (
              <option key={s.id} value={s.id}>
                {s.companyName} — {s.role} ({LEVEL_DISPLAY[s.level]}) · {s.location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#484848] mb-2">Offer B</label>
          <select
            value={s2Id}
            onChange={(e) => setS2Id(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-[#EBEBEB] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/30"
          >
            <option value="">Select a record...</option>
            {salaries.map((s) => (
              <option key={s.id} value={s.id}>
                {s.companyName} — {s.role} ({LEVEL_DISPLAY[s.level]}) · {s.location}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Table */}
      {record1 && record2 ? (
        <div className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-4 bg-[#F7F7F7] border-b border-[#EBEBEB]">
            <div className="px-4 py-3 text-xs font-semibold text-[#484848] uppercase tracking-wide">Field</div>
            <div className="px-4 py-3 text-xs font-semibold text-[#484848] uppercase tracking-wide">
              Offer A
              {winner === 'record1' && (
                <span className="ml-2 px-2 py-0.5 bg-[#0369A1] text-white text-[10px] rounded">Higher TC</span>
              )}
            </div>
            <div className="px-4 py-3 text-xs font-semibold text-[#484848] uppercase tracking-wide">
              Offer B
              {winner === 'record2' && (
                <span className="ml-2 px-2 py-0.5 bg-[#0369A1] text-white text-[10px] rounded">Higher TC</span>
              )}
            </div>
            <div className="px-4 py-3 text-xs font-semibold text-[#484848] uppercase tracking-wide">Difference</div>
          </div>

          {/* Level row */}
          <div className="grid grid-cols-4 border-b border-[#EBEBEB] hover:bg-[#F7F7F7]">
            <div className="px-4 py-3 text-sm text-[#717171]">Level</div>
            <div className="px-4 py-3">
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${LEVEL_BADGE_CLASS[record1.level]}`}>
                {LEVEL_DISPLAY[record1.level]}
              </span>
            </div>
            <div className="px-4 py-3">
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${LEVEL_BADGE_CLASS[record2.level]}`}>
                {LEVEL_DISPLAY[record2.level]}
              </span>
            </div>
            <div className="px-4 py-3 text-sm text-[#717171]">—</div>
          </div>

          {/* Data rows */}
          {rows.map((row) => (
            <div key={row.label} className="grid grid-cols-4 border-b border-[#EBEBEB] hover:bg-[#F7F7F7] last:border-0">
              <div className="px-4 py-3 text-sm text-[#717171]">{row.label}</div>
              <div className={`px-4 py-3 text-sm ${row.isTc ? 'font-bold text-[#0369A1] text-base' : 'text-[#222222]'}`}>
                {row.v1 ?? '—'}
              </div>
              <div className={`px-4 py-3 text-sm ${row.isTc ? 'font-bold text-[#0369A1] text-base' : 'text-[#222222]'}`}>
                {row.v2 ?? '—'}
              </div>
              <div className="px-4 py-3 text-sm font-medium">
                {row.delta === null || row.delta === undefined ? (
                  <span className="text-[#717171]">—</span>
                ) : (
                  <span className={row.delta > 0 ? 'text-[#008A05]' : row.delta < 0 ? 'text-[#D93025]' : 'text-[#717171]'}>
                    {row.delta === 0
                      ? 'Equal'
                      : row.label === 'Experience'
                      ? `${row.delta > 0 ? '+' : ''}${row.delta}y`
                      : formatDelta(row.delta, record1.currency)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-16 text-center">
          <p className="text-[#717171] text-sm">Select two offers above to see the comparison</p>
        </div>
      )}
    </div>
  )
}