"use client"

import { useState, useEffect, Suspense } from "react"
import { ProductCard } from "@/components/product/product-card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Grid3X3, List } from "lucide-react"
import { mockProducts, mockCategories, mockBrands } from "@/lib/mock-data"
import { getJSON, API_BASE } from "@/lib/api"

function ProductsContent() {
  const [viewType, setViewType] = useState<"grid" | "list">("grid")
  const [selectedBrands, setSelectedBrands] = useState<string[]>(["Samsung", "Apple", "Metallic"])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState(mockProducts)

  const itemsPerPage = viewType === "grid" ? 9 : 6
  const totalPages = Math.ceil(products.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const displayedProducts = products.slice(startIdx, startIdx + itemsPerPage)

  useEffect(() => {
    const run = async () => {
      try {
        const data = await getJSON<{ items: typeof mockProducts }>(`${API_BASE}/api/products`)
        setProducts(data.items.length ? data.items : mockProducts)
      } catch {
        setProducts(mockProducts)
      }
    }
    run()
  }, [])

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex gap-2 text-sm mb-6 text-gray-600">
          <span>Home</span>
          <span>›</span>
          <span>Clothing</span>
          <span>›</span>
          <span>Men&apos;s wear</span>
          <span>›</span>
          <span>Summer clothing</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-4 space-y-6 bg-gray-50 p-4 rounded-lg">
              {/* Category */}
              <div>
                <h3 className="font-semibold mb-3 flex justify-between items-center cursor-pointer">
                  Category
                  <span>−</span>
                </h3>
                <ul className="space-y-2 text-sm">
                  {mockCategories.slice(0, 6).map((cat) => (
                    <li key={cat}>
                      <a href="#" className="text-gray-600 hover:text-blue-500">
                        {cat}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href="#" className="text-blue-500 font-medium">
                      See all
                    </a>
                  </li>
                </ul>
              </div>

              {/* Brands */}
              <div>
                <h3 className="font-semibold mb-3 flex justify-between items-center cursor-pointer">
                  Brands
                  <span>−</span>
                </h3>
                <ul className="space-y-2">
                  {mockBrands.map((brand) => (
                    <li key={brand} className="flex items-center gap-2">
                      <Checkbox
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => handleBrandToggle(brand)}
                      />
                      <label htmlFor={brand} className="text-sm cursor-pointer">
                        {brand}
                      </label>
                    </li>
                  ))}
                  <li>
                    <a href="#" className="text-blue-500 font-medium text-sm">
                      See all
                    </a>
                  </li>
                </ul>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-semibold mb-3 flex justify-between items-center cursor-pointer">
                  Features
                  <span>−</span>
                </h3>
                <ul className="space-y-2">
                  {["Metallic", "Plastic cover", "8GB Ram", "Super power", "Large Memory"].map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Checkbox id={feature} />
                      <label htmlFor={feature} className="text-sm cursor-pointer">
                        {feature}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-3 cursor-pointer">Price range</h3>
                <input type="range" min="0" max="1000" className="w-full" />
                <div className="flex gap-2 mt-2">
                  <input type="number" placeholder="Min" className="w-full px-2 py-1 border rounded text-sm" />
                  <input type="number" placeholder="Max" className="w-full px-2 py-1 border rounded text-sm" />
                </div>
                <Button size="sm" className="w-full mt-2 bg-transparent" variant="outline">
                  Apply
                </Button>
              </div>

              {/* Condition */}
              <div>
                <h3 className="font-semibold mb-3 cursor-pointer">Condition</h3>
                <ul className="space-y-2">
                  {["Any", "Refurbished", "Brand new", "Old items"].map((condition) => (
                    <li key={condition} className="flex items-center gap-2">
                      <input type="radio" name="condition" id={condition} />
                      <label htmlFor={condition} className="text-sm cursor-pointer">
                        {condition}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ratings */}
              <div>
                <h3 className="font-semibold mb-3 cursor-pointer">Ratings</h3>
                <ul className="space-y-2">
                  {[5, 4, 3, 2].map((stars) => (
                    <li key={stars} className="flex items-center gap-2">
                      <Checkbox />
                      <label className="text-sm cursor-pointer">
                        {"★".repeat(stars)}
                        {"☆".repeat(5 - stars)}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Header */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  {mockProducts.length.toLocaleString()} items in Mobile accessory
                </h2>
                <div className="flex gap-2 flex-wrap">
                  {selectedBrands.map((brand) => (
                    <span
                      key={brand}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2"
                    >
                      {brand}
                      <button className="font-bold">×</button>
                    </span>
                  ))}
                  {selectedBrands.length > 0 && (
                    <button className="text-blue-500 text-sm hover:underline">Clear all filters</button>
                  )}
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setViewType("grid")}
                  className={`p-2 rounded ${viewType === "grid" ? "bg-blue-500 text-white" : "border border-gray-300"}`}
                >
                  <Grid3X3 size={20} />
                </button>
                <button
                  onClick={() => setViewType("list")}
                  className={`p-2 rounded ${viewType === "list" ? "bg-blue-500 text-white" : "border border-gray-300"}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>

            {/* Products Grid/List */}
            <div
              className={
                viewType === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8" : "space-y-4 mb-8"
              }
            >
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewType={viewType} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mb-12">
              <span className="text-sm text-gray-600">
                Show{" "}
                <select className="px-2 py-1 border rounded inline">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
              </span>
              <div className="flex gap-2">
                <button className="px-3 py-2 border rounded hover:border-blue-500">‹</button>
                {[...Array(Math.min(3, totalPages))].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-2 rounded ${
                      currentPage === i + 1 ? "bg-blue-500 text-white" : "border border-gray-300 hover:border-blue-500"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                {totalPages > 3 && <span className="px-3 py-2">...</span>}
                <button className="px-3 py-2 border rounded hover:border-blue-500">›</button>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gray-50 rounded-lg p-8 text-center mb-12">
              <h2 className="text-2xl font-bold mb-2">Subscribe on our newsletter</h2>
              <p className="text-gray-600 mb-4">
                Get daily news on upcoming offers from many suppliers all over the world
              </p>
              <div className="flex gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
                <Button className="bg-blue-500 hover:bg-blue-600">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  )
}
