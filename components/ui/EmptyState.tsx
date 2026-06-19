interface EmptyStateProps {
  title?: string
  description?: string
  onClear?: () => void
}

export function EmptyState({
  title = 'No records found',
  description = 'No records found for these filters. Try removing a filter.',
  onClear,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h3 className="text-base font-semibold text-[#222222] mb-1">{title}</h3>
      <p className="text-sm text-[#717171] mb-5 max-w-xs">{description}</p>
      {onClear && (
        <button
          onClick={onClear}
          className="px-4 py-2 text-sm border border-[#EBEBEB] rounded hover:bg-[#F2F2F2] transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  )
}
