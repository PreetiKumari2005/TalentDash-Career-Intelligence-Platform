import Link from 'next/link'

export default function ToolsPage() {
  const tools = [
    {
      href: '/tools/salary-calculator',
      emoji: '💰',
      title: 'Salary Calculator',
      description: 'Calculate your in-hand salary after tax deductions and PF contributions',
    },
    {
      href: '/tools/hike-calculator',
      emoji: '📈',
      title: 'Hike Calculator',
      description: 'Find out how much your salary increases with a given hike percentage',
    },
    {
      href: '/tools/equity-calculator',
      emoji: '📊',
      title: 'Equity / ESOP Calculator',
      description: 'Calculate the value of your ESOPs and RSUs at different valuations',
    },
    {
      href: '/tools/offer-comparison',
      emoji: '⚖️',
      title: 'Offer Comparison',
      description: 'Compare two job offers side by side to find the better total package',
    },
  ]

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#222222] mb-2">Tools</h1>
        <p className="text-[#717171]">
          Free calculators to help you make better career and compensation decisions
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="bg-white rounded-xl border border-[#EBEBEB] p-6 hover:shadow-md transition-shadow group"
          >
            <div className="text-3xl mb-3">{tool.emoji}</div>
            <h2 className="text-base font-semibold text-[#222222] mb-2 group-hover:text-[#FF5A5F] transition-colors">
              {tool.title}
            </h2>
            <p className="text-sm text-[#717171]">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
