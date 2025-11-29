"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { API_BASE, getJSON } from "@/lib/api"

type FeatureFlag = { _id: string; name: string; enabled: boolean; priority: number }

export default function FeaturesPage() {
  const [items, setItems] = useState<FeatureFlag[]>([])
  useEffect(() => {
    getJSON<FeatureFlag[]>(`${API_BASE}/api/features`).then(setItems)
  }, [])

  const toggle = async (id: string, enabled: boolean) => {
    const res = await fetch(`${API_BASE}/api/features/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
      body: JSON.stringify({ enabled }),
    })
    if (res.ok) location.reload()
  }

  const bump = async (id: string, delta: number) => {
    const res = await fetch(`${API_BASE}/api/features/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
      body: JSON.stringify({ priority: delta }),
    })
    if (res.ok) location.reload()
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((f) => (
          <Card key={f._id} className="p-4 flex justify-between items-center">
            <div>
              <div className="font-semibold">{f.name}</div>
              <div className="text-sm text-gray-600">Priority: {f.priority}</div>
            </div>
            <div className="flex gap-2 items-center">
              <Button variant="outline" className="bg-transparent" onClick={() => bump(f._id, f.priority + 1)}>+ Priority</Button>
              <Button variant="outline" className="bg-transparent" onClick={() => bump(f._id, f.priority - 1)}>- Priority</Button>
              <Button onClick={() => toggle(f._id, !f.enabled)}>{f.enabled ? "Disable" : "Enable"}</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
