"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, LogOut } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { API_BASE } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

type Address = {
  _id: string
  type: "shipping" | "billing"
  name: string
  line1: string
  line2?: string
  city: string
  state: string
  country: string
  postalCode: string
  phone?: string
  isDefault?: boolean
}

function fieldOk(v: string) {
  return v && v.trim().length > 0
}

export default function ProfilePage() {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loadingAddr, setLoadingAddr] = useState(false)
  const [form, setForm] = useState<any>({ type: "shipping", name: "", line1: "", line2: "", city: "", state: "", country: "", postalCode: "", phone: "", isDefault: false })
  const [editingId, setEditingId] = useState<string | null>(null)
  const { toast } = useToast()
  const token = useMemo(() => (typeof window !== "undefined" ? localStorage.getItem("token") : null), [])

  useEffect(() => {
    const run = async () => {
      if (!token) return
      setLoadingAddr(true)
      try {
        const res = await fetch(`${API_BASE}/api/addresses`, { headers: { Authorization: `Bearer ${token}` } })
        const j = await res.json()
        setAddresses(Array.isArray(j) ? j : [])
      } catch { }
      setLoadingAddr(false)
    }
    run()
  }, [token])

  const resetForm = () => setForm({ type: "shipping", name: "", line1: "", line2: "", city: "", state: "", country: "", postalCode: "", phone: "", isDefault: false })

  const validate = () => {
    const required = [form.name, form.line1, form.city, form.state, form.country, form.postalCode]
    return required.every(fieldOk)
  }

  const submitAddress = async () => {
    if (!validate()) {
      toast({ title: "Invalid address", description: "Please fill all required fields", variant: "destructive" })
      return
    }
    try {
      const res = await fetch(`${API_BASE}/api/addresses${editingId ? `/${editingId}` : ""}`, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token || ""}` },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("error")
      const j = await res.json()
      toast({ title: editingId ? "Address updated" : "Address added" })
      if (editingId) setAddresses((prev) => prev.map((a) => (a._id === editingId ? j : a)))
      else setAddresses((prev) => [j, ...prev])
      setEditingId(null)
      resetForm()
    } catch {
      toast({ title: "Operation failed", description: "Could not save address", variant: "destructive" })
    }
  }

  const removeAddress = async (id: string) => {
    if (!confirm("Remove this address?")) return
    try {
      const res = await fetch(`${API_BASE}/api/addresses/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token || ""}` } })
      if (!res.ok) throw new Error("error")
      setAddresses((prev) => prev.filter((a) => a._id !== id))
      toast({ title: "Address removed" })
    } catch {
      toast({ title: "Remove failed", description: "Could not remove address", variant: "destructive" })
    }
  }

  const setDefault = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/addresses/${id}/default`, { method: "POST", headers: { Authorization: `Bearer ${token || ""}` } })
      if (!res.ok) throw new Error("error")
      const j = await res.json()
      setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.type === j.type ? a._id === j._id : a.isDefault })))
      toast({ title: "Default updated" })
    } catch {
      toast({ title: "Update failed", description: "Could not set default", variant: "destructive" })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
            <p className="text-gray-600">Manage your profile and preferences</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-transparent"
            onClick={() => {
              try {
                localStorage.removeItem("token")
              } catch { }
              location.href = "/login"
            }}
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-2">
            <button className="w-full text-left p-3 rounded-lg bg-blue-50 text-blue-600 font-medium">
              Profile Information
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50">My Orders</button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Heart size={18} /> My Wishlist
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50">Addresses</button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50">Payment Methods</button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50">Notifications</button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50">Security Settings</button>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6 mt-6">
                <div>
                  <h2 className="text-xl font-bold mb-6">Personal Information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <Input defaultValue="John" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <Input defaultValue="Doe" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input defaultValue="john@example.com" type="email" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <Input defaultValue="+1 (555) 123-4567" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Date of Birth</label>
                      <Input type="date" defaultValue="1990-01-15" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Gender</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <Button className="mt-6 bg-blue-500 hover:bg-blue-600" onClick={() => alert("Profile updated successfully!")}>Save Changes</Button>
                </div>

                <div className="border-t pt-6">
                  <h2 className="text-xl font-bold mb-6">Change Password</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Current Password</label>
                      <Input type="password" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">New Password</label>
                      <Input type="password" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                      <Input type="password" />
                    </div>
                  </div>
                  <Button className="mt-6 bg-blue-500 hover:bg-blue-600" onClick={() => alert("Password updated successfully!")}>Update Password</Button>
                </div>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" className="mt-6">
                <h2 className="text-xl font-bold mb-6">My Orders</h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((order) => (
                    <div
                      key={order}
                      className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
                    >
                      <div>
                        <p className="font-semibold">Order #ORD-2024-{1000 + order}</p>
                        <p className="text-sm text-gray-600">Placed on Mar {20 + order}, 2024</p>
                        <p className="text-sm text-gray-600 mt-1">3 items - Total: ${99.99 + order * 10}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                          Delivered
                        </span>
                        <Button size="sm" variant="outline" className="mt-2 bg-transparent" onClick={() => alert("Order details coming soon!")}>
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Wishlist Tab */}
              <TabsContent value="wishlist" className="mt-6">
                <h2 className="text-xl font-bold mb-6">My Wishlist</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="border border-gray-200 rounded-lg p-4 text-center">
                      <div className="h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-4xl">📱</span>
                      </div>
                      <p className="font-semibold mb-2">Product Name</p>
                      <p className="text-blue-500 font-bold mb-3">$99.99</p>
                      <Button size="sm" className="w-full bg-blue-500 hover:bg-blue-600">
                        Add to Cart
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="addresses" className="mt-6">
                <h2 className="text-xl font-bold mb-6">Saved Addresses</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {loadingAddr && <div className="text-sm">Loading...</div>}
                    {!loadingAddr && addresses.map((a) => (
                      <div key={a._id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{a.name}</h3>
                            {a.isDefault && <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">Default</span>}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="bg-transparent" onClick={() => { setEditingId(a._id); setForm({ ...a }) }}>Edit</Button>
                            <Button size="sm" variant="destructive" onClick={() => removeAddress(a._id)}>Delete</Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{a.line1}{a.line2 ? `, ${a.line2}` : ""}</p>
                        <p className="text-sm text-gray-600">{a.city}, {a.state} {a.postalCode}</p>
                        <p className="text-sm text-gray-600">{a.country}</p>
                        {a.phone && <p className="text-sm text-gray-600">Phone: {a.phone}</p>}
                        <div className="mt-3">
                          <Button size="sm" variant="outline" className="bg-transparent" onClick={() => setDefault(a._id)}>Set as default</Button>
                        </div>
                      </div>
                    ))}
                    {!loadingAddr && addresses.length === 0 && (
                      <div className="text-sm text-gray-600">No addresses saved</div>
                    )}
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold mb-4">{editingId ? "Edit Address" : "Add New Address"}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Label</label>
                        <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Type</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                          <option value="shipping">Shipping</option>
                          <option value="billing">Billing</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Address Line 1</label>
                        <Input value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Address Line 2</label>
                        <Input value={form.line2} onChange={(e) => setForm({ ...form, line2: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">City</label>
                        <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">State</label>
                        <Input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Country</label>
                        <Input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Postal Code</label>
                        <Input value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                      </div>
                      <div className="flex items-center gap-2 md:col-span-2">
                        <input type="checkbox" checked={form.isDefault} onChange={(e) => setForm({ ...form, isDefault: e.target.checked })} />
                        <span className="text-sm">Set as default</span>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      {editingId && <Button variant="outline" className="bg-transparent" onClick={() => { setEditingId(null); resetForm() }}>Cancel</Button>}
                      <Button onClick={submitAddress}>{editingId ? "Save" : "Add Address"}</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
