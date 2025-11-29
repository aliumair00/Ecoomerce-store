import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export interface AuthUser {
  id: string
  role: "admin" | "user"
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization || ""
  const token = header.startsWith("Bearer ") ? header.slice(7) : undefined
  if (!token) return res.status(401).json({ error: "Unauthorized" })
  try {
    const decoded = jwt.verify(token, String(process.env.JWT_SECRET)) as AuthUser
    ;(req as any).user = decoded
    next()
  } catch {
    res.status(401).json({ error: "Unauthorized" })
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization || ""
  const token = header.startsWith("Bearer ") ? header.slice(7) : undefined
  if (!token) return res.status(401).json({ error: "Unauthorized" })
  try {
    const decoded = jwt.verify(token, String(process.env.JWT_SECRET)) as AuthUser
    if (decoded.role !== "admin") return res.status(403).json({ error: "Forbidden" })
    ;(req as any).user = decoded
    next()
  } catch {
    res.status(401).json({ error: "Unauthorized" })
  }
}
