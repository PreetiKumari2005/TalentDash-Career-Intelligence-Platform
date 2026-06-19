interface CompanyLogoProps {
  name: string
  slug: string
  size?: number
}

export function CompanyLogo({ name, size = 32 }: CompanyLogoProps) {
  return (
    <div
      className="rounded border border-[#EBEBEB] bg-[#F7F7F7] flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <span className="text-xs font-bold text-[#717171]">
        {name.slice(0, 2).toUpperCase()}
      </span>
    </div>
  )
}
