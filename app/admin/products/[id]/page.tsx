"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { API_BASE, getJSON } from "@/lib/api"

type Product = {
  _id: string
  sku?: string
  name: string
  price: number
  description?: string
  image?: string
  deletedAt?: string
  archivedAt?: string
  approved?: boolean
}

export default function EditProductPage({ params }: { params: { id: string } }) {
  const [p, setP] = useState<Product | null>(null)
  const [patch, setPatch] = useState<any>({})
  const [saving, setSaving] = useState(false)
  const [skuStatus, setSkuStatus] = useState<"unknown" | "ok" | "dup">("unknown")

  useEffect(() => {
    getJSON<Product>(`${API_BASE}/api/products/${params.id}`).then(setP)
  }, [params.id])

  const setField = (k: string, v: any) => setPatch((prev: any) => ({ ...prev, [k]: v }))

  const checkSku = async (value: string) => {
    if (!value) return setSkuStatus("unknown")
    const r = await getJSON<{ items: Product[] }>(`${API_BASE}/api/products?sku=${encodeURIComponent(value)}`)
    const dup = r.items.some((it) => it._id !== p?._id)
    setSkuStatus(dup ? "dup" : "ok")
  }

  const save = async () => {
    if (skuStatus === "dup") return
    setSaving(true)
    const res = await fetch(`${API_BASE}/api/products/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
      body: JSON.stringify(patch),
    })
    if (res.ok) location.href = "/admin/products"
    setSaving(false)
  }

  const archive = async () => {
    const res = await fetch(`${API_BASE}/api/products/${params.id}/archive`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
    })
    if (res.ok) location.reload()
  }

  const restore = async () => {
    const res = await fetch(`${API_BASE}/api/products/${params.id}/restore`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
    })
    if (res.ok) location.reload()
  }

  const remove = async () => {
    if (!confirm("Delete product? This is a soft delete.")) return
    const res = await fetch(`${API_BASE}/api/products/${params.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
    })
    if (res.ok) location.href = "/admin/products"
  }

  if (!p) return <div className="text-sm">Loading...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-4 md:col-span-2">
        <h2 className="text-lg font-bold mb-4">Edit Product</h2>
        <div className="space-y-3">
          <div>
            <label className="text-sm">Name</label>
            <Input defaultValue={p.name} onChange={(e) => setField("name", e.target.value)} />
          </div>
          <div>
            <label className="text-sm">Price</label>
            <Input type="number" defaultValue={p.price} onChange={(e) => setField("price", Number(e.target.value))} />
          </div>
          <div>
            <label className="text-sm">Description</label>
            <Input defaultValue={p.description} onChange={(e) => setField("description", e.target.value)} />
          </div>
          <div>
            <label className="text-sm">SKU</label>
            <Input defaultValue={p.sku} onChange={(e) => { setField("sku", e.target.value); checkSku(e.target.value) }} />
            {skuStatus === "dup" && <div className="text-xs text-red-600 mt-1">Duplicate SKU</div>}
            {skuStatus === "ok" && <div className="text-xs text-green-600 mt-1">SKU OK</div>}
          </div>
          <div className="flex gap-2">
            <Button onClick={save} disabled={saving || skuStatus === "dup"}>{saving ? "Saving..." : "Save"}</Button>
            <Button variant="outline" className="bg-transparent" onClick={() => history.back()}>Cancel</Button>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <h3 className="font-semibold mb-2">State</h3>
        <div className="text-sm">Deleted: {p.deletedAt ? "Yes" : "No"}</div>
        <div className="text-sm">Archived: {p.archivedAt ? "Yes" : "No"}</div>
        <div className="text-sm">Approved: {p.approved ? "Yes" : "No"}</div>
        <div className="mt-3 flex gap-2">
          <Button variant="outline" className="bg-transparent" onClick={archive}>Archive</Button>
          <Button variant="outline" className="bg-transparent" onClick={restore}>Restore</Button>
          <Button variant="destructive" onClick={remove}>Delete</Button>
          <Button variant="outline" className="bg-transparent" onClick={async () => { const r = await fetch(`${API_BASE}/api/products/${params.id}/approve`, { method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token") || ""}` }, body: JSON.stringify({ approved: !p.approved }) }); if (r.ok) location.reload() }}>Toggle Approve</Button>
        </div>
      </Card>
    </div>
  )
}
