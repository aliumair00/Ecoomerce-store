"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { API_BASE } from "@/lib/api"
import { ArrowLeft, X } from "lucide-react"
import Link from "next/link"

export default function NewProductPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)

    try {
      const body = {
        name: formData.get("name") as string,
        price: parseFloat(formData.get("price") as string),
        category: formData.get("category") as string,
        description: formData.get("description") as string,
        image: imageUrl || ((formData.get("image") as string) || images[0] || "/placeholder.svg"),
        images,
        stock: parseInt(formData.get("stock") as string) || 0,
        rating: 0,
        reviews: 0,
        sold: 0,
        material: "N/A",
        design: "N/A",
        customization: "N/A",
        protection: "N/A",
        warranty: "N/A",
        supplier: {
          name: "Admin Added",
          location: "Unknown",
          verified: false,
          shipping: "Standard",
        },
        specifications: {
          model: "N/A",
          style: "N/A",
          certificate: "N/A",
          size: "N/A",
          memory: "N/A",
        },
        features: [],
      }

      const res = await fetch(`${API_BASE}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error("Failed to create product")
      router.push("/admin/products")
    } catch (error) {
      console.error(error)
      alert("Failed to add product")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploading(true)
    try {
      const uploaded: string[] = []
      for (const f of files) {
        const fd = new FormData()
        fd.append("image", f)
      const res = await fetch(`${API_BASE}/api/upload/image`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
        body: fd,
      })
      if (res.status === 401 || res.status === 403) {
        alert("Admin login required to upload images")
        location.href = "/admin/login"
        return
      }
      if (!res.ok) throw new Error("upload failed")
        const j = await res.json()
        uploaded.push(j.url)
      }
      setImages((prev) => [...prev, ...uploaded])
      if (!imageUrl && uploaded[0]) setImageUrl(uploaded[0])
    } catch {
      alert("Image upload failed")
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (url: string) => {
    setImages((prev) => prev.filter((u) => u !== url))
    if (imageUrl === url) setImageUrl(images.find((u) => u !== url) || "")
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Add New Product</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" name="name" required placeholder="e.g. Wireless Headphones" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input id="price" name="price" type="number" step="0.01" required placeholder="99.99" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input id="stock" name="stock" type="number" required placeholder="100" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" name="category" required placeholder="Electronics" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" name="image" placeholder="https://..." value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Upload Image</Label>
              <Input id="file" type="file" multiple accept="image/png,image/jpeg,image/webp" onChange={handleFile} />
              {imageUrl && (
                <img src={imageUrl} alt="Preview" className="mt-2 h-32 w-32 object-cover rounded" />
              )}
              {uploading && <div className="text-sm text-muted-foreground">Uploading...</div>}
            </div>

            {images.length > 0 && (
              <div className="space-y-2">
                <Label>Gallery</Label>
                <div className="flex flex-wrap gap-2">
                  {images.map((u) => (
                    <div key={u} className="relative">
                      <img src={u} alt="Img" className="h-20 w-20 object-cover rounded border" onClick={() => setImageUrl(u)} />
                      <button type="button" className="absolute -top-1 -right-1 bg-white rounded-full shadow p-1" onClick={() => removeImage(u)}>
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" required placeholder="Product description..." />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Create Product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
