import { Router } from "express"
import { asyncHandler } from "../utils/asyncHandler"
import { requireAdmin } from "../middleware/auth"
import { User } from "../models/User"
import { AuditLog } from "../models/AuditLog"

// User model imported from models/User

const router = Router()

router.get(
  "/",
  requireAdmin,
  asyncHandler(async (_req, res) => {
    if (!(process.env.MONGODB_URI || process.env.MONGO_URI)) return res.json([])
    const users = await User.find({}).select("name email role createdAt")
    res.json(users)
  })
)

router.patch(
  "/:id/role",
  requireAdmin,
  asyncHandler(async (req, res) => {
    if (!(process.env.MONGODB_URI || process.env.MONGO_URI)) return res.status(400).json({ error: "DB not configured" })
    const { role } = req.body
    if (!role || !["user", "admin"].includes(role)) return res.status(400).json({ error: "Invalid role" })
    const updated = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select("name email role")
    if (!updated) return res.status(404).json({ error: "Not found" })
    await AuditLog.create({ actorId: (req as any).user.id, action: "change_role", targetType: "User", targetId: updated.id, changes: { role } })
    res.json(updated)
  })
)

export default router
