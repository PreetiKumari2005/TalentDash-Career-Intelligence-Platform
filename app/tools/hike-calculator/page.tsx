"use client" 
import { HikeCalculatorClient } from '../../../components/features/HikeCalculatorClient'

export default function HikeCalculatorPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#222222] mb-2">Hike Calculator</h1>
      <p className="text-[#717171] mb-8">
        Calculate your new salary after a hike percentage
      </p>
      <HikeCalculatorClient />
    </div>
  )
}