import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    enum: ["Nike", "Adidas", "Zara"], // ✅ restrict allowed values
    required: true,
  },
  category: {
    type: String,
    enum: ["Men", "Women", "Kids"], // ✅ restrict allowed values
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
  },
  stock: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Products", productSchema);
