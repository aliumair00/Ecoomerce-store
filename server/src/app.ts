import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import rateLimit from "express-rate-limit"
import productsRouter from "./routes/products"
import addressesRouter from "./routes/addresses"
import usersRouter from "./routes/users"
import uploadRouter from "./routes/upload"
import { errorHandler } from "./middleware/error"
import featuresRouter from "./routes/features"
import authRouter from "./routes/auth"
import analyticsRouter from "./routes/analytics"

const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }))
app.use(morgan("dev"))
app.use(express.json())
app.use(rateLimit({ windowMs: 60_000, max: 100 }))

app.get("/api/health", (_req, res) => res.json({ ok: true }))
app.use("/api/auth", authRouter)
app.use("/api/products", productsRouter)
app.use("/api/addresses", addressesRouter)
app.use("/api/users", usersRouter)
app.use("/api/upload", uploadRouter)
app.use("/api/features", featuresRouter)
app.use("/api/analytics", analyticsRouter)
app.use(errorHandler)

export default app
