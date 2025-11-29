import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                🔒
              </div>
              <span className="font-semibold text-blue-500">Brand</span>
            </div>
            <p className="text-sm text-gray-600">Best information about the company goes here but now lorem ipsum is</p>
            <div className="flex gap-4 mt-4">
              <Facebook size={18} className="text-gray-600 hover:text-blue-500 cursor-pointer" />
              <Twitter size={18} className="text-gray-600 hover:text-blue-500 cursor-pointer" />
              <Linkedin size={18} className="text-gray-600 hover:text-blue-500 cursor-pointer" />
              <Instagram size={18} className="text-gray-600 hover:text-blue-500 cursor-pointer" />
              <Mail size={18} className="text-gray-600 hover:text-blue-500 cursor-pointer" />
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-blue-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-500">
                  Find store
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-500">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-500">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Partnership */}
          <div>
            <h3 className="font-semibold mb-4">Partnership</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-blue-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-500">
                  Find store
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-500">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-500">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold mb-4">Information</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-blue-500">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-500">
                  Money Refund
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-500">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-500">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          {/* For users */}
          <div>
            <h3 className="font-semibold mb-4">For users</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-blue-500">
                  Login
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-500">
                  Register
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-500">
                  Settings
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-500">
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Get app */}
          <div>
            <h3 className="font-semibold mb-4">Get app</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
                <div className="text-2xl">🍎</div>
                <div className="text-xs">
                  <div>Download on the</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
                <div className="text-2xl">🤖</div>
                <div className="text-xs">
                  <div>Get it on</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 pt-6 flex justify-between items-center text-sm text-gray-600">
          <div>© 2023 Ecommerce.</div>
          <div className="flex gap-4">
            <span>🇺🇸 English</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
