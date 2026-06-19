import { LEVEL_BADGE_CLASS, LEVEL_DISPLAY } from '@/types/enums'
import type { Level } from '@/types/enums'

interface BadgeProps {
  level: Level
  className?: string
}

export function LevelBadge({ level, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tracking-wide ${LEVEL_BADGE_CLASS[level]} ${className}`}>
      {LEVEL_DISPLAY[level]}
    </span>
  )
}

interface GenericBadgeProps {
  children: React.ReactNode
  variant?: 'blue' | 'green' | 'gray' | 'coral'
  className?: string
}

export function Badge({ children, variant = 'gray', className = '' }: GenericBadgeProps) {
  const variantClass = {
    blue:  'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    gray:  'bg-gray-100 text-gray-600',
    coral: 'bg-[#FF5A5F]/10 text-[#FF5A5F]',
  }[variant]

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${variantClass} ${className}`}>
      {children}
    </span>
  )
}
