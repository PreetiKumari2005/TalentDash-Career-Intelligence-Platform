
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-6xl font-bold text-[#EBEBEB]">404</h1>
      <h2 className="text-xl font-semibold text-[#222222]">Page not found</h2>
      <p className="text-sm text-[#717171]">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="px-4 py-2 bg-[#FF5A5F] text-white text-sm font-medium rounded hover:bg-[#e04e53] transition-colors"
      >
        Go home
      </Link>
    </div>
  )
}