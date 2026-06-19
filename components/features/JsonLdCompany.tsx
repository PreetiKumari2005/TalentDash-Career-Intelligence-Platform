import * as React from "react";

interface JsonLdCompanyProps {
  name: string;
  slug: string;
  logoUrl?: string | null;
  industry?: string | null;
}

export const JsonLdCompany: React.FC<JsonLdCompanyProps> = ({ name, slug, logoUrl, industry }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": name,
    "url": `https://talentdash.com/companies/${slug}`,
    "logo": logoUrl || "https://talentdash.com/fallback-logo.png",
    "knowsAbout": industry || "Technology"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};