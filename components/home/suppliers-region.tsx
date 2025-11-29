import { mockSuppliersByRegion } from "@/lib/mock-data"
import Image from "next/image"

export function SuppliersRegion() {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold mb-6">Suppliers by region</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {mockSuppliersByRegion.map((supplier, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all"
          >
            <Image
              src={`https://flagcdn.com/w20/${supplier.code.toLowerCase()}.png`}
              alt={`${supplier.country} flag`}
              width={20}
              height={12}
              className="w-5 h-3 object-cover rounded-sm"
            />
            <span className="text-xs sm:text-sm font-medium text-gray-700 hover:text-blue-600">{supplier.country}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
