"use client"

import Link from "next/link"
import { ShoppingCart, Heart, Mail, User, ChevronDown, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/auth/auth-provider"

import { categories as categoryList } from "@/components/home/categories"

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      {/* Main header */}
      <div className="px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 min-w-fit">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shopping-bag"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-blue-500">Brand</span>
          </Link>

          {/* Search bar */}
          <div className="w-full md:flex-1 md:max-w-2xl">
            <div className="grid grid-cols-1 gap-2 sm:flex sm:items-center sm:gap-2">
              <Input type="text" placeholder="Search" className="flex-1 min-w-0" />
              <div className="flex gap-2">
                <select className="px-3 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-auto">
                  <option>All category</option>
                </select>
                <Button className="bg-blue-500 hover:bg-blue-600 whitespace-nowrap flex-shrink-0 w-full sm:w-auto">Search</Button>
              </div>
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-4 mt-2 md:mt-0">
            <Link href="/profile" className="flex flex-col items-center gap-1 text-sm hover:text-blue-500">
              <User size={20} />
            </Link>
            <Link href="/messages" className="flex flex-col items-center gap-1 text-sm hover:text-blue-500">
              <Mail size={20} />
            </Link>
            <Link href="/orders" className="flex flex-col items-center gap-1 text-sm hover:text-blue-500">
              <Heart size={20} />
            </Link>
            <Link href="/admin/login" className="flex flex-col items-center gap-1 text-sm hover:text-blue-500" title="Admin Login">
              <Shield size={20} />
            </Link>
            <Link href="/cart" className="flex flex-col items-center gap-1 text-sm hover:text-blue-500">
              <ShoppingCart size={20} />
            </Link>
            <AuthBanner />
          </div>
        </div>
      </div>

      {/* Navigation menu */}
      <div className="border-t border-gray-200 px-4 py-2">
        <div className="max-w-7xl mx-auto flex gap-6 text-sm font-medium items-center overflow-x-auto">
          {/* All Categories dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 hover:text-blue-500">
              ☰ All category <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
            </button>
            {/* Dropdown */}
            <div className="absolute left-0 top-full mt-2 hidden group-hover:block bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[180px]">
              <ul className="py-2">
                {categoryList.map((cat, idx) => (
                  <li key={idx} className="px-4 py-1.5 whitespace-nowrap hover:bg-gray-50 cursor-pointer">
                    {cat}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Static Links */}
          <Link href="#" className="hover:text-blue-500 whitespace-nowrap">
            Hot offers
          </Link>
          <Link href="#" className="hover:text-blue-500 whitespace-nowrap">
            Gift boxes
          </Link>
          <Link href="#" className="hover:text-blue-500 whitespace-nowrap">
            Projects
          </Link>
          <Link href="#" className="hover:text-blue-500 whitespace-nowrap">
            Menu item
          </Link>
          <select className="hover:text-blue-500 whitespace-nowrap bg-transparent">
            <option>Help</option>
          </select>
          <div className="flex items-center gap-6 ml-auto">
            <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
              <span>English, USD</span>
              <ChevronDown size={16} />
            </button>
            <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600 border border-gray-300 rounded-md px-3 py-1">
              <span>Ship to</span>
              <span className="font-medium">DE</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

function AuthBanner() {
  const { user, logout } = useAuth()
  if (!user)
    return null
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">{user.name || user.email}</span>
      {user.role === "admin" && (
        <Link href="/admin/products">
          <Button size="sm" variant="outline" className="bg-transparent">Admin</Button>
        </Link>
      )}
      <Button size="sm" variant="outline" className="bg-transparent" onClick={() => { logout(); location.href = "/login" }}>Logout</Button>
    </div>
  )
}
