import { Router } from "express"
import { asyncHandler } from "../utils/asyncHandler"
import { Product } from "../models/Product"
import { Parser as CsvParser } from "json2csv"
import PDFDocument from "pdfkit"

const router = Router()

function buildSeries(points: number, labelPrefix: string) {
  return Array.from({ length: points }, (_, i) => ({ label: `${labelPrefix} ${i + 1}`, value: Math.round(Math.random() * 100) }))
}

router.get(
  "/sales",
  asyncHandler(async (req, res) => {
    const { period = "daily" } = req.query
    const labelPrefix = period === "weekly" ? "Week" : period === "monthly" ? "Month" : "Day"
    const points = period === "monthly" ? 12 : period === "weekly" ? 12 : 30
    const series = buildSeries(points, labelPrefix)
    const totalSold = await Product.aggregate([{ $group: { _id: null, total: { $sum: "$sold" } } }])
    res.json({ points: series, summary: { totalSold: totalSold[0]?.total || 0 } })
  })
)

router.get(
  "/export/csv",
  asyncHandler(async (req, res) => {
    const { period = "daily" } = req.query
    const labelPrefix = period === "weekly" ? "Week" : period === "monthly" ? "Month" : "Day"
    const points = buildSeries(period === "monthly" ? 12 : period === "weekly" ? 12 : 30, labelPrefix)
    const parser = new CsvParser({ fields: ["label", "value"] })
    const csv = parser.parse(points)
    res.setHeader("Content-Type", "text/csv")
    res.setHeader("Content-Disposition", `attachment; filename="sales-${period}.csv"`)
    res.send(csv)
  })
)

router.get(
  "/export/pdf",
  asyncHandler(async (req, res) => {
    const { period = "daily" } = req.query
    const labelPrefix = period === "weekly" ? "Week" : period === "monthly" ? "Month" : "Day"
    const points = buildSeries(period === "monthly" ? 12 : period === "weekly" ? 12 : 30, labelPrefix)
    const doc = new PDFDocument()
    res.setHeader("Content-Type", "application/pdf")
    res.setHeader("Content-Disposition", `attachment; filename="sales-${period}.pdf"`)
    doc.pipe(res)
    doc.fontSize(18).text(`Sales Report (${String(period)})`, { align: "center" })
    doc.moveDown()
    points.forEach((p) => doc.fontSize(12).text(`${p.label}: ${p.value}`))
    doc.end()
  })
)

export default router
