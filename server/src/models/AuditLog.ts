import { Schema, model } from "mongoose"

const AuditLogSchema = new Schema(
  {
    actorId: { type: String, required: true },
    action: { type: String, required: true },
    targetType: { type: String, required: true },
    targetId: { type: String, required: true },
    changes: { type: Object },
  },
  { timestamps: true }
)

export const AuditLog = model("AuditLog", AuditLogSchema)
