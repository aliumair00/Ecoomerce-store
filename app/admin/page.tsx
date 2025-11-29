"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, Users, LineChart, Cog } from "lucide-react"

export default function AdminIndexPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Quick access to management sections</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2"><Package className="h-5 w-5" /> Products</CardTitle>
            <Button asChild><Link href="/admin/products">Open</Link></Button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Manage catalog, pricing, descriptions, approval.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> Users</CardTitle>
            <Button asChild><Link href="/admin/users">Open</Link></Button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">View users and toggle admin roles.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2"><LineChart className="h-5 w-5" /> Analytics</CardTitle>
            <Button asChild><Link href="/admin/analytics">Open</Link></Button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Sales charts and exports.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2"><Cog className="h-5 w-5" /> Features</CardTitle>
            <Button asChild><Link href="/admin/features">Open</Link></Button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Feature flags and priorities.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

