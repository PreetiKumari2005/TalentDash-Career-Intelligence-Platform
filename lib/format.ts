import { CURRENCY_SYMBOL, CURRENCY_LOCALE, convertCurrency } from './currency-config'

/**
 * Format a number in Indian lakh/crore system
 * e.g. 4200000 → ₹42 L  |  42000000 → ₹4.2 Cr
 */
export function formatINR(amount: number): string {
  if (amount >= 10_000_000) {
    const cr = amount / 10_000_000
    return `₹${cr % 1 === 0 ? cr : cr.toFixed(1)} Cr`
  }
  if (amount >= 100_000) {
    const l = amount / 100_000
    return `₹${l % 1 === 0 ? l : l.toFixed(1)} L`
  }
  return `₹${amount.toLocaleString('en-IN')}`
}

/**
 * Format any salary amount given currency code.
 * Displays in INR lakh/crore or standard international format.
 */
export function formatSalary(amount: number, currency: string): string {
  if (currency === 'INR') return formatINR(amount)
  const symbol = CURRENCY_SYMBOL[currency] ?? currency
  const locale = CURRENCY_LOCALE[currency] ?? 'en-US'
  return `${symbol}${(amount / 1000).toLocaleString(locale, {
    maximumFractionDigits: 0,
  })}K`
}

/**
 * Convert then format — used by CurrencyToggle
 */
export function formatConverted(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): string {
  const converted = convertCurrency(amount, fromCurrency, toCurrency)
  return formatSalary(converted, toCurrency)
}

/**
 * Format delta with + / - prefix and color hint
 */
export function formatDelta(delta: number, currency: string): string {
  const formatted = formatSalary(Math.abs(delta), currency)
  return delta >= 0 ? `+${formatted}` : `-${formatted}`
}