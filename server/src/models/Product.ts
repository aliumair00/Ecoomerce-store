import { Schema, model } from "mongoose"

const SupplierSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  verified: { type: Boolean, default: false },
  shipping: { type: String, default: "" }
})

const SpecificationsSchema = new Schema({
  model: { type: String, default: "" },
  style: { type: String, default: "" },
  certificate: { type: String, default: "" },
  size: { type: String, default: "" },
  memory: { type: String, default: "" }
})

const ProductSchema = new Schema(
  {
    sku: { type: String, unique: true, sparse: true },
    name: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    image: { type: String, default: "" },
    images: { type: [String], default: [] },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    category: { type: String, index: true },
    description: { type: String, default: "" },
    material: { type: String, default: "" },
    design: { type: String, default: "" },
    customization: { type: String, default: "" },
    protection: { type: String, default: "" },
    warranty: { type: String, default: "" },
    stock: { type: Number, default: 0 },
    supplier: { type: SupplierSchema, required: true },
    specifications: { type: SpecificationsSchema, required: true },
    features: { type: [String], default: [] }
    , approved: { type: Boolean, default: true }
  },
  { timestamps: true }
)

ProductSchema.index({ name: "text", description: "text" })

ProductSchema.add({ deletedAt: { type: Date }, archivedAt: { type: Date } })
ProductSchema.add({
  history: [
    {
      field: String,
      oldValue: Schema.Types.Mixed,
      newValue: Schema.Types.Mixed,
      changedAt: { type: Date, default: Date.now },
      userId: String,
    },
  ],
})

export const Product = model("Product", ProductSchema)
