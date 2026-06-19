import { OfferComparisonClient } from '../../../components/features/OfferComparisonClient'

export default function OfferComparisonPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#222222] mb-2">Offer Comparison</h1>
      <p className="text-[#717171] mb-8">
        Compare two job offers side by side to find the better total package
      </p>
      <OfferComparisonClient />
    </div>
  )
}
