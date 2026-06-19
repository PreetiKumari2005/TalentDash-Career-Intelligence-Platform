"use client"

interface PaginationProps {
  page: number
  totalPages: number
  total: number
  limit: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, total, limit, onPageChange }: PaginationProps) {
  const start = (page - 1) * limit + 1
  const end = Math.min(page * limit, total)

  return (
    <div className="flex items-center justify-between py-4 px-2">
      <p className="text-sm text-[#717171]">
        Showing <span className="font-medium text-[#222222]">{start}–{end}</span> of{' '}
        <span className="font-medium text-[#222222]">{total.toLocaleString()}</span> records
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1.5 text-sm border border-[#EBEBEB] rounded hover:bg-[#F2F2F2] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ← Previous
        </button>
        <span className="text-sm text-[#717171] px-2">Page {page} of {totalPages}</span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="px-3 py-1.5 text-sm border border-[#EBEBEB] rounded hover:bg-[#F2F2F2] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
