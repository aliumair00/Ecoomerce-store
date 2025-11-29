"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { API_BASE, getJSON } from "@/lib/api"
import { Card } from "@/components/ui/card"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

type SeriesPoint = { label: string; value: number }

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("daily")
  const [series, setSeries] = useState<SeriesPoint[]>([])

  useEffect(() => {
    getJSON<{ points: SeriesPoint[] }>(`${API_BASE}/api/analytics/sales?period=${period}`).then((d) => setSeries(d.points))
  }, [period])

  const exportCSV = async () => {
    const res = await fetch(`${API_BASE}/api/analytics/export/csv?period=${period}`)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `sales-${period}.csv`
    a.click()
  }

  const exportPDF = async () => {
    const res = await fetch(`${API_BASE}/api/analytics/export/pdf?period=${period}`)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `sales-${period}.pdf`
    a.click()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Sales Analytics</h2>
        <div className="flex gap-2">
          <select value={period} onChange={(e) => setPeriod(e.target.value)} className="border rounded px-2 py-1 text-sm">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <Button onClick={exportCSV} variant="outline" className="bg-transparent">Export CSV</Button>
          <Button onClick={exportPDF}>Export PDF</Button>
        </div>
      </div>
      <Card className="p-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={series}>
              <Line type="monotone" dataKey="value" stroke="#2563eb" />
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}
