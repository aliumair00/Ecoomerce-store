import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SupplierQuote() {
  return (
    <div className="relative rounded-xl overflow-hidden mb-12"
      style={{
        backgroundImage: `url(/warehouse-factory.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#2E7CFB]/80 via-[#2E7CFB]/60 to-[#48C9FF]/60" />
      <div className="relative grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-6 py-8 md:px-10 md:py-10 min-h-[220px] md:min-h-[260px]">
        <div className="text-white">
          <h2 className="text-[22px] md:text-[28px] font-bold leading-tight mb-2">An easy way to send requests to all suppliers</h2>
          <p className="text-white/90 text-[13px] md:text-sm max-w-[520px]">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>

        <div className="md:relative">
          <div className="bg-white rounded-xl shadow-lg md:absolute md:right-6 md:top-1/2 md:-translate-y-1/2 w-full md:w-[360px] lg:w-[380px] p-6">
            <h3 className="font-semibold text-[18px] text-gray-900 mb-4">Send quote to suppliers</h3>
            <form className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">What item you need?</label>
                <Input placeholder="Type more details" className="mt-1 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Quantity</label>
                  <Input type="number" placeholder="100" className="mt-1 text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Unit</label>
                  <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option>Pcs</option>
                  </select>
                </div>
              </div>
              <Button className="w-full bg-[#2E7CFB] hover:bg-[#1f6be6] text-white text-sm transition-transform duration-200 hover:-translate-y-[1px]">Send inquiry</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
