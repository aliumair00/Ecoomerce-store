"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { API_BASE } from "@/lib/api"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const login = async () => {
    setError("")
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    const j = await res.json()
    if (!res.ok) return setError(j.error || "Login failed")
    localStorage.setItem("token", j.token)
    location.href = "/admin/products"
  }

  return (
    <div className="max-w-sm mx-auto mt-12 bg-white p-6 rounded shadow">
      <h2 className="text-lg font-bold mb-4">Admin Login</h2>
      {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
      <div className="space-y-3">
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={login} className="bg-blue-600">Login</Button>
      </div>
    </div>
  )
}
