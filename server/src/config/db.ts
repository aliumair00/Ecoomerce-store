import mongoose from "mongoose"

export async function connectDB(uri: string, dbName?: string) {
  await mongoose.connect(uri, dbName ? { dbName } : undefined)
}
