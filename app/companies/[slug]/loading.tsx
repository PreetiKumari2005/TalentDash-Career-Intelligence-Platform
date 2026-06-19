export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="animate-pulse">

        {/* Header skeleton */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="h-7 bg-[#EBEBEB] rounded w-48 mb-3"></div>
              <div className="flex gap-3">
                <div className="h-4 bg-[#EBEBEB] rounded w-24"></div>
                <div className="h-4 bg-[#EBEBEB] rounded w-20"></div>
                <div className="h-4 bg-[#EBEBEB] rounded w-16"></div>
              </div>
            </div>
            <div className="h-9 bg-[#EBEBEB] rounded w-24"></div>
          </div>
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-[#EBEBEB] p-4 text-center">
              <div className="h-8 bg-[#EBEBEB] rounded w-24 mx-auto mb-2"></div>
              <div className="h-3 bg-[#EBEBEB] rounded w-20 mx-auto"></div>
            </div>
          ))}
        </div>

        {/* Level distribution skeleton */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] p-5 mb-6">
          <div className="h-4 bg-[#EBEBEB] rounded w-36 mb-3"></div>
          <div className="h-3 bg-[#EBEBEB] rounded-full w-full mb-3"></div>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-5 bg-[#EBEBEB] rounded w-16"></div>
            ))}
          </div>
        </div>

        {/* Table skeleton */}
        <div className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#EBEBEB]">
            <div className="h-5 bg-[#EBEBEB] rounded w-32"></div>
          </div>
          <div className="bg-[#F7F7F7] grid grid-cols-7 gap-4 px-4 py-3 border-b border-[#EBEBEB]">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="h-3 bg-[#EBEBEB] rounded"></div>
            ))}
          </div>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="grid grid-cols-7 gap-4 px-4 py-4 border-b border-[#EBEBEB] last:border-0">
              <div className="h-4 bg-[#EBEBEB] rounded w-3/4"></div>
              <div className="h-5 bg-[#EBEBEB] rounded w-12"></div>
              <div className="h-4 bg-[#EBEBEB] rounded w-3/4"></div>
              <div className="h-4 bg-[#EBEBEB] rounded w-8"></div>
              <div className="h-4 bg-[#EBEBEB] rounded w-3/4"></div>
              <div className="h-4 bg-[#EBEBEB] rounded w-3/4"></div>
              <div className="h-5 bg-[#EBEBEB] rounded w-3/4"></div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
