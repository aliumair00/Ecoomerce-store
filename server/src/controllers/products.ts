import { Request, Response } from "express"
import { Product } from "../models/Product"
import { AuditLog } from "../models/AuditLog"

export async function listProducts(req: Request, res: Response) {
  if (!(process.env.MONGODB_URI || process.env.MONGO_URI))
    return res.json({ items: [], pagination: { page: 1, limit: 12, total: 0 } })
  const { search = "", category, minPrice, maxPrice, page = "1", limit = "12", sku } = req.query
  const q: any = {}
  if (search) q.$text = { $search: String(search) }
  if (category) q.category = String(category)
  if (sku) q.sku = String(sku)
  if (minPrice || maxPrice) q.price = {}
  if (minPrice) q.price.$gte = Number(minPrice)
  if (maxPrice) q.price.$lte = Number(maxPrice)
  const p = Number(page)
  const l = Number(limit)
  const [items, total] = await Promise.all([
    Product.find(q).skip((p - 1) * l).limit(l),
    Product.countDocuments(q)
  ])
  res.json({ items, pagination: { page: p, limit: l, total } })
}

export async function getProduct(req: Request, res: Response) {
  if (!(process.env.MONGODB_URI || process.env.MONGO_URI)) return res.status(404).json({ error: "Not found" })
  const item = await Product.findById(req.params.id)
  if (!item) return res.status(404).json({ error: "Not found" })
  res.json(item)
}

export async function createProduct(req: Request, res: Response) {
  if (!(process.env.MONGODB_URI || process.env.MONGO_URI)) return res.status(400).json({ error: "DB not configured" })
  const created = await Product.create(req.body)
  await AuditLog.create({ actorId: (req as any).user?.id || "unknown", action: "create", targetType: "Product", targetId: created.id, changes: req.body })
  res.status(201).json(created)
}

export async function updateProduct(req: Request, res: Response) {
  if (!(process.env.MONGODB_URI || process.env.MONGO_URI)) return res.status(400).json({ error: "DB not configured" })
  const existing = await Product.findById(req.params.id)
  if (!existing) return res.status(404).json({ error: "Not found" })
  const changes: any[] = []
  for (const k of Object.keys(req.body)) {
    changes.push({ field: k, oldValue: (existing as any)[k], newValue: req.body[k], userId: (req as any).user?.id })
  }
  ;(existing as any).history = [...(((existing as any).history) || []), ...changes]
  Object.assign(existing, req.body)
  const updated = await existing.save()
  await AuditLog.create({ actorId: (req as any).user?.id || "unknown", action: "update", targetType: "Product", targetId: updated.id, changes: req.body })
  if (!updated) return res.status(404).json({ error: "Not found" })
  res.json(updated)
}

export async function deleteProduct(req: Request, res: Response) {
  if (!(process.env.MONGODB_URI || process.env.MONGO_URI)) return res.status(400).json({ error: "DB not configured" })
  const p = await Product.findById(req.params.id)
  if (!p) return res.status(404).json({ error: "Not found" })
  ;(p as any).deletedAt = new Date()
  await p.save()
  await AuditLog.create({ actorId: (req as any).user?.id || "unknown", action: "delete", targetType: "Product", targetId: p.id })
  res.status(204).send()
}

export async function archiveProduct(req: Request, res: Response) {
  if (!(process.env.MONGODB_URI || process.env.MONGO_URI)) return res.status(400).json({ error: "DB not configured" })
  const p = await Product.findById(req.params.id)
  if (!p) return res.status(404).json({ error: "Not found" })
  ;(p as any).archivedAt = new Date()
  await p.save()
  await AuditLog.create({ actorId: (req as any).user?.id || "unknown", action: "archive", targetType: "Product", targetId: p.id })
  res.json(p)
}

export async function restoreProduct(req: Request, res: Response) {
  if (!(process.env.MONGODB_URI || process.env.MONGO_URI)) return res.status(400).json({ error: "DB not configured" })
  const p = await Product.findById(req.params.id)
  if (!p) return res.status(404).json({ error: "Not found" })
  ;(p as any).deletedAt = undefined
  ;(p as any).archivedAt = undefined
  await p.save()
  await AuditLog.create({ actorId: (req as any).user?.id || "unknown", action: "restore", targetType: "Product", targetId: p.id })
  res.json(p)
}

export async function setApproval(req: Request, res: Response) {
  if (!(process.env.MONGODB_URI || process.env.MONGO_URI)) return res.status(400).json({ error: "DB not configured" })
  const p = await Product.findById(req.params.id)
  if (!p) return res.status(404).json({ error: "Not found" })
  const { approved } = req.body as any
  if (typeof approved !== "boolean") return res.status(400).json({ error: "Invalid approval value" })
  p.approved = approved
  await p.save()
  await AuditLog.create({ actorId: (req as any).user?.id || "unknown", action: "set_approval", targetType: "Product", targetId: p.id, changes: { approved } })
  res.json(p)
}
