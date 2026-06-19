export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-[#EBEBEB] rounded ${className}`} />
}

export function SalaryTableSkeleton() {
  return (
    <div className="w-full">
      <div className="flex gap-3 mb-6">
        {[200, 150, 120, 150].map((w, i) => (
          <Skeleton key={i} className={`h-9 w-[${w}px]`} />
        ))}
      </div>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="grid grid-cols-8 gap-4 px-4 py-4 border-b border-[#EBEBEB]">
          {Array.from({ length: 8 }).map((_, j) => (
            <Skeleton key={j} className="h-4 w-3/4" />
          ))}
        </div>
      ))}
    </div>
  )
}
