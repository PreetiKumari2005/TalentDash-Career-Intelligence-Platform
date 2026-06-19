
import { EquityCalculatorClient } from '../../../components/features/EquityCalculatorClient'

export default function EquityCalculatorPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#222222] mb-2">Equity / ESOP Calculator</h1>
      <p className="text-[#717171] mb-8">
        Calculate the value of your ESOPs and RSUs at different valuations
      </p>
      <EquityCalculatorClient />
    </div>
  )
}
