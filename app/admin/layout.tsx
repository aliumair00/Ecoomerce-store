"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuth()
  const pathname = usePathname()

  useEffect(() => {
    if (ready && (!user || user.role !== "admin") && pathname !== "/admin/login") {
      location.href = "/admin/login"
    }
  }, [ready, user, pathname])

  if (!ready) return <div className="min-h-screen flex items-center justify-center text-sm">Loading...</div>

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <aside className="hidden md:block fixed inset-y-0 left-0 z-10 w-64">
        <AdminSidebar />
      </aside>
      <main className="flex-1 md:ml-64 p-8">
        {children}
      </main>
    </div>
  )
}
