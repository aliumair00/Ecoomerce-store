"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { API_BASE } from "@/lib/api"

type User = { id: string; name?: string; email?: string; role?: "user" | "admin" }

type AuthContextValue = {
  user: User | null
  token: string | null
  ready: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue>({ user: null, token: null, ready: false, login: async () => false, logout: () => {} })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = typeof window !== "undefined" ? localStorage.getItem("token") : null
    if (t) {
      setToken(t)
    } else {
      setReady(true)
    }
  }, [])

  useEffect(() => {
    if (!token) return
    let cancelled = false
    const controller = new AbortController()

    const loadProfile = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error("unauth")
        }
        const data = await response.json()
        if (!cancelled) {
          setUser(data)
          setReady(true)
        }
      } catch {
        if (cancelled) return
        localStorage.removeItem("token")
        setUser(null)
        setToken(null)
        setReady(true)
      }
    }

    loadProfile()

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [token])

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/api/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) })
    const j = await res.json()
    if (!res.ok) return false
    localStorage.setItem("token", j.token)
    setReady(false)
    setToken(j.token)
    return true
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
    setReady(true)
  }

  return <AuthContext.Provider value={{ user, token, ready, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
