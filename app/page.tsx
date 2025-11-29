import { SidebarFilters } from "@/components/home/sidebar-filters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Search, ClipboardList, Send, ShieldCheck, Flag } from "lucide-react"
import { SupplierQuote } from "@/components/home/supplier-quote"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <SidebarFilters />
          </div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main hero banner with product image */}
              <div className="md:col-span-2 bg-gradient-to-r from-green-200 to-teal-200 rounded-lg p-8 flex items-center justify-between overflow-hidden">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2 text-gray-800">Latest trending</h2>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">Electronic items</h3>
                  <Button variant="outline" className="border-white bg-white text-gray-800 hover:bg-gray-50">
                    Learn more
                  </Button>
                </div>
                <div className="hidden md:flex flex-1 justify-end items-center">
                  <Image
                    src="/hero-electronics.png"
                    alt="Electronic items - laptop, headphones, smartphone"
                    width={256}
                    height={256}
                    className="max-h-64 w-auto object-contain"
                  />
                </div>
              </div>

              {/* Side cards */}
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-6 text-center shadow-sm">
                  <p className="text-xl font-semibold text-gray-800 mb-2">Hi, user</p>
                  <p className="text-sm text-gray-600 mb-4">let&apos;s get started</p>
                  <Link href="/login#signup" className="block w-full bg-blue-600 text-white py-2 rounded-md mb-2 hover:bg-blue-700 text-center text-sm font-medium">
                    Join now
                  </Link>
                  <Link href="/login" className="block w-full border border-gray-300 py-2 rounded-md hover:bg-gray-50 text-center text-sm">
                    Log in
                  </Link>
                </div>
                <div className="bg-gradient-to-r from-orange-300 to-orange-400 text-white p-6 rounded-lg shadow-sm">
                  <p className="text-base font-semibold mb-1">Get US $10 off</p>
                  <p className="text-sm opacity-90">with a new supplier</p>
                </div>
                <div className="bg-gradient-to-r from-cyan-300 to-teal-400 text-white p-6 rounded-lg shadow-sm">
                  <p className="text-base font-semibold mb-1">Send quotes with</p>
                  <p className="text-sm opacity-90">supplier preferences</p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-5 divide-x divide-gray-200 xl:gap-0">
                <div className="p-4 lg:p-3 xl:p-3 2xl:p-4 flex flex-col justify-center min-w-[180px] lg:min-w-[160px] xl:min-w-[150px] 2xl:min-w-[180px]">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Deals and offers</h2>
                  <p className="text-sm text-gray-500 mb-4">Hygiene equipments</p>
                  <div className="flex gap-2 lg:gap-1.5 xl:gap-1.5 2xl:gap-2">
                    <div className="bg-gray-800 text-white rounded px-2 lg:px-1 py-1 lg:py-0.5 text-center min-w-[45px] lg:min-w-[40px] xl:min-w-[38px] 2xl:min-w-[42px]">
                      <div className="text-lg lg:text-base xl:text-sm 2xl:text-base font-bold leading-none">04</div>
                      <div className="text-[10px] lg:text-[9px] xl:text-[8px] 2xl:text-[9px] uppercase">Days</div>
                    </div>
                    <div className="bg-gray-800 text-white rounded px-2 lg:px-1 py-1 lg:py-0.5 text-center min-w-[45px] lg:min-w-[40px] xl:min-w-[38px] 2xl:min-w-[42px]">
                      <div className="text-lg lg:text-base xl:text-sm 2xl:text-base font-bold leading-none">13</div>
                      <div className="text-[10px] lg:text-[9px] xl:text-[8px] 2xl:text-[9px] uppercase">Hour</div>
                    </div>
                    <div className="bg-gray-800 text-white rounded px-2 lg:px-1 py-1 lg:py-0.5 text-center min-w-[45px] lg:min-w-[40px] xl:min-w-[38px] 2xl:min-w-[42px]">
                      <div className="text-lg lg:text-base xl:text-sm 2xl:text-base font-bold leading-none">34</div>
                      <div className="text-[10px] lg:text-[9px] xl:text-[8px] 2xl:text-[9px] uppercase">Min</div>
                    </div>
                    <div className="bg-gray-800 text-white rounded px-2 lg:px-1 py-1 lg:py-0.5 text-center min-w-[45px] lg:min-w-[40px] xl:min-w-[38px] 2xl:min-w-[42px]">
                      <div className="text-lg lg:text-base xl:text-sm 2xl:text-base font-bold leading-none">56</div>
                      <div className="text-[10px] lg:text-[9px] xl:text-[8px] 2xl:text-[9px] uppercase">Sec</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 text-center flex flex-col items-center justify-center group cursor-pointer hover:shadow-lg transition-shadow">
                  <Image src="/smart-watch-silver.jpg" alt="Smart watches" width={120} height={120} className="h-32 object-contain mb-3 group-hover:scale-105 transition-transform" />
                  <h3 className="font-medium text-gray-900 mb-2">Smart watches</h3>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm font-medium">-25%</div>
                </div>
                <div className="p-4 text-center flex flex-col items-center justify-center group cursor-pointer hover:shadow-lg transition-shadow">
                  <Image src="/laptop-pro-gold.jpg" alt="Laptops" width={120} height={120} className="h-32 object-contain mb-3 group-hover:scale-105 transition-transform" />
                  <h3 className="font-medium text-gray-900 mb-2">Laptops</h3>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm font-medium">-15%</div>
                </div>
                <div className="p-4 text-center flex flex-col items-center justify-center group cursor-pointer hover:shadow-lg transition-shadow">
                  <Image src="/gopro-action-camera-black.jpg" alt="GoPro cameras" width={120} height={120} className="h-32 object-contain mb-3 group-hover:scale-105 transition-transform" />
                  <h3 className="font-medium text-gray-900 mb-2">GoPro cameras</h3>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm font-medium">-40%</div>
                </div>
                <div className="p-4 text-center flex flex-col items-center justify-center group cursor-pointer hover:shadow-lg transition-shadow">
                  <Image src="/headphones-white.jpg" alt="Headphones" width={120} height={120} className="h-32 object-contain mb-3 group-hover:scale-105 transition-transform" />
                  <h3 className="font-medium text-gray-900 mb-2">Headphones</h3>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm font-medium">-25%</div>
                </div>
                <div className="p-4 text-center flex flex-col items-center justify-center group cursor-pointer hover:shadow-lg transition-shadow md:hidden lg:flex">
                  <Image src="/canon-camera-red.jpg" alt="Canon cameras" width={120} height={120} className="h-32 object-contain mb-3 group-hover:scale-105 transition-transform" />
                  <h3 className="font-medium text-gray-900 mb-2">Canon cameras</h3>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm font-medium">-25%</div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-6 bg-white rounded-lg p-5 lg:p-4 xl:p-5 2xl:p-6 border border-gray-200">
                <div className="md:col-span-2 bg-amber-50 rounded-lg overflow-hidden flex">
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Home and outdoor</h2>
                      <p className="text-sm text-gray-600">From top suppliers</p>
                    </div>
                    <Button className="bg-white text-blue-600 hover:bg-gray-100 w-fit">Source now</Button>
                  </div>
                  <div className="ml-auto flex items-end">
                    <Image src="/cozy-living-room.png" alt="Home and outdoor" width={160} height={160} className="h-40 object-contain" />
                  </div>
                </div>
                <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-0">
                  {[
                    { name: "Soft chairs", img: "/cozy-living-room.png", price: "From USD 19" },
                    { name: "Sofa & chair", img: "/cozy-living-room.png", price: "From USD 19" },
                    { name: "Kitchen dishes", img: "/electronics-gadgets.png", price: "From USD 19" },
                    { name: "Smart watches", img: "/smart-watch-silver.jpg", price: "From USD 19" },
                    { name: "Kitchen mixer", img: "/electronics-gadgets.png", price: "From USD 100" },
                    { name: "Blenders", img: "/electronics-gadgets.png", price: "From USD 39" },
                    { name: "Home appliance", img: "/electronics-gadgets.png", price: "From USD 19" },
                    { name: "Coffee maker", img: "/electronics-gadgets.png", price: "From USD 10" },
                  ].map((i, idx) => (
                    <div key={idx} className="bg-white px-6 xl:px-5 2xl:px-6 py-4 border border-gray-200 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1 text-sm">{i.name}</h3>
                        <p className="text-xs text-gray-500">{i.price}</p>
                      </div>
                      <Image src={i.img} alt={i.name} width={64} height={64} className="w-16 h-16 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-6 bg-white rounded-lg p-5 lg:p-4 xl:p-5 2xl:p-6 border border-gray-200">
                <div className="md:col-span-2 bg-blue-50 rounded-lg overflow-hidden flex">
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Consumer electronics and gadgets</h2>
                      <p className="text-sm text-gray-600">High-tech supplies</p>
                    </div>
                    <Button className="bg-white text-blue-600 hover:bg-gray-100 w-fit">Source now</Button>
                  </div>
                  <div className="ml-auto flex items-end">
                    <Image src="/electronics-gadgets.png" alt="Electronics" width={160} height={160} className="h-40 object-contain" />
                  </div>
                </div>
                <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-0">
                  {[
                    { name: "Smart watches", img: "/smart-watch-silver.jpg", price: "From USD 19" },
                    { name: "Cameras", img: "/canon-camera-red.jpg", price: "From USD 89" },
                    { name: "Headphones", img: "/headphones-white.jpg", price: "From USD 10" },
                    { name: "Smart watches", img: "/smart-watch-silver.jpg", price: "From USD 90" },
                    { name: "Gaming set", img: "/gopro-action-camera-black.jpg", price: "From USD 35" },
                    { name: "Laptops & PC", img: "/laptop-pro-gold.jpg", price: "From USD 340" },
                    { name: "Smartphones", img: "/electronics-gadgets.png", price: "From USD 19" },
                    { name: "Electric kettle", img: "/electronics-gadgets.png", price: "From USD 240" },
                  ].map((i, idx) => (
                    <div key={idx} className="bg-white px-6 xl:px-5 2xl:px-6 py-4 border border-gray-200 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1 text-sm">{i.name}</h3>
                        <p className="text-xs text-gray-500">{i.price}</p>
                      </div>
                      <Image src={i.img} alt={i.name} width={64} height={64} className="w-16 h-16 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12">
              <SupplierQuote />
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended items</h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                  { name: "Polo shirt", img: "/polo-shirt.jpg", price: "$10.30", desc: "casual, with short sleeves" },
                  { name: "Jacket", img: "/jacket.jpg", price: "$15.50", desc: "warm, for winter season" },
                  { name: "Suit", img: "/suit.jpg", price: "$34.00", desc: "formal, for business meetings" },
                  { name: "Wallet", img: "/wallet.jpg", price: "$10.50", desc: "leather, for travel" },
                  { name: "Backpack", img: "/backpack.jpg", price: "$10.50", desc: "waterproof, for hiking" },
                  { name: "Jeans", img: "/jeans.jpg", price: "$5.00", desc: "blue, 300cm" },
                  { name: "Headphones", img: "/headphones.jpg", price: "$4.90", desc: "wireless, for gaming" },
                  { name: "Backpack", img: "/backpack-2.jpg", price: "$10.30", desc: "sleek, modern design" },
                  { name: "Pot", img: "/pot.jpg", price: "$10.30", desc: "leather, waterproof" },
                  { name: "Kettle", img: "/kettle.jpg", price: "$10.30", desc: "electric, for tea" }
                ].map((product, idx) => (
                  <div key={idx} className="bg-white p-3 text-center">
                    <Image src={product.img} alt={product.name} width={128} height={128} className="w-full h-32 object-contain mb-2" />
                    <p className="text-sm font-semibold text-gray-900 mb-1">{product.price}</p>
                    <p className="text-xs text-gray-600">{product.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our extra services</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden">
                  <Image src="/warehouse-factory.jpg" alt="Service" width={300} height={128} className="w-full h-32 object-cover" />
                  <div className="p-4 relative">
                    <div className="absolute -top-8 left-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center shadow-md">
                      <Search className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mt-4 mb-2">Source from Industry Hubs</h3>
                    <p className="text-sm text-gray-600">Connect with verified suppliers</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden">
                  <Image src="/product-customization-design.jpg" alt="Service" width={300} height={128} className="w-full h-32 object-cover" />
                  <div className="p-4 relative">
                    <div className="absolute -top-8 left-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center shadow-md">
                      <ClipboardList className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mt-4 mb-2">Customize Your Products</h3>
                    <p className="text-sm text-gray-600">Personalize items to your needs</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden">
                  <Image src="/shipping-container-plane.jpg" alt="Service" width={300} height={128} className="w-full h-32 object-cover" />
                  <div className="p-4 relative">
                    <div className="absolute -top-8 left-4 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center shadow-md">
                      <Send className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mt-4 mb-2">Fast, reliable shipping</h3>
                    <p className="text-sm text-gray-600">Global delivery solutions</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden">
                  <Image src="/quality-inspection-inspection.jpg" alt="Service" width={300} height={128} className="w-full h-32 object-cover" />
                  <div className="p-4 relative">
                    <div className="absolute -top-8 left-4 w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center shadow-md">
                      <ShieldCheck className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mt-4 mb-2">Product monitoring and inspection</h3>
                    <p className="text-sm text-gray-600">Ensure product quality</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Suppliers by region</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="flex items-center gap-3">
                  <Image src="https://flagcdn.com/w40/ae.png" alt="UAE" width={28} height={20} className="object-contain" />
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Arabic Emirates</h4>
                    <p className="text-xs text-gray-500">shopname.ae</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Image src="https://flagcdn.com/w40/au.png" alt="Australia" width={28} height={20} className="object-contain" />
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Australia</h4>
                    <p className="text-xs text-gray-500">shopname.ae</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Image src="https://flagcdn.com/w40/us.png" alt="United States" width={28} height={20} className="object-contain" />
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">United States</h4>
                    <p className="text-xs text-gray-500">shopname.ae</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Image src="https://flagcdn.com/w40/ru.png" alt="Russia" width={28} height={20} className="object-contain" />
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Russia</h4>
                    <p className="text-xs text-gray-500">shopname.ru</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Image src="https://flagcdn.com/w40/it.png" alt="Italy" width={28} height={20} className="object-contain" />
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Italy</h4>
                    <p className="text-xs text-gray-500">shopname.it</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Image src="https://flagcdn.com/w40/dk.png" alt="Denmark" width={28} height={20} className="object-contain" />
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Denmark</h4>
                    <p className="text-xs text-gray-500">denmark.com.dk</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Image src="https://flagcdn.com/w40/fr.png" alt="France" width={28} height={20} className="object-contain" />
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">France</h4>
                    <p className="text-xs text-gray-500">shopname.com.fr</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Image src="https://flagcdn.com/w40/ae.png" alt="Arabic Emirates" width={28} height={20} className="object-contain" />
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Arabic Emirates</h4>
                    <p className="text-xs text-gray-500">shopname.ae</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Image src="https://flagcdn.com/w40/cn.png" alt="China" width={28} height={20} className="object-contain" />
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">China</h4>
                    <p className="text-xs text-gray-500">shopname.cn</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Image src="https://flagcdn.com/w40/gb.png" alt="Great Britain" width={28} height={20} className="object-contain" />
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Great Britain</h4>
                    <p className="text-xs text-gray-500">shopname.co.uk</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-white rounded-lg p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Subscribe on our newsletter</h2>
                <p className="text-gray-600">Get daily news on upcoming offers from many suppliers all over the world</p>
              </div>
              <div className="flex w-full md:w-auto">
                <Input placeholder="Email" className="rounded-r-none" />
                <Button className="bg-blue-600 hover:bg-blue-700 rounded-l-none">Subscribe</Button>
              </div>
            </div>

            <footer className="mt-12 bg-white rounded-lg p-8 shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">B2B Trade</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>About Us</li>
                    <li>Find a Supplier</li>
                    <li>Worldwide</li>
                    <li>Trade Services</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">About</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>About Us</li>
                    <li>Find a Supplier</li>
                    <li>Worldwide</li>
                    <li>Trade Services</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Trade Services</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>About Us</li>
                    <li>Find a Supplier</li>
                    <li>Worldwide</li>
                    <li>Trade Services</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">For Buyers</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>About Us</li>
                    <li>Find a Supplier</li>
                    <li>Worldwide</li>
                    <li>Trade Services</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
                © 2023 B2B Trade. All rights reserved.
              </div>
            </footer>
          </div>
        </div>
      </div>
    </main>
  )
}
