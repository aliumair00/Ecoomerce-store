import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {/* Main banner */}
      <div className="md:col-span-2 bg-gradient-to-r from-green-200 to-teal-200 rounded-lg p-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Latest trending</h2>
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Electronic items</h3>
          <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent">
            Learn more
          </Button>
        </div>
        <div className="text-6xl">🎧</div>
      </div>

      {/* Side banners */}
      <div className="space-y-3">
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-4">
          <div className="text-2xl font-semibold text-gray-800 mb-1">Hi user</div>
          <div className="text-sm text-gray-600 mb-3">let&apos;s get started</div>
          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
            Join now
          </Button>
        </div>
        <div className="bg-gradient-to-r from-orange-200 to-yellow-200 rounded-lg p-4">
          <div className="text-sm font-semibold text-gray-800 mb-1">Get Us $10 off</div>
          <div className="text-xs text-gray-600 mb-3">with a new newsletter</div>
          <Button size="sm" variant="outline" className="text-xs bg-transparent">
            Subscribe
          </Button>
        </div>
        <div className="bg-gradient-to-r from-cyan-200 to-blue-200 rounded-lg p-4">
          <div className="text-sm font-semibold text-gray-800 mb-1">Send quotes with</div>
          <div className="text-xs text-gray-600 mb-3">supplier preferences</div>
          <Button size="sm" variant="outline" className="text-xs bg-transparent">
            Connect
          </Button>
        </div>
      </div>
    </div>
  )
}
