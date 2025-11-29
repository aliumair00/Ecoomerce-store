import { Router } from "express"
import { asyncHandler } from "../utils/asyncHandler"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { User } from "../models/User"

const router = Router()

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body
    const passwordHash = await bcrypt.hash(password, 10)
    const created = await User.create({ name, email, passwordHash, role: role || "user" })
    res.status(201).json({ id: created.id })
  })
)

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ error: "Invalid credentials" })
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ error: "Invalid credentials" })
    const token = jwt.sign({ id: user.id, role: user.role }, String(process.env.JWT_SECRET), { expiresIn: "1d" })
    res.json({ token })
  })
)

router.get(
  "/me",
  asyncHandler(async (req, res) => {
    const auth = req.headers.authorization || ""
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : undefined
    if (!token) return res.status(401).json({ error: "Unauthorized" })
    try {
      const decoded = jwt.verify(token, String(process.env.JWT_SECRET)) as any
      const user = await User.findById(decoded.id).select("name email role")
      res.json(user)
    } catch {
      res.status(401).json({ error: "Unauthorized" })
    }
  })
)

export default router
