import * as React from "react";

interface JsonLdSalaryProps {
  companyName: str;
  role: string;
  baseSalary: number;
  currency: string;
  location: string;
}

export const JsonLdSalary: React.FC<JsonLdSalaryProps> = ({ companyName, role, baseSalary, currency, location }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Occupation",
    "name": role,
    "estimatedSalary": {
      "@type": "MonetaryAmountDistribution",
      "currency": currency,
      "duration": "P1Y",
      "median": {
        "@type": "QuantitativeValue",
        "value": baseSalary
      }
    },
    "occupationLocation": {
      "@type": "City",
      "name": location
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};