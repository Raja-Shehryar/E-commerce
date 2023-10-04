import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  inventoryQuantity: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Products", productSchema);

export default Product;
