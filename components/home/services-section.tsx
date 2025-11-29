import { Card } from "@/components/ui/card"
import { mockServices } from "@/lib/mock-data"
import Image from "next/image"

export function ServicesSection() {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold mb-6">Our extra services</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {mockServices.map((service) => (
          <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="bg-gray-300 aspect-square overflow-hidden relative">
              <Image src={service.image || "/placeholder.svg"} alt={service.title} width={300} height={300} className="w-full h-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                <span className="text-5xl">{service.icon}</span>
              </div>
            </div>
            <div className="p-3 bg-white text-center">
              <p className="font-medium text-gray-900 text-sm">{service.title}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
