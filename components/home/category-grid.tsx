import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

interface CategoryItem {
  name: string
  image: string
  priceLabel?: string
}

interface CategoryGridProps {
  title: string
  image: string
  buttonText: string
  items?: CategoryItem[]
}

export function CategoryGrid({ title, image, buttonText, items }: CategoryGridProps) {
  return (
    <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200">
      <h2 className="text-xl font-bold mb-6">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        {/* Featured image sidebar - Left */}
        <div className="md:col-span-2 flex flex-col">
          <div className="bg-amber-50 rounded-lg overflow-hidden h-full flex flex-col justify-between">
            <div className="p-4 space-y-3">
              <p className="text-sm font-semibold text-gray-900">{title}</p>
              <p className="text-xs text-gray-600 max-w-[180px]">
                Explore all items in this collection and source directly from suppliers.
              </p>
              <Button
                size="sm"
                className="bg-white hover:bg-gray-100 text-blue-600 text-xs h-8 px-4"
              >
                {buttonText}
              </Button>
            </div>
            <div className="flex-1 flex items-end justify-center p-3">
              <Image
                src={image || "/placeholder.svg"}
                alt={title}
                width={160}
                height={160}
                className="w-full h-auto object-contain max-h-40"
              />
            </div>
          </div>
        </div>

        {/* Category tiles - Right */}
        <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {(items || []).map((item, index) => (
            <Card
              key={`${item.name}-${index}`}
              className="overflow-hidden bg-white hover:shadow-sm transition-shadow border border-gray-200"
            >
              <div className="bg-gray-50 aspect-square flex items-center justify-center border-b border-gray-100">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-3 text-left space-y-1">
                <p className="text-xs font-medium text-gray-900 mb-1 line-clamp-1">{item.name}</p>
                {item.priceLabel && (
                  <p className="text-[11px] text-gray-500">{item.priceLabel}</p>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
