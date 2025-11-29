import { Button } from "@/components/ui/button"
import Image from "next/image"

interface HeroBannerProps {
  title: string
  subtitle: string
  image?: string
  buttonText?: string
  bgColor: string
  textColor?: string
}

export function HeroBanner({
  title,
  subtitle,
  image,
  buttonText,
  bgColor,
  textColor = "text-gray-900",
}: HeroBannerProps) {
  return (
    <div
      className={`${bgColor} ${textColor} rounded-lg px-6 py-6 md:px-8 md:py-8 flex flex-col md:flex-row items-center justify-between overflow-hidden min-h-[180px]`}
    >
      <div className="flex-1 space-y-3 md:space-y-4">
        <p className="text-xs md:text-sm font-medium opacity-80 uppercase tracking-wide">{title}</p>
        <h2 className="text-2xl md:text-3xl font-bold leading-tight">{subtitle}</h2>
        {buttonText && (
          <Button
            className="bg-white text-gray-900 hover:bg-gray-100 text-xs md:text-sm px-4 py-2 md:px-5 md:py-2.5"
            size="sm"
          >
            {buttonText}
          </Button>
        )}
      </div>
      {image && (
        <div className="hidden md:flex flex-1 justify-end">
          <Image
            src={image || "/placeholder.svg"}
            alt={subtitle}
            width={160}
            height={160}
            className="max-h-40 w-auto object-contain"
          />
        </div>
      )}
    </div>
  )
}
