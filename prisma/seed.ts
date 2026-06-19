import { PrismaClient } from '@prisma/client'
import { normaliseCompanyName } from '../lib/normalise'

const prisma = new PrismaClient()

// Demonstrates normalisation: all variants → same slug
const RAW_COMPANY_NAMES: Record<string, string> = {
  google:    'Google India',      // normalises → google
  amazon:    'AMAZON',            // normalises → amazon
  meta:      'Meta Platforms',    // normalises → meta
  microsoft: 'Microsoft India',   // normalises → microsoft
  flipkart:  'Flipkart Internet Pvt Ltd', // normalises → flipkart
  meesho:    'Meesho',
  nvidia:    'NVIDIA',
  tcs:       'Tata Consultancy Services', // alias → tcs
  infosys:   'Infosys BPO',       // alias → infosys
  wipro:     'Wipro Technologies', // strip suffix → wipro
  razorpay:  'Razorpay',
  zepto:     'Zepto',
}

const DISPLAY_NAMES: Record<string, string> = {
  google: 'Google', amazon: 'Amazon', meta: 'Meta',
  microsoft: 'Microsoft', flipkart: 'Flipkart', meesho: 'Meesho',
  nvidia: 'NVIDIA', tcs: 'TCS', infosys: 'Infosys', wipro: 'Wipro',
  razorpay: 'Razorpay', zepto: 'Zepto',
}

const COMPANY_META: Record<string, { industry: string; hq: string; founded: number; headcount: string }> = {
  google:    { industry: 'Technology',     hq: 'Bengaluru', founded: 1998, headcount: '100,000+' },
  amazon:    { industry: 'E-Commerce',     hq: 'Bengaluru', founded: 1994, headcount: '100,000+' },
  meta:      { industry: 'Technology',     hq: 'Bengaluru', founded: 2004, headcount: '50,000+' },
  microsoft: { industry: 'Technology',     hq: 'Hyderabad', founded: 1975, headcount: '100,000+' },
  flipkart:  { industry: 'E-Commerce',     hq: 'Bengaluru', founded: 2007, headcount: '30,000+' },
  meesho:    { industry: 'E-Commerce',     hq: 'Bengaluru', founded: 2015, headcount: '5,000+' },
  nvidia:    { industry: 'Semiconductors', hq: 'Bengaluru', founded: 1993, headcount: '20,000+' },
  tcs:       { industry: 'IT Services',     hq: 'Mumbai',    founded: 1968, headcount: '500,000+' },
  infosys:   { industry: 'IT Services',     hq: 'Bengaluru', founded: 1981, headcount: '300,000+' },
  wipro:     { industry: 'IT Services',     hq: 'Bengaluru', founded: 1945, headcount: '200,000+' },
  razorpay:  { industry: 'Fintech',        hq: 'Bengaluru', founded: 2014, headcount: '3,000+' },
  zepto:     { industry: 'Quick Commerce', hq: 'Mumbai',    founded: 2021, headcount: '5,000+' },
}

