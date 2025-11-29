'use client'

import { Card } from "@/components/ui/card"
import { mockProducts } from "@/lib/mock-data"
import Image from "next/image"

export function DealsSection() {
  const dealsProducts = [
    { ...mockProducts[0], discount: "-35%" },
    { ...mockProducts[1], discount: "-15%" },
    { ...mockProducts[2], discount: "-40%" },
    { ...mockProducts[3], discount: "-50%" },
    { ...mockProducts[4], discount: "-25%" },
  ]

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] gap-6 items-stretch">
        {/* Left info and timer column */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">Deals and offers</h2>
            <p className="text-gray-500 text-sm mb-4">Hygiene equipments</p>
          </div>
          <div className="flex flex-col gap-2 text-[11px] text-gray-500">
            <div className="flex gap-2 text-gray-900 font-semibold text-xs">
              <span className="px-2 py-1 rounded bg-gray-900 text-white">04</span>
              <span className="px-2 py-1 rounded bg-gray-900 text-white">13</span>
              <span className="px-2 py-1 rounded bg-gray-900 text-white">34</span>
              <span className="px-2 py-1 rounded bg-gray-900 text-white">56</span>
            </div>
            <div className="flex gap-4">
              <span>Day</span>
              <span>Hour</span>
              <span>Min</span>
              <span>Sec</span>
            </div>
          </div>
        </div>

        {/* Products row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {dealsProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-sm transition-shadow cursor-pointer bg-white border border-gray-200"
            >
              <div className="bg-gray-50 aspect-square flex items-center justify-center">
                <Image
                  src={product.image || "/placeholder.svg?height=200&width=200"}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-3 text-center space-y-1">
                <p className="text-xs font-medium text-gray-700 line-clamp-1">{product.name}</p>
                <div className="inline-flex items-center justify-center px-3 py-0.5 rounded-full border border-red-200 bg-red-50 text-[11px] text-red-500">
                  {product.discount}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
