import { Router } from "express"
import { asyncHandler } from "../utils/asyncHandler"
import { requireAdmin } from "../middleware/auth"
import { Schema, model } from "mongoose"

const FeatureFlagSchema = new Schema({
  name: { type: String, unique: true, required: true },
  enabled: { type: Boolean, default: false },
  priority: { type: Number, default: 0 },
  conditions: { type: Object, default: {} },
})
const FeatureFlag = model("FeatureFlag", FeatureFlagSchema)

const router = Router()

router.get("/", asyncHandler(async (_req, res) => {
  const items = await FeatureFlag.find({}).sort({ priority: -1 })
  res.json(items)
}))

router.post("/", requireAdmin, asyncHandler(async (req, res) => {
  const created = await FeatureFlag.create(req.body)
  res.status(201).json(created)
}))

router.patch("/:id", requireAdmin, asyncHandler(async (req, res) => {
  const updated = await FeatureFlag.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!updated) return res.status(404).json({ error: "Not found" })
  res.json(updated)
}))

router.delete("/:id", requireAdmin, asyncHandler(async (req, res) => {
  const deleted = await FeatureFlag.findByIdAndDelete(req.params.id)
  if (!deleted) return res.status(404).json({ error: "Not found" })
  res.status(204).send()
}))

export default router
