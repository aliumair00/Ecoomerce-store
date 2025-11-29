import { Schema, model } from "mongoose"

const AddressSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    type: { type: String, enum: ["shipping", "billing"], required: true },
    name: { type: String, required: true },
    line1: { type: String, required: true },
    line2: { type: String, default: "" },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
    phone: { type: String, default: "" },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const Address = model("Address", AddressSchema)

