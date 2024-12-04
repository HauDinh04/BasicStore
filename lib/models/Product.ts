import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    media: [String],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Categories" }],
    tags: [String],
    material: [String],
    price: Number,
    oldPrice: Number,
    salePercentage: Number,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { toJSON: { getters: true } }
);
const Products =
  mongoose.models.Products || mongoose.model("Products", productSchema);
export default Products;
