"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Star, Heart, Shield, Truck, RotateCcw } from "lucide-react"
import { mockProducts } from "@/lib/mock-data"
import { getJSON, API_BASE } from "@/lib/api"
import Image from "next/image"
import { ProductCard } from "@/components/product/product-card"

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState(mockProducts[0])
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    const run = async () => {
      try {
        const item = await getJSON<typeof mockProducts[0]>(`${API_BASE}/api/products/${params.id}`)
        setProduct(item)
      } catch {
        const fallback = mockProducts.find((p) => p.id === params.id) || mockProducts[0]
        setProduct(fallback)
      }
    }
    run()
  }, [params.id])

  const relatedProducts = mockProducts.filter((p) => p.category === product.category).slice(0, 6)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex gap-2 text-sm mb-8 text-gray-600">
          <span>Home</span>
          <span>›</span>
          <span>Clothing</span>
          <span>›</span>
          <span>Men&apos;s wear</span>
          <span>›</span>
          <span>Summer clothing</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Left - Images */}
          <div className="md:col-span-1">
            <div className="sticky top-4">
              <div className="bg-gray-100 rounded-lg mb-4 h-80 flex items-center justify-center overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[...Array(6)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`bg-gray-100 rounded-lg p-2 border-2 ${selectedImage === i ? "border-blue-500" : "border-transparent"
                      }`}
                  >
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={`${product.name} ${i}`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Middle - Product Info */}
          <div className="md:col-span-1">
            <div className="mb-4 inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
              ✓ In stock
            </div>
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-sm">
                {product.rating} ({product.reviews} reviews) · {product.sold} sold
              </span>
            </div>

            {/* Pricing */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-blue-500">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
              </div>
              <p className="text-sm text-gray-600">50-100 pcs</p>
              <p className="text-sm text-gray-600">100-700 pcs</p>
              <p className="text-sm text-gray-600">700+ pcs</p>
            </div>

            {/* Details */}
            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-medium">Negotiable</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium">{product.design}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Material:</span>
                <span className="font-medium">{product.material}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Design:</span>
                <span className="font-medium">{product.design}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Customization:</span>
                <span className="font-medium">{product.customization}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Protection:</span>
                <span className="font-medium">{product.protection}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Warranty:</span>
                <span className="font-medium">{product.warranty}</span>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="px-6 py-2 border-l border-r">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-gray-600 hover:bg-gray-100">
                  +
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 mb-6">
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6">Send inquiry</Button>
              <Button variant="outline" className="w-full py-6 flex items-center justify-center gap-2 bg-transparent">
                <Heart size={18} />
                Save for later
              </Button>
            </div>
          </div>

          {/* Right - Supplier Info */}
          <div className="md:col-span-1">
            <div className="border rounded-lg p-6 mb-6 sticky top-4">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold text-lg mb-4">
                R
              </div>
              <div className="mb-4">
                <h3 className="font-semibold">Supplier</h3>
                <p className="text-sm text-gray-600">{product.supplier.name}</p>
              </div>

              <div className="flex items-center gap-2 mb-3 text-sm">
                <span>🇩🇪</span>
                <span>{product.supplier.location}</span>
              </div>

              {product.supplier.verified && (
                <div className="flex items-center gap-2 mb-3 text-sm text-green-600">
                  <Shield size={16} />
                  Verified Seller
                </div>
              )}

              <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
                <Truck size={16} />
                {product.supplier.shipping}
              </div>

              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white mb-3">Send inquiry</Button>
              <Button variant="outline" className="w-full bg-transparent">
                Seller&apos;s profile
              </Button>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                <Shield size={20} className="flex-shrink-0 text-gray-600" />
                <div className="text-sm">
                  <p className="font-medium">Secure payment</p>
                  <p className="text-gray-600 text-xs">Have you ever finally just</p>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                <Heart size={20} className="flex-shrink-0 text-gray-600" />
                <div className="text-sm">
                  <p className="font-medium">Customer support</p>
                  <p className="text-gray-600 text-xs">Have you ever finally just</p>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                <RotateCcw size={20} className="flex-shrink-0 text-gray-600" />
                <div className="text-sm">
                  <p className="font-medium">Free delivery</p>
                  <p className="text-gray-600 text-xs">Have you ever finally just</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-12 border-b">
          <div className="flex gap-8 mb-6">
            <button className="font-medium text-blue-500 border-b-2 border-blue-500 pb-2">Description</button>
            <button className="font-medium text-gray-600 pb-2 hover:text-blue-500">Reviews</button>
            <button className="font-medium text-gray-600 pb-2 hover:text-blue-500">Shipping</button>
            <button className="font-medium text-gray-600 pb-2 hover:text-blue-500">About seller</button>
          </div>

          {/* Description Content */}
          <div className="mb-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              {product.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-6">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key}>
                  <p className="text-gray-600 text-sm capitalize">{key}</p>
                  <p className="font-medium">{value}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-semibold mb-3">Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Related products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} viewType="grid" />
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-8 mb-12 flex justify-between items-center text-white">
          <div>
            <h2 className="text-3xl font-bold mb-2">Super discount on more than 100 USD</h2>
            <p className="text-blue-100">Have you ever finally just write dummy info</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">Shop now</Button>
        </div>
      </div>
    </div>
  )
}
