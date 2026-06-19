export const CONVERSION_RATES: Record<string, number> = {
  INR_TO_USD: 0.012,
  INR_TO_GBP: 0.0095,
  INR_TO_EUR: 0.011,
  USD_TO_INR: 83.5,
  USD_TO_GBP: 0.79,
  USD_TO_EUR: 0.92,
}

export const CURRENCY_SYMBOL: Record<string, string> = {
  INR: '₹',
  USD: '$',
  GBP: '£',
  EUR: '€',
}

export const CURRENCY_LOCALE: Record<string, string> = {
  INR: 'en-IN',
  USD: 'en-US',
  GBP: 'en-GB',
  EUR: 'de-DE',
}

export function convertCurrency(
  amount: number,
  from: string,
  to: string
): number {
  if (from === to) return amount
  const key = `${from}_TO_${to}`
  const rate = CONVERSION_RATES[key]
  if (!rate) throw new Error(`No conversion rate for ${key}`)
  return Math.round(amount * rate)
}