import "dotenv/config"
import { connectDB } from "./config/db"
import app from "./app"

const port = Number(process.env.PORT || 5000)

const uri = process.env.MONGODB_URI || process.env.MONGO_URI
const dbName = process.env.MONGODB_DB || process.env.MONGO_DB || "ecommerce"

if (uri && uri.length > 0) {
  connectDB(uri, dbName)
    .then(() => {
      app.listen(port, () => {
        process.stdout.write(`api:${port}\n`)
      })
    })
    .catch((err) => {
      process.stderr.write(`db_error:${String(err)}\n`)
      process.exit(1)
    })
} else {
  app.listen(port, () => {
    process.stdout.write(`api:${port}\n`)
  })
}
