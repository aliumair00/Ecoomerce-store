"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/mock-data"

interface ProductCardProps {
  product: Product
  viewType?: "grid" | "list"
}

export function ProductCard({ product, viewType = "grid" }: ProductCardProps) {
  if (viewType === "list") {
    return (
      <Card className="p-4 mb-4 hover:shadow-lg transition flex flex-col sm:flex-row gap-4">
        <Link href={`/product/${product.id}`} className="flex-shrink-0">
          <div className="w-full sm:w-40 h-40 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={160}
              height={160}
              className="w-full h-full object-cover hover:scale-110 transition"
            />
          </div>
        </Link>
        <div className="flex-1">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-semibold hover:text-blue-500 mb-2">{product.name}</h3>
          </Link>
          <p className="text-sm text-gray-600 mb-2">{product.description}</p>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-sm">{product.rating}</span>
            <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
            <span className="text-green-600 text-sm">Free Shipping</span>
          </div>
          <p className="text-lg font-bold text-blue-500 mb-3">${product.price}</p>
          <Link href={`/product/${product.id}`} className="text-blue-500 text-sm hover:underline">
            View details
          </Link>
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <button className="p-2 border rounded-lg hover:border-red-500">
            <Heart size={20} className="text-gray-600 hover:text-red-500" />
          </button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-4 hover:shadow-lg transition overflow-hidden group">
      <Link href={`/product/${product.id}`}>
        <div className="relative mb-4 overflow-hidden bg-gray-100 rounded-lg h-48 group">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={192}
            height={192}
            className="w-full h-full object-cover group-hover:scale-110 transition"
          />
          <button className="absolute top-2 right-2 p-2 bg-white rounded-full hover:bg-red-100 opacity-0 group-hover:opacity-100 transition">
            <Heart size={18} className="text-gray-600 hover:text-red-500" />
          </button>
          {product.originalPrice && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </div>
          )}
        </div>
        <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-blue-500">{product.name}</h3>
        <div className="flex items-center gap-2 mb-2">
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
          <span className="text-xs text-gray-600">({product.reviews})</span>
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
  )
}
