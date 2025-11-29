import { Router, Request, Response } from "express"
import multer from "multer"
import path from "path"
import sharp from "sharp"
import fs from "fs"
import { requireAdmin } from "../middleware/auth"

const router = Router()

const storage = multer.memoryStorage()
const upload = multer({
  storage,
  fileFilter: (_req: Request, file: any, cb: (err: any, accept?: boolean) => void) => {
    const ok = ["image/jpeg", "image/png", "image/webp"].includes(file.mimetype)
    if (!ok) return cb(new Error("Invalid file type"))
    cb(null, true)
  },
  limits: { fileSize: 5 * 1024 * 1024 },
})

router.post("/image", requireAdmin, upload.single("image"), async (req: Request & { file?: any }, res: Response) => {
  if (!req.file) return res.status(400).json({ error: "No file" })
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.webp`
  const outDir = path.resolve(process.cwd(), "../public/uploads")
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
  const outPath = path.join(outDir, filename)
  await sharp(req.file.buffer).webp({ quality: 80 }).toFile(outPath)
  res.json({ url: `/uploads/${filename}` })
})

export default router
