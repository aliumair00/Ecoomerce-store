"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { mockCartItems, mockSavedItems } from "@/lib/mock-data"
import Link from "next/link"
import Image from "next/image"
import { ProductCard } from "@/components/product/product-card"

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems)
  const [couponCode, setCouponCode] = useState("")

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = 60
  const tax = 14
  const total = subtotal - discount + tax

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)))
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My cart ({cartItems.length})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                <Image
                  src={item.product.image || "/placeholder.svg"}
                  alt={item.product.name}
                  width={96}
                  height={96}
                  className="w-24 h-24 object-cover rounded-lg bg-gray-100"
                />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{item.product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Size: {item.product.specifications.size}, Color: blue, Material: Plastic
                  </p>
                  <p className="text-sm text-gray-600 mb-2">Seller: {item.product.supplier.name}</p>
                  <div className="flex gap-4">
                    <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 text-sm hover:underline">
                      Remove
                    </button>
                    <button className="text-blue-500 text-sm hover:underline" onClick={() => alert("Saved for later!")}>Save for later</button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-500 mb-4">${item.price}</p>
                  <div className="flex items-center border rounded-lg w-fit ml-auto">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="px-3 py-1 text-gray-600"
                    >
                      −
                    </button>
                    <span className="px-3 py-1 border-l border-r">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="px-3 py-1 text-gray-600"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <Link href="/products">
              <Button variant="outline" className="w-full sm:w-fit bg-transparent">
                ← Back to shop
              </Button>
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
              <h2 className="font-semibold mb-4">Have a coupon?</h2>
              <div className="flex gap-2 mb-6">
                <Input placeholder="Add coupon" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                <Button className="px-6">Apply</Button>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-red-500">
                  <span>Discount:</span>
                  <span>- ${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>Tax:</span>
                  <span>+ ${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white mb-4 py-6 font-bold"
                onClick={() => alert("Proceeding to checkout...")}
              >
                Checkout
              </Button>

              <div className="flex justify-center gap-3 mb-6">
                <span className="text-xs">💳</span>
                <span className="text-xs">💳</span>
                <span className="text-xs">💳</span>
                <span className="text-xs">💳</span>
              </div>

              <p className="text-xs text-center text-gray-600">Secure checkout with international brands</p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl">🔒</div>
            <div className="text-sm">
              <p className="font-medium">Secure payment</p>
              <p className="text-gray-600">Have you ever finally just</p>
            </div>
          </div>
          <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl">👥</div>
            <div className="text-sm">
              <p className="font-medium">Customer support</p>
              <p className="text-gray-600">Have you ever finally just</p>
            </div>
          </div>
          <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl">🚚</div>
            <div className="text-sm">
              <p className="font-medium">Free delivery</p>
              <p className="text-gray-600">Have you ever finally just</p>
            </div>
          </div>
        </div>

        {/* Saved for Later */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Saved for later</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {mockSavedItems.map((product) => (
              <ProductCard key={product.id} product={product} viewType="grid" />
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
