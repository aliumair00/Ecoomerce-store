"use client"

import { useState, useSyncExternalStore } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { API_BASE } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { User, Mail, Lock } from "lucide-react"
import { ToastAction } from "@/components/ui/toast"
import { Spinner } from "@/components/ui/spinner"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

export default function LoginPage() {
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [regName, setRegName] = useState("")
  const [regEmail, setRegEmail] = useState("")
  const [regPassword, setRegPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const hash = useHashValue()
  const tab = hash === "#signup" ? "signup" : "login"
  const { toast } = useToast()

  const login = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      })
      const j = await res.json()
      if (!res.ok) {
        setError(j.error || "Login failed")
        toast({ title: "Login failed", description: j.error || "Please check your credentials", variant: "destructive" })
        setLoading(false)
        return
      }
      localStorage.setItem("token", j.token)
      toast({ title: "Welcome back", description: "Login successful", action: (
        <ToastAction altText="Go to profile" onClick={() => (location.href = "/profile")}>Continue</ToastAction>
      ) })
      location.href = "/profile"
    } catch {
      setError("Could not reach server")
      toast({ title: "Network error", description: "Could not reach server", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const register = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: regName, email: regEmail, password: regPassword }),
      })
      const j = await res.json()
      if (!res.ok) {
        setError(j.error || "Registration failed")
        toast({ title: "Registration failed", description: j.error || "Please try again", variant: "destructive" })
        setLoading(false)
        return
      }
      const res2 = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: regEmail, password: regPassword }),
      })
      const j2 = await res2.json()
      if (res2.ok) {
        localStorage.setItem("token", j2.token)
        toast({ title: "Account created", description: "You are now signed in" })
        location.href = "/profile"
      } else {
        setError(j2.error || "Login failed")
        toast({ title: "Login failed", description: j2.error || "Please try again", variant: "destructive" })
      }
    } catch {
      setError("Could not reach server")
      toast({ title: "Network error", description: "Could not reach server", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleTabChange = (value: string) => {
    const nextTab = value === "signup" ? "signup" : "login"
    if (typeof window === "undefined") return
    if (nextTab === "signup") {
      window.location.hash = "signup"
    } else {
      const { pathname, search } = window.location
      window.history.replaceState(null, "", `${pathname}${search}`)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-blue-200/40 blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-indigo-200/40 blur-3xl animate-pulse" />
      </div>
      <Card className="w-full max-w-sm p-6 border border-gray-200 shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-300 hover:shadow-2xl transition-shadow">
        <h1 className="text-xl font-bold mb-2 text-center">Welcome</h1>
        <p className="text-sm text-gray-600 mb-4 text-center">Login or create an account</p>
        {error && <div className="text-sm text-red-600 mb-2 text-center">{error}</div>}
        <Tabs value={tab} onValueChange={handleTabChange}> 
          <TabsList className="w-full rounded-full bg-white/70 backdrop-blur p-1 shadow-sm"> 
            <TabsTrigger value="login" className="flex-1 rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">Login</TabsTrigger> 
            <TabsTrigger value="signup" className="flex-1 rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">Sign up</TabsTrigger> 
          </TabsList> 
          <TabsContent value="login" className="space-y-3 pt-4 data-[state=inactive]:hidden animate-in fade-in slide-in-from-right-1"> 
            <div className="relative"> 
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} /> 
              <Input className="pl-9" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} /> 
            </div> 
            <Tooltip> 
              <TooltipTrigger asChild> 
                <div className="relative"> 
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} /> 
                  <Input className="pl-9" type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} /> 
                </div> 
              </TooltipTrigger> 
              <TooltipContent>Use at least 8 characters</TooltipContent> 
            </Tooltip> 
            <Button className="w-full hover:shadow-md transition flex items-center justify-center gap-2" onClick={login} disabled={loading}>{loading ? (<><Spinner className="size-4" /> Logging in...</>) : "Login"}</Button> 
          </TabsContent> 
          <TabsContent value="signup" className="space-y-3 pt-4 data-[state=inactive]:hidden animate-in fade-in slide-in-from-left-1"> 
            <div className="relative"> 
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} /> 
              <Input className="pl-9" placeholder="Name" value={regName} onChange={(e) => setRegName(e.target.value)} /> 
            </div> 
            <div className="relative"> 
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} /> 
              <Input className="pl-9" placeholder="Email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} /> 
            </div> 
            <div className="relative"> 
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} /> 
              <Input className="pl-9" type="password" placeholder="Password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} /> 
            </div> 
            <Button className="w-full hover:shadow-md transition flex items-center justify-center gap-2" onClick={register} disabled={loading}>{loading ? (<><Spinner className="size-4" /> Creating...</>) : "Create account"}</Button> 
          </TabsContent> 
        </Tabs> 
        <div className="mt-4 text-center text-xs text-gray-500">By continuing, you agree to our Terms.</div>
      </Card>
    </div>
  )
}

function useHashValue() {
  return useSyncExternalStore(
    (listener) => {
      window.addEventListener("hashchange", listener)
      return () => window.removeEventListener("hashchange", listener)
    },
    () => window.location.hash,
    () => ""
  )
}
