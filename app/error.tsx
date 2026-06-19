
"use client"
import * as React from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-xl font-semibold text-[#222222]">Something went wrong</h2>
      <p className="text-sm text-[#717171]">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-[#FF5A5F] text-white text-sm font-medium rounded hover:bg-[#e04e53] transition-colors"
      >
        Try again
      </button>
    </div>
  )
}
