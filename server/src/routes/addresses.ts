import { Router } from "express"
import { z } from "zod"
import { Address } from "../models/Address"
import { asyncHandler } from "../utils/asyncHandler"
import { requireAuth } from "../middleware/auth"
import { AuditLog } from "../models/AuditLog"

const router = Router()

const addressSchema = z.object({
  type: z.enum(["shipping", "billing"]),
  name: z.string().min(1),
  line1: z.string().min(1),
  line2: z.string().optional().default(""),
  city: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  postalCode: z.string().min(2),
  phone: z.string().optional().default(""),
  isDefault: z.boolean().optional().default(false),
})

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    if (!(process.env.MONGODB_URI || process.env.MONGO_URI)) return res.json([])
    const items = await Address.find({ userId: (req as any).user.id }).sort({ updatedAt: -1 })
    res.json(items)
  })
)

router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    if (!(process.env.MONGODB_URI || process.env.MONGO_URI)) return res.status(400).json({ error: "DB not configured" })
    const parsed = addressSchema.safeParse(req.body)
    if (!parsed.success) return res.status(400).json({ error: "Invalid address", details: parsed.error.flatten() })
    const payload = { ...parsed.data, userId: (req as any).user.id }
    if (payload.isDefault) {
      await Address.updateMany({ userId: payload.userId, type: payload.type }, { $set: { isDefault: false } })
    }
    const created = await Address.create(payload)
    await AuditLog.create({ actorId: (req as any).user.id, action: "create", targetType: "Address", targetId: created.id, changes: payload })
    res.status(201).json(created)
  })
)

router.put(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    if (!(process.env.MONGODB_URI || process.env.MONGO_URI)) return res.status(400).json({ error: "DB not configured" })
    const parsed = addressSchema.safeParse(req.body)
    if (!parsed.success) return res.status(400).json({ error: "Invalid address", details: parsed.error.flatten() })
    const existing = await Address.findOne({ _id: req.params.id, userId: (req as any).user.id })
    if (!existing) return res.status(404).json({ error: "Not found" })
    const payload = parsed.data
    if (payload.isDefault) {
      await Address.updateMany({ userId: (req as any).user.id, type: payload.type }, { $set: { isDefault: false } })
    }
    Object.assign(existing, payload)
    const updated = await existing.save()
    await AuditLog.create({ actorId: (req as any).user.id, action: "update", targetType: "Address", targetId: updated.id, changes: payload })
    res.json(updated)
  })
)

router.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    if (!(process.env.MONGODB_URI || process.env.MONGO_URI)) return res.status(400).json({ error: "DB not configured" })
    const deleted = await Address.findOneAndDelete({ _id: req.params.id, userId: (req as any).user.id })
    if (!deleted) return res.status(404).json({ error: "Not found" })
    await AuditLog.create({ actorId: (req as any).user.id, action: "delete", targetType: "Address", targetId: deleted.id })
    res.status(204).send()
  })
)

router.post(
  "/:id/default",
  requireAuth,
  asyncHandler(async (req, res) => {
    if (!(process.env.MONGODB_URI || process.env.MONGO_URI)) return res.status(400).json({ error: "DB not configured" })
    const item = await Address.findOne({ _id: req.params.id, userId: (req as any).user.id })
    if (!item) return res.status(404).json({ error: "Not found" })
    await Address.updateMany({ userId: item.userId, type: item.type }, { $set: { isDefault: false } })
    item.isDefault = true
    await item.save()
    await AuditLog.create({ actorId: (req as any).user.id, action: "set_default", targetType: "Address", targetId: item.id })
    res.json(item)
  })
)

export default router

