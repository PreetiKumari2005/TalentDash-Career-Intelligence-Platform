// Company name normalisation
// Layer 1: programmatic rules
// Layer 2: alias lookup table

const LEGAL_SUFFIXES = [
  'pvt ltd', 'pvt. ltd.', 'pvt. ltd', 'private limited', 'private ltd',
  'ltd.', 'ltd', 'limited', 'inc.', 'inc', 'llc', 'llp',
  'technologies', 'technology', 'solutions', 'services',
  'india', 'global', 'worldwide', 'international',
  'bpo', 'bps', 'it', 'software',
  'internet', 'web', 'digital',
  '.com', '.in', '.io',
]

// Alias table — known variants → canonical slug
const ALIASES: Record<string, string> = {
  'tata consultancy':           'tcs',
  'tata consultancy services':  'tcs',
  'tcs':                        'tcs',
  'amazon web services':        'amazon',
  'amazon.com':                 'amazon',
  'aws':                        'amazon',
  'meta platforms':             'meta',
  'facebook':                   'meta',
  'alphabet':                   'google',
  'google india':               'google',
  'microsoft india':            'microsoft',
  'infosys bpo':                'infosys',
  'wipro technologies':         'wipro',
  'flipkart internet':          'flipkart',
  'hcl technologies':           'hcl',
  'hcl tech':                   'hcl',
}

export function normaliseCompanyName(raw: string): string {
  let name = raw.toLowerCase().trim()

  // Strip legal suffixes (longest match first)
  const sorted = [...LEGAL_SUFFIXES].sort((a, b) => b.length - a.length)
  for (const suffix of sorted) {
    if (name.endsWith(` ${suffix}`)) {
      name = name.slice(0, name.length - suffix.length - 1).trim()
    }
  }

  // Remove punctuation except hyphens
  name = name.replace(/[^a-z0-9\s-]/g, '').trim()

  // Check alias table
  if (ALIASES[name]) return ALIASES[name]

  // Convert spaces to hyphens for slug
  return name.replace(/\s+/g, '-')
}

export function companyNameToSlug(raw: string): string {
  return normaliseCompanyName(raw)
}

export function formatCompanyName(slug: string): string {
  // Display-friendly version from slug
  const DISPLAY_NAMES: Record<string, string> = {
    google:    'Google',
    amazon:    'Amazon',
    meta:      'Meta',
    microsoft: 'Microsoft',
    flipkart:  'Flipkart',
    meesho:    'Meesho',
    nvidia:    'NVIDIA',
    tcs:       'TCS',
    infosys:   'Infosys',
    wipro:     'Wipro',
    razorpay:  'Razorpay',
    zepto:     'Zepto',
  }
  return DISPLAY_NAMES[slug] ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}