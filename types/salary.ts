export type Level =
  | 'L3' | 'L4' | 'L5' | 'L6'
  | 'SDE_I' | 'SDE_II' | 'SDE_III'
  | 'STAFF' | 'PRINCIPAL' | 'IC4' | 'IC5'

export type Currency = 'INR' | 'USD' | 'GBP' | 'EUR'

export type Source = 'CONTRIBUTOR' | 'SCRAPED' | 'AI_INFERRED'

export interface SalaryRecord {
  id: string
  companyId: string
  companyName: string
  companySlug: string
  role: string
  level: Level
  location: string
  currency: Currency
  experienceYears: number
  baseSalary: number
  bonus: number
  stock: number
  totalCompensation: number
  source: Source
  confidenceScore: number
  isVerified: boolean
  submittedAt: string
}

export interface SalaryFilters {
  company?: string
  role?: string
  level?: Level
  location?: string
  currency?: Currency
  sort?: 'total_comp_desc' | 'total_comp_asc' | 'date_desc'
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}
