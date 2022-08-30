import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  barcode: {
    type: String,
    unquie: [true, "Barcode Already Added"],
    min: [4, "Barcode too short"],
    max: [25, "Barcode too long"],
    required: [true, "Barcode is required"],
  },
  productName: {
    type: String,
    min: [3, "Product name too short"],
    max: [100, "Product name too large"],
    required: [true, "Product name is required"],
  },
  productPrice: {
    type: Number,
    required: [true, "Product price is required"],
  },
  createdOn: {
      type: Date,
      default: Date.now
  }
});

export default mongoose.model("Product", ProductSchema)

