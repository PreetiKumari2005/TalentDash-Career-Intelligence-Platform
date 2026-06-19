export interface Company {
  id: string
  name: string
  slug: string
  normalizedName: string
  industry: string | null
  headquarters: string | null
  foundedYear: number | null
  headcountRange: string | null
  createdAt: string
  updatedAt: string
}

export interface LevelDistribution {
  [level: string]: number
}

export interface CompanyWithStats extends Company {
  salaries: import('./salary').SalaryRecord[]
  medianTotalCompensation: number
  levelDistribution: LevelDistribution
  salaryCount: number
  minTc: number
  maxTc: number
}

export interface MockCompany {
  id: string
  name: string
  slug: string
  industry: string
  headquarters: string
  foundedYear: number
  headcountRange: string
}
