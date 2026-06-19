import { SalaryCalculatorClient } from '../../../components/features/SalaryCalculatorClient'

export default function SalaryCalculatorPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#222222] mb-2">
          Salary Calculator
        </h1>
        <p className="text-[#717171]">
          Calculate your in-hand salary after tax and PF deductions
        </p>
      </div>
      <SalaryCalculatorClient />
    </div>
  )
}
