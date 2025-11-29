"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Star } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/mock-data"

interface ProductsGridProps {
  products: Product[]
  title?: string
  hideTitle?: boolean
}

export function ProductsGrid({ products, title = "Recommended items", hideTitle = false }: ProductsGridProps) {
  return (
    <div className="mb-12">
      {!hideTitle && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="p-4 hover:shadow-lg transition overflow-hidden group">
            <Link href={`/product/${product.id}`}>
              <div className="relative mb-4 overflow-hidden bg-gray-100 rounded-lg h-48">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={192}
                  height={192}
                  className="w-full h-full object-cover group-hover:scale-110 transition"
                />
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full hover:bg-red-100">
                  <Heart size={18} className="text-gray-600 hover:text-red-500" />
                </button>
              </div>
              <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-blue-500">{product.name}</h3>
              <div className="flex items-center gap-1 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600">{product.rating}</span>
              </div>
              <div className="flex gap-2 items-center mb-3">
                <span className="text-lg font-bold text-blue-500">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                )}
              </div>
            </Link>
            <Button size="sm" variant="outline" className="w-full text-xs bg-transparent">
              Add to cart
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
