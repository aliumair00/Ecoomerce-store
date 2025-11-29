"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { API_BASE, getJSON } from "@/lib/api"
type Product = { _id: string; name: string; price: number; image?: string; images?: string[]; category?: string }
import Link from "next/link"
import { Plus, Pencil, Trash } from "lucide-react"

export default function AdminProductsPage() {
  const [items, setItems] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const run = async () => {
      try {
        const res = await getJSON<{ items: Product[] }>(`${API_BASE}/api/products?limit=100`)
        setItems(res.items || [])
      } catch {
        setItems([])
      } finally {
        setIsLoading(false)
      }
    }
    run()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return
    const r = await fetch(`${API_BASE}/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
    })
    if (r.ok) {
      setItems((prev) => prev.filter((p) => p._id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div>Loading products...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p) => (
            <Card key={p._id} className="overflow-hidden">
              <div className="aspect-video relative bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image || p.images?.[0]}
                  alt={p.name}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg"
                  }}
                />
              </div>
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold truncate pr-4" title={p.name}>{p.name}</h3>
                    <p className="text-sm text-muted-foreground">{p.category}</p>
                  </div>
                  <div className="font-bold text-lg">${p.price}</div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/admin/products/${p._id}`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(p._id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          {items.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No products found. Add your first product!
            </div>
          )}
        </div>
      )}
    </div>
  )
}
