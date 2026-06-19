import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-medium text-[#484848]">{label}</label>}
      <input
        className={`w-full px-3 py-2 text-sm text-[#222222] bg-white border border-[#EBEBEB] rounded placeholder:text-[#717171] focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/30 focus:border-[#FF5A5F] transition-colors ${error ? 'border-[#D93025]' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-[#D93025]">{error}</p>}
    </div>
  )
}
