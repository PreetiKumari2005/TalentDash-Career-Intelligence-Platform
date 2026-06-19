import type { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

export function Select({ label, options, placeholder, className = '', ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-medium text-[#484848]">{label}</label>}
      <select
        className={`w-full px-3 py-2 text-sm text-[#222222] bg-white border border-[#EBEBEB] rounded focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/30 focus:border-[#FF5A5F] transition-colors cursor-pointer ${className}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}
