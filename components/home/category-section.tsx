import Link from "next/link"

export function CategorySection() {
  const categories = [
    { name: "Automobiles", icon: "🚗" },
    { name: "Clothes and wear", icon: "👕" },
    { name: "Home interiors", icon: "🏠" },
    { name: "Computer and tech", icon: "💻" },
    { name: "Tools, equipment", icon: "🔧" },
    { name: "Sports and outdoor", icon: "⚽" },
    { name: "Animal and pets", icon: "🐾" },
    { name: "Machinery tools", icon: "⚙️" },
  ]

  return (
    <div className="bg-gray-50 p-8 rounded-lg mb-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">All Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/products?category=${cat.name}`}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg hover:shadow-md hover:border-blue-500 border border-transparent transition"
            >
              <div className="text-4xl">{cat.icon}</div>
              <span className="text-xs text-center font-medium">{cat.name}</span>
            </Link>
          ))}
        </div>
        <Link href="/products" className="text-blue-500 hover:text-blue-600 font-medium mt-4 block">
          See all
        </Link>
      </div>
    </div>
  )
}
