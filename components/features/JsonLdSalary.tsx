interface JsonLdSalaryProps {
  companyName: string
  role: string
  baseSalary: number
  currency: string
  location: string
}

export function JsonLdSalary({
  companyName,
  role,
  baseSalary,
  currency,
  location,
}: JsonLdSalaryProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: role,
    hiringOrganization: {
      '@type': 'Organization',
      name: companyName,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: location,
      },
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: currency,
      value: {
        '@type': 'QuantitativeValue',
        value: baseSalary,
        unitText: 'YEAR',
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
