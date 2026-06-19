import { ALL_LEVELS } from '@/types/enums'
// import type { IngestPayload } from '@/types/api'
export interface IngestPayload { [key: string]: any; }

export interface ValidationError {
  error: true
  field: string
  message: string
}

const VALID_CURRENCIES = ['INR', 'USD', 'GBP', 'EUR']
const VALID_SOURCES = ['CONTRIBUTOR', 'SCRAPED', 'AI_INFERRED']

export function validateIngestPayload(
  body: unknown
): ValidationError | null {
  const b = body as Record<string, unknown>

  if (!b.company || typeof b.company !== 'string' || b.company.trim().length < 2)
    return { error: true, field: 'company', message: 'company is required and must be at least 2 characters' }

  if (!b.role || typeof b.role !== 'string' || b.role.trim().length < 2)
    return { error: true, field: 'role', message: 'role is required and must be at least 2 characters' }

  if (!b.level || !ALL_LEVELS.includes(b.level as never))
    return {
      error: true,
      field: 'level',
      message: `level must be one of: ${ALL_LEVELS.join(', ')}`,
    }

  if (!b.location || typeof b.location !== 'string' || b.location.trim().length < 2)
    return { error: true, field: 'location', message: 'location is required' }

  if (!b.currency || !VALID_CURRENCIES.includes(b.currency as string))
    return { error: true, field: 'currency', message: `currency must be one of: ${VALID_CURRENCIES.join(', ')}` }

  const exp = Number(b.experienceYears)
  if (!Number.isInteger(exp) || exp <= 0 || exp > 50)
    return { error: true, field: 'experienceYears', message: 'experienceYears must be an integer between 1 and 50' }

  const base = Number(b.baseSalary)
  if (!base || base <= 0)
    return { error: true, field: 'baseSalary', message: 'baseSalary must be a positive number' }

  if (b.bonus !== undefined && Number(b.bonus) < 0)
    return { error: true, field: 'bonus', message: 'bonus must be 0 or positive' }

  if (b.stock !== undefined && Number(b.stock) < 0)
    return { error: true, field: 'stock', message: 'stock must be 0 or positive' }

  const conf = b.confidenceScore !== undefined ? Number(b.confidenceScore) : null
  if (conf !== null && (conf < 0 || conf > 1))
    return { error: true, field: 'confidenceScore', message: 'confidenceScore must be between 0.0 and 1.0' }

  if (b.source && !VALID_SOURCES.includes(b.source as string))
    return { error: true, field: 'source', message: `source must be one of: ${VALID_SOURCES.join(', ')}` }

  return null
}

export function computeTotalCompensation(payload: IngestPayload): number {
  return payload.baseSalary + (payload.bonus ?? 0) + (payload.stock ?? 0)
}