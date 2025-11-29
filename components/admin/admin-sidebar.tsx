"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Package, Users, LogOut } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"

export function AdminSidebar() {
    const pathname = usePathname()
    const { logout } = useAuth()

    const links = [
        {
            href: "/admin",
            label: "Dashboard",
            icon: LayoutDashboard,
            active: pathname === "/admin",
        },
        {
            href: "/admin/products",
            label: "Products",
            icon: Package,
            active: pathname.startsWith("/admin/products"),
        },
        {
            href: "/admin/users",
            label: "Users",
            icon: Users,
            active: pathname.startsWith("/admin/users"),
        },
    ]

    return (
        <div className="flex flex-col h-full border-r bg-gray-100/40 dark:bg-gray-800/40 w-64">
            <div className="p-6 border-b">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <span>Admin Panel</span>
                </Link>
            </div>
            <div className="flex-1 py-6 px-4">
                <nav className="flex flex-col gap-2">
                    {links.map((link) => (
                        <Button
                            key={link.href}
                            variant={link.active ? "secondary" : "ghost"}
                            className={cn("justify-start gap-2", link.active && "bg-gray-200 dark:bg-gray-700")}
                            asChild
                        >
                            <Link href={link.href}>
                                <link.icon className="w-4 h-4" />
                                {link.label}
                            </Link>
                        </Button>
                    ))}
                </nav>
            </div>
            <div className="p-4 border-t">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => {
                        logout()
                        window.location.href = "/login"
                    }}
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </Button>
            </div>
        </div>
    )
}