async function main() {
  console.log('🌱 Seeding database...')

  // Upsert all companies — normalisation demonstrated here
  const companies: Record<string, string> = {}
  for (const [slug, rawName] of Object.entries(RAW_COMPANY_NAMES)) {
    const normalizedName = normaliseCompanyName(rawName)
    const meta = COMPANY_META[slug]
    const company = await prisma.company.upsert({
      where: { slug },
      update: {},
      create: {
        name: DISPLAY_NAMES[slug],
        slug,
        normalizedName,
        industry: meta.industry,
        headquarters: meta.hq,
        foundedYear: meta.founded,
        headcountRange: meta.headcount,
      },
    })
    companies[slug] = company.id
    console.log(`  ✓ Company: ${DISPLAY_NAMES[slug]} (raw: "${rawName}" → slug: "${slug}")`)
  }

  // Clear existing salaries
  await prisma.salary.deleteMany()

  const salaries = [
    // ── Google ──
    { companySlug: 'google', role: 'Software Engineer', level: 'L4', location: 'Bengaluru', currency: 'INR', experienceYears: 4, baseSalary: 3500000, bonus: 500000, stock: 1000000 },
    { companySlug: 'google', role: 'Software Engineer', level: 'L5', location: 'Bengaluru', currency: 'INR', experienceYears: 7, baseSalary: 5000000, bonus: 800000, stock: 2000000 },
    { companySlug: 'google', role: 'Software Engineer', level: 'L6', location: 'Bengaluru', currency: 'INR', experienceYears: 11, baseSalary: 7500000, bonus: 1200000, stock: 4000000 },
    { companySlug: 'google', role: 'Product Manager',   level: 'L5', location: 'Bengaluru', currency: 'INR', experienceYears: 8, baseSalary: 5500000, bonus: 900000, stock: 2500000 },
    { companySlug: 'google', role: 'Data Analyst',      level: 'L3', location: 'Hyderabad', currency: 'INR', experienceYears: 2, baseSalary: 1800000, bonus: 200000, stock: 400000 },
    { companySlug: 'google', role: 'Program Manager',   level: 'L3', location: 'Bengaluru', currency: 'INR', experienceYears: 2, baseSalary: 2200000, bonus: 300000, stock: 0 },
    { companySlug: 'google', role: 'Software Engineer', level: 'L5', location: 'San Francisco', currency: 'USD', experienceYears: 8, baseSalary: 22000000, bonus: 4000000, stock: 10000000 },

    // ── Amazon ──
    { companySlug: 'amazon', role: 'Software Engineer', level: 'SDE_I',   location: 'Bengaluru', currency: 'INR', experienceYears: 1, baseSalary: 2000000, bonus: 300000, stock: 600000 },
    { companySlug: 'amazon', role: 'Software Engineer', level: 'SDE_II',  location: 'Bengaluru', currency: 'INR', experienceYears: 4, baseSalary: 3800000, bonus: 600000, stock: 1500000 },
    { companySlug: 'amazon', role: 'Software Engineer', level: 'SDE_III', location: 'Bengaluru', currency: 'INR', experienceYears: 8, baseSalary: 6000000, bonus: 1000000, stock: 3000000 },
    { companySlug: 'amazon', role: 'Product Manager',   level: 'SDE_II',  location: 'Mumbai',    currency: 'INR', experienceYears: 5, baseSalary: 4200000, bonus: 700000, stock: 1800000 },
    { companySlug: 'amazon', role: 'Software Engineer', level: 'SDE_I',   location: 'Delhi',     currency: 'INR', experienceYears: 1, baseSalary: 1900000, bonus: 0, stock: 400000 },
    { companySlug: 'amazon', role: 'Software Engineer', level: 'SDE_II',  location: 'Seattle',   currency: 'USD', experienceYears: 5, baseSalary: 18000000, bonus: 3000000, stock: 8000000 },

    // ── Meta ──
    { companySlug: 'meta', role: 'Software Engineer', level: 'IC4', location: 'Bengaluru', currency: 'INR', experienceYears: 5, baseSalary: 5000000, bonus: 900000, stock: 3000000 },
    { companySlug: 'meta', role: 'Software Engineer', level: 'IC5', location: 'Bengaluru', currency: 'INR', experienceYears: 9, baseSalary: 7000000, bonus: 1400000, stock: 5000000 },
    { companySlug: 'meta', role: 'Data Scientist',    level: 'IC4', location: 'Bengaluru', currency: 'INR', experienceYears: 6, baseSalary: 5500000, bonus: 1000000, stock: 3500000 },
    { companySlug: 'meta', role: 'Software Engineer', level: 'IC4', location: 'London',    currency: 'GBP', experienceYears: 6, baseSalary: 12000000, bonus: 2000000, stock: 6000000 },

    // ── Microsoft ──
    { companySlug: 'microsoft', role: 'Software Engineer',          level: 'L4',        location: 'Hyderabad', currency: 'INR', experienceYears: 3,  baseSalary: 2800000, bonus: 400000, stock: 800000 },
    { companySlug: 'microsoft', role: 'Software Engineer',          level: 'L5',        location: 'Hyderabad', currency: 'INR', experienceYears: 7,  baseSalary: 4500000, bonus: 700000, stock: 2000000 },
    { companySlug: 'microsoft', role: 'Principal Engineer',         level: 'PRINCIPAL', location: 'Hyderabad', currency: 'INR', experienceYears: 15, baseSalary: 9000000, bonus: 2000000, stock: 6000000 },
    { companySlug: 'microsoft', role: 'Principal Software Engineer',level: 'PRINCIPAL', location: 'Hyderabad', currency: 'INR', experienceYears: 16, baseSalary: 10000000, bonus: 2500000, stock: 8000000 },
    { companySlug: 'microsoft', role: 'Software Engineer',          level: 'L4',        location: 'Bengaluru', currency: 'INR', experienceYears: 4,  baseSalary: 3000000, bonus: 450000, stock: 900000 },

    // ── Flipkart ──
    { companySlug: 'flipkart', role: 'Software Engineer', level: 'SDE_I',  location: 'Bengaluru', currency: 'INR', experienceYears: 1, baseSalary: 1600000, bonus: 200000, stock: 400000 },
    { companySlug: 'flipkart', role: 'Software Engineer', level: 'SDE_II', location: 'Bengaluru', currency: 'INR', experienceYears: 4, baseSalary: 3000000, bonus: 500000, stock: 1000000 },
    { companySlug: 'flipkart', role: 'Product Manager',   level: 'SDE_II', location: 'Bengaluru', currency: 'INR', experienceYears: 5, baseSalary: 3500000, bonus: 600000, stock: 1200000 },
    { companySlug: 'flipkart', role: 'Data Analyst',      level: 'L3',     location: 'Bengaluru', currency: 'INR', experienceYears: 2, baseSalary: 1400000, bonus: 150000, stock: 0 },
    { companySlug: 'flipkart', role: 'Data Scientist',    level: 'SDE_II', location: 'Pune',      currency: 'INR', experienceYears: 4, baseSalary: 2600000, bonus: 400000, stock: 800000 },

    // ── Meesho ──
    { companySlug: 'meesho', role: 'Software Engineer', level: 'SDE_II',  location: 'Bengaluru', currency: 'INR', experienceYears: 3, baseSalary: 2800000, bonus: 400000, stock: 1200000 },
    { companySlug: 'meesho', role: 'Software Engineer', level: 'SDE_III', location: 'Bengaluru', currency: 'INR', experienceYears: 7, baseSalary: 4500000, bonus: 700000, stock: 2500000 },
    { companySlug: 'meesho', role: 'ML Engineer',       level: 'SDE_I',   location: 'Bengaluru', currency: 'INR', experienceYears: 2, baseSalary: 2100000, bonus: 250000, stock: 700000 },

    // ── NVIDIA ──
    { companySlug: 'nvidia', role: 'Software Engineer', level: 'L4',       location: 'Bengaluru', currency: 'INR', experienceYears: 4,  baseSalary: 4000000, bonus: 700000, stock: 4000000 },
    { companySlug: 'nvidia', role: 'ML Engineer',       level: 'L5',       location: 'Bengaluru', currency: 'INR', experienceYears: 7,  baseSalary: 6000000, bonus: 1000000, stock: 8000000 },
    { companySlug: 'nvidia', role: 'Software Engineer', level: 'L6',       location: 'Bengaluru', currency: 'INR', experienceYears: 12, baseSalary: 8500000, bonus: 1800000, stock: 12000000 },
    { companySlug: 'nvidia', role: 'AI Researcher',     level: 'PRINCIPAL',location: 'Bengaluru', currency: 'INR', experienceYears: 14, baseSalary: 8000000, bonus: 2000000, stock: 40000000 },

    // ── TCS ──
    { companySlug: 'tcs', role: 'Software Engineer', level: 'L3',   location: 'Mumbai',    currency: 'INR', experienceYears: 2,  baseSalary: 700000,  bonus: 50000,  stock: 0 },
    { companySlug: 'tcs', role: 'Software Engineer', level: 'L4',   location: 'Mumbai',    currency: 'INR', experienceYears: 5,  baseSalary: 1100000, bonus: 80000,  stock: 0 },
    { companySlug: 'tcs', role: 'Data Analyst',      level: 'L3',   location: 'Pune',      currency: 'INR', experienceYears: 3,  baseSalary: 800000,  bonus: 60000,  stock: 0 },
    { companySlug: 'tcs', role: 'Staff Engineer',    level: 'STAFF',location: 'Chennai',    currency: 'INR', experienceYears: 12, baseSalary: 2200000, bonus: 200000, stock: 100000 },

    // ── Infosys ──
    { companySlug: 'infosys', role: 'Software Engineer', level: 'L3', location: 'Bengaluru', currency: 'INR', experienceYears: 2, baseSalary: 650000, bonus: 40000, stock: 0 },
    { companySlug: 'infosys', role: 'Software Engineer', level: 'L4', location: 'Pune',      currency: 'INR', experienceYears: 5, baseSalary: 1000000, bonus: 70000, stock: 0 },
    { companySlug: 'infosys', role: 'Product Manager',   level: 'L5', location: 'Bengaluru', currency: 'INR', experienceYears: 8, baseSalary: 2500000, bonus: 300000, stock: 200000 },

    // ── Wipro ──
    { companySlug: 'wipro', role: 'Software Engineer', level: 'L3', location: 'Hyderabad', currency: 'INR', experienceYears: 2, baseSalary: 600000, bonus: 30000, stock: 0 },
    { companySlug: 'wipro', role: 'Data Analyst',      level: 'L3', location: 'Chennai',   currency: 'INR', experienceYears: 3, baseSalary: 700000, bonus: 50000, stock: 0 },

    // ── Razorpay ──
    { companySlug: 'razorpay', role: 'Software Engineer', level: 'SDE_II',  location: 'Bengaluru', currency: 'INR', experienceYears: 4, baseSalary: 3200000, bonus: 500000, stock: 1500000 },
    { companySlug: 'razorpay', role: 'Software Engineer', level: 'SDE_III', location: 'Bengaluru', currency: 'INR', experienceYears: 7, baseSalary: 5000000, bonus: 800000, stock: 3000000 },
    { companySlug: 'razorpay', role: 'Product Manager',   level: 'SDE_I',   location: 'Bengaluru', currency: 'INR', experienceYears: 2, baseSalary: 2000000, bonus: 300000, stock: 600000 },

    // ── Zepto ──
    { companySlug: 'zepto', role: 'Software Engineer', level: 'SDE_I',  location: 'Mumbai', currency: 'INR', experienceYears: 1, baseSalary: 1800000, bonus: 200000, stock: 800000 },
    { companySlug: 'zepto', role: 'Software Engineer', level: 'SDE_II', location: 'Mumbai', currency: 'INR', experienceYears: 4, baseSalary: 3500000, bonus: 600000, stock: 2000000 },
    { companySlug: 'zepto', role: 'Data Analyst',      level: 'L3',     location: 'Mumbai', currency: 'INR', experienceYears: 2, baseSalary: 1200000, bonus: 100000, stock: 300000 },
  ]

  let count = 0
  for (const s of salaries) {
    const totalCompensation = s.baseSalary + s.bonus + s.stock
    await prisma.salary.create({
      data: {
        companyId: companies[s.companySlug],
        role: s.role,
        level: s.level as never,
        location: s.location,
        currency: s.currency as never,
        experienceYears: s.experienceYears,
        baseSalary: s.baseSalary,
        bonus: s.bonus,
        stock: s.stock,
        totalCompensation,
        source: 'CONTRIBUTOR',
        confidenceScore: 0.9,
        isVerified: true,
      },
    })
    count++
  }

  console.log(`\n✅ Seeded ${count} salary records across ${Object.keys(companies).length} companies`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())