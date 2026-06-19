export type { Level, Currency, Source } from './salary'

export const ALL_LEVELS = [
  'L3', 'L4', 'L5', 'L6',
  'SDE_I', 'SDE_II', 'SDE_III',
  'STAFF', 'PRINCIPAL', 'IC4', 'IC5',
] as const

export const LEVEL_DISPLAY: Record<string, string> = {
  L3: 'L3', L4: 'L4', L5: 'L5', L6: 'L6',
  SDE_I: 'SDE-I', SDE_II: 'SDE-II', SDE_III: 'SDE-III',
  STAFF: 'Staff', PRINCIPAL: 'Principal', IC4: 'IC4', IC5: 'IC5',
}

export const LEVEL_BADGE_CLASS: Record<string, string> = {
  L3:        'bg-slate-100 text-slate-700',
  SDE_I:     'bg-slate-100 text-slate-700',
  L4:        'bg-blue-100 text-blue-700',
  SDE_II:    'bg-blue-100 text-blue-700',
  L5:        'bg-indigo-100 text-indigo-700',
  SDE_III:   'bg-indigo-100 text-indigo-700',
  L6:        'bg-purple-100 text-purple-700',
  STAFF:     'bg-purple-100 text-purple-700',
  PRINCIPAL: 'bg-[#1e3a5f]/10 text-[#1e3a5f]',
  IC4:       'bg-violet-100 text-violet-700',
  IC5:       'bg-violet-100 text-violet-700',
}
