"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { API_BASE } from "@/lib/api"

export default function BatchEditPage() {
  const searchParams = useSearchParams()
  const ids = useMemo(() => {
    const raw = searchParams.get("ids") || ""
    return raw.split(",").filter(Boolean)
  }, [searchParams])
  const [priceDelta, setPriceDelta] = useState<number>(0)
  const [category, setCategory] = useState<string>("")

  const apply = async () => {
    await Promise.all(
      ids.map((id) =>
        fetch(`${API_BASE}/api/products/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
          body: JSON.stringify({ ...(category ? { category } : {}), ...(priceDelta ? { price: priceDelta } : {}) }),
        })
      )
    )
    location.href = "/admin/products"
  }

  return (
    <Card className="p-4">
      <h2 className="text-lg font-bold mb-2">Batch Edit</h2>
      <div className="text-sm text-gray-600 mb-4">{ids.length} selected</div>
      <div className="space-y-3">
        <div>
          <label className="text-sm">Set Price</label>
          <Input type="number" value={priceDelta} onChange={(e) => setPriceDelta(Number(e.target.value))} />
        </div>
        <div>
          <label className="text-sm">Set Category</label>
          <Input value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <Button onClick={apply}>Apply</Button>
      </div>
    </Card>
  )
}
