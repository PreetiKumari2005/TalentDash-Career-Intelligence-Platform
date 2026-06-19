import type { SalaryRecord } from '../types/salary'
import type { Company } from '../types/company'

export function buildSalaryDatasetJsonLd(
  salaries: SalaryRecord[],
  role: string,
  company?: string
) {
  const keywords = [role, 'salary', 'compensation', 'India', 'LPA', company].filter(
    (k): k is string => typeof k === 'string'
  )

  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: company
      ? `${role} Salaries at ${company} — TalentDash`
      : `${role} Salaries in India — TalentDash`,
    description: `Structured compensation data for ${role} roles${
      company ? ` at ${company}` : ''
    } in India. Includes base salary, bonus, stock, and total compensation by level and location.`,
    url: 'https://talentdash.com/salaries',
    license: 'https://creativecommons.org/licenses/by/4.0/',
    creator: { '@type': 'Organization', name: 'TalentDash' },
    keywords,
    variableMeasured: salaries.map((s) => ({
      '@type': 'PropertyValue',
      name: `${s.role} ${s.level} at ${s.companyName}`,
      value: s.totalCompensation,
      unitCode: s.currency,
    })),
  }
}

export function buildCompanyJsonLd(company: Company) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    url: `https://talentdash.com/companies/${company.slug}`,
    foundingDate: company.foundedYear?.toString() ?? undefined,
    location: company.headquarters ?? undefined,
  }
}

export function buildJobPostingJsonLd(salary: SalaryRecord) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: salary.role,
    hiringOrganization: {
      '@type': 'Organization',
      name: salary.companyName,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: salary.location,
      },
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: salary.currency,
      value: {
        '@type': 'QuantitativeValue',
        value: salary.baseSalary,
        unitText: 'YEAR',
      },
    },
  }
}